const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}


// Complete 
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}


//  Show new quotes
function newQuotes() {
	loading();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	
	if(!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	if(quote.text.length > 50) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent = quote.text;
	complete();
}

// Post on Twitter
function twitterPost() {
	const newPost = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(newPost, '_blank');
}

newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', twitterPost);

// Get Quotes from API
async function getQuotes() {
	loading();
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuotes();
	} catch (error) {

	}
	complete();
}

// On Load

getQuotes();
