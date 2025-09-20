import './Main-Window/mainWindow.css';
import { useEffect, useState } from 'react';
import getData from './Main-Window/getData/getData';
import SearchBar from './Main-Window/searchBar/SearchBar';
import VideoTemplate from './Main-Window/VideoTemplate/VideoTemplate';

function App() {
  const [videos, setVideos] = useState<any[]>([]);

  // função que o SearchBar vai chamar
  async function handleSearch(query: string) {
    const data = await getData(query);
    setVideos(data);
  }

  // opcional: carregar algo inicial
  useEffect(() => {
    handleSearch(""); // busca inicial vazia ou default
  }, []);

  return (
    <>
      <div className="search-bar-container">
        {/* Passa a função como prop */}
        <SearchBar placeholderText="search for a video..." onSearch={handleSearch} />
      </div>
      <div className="results-div">
        {videos.map(video => (
          <VideoTemplate
            key={video.id.videoId ?? video.id} // cuidado: às vezes vem id diferente no YouTube API
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails?.high?.url ?? ""}
            channelName={video.snippet.channelTitle}
            views={video.statistics?.viewCount ?? "0"}
            timePassed={new Date(video.snippet.publishedAt).toLocaleDateString()}
            channelPic={"https://via.placeholder.com/48"} // temp fallback
          />
        ))}
      </div>
    </>
  )
}

export default App;
