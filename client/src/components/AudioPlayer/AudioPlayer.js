import React, { useState } from "react";
import "./AudioPlayer.css";

function AudioPlayer({ src }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <audio
        controls
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        id="audio-player"
      />
    </div>
  );
}

export default AudioPlayer;
