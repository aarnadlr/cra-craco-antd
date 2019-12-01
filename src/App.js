import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function App() {

  const [totalNumOfArticles, setTotalNumOfArticles] = useState(null);


  const [longTranscriptString, setLongTranscriptString] = useState('Loading...');

  // SELECT WHICH VOICE by index
  const [voiceIndex] = useState(7);

  const { speak, cancel, voices } = useSpeechSynthesis();

  // SELECTED VOICE
  const voice = voices[voiceIndex] || null;


  useEffect(() => {

    let finalSingleString = '';

    fetch(
      'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YFNhGhkzEe0Yq3KwV25z5b7qNvzGYmne'
    )
      .then(res => res.json())
      .then(data => {

        // Save the total num of articles (to render separately)
        setTotalNumOfArticles(data.results.length);

        let podcastIntroString = `Hello and welcome to The Daily Review Podcast. Today's top ${data.results.length} stories from The New York Times:`;

        // Store the long final accum string
        finalSingleString =
          data.results.reduce(
            (accumString, currObj, ind, srcArr) => {
              let prefix = `Story number ${ind + 1}.`;

              let title = `${currObj.title}.`;
              let abstract = currObj.abstract;

              //Build the single string for each articleObj:
              // concat the prefix, the title, the abstract
              let singleString = prefix.concat(' ', title).concat(' ', abstract);

              // Add to the accumString the single string
              return accumString.concat(' ', singleString);
            }, ''
          );
        let introWithLongString = podcastIntroString.concat(finalSingleString);
        //Take the finalSingleString and save it to state
        setLongTranscriptString(introWithLongString);
      });  //<--END OF THEN BLOCK

  }, []);

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', margin: '32px' }}
    >
      {/*{voices.forEach((item, index) => {*/}
      {/*  console.log(`VOICE ${index}: `, item);*/}
      {/*})}*/}

      <h1>The Daily Review Podcast</h1>

      <h3>(Total num of articles: {totalNumOfArticles})</h3>

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
        onClick={() => speak({ text: longTranscriptString, voice })}
      >
        <span role="img" >▶</span>️ PLAY The Daily Review
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

      <h3>Transcript:</h3>

      <p>{longTranscriptString}</p>
    </div>
  );
}

export default App;
