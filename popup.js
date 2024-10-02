document.getElementById("translateButton").addEventListener("click", async () => {
    const targetLang = document.getElementById("targetLanguage").value;
  
    if (!targetLang) {
      alert("Please enter a target language code.");
      return;
    }
  
    // Inject the translation script into the active WhatsApp tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: translateWhatsAppMessages,
        args: [targetLang]
      });
    });
  });
  
  // This function will be injected into WhatsApp's web page
  async function translateWhatsAppMessages(targetLang) {
    const url = 'https://api.mymemory.translated.net/get';
  
    // Select all the chat messages in the WhatsApp window
    const messages = document.querySelectorAll(".copyable-text");
  
    for (let message of messages) {
      const originalText = message.innerText;
      if (originalText) {
        const params = new URLSearchParams({
          q: originalText,
          langpair: `en|${targetLang}` // Assuming original messages are in English
        });
  
        try {
          const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET'
          });
  
          const data = await response.json();
          const translatedText = data.responseData.translatedText;
  
          if (translatedText) {
            message.innerText = translatedText; // Update the message with the translated text
          }
        } catch (error) {
          console.error("Translation failed:", error);
        }
      }
    }
  }
  