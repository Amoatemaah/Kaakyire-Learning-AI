const askButton =
document.getElementByld("ask-button");

askButton.addEventListener("click",
sendMessage);

functiower") sendMessage() {

  const question =
document.getElementByld("question").
value.trim();
   const answer =
document.getElementByld("answer");

  if (question === "") {
      answer.innerHTML = "please
   enter a question.;
       return;
  }
let response = "";

    const q =
qustion.tolowerCase();

      if
(q.includes("photosynthesis")) {
     responses =
        "photosynthesis is the 
   process by which plants 
   use sunlight, water, and carbon dioxide
   to make their own food and release
   oxygen.";
      }
    else if (q.includes("water
   cycle")) {
         response =
           "The water cycle
   includes evaporation, condensation,
   precipitation, and collection.";
      }
      else if (q.includes("gravity"))
 {
      response =
            "Gravity is the force
   that pulls objects toward each
    other.";
      }
      else {
         response =
            "Thank you for your 
   question. AI response features will
   be added in future versions.";
      }
     answer.innerHTML = response;
}
   
   
   
