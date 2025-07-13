import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTrack, setPlaying } from '../redux/slices/playerSlice';
import './Home.css';

function Home() {
  const [tracks, setTracks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://shazam.p.rapidapi.com/charts/list', {
      headers: {
        'X-RapidAPI-Key': '2f961659c9mshae0b31f0b1b38d3p1847f8jsn083e3325b64c',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      },
    }).then(res => {
      const globalCharts = res.data.global?.[0]?.charts || [];
      setTracks(globalCharts);
    }).catch(err => console.error(err));
  }, []);

  const playTrack = (track) => {
    const preview = track.hub?.actions?.find(a => a.name === 'preview')?.uri;
    if (!preview) {
      alert("No preview available for this track");
      return;
    }
    dispatch(setTrack({ ...track, preview }));
    dispatch(setPlaying(true));
  };

  return (
    <div className="page">
      <h2 className="heading">Top Tracks</h2>
      <div className="track-grid">
        {tracks.map(track => (
          <div key={track.key} onClick={() => playTrack(track)} className="track-card">
            <img src={track.images?.coverart} alt={track.title} className="cover" />
            <p>{track.title}</p>
            <p className="subtitle">{track.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;