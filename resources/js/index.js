const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
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
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

jQuery(document).ready(function(){
    let name_local =  localStorage.getItem("fs_username");
    
    if (name_local === null)
    {
        jQuery('#my-message').prop('disabled', true);
        jQuery('#send-button').prop('disabled', true);
    }
    else
    {
        jQuery('#my-name-input').val(name_local);
    }
    
    
    jQuery('#my-name-save').on('click', function(){
        let name = jQuery('#my-name-input').val();
        
        if (name == "")
        {
            alert("You must specify name");
        }
        else
        {
            localStorage.setItem("fs_username", name);
            jQuery('#my-message').prop('disabled', false);
            jQuery('#send-button').prop('disabled', false);
            
            alert("Name updated");
            
        }
    })
    
});
