import './Main-Window/mainWindow.css';
import { useEffect, useState } from 'react';
import getData from './Main-Window/getData/getData';
import SearchBar from './Main-Window/searchBar/SearchBar';
import VideoTemplate from './Main-Window/VideoTemplate/VideoTemplate';

function App() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("music");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  async function handleSearch(newQuery: string) {
    setQuery(newQuery);
    const { items, nextPageToken } = await getData(newQuery);
    setVideos(items);
    setNextPageToken(nextPageToken ?? null);
  }

  async function loadMore() {
    if (!nextPageToken || loading) return;
    setLoading(true);

    const { items, nextPageToken: newToken } = await getData(query, nextPageToken);
    setVideos(prev => [...prev, ...items]);
    setNextPageToken(newToken ?? null);

    setLoading(false);
  }

  useEffect(() => {
    handleSearch(query); // busca inicial vazia ou default
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [query, nextPageToken]);

  return (
    <>
      <div className="header">
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
          />
        ))}
      </div>
    </>
  )
}

export default App;
