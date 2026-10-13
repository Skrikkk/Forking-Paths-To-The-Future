/** 261013 AMD#2 — validate incremental AMD33 uploads before switching the homepage. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const git=(...args)=>execFileSync('git',['-c','core.quotepath=false',...args],{encoding:'utf8',maxBuffer:90*1024*1024}).trim();
const fail=s=>{console.error('Upload blocked: '+s);process.exit(1);};
if(process.argv[2]!=='https://github.com/Skrikkk/jianglai-vn-demo.git')fail('wrong repository');
if(process.env.JIANGLAI_PUBLIC_RELEASE!=='261013-AMD33')fail('release authorization missing');
const manifest=JSON.parse(fs.readFileSync('.codex/pc33-upload-manifest.json','utf8'));
const source=new Map(manifest.assets.map(a=>[a.path,a]));
const allowed=new Set(['index.html','README.md','试玩.cmd','.codex/pc33-upload-manifest.json','.githooks-web/pre-push','.githooks-web/check.mjs']);
const base='8abb2b0af01accb0c27a869a791c8430951f01c0';
const basePaths=new Set(git('ls-tree','-r','--name-only',base).split('\n'));
const forbidden=/(?:[A-Za-z]:[\\/](?:Users|Work|Download|Desktop)|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/i;
for(const line of fs.readFileSync(0,'utf8').trim().split('\n').filter(Boolean)){
 const [localRef,head,remoteRef,previous]=line.trim().split(/\s+/);
 if(localRef!=='refs/heads/pc-web-publish'||remoteRef!=='refs/heads/main')fail('wrong branch');
 try{git('merge-base','--is-ancestor',previous,head);}catch{fail('non-fast-forward push');}
 const paths=git('ls-tree','-r','--name-only',head).split('\n');
 for(const p of paths){
  if(source.has(p)){
   const b=execFileSync('git',['show',head+':'+p],{maxBuffer:10*1024*1024});
   if(crypto.createHash('sha256').update(b).digest('hex')!==source.get(p).sha256)fail('asset mismatch '+p);
  }else if(allowed.has(p)){
   if(p==='index.html' && git('rev-parse',head+':'+p)!==git('rev-parse',base+':'+p)){
    const b=execFileSync('git',['show',head+':'+p],{maxBuffer:2*1024*1024});
    if(crypto.createHash('sha256').update(b).digest('hex')!==manifest.indexSha256)fail('index mismatch');
   }
  }else if(basePaths.has(p)){
   if(git('rev-parse',head+':'+p)!==git('rev-parse',base+':'+p))fail('legacy file changed '+p);
  }else fail('unexpected path '+p);
 }
 for(const p of git('diff','--name-only',previous,head).split('\n').filter(Boolean)){
  if(source.has(p))continue;
  const data=git('show',head+':'+p);
  if(forbidden.test(data))fail('private data in '+p);
 }
}
console.log('AMD33 upload check passed.');
