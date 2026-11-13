const dialog=document.getElementById('tradeDialog');
document.getElementById('practiceBtn').addEventListener('click',()=>dialog.showModal());
document.querySelector('.close').addEventListener('click',()=>dialog.close());
document.getElementById('learnBtn').addEventListener('click',()=>document.getElementById('about').scrollIntoView({behavior:'smooth'}));
document.getElementById('confirmPractice').addEventListener('click',e=>{e.preventDefault();const amount=Number(document.getElementById('amount').value);const asset=document.getElementById('assetSelect').value;if(!Number.isFinite(amount)||amount<1||amount>100000){document.getElementById('tradeResult').textContent='Please enter an amount from $1 to $100,000.';return;}document.getElementById('tradeResult').textContent=`Demo only: $${amount.toLocaleString()} practice amount selected for ${asset}. No real trade was placed.`;});
let installPrompt;const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installBtn.classList.remove('hidden');});
installBtn.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installBtn.classList.add('hidden');});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
