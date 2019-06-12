<template>
  <div id="MusicPlayer" class="MusicPlayer">
    <div class="column is-6 is-offset-3">
      <div id="media-player">
        <ul>
          <li
            v-for="(track, index) in tracks"
            :key="index"
            v-bind:class="{ 'is-active': index === activeTrack }"
          >
            <a
              href="#"
              @click.prevent="loadTrack(index, true)"
            >{{ track.title }} by {{ track.artist }}</a>
          </li>
        </ul>
        <div class="media-player__controls">
          <div class="skip-previous-button">
            <a href="#" @click.prevent="loadPrevTrack">
              <i class="material-icons">skip_previous</i>
            </a>
          </div>
          <div class="media-player__play-pause-button">
            <a href="#" @click.prevent="toggleStatus">
              <i class="material-icons">
                {{
                isPlaying ? 'pause_circle_filled' : 'play_circle_filled_white'
                }}
              </i>
            </a>
          </div>
          <div class="skip-next-button">
            <a href="#" @click.prevent="loadNextTrack">
              <i class="material-icons">skip_next</i>
            </a>
          </div>
          <div class="media-player__playback-container">
            <span class="currentTime">{{ this.printCurrentTime }}</span>
            <div :style="{ width: progress + '%' }"></div>
            <span class="duration">{{ this.duration }}</span>
            <input type="range" min="0" max="100" step="1" v-model="currentTime">
          </div>
          <div class="media-player__volume-container">
            <input type="range" min="0" max="10" step="0.5" v-model="volume">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const STATUSES = {
  STOPPED: 0,
  PAUSED: 1,
  PLAYING: 2
};
export default {
  name: "MusicPlayer",
  props: {
    tracks: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      activeTrack: 0,
      audioElement: null,
      status: STATUSES.STOPPED,
      volume: 5,
      currentTime: 0,
      duration: "0:00",
      printCurrentTime: "0:00",
      progress: 0
    };
  },
  methods: {
    toggleStatus: function() {
      if (!this.isTrackLoaded) {
        this.loadTrack(this.activeTrack || 0);
      }
      if (!this.isPlaying) {
        this.play();
        return;
      }
      this.pause();
    },
    loadTrack: function(index, autoplay = false) {
      if (this.audioElement) this.audioElement.pause();
      if (index >= this.tracks.length) return false;
      this.activeTrack = index;
      this.audioElement = new Audio(this.tracks[index].url);
      this.updateVolume();
      this.status = STATUSES.STOPPED;
      this.audioElement.addEventListener("ended", this.loadNextTrack);
      this.audioElement.addEventListener("loadedmetadata", this.prettyDuration);
      this.audioElement.ontimeupdate = this.updateProgress;
      // var $vm = this;
      // this.audioElement.addEventListener("durationchange", function() {
      //   $vm.duration = $vm.audioElement.duration;
      // });
      if (autoplay) this.play();
    },
    prettyDuration: function() {
      this.duration = `${parseInt(this.audioElement.duration / 60)} :
        ${
          parseInt(this.audioElement.duration % 60) < 10
            ? `0${parseInt(this.audioElement.duration % 60)}`
            : parseInt(this.audioElement.duration % 60)
        }`;
    },
    loadPrevTrack: function(autoplay = true) {
      this.activeTrack--;
      if (this.activeTrack < 0) {
        this.activeTrack = this.tracks.length - 1;
      }
      this.loadTrack(this.activeTrack, autoplay);
    },
    loadNextTrack: function(autoplay = true) {
      this.activeTrack++;
      if (this.activeTrack >= this.tracks.length) {
        this.activeTrack = 0;
      }
      this.loadTrack(this.activeTrack, autoplay);
    },
    play: function() {
      this.status = STATUSES.PLAYING;
      this.audioElement.play();
    },
    pause: function() {
      this.status = STATUSES.PAUSED;
      this.audioElement.pause();
    },
    updateVolume: function() {
      this.audioElement ? (this.audioElement.volume = this.volume / 10) : null;
    },
    updateProgress: function() {
      if (!this.audioElement || !this.audioElement.currentTime)
        return (this.progress = 0);
      this.progress =
        (this.audioElement.currentTime / this.audioElement.duration) * 100;
      this.printCurrentTime = `${parseInt(this.audioElement.currentTime / 60)}
         : ${
           parseInt(this.audioElement.currentTime % 60) < 10
             ? `0${parseInt(this.audioElement.currentTime % 60)}`
             : parseInt(this.audioElement.currentTime % 60)
         }`;
    },
    updateCurrentTime: function() {
      if (!this.audioElement || !this.audioElement.currentTime)
        return (this.currentTime = 0);
      this.audioElement.currentTime = Math.floor(
        this.audioElement.duration * (this.currentTime / 100)
      );
    }
  },
  computed: {
    isPaused: function() {
      return STATUSES.PAUSED === this.status;
    },
    isPlaying: function() {
      return STATUSES.PLAYING === this.status;
    },
    isTrackLoaded: function() {
      return this.activeTrack !== null && this.audioElement;
    }
  },
  watch: {
    volume: function(val) {
      this.updateVolume();
    },
    currentTime: function(val) {
      this.updateCurrentTime();
    }
  },
  beforeDestroy() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }
};
</script>
<style type="text/css">
#MusicPlayer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
}
#media-player {
  background-color: #ffffff;
  color: #2f3640;
  padding: 16px;
  margin: 0;
}
#media-player ul {
  /* background-color: rgba(50, 50, 50, 0.1);
  border-radius: 6px;
  padding: 16px; */
}
#media-player ul li {
  display: none;
}
#media-player ul li a {
  display: block;
  color: #000000;
  padding: 8px;
  font-size: 0.8rem;
  text-decoration: none;
}
/* #media-player ul li:hover, */
#media-player ul li.is-active {
  font-weight: bold;
  background-color: #ffffff;
  display: block;
}
.media-player__controls {
  padding: 0.5rem;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}
