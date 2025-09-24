import './VideoTemplate.css';


function VideoTemplate(props: { thumbnail: string, title: string, channelName: string, views: string, timePassed: string }) {
  return (
    <div className="video-container">
      <div className="thumbnail-container">
        <img src={props.thumbnail} />
      </div>
      <div className="meta-info-container">
        <div className="text-info-container">
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
