const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const processing = document.getElementById("processing");

const SpeechRecognition = window.SpeechRecognition 
                          || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
  startBtn.remove();
  result.innerHTML = "Your browser doesn't support Speech API. Please download latest Chrome version.";
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = event => {
    const current = event.resultIndex;
    const recognitionResult = event.results[current];
    const recognitionText = recognitionResult[0].transcript;
   
    if (recognitionResult.isFinal) {
      processing.innerHTML = "processing ...";
  
      const response = process(recognitionText);
      const p = document.createElement("p");
      p.innerHTML = `<strong>You said:</strong> ${recognitionText} 
                     </br><strong>Sonya said:</strong> ${response}`;
      processing.innerHTML = "";
      result.appendChild(p);
      
      readOutLoud(response);
    } else {
      processing.innerHTML = `listening: ${recognitionText}`;
    }
  };

  let listening = false;

toggleBtn = () => {
  if (listening) {
    recognition.stop();
    startBtn.textContent = "Start listening";
  } else {
    recognition.start();
    startBtn.textContent = "Stop listening";
  }
  listening = !listening;
};

startBtn.addEventListener("click", toggleBtn);

function process(rawText) {
    let text = rawText.replace(/\s/g, "").replace(/\'/g, "");
    text = text.toLowerCase();
    let response = null;
  
    if (text.includes("hello") || text.trim() == "hi" || text.includes("hey")) {
      response = getRandomItemFromArray(hello);
    } else if (text.includes("your name")) {
      response = "My name's Sonya.";
    } else if (text.includes("howareyou")||text.includes("whatsup")) {
      response = "I'm fine. How about you?";
    } else if (text.includes("whattimeisit")) {
        response = "You really took time out of your day to open this program to ask me that?" && 
        response = new Date().toLocaleTimeString();
    } else if (text.includes("joke")) {
      response = getRandomItemFromArray(joke);
    } else if (text.includes("flip") && text.includes("coin")) {
      response = Math.random() < 0.5 ? 'heads' : 'tails';
    } else if (text.includes("bye") || text.includes("stop")) {
      response = "Bye!!";
      toggleBtn();
    }
  
    if (!response) {
      window.open(`http://google.com/search?q=${rawText.replace("search", "")}`,
                  "_blank");
      return `I found some information for ${rawText}`;
    }
  
    return response;
  }

  function getRandomItemFromArray(array) {
    const randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
  };

//   Eve's Voice
  function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1.8;
    speech.voice = voices[3];
  
    window.speechSynthesis.speak(speech);
  }

