const sendBtn=
document.getElementByld("send-btn");user-
const userInput =
document.getElementByld("
input");
const chatBox =
document.ElementByld("chat-box");
sendBtn.addEventListener("click", ()
=? {
    const message =
  userInput.value.trim();
       if (message --- "") {
          return;
}
  const userMessage =
document.createElement("div");
   userMessage.className =
  "user-message:;
     userMessage.texContent
=message;
chatBox.appendChild(userMessage);
    const botMessage=
  document.createElement(div");
     botMessage.className =
  "bot-message",
      "botMessage.textContent =
         "You asked: " + ",
  AI responses will be connected
  later.";
    chatBox.appendChild(botMessage);
userInput.value = "";
}};
  
