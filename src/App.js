import React, { useEffect, useState } from 'react';
// import './App.css';
// import { Button } from 'antd';
// import Speech from 'react-speech';
import { useSpeechSynthesis } from 'react-speech-kit';

function App() {
  const tts = `Hello and welcome to The Daily Review Podcast. Today's top 35 stories from The New York Times:`;

  const [articles, setArticles] = useState(tts);

  // const [valToSpeak, setValToSpeak] = useState(tts);

  const voiceArray = [
    {
      // default: true,
      lang: 'en-AU',
      localService: true,
      name: 'Karen',
      voiceURI: 'Karen'
    },
    {
      voiceURI: 'Google US English',
      name: 'Google US English',
      lang: 'en-US',
      localService: false,
      default: true
    }
  ];

  // VOICE 1!!!
  const [voiceIndex, setVoiceIndex] = useState(7);

  const { speak, cancel, voices } = useSpeechSynthesis();

  // VOICE 2!!
  const voice = voices[voiceIndex] || null;

  // const onEnd = () => {
  //   // You could do something here after speaking has finished
  // };


  const reducer = (string, currObj) => {
    let title = currObj.title;
    let abstract = currObj.abstract;

    let finalString = string.concat(' ', title).concat('. ', abstract);

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

        setArticles(tts.concat(' ', data.results.reduce(reducer, '')));
      });
    // .then(()=>{
    //   return speak({ text: valToSpeak })
    // });
  }, [tts]);

  return (
    <div className="App" style={{display:'flex', flexDirection:'column', margin:'32px'}}>


      {
        voices.forEach((item, index)=>{
          console.log(`VOICE ${index}: `, item)
        })
      }

      {/*{console.log('VOICES:', voices)}*/}


      <h1>The Daily Review Podcast</h1>


      <br />


      <button
        style={{
          background: 'limegreen',
          width: '240px',
          padding: '24px',
          margin: '16px',
          borderRadius: '32px'
        }}
        type={'primary'}
        onClick={() => speak({ text: articles, voice })}
      >
        ▶️ PLAY The Daily Review
      </button>

      <br />

      <button
        style={{
          background: 'red',
          width: '240px',
          padding: '8px 24px',
          margin: '16px',
          borderRadius: '32px'
        }}
        type={'primary'}
        onClick={() => cancel()}
      >
        STOP
      </button>
      <br />
      <br />

      {/*{articles &&*/}
      {/*  articles.map(({ section, title, abstract, published_date }, index) => (*/}
      {/*    <p key={index}>*/}
      {/*      {title}.*/}
      {/*      {abstract}*/}
      {/*      /!*{' '}Next article:*!/*/}
      {/*    </p>*/}
      {/*  ))}*/}

      <h3>Transcript:</h3>

      <p>{articles}</p>

    </div>
  );
}

export default App;
