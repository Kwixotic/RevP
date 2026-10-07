import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {
  FLOOR,PIN_HASH,RATES,initialState,assertState,dailyCandidates,rollForward,canDebit,
  sendMoney,topUp,exchange,pocketMove,monthMetrics,dateKey,shiftDay,regionFromCoordinates,
  formatMoney,parseMoney,applyTransaction,migrateState,threeMonthsAgo
} from '../dist/core.js';

const NOW=new Date('2026-10-07T13:51:24Z');
const fresh=()=>initialState(NOW);
test('le code demandé correspond au hash de 2589',()=>{
  assert.equal(createHash('sha256').update('2589').digest('hex'),PIN_HASH);
  assert.notEqual(createHash('sha256').update('0000').digest('hex'),PIN_HASH);
});
test('historique plausible, multirégion, sans événement futur ni doublon',()=>{
  const s=fresh();
  assert.ok(assertState(s));
  assert.ok(s.wallets.EUR>2300000);
  assert.ok(s.transactions.length>60);
  assert.equal(new Set(s.transactions.map(t=>t.id)).size,s.transactions.length);
  assert.ok(s.transactions.every(t=>new Date(t.timestamp)<=NOW));
  assert.deepEqual(new Set(s.transactions.map(t=>t.region)),new Set(['bangkok','paris','marsa','aswan']));
  for(const currency of Object.keys(RATES)){
    const initial={EUR:2789642,USD:164828,GBP:48290,EGP:0,THB:0}[currency];
    assert.equal(initial+s.transactions.filter(t=>t.currency===currency).reduce((n,t)=>n+t.amount,0),s.wallets[currency]);
  }
  assert.ok(s.transactions.every(t=>t.currency!=='EUR'||t.balanceAfter>=FLOOR));
});
test('simulation déterministe et sensible à la région',()=>{
  assert.deepEqual(dailyCandidates('2026-10-08','aswan'),dailyCandidates('2026-10-08','aswan'));
  assert.notDeepEqual(dailyCandidates('2026-10-08','aswan'),dailyCandidates('2026-10-08','bangkok'));
  const tx=dailyCandidates('2026-10-08','aswan').find(t=>t.amount<0);
  assert.equal(tx.originalCurrency,'EGP');
  assert.equal(tx.originalAmount,Math.round(-tx.amount*RATES.EGP));
});
test('reprise quotidienne idempotente et strictement sans dates futures',()=>{
  const s=fresh(),later=new Date('2026-10-18T16:00:00Z');
  assert.ok(rollForward(s,later)>0);
  const balance=s.wallets.EUR,count=s.transactions.length;
  assert.equal(rollForward(s,later),0);
  assert.equal(s.wallets.EUR,balance);
  assert.equal(s.transactions.length,count);
  assert.ok(s.transactions.every(t=>new Date(t.timestamp)<=later));
});
test('réserve stricte : un virement peut aller à 23 000,01 €, jamais moins',()=>{
  const s=fresh(),available=s.wallets.EUR-FLOOR;
  sendMoney(s,{recipient:'Paul',cents:available},NOW);
  assert.equal(s.wallets.EUR,FLOOR);
  assert.throws(()=>sendMoney(s,{recipient:'Paul',cents:1},NOW),/réserve/);
  assert.equal(canDebit(s,'EUR',1),false);
  assert.ok(assertState(s));
});
test('montants invalides et solde insuffisant refusés sans mutation',()=>{
  const s=fresh(),before=JSON.stringify(s);
  for(const amount of [NaN,-1,0,1.1,Infinity,100000001]){
    assert.throws(()=>topUp(s,amount));
    assert.throws(()=>sendMoney(s,{recipient:'Paul',cents:amount}));
  }
  assert.throws(()=>sendMoney(s,{recipient:'Paul',cents:s.wallets.USD+1,currency:'USD'}),/insuffisant/);
  assert.equal(JSON.stringify(s),before);
});
test('change réversible avec arrondi aux centimes et conservation de la réserve',()=>{
  const s=fresh(),initialEUR=s.wallets.EUR,initialUSD=s.wallets.USD;
  const received=exchange(s,12345,'EUR','USD',NOW);
  assert.equal(s.wallets.USD,initialUSD+received);
  assert.equal(s.wallets.EUR,initialEUR-12345);
  exchange(s,received,'USD','EUR',NOW);
  assert.ok(Math.abs(s.wallets.EUR-initialEUR)<=1);
  const before=JSON.stringify(s);
  assert.throws(()=>exchange(s,s.wallets.EUR-FLOOR+1,'EUR','USD'),/réserve/);
  assert.equal(JSON.stringify(s),before);
});
test('les poches déplacent de la valeur sans en créer',()=>{
  const s=fresh(),total=()=>s.wallets.EUR+s.pockets.reduce((n,p)=>n+p.balance,0),before=total();
  pocketMove(s,'p1',25000,'deposit',NOW);
  assert.equal(total(),before);
  pocketMove(s,'p1',20000,'withdraw',NOW);
  assert.equal(total(),before);
  assert.throws(()=>pocketMove(s,'p1',100000000,'withdraw'),/assez/);
  assert.throws(()=>pocketMove(s,'p1',s.wallets.EUR-FLOOR+1,'deposit'),/réserve/);
});
test('virement programmé exécuté une seule fois, annulation et échec possibles',()=>{
  const s=fresh();
  const transfer=sendMoney(s,{recipient:'Paul',cents:2000,date:'2026-10-09'},NOW);
  assert.equal(transfer.status,'pending');
  assert.ok(!s.transactions.some(t=>t.id===transfer.id));
  rollForward(s,new Date('2026-10-09T12:00:00Z'));
  assert.equal(transfer.status,'completed');
  assert.equal(s.transactions.filter(t=>t.id===transfer.id).length,1);
  rollForward(s,new Date('2026-10-09T14:00:00Z'));
  assert.equal(s.transactions.filter(t=>t.id===transfer.id).length,1);
  const fail=sendMoney(s,{recipient:'Camille',cents:2000,date:'2026-10-10'},new Date('2026-10-09T14:00:00Z'));
  s.wallets.EUR=FLOOR;
  rollForward(s,new Date('2026-10-10T12:00:00Z'));
  assert.equal(fail.status,'failed');
  assert.equal(s.wallets.EUR,FLOOR);
});
test('carte gelée : paiements refusés et aucun débit',()=>{
  const s=fresh();s.cards.frozen=true;const before=s.wallets.EUR;
  rollForward(s,new Date('2026-10-09T21:00:00Z'));
  assert.ok(s.transactions.some(t=>t.status==='declined'));
  assert.equal(s.wallets.EUR,before);
  assert.ok(s.transactions.filter(t=>t.status==='declined').every(t=>t.amount===0&&t.attemptedAmount<0));
});
test('plafond de carte respecté et désactivation de simulation',()=>{
  const s=fresh();s.cards.dailyLimit=500;
  rollForward(s,new Date('2026-10-09T21:00:00Z'));
  const daily=s.transactions.filter(t=>t.automatic&&t.status==='completed'&&t.amount<0&&dateKey(new Date(t.timestamp))==='2026-10-08');
  assert.ok(daily.reduce((n,t)=>n-t.amount,0)<=500);
  s.autoSimulation=false;
  const count=s.transactions.length;
  rollForward(s,new Date('2026-10-23T21:00:00Z'));
  assert.equal(s.transactions.length,count);
});
test('longue période et seuil protégé sur tous les soldes intermédiaires',()=>{
  const s=fresh();
  for(let i=1;i<=36;i++){const later=new Date(NOW);later.setUTCMonth(later.getUTCMonth()+i);rollForward(s,later);}
  assert.ok(s.wallets.EUR>=FLOOR);
  assert.equal(new Set(s.transactions.map(t=>t.id)).size,s.transactions.length);
  assert.ok(s.transactions.filter(t=>t.currency==='EUR').every(t=>t.balanceAfter>=FLOOR));
  assert.ok(assertState(s));
});
test('changer de localisation ne recrée pas les paiements passés',()=>{
  const s=fresh(),before=s.transactions.length;
  s.location={regionId:'bangkok',source:'gps',updatedAt:NOW.toISOString()};
  rollForward(s,NOW);
  assert.equal(s.transactions.length,before);
});
test('géolocalisation par région et fuseaux horaires',()=>{
  assert.equal(regionFromCoordinates(24.09,32.9).id,'aswan');
  assert.equal(regionFromCoordinates(13.75,100.52).id,'bangkok');
  assert.equal(regionFromCoordinates(40.71,-74).id,'newyork');
  assert.equal(regionFromCoordinates(-33.9,151.2).id,'world');
  assert.equal(dateKey(new Date('2026-10-07T23:00:00Z'),'Asia/Bangkok'),'2026-10-08');
  assert.equal(shiftDay('2026-12-31',1),'2027-01-01');
});
test('statistiques excluent les échanges et transferts de poche',()=>{
  const s=fresh(),before=monthMetrics(s,'2026-10');
  exchange(s,10000,'EUR','USD',NOW);pocketMove(s,'p1',10000,'deposit',NOW);
  const after=monthMetrics(s,'2026-10');
  assert.equal(after.expense,before.expense);
  assert.equal(after.income,before.income);
  assert.equal(Object.values(after.categories).reduce((n,v)=>n+v,0),after.expense);
});
test('saisie française en centimes, contrôle du stockage et dédoublonnage',()=>{
  assert.equal(parseMoney('1 234,56'),123456);
  assert.equal(parseMoney('0.01'),1);
  for(const value of ['-1','1e4','2,222','abc',''])assert.ok(Number.isNaN(parseMoney(value)));
  assert.ok(formatMoney(2300001).includes('23'));
  const s=fresh(),tx={id:'manual-test',timestamp:NOW.toISOString(),currency:'EUR',amount:1000,name:'Test',category:'income'};
  assert.equal(applyTransaction(s,tx),true);
  assert.equal(applyTransaction(s,tx),false);
  const broken=structuredClone(s);broken.wallets.EUR=2300000;
  assert.equal(assertState(broken),false);
});
test('trois mois calendaires glissants, mois courts et sombre par défaut',()=>{
  const s=fresh();
  assert.equal(s.historyStart,'2026-07-07');
  assert.equal(s.theme,'dark');
  assert.equal(threeMonthsAgo('2026-05-31'),'2026-02-28');
  assert.equal(threeMonthsAgo('2028-05-31'),'2028-02-29');
  assert.equal(threeMonthsAgo('2026-01-07'),'2025-10-07');
  assert.ok(s.transactions.length>250);
  assert.deepEqual(new Set(s.transactions.map(t=>dateKey(new Date(t.timestamp)).slice(0,7))),new Set(['2026-07','2026-08','2026-09','2026-10']));
  assert.ok(s.transactions.every(t=>dateKey(new Date(t.timestamp))>=s.historyStart));
});
test('enseignes variées par ville et abonnements nommés',()=>{
  const s=fresh();
  const bangkok=s.transactions.filter(t=>t.region==='bangkok'&&t.category==='groceries');
  assert.ok(new Set(bangkok.map(t=>t.name)).size>=3);
  assert.ok(bangkok.some(t=>t.name==='7-Eleven'));
  assert.ok(s.transactions.some(t=>t.name==='Spotify Premium'));
  assert.ok(s.transactions.some(t=>t.name==='Apple · iCloud+'));
  assert.ok(s.transactions.some(t=>t.name==='Adobe · Creative Cloud'));
  assert.ok(!s.transactions.some(t=>['Boutique locale','Table du jour','Marché d’Assouan','Musique · abonnement'].includes(t.name)));
});
test('mise à jour d’une ancienne simulation sans perte des opérations personnelles',()=>{
  const full=fresh();
  const original={...full,theme:'light',transactions:[],wallets:{EUR:2789642,USD:164828,GBP:48290,EGP:0,THB:0}};
  delete original.historyRevision;delete original.historyStart;delete original.appearanceRevision;
  full.transactions.filter(t=>dateKey(new Date(t.timestamp))>='2026-09-04').forEach(t=>applyTransaction(original,{...t}));
  const manual=sendMoney(original,{recipient:'Paul',cents:1234,note:'Dîner personnel'},NOW);
  pocketMove(original,'p1',3500,'deposit',NOW);
  original.contacts.push({id:'custom-contact',name:'Mon ami',initials:'MA',color:'#e7edf9'});
  original.cards.extra=[{id:'custom-card',type:'virtual',last4:'8812',frozen:true}];
  original.cards.frozen=true;
  const pocket=structuredClone(original.pockets),contacts=structuredClone(original.contacts),cards=structuredClone(original.cards);
  const beforeIds=new Set(original.transactions.map(t=>t.id)),beforeAmount=manual.amount;
  migrateState(original,NOW);
  assert.ok(assertState(original));
  assert.equal(original.theme,'dark');
  assert.equal(original.historyStart,'2026-07-07');
  assert.ok(original.transactions.length>250);
  assert.ok([...beforeIds].every(id=>original.transactions.some(t=>t.id===id)));
  assert.deepEqual(original.pockets,pocket);
  assert.deepEqual(original.contacts,contacts);
  assert.deepEqual(original.cards,cards);
  const retained=original.transactions.find(t=>t.id===manual.id);
  assert.equal(retained.amount,beforeAmount);
  assert.equal(retained.note,'Dîner personnel');
  assert.equal(retained.timestamp,NOW.toISOString());
  assert.ok(original.transactions.filter(t=>t.currency==='EUR').every(t=>t.balanceAfter>=FLOOR));
  for(const c of Object.keys(RATES)){
    const start={EUR:2789642,USD:164828,GBP:48290,EGP:0,THB:0}[c];
    assert.equal(original.wallets[c],start+original.transactions.filter(t=>t.currency===c).reduce((n,t)=>n+t.amount,0));
  }
  const snapshot=JSON.stringify(original);
  migrateState(original,NOW);
  assert.equal(JSON.stringify(original),snapshot);
  original.theme='light';
  migrateState(original,NOW);
  assert.equal(original.theme,'light');
});
