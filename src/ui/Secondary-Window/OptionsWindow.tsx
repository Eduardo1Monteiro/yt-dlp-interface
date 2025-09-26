import OptionsMenu from './OptionsMenu/OptionsMenu';
import { useEffect, useState } from 'react';

function Secondary() {
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    (window as any).electronAPI.onVideoData((data: any) => {
      setVideo(data);
    });
  }, []);


  return (
    <>
      <OptionsMenu
        title={video.title}
        link={video.link}
        thumbnail={video.thumbnail}
      />
    </>
  );
}

export default Secondary;
