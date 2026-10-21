import {networkInterfaces} from 'node:os';
import QRCode from 'qrcode';
import {writeFile} from 'node:fs/promises';

export function lanUrls(port) {
 return [...new Set(Object.values(networkInterfaces()).flat().filter(address => address && address.family === 'IPv4' && !address.internal
  && /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(address.address)).map(address => `http://${address.address}:${port}/#/`))];
}

export async function writeNetworkQr(url, root) {
 await QRCode.toFile(`${root}/public/network-qr.png`, url, {width:640,margin:4,errorCorrectionLevel:'M',color:{dark:'#152321ff',light:'#ffffffff'}});
 await writeFile(`${root}/.local/network.json`, JSON.stringify({url,qrPath:`${root}/public/network-qr.png`}, null, 2));
}
