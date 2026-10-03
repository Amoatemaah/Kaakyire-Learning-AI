function sendMessage() {
  alert("Welcome to Kaakyire Learning AI!");
}

const sedBtn= document.getElementByld("send-btn");
const userInput= document.getElementByld("user-input);
const chatBox = cdocument.getElementByld("chat-box");                                        

sendBtn.addEventListener{"click",)()=> {
  const message = userInput.value.trim();

  if (message === "") {
       return;
  }

  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

const response = 'I'M still learning! You askedz; $message{`;

chatBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`>

 userInput.value = "";
});
