import request from 'request'

import {
  React,
  ReactDOM,
  ComponentRegistry,
  QuotedHTMLTransformer,
  Actions,
} from 'nylas-exports';

import {
  Menu,
  RetinaImg,
} from 'nylas-component-kit';

class QuoteButton extends React.Component {
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

    // Since our button is being injected into the Composer Footer,
    // we receive the local id of the current draft as a `prop` (a read-only
    // property). Since our code depends on this prop, we mark it as a requirement.
    static propTypes = {
        draft: React.PropTypes.object.isRequired,
        session: React.PropTypes.object.isRequired,
    };

    // We need to bind 'this' to each function we want to use "this" in
    constructor() {
        super();
        this._getRandomQuote = this._getRandomQuote.bind( this );
        this._onQuoteRefresh = this._onQuoteRefresh.bind( this );
        this._createQuoteTags = this._createQuoteTags.bind( this );
        this._getEmailContent = this._getEmailContent.bind( this );
        this._insertQuotesToTags = this._insertQuotesToTags.bind( this );
        this._replaceEmailContent = this._replaceEmailContent.bind( this );
        this._formatQuoteObjectToString = this._formatQuoteObjectToString.bind( this );

        // Search for [ quote ] and add tags with qoute
    }


    shouldComponentUpdate(nextProps) {
        // Our render method doesn't use the provided `draft`, and the draft changes
        // constantly (on every keystroke!) `shouldComponentUpdate` helps keep N1 fast.
        return nextProps.session !== this.props.session;
    }

    // Refresh quote
    _onQuoteRefresh() {
        console.log( 'Refresh quote' );

        // Get tags in body
        var content = this._getEmailContent();

        // Change [ quote ] to <span class="random-quote"></span>
        content = this._createQuoteTags( content );

        // Insert quote to each random quote tag
        content = this._insertQuotesToTags( content );

        // Save the changes
        content = this._replaceEmailContent( content );

        console.log(content);

    }

    // Create quote tag
    // [ quote ] to <span class="random-quote"></span>
    _createQuoteTags( content ) {
        return content.replace( /\[ *quote *\]/g, '<span class="random-quote"></span>' );
    }

    // Replace mail

    // Get content of email
    _getEmailContent() {      
        return this.props.draft.body;
    }

    // Replace email body
    _replaceEmailContent( newContent ) {
        // The new text of the draft is our translated response, plus any quoted text
        // that we didn't process.
        // translated = QuotedHTMLTransformer.appendQuotedHTML(translated, draftHtml);

        // To update the draft, we add the new body to it's session. The session object
        // automatically marshalls changes to the database and ensures that others accessing
        // the same draft are notified of changes.
        this.props.session.changes.add({body: newContent});
        this.props.session.changes.commit();

        // Return the new content
        return newContent;
    }

    // Format the quote object to quote string
    _formatQuoteObjectToString( quoteObject ) {
        return quoteObject.text + ' - ' + quoteObject.author;
    }

    // Search for all span.random-quote and replace its content with new quote data
    _insertQuotesToTags( content ) {

        // Find each span.class element

        // Loop each

        // Format quote

        // Insert quote to tag

        // return new content
        return content;

    }

    // Get random quote
    _getRandomQuote() {
        return this.quotes[Math.floor(Math.random()*this.quotes.length)];
    }

    render() {
        return (
            <button
                tabIndex={-1}
                className="btn btn-toolbar pull-right"
                onClick={this._onQuoteRefresh}
                title="Insert quote…">
                <RetinaImg
                mode={RetinaImg.Mode.ContentIsMask}
                url="nylas://composer-translate/assets/icon-composer-translate@2x.png" />
                &nbsp;
                <RetinaImg
                name="icon-composer-dropdown.png"
                mode={RetinaImg.Mode.ContentIsMask}/>
            </button>
        );
    }

}

module.exports = QuoteButton;
