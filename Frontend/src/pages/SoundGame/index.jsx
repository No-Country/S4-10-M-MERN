import React,  { useEffect, useState } from 'react';
import useSound from 'use-sound';
import ReactAudioPlayer from 'react-audio-player';
import Loading from '../../components/Loading/Loading';
import { SoundG } from '../../components/SoundGameComponents';

export const SoundGame = () => {

  const [solution, setSolution] = useState({});
  const [loading, setLoading] = useState(true);
  const [movieSound] = useSound(solution?.audio);

  useEffect(() => {
    setLoading(true)
    fetch("https://s4-10-m-mern-production.up.railway.app/api/v1/movie/soundgame")
    .then((res) => res.json())
    .then((json) => {
      // random int between 0 & 
      setSolution(json);
      setLoading(false);
      console.log(json);
    });
  }, []);

  return loading ? (
  <div className='divLoader'>
    <Loading />
  </div>)
  : 
  <SoundG solution={solution}/>
}
