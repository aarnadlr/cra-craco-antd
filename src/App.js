import React, { useEffect, useState, useRef } from 'react';
// import './App.css';
import { Button } from 'antd';
// import Speech from 'react-speech';
import { useSpeechSynthesis } from "react-speech-kit";

function App() {

  const tts = `Hello and welcome to The Daily Review Podcast powered by the New York Times. I am your host, Max Adler.
Today's top 35 stories from The New York Times, for your listening pleasure:`;

  const [articles, setArticles] = useState(tts);

  const [valToSpeak, setValToSpeak] = useState(tts);

  const { speak, cancel, voices } = useSpeechSynthesis();


  const reducer = (string, currObj) => {

    let title = currObj.title;
    let abstract = currObj.abstract;

    let finalString = string.concat(' ', title).concat(' ', abstract);

    return finalString;

  };

  useEffect(() => {
    fetch(
      'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YFNhGhkzEe0Yq3KwV25z5b7qNvzGYmne'
    )
      .then(res => res.json())
      .then(data => {
        // setArticles(data.results)

        // setArticles(
        //   data.results.filter(articleObj => {
        //     return articleObj.section !== 'Opinion';
        //   })
        // );

        // results is an ARR of OBJECTS
        // data.results.reduce(reducer, "")

        setArticles(
          data.results.reduce(reducer, "")
        )

      })
      // .then(()=>{
      //   return speak({ text: valToSpeak })
      // });

  }, []);

  return (
    <div className="App">
      <h1>The Daily Review Podcast</h1>
      {/*<h2>Top Stories</h2>*/}
      {/*<h3>Total number of articles below: {articles && articles.length}</h3>*/}

      Hello and welcome to The Daily Review Podcast powered by the New York
      Times. I am your host, Max Adler.
      <br />
      Today's top {articles && articles.length} stories from The New York Times,
      for your listening pleasure:
      <br />

      <button style={{background:'limegreen', width:'240px', padding:'24px', margin:'16px', borderRadius:'32px'}} type={'primary'} onClick={() => speak({ text: articles })}>▶️ PLAY The Daily Review</button>
      <br/>
      <br/>
      <button style={{background:'red', width:'240px', padding:'8px 24px', margin:'16px', borderRadius:'32px'}} type={'primary'} onClick={() => cancel()}>STOP</button>
      <br/>
      <br/>
      {/*{articles &&*/}
      {/*  articles.map(({ section, title, abstract, published_date }, index) => (*/}
      {/*    <p key={index}>*/}
      {/*      {title}.*/}
      {/*      {abstract}*/}
      {/*      /!*{' '}Next article:*!/*/}
      {/*    </p>*/}
      {/*  ))}*/}

        {articles}

    </div>
  );
}

export default App;
