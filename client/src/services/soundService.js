import Api from "@/services/Api";

export default {
  getAllAlbums() {
    return Api().get("/albums");
  },
  searchArtist(artist) {
    return Api().post(`/albums/search`, { artist: artist });
  },
  getAlbumInfo(id) {
    return Api().get(`/albums/${id}`);
  }
};
