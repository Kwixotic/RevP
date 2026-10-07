import {
  FLOOR,STORAGE_KEY,PIN_HASH,RATES,CURRENCIES,REGIONS,CATEGORY_META,
  initialState,migrateState,assertState,rollForward,dateKey,shiftDay,regionById,regionFromCoordinates,
  sendMoney,topUp,exchange,pocketMove,monthMetrics,formatMoney,parseMoney,applyTransaction
} from './core.js?v=4';

const ICONS = {
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  cards:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/>',
  arrows:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  chart:'<path d="M4 20h16M6 16v-5m6 5V5m6 11V8"/>',
  pocket:'<path d="M4 5h16v9a8 8 0 0 1-16 0z"/><path d="m8 12 4 4 4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrowUp:'<path d="M12 20V4m-6 6 6-6 6 6"/>',
  arrowDown:'<path d="M12 4v16m-6-6 6 6 6-6"/>',
  exchange:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  back:'<path d="m14 5-7 7 7 7"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="m3 3 18 18M10 5a12 12 0 0 1 12 7c-1 2-3 4-5 5M6 6c-2 1-3 3-4 6 3 5 7 7 10 7 1 0 2 0 3-1M10 10a3 3 0 0 0 4 4"/>',
  coffee:'<path d="M4 3h13v11a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 5h2a3 3 0 0 1 0 6h-2M3 22h15"/>',
  utensils:'<path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18M19 3c-4 3-4 8 0 9v9M19 3v9"/>',
  basket:'<path d="m3 9 2 11h14l2-11zM2 9h20M8 9l4-6 4 6M9 13v4m6-4v4"/>',
  car:'<path d="m5 4-3 8v6h20v-6l-3-8zM2 12h20M5 18v3m14-3v3M6 15h1m10 0h1"/>',
  bag:'<path d="M4 7h16l1 14H3zM8 8V6a4 4 0 0 1 8 0v2"/>',
  repeat:'<path d="M20 7H5l3-3M4 17h15l-3 3M20 7l-3 3M4 17l3-3M4 7v4m16 2v4"/>',
  plane:'<path d="m21 3-7 18-3-8-8-3zM11 13 21 3"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  spark:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7z"/>',
  location:'<path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0z"/><circle cx="12" cy="9" r="2"/>',
  snow:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M8 4l4 3 4-3M8 20l4-3 4 3M3 11l4-1-1-4m15 7-4 1 1 4M3 13l4 1-1 4m15-7-4-1 1-4"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  settings:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="9" cy="18" r="2" fill="currentColor"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18z"/>',
  moon:'<path d="M20 14a9 9 0 0 1-10-10 9 9 0 1 0 10 10z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  share:'<path d="M12 15V3m-4 4 4-4 4 4M7 10H4v11h16V10h-3"/>',
  delete:'<path d="M3 6h18M9 3h6M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
  backspace:'<path d="M9 5h12v14H9l-7-7zM12 9l5 6m0-6-5 6"/>',
  wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01"/>'
};
const icon = (name,extra='') => `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.cards}</svg>`;
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state,storageAvailable=true;
try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); state=assertState(saved)?migrateState(saved):initialState(); }
catch { state=initialState(); storageAvailable=false; }
let unlocked=false,tab='home',view='main',filter='all',search='',pin='',pinChecking=false,attempts=0,blockedUntil=0;
let activeMonth=dateKey(new Date()).slice(0,7),showCard=false,hiddenAt=0,lastActive=Date.now(),toastTimer,previousFocus;
const root=document.getElementById('app'),sheetRoot=document.getElementById('sheet-root');
const money=(amount,currency='EUR')=>state.hideBalance?'••••':formatMoney(amount,currency);
const currentRegion=()=>regionById(state.location.regionId);
const nowDay=()=>dateKey(new Date(),currentRegion().tz);
const ordered=()=>[...state.transactions].sort((a,b)=>b.timestamp.localeCompare(a.timestamp));
function persist() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state));storageAvailable=true; }
  catch { storageAvailable=false; toast('La sauvegarde locale est indisponible. Cette session reste utilisable.'); }
}
function theme() {
  document.body.classList.toggle('dark',state.theme==='dark');
  document.querySelector('meta[name="theme-color"]').content=state.theme==='dark'?'#111721':'#f8f9fc';
}
function toast(message) {
  const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3700);
}
function topbar() {
  return `<header class="topbar"><button class="profile-button" data-act="profile" aria-label="Profil de Lucas Jouvençon"><span class="avatar">LJ</span><span><span class="profile-name">Lucas Jouvençon</span><span class="profile-caption" style="display:block">Compte personnel</span></span></button><div class="top-tools"><button class="icon-button" data-act="search" aria-label="Rechercher une transaction">${icon('search')}</button><button class="icon-button" data-act="notifications" aria-label="Notifications">${icon('bell')}</button></div></header>`;
}
function nav() {
  const tabs=[['home','home','Accueil'],['cards','cards','Cartes'],['payments','arrows','Paiements'],['savings','pocket','Épargne'],['analytics','chart','Analyse']];
  return `<nav class="nav" aria-label="Navigation principale">${tabs.map(([id,i,label])=>`<button class="nav-item ${tab===id&&view==='main'?'active':''}" data-act="tab" data-id="${id}" ${tab===id&&view==='main'?'aria-current="page"':''}>${icon(i)}<span>${label}</span></button>`).join('')}</nav>`;
}
function categoryMeta(t) {return CATEGORY_META[t.category]||CATEGORY_META.transfer;}
function txRow(t) {
  const c=categoryMeta(t),shown=t.status==='declined'?t.attemptedAmount:t.amount;
  const stamp=new Intl.DateTimeFormat('fr-FR',{timeZone:regionById(t.region).tz,hour:'2-digit',minute:'2-digit'}).format(new Date(t.timestamp));
  const original=t.originalAmount&&t.originalCurrency!==t.currency?formatMoney(t.originalAmount,t.originalCurrency):c.label;
  return `<button class="tx-row" data-act="transaction" data-id="${esc(t.id)}"><span class="tx-icon" style="background:${c.color}13;color:${c.color}">${icon(c.icon)}</span><span class="tx-body"><span class="tx-name" style="display:block">${esc(t.name)}</span><span class="tx-sub" style="display:block">${esc(t.city||'En ligne')} · ${esc(stamp)}${t.status==='declined'?' · Refusé':''}</span></span><span class="tx-values"><span class="tx-amount ${shown>0?'positive':''} ${t.status==='declined'?'declined':''}" style="display:block">${shown>0?'+':''}${esc(money(shown,t.currency))}</span><span class="tx-original" style="display:block">${esc(state.hideBalance?'••••':original)}</span></span></button>`;
}
function txGroups(transactions,limit=null) {
  const list=limit?transactions.slice(0,limit):transactions;
  if (!list.length) return `<div class="panel empty">${icon('arrows')}Aucune transaction pour ce compte.<br>Ajoute de l’argent pour commencer.</div>`;
  const groups=new Map();
  list.forEach(t=>{const key=dateKey(new Date(t.timestamp),currentRegion().tz);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(t);});
  return [...groups].map(([key,items])=>{
    const label=key===nowDay()?'Aujourd’hui':key===shiftDay(nowDay(),-1)?'Hier':new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'long'}).format(new Date(key+'T12:00:00Z'));
    return `<div class="date-group">${label}</div><div class="transactions">${items.map(txRow).join('')}</div>`;
  }).join('');
}
function balanceHTML() {
  if(state.hideBalance)return '•• •••<span class="decimals">,•• '+esc(CURRENCIES[state.currency].symbol)+'</span>';
  const parts=new Intl.NumberFormat('fr-FR',{style:'currency',currency:state.currency}).formatToParts(state.wallets[state.currency]/100);
  const before=parts.filter(p=>['integer','group'].includes(p.type)).map(p=>p.value).join('');
  const tail=parts.filter(p=>!['integer','group'].includes(p.type)).map(p=>p.value).join('');
  return esc(before)+'<span class="decimals">'+esc(tail)+'</span>';
}
function home() {
  const c=CURRENCIES[state.currency],r=currentRegion(),metrics=monthMetrics(state,nowDay().slice(0,7));
  return `${topbar()}<section class="hero"><button class="account-select" data-act="accounts"><span class="flag">${c.flag}</span><span>Compte principal · ${state.currency}</span>${icon('down')}</button><p class="balance-label">Solde <button class="balance-toggle" data-act="hide" aria-label="${state.hideBalance?'Afficher les montants':'Masquer les montants'}">${icon(state.hideBalance?'eyeOff':'eye')}</button></p><h1 class="balance" style="${state.wallets[state.currency]>10000000?'font-size:34px':''}">${balanceHTML()}</h1><button class="account-detail" data-act="account-details">${icon('info')}<span>Coordonnées</span>${icon('chevron')}</button></section>
  <div class="quick-actions">${[['topup','plus','Ajouter'],['send','arrowUp','Envoyer'],['exchange','exchange','Échanger'],['more','more','Plus']].map(([act,i,t])=>`<button class="quick-action" data-act="${act}"><span class="quick-icon">${icon(i)}</span><span>${t}</span></button>`).join('')}</div>
  <button class="mini-promo" data-act="tab" data-id="savings"><span class="promo-icon">${icon('plane')}</span><span><h3>Votre prochaine escale.</h3><p>Un voyage en tête ?<br>Votre épargne vous accompagne.</p></span>${icon('chevron')}</button>
  <div class="section-title"><h2>Vos transactions</h2><button data-act="all-transactions">Tout voir ${icon('chevron')}</button></div>
  ${txGroups(ordered().filter(t=>t.currency===state.currency),5)}
  <div class="activity-foot">${icon('location')}<button data-act="location">${r.flag} ${esc(r.city)} · activité</button></div>
  <button class="panel" style="width:100%;display:flex;align-items:center;justify-content:space-between;text-align:left;margin-top:23px" data-act="tab" data-id="analytics"><span><span style="font-size:11px;color:var(--sub);display:block;margin-bottom:7px">Dépenses du mois · EUR</span><span style="font-size:23px;letter-spacing:-.8px;font-weight:600">${esc(money(metrics.expense))}</span></span>${icon('chart')}</button>
  `;
}
function cardVisual(extra=null) {
  const frozen=extra?extra.frozen:state.cards.frozen,last4=extra?extra.last4:state.cards.last4;
  return `<div class="card-visual ${frozen?'frozen':''}"><div class="card-top"><span class="card-brand">luma</span></div><div class="card-chip" aria-hidden="true">${Array.from({length:6},()=>'<i></i>').join('')}</div><div class="card-number">${showCard?'TEST 0000 0000':'•••• •••• ••••'} ${esc(last4)}</div><div class="card-bottom"><span class="card-holder">Lucas Jouvençon<br><span style="display:block;margin-top:6px;font-size:8px;color:#8b9ab0">CARTE ${extra?.type==='disposable'?'ÉPHÉMÈRE':'VIRTUELLE'}</span></span><span class="card-mark" aria-hidden="true"></span></div></div>`;
}
function toggleRow(label,description,key,enabled,i) {
  return `<div class="setting-row"><div class="setting-left">${icon(i)}<div><div class="setting-name">${label}</div><div class="setting-description">${description}</div></div></div><button class="toggle ${enabled?'on':''}" data-act="toggle-setting" data-id="${key}" role="switch" aria-checked="${enabled}" aria-label="${label}"></button></div>`;
}
function cards() {
  return `${topbar()}<p class="page-eyebrow">À portée de main</p><h1 class="page-heading">Vos cartes.</h1>${cardVisual()}<div class="card-status ${state.cards.frozen?'frozen':''}"><span class="dot"></span>${state.cards.frozen?'Carte gelée':'Carte active'} · Virtuelle</div>
  <div class="three-actions"><button class="tile-action" data-act="card-details">${icon('eye')}Détails</button><button class="tile-action" data-act="freeze">${icon('snow')}${state.cards.frozen?'Dégeler':'Geler'}</button><button class="tile-action" data-act="card-limit">${icon('settings')}Limite</button></div>
  <div class="panel">${toggleRow('Paiements en ligne','Abonnements et achats','online',state.cards.online,'globe')}${toggleRow('À l’étranger','Transactions en devise locale','international',state.cards.international,'plane')}<button class="setting-row" style="width:100%;text-align:left" data-act="card-limit"><span class="setting-left">${icon('chart')}<span><span class="setting-name" style="display:block">Plafond quotidien</span><span class="setting-description" style="display:block">${esc(money(state.cards.dailyLimit))} / jour</span></span></span>${icon('chevron')}</button></div>
  ${(state.cards.extra||[]).map(c=>`<button class="pocket" data-act="extra-card" data-id="${esc(c.id)}"><span class="pocket-top"><span class="pocket-icon" style="background:var(--soft)">${icon('cards')}</span><span><span class="pocket-name" style="display:block">Carte ${c.type==='disposable'?'éphémère':'virtuelle'}</span><span class="setting-description" style="display:block">•••• ${esc(c.last4)} · ${c.frozen?'Gelée':'Active'}</span></span>${icon('chevron')}</span></button>`).join('')}
  <button class="outline-button" data-act="new-card">${icon('plus')}Créer une carte</button><p class="demo-footnote">Ces cartes ne permettent aucun paiement réel.</p>`;
}
function contactsHTML() {
  return `<div class="contact-list">${state.contacts.map(c=>`<button class="contact" data-act="send" data-id="${esc(c.id)}"><span class="contact-circle" style="background:${esc(c.color)}">${esc(c.initials)}</span><span>${esc(c.name.split(' ')[0])}</span></button>`).join('')}<button class="contact contact-add" data-act="new-contact"><span class="contact-circle">${icon('plus')}</span><span>Ajouter</span></button></div>`;
}
function payments() {
  const pending=state.schedules.filter(s=>s.status==='pending');
  return `${topbar()}<p class="page-eyebrow">Un geste, et c’est envoyé</p><h1 class="page-heading">Paiements.</h1>${contactsHTML()}<div class="payment-grid"><button class="payment-tile" data-act="send">${icon('arrowUp')}<h3>Envoyer</h3><p>Un virement à un contact<br>ou à un bénéficiaire.</p></button><button class="payment-tile" data-act="request">${icon('arrowDown')}<h3>Demander</h3><p>Préparez une demande<br>de paiement.</p></button><button class="payment-tile" data-act="exchange">${icon('exchange')}<h3>Changer de devise</h3><p>Cinq devises,<br>un même espace.</p></button><button class="payment-tile" data-act="send" data-schedule="1">${icon('clock')}<h3>Programmer</h3><p>Choisissez une date<br>pour un envoi.</p></button></div>
  <div class="section-title"><h2>À venir</h2><span style="font-size:11px;color:var(--sub)">${pending.length} programmé${pending.length>1?'s':''}</span></div>
  <div class="transactions">${pending.length?pending.map(s=>`<button class="tx-row" data-act="schedule-details" data-id="${esc(s.id)}"><span class="tx-icon" style="background:var(--accent-soft);color:var(--accent)">${icon('clock')}</span><span class="tx-body"><span class="tx-name" style="display:block">${esc(s.recipient)}</span><span class="tx-sub" style="display:block">${esc(s.date)} · Virement</span></span><span class="tx-amount">${esc(money(s.cents,s.currency))}</span></button>`).join(''):`<div class="empty">${icon('clock')}Rien de prévu pour le moment.<br>Vos prochains virements apparaîtront ici.</div>`}</div>
  ${state.requests.length?`<div class="section-title"><h2>Vos demandes</h2></div><div class="transactions">${[...state.requests].reverse().map(r=>`<button class="tx-row" data-act="request-details" data-id="${esc(r.id)}"><span class="tx-icon" style="background:#e4f2ed;color:#329477">${icon('arrowDown')}</span><span class="tx-body"><span class="tx-name" style="display:block">${esc(r.name)}</span><span class="tx-sub" style="display:block">${r.status==='received'?'Réception':'En attente'}</span></span><span class="tx-amount">${esc(money(r.cents,r.currency))}</span></button>`).join('')}</div>`:''}
  `;
}
function savings() {
  const total=state.pockets.reduce((n,p)=>n+p.balance,0);
  return `${topbar()}<p class="page-eyebrow">Faire de la place à vos projets</p><h1 class="page-heading">Vos poches.</h1><div class="savings-total"><p>Épargne totale</p><h2>${esc(money(total))}</h2>${icon('pocket')}</div>
  ${state.pockets.map(p=>{const pct=Math.min(100,Math.round(p.balance/p.target*100));return `<button class="pocket" data-act="pocket" data-id="${esc(p.id)}"><span class="pocket-top"><span class="pocket-icon" style="background:${esc(p.color)}">${icon(p.icon)}</span><span class="pocket-name">${esc(p.name)}</span><span style="margin-left:auto;color:var(--sub)">${icon('chevron')}</span></span><div class="pocket-amount">${esc(money(p.balance))}</div><div class="pocket-progress"><span style="width:${pct}%"></span></div><div class="pocket-meta"><span>Objectif ${esc(money(p.target))}</span><span>${pct} %</span></div></button>`;}).join('')}
  <button class="outline-button" data-act="new-pocket">${icon('plus')}Créer une poche</button><p class="demo-footnote">Organisez vos projets avec des poches et des objectifs.</p>`;
}
function chartSVG(metrics) {
  const weeks=[0,0,0,0,0];
  metrics.spending.forEach(t=>{const day=+dateKey(new Date(t.timestamp),regionById(t.region).tz).slice(-2);weeks[Math.min(4,Math.floor((day-1)/7))]-=t.amount;});
  const max=Math.max(...weeks,1);
  return `<svg class="bar-chart" viewBox="0 0 350 145" role="img" aria-label="Dépenses par semaine"><path d="M0 108H350M0 60H350M0 12H350" stroke="var(--line)" stroke-dasharray="3 4"/>${weeks.map((v,i)=>{const height=Math.max(3,88*v/max),x=18+i*68;return `<rect x="${x}" y="${108-height}" width="38" height="${height}" rx="8" fill="${i===3?'#667ff1':'#c2cef3'}"/><text x="${x+19}" y="135" text-anchor="middle" font-size="10" fill="var(--sub)">S${i+1}</text><title>Semaine ${i+1} : ${esc(formatMoney(v))}</title>`;}).join('')}</svg>`;
}
function analytics() {
  const stats=monthMetrics(state,activeMonth),categories=Object.entries(stats.categories).sort((a,b)=>b[1]-a[1]),pct=Math.min(100,stats.expense/state.budget*100);
  const monthLabel=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(new Date(activeMonth+'-15T12:00:00Z'));
  return `${topbar()}<p class="page-eyebrow">Une vue d’ensemble</p><h1 class="page-heading">Votre argent.</h1><div class="month-bar"><button class="icon-button" data-act="month" data-id="-1" aria-label="Mois précédent">${icon('back')}</button><h2>${monthLabel}</h2><button class="icon-button" data-act="month" data-id="1" aria-label="Mois suivant" ${activeMonth>=nowDay().slice(0,7)?'disabled':''}>${icon('chevron')}</button></div>
  <div class="stat-grid"><div class="stat-card">${icon('arrowUp')}<p>Dépenses · EUR</p><h3>${esc(money(stats.expense))}</h3></div><div class="stat-card">${icon('arrowDown')}<p>Entrées · EUR</p><h3 class="positive">${esc(money(stats.income))}</h3></div></div>
  <div class="chart-panel"><div class="chart-header"><span>Le rythme du mois</span><small>EUR</small></div>${state.hideBalance?'<div class="empty">Montants masqués</div>':chartSVG(stats)}</div>
  <div class="section-title"><h2>Où va votre argent ?</h2></div><div class="panel" style="margin-top:0">${categories.length?categories.map(([cat,value])=>{const c=CATEGORY_META[cat]||CATEGORY_META.transfer;return `<div class="category-row"><span class="category-dot" style="background:${c.color}"></span><span class="category-name">${c.label}</span><span class="category-value">${esc(money(value))}<small>${Math.round(value/stats.expense*100)} %</small></span></div>`;}).join(''):'<div class="empty">Aucune dépense sur cette période.</div>'}</div>
  <div class="panel"><div class="chart-header"><span>Budget mensuel</span><button data-act="budget" style="color:var(--accent);font-size:11px">Modifier</button></div><span style="font-size:23px;letter-spacing:-.7px;font-weight:600">${esc(money(Math.max(0,state.budget-stats.expense)))}</span><p style="font-size:11px;color:var(--sub);margin-top:6px">${stats.expense>state.budget?'Budget dépassé':'encore disponibles sur votre budget'}</p><div class="budget-track"><span style="width:${pct}%"></span></div><div class="budget-figures"><span>${esc(money(stats.expense))} utilisés</span><span>${esc(money(state.budget))}</span></div></div>
  <button class="outline-button" data-act="export">${icon('download')}Exporter les données</button><p class="demo-footnote">Le change et les mouvements<br>d’épargne sont exclus des dépenses.</p>`;
}
function allTransactions() {
  let txs=ordered().filter(t=>t.currency===state.currency);
  if(filter==='out')txs=txs.filter(t=>t.amount<0);
  if(filter==='in')txs=txs.filter(t=>t.amount>0);
  if(filter==='card')txs=txs.filter(t=>t.automatic);
  if(search)txs=txs.filter(t=>(t.name+' '+t.city+' '+(t.note||'')+' '+categoryMeta(t).label).toLocaleLowerCase('fr').includes(search.toLocaleLowerCase('fr')));
  return `<div class="back-heading"><button class="icon-button" data-act="back-main" aria-label="Retour">${icon('back')}</button><h1>Transactions</h1><span style="margin-left:auto"></span></div><div class="search-field">${icon('search')}<input id="tx-search" type="search" placeholder="Rechercher un lieu, un paiement…" aria-label="Rechercher" value="${esc(search)}"></div><div class="chips">${[['all','Tout'],['out','Dépenses'],['in','Entrées'],['card','Carte']].map(([id,l])=>`<button class="chip ${filter===id?'active':''}" data-act="filter" data-id="${id}">${l}</button>`).join('')}</div><div style="display:flex;justify-content:space-between;color:var(--sub);font-size:10px"><span>${txs.length} transaction${txs.length>1?'s':''} · ${state.currency}</span><button data-act="accounts">Changer de compte</button></div><div id="tx-results">${txs.length?txGroups(txs):'<div class="panel empty">Aucun résultat pour cette recherche.</div>'}</div>`;
}
function lockHTML() {
  const cooldown=blockedUntil>Date.now();
  return `<section class="lock-screen"><div class="lock-top"><span class="lock-brand">luma</span></div><div class="lock-center"><div class="lock-avatar">LJ</div><h1>Bonjour, Lucas.</h1><p>Votre espace personnel vous attend.<br>Saisissez votre code à 4 chiffres.</p><div class="pin-dots" aria-label="${pin.length} chiffres saisis">${[0,1,2,3].map(i=>`<span class="pin-dot ${i<pin.length?'filled':''}"></span>`).join('')}</div><div id="pin-error" class="pin-error" role="status">${cooldown?'Réessayez dans '+Math.ceil((blockedUntil-Date.now())/1000)+' s':''}</div></div><div class="keypad">${[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ']].map(([n,l])=>`<button class="key" data-act="pin" data-id="${n}" aria-label="${n}" ${cooldown?'disabled':''}>${n}<small>${l}</small></button>`).join('')}<button class="key subtle" data-act="pin-help">Aide</button><button class="key" data-act="pin" data-id="0" aria-label="0" ${cooldown?'disabled':''}>0</button><button class="key subtle" data-act="pin-delete" aria-label="Effacer le dernier chiffre">${icon('backspace')}</button></div></section>`;
}
function render() {
  theme();
  if(!unlocked){root.innerHTML=lockHTML();return;}
  const content=view==='transactions'?allTransactions():({home,cards,payments,savings,analytics}[tab]||home)();
  root.innerHTML=`<section class="screen">${content}${!storageAvailable?'<div class="info-box neutral">Les données ne peuvent pas être sauvegardées dans ce navigateur.</div>':''}</section>${nav()}`;
}
function openSheet(title,content) {
  previousFocus=document.activeElement;
  sheetRoot.innerHTML=`<div class="sheet-backdrop"><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1"><div class="sheet-handle"></div><div class="sheet-header"><h2 id="sheet-title">${esc(title)}</h2><button class="icon-button" data-act="close-sheet" aria-label="Fermer">${icon('close')}</button></div>${content}</section></div>`;
  document.body.style.overflow='hidden';
  setTimeout(()=>sheetRoot.querySelector('input:not([type=range]),select,button,.sheet')?.focus(),60);
}
function closeSheet() {sheetRoot.innerHTML='';document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus();}
function error(message) {const el=document.getElementById('form-error');if(el){el.textContent=message;el.scrollIntoView({block:'nearest'});}else toast(message);}
const errorHTML=()=>'<p id="form-error" class="form-error" role="alert"></p>';
const currencyOptions=(selected)=>Object.keys(CURRENCIES).map(c=>`<option value="${c}" ${selected===c?'selected':''}>${CURRENCIES[c].flag} ${c}</option>`).join('');
function success(title,copy) {
  persist();render();
  openSheet(title,`<div class="success-mark">${icon('check')}</div><h3 class="success-title">${esc(title)}</h3><p class="success-copy">${esc(copy)}</p><div class="info-box neutral">Opération enregistrée dans votre espace.</div><button class="primary-button" data-act="close-sheet">Terminé</button>`);
}
function detailsRow(label,value){
  if(label==='Méthode')value=String(value).replace(/ · (?:simulé|simulation|démo)/g,'').replace(/ simulée?s?/g,'').replace(/ de démo/g,'');
  return `<div class="detail-row"><span>${esc(label)}</span><span>${esc(value)}</span></div>`;
}
function accountSheet() {
  openSheet('Vos comptes',`<p class="sheet-sub">Cinq devises pour vos déplacements.</p><div class="transactions">${Object.entries(CURRENCIES).map(([c,meta])=>`<button class="tx-row" data-act="select-account" data-id="${c}"><span class="contact-circle" style="height:42px;width:42px;background:var(--soft);font-size:22px">${meta.flag}</span><span class="tx-body"><span class="tx-name" style="display:block">${meta.name}</span><span class="tx-sub" style="display:block">${c} · Compte</span></span><span class="tx-amount">${esc(money(state.wallets[c],c))}</span>${state.currency===c?icon('check'):''}</button>`).join('')}</div>`);
}
function topupSheet() {
  openSheet('Ajouter de l’argent',`<p class="sheet-sub">Alimentez votre compte ${state.currency} avec de l’argent.</p><form id="topup-form"><div class="form-field"><label for="amount">Montant · ${state.currency}</label><input id="amount" name="amount" class="amount-input" inputmode="decimal" placeholder="0,00" required autocomplete="off" maxlength="13"></div><div class="chips">${[50,100,250,500].map(n=>`<button type="button" class="chip" data-act="set-amount" data-id="${n}">+ ${n} ${CURRENCIES[state.currency].symbol}</button>`).join('')}</div><div class="form-field"><label for="method">Méthode</label><select id="method" name="method"><option>Carte</option><option>Virement</option></select></div>${errorHTML()}<button class="primary-button" type="submit">Ajouter l’argent</button></form><p class="demo-footnote">Aucune carte réelle et aucune coordonnée bancaire requises.</p>`);
}
function sendSheet(contactId=null,scheduled=false) {
  const contact=state.contacts.find(c=>c.id===contactId),today=nowDay();
  openSheet(scheduled?'Programmer un virement':'Envoyer de l’argent',`<p class="sheet-sub">Un envoi conservé dans votre historique.</p><form id="send-form"><div class="form-field"><label for="recipient">Destinataire</label><input id="recipient" name="recipient" placeholder="Nom du bénéficiaire" value="${esc(contact?.name||'')}" required maxlength="60" autocomplete="off" list="contacts"><datalist id="contacts">${state.contacts.map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></div><div class="field-pair"><div class="form-field"><label for="amount">Montant</label><input id="amount" name="amount" inputmode="decimal" placeholder="0,00" required maxlength="13"></div><div class="form-field"><label for="currency">Devise</label><select id="currency" name="currency">${currencyOptions(state.currency)}</select></div></div><div class="form-field"><label for="send-date">Date d’envoi</label><input id="send-date" name="date" type="date" min="${today}" max="${shiftDay(today,365)}" value="${scheduled?shiftDay(today,1):today}" required></div><div class="form-field"><label for="note">Message (facultatif)</label><input id="note" name="note" placeholder="Restaurant, cadeau…" maxlength="100"></div><div class="info-box neutral">Disponible sur le compte ${state.currency} : ${esc(money(state.wallets[state.currency],state.currency))}. Le compte EUR conserve une réserve du compte supérieure à 23 000 €.</div>${errorHTML()}<button class="primary-button" type="submit">Confirmer le virement</button></form>`);
}
function exchangeSheet() {
  const from=state.currency,to=from==='EUR'?'USD':'EUR';
  openSheet('Changer de devise',`<p class="sheet-sub">Passez d’un compte à l’autre avec les taux fixes de l’app.</p><form id="exchange-form"><div class="field-pair"><div class="form-field"><label for="from">Depuis</label><select id="from" name="from">${currencyOptions(from)}</select></div><div class="form-field"><label for="to">Vers</label><select id="to" name="to">${currencyOptions(to)}</select></div></div><div class="form-field"><label for="amount">Montant à changer</label><input id="amount" name="amount" class="amount-input" inputmode="decimal" placeholder="0,00" required maxlength="13"></div><div id="exchange-preview" class="info-box">Renseignez un montant pour afficher la conversion.</div>${errorHTML()}<button class="primary-button" type="submit">Confirmer le change</button></form><p class="demo-footnote">Taux fixes · Aucun cours en temps réel.</p>`);
}
function requestSheet() {
  openSheet('Demander un paiement',`<p class="sheet-sub">Préparez une demande. Rien n’est envoyé à vos contacts.</p><form id="request-form"><div class="form-field"><label for="name">À qui ?</label><input id="name" name="name" placeholder="Nom du contact" maxlength="60" required></div><div class="field-pair"><div class="form-field"><label for="amount">Montant</label><input id="amount" name="amount" inputmode="decimal" placeholder="0,00" maxlength="13" required></div><div class="form-field"><label for="currency">Devise</label><select id="currency" name="currency">${currencyOptions(state.currency)}</select></div></div>${errorHTML()}<button class="primary-button" type="submit">Créer la demande</button></form>`);
}
function transactionSheet(id) {
  const t=state.transactions.find(t=>t.id===id);if(!t)return;
  const c=categoryMeta(t),amount=t.status==='declined'?t.attemptedAmount:t.amount;
  const stamp=new Intl.DateTimeFormat('fr-FR',{timeZone:regionById(t.region).tz,dateStyle:'long',timeStyle:'short'}).format(new Date(t.timestamp));
  openSheet('Détails de la transaction',`<div class="detail-hero"><div class="tx-icon" style="background:${c.color}17;color:${c.color}">${icon(c.icon)}</div><p>${esc(t.name)}</p><h3 class="${amount>0?'positive':''}">${amount>0?'+':''}${esc(money(amount,t.currency))}</h3><p>${t.status==='declined'?'Paiement refusé':'Transaction · Terminée'}</p></div><div class="details-list">${detailsRow('Date',stamp)}${detailsRow('Lieu',t.city||'En ligne')}${detailsRow('Catégorie',c.label)}${detailsRow('Méthode',t.method||'Démo')}${t.originalAmount&&t.originalCurrency!==t.currency?detailsRow('Montant local',state.hideBalance?'••••':formatMoney(t.originalAmount,t.originalCurrency)):''}${detailsRow('Solde après opération',money(t.balanceAfter,t.currency))}${t.note?detailsRow('Message',t.note):''}${detailsRow('Référence','TEST-'+t.id.slice(-12).toUpperCase())}</div><div class="info-box neutral">Donnée fictive. Cette page ne constitue pas une preuve de paiement ni un document bancaire.</div><button class="primary-button" data-act="close-sheet">Fermer</button>`);
}
function accountDetailsSheet() {
  openSheet('Coordonnées',`<p class="sheet-sub">Références de test non utilisables pour un virement.</p><div class="details-list">${detailsRow('Titulaire','Lucas Jouvençon')}${detailsRow('Compte',state.currency+' · Luma démo')}${detailsRow('Référence','TEST-LUMA-'+state.currency+'-0428')}${detailsRow('Établissement','Luma')}</div><div class="info-box neutral">Aucun IBAN ni compte bancaire réel. Ces informations ne permettent pas de recevoir un virement.</div><button class="primary-button" data-act="copy-account">${icon('copy')}Copier la référence</button>`);
}
function profileSheet() {
  openSheet('Votre espace',`<div class="profile-button" style="margin:0 0 20px"><span class="avatar" style="width:57px;height:57px;border-radius:20px">LJ</span><span><span style="display:block;font-size:17px;font-weight:600">Lucas Jouvençon</span><span class="profile-caption" style="display:block">@lucas.j · Plus</span></span></div><div class="panel">
  ${toggleRow('Mode sombre','Adaptez l’interface à votre préférence','theme',state.theme==='dark','moon')}
  ${toggleRow('Activité quotidienne','Ajouts automatiques à l’ouverture de l’app','autoSimulation',state.autoSimulation,'repeat')}
  ${toggleRow('Notifications dans l’app','Informer des nouvelles opérations','notify',state.notify,'bell')}
  <button class="setting-row" style="width:100%;text-align:left" data-act="location"><span class="setting-left">${icon('location')}<span><span class="setting-name" style="display:block">Localisation</span><span class="setting-description" style="display:block">${esc(currentRegion().city)} · ${state.location.source==='gps'?'Position du navigateur':'Choix manuel'}</span></span></span>${icon('chevron')}</button>
  <button class="setting-row" style="width:100%;text-align:left" data-act="install"><span class="setting-left">${icon('plus')}<span class="setting-name">Installer sur l’iPhone</span></span>${icon('chevron')}</button></div>
  <div class="info-box neutral">Réserve du compte EUR : 23 000,01 € minimum.<br>Code local à 4 chiffres · Verrouillage après 5 minutes d’inactivité ou 1 minute en arrière-plan.<br>Les données restent dans ce navigateur.</div>
  <button class="primary-button" data-act="lock">${icon('lock')}Verrouiller l’app</button><button class="secondary-button" data-act="export">Exporter les données</button><button class="secondary-button danger-button" data-act="reset">Réinitialiser les données</button>`);
}
function locationSheet() {
  openSheet('Votre localisation',`<p class="sheet-sub">La région détermine les nouveaux libellés de commerces, la devise locale et les horaires. Les anciens paiements conservent leur lieu.</p><button class="primary-button" data-act="geolocate">${icon('location')}Utiliser ma position</button><p style="font-size:11px;color:var(--sub);margin:22px 0 12px">OU CHOISIR UNE VILLE</p><div class="transactions">${REGIONS.map(r=>`<button class="tx-row" data-act="select-location" data-id="${r.id}"><span style="font-size:24px;width:33px">${r.flag}</span><span class="tx-body"><span class="tx-name" style="display:block">${r.city}</span><span class="tx-sub" style="display:block">${r.country} · ${r.currency}</span></span>${currentRegion().id===r.id?icon('check'):icon('chevron')}</button>`).join('')}</div><p class="demo-footnote">La position sert uniquement à choisir une région.<br>Les coordonnées exactes ne sont ni stockées ni envoyées par Luma.</p>`);
}
function cardDetailsSheet() {
  openSheet('Votre carte virtuelle',`<div class="details-list">${detailsRow('Titulaire','Lucas Jouvençon')}${detailsRow('Identifiant de test',showCard?'TEST 0000 0000 0428':'TEST •••• •••• 0428')}${detailsRow('Expiration','09/29')}${detailsRow('Code de sécurité','TEST')}${detailsRow('État',state.cards.frozen?'Gelée':'Active')}</div><div class="info-box neutral">Carte fictive avec un numéro non bancaire. Aucun paiement réel n’est possible.</div><button class="primary-button" data-act="reveal-card">${icon(showCard?'eyeOff':'eye')}${showCard?'Masquer les détails':'Afficher les détails'}</button>`);
}
function pocketSheet(id) {
  const p=state.pockets.find(p=>p.id===id);if(!p)return;
  openSheet(p.name,`<div class="detail-hero"><div class="tx-icon" style="background:${esc(p.color)};color:#768aaa">${icon(p.icon)}</div><h3>${esc(money(p.balance))}</h3><p>Objectif ${esc(money(p.target))}</p></div><form id="pocket-form" data-pocket="${esc(id)}"><div class="form-field"><label for="direction">Mouvement</label><select id="direction" name="direction"><option value="deposit">Ajouter à la poche</option><option value="withdraw">Retirer vers le compte EUR</option></select></div><div class="form-field"><label for="amount">Montant · EUR</label><input id="amount" name="amount" class="amount-input" inputmode="decimal" placeholder="0,00" maxlength="13" required></div>${errorHTML()}<button class="primary-button" type="submit">Confirmer le transfert</button></form><button class="secondary-button" data-act="edit-pocket" data-id="${esc(id)}">Modifier le nom et l’objectif</button>`);
}
function pocketEditor(id=null) {
  const p=state.pockets.find(p=>p.id===id);
  openSheet(p?'Modifier la poche':'Nouvelle poche',`<form id="new-pocket-form" data-pocket="${esc(id||'')}"><div class="form-field"><label for="pocket-name">Nom de votre projet</label><input id="pocket-name" name="name" maxlength="45" placeholder="Un voyage, un projet…" value="${esc(p?.name||'')}" required></div><div class="form-field"><label for="target">Objectif · EUR</label><input id="target" name="target" inputmode="decimal" placeholder="2 000" value="${p?p.target/100:''}" maxlength="13" required></div><div class="form-field"><label for="pocket-icon">Icône</label><select id="pocket-icon" name="icon">${[['plane','Voyage'],['shield','Sécurité'],['spark','Projet'],['home','Maison'],['bag','Achat']].map(([i,l])=>`<option value="${i}" ${p?.icon===i?'selected':''}>${l}</option>`).join('')}</select></div>${errorHTML()}<button class="primary-button" type="submit">${p?'Enregistrer':'Créer la poche'}</button></form>`);
}
function requestDetailsSheet(id) {
  const r=state.requests.find(r=>r.id===id);if(!r)return;
  openSheet('Demande',`<div class="detail-hero"><p>Demande à ${esc(r.name)}</p><h3>${esc(money(r.cents,r.currency))}</h3><p>${r.status==='received'?'Réception enregistrée':'En attente · Aucune notification envoyée'}</p></div><div class="info-box neutral">Ajoutez une réception pour explorer le parcours.</div>${r.status!=='received'?`<button class="primary-button" data-act="receive-request" data-id="${esc(id)}">Créer la réception</button>`:''}<button class="secondary-button" data-act="share-request" data-id="${esc(id)}">${icon('share')}Copier ou partager le texte</button>`);
}
function notificationsSheet() {
  const latest=ordered().slice(0,5),failed=state.schedules.filter(s=>s.status==='failed');
  openSheet('Vos notifications',`<p class="sheet-sub">L’activité récente de votre espace.</p>${failed.length?`<div class="info-box neutral">${failed.length} virement${failed.length>1?'s':''} programmé${failed.length>1?'s':''} non exécuté${failed.length>1?'s':''} : solde disponible insuffisant.</div>`:''}<div class="transactions">${latest.length?latest.map(t=>`<button class="tx-row" data-act="transaction" data-id="${esc(t.id)}"><span class="tx-icon" style="background:var(--soft);color:var(--sub)">${icon(t.status==='declined'?'info':t.amount>0?'arrowDown':'check')}</span><span class="tx-body"><span class="tx-name" style="display:block">${t.status==='declined'?'Paiement refusé':t.amount>0?'Argent reçu':'Opération enregistrée'}</span><span class="tx-sub" style="display:block">${esc(t.name)} · ${esc(money(t.amount,t.currency))}</span></span></button>`).join(''):'<div class="empty">Aucune notification.</div>'}</div>`);
}
function scheduleSheet(id) {
  const s=state.schedules.find(s=>s.id===id);if(!s)return;
  openSheet('Virement programmé',`<div class="details-list">${detailsRow('Destinataire',s.recipient)}${detailsRow('Montant',money(s.cents,s.currency))}${detailsRow('Date',s.date)}${detailsRow('État','En attente') }${s.note?detailsRow('Message',s.note):''}</div><div class="info-box neutral">Le virement sera enregistré à la prochaine ouverture après la date choisie, si le solde disponible le permet.</div><button class="secondary-button danger-button" data-act="cancel-schedule" data-id="${esc(id)}">Annuler le virement</button>`);
}
function setLocation(regionId,source='manual') {
  state.location={regionId,source,updatedAt:new Date().toISOString()};
  state.lastGeneratedDate=nowDay();persist();render();closeSheet();
  toast('Région : '+currentRegion().city);
}
async function geolocate(button) {
  if(!navigator.geolocation){toast('La géolocalisation est indisponible. Choisis une ville.');return;}
  button.disabled=true;button.textContent='Localisation en cours…';
  navigator.geolocation.getCurrentPosition(p=>{
    const r=regionFromCoordinates(p.coords.latitude,p.coords.longitude);setLocation(r.id,'gps');
    if(r.id==='world')toast('Position détectée. Commerces de proximité génériques activés.');
  },err=>{
    button.disabled=false;button.innerHTML=icon('location')+'Réessayer';
    toast(err.code===1?'Accès à la position refusé. Le choix manuel reste disponible.':'Position indisponible. Choisis une ville.');
  },{enableHighAccuracy:false,timeout:12000,maximumAge:300000});
}
async function copy(text,message='Copié') {
  try {await navigator.clipboard.writeText(text);toast(message);}
  catch {
    const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();
    const copied=document.execCommand('copy');area.remove();
    toast(copied?message:'La copie est indisponible dans ce navigateur.');
  }
}
function exportCSV() {
  const cell=v=>'"'+String(v??'').replace(/^[=+@-]/,"'").replace(/"/g,'""')+'"';
  const rows=[['TYPE','DATE','LIBELLE','MONTANT','DEVISE','VILLE','CATEGORIE','STATUT'],...ordered().map(t=>['DEMO - DONNEES FICTIVES',t.timestamp,t.name,(t.amount/100).toFixed(2),t.currency,t.city,categoryMeta(t).label,t.status])];
  const csv='\uFEFF'+rows.map(row=>row.map(cell).join(';')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='Luma-DEMO-transactions-'+nowDay()+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  toast('Export préparé.');
}
function lock() {unlocked=false;pin='';showCard=false;closeSheet();render();window.scrollTo({top:0});}
async function pinInput(n) {
  if(pinChecking||blockedUntil>Date.now()||pin.length>=4)return;
  pin+=n;render();
  if(pin.length!==4)return;
  pinChecking=true;
  try {
    const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pin));
    const hash=Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
    if(hash===PIN_HASH){unlocked=true;pin='';attempts=0;lastActive=Date.now();const added=rollForward(state);persist();render();if(added&&state.notify)toast(added+' nouvelle'+(added>1?'s opérations.':' opération.'));}
    else {pin='';attempts++;if(attempts>=5){blockedUntil=Date.now()+30000;attempts=0;}render();const el=document.getElementById('pin-error');if(el)el.textContent=blockedUntil>Date.now()?'Trop de tentatives. Réessayez dans 30 s.':'Code incorrect. Réessayez.';document.querySelector('.pin-dots')?.classList.add('shake');}
  } catch {pin='';render();toast('Ouvre cette app via son lien HTTPS pour utiliser le code d’accès.');}
  finally {pinChecking=false;}
}
function refreshExchangePreview() {
  const form=document.getElementById('exchange-form');if(!form)return;
  const f=new FormData(form),cents=parseMoney(f.get('amount')),from=f.get('from'),to=f.get('to');
  const el=document.getElementById('exchange-preview');
  el.textContent=Number.isFinite(cents)&&cents>0?formatMoney(cents,from)+' → '+formatMoney(Math.round(cents/RATES[from]*RATES[to]),to)+' · taux fixe':'Renseignez un montant pour afficher la conversion.';
}
function contactEditor() {
  openSheet('Ajouter un contact',`<p class="sheet-sub">Ajoutez un bénéficiaire à votre espace.</p><form id="contact-form"><div class="form-field"><label for="contact-name">Nom</label><input id="contact-name" name="name" maxlength="60" placeholder="Prénom ou nom" required></div>${errorHTML()}<button class="primary-button" type="submit">Ajouter le contact</button></form>`);
}
function newCardSheet() {
  openSheet('Nouvelle carte',`<p class="sheet-sub">Choisissez votre nouvelle carte.</p><form id="new-card-form"><div class="form-field"><label for="card-type">Type de carte</label><select id="card-type" name="type"><option value="virtual">Carte virtuelle</option><option value="disposable">Carte éphémère</option></select></div><div class="info-box neutral">Identifiant de test non utilisable pour un paiement.</div>${errorHTML()}<button class="primary-button" type="submit">Créer la carte</button></form>`);
}
function extraCardSheet(id) {
  const c=(state.cards.extra||[]).find(c=>c.id===id);if(!c)return;
  openSheet('Carte '+(c.type==='disposable'?'éphémère':'virtuelle'),`${cardVisual(c)}<button class="primary-button" data-act="freeze-extra" data-id="${esc(id)}">${icon('snow')}${c.frozen?'Dégeler':'Geler'} cette carte</button><button class="secondary-button danger-button" data-act="delete-extra" data-id="${esc(id)}">Supprimer cette carte</button>`);
}
function budgetSheet() {
  openSheet('Votre budget mensuel',`<p class="sheet-sub">Un repère pour les statistiques de dépenses en euros.</p><form id="budget-form"><div class="form-field"><label for="amount">Budget · EUR</label><input id="amount" name="amount" class="amount-input" inputmode="decimal" value="${state.budget/100}" maxlength="13" required></div>${errorHTML()}<button class="primary-button" type="submit">Enregistrer le budget</button></form>`);
}
function limitSheet() {
  openSheet('Plafond quotidien',`<p class="sheet-sub">Les nouveaux paiements automatiques par carte respectent ce plafond.</p><form id="limit-form"><p id="limit-value" class="range-value">${esc(formatMoney(state.cards.dailyLimit))}</p><input type="range" id="limit" name="limit" min="0" max="2000" step="25" value="${state.cards.dailyLimit/100}" aria-label="Plafond quotidien en euros"><div class="budget-figures"><span>0 €</span><span>2 000 €</span></div>${errorHTML()}<button class="primary-button" type="submit">Enregistrer la limite</button></form>`);
}
function installSheet() {
  openSheet('Luma sur votre iPhone',`<div class="panel"><div class="setting-row"><span class="avatar">1</span><div><p class="setting-name">Ouvrez le lien dans Safari</p><p class="setting-description">Connectez-vous à votre compte ChatGPT si demandé.</p></div></div><div class="setting-row"><span class="avatar">2</span><div><p class="setting-name">Touchez le bouton Partager</p><p class="setting-description">L’icône avec une flèche vers le haut.</p></div></div><div class="setting-row"><span class="avatar">3</span><div><p class="setting-name">Sur l’écran d’accueil</p><p class="setting-description">Puis touchez Ajouter. Luma s’ouvrira en plein écran.</p></div></div></div><div class="info-box neutral">Le code choisi reste nécessaire à chaque ouverture. Les données sont sauvegardées sur cet appareil et ne se synchronisent pas entre navigateurs.</div><button class="primary-button" data-act="close-sheet">Compris</button>`);
}
function moreSheet() {
  openSheet('Tout votre espace',`<div class="transactions">${[['request','arrowDown','Demander un paiement'],['account-details','info','Coordonnées'],['location','location','Choisir la localisation'],['install','plus','Installer sur l’iPhone'],['profile','settings','Réglages et profil']].map(([act,i,l])=>`<button class="tx-row" data-act="${act}"><span class="tx-icon" style="background:var(--soft);color:var(--sub)">${icon(i)}</span><span class="tx-body"><span class="tx-name">${l}</span></span>${icon('chevron')}</button>`).join('')}</div>`);
}
document.addEventListener('click',async event=>{
  lastActive=Date.now();
  if(event.target.classList.contains('sheet-backdrop')){closeSheet();return;}
  const b=event.target.closest('[data-act]');if(!b||b.disabled)return;
  const act=b.dataset.act,id=b.dataset.id;
  if(act==='close-sheet'){closeSheet();return;}
  if(!unlocked){
    if(act==='pin')await pinInput(id);
    else if(act==='pin-delete'){pin=pin.slice(0,-1);render();}
    else if(act==='pin-help')toast('Utilise le code à 4 chiffres choisi lors de la création de l’app.');
    return;
  }
  try{
    switch(act){
      case'tab':tab=id;view='main';closeSheet();render();window.scrollTo({top:0});break;
      case'accounts':accountSheet();break;
      case'select-account':state.currency=id;persist();closeSheet();render();break;
      case'hide':state.hideBalance=!state.hideBalance;persist();render();break;
      case'profile':profileSheet();break;
      case'topup':topupSheet();break;
      case'set-amount':{const input=document.querySelector('#sheet-root #amount');if(input){input.value=id;input.dispatchEvent(new Event('input',{bubbles:true}));}break;}
      case'send':sendSheet(id,b.dataset.schedule==='1');break;
      case'exchange':exchangeSheet();break;
      case'request':requestSheet();break;
      case'more':moreSheet();break;
      case'account-details':accountDetailsSheet();break;
      case'copy-account':await copy('DEMO — Lucas Jouvençon — LUMA-'+state.currency+'-0428 — Identifiant fictif, aucun IBAN.','Référence copiée.');break;
      case'all-transactions':case'search':view='transactions';search='';filter='all';closeSheet();render();window.scrollTo({top:0});if(act==='search')document.getElementById('tx-search')?.focus();break;
      case'back-main':view='main';tab='home';render();break;
      case'filter':filter=id;render();break;
      case'transaction':transactionSheet(id);break;
      case'notifications':notificationsSheet();break;
      case'location':locationSheet();break;
      case'select-location':setLocation(id);break;
      case'geolocate':await geolocate(b);break;
      case'freeze':state.cards.frozen=!state.cards.frozen;persist();render();toast(state.cards.frozen?'Carte gelée.':'Carte dégelée.');break;
      case'card-details':cardDetailsSheet();break;
      case'reveal-card':showCard=!showCard;render();cardDetailsSheet();break;
      case'card-limit':limitSheet();break;
      case'toggle-setting':
        if(id==='theme'){state.theme=state.theme==='dark'?'light':'dark';}
        else if(['online','international'].includes(id)){state.cards[id]=!state.cards[id];}
        else if(['autoSimulation','notify'].includes(id)){
          state[id]=!state[id];
          if(id==='autoSimulation'){state.lastGeneratedDate=nowDay();state.simulationResumedAt=new Date().toISOString();}
        }
        persist();render();if(['theme','autoSimulation','notify'].includes(id))profileSheet();break;
      case'pocket':pocketSheet(id);break;
      case'new-pocket':pocketEditor();break;
      case'edit-pocket':pocketEditor(id);break;
      case'new-contact':contactEditor();break;
      case'new-card':newCardSheet();break;
      case'extra-card':extraCardSheet(id);break;
      case'freeze-extra':{const c=(state.cards.extra||[]).find(c=>c.id===id);if(c)c.frozen=!c.frozen;persist();render();extraCardSheet(id);break;}
      case'delete-extra':state.cards.extra=(state.cards.extra||[]).filter(c=>c.id!==id);persist();closeSheet();render();toast('Carte supprimée.');break;
      case'request-details':requestDetailsSheet(id);break;
      case'receive-request':{
        const r=state.requests.find(r=>r.id===id);if(!r||r.status==='received')break;
        const tx={id:'request-'+r.id,name:r.name,amount:r.cents,currency:r.currency,category:'income',timestamp:new Date().toISOString(),city:currentRegion().city,region:currentRegion().id,method:'Demande reçue'};
        if(!applyTransaction(state,tx))throw new Error('Impossible d’enregistrer la réception.');
        r.status='received';success('Réception',formatMoney(r.cents,r.currency)+' reçus de '+r.name+'.');break;
      }
      case'share-request':{
        const r=state.requests.find(r=>r.id===id);if(!r)break;
        const text='DÉMO LUMA — Demande fictive à '+r.name+' : '+formatMoney(r.cents,r.currency)+'. Aucun paiement réel n’est demandé.';
        if(navigator.share){try{await navigator.share({title:'Luma — demande',text});}catch(e){if(e.name!=='AbortError')await copy(text,'Texte copié.');}}
        else await copy(text,'Texte copié.');break;
      }
      case'schedule-details':scheduleSheet(id);break;
      case'cancel-schedule':{const s=state.schedules.find(s=>s.id===id);if(s)s.status='cancelled';persist();closeSheet();render();toast('Virement annulé.');break;}
      case'month':{const d=new Date(activeMonth+'-15T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+Number(id));activeMonth=d.toISOString().slice(0,7);render();break;}
      case'budget':budgetSheet();break;
      case'export':exportCSV();break;
      case'install':installSheet();break;
      case'lock':lock();break;
      case'reset':openSheet('Réinitialiser les données ?',`<p class="sheet-sub">L’historique local, vos poches, contacts et cartes supplémentaires seront remplacés par l’historique de départ.</p><button class="primary-button" data-act="confirm-reset">Réinitialiser les données</button><button class="secondary-button" data-act="close-sheet">Conserver mes données</button>`);break;
      case'confirm-reset':{const oldTheme=state.theme;state=initialState();state.theme=oldTheme;tab='home';view='main';activeMonth=nowDay().slice(0,7);persist();closeSheet();render();toast('Nouvel historique créé.');break;}
    }
  }catch(e){error(e.message||'Cette action est indisponible.');}
});
document.addEventListener('submit',event=>{
  const form=event.target;if(!form.id.endsWith('-form'))return;
  event.preventDefault();if(!unlocked)return;
  const f=new FormData(form),cents=parseMoney(f.get('amount'));lastActive=Date.now();
  try{
    switch(form.id){
      case'topup-form':topUp(state,cents,state.currency,f.get('method'));success('Solde mis à jour',formatMoney(cents,state.currency)+' ajoutés à votre compte.');break;
      case'send-form':{
        const recipient=String(f.get('recipient')).trim(),date=String(f.get('date'));
        if(!recipient)throw new Error('Indique un destinataire.');
        if(date<nowDay()||date>shiftDay(nowDay(),365))throw new Error('Choisis une date entre aujourd’hui et dans un an.');
        const result=sendMoney(state,{recipient,cents,currency:f.get('currency'),note:String(f.get('note')).trim(),date});
        success(result.status==='pending'?'Virement programmé':'Virement',formatMoney(cents,f.get('currency'))+' pour '+recipient+(result.status==='pending'?' le '+date:'.'));break;
      }
      case'exchange-form':{const from=f.get('from'),to=f.get('to'),received=exchange(state,cents,from,to);success('Change effectué',formatMoney(cents,from)+' échangés contre '+formatMoney(received,to)+' au taux.');break;}
      case'request-form':{
        const name=String(f.get('name')).trim();if(!name||!Number.isSafeInteger(cents)||cents<=0||cents>100000000)throw new Error('Renseigne un nom et un montant valide.');
        const r={id:crypto.randomUUID(),name,cents,currency:f.get('currency'),status:'pending',timestamp:new Date().toISOString()};
        state.requests.push(r);persist();render();requestDetailsSheet(r.id);break;
      }
      case'pocket-form':pocketMove(state,form.dataset.pocket,cents,f.get('direction'));success('Poche mise à jour',formatMoney(cents)+' déplacés dans votre espace.');break;
      case'new-pocket-form':{
        const name=String(f.get('name')).trim(),target=parseMoney(f.get('target'));if(!name||!Number.isSafeInteger(target)||target<=0||target>100000000)throw new Error('Indique un nom et un objectif valide.');
        const p=state.pockets.find(p=>p.id===form.dataset.pocket);
        if(p){p.name=name;p.target=target;p.icon=f.get('icon');}
        else{if(state.pockets.length>=20)throw new Error('Votre espace permet jusqu’à 20 poches.');state.pockets.push({id:crypto.randomUUID(),name,target,balance:0,icon:f.get('icon'),color:'#e7edf9'});}
        persist();closeSheet();render();toast(p?'Poche modifiée.':'Nouvelle poche créée.');break;
      }
      case'contact-form':{
        const name=String(f.get('name')).trim();if(!name)throw new Error('Entre le nom du contact.');
        if(state.contacts.length>=40)throw new Error('Votre espace permet jusqu’à 40 contacts.');
        if(state.contacts.some(c=>c.name.toLowerCase()===name.toLowerCase()))throw new Error('Ce contact existe déjà.');
        state.contacts.push({id:crypto.randomUUID(),name,initials:name.split(' ').filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase(),color:'#e2eaf7',handle:'contact.demo'});
        persist();closeSheet();render();toast('Contact ajouté.');break;
      }
      case'new-card-form':{
        if((state.cards.extra||[]).length>=5)throw new Error('Votre espace permet cinq cartes supplémentaires.');
        state.cards.extra=state.cards.extra||[];state.cards.extra.push({id:crypto.randomUUID(),type:f.get('type'),frozen:false,last4:String(1100+Math.floor(Math.random()*8800))});
        persist();closeSheet();render();toast('Carte créée.');break;
      }
      case'budget-form':if(!Number.isSafeInteger(cents)||cents<=0||cents>100000000)throw new Error('Choisis un budget valide.');state.budget=cents;persist();closeSheet();render();toast('Budget mis à jour.');break;
      case'limit-form':state.cards.dailyLimit=Math.round(Number(f.get('limit'))*100);persist();closeSheet();render();toast('Plafond quotidien enregistré.');break;
    }
  }catch(e){error(e.message||'Vérifie les informations saisies.');}
});
document.addEventListener('input',event=>{
  lastActive=Date.now();
  if(event.target.id==='tx-search'){
    search=event.target.value;const pos=event.target.selectionStart;render();
    const input=document.getElementById('tx-search');input?.focus();if(input&&input.type!=='search')input.setSelectionRange(pos,pos);
  }
  if(event.target.closest('#exchange-form'))refreshExchangePreview();
  if(event.target.id==='limit')document.getElementById('limit-value').textContent=formatMoney(Math.round(Number(event.target.value)*100));
});
document.addEventListener('change',event=>{if(event.target.closest('#exchange-form'))refreshExchangePreview();});
document.addEventListener('keydown',event=>{
  if(!unlocked&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
    if(/^\d$/.test(event.key)){event.preventDefault();pinInput(event.key);}
    else if(event.key==='Backspace'){event.preventDefault();pin=pin.slice(0,-1);render();}
  }
  if(event.key==='Escape'&&sheetRoot.firstChild){closeSheet();return;}
  if(event.key==='Tab'&&sheetRoot.firstChild){
    const focusable=[...sheetRoot.querySelectorAll('button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]')],first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  }
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){hiddenAt=Date.now();document.querySelector('.phone-shell')?.classList.add('privacy-covered');}
  else{
    document.querySelector('.phone-shell')?.classList.remove('privacy-covered');
    if(unlocked&&hiddenAt&&Date.now()-hiddenAt>=60000)lock();
    else if(unlocked){const added=rollForward(state);persist();render();if(added&&state.notify)toast('L’activité a été mise à jour.');}
    hiddenAt=0;
  }
});
setInterval(()=>{
  if(!unlocked&&blockedUntil){if(Date.now()>=blockedUntil){blockedUntil=0;render();}else render();return;}
  if(unlocked&&Date.now()-lastActive>300000){lock();return;}
},1000);
setInterval(()=>{
  if(unlocked&&!document.hidden){const count=rollForward(state);persist();if(count){render();if(state.notify)toast(count+' nouvelle'+(count>1?'s opérations.':' opération.'));}}
},60000);
window.addEventListener('offline',()=>toast('Mode hors ligne · votre espace reste disponible.'));
window.addEventListener('online',()=>toast('Connexion rétablie.'));
if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js?v=4').catch(()=>{});}
theme();persist();render();
window.__lumaReady=true;
if(window.visualViewport){
  const viewport=window.visualViewport;
  const keepFooterVisible=()=>{
    const gap=Math.max(0,Math.round(window.innerHeight-viewport.height-viewport.offsetTop));
    document.documentElement.style.setProperty('--keyboard-gap',gap+'px');
  };
  viewport.addEventListener('resize',keepFooterVisible,{passive:true});
  viewport.addEventListener('scroll',keepFooterVisible,{passive:true});
  keepFooterVisible();
}
window.dispatchEvent?.(new Event('luma:ready'));
const splash=document.getElementById('app-splash');
if(splash){
  const delay=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches?0:800;
  setTimeout(()=>{
    splash.classList.add('splash-done');
    splash.setAttribute('aria-hidden','true');
    setTimeout(()=>splash.remove(),400);
  },delay);
}
