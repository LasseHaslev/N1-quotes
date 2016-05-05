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

import {
    QuoteHandler
} from './QuoteHandler'

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
    
    var quoteHandler = new QuoteHandler();

    // We need to bind 'this' to each function we want to use "this" in
    constructor() {
        super();
        this._onQuoteRefresh = this._onQuoteRefresh.bind( this );

        // Search for [ quote ] and add tags with qoute
    }


    shouldComponentUpdate(nextProps) {
        // Our render method doesn't use the provided `draft`, and the draft changes
        // constantly (on every keystroke!) `shouldComponentUpdate` helps keep N1 fast.
        return nextProps.session !== this.props.session;
    }

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
    }}

    // Refresh quote
    _onQuoteRefresh() {
        console.log('clicky, clicky');
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
