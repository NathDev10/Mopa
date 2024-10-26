import React, { useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useLocation } from 'react-router-dom';
import doublefleche from '../assets/double-fleche.png';
import AudioPlayer from '../assets/AudioPlayer.gif';

export default function MyStory() {
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  const audioPlayerRef = useRef(null);
  var top = true;
  const location = useLocation();
  const { Text, audioUrl } = location.state || {};
  
  const scrollToBottom = () => {
    console.log(audioUrl);
    if(top){
      top = false;
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      top = true;
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const pauseAudio = () => {
     if (audioPlayerRef.current) {
    const audioEl = audioPlayerRef.current.audioEl.current;
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }
  };

  return (
    
    <div className="StoryPage">
      <div ref={topRef}></div>
        <h1 className="title">SayMyStory</h1>
        <img src={AudioPlayer} ref={audioPlayerRef} height={250} width={250} onClick={pauseAudio}></img>
        
        <div className='doubleFleche'>
        <div ref={bottomRef}></div>
        <img src={doublefleche} height={50} width={60} onClick={scrollToBottom}></img>
        </div>
        
        <div className="Story-Text">
        {Text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
          ))}
        </div>
        <div>
        <ReactAudioPlayer
          ref={audioPlayerRef}
          src={audioUrl}
          autoPlay
          controls
          className="hidden"
        />
        </div>
    </div>
  );
}