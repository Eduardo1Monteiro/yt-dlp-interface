const apiKey = import.meta.env.VITE_API_KEY2;

if (!apiKey) {
  throw new Error('apiKey isn’t defined in .env');
}

async function getData(query: string = "", pageToken?: string) {
  const baseUrl: string = "https://www.googleapis.com/youtube/v3/";
  const params = new URLSearchParams({
    part: "snippet",
    maxResults: "10",
    q: query,
    key: apiKey,
  });

  if (pageToken) params.append("pageToken", pageToken);

  // search for videos
  const searchResults = await fetch(`${baseUrl}search?${params.toString()}`);
  const searchData = await searchResults.json();
  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

  // obtaining some additional informations about those videos
  const statsResults = await fetch(
    `${baseUrl}videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
  );
  const statsData = await statsResults.json();

  return {
    items: statsData.items,
    nextPageToken: searchData.nextPageToken,
  };
}

export default getData;
