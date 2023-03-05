/* script.js */

const URLRecipient = new URLSearchParams(window.location.search).get('web10');
if (URLRecipient) recipient.value = URLRecipient;


//conventient failure messages
const Fs = ([cF, rF, uF, dF] = ["create", "read", "update", "delete"].map(
  (op) => `failed to ${op} mail[s]`
));

/* wapi setup */

//example web10_authenticator : https://auth.web10.app
var web10_authenticator = "put_your_authenticator_here"
//example web10_registrar : https://api.web10.app
var web10_registrars = ["put_your_registrar_here","https://api.web10.app"]
//example web10_registrar : rtc.web10.app
var web10_webRTC = "put_your_webRTC_server_here"


const wapi = wapiInit(web10_authenticator,web10_registrars,web10_webRTC);
const sirs = [
  {
    service: "mail",
    cross_origins: ["localhost", "REPLIT URL HERE", "GITHUB PAGES URL HERE"],
    // whitelist: [{ username: ".*", provider: ".*", create: true }], //allows all users to write to you
  },
];

wapi.SMROnReady(sirs, []);
authButton.onclick = wapi.openAuthPortal;

/* The devpay functionality */
function devPay() {
  wapi
    .verifySubscription(seller, subscriptionTitle)
    .then((r) => {
      if (validSubscription(r["data"])) displaySubscriberMessage();
      else displayOnboardMessage();
    })
    .catch(
      (e) => {console.log(e);subscriptionStatus.innerHTML = `subscription check failed...`}
    );
}

function initApp() {
  authButton.innerHTML = "log out";
  authButton.onclick = () => {
    wapi.signOut();
    window.location.reload();
    devPay();
  };
  const t = wapi.readToken();
  message.innerHTML = `hello ${t["provider"]}/${t["username"]},<br>`;
  readMail();
  devPay();
  // wapi.initP2P(readMail,"mail-device")
}

if (wapi.isSignedIn()) initApp();
else wapi.authListen(initApp);

/* CRUD Calls */
function readMail() {
  wapi
    .read("mail", {})
    .then((response) => displayMail(response.data))
    .catch((error) => (message.innerHTML = `${rF} : ${error}`));
}
function createMail(mail, user, provider) {
  const t = wapi.readToken();
  const sender = t===null ? "anon":t["username"]
  wapi
    .create(
      "mail",
      {
        mail: mail,
        date: String(new Date()),
        provider: provider,
        username: sender,
      },
      user,
      provider
    )
    // .then(() => {
    //   if (sender!=="anon") readMail();
    //   curr.value = "";
    //   message.innerHTML = "sent message";
    //   wapi.send(provider,user,window.location.hostname,"messaging-device","bump")
    // })
    .catch((error) => (message.innerHTML = `${cF} : ${error}`));
}

function deleteMail(id) {
  //TODO! Do some copy paste from the deleteNotes function from lesson 8.
  // change the service to "mail"
  // also the .then action will be different, it will be different from readNotes. 
}

/* display */
function displayMail(data) {
  function contain(mail) {
    return `<div style="margin-top:40px;margin-left:10px">
                <p style="font-family:monospace;">${mail.date}</p>
                <p style="font-family:monospace;">${mail.provider}/${mail.username}</p>                
                <i id="${mail._id}">${mail.mail}</i>
                <button onclick="deleteMail('${mail._id}')">Delete</button>
            </div>`;
  }
  mailview.innerHTML = data.map(contain).reverse().join(`<br>`);
}
