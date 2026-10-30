export type Fund = { key:string; name:string; short:string; role:string; weight:number; category:'equity'|'metal'; code:string };
// MFAPI scheme IDs. SBI Gold ETF is exchange-traded and has no Direct plan; UTI Gold FoF is Direct Growth.
export const funds: Fund[] = [
 {key:'nifty50',name:'UTI Nifty 50 Index Fund – Direct Growth',short:'UTI Nifty 50',role:'Core',weight:30,category:'equity',code:'120716'},
 {key:'flexi',name:'Parag Parikh Flexi Cap Fund – Direct Growth',short:'Parag Parikh Flexi',role:'Flexi cap',weight:25,category:'equity',code:'122639'},
 {key:'mid',name:'Invesco India Mid Cap Fund – Direct Growth',short:'Invesco Mid Cap',role:'Midcap',weight:20,category:'equity',code:'120403'},
 {key:'small',name:'HDFC Small Cap Fund – Direct Growth',short:'HDFC Small Cap',role:'Small cap',weight:15,category:'equity',code:'130503'},
 {key:'gold',name:'SBI Gold ETF',short:'SBI Gold ETF',role:'Gold ETF · Demat',weight:10,category:'metal',code:'111954'},
 {key:'goldFoF',name:'UTI Gold ETF Fund of Fund – Direct Growth',short:'UTI Gold FoF',role:'Existing holding · new purchases paused',weight:0,category:'metal',code:'150714'}
];
