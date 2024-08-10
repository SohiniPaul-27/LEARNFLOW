const sendChatBtn=document.querySelector(".chat-input textarea");
const generateResponse = async () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "https://openai.com/api";  
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    };
  
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      
      displayAIResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response:", error);
      
    }
  };
  