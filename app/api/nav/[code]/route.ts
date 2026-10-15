import {NextResponse} from 'next/server';
export const revalidate=21600;
export async function GET(_:Request,{params}:{params:{code:string}}){
 try{const res=await fetch(`https://api.mfapi.in/mf/${encodeURIComponent(params.code)}`,{next:{revalidate:21600}});if(!res.ok)throw new Error(`MFAPI ${res.status}`);const data=await res.json();if(data.status!=='SUCCESS'||!Array.isArray(data.data))throw new Error('Invalid MFAPI response');return NextResponse.json({meta:data.meta,history:data.data.map((p:{date:string;nav:string})=>({date:p.date,nav:Number(p.nav)})).reverse(),stale:false},{headers:{'Cache-Control':'s-maxage=21600, stale-while-revalidate=86400'}})}catch{return NextResponse.json({meta:null,history:[],stale:true,message:'NAV service unavailable. Showing cached data where available.'},{status:200,headers:{'Cache-Control':'s-maxage=21600, stale-while-revalidate=86400'}})}
}
