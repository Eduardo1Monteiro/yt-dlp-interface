export interface Video {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}
