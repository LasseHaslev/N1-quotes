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

import QuoteHandler from './QuoteHandler'

class QuoteButton extends React.Component {
    // Adding a `displayName` makes debugging React easier
    static displayName = 'QuoteButton';

    // Since our button is being injected into the Composer Footer,
    // we receive the local id of the current draft as a `prop` (a read-only
    // property). Since our code depends on this prop, we mark it as a requirement.
    static propTypes = {
        draft: React.PropTypes.object.isRequired,
        session: React.PropTypes.object.isRequired,
    };

    quoteHandler = null;

    // We need to bind 'this' to each function we want to use "this" in
    constructor() {
        super();
        this._onQuoteRefresh = this._onQuoteRefresh.bind( this );
        this._getEmailContent = this._getEmailContent.bind( this );
        this._replaceEmailContent = this._replaceEmailContent.bind( this );

        this.quoteHandler = new QuoteHandler();

        // Search for [ quote ] and add tags with qoute
    }

    // Run Render quotes on first run
    componentWillMount() {
        this._onQuoteRefresh();
    }

    shouldComponentUpdate(nextProps) {
        // Our render method doesn't use the provided `draft`, and the draft changes
        // constantly (on every keystroke!) `shouldComponentUpdate` helps keep N1 fast.
        return nextProps.session !== this.props.session;
    }

    // Refresh quote
    _onQuoteRefresh() {

        // Get the html draft
        var draftHtml = this._getEmailContent();

        // Handle draft html
        var text = QuotedHTMLTransformer.removeQuotedHTML(draftHtml);

        // Do the quote change in text
        text = this.quoteHandler.quotify( text );

        // Handle back the draft html
        var handledText = QuotedHTMLTransformer.appendQuotedHTML(text, draftHtml);

        // Save the changes
        this._replaceEmailContent( handledText );
    }

    // Get content of email
    _getEmailContent() {      
        return this.props.draft.body;
    }
   
    // Replace email body
    _replaceEmailContent( newContent ) {
        // To update the draft, we add the new body to it's session. The session object
        // automatically marshalls changes to the database and ensures that others accessing
        // the same draft are notified of changes.
        this.props.session.changes.add({body: newContent});
        this.props.session.changes.commit();

        // Return the new content
        return newContent;
    }

    // Render the button
    render() {
        return (
            <button
                tabIndex={-1}
                className="btn btn-toolbar pull-right"
                onClick={this._onQuoteRefresh}
                title="Insert quote…">
                <RetinaImg
                mode={RetinaImg.Mode.ContentIsMask}
                url="nylas://random-quotes/assets/icon-random-quote@2x.png" />
            </button>
        );
    }

}

module.exports = QuoteButton;
