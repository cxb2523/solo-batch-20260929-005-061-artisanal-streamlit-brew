import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const chunks = [];
for (let i = 0; i < 7; i++) {
  const m = new RegExp(`id="zxlwhXiv${i}"[^>]*>([\\s\\S]*?)</div>`).exec(html);
  chunks.push(m ? m[1] : '');
}
const joined = chunks.join('');
const payload = Buffer.from(joined, 'base64');
const key = Buffer.from('H7JPnij/qDB+mbPssTGSn4JcPzmEZaqKsJVITTEVAoY=', 'base64');
const out = Buffer.alloc(payload.length);
for (let i = 0; i < payload.length; i++) out[i] = payload[i] ^ key[i % key.length];
writeFileSync('.tmp/decoded.html', out.toString('utf8'));
console.log('decoded bytes:', out.length);
