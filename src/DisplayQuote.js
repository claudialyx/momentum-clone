import React from 'react';
import { connect } from 'react-redux';
import { fetchQuotes } from './redux/actions';

class DisplayQuote extends React.Component {

    componentDidMount = () => {
        this.newQuote()
    }

    newQuote = () => {
        this.props.fetchQuotes()
    }

    render() {
        const quoteDetail = this.props.data.map((quote, index) => {
            return (
                <div id="text" key={index} style={{ display: "flex", maxWidth: "70vw" }}>
                    <p>"{quote.quote}" --{quote.author}</p>
                </div>
            )
        })
        return (
            <div id="quote-box" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-around" }} >
                <div id="tweet-quote" style={{ display: "flex" }} >
                    <button>Tweet Quote</button>
                </ div>
                {quoteDetail}
                <div id="new-quote" style={{ display: "flex" }}>
                    <button onClick={this.newQuote}>New Quote</button>
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