<template>
  <div id="AlbumLists">
    <a href="#" class="reset-home" @click.prevent="getAll()"></a>
    <div class="Album-search">
      <input
        type="text"
        placeholder="search artist..."
        @keyup.enter="searchArtist($event.target.value)"
      >
    </div>
    <div v-if="albums.length > 0" class="AlbumLists">
      <div v-for="(album,index) in albums" :key="album.a_id" class="Album">
        <div class="Album-image">
          <img
            v-bind:src="require(`../assets/images/${album.album_pic}`)"
            v-bind:alt="album.album_name"
          >
        </div>
        <router-link :to="`/album/${album.a_id}`">
          <div class="Album-info">
            <div class="Album-name">
              <div class="Album-number">{{index+1}}</div>
              {{album.album_name}}
            </div>
            <div class="Album-aritst">{{album.artist_name}}</div>
            <div class="Album-date">{{album.release_date}}</div>
            <div class="Album-genre">{{album.genres}}</div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="Album-empty">등록된 앨범이 없습니다.</div>
  </div>
</template>

<script>
// import albums from "./../albums.json";
import soundService from "@/services/soundService";
import axios from "axios";
export default {
  name: "AlbumLists",
  data() {
    return {
      albums: []
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      const response = await soundService.getAllAlbums();
      this.albums = response.data.albums;
    },
    async searchArtist(artist) {
      if (artist.length < 1) {
        return this.getAll();
      }
      const response = await soundService.searchArtist(artist);
      this.albums = response.data.albums;
    }
  }
};
</script>

<style>
#AlbumLists {
  width: 100%;
  max-width: 640px;
  position: relative;
  margin: auto;
}
#AlbumLists .reset-home {
  position: absolute;
  width: 165px;
  height: 30px;
  display: inline-block;
  top: -40px;
  left: 0;
  z-index: 100;
}
.AlbumLists {
  padding: 30px 10px 120px 10px;
  text-align: left;
  box-sizing: border-box;
}
.AlbumLists > div:nth-of-type(2n) {
  margin-left: 18px;
}
#AlbumLists .Album-search {
  position: absolute;
  top: -2.6rem;
  right: 0.8rem;
}
.Album-search input {
  width: 170px;
  height: 32px;
  line-height: 32px;
  padding: 0 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  outline: 0;
  padding: 0 15px;
}

.Album-empty {
  text-align: center;
  padding: 3rem 0;
}
.Album {
  width: calc(50% - 9px);
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.07), 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  background: #ffffff;
}
.Album-image {
  position: relative;
  width: 100%;
}
.Album-image img {
  width: 100%;
}
.Album-info {
  padding: 15px 10px;
  position: relative;
  font-size: 1rem;
}
.Album a {
  text-decoration: none;
  display: block;
}
.Album-number {
  display: inline-block;
  padding-right: 0.5rem;
  color: #000000;
  font-size: 1rem;
  line-height: 1.5rem;
}
.Album-name {
  min-width: 110px;
  color: #000000;
  font-size: 1rem;
  line-height: 1.5rem;
}
.Album-aritst {
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #757271;
}
.Album-date {
  font-size: 0.7rem;
  line-height: 1rem;
  color: #757271;
}
.Album-genre {
  font-size: 0.7rem;
  line-height: 1rem;
  color: #757271;
}
</style>
