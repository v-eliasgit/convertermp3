import { useRef, useState } from "react"
import { youtube_parser } from "./utils";
import axios from "axios";



function App() {

  const inputUrlRef = useRef ();
  const[urlResult, setUrlResult] = useState(null);  
  const [thumbnailUrl, setThumbnailUrl] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputUrlRef.value);
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const apiKey = 'AIzaSyCjCDHTZzXsWKfwec7MhCvwi4zVlTeZIeM'; // Sua chave de API do YouTube

    const options1 = {
      method: 'GET',
      url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeID}&key=${apiKey}`,
    };
     
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => {
        setUrlResult(res.data.link);
        // Aqui, após obter a URL do vídeo, você pode obter a miniatura
        // e atualizar o estado thumbnailUrl com a URL da miniatura.
        // Por exemplo:
        setThumbnailUrl(`https://img.youtube.com/vi/${youtubeID}/0.jpg`);
      })
      .catch (err => console.log(err))

    inputUrlRef.current.value = '';
  }

  return (
    <div className="app">
      <section className="content">
        <h1 className="content_tittle">Youtube to mp3</h1>
        <p className="content_description">Download in one click</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Paste a Youtube videos URL link..."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            Search
          </button>
        </form>

        {urlResult ? (
          <div>
            <a
              target='_blank'
              rel="noreferrer"
              href={urlResult}
              className="download_btn"
            >
              Download mp3
            </a>
          </div>
        ) : ''}

        {thumbnailUrl && (
          <div>
            <img
              src={thumbnailUrl}
              alt="Miniatura do Vídeo"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </div>
        )}
      </section>
    </div>
  )
}

export default App;