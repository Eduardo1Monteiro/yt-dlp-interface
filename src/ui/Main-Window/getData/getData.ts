const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error('apiKey isn’t defined in .env');
}

async function getData(searchElement: string = ""): Promise<any[]> {
  if (searchElement.trim() === "") {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=10&regionCode=BR&key=${apiKey}`
    );
    const data = await response.json();
    return data.items;
  } else {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchElement)}&maxResults=20&key=${apiKey}`
    );
    const searchData = await searchRes.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    );
    const statsData = await statsRes.json();
    return statsData.items;
  }
}

export default getData;
