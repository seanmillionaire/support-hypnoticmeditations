/* Staged public-page analytics. Deployment requires stream and browser QA. */
(function () {
  'use strict';
  if (window.__saAnalyticsConsent) return;
  var ID = 'G-86GKXSBGL6';
  var CONTAINER = 'GTM-P2JS4DND';
  var KEY = 'sa-analytics-consent-v1';
  var tag = document.currentScript;
  if (!tag) return;
  var host = tag.getAttribute('data-analytics-host');
  var path = tag.getAttribute('data-analytics-path');
  var title = tag.getAttribute('data-analytics-title');
  var privacy = tag.getAttribute('data-analytics-privacy');
  function normalize(p) { return p.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'; }
  // Build-reviewed per-page metadata, exact production host, never DOM titles/query values.
  if (!host || !path || !title || location.protocol !== 'https:' || location.hostname !== host || normalize(location.pathname) !== path) return;
  if (/^\/(games|admin|app|tests|content-station|gps|portal|abundance-portal)(\/|$)/.test(path)) return;
  // Fail closed if another Google tag/container is embedded. Do not change its behavior.
  if (document.querySelector('script[src*="googletagmanager.com"]') || window.google_tag_manager || window.__hmStarterAnalytics) return;
  var consent = null, started = false, sent = false;
  try { var saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Date.now()-saved.at < 15552000000) consent = saved.value; } catch (_) {}
  window['ga-disable-' + ID] = consent !== 'accepted';
  var button = document.createElement('button');
  button.type='button'; button.textContent='Analytics choices'; button.className='sa-analytics-choice';
  var style = document.createElement('style');
  style.textContent='.sa-analytics-choice{position:fixed;bottom:10px;left:10px;z-index:2147483000;padding:8px 12px;background:white;color:#111;border:1px solid #555;border-radius:6px;font:13px system-ui;cursor:pointer}.sa-analytics-panel{position:fixed;bottom:50px;left:12px;right:12px;z-index:2147483001;max-width:470px;padding:18px;border:1px solid #555;border-radius:10px;background:#fff;color:#111;box-shadow:0 4px 24px #0003;font:15px/1.5 system-ui}.sa-analytics-panel p{margin:0 0 12px}.sa-analytics-panel button,.sa-analytics-panel a{font:inherit}.sa-analytics-panel button{padding:9px 12px;margin-right:8px;border:1px solid #222;background:#fff;color:#111;border-radius:5px;cursor:pointer}';
  document.head.appendChild(style); document.body.appendChild(button);
  var panel;
  function save(value) { consent=value; try {localStorage.setItem(KEY,JSON.stringify({value:value,at:Date.now()}));}catch(_){} }
  function choose(value) {
    save(value); window['ga-disable-'+ID]=value!=='accepted';
    if(panel){panel.remove();panel=null;} button.focus();
    if(value==='accepted') start();
    // Only this Google destination is disabled; preexisting attribution is untouched.
  }
  function show() {
    if(panel) return;
    panel=document.createElement('section');panel.className='sa-analytics-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Analytics choices');
    var p=document.createElement('p');p.textContent='Allow Google Analytics to measure visits to public pages? This helps us understand visitor flow. We do not send form answers or personal URL details. Declining does not affect access. These controls apply to Google Analytics only.';panel.appendChild(p);
    [['Allow analytics','accepted'],['Decline analytics','declined']].forEach(function(pair){var b=document.createElement('button');b.type='button';b.textContent=pair[0];b.onclick=function(){choose(pair[1]);};panel.appendChild(b);});
    if(privacy){var a=document.createElement('a');a.href=privacy;a.textContent='Privacy';panel.appendChild(a);}
    document.body.appendChild(panel);
  }
  function start() {
    if(consent!=='accepted'||sent) return;
    // Isolated queue avoids forwarding other vendors' dataLayer payloads.
    var layer=window.saAnalyticsLayer=window.saAnalyticsLayer||[];
    function gtag(){layer.push(arguments);}
    var page='https://'+host+path, ref='';
    try {var u=new URL(document.referrer);if(/^https?:$/.test(u.protocol))ref=u.origin+'/';}catch(_){}
    if(!started){
      started=true;
      layer.push({page_location:page,page_referrer:ref,page_title:title});
      gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      layer.push({'gtm.start':Date.now(),event:'gtm.js',page_location:page,page_referrer:ref,page_title:title});
      var script=document.createElement('script');script.async=true;script.referrerPolicy='origin';script.src='https://www.googletagmanager.com/gtm.js?id='+CONTAINER+'&l=saAnalyticsLayer';document.head.appendChild(script);
    }
    sent=true;
    layer.push({event:'sa_page_view',page_location:page,page_referrer:ref,page_title:title});
  }
  button.onclick=show; window.__saAnalyticsConsent={show:show};
  if(consent==='accepted')start();else if(consent!=='declined')show();
})();

