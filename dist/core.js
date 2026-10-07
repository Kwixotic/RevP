// All amounts are fictional. Ledger values use integer minor currency units.
export const FLOOR = 2300001;
export const VERSION = 1;
export const HISTORY_REVISION = 2;
export const STORAGE_KEY = 'luma-demo-v1';
export const PIN_HASH = '3f3523ac168330e6b429b23d2b25b6c6d7efaf564c1a9f1feaf5398d2bb45318';
export const RATES = { EUR: 1, USD: 1.12, GBP: 0.85, EGP: 55.1, THB: 38.2 };
export const CURRENCIES = {
  EUR: { name: 'Euro', flag: '🇪🇺', symbol: '€' },
  USD: { name: 'Dollar américain', flag: '🇺🇸', symbol: '$' },
  GBP: { name: 'Livre sterling', flag: '🇬🇧', symbol: '£' },
  EGP: { name: 'Livre égyptienne', flag: '🇪🇬', symbol: 'E£' },
  THB: { name: 'Baht thaïlandais', flag: '🇹🇭', symbol: '฿' }
};
export const REGIONS = [
  { id: 'aswan', city: 'Assouan', country: 'Égypte', currency: 'EGP', lat: 24.09, lon: 32.90, tz: 'Africa/Cairo', radius: 130, cost: 0.55, shops: ['Café du Nil', 'Marché d’Assouan', 'Table nubienne', 'Bateau sur le Nil'], flag: '🇪🇬' },
  { id: 'luxor', city: 'Louxor', country: 'Égypte', currency: 'EGP', lat: 25.69, lon: 32.64, tz: 'Africa/Cairo', radius: 140, cost: 0.55, shops: ['Café de la Corniche', 'Marché de Louxor', 'Table de Louxor', 'Taxi local'], flag: '🇪🇬' },
  { id: 'marsa', city: 'Marsa Alam', country: 'Égypte', currency: 'EGP', lat: 25.07, lon: 34.89, tz: 'Africa/Cairo', radius: 150, cost: 0.7, shops: ['Red Sea Coffee', 'Market Marsa Alam', 'Table de la mer Rouge', 'Taxi local'], flag: '🇪🇬' },
  { id: 'cairo', city: 'Le Caire', country: 'Égypte', currency: 'EGP', lat: 30.04, lon: 31.24, tz: 'Africa/Cairo', radius: 700, cost: 0.65, shops: ['Café du quartier', 'Marché du Caire', 'Table du Caire', 'Trajet en ville'], flag: '🇪🇬' },
  { id: 'bangkok', city: 'Bangkok', country: 'Thaïlande', currency: 'THB', lat: 13.76, lon: 100.50, tz: 'Asia/Bangkok', radius: 850, cost: 0.8, shops: ['Thonglor Coffee', 'Market Bangkok', 'Sukhumvit Kitchen', 'Trajet en ville'], flag: '🇹🇭' },
  { id: 'paris', city: 'Paris', country: 'France', currency: 'EUR', lat: 48.85, lon: 2.35, tz: 'Europe/Paris', radius: 1100, cost: 1.55, shops: ['Café des Arts', 'Épicerie du quartier', 'Table du jour', 'Transport urbain'], flag: '🇫🇷' },
  { id: 'london', city: 'Londres', country: 'Royaume-Uni', currency: 'GBP', lat: 51.51, lon: -0.12, tz: 'Europe/London', radius: 700, cost: 1.85, shops: ['Neighbourhood Coffee', 'Local Market', 'Lunch Club', 'City Transport'], flag: '🇬🇧' },
  { id: 'newyork', city: 'New York', country: 'États-Unis', currency: 'USD', lat: 40.71, lon: -74.00, tz: 'America/New_York', radius: 1400, cost: 2, shops: ['Corner Coffee', 'Neighbourhood Market', 'Lunch Counter', 'City Ride'], flag: '🇺🇸' },
  { id: 'dubai', city: 'Dubaï', country: 'Émirats arabes unis', currency: 'USD', lat: 25.20, lon: 55.27, tz: 'Asia/Dubai', radius: 700, cost: 1.7, shops: ['Marina Coffee', 'City Market', 'Marina Kitchen', 'City Ride'], flag: '🇦🇪' },
  { id: 'world', city: 'Ma ville', country: 'International', currency: 'EUR', lat: 0, lon: 0, tz: 'UTC', radius: 0, cost: 1.15, shops: ['Café du quartier', 'Épicerie locale', 'Table du jour', 'Transport local'], flag: '🌍' }
];
export const CATEGORY_META = {
  restaurant: { label: 'Restaurants', icon: 'utensils', color: '#6979f8' },
  coffee: { label: 'Cafés', icon: 'coffee', color: '#b98963' },
  groceries: { label: 'Courses', icon: 'basket', color: '#67a995' },
  transport: { label: 'Transport', icon: 'car', color: '#c49ad9' },
  shopping: { label: 'Shopping', icon: 'bag', color: '#e3a76c' },
  subscription: { label: 'Abonnements', icon: 'repeat', color: '#7d8fa7' },
  income: { label: 'Revenus', icon: 'arrowDown', color: '#37a381' },
  transfer: { label: 'Virements', icon: 'arrows', color: '#7985a9' },
  savings: { label: 'Épargne', icon: 'pocket', color: '#8c74d3' },
  exchange: { label: 'Change', icon: 'exchange', color: '#657bea' },
  topup: { label: 'Ajouts', icon: 'plus', color: '#37a381' }
};
// Merchant labels are illustrative: no visit or real payment is asserted.
export const MERCHANTS = {
  aswan: {
    coffee:['Salah El Din','Al Nour Café','Nile Coffee House'],
    restaurant:['Al Masry','Salah El Din','Nubian Kitchen'],
    groceries:['Ahmed Grocery · Aswan','Al Nour Mini Market','Aswan Souq'],
    transport:['Taxi · Corniche El Nil','Ferry · Elephantine','Aswan Taxi Service'],
    shopping:['Aswan Souq · Artisanat','Al Matar Street Market','Nubian Handicrafts']
  },
  luxor:{
    coffee:['Aboudi Coffee Break','Corniche Coffee House','Nile Terrace Café'],
    restaurant:['Sofra · Luxor','Al Sahaby Lane','Nile Terrace Restaurant'],
    groceries:['Al Nour Market · Luxor','Luxor Mini Market','El Madina Grocery'],
    transport:['Luxor Taxi Service','Ferry · West Bank','Taxi · Karnak'],
    shopping:['Luxor Souq','Karnak Handicrafts','El Madina Bazaar']
  },
  marsa:{
    coffee:['Wunder-Bar · Port Ghalib','Marina Coffee House','Red Sea Espresso'],
    restaurant:['Wunder-Bar · Port Ghalib','Al Sultan','Marina Kitchen'],
    groceries:['Marina Mini Market','Al Nour Market · Marsa','Red Sea Grocery'],
    transport:['Port Ghalib Taxi','Marsa Alam Taxi Service','Red Sea Transfer'],
    shopping:['Port Ghalib Marina Shops','Red Sea Dive Shop','Marsa Souq']
  },
  cairo:{
    coffee:['Costa Coffee','Cilantro','Beanos Café'],
    restaurant:['GAD','Zooba','Abou Tarek'],
    groceries:['Carrefour','Metro Market','Gourmet Egypt'],
    transport:['Uber · Cairo','Careem · Cairo','Cairo Metro'],
    shopping:['Amazon.eg','Decathlon','Citystars · Shopping']
  },
  bangkok:{
    coffee:['Café Amazon','% Arabica · Bangkok','Starbucks · Thonglor','True Coffee'],
    restaurant:['S&P','After You','Foodpanda · Bangkok','Greyhound Café'],
    groceries:['7-Eleven','Tops Market','Villa Market','Big C Mini'],
    transport:['Grab · Bangkok','BTS Skytrain','MRT Bangkok'],
    shopping:['Shopee Thailand','Lazada Thailand','UNIQLO','Terminal 21']
  },
  paris:{
    coffee:['PAUL','Coutume Café','Pret A Manger','Boulangerie du Centre'],
    restaurant:['Big Fernand','Bouillon Chartier','Deliveroo','Bistrot Saint-Paul'],
    groceries:['Carrefour Market','Monoprix','Franprix','Intermarché'],
    transport:['SNCF Connect','Uber · France','RATP · Navigo'],
    shopping:['Amazon.fr','Decathlon','FNAC','UNIQLO']
  },
  london:{
    coffee:['Pret A Manger','Costa Coffee','GAIL’S Bakery'],
    restaurant:['Dishoom','Honest Burgers','Deliveroo UK'],
    groceries:['Tesco Express','Sainsbury’s Local','M&S Food'],
    transport:['TfL · Contactless','Uber · London','Trainline'],
    shopping:['Amazon.co.uk','John Lewis','UNIQLO']
  },
  newyork:{
    coffee:['Blue Bottle Coffee','Starbucks','Joe Coffee'],
    restaurant:['Sweetgreen','Shake Shack','DoorDash'],
    groceries:['Whole Foods Market','Trader Joe’s','Target'],
    transport:['MTA · OMNY','Uber · New York','Lyft'],
    shopping:['Amazon.com','UNIQLO','Apple']
  },
  dubai:{
    coffee:['% Arabica · Dubai','Costa Coffee','Tim Hortons'],
    restaurant:['Operation Falafel','Zaroob','Deliveroo UAE'],
    groceries:['Carrefour UAE','Spinneys','Waitrose'],
    transport:['Careem · Dubai','RTA · Dubai','Uber · Dubai'],
    shopping:['Amazon.ae','Dubai Mall · Shopping','UNIQLO']
  },
  world:{
    coffee:['The Corner Coffee','Maison du Café','Daily Espresso'],
    restaurant:['Bistro Central','The Lunch Counter','Market Kitchen'],
    groceries:['Central Mini Market','Fresh Grocery','Neighbourhood Market'],
    transport:['City Taxi Service','Urban Transit','Station Ticket Office'],
    shopping:['City Bookshop','Central Department Store','Market Boutique']
  }
};
export function merchantLabel(key,regionId,category) {
  const names=(MERCHANTS[regionId]||MERCHANTS.world)[category]||['Paiement'];
  return names[Math.floor(random('merchant-'+key+'-'+regionId+'-'+category)()*names.length)];
}
export function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function random(seed) {
  let a = hash(seed);
  return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function regionById(id) { return REGIONS.find(r => r.id === id) || REGIONS[0]; }
export function distanceKm(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const a = Math.sin((lat2-lat1)*rad/2)**2 + Math.cos(lat1*rad)*Math.cos(lat2*rad)*Math.sin((lon2-lon1)*rad/2)**2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
export function regionFromCoordinates(lat, lon) {
  const candidates = REGIONS.filter(r => r.id !== 'world').map(r => ({ r, d: distanceKm(lat,lon,r.lat,r.lon) })).sort((a,b) => a.d-b.d);
  return candidates.find(c => c.d < c.r.radius)?.r || regionById('world');
}
const DATE_FORMATTERS = new Map();
const TIME_FORMATTERS = new Map();
export function dateKey(date, timeZone = 'Africa/Cairo') {
  if (!DATE_FORMATTERS.has(timeZone)) DATE_FORMATTERS.set(timeZone,new Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric',month:'2-digit',day:'2-digit' }));
  const p = DATE_FORMATTERS.get(timeZone).formatToParts(date);
  const v = Object.fromEntries(p.map(x => [x.type,x.value]));
  return v.year + '-' + v.month + '-' + v.day;
}
export function shiftDay(key, delta) {
  const d = new Date(key + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0,10);
}
function zonedStamp(key, hour, minute, timeZone) {
  const target = new Date(key + 'T' + String(hour).padStart(2,'0') + ':' + String(minute).padStart(2,'0') + ':00Z');
  if (!TIME_FORMATTERS.has(timeZone)) TIME_FORMATTERS.set(timeZone,new Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23' }));
  const parts = TIME_FORMATTERS.get(timeZone).formatToParts(target);
  const p = Object.fromEntries(parts.map(x=>[x.type,x.value]));
  const asUtc = Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
  return new Date(target.getTime() - (asUtc-target.getTime())).toISOString();
}
export function dailyCandidates(key, regionId) {
  const r = regionById(regionId), rng = random('luma-lucas-' + key + '-' + r.id);
  const items = [];
  const templates = [
    { category:'coffee', name:r.shops[0], min:2.1, max:5.8, hour:8, chance:0.83 },
    { category:'restaurant', name:r.shops[2], min:8.2, max:22.6, hour:12, chance:0.91 },
    { category:'transport', name:r.shops[3], min:3.8, max:15.4, hour:16, chance:0.51 },
    { category:'groceries', name:r.shops[1], min:8.5, max:44.4, hour:19, chance:0.41 },
    { category:'shopping', name:'Boutique locale', min:15.2, max:65.8, hour:18, chance:0.11 }
  ];
  templates.forEach((t,i) => {
    const chosen = rng() < t.chance, value = Math.round((t.min + rng()*(t.max-t.min))*r.cost*100);
    const minute = Math.floor(rng()*59), hour = t.hour + Math.floor(rng()*2);
    if (chosen) items.push({
      id:'auto-' + key + '-' + i, timestamp:zonedStamp(key,hour,minute,r.tz),
      name:merchantLabel(key,r.id,t.category), category:t.category, currency:'EUR', amount:-value,
      originalAmount:Math.round(value*RATES[r.currency]), originalCurrency:r.currency,
      region:r.id, city:r.city, method:'Carte virtuelle • 0428', automatic:true, status:'completed'
    });
  });
  const day = +key.slice(-2);
  if (day === 25) items.push({
    id:'auto-' + key + '-income',timestamp:zonedStamp(key,9,17,r.tz),
    name:'Studio Meridian',category:'income',currency:'EUR',amount:325000 + Math.floor(rng()*17500),
    originalCurrency:'EUR',region:r.id,city:r.city,method:'Virement',automatic:true,status:'completed',note:'Mission mensuelle'
  });
  const sub = { 3: ['Spotify Premium', 1099], 10: ['Apple · iCloud+', 299], 18: ['Adobe · Creative Cloud', 1299] }[day];
  if (sub) items.push({
    id:'auto-' + key + '-sub',timestamp:zonedStamp(key,10,4,r.tz),
    name:sub[0],category:'subscription',currency:'EUR',amount:-sub[1],originalCurrency:'EUR',
    region:r.id,city:r.city,method:'Carte virtuelle • 0428',automatic:true,status:'completed'
  });
  return items.sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
}
export function threeMonthsAgo(key) {
  const [year,month,day]=key.split('-').map(Number);
  const target=new Date(Date.UTC(year,month-4,1));
  const last=new Date(Date.UTC(target.getUTCFullYear(),target.getUTCMonth()+1,0)).getUTCDate();
  target.setUTCDate(Math.min(day,last));
  return target.toISOString().slice(0,10);
}
export function historyRegion(key,today) {
  return key>=shiftDay(today,-1)?'aswan':key>=shiftDay(today,-4)?'marsa':key>=shiftDay(today,-33)?'paris':'bangkok';
}
export function initialState(now = new Date()) {
  const today = dateKey(now), start=threeMonthsAgo(today);
  const state = {
    version:VERSION, createdAt:now.toISOString(), profile:{ name:'Lucas Jouvençon', initials:'LJ', handle:'lucas.j', plan:'Plus' },
    wallets:{ EUR:2789642, USD:164828, GBP:48290, EGP:0, THB:0 },
    currency:'EUR', theme:'dark', appearanceRevision:2, historyRevision:HISTORY_REVISION, historyStart:start,
    hideBalance:false, autoSimulation:true, location:{regionId:'aswan',source:'manual',updatedAt:now.toISOString()},
    transactions:[], lastGeneratedDate:shiftDay(start,-1),
    cards:{ frozen:false, online:true, international:true, dailyLimit:50000, last4:'0428', type:'virtual' },
    contacts:[
      {id:'c1',name:'Paul',initials:'P',color:'#dfecf8',handle:'paul.demo'},
      {id:'c2',name:'Camille',initials:'C',color:'#f4e6da',handle:'camille.demo'},
      {id:'c3',name:'Alex',initials:'A',color:'#e6e3f8',handle:'alex.demo'}
    ],
    pockets:[
      {id:'p1',name:'Prochain voyage',icon:'plane',balance:78000,target:200000,color:'#e7edf9'},
      {id:'p2',name:'Fonds de sécurité',icon:'shield',balance:250000,target:500000,color:'#e4f0e9'},
      {id:'p3',name:'Nouveau projet',icon:'spark',balance:32000,target:150000,color:'#f2e8f6'}
    ],
    schedules:[], requests:[], budget:120000, notify:true
  };
  for (let key=start;key<=today;key=shiftDay(key,1)) {
    const region=historyRegion(key,today);
    for (const tx of dailyCandidates(key,region)) if (new Date(tx.timestamp) <= now) applyTransaction(state,tx);
  }
  state.lastGeneratedDate = today;
  return state;
}
export function migrateState(state,now=new Date()) {
  if (state.historyRevision!==HISTORY_REVISION) {
    const today=dateKey(now), start=threeMonthsAgo(today), existing=[...state.transactions];
    const seeded=existing.filter(t=>t.automatic);
    const first=seeded.length?seeded.map(t=>dateKey(new Date(t.timestamp),regionById(t.region).tz)).sort()[0]:today;
    const ids=new Set(existing.map(t=>t.id)), added=[];
    for(let key=start;key<first&&key<=today;key=shiftDay(key,1)){
      for(const tx of dailyCandidates(key,historyRegion(key,today))){
        if(!ids.has(tx.id)&&Date.parse(tx.timestamp)<=now.getTime()){added.push(tx);ids.add(tx.id);}
      }
    }
    const candidateDays=new Map();
    existing.forEach(t=>{
      if(!t.automatic)return;
      const key=dateKey(new Date(t.timestamp),regionById(t.region).tz),cacheKey=key+'-'+t.region;
      if(!candidateDays.has(cacheKey))candidateDays.set(cacheKey,dailyCandidates(key,t.region));
      const candidate=candidateDays.get(cacheKey).find(c=>c.id===t.id);
      if(candidate)t.name=candidate.name;
    });
    const opening={...state.wallets};
    existing.forEach(t=>opening[t.currency]-=t.amount);
    const all=[...added,...existing].sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
    const prefixes=Object.fromEntries(Object.keys(RATES).map(c=>[c,0]));
    const minimums={...prefixes};
    all.forEach(t=>{prefixes[t.currency]+=t.amount;minimums[t.currency]=Math.min(minimums[t.currency],prefixes[t.currency]);});
    for(const c of Object.keys(RATES))opening[c]=Math.max(opening[c],(c==='EUR'?FLOOR:0)-minimums[c]);
    state.wallets=opening;state.transactions=[];
    all.forEach(t=>applyTransaction(state,t));
    state.historyRevision=HISTORY_REVISION;state.historyStart=start;
  }
  if(state.appearanceRevision!==2){state.theme='dark';state.appearanceRevision=2;}
  return state;
}
export function validateAmount(cents) { return Number.isSafeInteger(cents) && cents > 0 && cents <= 100000000; }
export function canDebit(state, currency, cents) {
  if (!validateAmount(cents) || !(currency in RATES)) return false;
  return state.wallets[currency] - cents >= (currency === 'EUR' ? FLOOR : 0);
}
export function applyTransaction(state, tx) {
  if (state.transactions.some(t=>t.id === tx.id)) return false;
  if (!(tx.currency in RATES) || !Number.isSafeInteger(tx.amount) || Math.abs(tx.amount)>100000000 || !Number.isFinite(Date.parse(tx.timestamp))) return false;
  if (tx.amount < 0 && !canDebit(state,tx.currency,-tx.amount)) return false;
  if (!Number.isSafeInteger(state.wallets[tx.currency] + tx.amount)) return false;
  state.wallets[tx.currency] += tx.amount;
  state.transactions.push({ ...tx, status:tx.status || 'completed', balanceAfter:state.wallets[tx.currency] });
  return true;
}
export function rollForward(state, now = new Date()) {
  const r = regionById(state.location.regionId), today = dateKey(now,r.tz);
  if (!state.autoSimulation) { state.lastGeneratedDate = today; processSchedules(state,now); return 0; }
  let start = state.lastGeneratedDate || today;
  if (start > today) start = today;
  if (start < shiftDay(today,-366)) start = shiftDay(today,-366);
  let count = 0;
  const existing = new Set(state.transactions.map(t=>t.id));
  const spent = new Map();
  state.transactions.forEach(t=>{
    if (!t.automatic || t.status!=='completed' || t.amount>=0) return;
    const key=dateKey(new Date(t.timestamp),regionById(t.region).tz);
    spent.set(key,(spent.get(key)||0)-t.amount);
  });
  const activeSince = Math.max(Date.parse(state.location.updatedAt)||0, Date.parse(state.simulationResumedAt)||0);
  for (let key = start; key <= today; key = shiftDay(key,1)) {
    for (const tx of dailyCandidates(key,r.id)) {
      if (existing.has(tx.id) || new Date(tx.timestamp)>now || Date.parse(tx.timestamp)<activeSince) continue;
      existing.add(tx.id);
      const declined = tx.amount<0 && (state.cards.frozen || (tx.category==='subscription' && !state.cards.online) || (!state.cards.international && r.currency!=='EUR') || (spent.get(key)||0)-tx.amount > state.cards.dailyLimit);
      if (declined) {
        state.transactions.push({...tx,status:'declined',attemptedAmount:tx.amount,amount:0,balanceAfter:state.wallets.EUR});
      } else if (applyTransaction(state,tx)) { count++; if(tx.amount<0) spent.set(key,(spent.get(key)||0)-tx.amount); }
    }
  }
  state.lastGeneratedDate = today;
  processSchedules(state,now);
  return count;
}
function userId() { return 'manual-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,9); }
export function sendMoney(state, { recipient, cents, currency='EUR', note='', date=null }, now = new Date()) {
  if (!recipient || !validateAmount(cents)) throw new Error('Renseigne un destinataire et un montant valide.');
  if (!canDebit(state,currency,cents)) throw new Error(currency==='EUR' ? 'Ce montant dépasserait la réserve du compte de 23 000 €. Choisis un montant inférieur.' : 'Le solde de ce compte est insuffisant.');
  if (date && date > dateKey(now,regionById(state.location.regionId).tz)) {
    const item = {id:userId(),recipient,cents,currency,note,date,status:'pending'};
    state.schedules.push(item); return item;
  }
  const tx = {id:userId(),name:recipient,amount:-cents,currency,category:'transfer',note,
    timestamp:now.toISOString(),region:state.location.regionId,city:regionById(state.location.regionId).city,method:'Virement',status:'completed'};
  if (!applyTransaction(state,tx)) throw new Error('Le virement n’a pas pu être enregistré.');
  return tx;
}
export function processSchedules(state, now=new Date()) {
  const today = dateKey(now,regionById(state.location.regionId).tz);
  state.schedules.filter(s=>s.status==='pending' && s.date<=today).forEach(s=>{
    if (!canDebit(state,s.currency,s.cents)) {s.status='failed';return;}
    const tx = {id:s.id,name:s.recipient,amount:-s.cents,currency:s.currency,category:'transfer',note:s.note,
      timestamp:now.toISOString(),region:state.location.regionId,city:regionById(state.location.regionId).city,method:'Virement programmé',status:'completed'};
    if (applyTransaction(state,tx)) s.status='completed';
  });
}
export function topUp(state,cents,currency='EUR',method='Carte',now=new Date()) {
  if (!validateAmount(cents)) throw new Error('Entre un montant valide, inférieur ou égal à 1 000 000.');
  const tx = {id:userId(),name:'Ajout d’argent',amount:cents,currency,category:'topup',timestamp:now.toISOString(),
    region:state.location.regionId,city:regionById(state.location.regionId).city,method:method,status:'completed'};
  if (!applyTransaction(state,tx)) throw new Error('Le montant n’a pas pu être enregistré.');
  return tx;
}
export function exchange(state,cents,from,to,now=new Date()) {
  if (from===to || !(from in RATES) || !(to in RATES)) throw new Error('Choisis deux devises différentes.');
  if (!canDebit(state,from,cents)) throw new Error(from==='EUR' ? 'La réserve du compte de 23 000 € doit être conservée.' : 'Le solde est insuffisant.');
  const receive = Math.round(cents/RATES[from]*RATES[to]);
  if (!receive || !Number.isSafeInteger(state.wallets[to]+receive)) throw new Error('Le montant est invalide.');
  const base = {category:'exchange',timestamp:now.toISOString(),region:state.location.regionId,city:regionById(state.location.regionId).city,method:'Change · taux fixes',status:'completed'};
  const id = userId();
  applyTransaction(state,{...base,id:id+'-out',name:'Change vers '+to,amount:-cents,currency:from});
  applyTransaction(state,{...base,id:id+'-in',name:'Change depuis '+from,amount:receive,currency:to});
  return receive;
}
export function pocketMove(state,pocketId,cents,direction,now=new Date()) {
  const pocket = state.pockets.find(p=>p.id===pocketId);
  if (!pocket || !validateAmount(cents)) throw new Error('Entre un montant valide.');
  if (direction==='deposit' && !canDebit(state,'EUR',cents)) throw new Error('La réserve du compte de 23 000 € doit être conservée.');
  if (direction==='withdraw' && pocket.balance<cents) throw new Error('Cette poche ne contient pas assez d’argent.');
  if (!['deposit','withdraw'].includes(direction)) throw new Error('Action inconnue.');
  const deposit=direction==='deposit';
  const tx = {id:userId(),name:pocket.name,amount:deposit?-cents:cents,currency:'EUR',category:'savings',
    timestamp:now.toISOString(),region:state.location.regionId,city:regionById(state.location.regionId).city,method:deposit?'Vers la poche':'Depuis la poche',status:'completed'};
  if (!applyTransaction(state,tx)) throw new Error('L’opération n’a pas pu être enregistrée.');
  pocket.balance += deposit?cents:-cents;
  return tx;
}
export function monthMetrics(state, month, currency='EUR') {
  const txs = state.transactions.filter(t=>t.currency===currency && t.status==='completed' && dateKey(new Date(t.timestamp),regionById(t.region).tz).startsWith(month));
  const spending = txs.filter(t=>t.amount<0 && !['exchange','savings'].includes(t.category));
  const income = txs.filter(t=>t.amount>0 && !['exchange','savings'].includes(t.category)).reduce((n,t)=>n+t.amount,0);
  const categories = {};
  spending.forEach(t=>{ categories[t.category]=(categories[t.category]||0)-t.amount; });
  return { txs,spending,expense:spending.reduce((n,t)=>n-t.amount,0),income,categories };
}
export function formatMoney(cents,currency='EUR') {
  return new Intl.NumberFormat('fr-FR',{style:'currency',currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(cents/100);
}
export function parseMoney(value) {
  const normalized = String(value).trim().replace(/\s/g,'').replace(',','.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return NaN;
  return Math.round(Number(normalized)*100);
}
export function assertState(state) {
  if (state?.version!==VERSION || !state.wallets || state.wallets.EUR<FLOOR || !Array.isArray(state.transactions)) return false;
  if (Object.keys(RATES).some(c=>!Number.isSafeInteger(state.wallets[c]) || state.wallets[c]<0)) return false;
  if (!state.cards || !Number.isSafeInteger(state.cards.dailyLimit) || state.cards.dailyLimit<0) return false;
  if (!Array.isArray(state.pockets) || state.pockets.some(p=>!Number.isSafeInteger(p.balance)||p.balance<0||!Number.isSafeInteger(p.target)||p.target<=0)) return false;
  if (!Array.isArray(state.contacts)||!Array.isArray(state.schedules)||!Array.isArray(state.requests)||!state.location||!state.profile) return false;
  if (!(state.currency in RATES) || !REGIONS.some(r=>r.id===state.location.regionId)) return false;
  if (!Number.isSafeInteger(state.budget)||state.budget<=0) return false;
  if (state.schedules.some(s=>typeof s.id!=='string'||!(s.currency in RATES)||!validateAmount(s.cents)||typeof s.recipient!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.date))) return false;
  if (state.requests.some(r=>typeof r.id!=='string'||!(r.currency in RATES)||!validateAmount(r.cents)||typeof r.name!=='string')) return false;
  return state.transactions.every(t=>(t.currency in RATES)&&Number.isSafeInteger(t.amount)&&Number.isFinite(Date.parse(t.timestamp))&&typeof t.id==='string'&&typeof t.name==='string');
}
