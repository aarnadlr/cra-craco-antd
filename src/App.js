import React, { useEffect, useState, useRef } from 'react';
// import './App.css';
import { Button } from 'antd';
// import Speech from 'react-speech';
import { useSpeechSynthesis } from "react-speech-kit";

function App() {
  const [articles, setArticles] = useState(null);

  const [valToSpeak, setValToSpeak] = useState("Total number of articles");

  const { speak } = useSpeechSynthesis();

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
      })
      // .then(()=>{
      //   return speak({ text: valToSpeak })
      // });

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

      <Button style={{background:'red', width:'200px'}} type={'primary'} onClick={() => speak({ text: valToSpeak })}>▶️ Play The Daily Review</Button>

      {/*{articles &&*/}
      {/*  articles.map(({ section, title, abstract, published_date }, index) => (*/}
      {/*    <p key={index}>*/}
      {/*      {title}. {abstract}*/}
      {/*      /!*{' '}Next article:*!/*/}
      {/*    </p>*/}
      {/*  ))}*/}
    </div>
  );
}

export default App;
