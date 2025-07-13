import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaying } from '../redux/slices/playerSlice';
import './MusicPlayer.css';

function MusicPlayer() {
  const { currentTrack, isPlaying } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };

  return (
    <div className="music-player">
      <div>
        <p>{currentTrack.title}</p>
        <p className="subtitle">{currentTrack.subtitle}</p>
      </div>
      <button onClick={togglePlay} className="play-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src={currentTrack.preview} />
    </div>
  );
}

export default MusicPlayer;