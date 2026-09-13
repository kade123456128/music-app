const modal = document.querySelector('#modal');
const openModal = () => { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); };
document.querySelector('#createSong').addEventListener('click', openModal);
document.querySelector('#startCreating').addEventListener('click', openModal);
document.querySelector('#closeModal').addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
document.querySelectorAll('.play').forEach(button => button.addEventListener('click', () => {
  const playing = button.textContent === '❚❚';
  document.querySelectorAll('.play').forEach(b => b.textContent = '▶');
  button.textContent = playing ? '▶' : '❚❚';
}));
document.querySelectorAll('.join').forEach(button => button.addEventListener('click', () => {
  button.textContent = 'Request sent ✓';
  button.style.color = '#26876e';
}));

const main = document.querySelector('main');
const home = main.innerHTML;
function openPage(page) {
  document.querySelectorAll('[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  if (page === 'home') { main.innerHTML = home; location.reload(); return; }
  const title = page === 'discover' ? 'Meet your next collaborator.' : page === 'bands' ? 'Find your band.' : 'Messages';
  const intro = page === 'discover' ? 'Musicians making interesting things in and around London.' : page === 'bands' ? 'Open calls from local artists who are ready to make music.' : 'Keep your next session moving.';
  let content = '';
  if (page === 'discover') content = ['Nova June|Indie pop · Singer / songwriter|purple','Sunday Driver|Alt rock · Guitar / drums|orange','Lo & Behold|Electronic · Producer|mint','Amara Sol|R&B · Vocals / keys|orange','Theo March|Jazz · Bass / guitar|purple','Rae Moss|Folk · Vocals|mint'].map(x => {const [n,r,c]=x.split('|'); return `<article class="artist-card"><span class="avatar ${c}">${n[0]}</span><h3>${n}</h3><p>${r}</p><span class="tag">VIEW PROFILE</span></article>`}).join('');
  if (page === 'bands') content = `<div class="requests"><article class="request-card"><div class="request-top"><span class="avatar orange">J</span><div><h3>Juniper Vale</h3><p>London, UK · 3 miles away</p></div><span class="genre">INDIE ROCK</span></div><h4>Looking for a drummer</h4><p class="request-text">Building something loud, warm and a little messy. Demos ready.</p><div class="request-footer"><span><b>2</b> members so far</span><button class="join">I’m interested →</button></div></article></div>`;
  if (page === 'messages') content = `<div class="chat-card"><button class="call" id="startCall">Start video call</button><h3>Juniper Vale</h3><p>Juniper: Hey Maya — loved your latest track. Want to rehearse next week?</p><p id="sentMessage"></p><form class="chat-form" id="chatForm"><input id="chatText" placeholder="Write a message…" /><button>Send</button></form></div>`;
  main.innerHTML = `<section class="page"><p class="eyebrow">${page.toUpperCase()}</p><h1>${title}</h1><p class="page-intro">${intro}</p>${page === 'bands' ? '<div class="page-actions"><button class="primary" id="newBand">＋ Start a band</button></div>' : ''}<div class="artist-grid">${content}</div></section>`;
  main.querySelectorAll('.join').forEach(b => b.addEventListener('click', () => { b.textContent = 'Request sent ✓'; b.style.color = '#26876e'; }));
  document.querySelector('#newBand')?.addEventListener('click', () => document.querySelector('#bandModal').classList.add('show'));
  document.querySelector('#chatForm')?.addEventListener('submit', e => { e.preventDefault(); const input=document.querySelector('#chatText'); if(input.value.trim()){document.querySelector('#sentMessage').textContent=`You: ${input.value}`; input.value='';} });
  document.querySelector('#startCall')?.addEventListener('click', startCall);
}
document.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => openPage(b.dataset.page)));
if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');

const bandModal=document.querySelector('#bandModal');
document.querySelector('#closeBand').addEventListener('click',()=>bandModal.classList.remove('show'));
document.querySelector('#makeBand').addEventListener('click',()=>{const name=document.querySelector('#bandName').value.trim(); if(name){bandModal.classList.remove('show'); alert(`${name} is ready for members.`)}});
let stream;
async function startCall(){try{stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});document.querySelector('#camera').srcObject=stream;document.querySelector('#videoCall').classList.add('show')}catch(e){alert('Camera access needs MAR to be opened on a secure website and permission allowed.');}}
document.querySelector('#endCall').addEventListener('click',()=>{stream?.getTracks().forEach(t=>t.stop());document.querySelector('#videoCall').classList.remove('show');});
