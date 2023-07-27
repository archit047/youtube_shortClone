import React, { useEffect } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import { useState } from "react";
import VideoCard,{AdVideoCard} from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  async function getVideos() {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    setVideos(json.items);
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex flex-wrap">
      {videos[0] && <AdVideoCard info={videos[0]}/>}
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v="+video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
