// Application interaction checks with an in-memory DOM adapter.
// These validate rendering and event paths, not Safari layout or browser APIs.
import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {STORAGE_KEY,FLOOR,assertState} from '../dist/core.js';

class Element {
  constructor(id=''){this.id=id;this.innerHTML='';this.textContent='';this.style={};this.dataset={};this.disabled=false;this.isConnected=true;this.content='';}
  classList={add(){},remove(){},toggle(){},contains(){return false;}};
  focus(){} scrollIntoView(){} select(){} remove(){}
  querySelector(){return null;}
  querySelectorAll(){return [];}
  append(){}
}
const elements=new Map(['app','sheet-root','toast','form-error','pin-error'].map(id=>[id,new Element(id)]));
const meta=new Element(),body=new Element(),events=new Map(),values=new Map(),download=[];
Object.defineProperty(globalThis,'crypto',{value:webcrypto,configurable:true});
Object.defineProperty(globalThis,'navigator',{value:{onLine:true,clipboard:{async writeText(text){values.set('clipboard',text);}}},configurable:true});
globalThis.localStorage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};
globalThis.document={
  body,hidden:false,activeElement:null,
  getElementById:id=>elements.get(id)||null,
  querySelector:selector=>selector.startsWith('meta')?meta:null,
  addEventListener:(name,callback)=>events.set(name,callback),
  createElement:()=>{const el=new Element();el.click=()=>download.push(el.download);return el;},
  execCommand:()=>true
};
globalThis.window={scrollTo(){},addEventListener(){}};
globalThis.setInterval=()=>0;
globalThis.setTimeout=callback=>{callback();return 0;};
globalThis.clearTimeout=()=>{};
globalThis.FormData=class{constructor(form){this.fields=form.fields;}get(name){return this.fields[name]??null;}};
await import('../dist/app.js');
const app=()=>elements.get('app').innerHTML;
const sheet=()=>elements.get('sheet-root').innerHTML;
const saved=()=>JSON.parse(values.get(STORAGE_KEY));
async function click(act,id,extra={}){
  const button={dataset:{act,id,...extra},disabled:false};
  const target={classList:{contains:()=>false},closest:()=>button};
  await events.get('click')({target});
}
function submit(id,fields,dataset={}){
  events.get('submit')({target:{id,fields,dataset},preventDefault(){}});
}
test('écran verrouillé, code incorrect puis accès par 2589',async()=>{
  assert.match(app(),/Bonjour, Lucas/);
  assert.doesNotMatch(app(),/Vos transactions/);
  for(const n of '0000')await click('pin',n);
  assert.match(elements.get('pin-error').textContent,/incorrect/);
  for(const n of '2589')await click('pin',n);
  assert.match(app(),/Solde/);
  assert.match(app(),/Lucas Jouvençon/);
  assert.ok(assertState(saved()));
});
test('les cinq onglets et tous les principaux dialogues rendent sans erreur',async()=>{
  for(const [id,expected] of [['home','Vos transactions'],['cards','Vos cartes'],['payments','Paiements'],['savings','Vos poches'],['analytics','Votre argent']]){
    await click('tab',id);assert.match(app(),new RegExp(expected));
  }
  for(const act of ['accounts','topup','send','exchange','request','more','account-details','profile','location','card-details','card-limit','new-card','new-pocket','new-contact','budget','notifications','install']){
    await click(act);assert.match(sheet(),/role="dialog"/);await click('close-sheet');
  }
});
test('ajout, virement et change enregistrés depuis leurs formulaires',async()=>{
  await click('tab','home');
  const before=saved().wallets.EUR;
  await click('topup');submit('topup-form',{amount:'123,45',method:'Carte de démo'});
  assert.equal(saved().wallets.EUR,before+12345);
  await click('send');submit('send-form',{recipient:'Paul',amount:'23,45',currency:'EUR',date:new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Cairo'}),note:'Test démo'});
  assert.equal(saved().wallets.EUR,before+10000);
  await click('exchange');const beforeUSD=saved().wallets.USD;
  submit('exchange-form',{amount:'10',from:'EUR',to:'USD'});
  assert.equal(saved().wallets.USD,beforeUSD+1120);
  assert.ok(assertState(saved()));
});
test('réserve protégée dans le parcours utilisateur',async()=>{
  const before=saved().wallets.EUR;
  await click('send');
  submit('send-form',{recipient:'Paul',amount:String((before-FLOOR+1)/100),currency:'EUR',date:new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Cairo'}),note:''});
  assert.equal(saved().wallets.EUR,before);
  assert.match(elements.get('form-error').textContent,/réserve/);
});
test('création de poche et transferts de valeur cohérents',async()=>{
  await click('tab','savings');
  submit('new-pocket-form',{name:'Voyage Tokyo',target:'3000',icon:'plane'},{pocket:''});
  const p=saved().pockets.at(-1),before=saved().wallets.EUR;
  submit('pocket-form',{amount:'100',direction:'deposit'},{pocket:p.id});
  assert.equal(saved().wallets.EUR,before-10000);
  assert.equal(saved().pockets.find(x=>x.id===p.id).balance,10000);
  submit('pocket-form',{amount:'40',direction:'withdraw'},{pocket:p.id});
  assert.equal(saved().wallets.EUR,before-6000);
});
test('contact, carte, gel, région, mode sombre et recherche',async()=>{
  submit('contact-form',{name:'Test Ami'});
  assert.equal(saved().contacts.at(-1).name,'Test Ami');
  submit('new-card-form',{type:'disposable'});
  const c=saved().cards.extra.at(-1);
  await click('freeze-extra',c.id);assert.equal(saved().cards.extra.at(-1).frozen,true);
  await click('freeze');assert.equal(saved().cards.frozen,true);
  await click('select-location','bangkok');assert.equal(saved().location.regionId,'bangkok');
  assert.equal(saved().theme,'dark');
  await click('toggle-setting','theme');assert.equal(saved().theme,'light');
  await click('search');assert.match(app(),/Rechercher un lieu/);
  await click('filter','out');assert.match(app(),/Transactions/);
});
test('demande fictive, réception idempotente et copie marquée DEMO',async()=>{
  submit('request-form',{name:'Camille',amount:'19,20',currency:'EUR'});
  const r=saved().requests.at(-1),before=saved().wallets.EUR;
  await click('receive-request',r.id);
  assert.equal(saved().wallets.EUR,before+1920);
  await click('receive-request',r.id);
  assert.equal(saved().wallets.EUR,before+1920);
  await click('share-request',r.id);
  assert.match(values.get('clipboard'),/DÉMO LUMA/);
  assert.match(values.get('clipboard'),/Aucun paiement réel/);
});
test('export marqué DEMO, données valides et verrouillage final',async()=>{
  await click('export');
  assert.match(download.at(-1),/^Luma-DEMO-transactions-/);
  assert.ok(assertState(saved()));
  await click('lock');
  assert.match(app(),/Saisissez votre code/);
  assert.doesNotMatch(app(),/Solde/);
});
