import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setResults } from '../redux/slices/searchSlice';
import { setTrack, setPlaying } from '../redux/slices/playerSlice';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { results } = useSelector(state => state.search);

  const handleSearch = () => {
    axios.get('https://shazam.p.rapidapi.com/search', {
      headers: {
        'X-RapidAPI-Key': '2f961659c9mshae0b31f0b1b38d3p1847f8jsn083e3325b64c',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      },
      params: {
        term: query,
        locale: 'en-US',
        offset: '0',
        limit: '5',
      },
    }).then(res => {
      const hits = res.data.tracks?.hits.map(hit => hit.track) || [];
      dispatch(setResults(hits));
    }).catch(err => console.error(err));
  };

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
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search songs..." className="search-input" />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="results">
        {results.map(track => (
          <div key={track.key} onClick={() => playTrack(track)} className="track-card">
            <p>{track.title}</p>
            <p className="subtitle">{track.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
