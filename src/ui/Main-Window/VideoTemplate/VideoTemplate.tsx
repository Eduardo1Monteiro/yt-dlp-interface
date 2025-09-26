import './VideoTemplate.css';


function VideoTemplate(props: { thumbnail: string, title: string, channelName: string, views: string, timePassed: string, link: string }) {
  return (
    <div className="video-container">
      <div className="thumbnail-container">
        <a href={props.link}><img src={props.thumbnail} /></a>
      </div>
      <div className="meta-info-container">
        <div className="text-info-container">
          <a href={props.link} className="title">
            {props.title}
          </a>
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
