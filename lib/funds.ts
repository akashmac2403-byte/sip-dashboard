export type Fund = { key:string; name:string; short:string; role:string; weight:number; category:'equity'|'metal'; code:string };
// MFAPI scheme IDs for the Direct Plan – Growth option.
export const funds: Fund[] = [
 {key:'nifty50',name:'UTI Nifty 50 Index Fund – Direct Growth',short:'UTI Nifty 50',role:'Core',weight:30,category:'equity',code:'120716'},
 {key:'flexi',name:'Parag Parikh Flexi Cap Fund – Direct Growth',short:'Parag Parikh Flexi',role:'Flexi cap',weight:25,category:'equity',code:'122639'},
 {key:'mid',name:'Invesco India Mid Cap Fund – Direct Growth',short:'Invesco Mid Cap',role:'Midcap',weight:15,category:'equity',code:'120403'},
 {key:'small',name:'Nippon India Small Cap Fund – Direct Growth',short:'Nippon Small Cap',role:'Small cap',weight:20,category:'equity',code:'118778'},
 {key:'gold',name:'SBI Gold Fund – Direct Growth',short:'SBI Gold',role:'Gold',weight:10,category:'metal',code:'119788'}
];
