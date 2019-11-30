import React, { useEffect, useState } from 'react';
// import './App.css';
import { Button } from 'antd';
import Speech from 'react-speech';

function App() {
  const [articles, setArticles] = useState(null);

  const divStyle = {
    background: 'rgba(0,0,0,.1)',
    padding: '16px',
    margin: '16px'
  };
  useEffect(() => {
    fetch(
      'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YFNhGhkzEe0Yq3KwV25z5b7qNvzGYmne'
    )
      .then(res => res.json())
      .then(data => {
        // setArticles(data.results)

        setArticles(
          data.results.filter(articleObj => {
            return articleObj.section !== 'Opinion';
          })
        );
      });
  }, []);

  return (
    <div className="App">
      <h1>The Daily Review Podcast</h1>
      {/*<h2>Top Stories</h2>*/}
      <h3>Total number of articles below: {articles && articles.length}</h3>
      <h4>Script for TTS to read:</h4>
      Hello and welcome to The Daily Review Podcast powered by the New York
      Times. I am your host, Max Adler.
      <br />
      Today's top {articles && articles.length} stories from The New York Times,
      for your listening pleasure:
      <br />
      {articles &&
        articles.map(({ section, title, abstract, published_date }, index) => (
          <p key={index}>
            {title}. {abstract}
            {/*{' '}Next article:*/}
          </p>
        ))}
      <Speech
        textAsButton
        // displayText={"SPEECH!"}
        text="Welcome to react speech"
        voice="Google UK English Male"
      />
    </div>
  );
}

export default App;
