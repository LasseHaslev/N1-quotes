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
        return content.replace( /\[ *quote *\]/g, '<span class="random-quote"></span>' );
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
            var quoteString = this._formatQuoteObjectToString( this._getRandomQuote() );

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
