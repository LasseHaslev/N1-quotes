
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

    constructor() {
        super();
        this._onQuoteRefresh = this._onQuoteRefresh.bind( this );
        this._getRandomQuote = this._getRandomQuote.bind( this );
    }


    shouldComponentUpdate(nextProps) {
        // Our render method doesn't use the provided `draft`, and the draft changes
        // constantly (on every keystroke!) `shouldComponentUpdate` helps keep N1 fast.
        return nextProps.session !== this.props.session;
    }

    _onQuoteRefresh() {
        console.log( 'Refresh quote' );
        // console.log(this._getRandomQuote);
        console.log(this._getRandomQuote());
    }

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
