// Keep the loading screen recoverable when scripts cannot be downloaded.
(() => {
  const splash=document.getElementById('app-splash');
  const caption=document.getElementById('splash-caption');
  const retry=document.getElementById('splash-retry');
  const fail=()=>{
    if(window.__lumaReady||!splash)return;
    if(caption)caption.textContent='Le chargement prend plus de temps que prévu. Vérifiez votre connexion.';
    if(retry)retry.hidden=false;
  };
  const timeout=setTimeout(fail,15000);
  window.addEventListener('luma:ready',()=>clearTimeout(timeout),{once:true});
  window.addEventListener('error',fail,{once:true});
  retry?.addEventListener('click',()=>window.location.reload());
})();
