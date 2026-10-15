import type {Fund} from './funds';
export type NavPoint={date:string;nav:number};
export type ScoreInput={fund:Fund;history:NavPoint[];niftyHistory:NavPoint[];invested:number;totalInvested:number};
export type ScoreResult={key:string;score:number;drawdown:number;drift:number;momentum:number;quality:number;disqualified:boolean;reason:string;aboveDma:boolean};
const atDays=(h:NavPoint[],days:number)=>{const target=Date.now()-days*864e5; return h.find(p=>new Date(p.date.split('-').reverse().join('-')).getTime()>=target)?.nav ?? h[h.length-1]?.nav ?? 0};
export function drawdown(current:number,high:number){return high>0?Math.max(0,(high-current)/high*100):0}
export function dmaStatus(history:NavPoint[],period=200){const recent=history.slice(-period).map(x=>x.nav);const avg=recent.reduce((a,b)=>a+b,0)/(recent.length||1);const current=history.at(-1)?.nav ?? 0;return {average:avg,above:current>avg*1.25,percent:avg?((current/avg)-1)*100:0}}
function cagr(history:NavPoint[],days:number){const old=atDays(history,days),now=history.at(-1)?.nav||0;return old>0?Math.pow(now/old,365/days)-1:0}
export function scoreFund({fund,history,niftyHistory,invested,totalInvested}:ScoreInput):ScoreResult{
 const now=history.at(-1)?.nav||0, year=drawdown(now,Math.max(...history.slice(-252).map(p=>p.nav),now)), three=drawdown(now,Math.max(...history.slice(-756).map(p=>p.nav),now));
 const draw=Math.min(100,(year*.6+three*.4)*3); const currentWeight=totalInvested?invested/totalInvested*100:fund.weight; const drift=Math.max(0,Math.min(100,(fund.weight-currentWeight)*8+50));
 const dma=dmaStatus(history); const momentum=Math.max(0,100-Math.max(0,dma.percent-10)*3); const qualityGap=cagr(history,1095)-cagr(niftyHistory,1095); const quality=Math.max(0,Math.min(100,50+qualityGap*500));
 const disqualified=fund.category==='equity'?qualityGap<-.03:dma.percent>20;
 const score=fund.category==='equity'?draw*.35+quality*.30+drift*.20+momentum*.15:draw*.55+drift*.30+momentum*.15;
 const reason=`${fund.short} is ${year.toFixed(1)}% below its 1-year high and ${Math.max(0,fund.weight-currentWeight).toFixed(1)}% underweight${disqualified?' · excluded by the quality/momentum guard':''}.`;
 return {key:fund.key,score:Math.round(score),drawdown:year,drift,quality,momentum,disqualified,reason,aboveDma:dma.above};
}
export function allocateTactical(scores:ScoreResult[],amount:number){const eligible=[...scores].filter(s=>!s.disqualified).sort((a,b)=>b.score-a.score).slice(0,2);const out:Record<string,number>={};let remaining=Math.round(amount/100)*100; for(let i=0;i<eligible.length&&remaining>=100;i++){const slots=eligible.length-i,cap=Math.floor(amount*.5/100)*100;const give=Math.min(cap,Math.round((remaining/slots)/100)*100,remaining);out[eligible[i].key]=give;remaining-=give;}return out}
