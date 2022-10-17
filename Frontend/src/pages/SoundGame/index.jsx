import React,  { useEffect, useState } from 'react';
import useSound from 'use-sound';
import ReactAudioPlayer from 'react-audio-player';

export const SoundGame = () => {

    const  [movieName, setMovieName] = useState("")

    const [solution, setSolution] = useState({});
    const [loading, setLoading] = useState(true);

    const [movieSound] = useSound(solution?.audio);


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/v1/movie")
          .then((res) => res.json())
          .then((json) => {
            // random int between 0 & 
            setSolution(json);
            setLoading(false);
            console.log(json);
          });
          
        }, []);

    const handleImput = (event) => {
        setMovieName(event.target.value)
        console.log(event.target.value);
    }
    
    const enviarPelicula = (event) => {
        event.preventDefault()
        console.log(event);
    }

  return (
    <>
      <ReactAudioPlayer
          src={solution?.audio}
          autoPlay
          controls
      />
      
      <form onSubmit={enviarPelicula}>
          <label>
              Nombre de la pelicula 
          </label>
          <input type="text" name="movieName" onChange={handleImput}  value={movieName} />
          
          <input type="submit" value="Submit" />
      </form>
    </>
  )
}
