<template>
  <div id="app">
    <header>
      <div>
        <router-link :to="{name:'AlbumLists'}">
          <span class="point-color">ZOMB</span> SOUND
        </router-link>
      </div>
    </header>
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-bind:addMusic="addMusic"/>
    <MusicPlayer v-if="tracks.length>0" v-bind:tracks="tracks" ref="musicPlayer"/>
  </div>
</template>

<script>
import "reset-css";
import MusicPlayer from "./components/MusicPlayer";
export default {
  name: "App",
  data: function() {
    return {
      tracks: []
    };
  },
  mounted() {},
  methods: {
    addMusic(song) {
      if (this.tracks.length > 0) {
        if (this.tracks[this.tracks.length - 1].title === song.title) {
          return setTimeout(() => this.$refs.musicPlayer.toggleStatus(), 1);
        }
      }
      this.tracks = [song];
      setTimeout(
        () => this.$refs.musicPlayer.loadTrack(this.tracks.length - 1, true),
        1
      );
    }
  },
  beforeDestroy() {
    this.tracks = [];
  },
  components: {
    MusicPlayer
  }
};
</script>

<style>
body {
  background: #f1f1f1;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
#app header {
  background: #3a3f41;
  padding: 0;
}
#app header div {
  width: 100%;
  max-width: 640px;
  margin: auto;
  padding: 1rem;
  font-size: 1.2rem;
  color: #ffffff;
  box-sizing: border-box;
}
#app header div a {
  text-decoration: none;
  color: #ffffff;
}
#app header div a span {
  font-weight: bold;
}

#app header div a .point-color {
  color: #41af7f;
}
</style>
