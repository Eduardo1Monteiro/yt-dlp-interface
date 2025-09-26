import './VideoTemplate.css';

function VideoTemplate(props: { thumbnail: string, title: string, channelName: string, views: string, timePassed: string, link: string }) {

  function handleClick() {
    (window as any).electronAPI.openSecondaryWindow({
      link: props.link,
      title: props.title,
      thumbnail: props.thumbnail
    });
  };

  return (
    <div className="video-container">
      <div className="thumbnail-container" onClick={handleClick}>
        <img src={props.thumbnail} />
      </div>
      <div className="meta-info-container">
        <div className="text-info-container" onClick={handleClick}>
          <p className="title">
            {props.title}
          </p>
          <p className="channel-name">
            {props.channelName}
          </p>
          <p className="video-stats">
            {props.views} views | {props.timePassed}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoTemplate;