@media (max-width: 640px) {
  .media-player__controls {
    padding: 0;
  }
}

.media-player__controls a {
  color: #eeeeee;
}
.media-player__controls a:hover {
  color: rgba(0, 0, 0, 0.75);
}
.skip-previous-button {
  margin-right: 0.2rem;
}
.skip-next-button {
  margin-left: 0.2rem;
  margin-right: 0.8rem;
}
.media-player__play-pause-button {
  box-sizing: border-box;
}
.media-player__play-pause-button a {
  color: #00bc7e;
}
.media-player__play-pause-button i {
  width: 30px;
  font-size: 30px;
}
.media-player__playback-container {
  position: relative;
}
.media-player__playback-container input {
  width: 100%;
  position: absolute;
  top: -10px;
  left: -3px;
  opacity: 0;
}
.media-player__play-pause-button:hover a {
  color: #008e5c;
}
.media-player__volume-container {
  display: inline-block;
  text-align: center;
}
.media-player__volume-container input {
  -webkit-appearance: none;
  width: 80%;
  height: 5px;
  border-radius: 2px;
  background-color: #eeeeee;
  outline: none;
  position: relative;
  top: -3px;
}
.media-player__volume-container input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 6px;
  background: #00bc7e;
  cursor: pointer;
}
.media-player__volume-container input::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 6px;
  background: #00bc7e;
  cursor: pointer;
}
.media-player__playback-container {
  height: 5px;
  width: 100%;
  border-radius: 2px;
  top: 0;
  position: relative;
  background-color: #eeeeee;
}
.media-player__playback-container div {
  background-color: #00bc7e;
  border-radius: 6px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.media-player__playback-container .currentTime {
  position: absolute;
  top: -16px;
  left: 0;
  font-size: 12px;
}
.media-player__playback-container .duration {
  position: absolute;
  top: -16px;
  right: 0;
  font-size: 12px;
}
</style>

