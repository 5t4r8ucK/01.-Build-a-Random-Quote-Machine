import './assets/css/App.css';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      randomQuote: {
        text: "Loading quote...",
        author: "Loading author...",
        tag: ""
      }
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    // GET Quotes from Go Quotes API
    fetch("https://goquotes-api.herokuapp.com/api/v1/all/quotes", {
      "method": "GET",
      "headers": {
        "accept": "application/json"
      },
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        quotes: [...response.quotes]
      });
      this.getRandomQuote();
    })
    .catch(err => { console.log(err);
    });
  }

  getRandomQuote = () => {
    if (this.state.quotes.length !== 0) {
      const randomQuote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
      this.setState({
        randomQuote: Object.assign({}, randomQuote),
        text: randomQuote.text,
        author: randomQuote.author,
        tag: randomQuote.tag
      })
    }
  }

  render () {
    const tagClass = "tag-" + this.state.randomQuote.tag;
    const noWidowsRegex = /\s([^\s<]{0,10})\s*$/;
    const currentText = this.state.randomQuote.text;
    const currentAuthor = this.state.randomQuote.author;
    const twitterQuote = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
    const tumblrQuote = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=";
    return (
      <React.Fragment>
        <div id="quote-bg" className={tagClass}></div>
        <div id="quote-box">
          <figure>
            <blockquote id="quote-text" className={"no-widows " + tagClass}>
              {currentText.replace(noWidowsRegex, '\u00A0$1')}
            </blockquote>
            <figcaption id="author" className={tagClass}>
              &mdash; {currentAuthor}
            </figcaption>
          </figure>
          <div className="buttons">
            <div className="social">
              <a
                id="tweet-quote"
                className="button"
                title="Tweet this quote!"
                target="_blank"
                href={twitterQuote + encodeURIComponent(currentText + "—" +currentAuthor)}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                id="tumblr-quote"
                className="button"
                title="Post this quote on tumblr!"
                target="_blank"
                href={tumblrQuote + encodeURIComponent(currentAuthor) + "&content=" + encodeURIComponent(currentText) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}
              >
                <i className="fab fa-tumblr"></i>
              </a>
              <div id="like_button_container"></div>
            </div>
            <button
              id="new-quote"
              className="button"
              onClick={this.getRandomQuote}
            >
              New Quote
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;