import request from 'request'

import {
  React,
  ReactDOM,
  ComponentRegistry,
  QuotedHTMLTransformer,
  Actions,
} from 'nylas-exports';

class QuoteButton {
    // Adding a `displayName` makes debugging React easier
    static displayName = 'QuoteButton';

    // Test data
    quotes = [
        {
            text: 'Jeg lukker mine øyne for å se',
            author: 'Paul Gauguin'
        },
        {
            text: 'Der alle tenker likt, blir det ikke tenkt mye.',
            author: 'Walter Lippmann'
        },
        {
            text: 'Alle har talent. Det uvanlige er å ha mot til å følge talentet til de mørke stedene den leder.',
            author: 'Erica Jong'
        },
        {
            text: 'Jeg gjør allltid det jeg ikke kan, i håp om å lære meg det.',
            author: 'Pablo Picasso'
        },
        {
            text: 'Det er den som går seg vill som finner de nye veiene',
            author: 'Nils Kjær'
        },
        {
            text: 'Vinnere gjør ikke andre ting. De gjør ting annerledes.',
            author: 'Shiv Kera'
        },
        {
            text: 'Det eneste sikre våpenet mot dårlige ideer, er bedre ideer.',
            author: 'Alfred Whitney Griswold'
        },
        {
            text: 'I can\'t understand why people are frightened of new ideas. I\'m frightened of the old ones.,
            author: 'John Cage'
        },
        {
            text: 'Problemer kan ikke løses på samme bevissthetsnivå som de skapes.',
            author: 'Albert Einstein'
        },
        {
            text: 'Om du har de samme erfaringene som de andre, ser du trolig i samme retning.',
            author: 'Steve Jobs'
        },
        {
            text: 'Det meste er ennå ugjort. Hvilken framtid!',
            author: 'Ingvar Kamprad'
        },
        {
            text: 'Det beste jeg vet, er å reise til steder jeg ikke har vært.',
            author: 'Diane Arbus'
        },
        {
            text: 'Vi har ikke bruk for folk med ideer. Ideer er "a dime a dozen". Vi har bruk for folk med nok forpliktende arbeidslyst til å gjennomføre dem.',
            author: 'Ingebright Steen Jensen'
        },
        {
            text: 'Verden avskyr forandringer, enda det kun er igjennom forandringer at framskritt skjer.',
            author: 'Albert Einstein'
        },
        {
            text: 'For den visjonære blir det usynlige synlig.',
            author: 'Jonathan Swift'
        },
        {
            text: 'Det er bedre å mislykkes i orginalitet enn å lykkes i imitasjon.',
            author: 'Herman Melville'
        },
        {
            text: 'Målsetninger kommer fra hjernen. Visjoner kommer fra hjertet.',
            author: 'Roger Crawford'
        },
        {
            text: 'To improve is to change; to be perfect is to change often.',
            author: 'Winston Churchill'
        },
        {
            text: 'Many ideas grow better when transplanted into another mind than in the one where they sprang up.',
            author: 'Oliver Wendell Holmes'
        },
        {
            text: 'Om jeg har tusen ideer i året, og bare én er bra, så er jeg fornøyd.',
            author: 'Alfred Nobel'
        },
        {
            text: 'Bevar suksessene, men se deg alltid om etter nye muligheter.',
            author: 'Ingvar Kamprad'
        },
        {
            text: 'Bryterene til lyset står i mørket.',
            author: 'Erik Lerdahl'
        },
        {
            text: 'Fantasi er viktigere enn kunnskap.',
            author: 'Albert Einstein'
        },
        {
            text: 'Godt gjort er bedre enn godt sagt.',
            author: 'Benjamin Franklin'
        },
        {
            text: 'One should never impose one\'s views on a problem; one should rather study it, and in time a solution will reveal itself.',
            author: 'Albert Einstein'
        },
        {
            text: 'Don\'t worry about people stealing an idea. If it\'s original, you will have to ram it down their throats.',
            author: 'Howard Aiken'
        },
        {
            text: 'Veien til fremgang er å fordoble sine feil.',
            author: 'Thomas Watson'
        },
        {
            text: 'Hvis folk ikke gjorde fjollete ting innimellom, ville det aldri blitt laget noe intelligent.',
            author: 'Ludvig Wittgenstein'
        },
        {
            text: 'Det er ganske gøy å gjøre det umulige.',
            author: 'Walt Disney'
        },
        {
            text: 'Gode ideer koker ikke bort. De blir laktet av stormende horder av analytisk tenkende mennesker.',
            author: 'Ukjent opphav'
        },
        {
            text: 'Mennesker som sier at ting ikke kan gjøres, må ikke avbryte menneskene som gjør det.',
            author: 'Kinesisk ordspråk'
        },
        {
            text: 'For å ha en god ide må du ha mange av dem.',
            author: 'Thomas Edison'
        },
        {
            text: 'Det vanskelige er en bagatell, det umulige en utfordring',
            author: 'Solan Gundersen'
        },
        {
            text: 'Wherever you can see a successful business, someone once made a courageous decision',
            author: 'Peter Drucker'
        },
        {
            text: 'Only those who will risk going too far can posibly find out how far one can go.',
            author: 'T.S. Eliot'
        },
    ];

    // We need to bind 'this' to each function we want to use "this" in
    constructor() {
        this.quotify = this.quotify.bind( this );
        this._getRandomQuote = this._getRandomQuote.bind( this );
        this._createQuoteTags = this._createQuoteTags.bind( this );
        this._insertQuotesToTags = this._insertQuotesToTags.bind( this );
        this._formatQuoteObjectToString = this._formatQuoteObjectToString.bind( this );
    }

    // Public function for adding quout
    quotify( content ) {

        // Change [ quote ] to <span class="random-quote"></span>
        content = this._createQuoteTags( content );

        // Insert quote to each random quote tag
        content = this._insertQuotesToTags( content );

        return content;

    }

    // Create quote tag
    // [ quote ] to <span class="random-quote"></span>
    _createQuoteTags( content ) {
        return content.replace( /\[ *[<spelling class="misspelled">]*quote[</spelling>]* *\]/g, '<span class="random-quote"></span>' );
    }

    // Format the quote object to quote string
    _formatQuoteObjectToString( quoteObject ) {
        return quoteObject.text + ' - ' + quoteObject.author;
    }

    // Search for all span.random-quote and replace its content with new quote data
    _insertQuotesToTags( content ) {

        // Find each span.class element
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");
        var spanElements = doc.querySelectorAll('span.random-quote');
   
        // Loop each
        for (var i = 0, len = spanElements.length; i < len; i++) {
            var spanElement = spanElements[ i ];

            do {
                var quoteString = this._formatQuoteObjectToString( this._getRandomQuote() );

            // Check if the new quote is the same as last time, then get a new quote until we get an unique
            // Quality check if we have more than 1 quote to check from to prevent endless loop 
            } while (quoteString == spanElement.innerHTML && this.quotes.length > 1);

            // Insert quote to tag
            spanElement.innerHTML = quoteString;
            // console.log(quoteString);
        }

        // Convert domParser back to string
        // This is the hard way of doing this --- FIX THIS ---
        content = content.replace( /<body>.+<\/body>/, '<body>'+doc.body.innerHTML+'</body>' );

        // Remove this. ( Only for debugging )
        window.$doc = doc;

        // return new content
        return content;

    }

    // Get random quote
    _getRandomQuote() {
        return this.quotes[Math.floor(Math.random()*this.quotes.length)];
    }

}

module.exports = QuoteButton;
