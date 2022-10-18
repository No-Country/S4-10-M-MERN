import React, {useState}from "react";
import './index.css';

function CRUDMovies() {
    const [originalTitle, setOriginalTitle] = useState("") ;
    const [spanishTitle, setSpanishTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isSerie, setIsSerie] = useState(0);
    const [audio, setAudio] = useState("");
    const [img, setImg] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(!(originalTitle && spanishTitle && category && img && audio)) {
            alert("Campos sin llenar")
        }else{
        const formData = new FormData()
            formData.append("originalTitle", originalTitle)
            formData.append("spanishTitle", spanishTitle)
            formData.append("category", category)
            formData.append("isSerie", isSerie)
            formData.append("img", img)
            formData.append("audio", audio)
            console.log([...formData])
            console.log(img)
            fetch(`http://localhost:8080/api/v1/movie`, {
                method: "POST",
                body: formData
              })        
                    .then(res => res.text()).then(res => console.log(res))
                    .catch(err => {
                        console.log(err)
                    })
        }
    }

    const handleSpanishTitle = (e) => {
        setSpanishTitle(e.target.value)
    }

    const handleOriginalTitle = (e) => {
        setOriginalTitle(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleIsSerie = (e) => {
        setIsSerie(e.target.checked)
    }

    const handleAudio = (e) => {
        setAudio(e.target.files)
    }

    const handleImg = (e) => {
        setImg(e.target.files)
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre LATAM: </label>
                <input className="form-input" onChange={handleSpanishTitle} value={spanishTitle} />
            </div>
            <div>
                <label>Nombre Ingles: </label>
                <input className="form-input" onChange={handleOriginalTitle} value={originalTitle} />
            </div>
            <div>
                <label>Categoria: </label>
                <input className="form-input" onChange={handleCategory} value={category} />
            </div>
            <div>
                <label>Es una serie?: </label>
                <input type="checkbox" className="checkbox" onChange={handleIsSerie} value={isSerie} /> {isSerie ? "Es Serie" : "Es Pelicula"}
            </div>
            <div className="labelsUpload">
                <label htmlFor="audio">Archivo de audio:</label>
                <input type="file" id="audio" accept="audio/mp3, audio/ogg" onChange={handleAudio} />
            </div>
            <div className="labelsUpload">
                <label htmlFor="img">Archivo de Imagen: </label>
                <input type="file" id="img" accept="image/png, image/jpeg, image/gif" onChange={handleImg}/>
            </div>
            <div>
                <button type="submit" className="button-guardar">Guardar</button>
            </div>
        </form>
        
        
        </div>
    )
}

export default CRUDMovies;