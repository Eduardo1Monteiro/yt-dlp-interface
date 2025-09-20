import './VideoTemplate.css';


function VideoTemplate(props: { thumbnail: string, channelPic: string, title: string, channelName: string, views: string, timePassed: string }) {
  return (
    <div className="video-container">
      <div className="thumbnail-container">
        <img src={props.thumbnail} />
      </div>
      <div className="meta-info-container">
        <div className="channel-pic">
          <img src={props.channelPic} />
        </div>
        <div className="text-info-container">
          <p className="title">
            {props.title}
          </p>
          <p className="channel-name">
            {props.channelName}
          </p>
          <p className="video-stats">
            {props.views} | {props.timePassed}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoTemplate;
