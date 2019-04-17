import React from 'react';
import { connect } from 'react-redux';
import { fetchQuotes } from './redux/actions';
import { Button } from 'react-bootstrap'

class DisplayQuote extends React.Component {

    componentDidMount = () => {
        this.newQuote()
    }

    newQuote = () => {
        this.props.fetchQuotes()
    }

    quoteDetail = () =>
        this.props.data.map((quote, index) => {
            return (
                <div id="text" key={index}>
                    <p>"{quote.quote}" --{quote.author}</p>
                </div>
            )
        })

    render() {
        return (
            <div id="quote-box">
                <div className="bottom">
                    {this.quoteDetail()}
                </div >
                <div className="bottom-left">
                    <div id="tweet-quote"  >
                        <Button>Tweet Quote</Button>
                    </ div>
                </div>
                <div className="bottom-right">
                    <div id="new-quote">
                        <Button onClick={this.newQuote}>New Quote</Button>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return { data: state.displayQuote } // state.displayQuote becos in reducers.js i defined displayQuote = displayQuoteReducer
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuotes: () => { dispatch(fetchQuotes()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuote)