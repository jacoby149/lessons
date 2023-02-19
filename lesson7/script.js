/* script.js */

//example web10_authenticator : https://auth.web10.app
var web10Auth = "put_your_authenticator_here"
//example web10_registrar : https://api.web10.app
var web10Reg = ["put_your_registrar_here","https://api.web10.app"]

//initialize a wapi object registered for auth with auth.web10.app
const wapi = wapiInit(web10Auth,web10Reg)

// make the auth portal open when the log in button is pressed 
authButton.onclick = wapi.openAuthPortal

// callback function that initializes the app on web10 login
function initApp(){
    // make the logout button handle logouts properly on login
    authButton.innerHTML = "log out";
    authButton.onclick = () => {
        wapi.signOut();
        window.location.reload();
    }
    // simple hello world app, saying hello to the user
    const t = wapi.readToken()
    message.innerHTML = `hello ${t["provider"]}/${t["username"]},<br>`    
}

// either initialize the app if logged in, wait for authentication to do so.
if (wapi.isSignedIn()) initApp()
else wapi.authListen(initApp)