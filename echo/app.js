const sheet=document.querySelector('#sheet');let name='';let detectedAudio='';
const authScreen=document.querySelector('#authScreen');
const savedEmail=localStorage.getItem('echo-email');
if(savedEmail){authScreen.classList.add('hide');document.querySelector('.profile').textContent=savedEmail[0].toUpperCase();}
document.querySelector('#emailForm').addEventListener('submit',event=>{event.preventDefault();const email=document.querySelector('#email').value.trim();localStorage.setItem('echo-email',email);document.querySelector('.profile').textContent=email[0].toUpperCase();authScreen.classList.add('hide');notify(`Welcome to Echo, ${email.split('@')[0]}.`);});
const notify=(message)=>{const toast=document.createElement('div');toast.textContent=message;toast.style.cssText='position:fixed;bottom:88px;left:50%;transform:translateX(-50%);z-index:9;background:#f6f4f1;color:#171822;padding:11px 15px;border-radius:9px;font:600 12px Manrope;box-shadow:0 8px 30px #0005;white-space:nowrap';document.body.append(toast);setTimeout(()=>toast.remove(),2200)};
document.querySelectorAll('.talk').forEach(button=>button.addEventListener('click',()=>{name=button.parentElement.querySelector('h3').textContent;document.querySelector('#sheetName').textContent=`Talk with ${name}?`;document.querySelector('#requestCall').textContent='Send talk request';document.querySelector('#requestCall').removeAttribute('style');sheet.classList.add('show')}));
document.querySelector('.close').addEventListener('click',()=>sheet.classList.remove('show'));
sheet.addEventListener('click',e=>{if(e.target===sheet)sheet.classList.remove('show')});
document.querySelector('#requestCall').addEventListener('click',()=>{document.querySelector('#requestCall').textContent=`Request sent to ${name} ✓`;document.querySelector('#requestCall').style.background='#77e8d5';document.querySelector('#requestCall').style.color='#0f2526';setTimeout(()=>{sheet.classList.remove('show');notify(`${name} can accept your voice request.`)},700)});
document.querySelector('#connectAudio').addEventListener('click',async()=>{
  const button=document.querySelector('#connectAudio');
  const name=document.querySelector('#deviceName');
  const info=document.querySelector('#deviceInfo');
  if(button.textContent==='Use headphones'){name.textContent=detectedAudio;info.textContent='Audio will play through these headphones';button.textContent='Connected';notify(`${detectedAudio} connected for Link audio.`);return;}
  if(button.textContent==='Connected'){name.textContent='No headphones connected';info.textContent='Connect from your phone settings';button.textContent='Search';notify('Audio routing cleared.');return;}
  button.disabled=true;button.textContent='Searching…';name.textContent='Searching for headphones';info.textContent='Looking for paired audio devices';
  try{
    const devices=await navigator.mediaDevices.enumerateDevices();
    const audioOutput=devices.find(device=>device.kind==='audiooutput'&&device.label&& !/default|built-in|speaker/i.test(device.label));
    if(audioOutput){detectedAudio=audioOutput.label;name.textContent=audioOutput.label;info.textContent='Paired headphones found — tap to use them';button.textContent='Use headphones';button.disabled=false;}
    else{ name.textContent='No paired headphones found';info.textContent='Pair headphones in your phone Bluetooth settings, then search again';button.textContent='Search again';button.disabled=false; }
  }catch(error){name.textContent='Can’t check headphones yet';info.textContent='Allow browser audio access, or pair headphones in your phone settings';button.textContent='Search again';button.disabled=false;}
});
document.querySelector('#refresh').addEventListener('click',e=>{e.target.textContent='✓';notify('Nearby people refreshed.');setTimeout(()=>e.target.textContent='↻',800)});
document.querySelector('#addDevice').addEventListener('click',()=>notify('Pair a device in your phone Bluetooth settings first.'));
document.querySelector('.profile').addEventListener('click',()=>notify('Your Echo profile is ready to personalise.'));
document.querySelectorAll('.control').forEach(button=>button.addEventListener('click',()=>{const label=button.querySelector('span').textContent;notify(`${label}: scanning for compatible devices…`);button.style.borderColor='#77e8d5';}));
document.querySelectorAll('nav button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('nav button').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');notify(`${button.querySelector('span').textContent} selected.`)}));
