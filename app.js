const $ = (s) => document.querySelector(s);
const authDialog = $("#authDialog"), tradeDialog = $("#tradeDialog");
let authMode = "signup";
$("#year").textContent = new Date().getFullYear();

function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2800)}
function openAuth(mode){authMode=mode;$("#authTitle").textContent=mode==="signup"?"Create your account":"Welcome back";$("#authSubtitle").textContent=mode==="signup"?"Start exploring with a demo profile.":"Log in to your demo profile.";$("#nameField").style.display=mode==="signup"?"block":"none";$("#password").autocomplete=mode==="signup"?"new-password":"current-password";$("#authSubmit").textContent=mode==="signup"?"Create demo account":"Log in";$("#switchAuth").textContent=mode==="signup"?"Already have an account? Log in":"New here? Create an account";authDialog.showModal()}
$("#signupOpen").onclick=()=>openAuth("signup");$("#heroSignup").onclick=()=>openAuth("signup");$("#loginOpen").onclick=()=>openAuth("login");
$("#switchAuth").onclick=()=>openAuth(authMode==="signup"?"login":"signup");
$("#authForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#email").value.trim();const password=$("#password").value;if(password.length<8){toast("Use at least 8 characters for the demo password.");return}const key="mtx_demo_users";let users=JSON.parse(localStorage.getItem(key)||"{}");if(authMode==="signup"){if(users[email]){toast("Account exists. Please log in.");return}users[email]={name:$("#fullName").value.trim()||"MT EXCHANGE Member",password,created:new Date().toISOString()};localStorage.setItem(key,JSON.stringify(users));localStorage.setItem("mtx_session",email);localStorage.setItem("mtx_balance","10000");authDialog.close();toast("Demo profile created on this device!")}else{if(!users[email]||users[email].password!==password){toast("Demo login details not found on this device.");return}localStorage.setItem("mtx_session",email);authDialog.close();toast("Logged in to your local demo profile.")}});
document.querySelectorAll(".trade-btn").forEach(b=>b.onclick=()=>{$("#tradeTitle").textContent=`Practice ${b.dataset.asset}`;$("#tradeResult").textContent="";tradeDialog.showModal()});
$("#tradeConfirm").onclick=()=>{$("#tradeResult").textContent="Demo confirmation only. No transaction has taken place.";toast("Practice preview shown — no real trade executed.")};
$("#menuBtn").onclick=()=>document.querySelector("nav").classList.toggle("open");
if("serviceWorker" in navigator && location.protocol!=="file:"){navigator.serviceWorker.register("./sw.js").catch(()=>{});}
