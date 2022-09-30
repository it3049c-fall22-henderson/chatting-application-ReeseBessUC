// Setp 1 and 2//
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const updateButton = document.getElementById("my-name-save");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())

}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will:
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

// This is for sending 
updateMessages()
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  
  if (sender == "")
  {
    alert("You must specify name");
    return;
  }
  
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

updateButton.addEventListener("click", function(e) {
  e.preventDefault();
  const sender = nameInput.value;
  
  if (sender == "")
  {
    alert("You must specify name");
    return;
  }
  
  localStorage.setItem("fs_username", sender);
  document.getElementById("my-message").disabled = false;
  document.getElementById("send-button").disabled = false;
            
  alert("Name updated");
  
  
});

document.addEventListener( 'DOMContentLoaded', function(){
        checkNameInLocalStorage();
        
},false );

function checkNameInLocalStorage() {
    let name_local =  localStorage.getItem("fs_username");
    
    if (name_local === null)
    {
        document.getElementById("my-message").disabled = true;
        document.getElementById("send-button").disabled = true;

    }
    else
    {
        document.getElementById("my-name-input").value = name_local;;
    }
}


// Dark Mode Start
function isDark() {
    return localStorage.getItem("dark-mode");
  }
  
  function toggleRootClass() {
    document.querySelector(":root").classList.toggle("dark");
  }
  
  function toggleLocalStorageItem() {
    if (isDark()) {
      localStorage.removeItem("dark-mode");
    } else {
      localStorage.setItem("dark-mode", "set");
    }
  }
  
  if (isDark()) {
    toggleRootClass();
  }
  
  document.querySelector(".theme-icon").addEventListener("click", () => {
    toggleLocalStorageItem();
    toggleRootClass();
  });
//Dark Mode End