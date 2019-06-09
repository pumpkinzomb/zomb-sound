<template>
  <div id="Album">
    <div v-if="album !== undefined" class="Album">
      <h1>
        <i class="material-icons">album</i>
        {{album.album_name}}
      </h1>
      <div class="Album-image">
        <img
          v-bind:src="require(`../assets/images/${album.album_pic}`)"
          v-bind:alt="album.album_name"
        >
      </div>
      <div class="Album-info">
        <div>
          <span>아티스트</span>
          <span>{{album.artist_name}}</span>
        </div>
        <div>
          <span>앨범종류</span>
          <span>{{album.album_type}}</span>
        </div>
        <div>
          <span>발매일</span>
          <span>{{album.release_date}}</span>
        </div>
        <div>
          <span>장르</span>
          <span>{{album.genres}}</span>
        </div>
        <div>
          <span>스타일</span>
          <span>{{album.styles}}</span>
        </div>
        <div>
          <span>기획사</span>
          <span>{{album.agency}}</span>
        </div>
        <div>
          <span>유통사</span>
          <span>{{album.distributor}}</span>
        </div>
        <div>
          <span>재생시간</span>
          <span>{{album.Playback_time}}</span>
        </div>
        <div>
          <span>고음질</span>
          <span>{{album.high_pitched_quality}}</span>
        </div>
        <div class="Album-likes">
          <span>
            <i class="material-icons">star_border</i> 좋아요
          </span>
          <span>{{album.likes}}</span>
        </div>
      </div>
      <hr>
      <div class="Album-track">
        <div class="Album-track-heading">수록곡</div>
        <table>
          <colgroup>
            <col width="12%">
            <col width="43%">
            <col width="30%">
            <col width="15%">
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>곡</th>
              <th>아티스트</th>
              <th>듣기</th>
            </tr>
          </thead>
          <tbody v-if="tracks.length > 0">
            <tr v-for="(track,index) in tracks" :key="index">
              <td>{{index+1}}</td>
              <td>{{track.title}}</td>
              <td>{{track.artist_name}}</td>
              <td>
                <a href="#" class="music-btn" @click.prevent="onAddMusic(track)">
                  <i class="material-icons">play_circle_filled</i>
                </a>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4">수록곡이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import soundService from "@/services/soundService";
export default {
  name: "AlbumLists",
  props: ["addMusic"],
  data() {
    return {
      album: undefined,
      tracks: []
    };
  },
  mounted() {
    this.getAlbum(this.$route.params.id);
  },
  methods: {
    async getAlbum(album_id) {
      const response = await soundService.getAlbumInfo(album_id);
      this.album = response.data.album[0];
      this.tracks = response.data.tracks;
    },
    onAddMusic(track) {
      let music = {
        url: track.song_url,
        title: track.title,
        artist: track.artist_name
      };
      this.addMusic(music);
    }
  }
};
</script>

<style>
#Album {
  width: 100%;
  max-width: 640px;
  padding: 30px 10px 130px 10px;
  margin: auto;
  text-align: left;
  box-sizing: border-box;
  text-align: center;
}
#Album .Album {
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
#Album .Album h1 {
  text-align: center;
  padding-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
}
#Album .Album h1 i {
  font-size: 2rem;
  position: relative;
  top: 4px;
  color: #00bc7e;
}
#Album .Album .Album-image {
  width: 100%;
  max-width: 400px;

  overflow: hidden;
  border-radius: 0.5rem;
  margin: 3rem auto;
}
#Album .Album .Album-image img {
  width: 100%;
}
#Album .Album .Album-info {
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: left;
}
#Album .Album .Album-info span {
  font-size: 0.9rem;
  line-height: 1.5rem;
}
#Album .Album .Album-info span:first-of-type {
  display: inline-block;
  width: 90px;
  color: #757271;
}
#Album .Album .Album-info span:last-of-type {
  color: #3a3635;
}
#Album .Album .Album-likes {
  margin: 1.8rem auto;
  padding: 0.5rem 1rem;
  width: 130px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
}
#Album .Album .Album-likes span {
  line-height: 2rem;
}
#Album .Album .Album-likes i {
  color: #ff564c;
  position: relative;
  top: 5px;
}
#Album .Album hr {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  border: none;
  height: 1px;
  background: #d9d9d9;
}

#Album .Album .Album-track {
  font-size: 0.9rem;
}
#Album .Album .Album-track-heading {
  padding-top: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
}
#Album .Album .Album-track table {
  margin-top: 0.8rem;
  text-align: center;
  border-top: 2px solid #4c4c4c;
  width: 100%;
  max-width: 640px;
}
#Album .Album .Album-track table th {
  padding: 0.8rem 0;
  font-size: 0.8rem;
  color: #757271;
}
#Album .Album .Album-track table td {
  padding: 0.5rem;
  vertical-align: middle;
}
#Album .Album .Album-track .music-btn {
  color: rgba(0, 0, 0, 0.75);
}
#Album .Album .Album-track .music-btn:hover {
  color: #00bc7e;
}
</style>
