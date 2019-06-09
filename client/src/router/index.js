import Vue from "vue";
import Router from "vue-router";
import AlbumLists from "@/components/AlbumLists";
import MusicPlayer from "@/components/MusicPlayer";
import Album from "@/components/Album";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "AlbumLists",
      component: AlbumLists
    },
    {
      path: "/play",
      name: "MusicPlayer",
      component: MusicPlayer
    },
    {
      path: "/album/:id",
      name: "Album",
      component: Album
    }
  ]
});
