const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const key=Buffer.from('H7JPnij/qDB+mbPssTGSn4JcPzmEZaqKsJVITTEVAoY=','base64').toString('binary');
let joined='';
for(let i=0;i<7;i++){
  const m=new RegExp('<div id="zxlwhXiv'+i+'"[^>]*>([\\s\\S]*?)<\\/div>').exec(html);
  joined+=m?m[1]:'';
}
const b64=Buffer.from(joined,'base64').toString('binary');
let out='';
for(let i=0;i<b64.length;i++) out+=String.fromCharCode(b64.charCodeAt(i)^key.charCodeAt(i%key.length));
fs.writeFileSync('decoded.html',Buffer.from(out,'utf8'));
console.log('len',out.length);
