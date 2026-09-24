export type MindWord={id:number;word:string;traits:string[]};
export type WordQuestion={id:string;text:string;yes:string;no:string;trait:string};

export const MIND_WORDS:MindWord[]=[
 {id:1,word:"แมว",traits:["living","animal","home","small","fur"]},
 {id:2,word:"ช้าง",traits:["living","animal","large","land"]},
 {id:3,word:"ปลา",traits:["living","animal","water","small"]},
 {id:4,word:"ผีเสื้อ",traits:["living","animal","fly","small"]},
 {id:5,word:"แอปเปิล",traits:["food","fruit","sweet","round","hand"]},
 {id:6,word:"กล้วย",traits:["food","fruit","sweet","hand","yellow"]},
 {id:7,word:"พิซซ่า",traits:["food","meal","round","hot"]},
 {id:8,word:"ไอศกรีม",traits:["food","sweet","cold","hand"]},
 {id:9,word:"โทรศัพท์",traits:["object","hand","tech","home"]},
 {id:10,word:"กุญแจ",traits:["object","hand","metal","home"]},
 {id:11,word:"หนังสือ",traits:["object","hand","home","read"]},
 {id:12,word:"ร่ม",traits:["object","hand","outdoor","rain"]},
 {id:13,word:"ทะเล",traits:["place","outdoor","water","large"]},
 {id:14,word:"ภูเขา",traits:["place","outdoor","land","large"]},
 {id:15,word:"โรงเรียน",traits:["place","building","people","large","study"]},
 {id:16,word:"ตลาด",traits:["place","outdoor","people","food","shop"]},
];

const questions:WordQuestion[]=[
 {id:"living",text:"สิ่งที่คุณคิดมีชีวิตไหม?",yes:"มีชีวิต",no:"ไม่มีชีวิต",trait:"living"},
 {id:"food",text:"มันเป็นสิ่งที่กินหรือดื่มได้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"food"},
 {id:"place",text:"มันเป็นสถานที่มากกว่าสิ่งของไหม?",yes:"เป็นสถานที่",no:"ไม่ใช่สถานที่",trait:"place"},
 {id:"animal",text:"มันเป็นสัตว์ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"animal"},
 {id:"hand",text:"โดยทั่วไปถือมันด้วยมือเดียวได้ไหม?",yes:"ได้",no:"ไม่ได้",trait:"hand"},
 {id:"outdoor",text:"คุณมักนึกถึงมันในพื้นที่กลางแจ้งไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"outdoor"},
 {id:"water",text:"มันเกี่ยวข้องกับน้ำโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"water"},
 {id:"sweet",text:"ถ้าเป็นอาหาร รสหวานเป็นภาพจำเด่นไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"sweet"},
 {id:"fruit",text:"มันเป็นผลไม้ไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"fruit"},
 {id:"large",text:"โดยทั่วไปมันใหญ่กว่าตัวคนไหม?",yes:"ใหญ่กว่า",no:"ไม่ใหญ่กว่า",trait:"large"},
 {id:"home",text:"คุณพบมันในบ้านได้บ่อยไหม?",yes:"บ่อย",no:"ไม่บ่อย",trait:"home"},
 {id:"tech",text:"มันเกี่ยวข้องกับเทคโนโลยีไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"tech"},
 {id:"people",text:"สถานที่นี้มักมีคนจำนวนมากไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"people"},
 {id:"round",text:"รูปทรงกลมหรือวงกลมเป็นภาพจำเด่นไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"round"},
 {id:"cold",text:"ความเย็นเป็นลักษณะเด่นของมันไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"cold"},
 {id:"fly",text:"มันบินได้ไหม?",yes:"ได้",no:"ไม่ได้",trait:"fly"},
 {id:"metal",text:"มันมักทำจากโลหะเป็นหลักไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"metal"},
 {id:"read",text:"ปกติเราใช้มันเพื่ออ่านไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"read"},
 {id:"rain",text:"มันเกี่ยวข้องกับฝนโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"rain"},
 {id:"study",text:"สถานที่นี้เกี่ยวข้องกับการเรียนโดยตรงไหม?",yes:"ใช่",no:"ไม่ใช่",trait:"study"},
];

export function nextWordQuestion(candidates:MindWord[],asked:string[]){
 const available=questions.filter(q=>!asked.includes(q.id)).filter(q=>{const yes=candidates.filter(w=>w.traits.includes(q.trait)).length;return yes>0&&yes<candidates.length});
 return available.sort((a,b)=>{
   const ay=candidates.filter(w=>w.traits.includes(a.trait)).length;
   const by=candidates.filter(w=>w.traits.includes(b.trait)).length;
   return Math.abs(candidates.length/2-ay)-Math.abs(candidates.length/2-by);
 })[0]??null;
}
export function applyWordAnswer(candidates:MindWord[],question:WordQuestion,answer:boolean){return candidates.filter(w=>w.traits.includes(question.trait)===answer)}
