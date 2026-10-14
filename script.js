function sendMessage() {}
  const userInput = document.getElementByld("userInput");
  const chatBox = document.getElementByld("chatBox");

  const message = userInput.value.trim();

    if (message ==="") {
      return;
    }

      Display user message 
      chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

      //Simple AI response
      chatBox.innerHTML +=
      <p><strong>AI:</strong> l received your message: "${message}"</p>;
      
      // Clear input
      userInput.value ="";
      // Auto-scroll
      chatBox.scrollTop =
      chatBox.scrollHeight;


 
