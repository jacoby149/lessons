/* script.js */

//example web10_authenticator : https://auth.web10.app
//var web10_authenticator = "put_your_authenticator_here"
var web10_authenticator = "https://auth.web10.app"
//example web10_registrar : https://api.web10.app
//var web10_registrars = ["put_your_registrar_here","https://api.web10.app"]
var web10_registrars = ["https://api.web10.app"]

/* script.js */

//conventient failure messages
const Fs = ([cF, rF, uF, dF] = ["create", "read", "update", "delete"].map(
    (op) => `failed to ${op} note[s]`
  ));
  
  /* wapi setup */
  const wapi = wapiInit(web10_authenticator,web10_registrars);
  const sirs = [
    {
      service: "notes",
      cross_origins: ["localhost", "REPLIT URL HERE", "GITHUB PAGES URL HERE"],
    },
  //   {
  //     service: "posts",
  //     cross_origins: ["localhost", "REPLIT URL HERE", "GITHUB PAGES URL HERE"],
  //     whitelist: [
  //         {
  //             provider: ".*",
  //             username: ".*",
  //             read: true
  //         }
  //     ]
  // },
  ];
  wapi.SMROnReady(sirs, []);
  authButton.onclick = wapi.openAuthPortal;
  
  function initApp() {
    authButton.innerHTML = "log out";
    authButton.onclick = () => {
      wapi.signOut();
      window.location.reload();
    };
    const t = wapi.readToken();
    message.innerHTML = `hello ${t["provider"]}/${t["username"]},<br>`;
    readNotes();
  }
  
  if (wapi.isSignedIn()) initApp();
  else wapi.authListen(initApp);
  
  /* CRUD Calls */
  function readNotes() {
    wapi
      .read("notes", {})
      .then((response) => displayNotes(response.data))
      .catch((error) => (message.innerHTML = `${rF} : ${error.response.data.detail}`));
  }
  function createNote(note) {
    wapi
      .create("notes", { note: note, date: String(new Date()) })
      .then(() => {
        readNotes();
        curr.value = "";
      })
      .catch(
        (error) => (message.innerHTML = `${cF} : ${error.response.data.detail}`)
      );
  }
  function updateNote(id) {
    const entry = String(document.getElementById(id).value);
    wapi
      .update("notes", { _id: id }, { $set: { note: entry } })
      .then(readNotes)
      .catch(
        (error) => (message.innerHTML = `${uF} : ${error.response.data.detail}`)
      );
  }
  function deleteNote(id) {
    wapi
      .delete("notes", { _id: id })
      .then(readNotes)
      .catch(
        (error) => (message.innerHTML = `${dF} : ${error.response.data.detail}`)
      );
  }

  // function postNote(id) {
  //   const entry = String(document.getElementById(id).value);
  //   wapi
  //     .create("posts", { 
  //       html: entry,
  //       media:[],
  //       time:new Date(),
  //       web10:`${wapi.readToken().provider}/${wapi.readToken().username}`
  //     })
  //     .then(message.innerHTML = `Posted note with id ${id}`)
  //     .catch(
  //       (error) => (message.innerHTML = `${uF} : ${error.response.data.detail}`)
  //     );
  // }
  
  /* display */
  function displayNotes(data) {
    function contain(note) {
      return `<div>
                  <p style="font-family:monospace;">${note.date}</p>
                  <textarea id="${note._id}">${note.note}</textarea>
                  <button onclick="updateNote('${note._id}')">Update</button>
                  <button onclick="deleteNote('${note._id}')">Delete</button>
                  <!-- <button onclick="postNote('${note._id}')">Post Note</button> -->
                  </div>`;
    }
    noteview.innerHTML = data.map(contain).reverse().join(`<br>`);
  }