let firstClick = true;

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('quote-button');

if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', async () => {
    try {
      // Make a request to the server's /api/quote endpoint
      const response = await fetch('/api/quote');
      const data = await response.json();

      // If it's the first click, show the quote and author fields
      if (firstClick) {
        document.querySelector('#quote').style.display = 'block';
        document.querySelector('#author').style.display = 'block';
        firstClick = false; // Set this to false after the first click
      }

      // Check if the API response is too many requests 
      if (data.quote === "Too many requests. Obtain an auth key for unlimited access.") {
        quoteElement.innerText = "That’s it for today, now get back to work. Come back tomorrow for more motivation.";
        authorElement.style.display = "none";
      } else {
        quoteElement.innerText = data.quote;
        authorElement.innerText = data.author;
        authorElement.style.display = 'block';
      }

      newQuoteBtn.innerText = "Get Another Quote";
    } catch (error) {
      console.error('Error fetching new quote:', error);
    }
  });
} else {
  console.error("Button element not found");
}
