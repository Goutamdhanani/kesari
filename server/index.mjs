import 'dotenv/config';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {randomBytes} from 'node:crypto';
import {createServer as createHttpServer} from 'node:http';
import {DatabaseSync,backup} from 'node:sqlite';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import express from 'express';
import {createStore} from './store.mjs';
import {createApp} from './app.mjs';
import {lanUrls,writeNetworkQr} from './network.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');process.chdir(root);
mkdirSync('server/data',{recursive:true});mkdirSync('.local',{recursive:true});
const database=process.env.DATABASE_PATH||path.join(root,'server/data/kesari.sqlite');
const oldDatabase=path.resolve(root,'../16-10-26/kesari-react/server/data/kesari.sqlite');
if(!process.env.DATABASE_PATH&&!existsSync(database)&&existsSync(oldDatabase)){
  const source=new DatabaseSync(oldDatabase,{readOnly:true});try{await backup(source,database);}finally{source.close();}
  console.log('Existing Kesari events and bookings migrated to this project.');
}
const passwordFile=path.join(root,'.local/admin-password.txt');
if(!process.env.ADMIN_PASSWORD&&!existsSync(passwordFile))writeFileSync(passwordFile,randomBytes(24).toString('base64url'),{mode:0o600});
const store=createStore(database),app=createApp(store,process.env.ADMIN_PASSWORD||readFileSync(passwordFile,'utf8').trim());
const port=Number(process.env.PORT)||3000,host=process.env.HOST||'0.0.0.0';
const network=(host==='0.0.0.0'||host==='::')?lanUrls(port):[];
if(network[0])await writeNetworkQr(network[0],root);
if(network[0])app.get('/network-qr.png',(req,res)=>{res.setHeader('Cache-Control','no-store');res.sendFile(path.join(root,'public/network-qr.png'));});
const server=createHttpServer(app);let vite;
if(process.argv.includes('--production')){app.use(express.static(path.join(root,'dist')));app.get('/{*page}',(req,res)=>res.sendFile(path.join(root,'dist/index.html')));}
else{const{createServer}=await import('vite');vite=await createServer({server:{middlewareMode:true,hmr:{server}},appType:'spa'});app.use(vite.middlewares);}
server.listen(port,host,()=>console.log(`Kesari ready: http://localhost:${port}/\n${network.map(url=>'Network: '+url).join('\n')}\nAdmin: http://localhost:${port}/#/admin\nAdmin password is in .local/admin-password.txt`));
async function close(){await vite?.close();server.close(()=>{store.db.close();process.exit(0);});}
process.on('SIGTERM',close);process.on('SIGINT',close);
