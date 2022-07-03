let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container')
const authorText = document.getElementById('author')
const quoteText = document.getElementById('quote')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


//Get data from API
async function getQuotes() {   
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
            newQuote();    
    } catch (err) {
        alert(`An error ocurred: ${err}`)
        complete()
    }
}

//Show new quote
function newQuote(){    
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    authorText.textContent = addUnknowToNullAuthor(quote.author);
    quoteText.textContent = quote.text;
    lengthTextHandleClass(quote.text);
    complete();
}

//Add Unknow to null author
function addUnknowToNullAuthor(author) {
    return author ? author : 'Unknow'
}

function lengthTextHandleClass(text) {
    text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote'); 
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blanck')
}

//Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loaderfunc
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Events listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)

getQuotes();