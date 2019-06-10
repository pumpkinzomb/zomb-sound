webpackJsonp([1],{NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),s=(a("feh2"),0),n=1,r=2,u={name:"MusicPlayer",props:{tracks:{type:Array,default:[]}},data:function(){return{activeTrack:0,audioElement:null,status:s,volume:5,currentTime:0,duration:"0:00",printCurrentTime:"0:00",progress:0}},methods:{toggleStatus:function(){this.isTrackLoaded||this.loadTrack(this.activeTrack||0),this.isPlaying?this.pause():this.play()},loadTrack:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.audioElement&&this.audioElement.pause(),t>=this.tracks.length)return!1;this.activeTrack=t,this.audioElement=new Audio(this.tracks[t].url),this.updateVolume(),this.status=s,this.audioElement.addEventListener("ended",this.loadNextTrack),this.audioElement.addEventListener("loadedmetadata",this.prettyDuration),this.audioElement.ontimeupdate=this.updateProgress,e&&this.play()},prettyDuration:function(){this.duration=parseInt(this.audioElement.duration/60)+" :\n        "+(parseInt(this.audioElement.duration%60)<10?"0"+parseInt(this.audioElement.duration%60):parseInt(this.audioElement.duration%60))},loadNextTrack:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.activeTrack++,this.activeTrack>=this.tracks.length&&(this.activeTrack=0),this.loadTrack(this.activeTrack,t)},play:function(){this.status=r,this.audioElement.play()},pause:function(){this.status=n,this.audioElement.pause()},updateVolume:function(){this.audioElement&&(this.audioElement.volume=this.volume/10)},updateProgress:function(){if(!this.audioElement||!this.audioElement.currentTime)return this.progress=0;this.progress=this.audioElement.currentTime/this.audioElement.duration*100,this.printCurrentTime=parseInt(this.audioElement.currentTime/60)+"\n         : "+(parseInt(this.audioElement.currentTime%60)<10?"0"+parseInt(this.audioElement.currentTime%60):parseInt(this.audioElement.currentTime%60))},updateCurrentTime:function(){if(!this.audioElement||!this.audioElement.currentTime)return this.currentTime=0;this.audioElement.currentTime=Math.floor(this.audioElement.duration*(this.currentTime/100))}},computed:{isPaused:function(){return n===this.status},isPlaying:function(){return r===this.status},isTrackLoaded:function(){return null!==this.activeTrack&&this.audioElement}},watch:{volume:function(t){this.updateVolume()},currentTime:function(t){this.updateCurrentTime()}},beforeDestroy:function(){this.audioElement.pause(),this.audioElement.currentTime=0}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"MusicPlayer",attrs:{id:"MusicPlayer"}},[a("div",{staticClass:"column is-6 is-offset-3"},[a("div",{attrs:{id:"media-player"}},[a("ul",t._l(t.tracks,function(e,i){return a("li",{key:i,class:{"is-active":i===t.activeTrack}},[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.loadTrack(i,!0)}}},[t._v(t._s(e.title)+" by "+t._s(e.artist))])])}),0),t._v(" "),a("div",{staticClass:"media-player__controls"},[a("div",{staticClass:"media-player__play-pause-button"},[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.toggleStatus(e)}}},[a("i",{staticClass:"material-icons"},[t._v("\n              "+t._s(t.isPlaying?"pause_circle_filled":"play_circle_filled_white")+"\n            ")])])]),t._v(" "),a("div",{staticClass:"media-player__playback-container"},[a("span",{staticClass:"currentTime"},[t._v(t._s(this.printCurrentTime))]),t._v(" "),a("div",{style:{width:t.progress+"%"}}),t._v(" "),a("span",{staticClass:"duration"},[t._v(t._s(this.duration))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.currentTime,expression:"currentTime"}],attrs:{type:"range",min:"0",max:"100",step:"1"},domProps:{value:t.currentTime},on:{__r:function(e){t.currentTime=e.target.value}}})]),t._v(" "),a("div",{staticClass:"media-player__volume-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.volume,expression:"volume"}],attrs:{type:"range",min:"0",max:"10",step:"0.5"},domProps:{value:t.volume},on:{__r:function(e){t.volume=e.target.value}}})])])])])])},staticRenderFns:[]};var c=a("VU/8")(u,l,!1,function(t){a("XTdv")},null,null).exports,A={name:"App",data:function(){return{tracks:[]}},mounted:function(){},methods:{addMusic:function(t){var e=this;if(this.tracks.length>0&&this.tracks[this.tracks.length-1].title===t.title)return setTimeout(function(){return e.$refs.musicPlayer.toggleStatus()},1);this.tracks=[t],setTimeout(function(){return e.$refs.musicPlayer.loadTrack(e.tracks.length-1,!0)},1)}},beforeDestroy:function(){this.tracks=[]},components:{MusicPlayer:c}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("header",[a("div",[a("router-link",{attrs:{to:{name:"AlbumLists"}}},[a("span",{staticClass:"point-color"},[t._v("ZOMB")]),t._v(" SOUND\n      ")])],1)]),t._v(" "),a("router-view",{attrs:{addMusic:t.addMusic}}),t._v(" "),t.tracks.length>0?a("MusicPlayer",{ref:"musicPlayer",attrs:{tracks:t.tracks}}):t._e()],1)},staticRenderFns:[]};var m=a("VU/8")(A,o,!1,function(t){a("xyCT")},null,null).exports,d=a("/ocq"),v=a("Xxa5"),p=a.n(v),_=a("exGp"),h=a.n(_),f=a("mtWM"),b=a.n(f),g=function(){return b.a.create({baseURL:"/api"})},k=function(){return g().get("/albums")},y=function(t){return g().post("/albums/search",{artist:t})},T=function(t){return g().get("/albums/"+t)},E={name:"AlbumLists",data:function(){return{albums:[]}},mounted:function(){this.getAll()},methods:{getAll:function(){var t=this;return h()(p.a.mark(function e(){var a;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:a=e.sent,t.albums=a.data.albums;case 4:case"end":return e.stop()}},e,t)}))()},searchArtist:function(t){var e=this;return h()(p.a.mark(function a(){var i;return p.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!(t.length<1)){a.next=2;break}return a.abrupt("return",e.getAll());case 2:return a.next=4,y(t);case 4:i=a.sent,e.albums=i.data.albums;case 6:case"end":return a.stop()}},a,e)}))()}}},C={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"AlbumLists"}},[i("a",{staticClass:"reset-home",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.getAll()}}}),t._v(" "),i("div",{staticClass:"Album-search"},[i("input",{attrs:{type:"text",placeholder:"search artist..."},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchArtist(e.target.value)}}})]),t._v(" "),t.albums.length>0?i("div",{staticClass:"AlbumLists"},t._l(t.albums,function(e,s){return i("div",{key:e.a_id,staticClass:"Album"},[i("router-link",{attrs:{to:"/album/"+e.a_id}},[i("div",{staticClass:"Album-image"},[i("img",{attrs:{src:a("g2Y0")("./"+e.album_pic),alt:e.album_name}})]),t._v(" "),i("div",{staticClass:"Album-info"},[i("div",{staticClass:"Album-name"},[i("div",{staticClass:"Album-number"},[t._v(t._s(s+1))]),t._v("\n            "+t._s(e.album_name)+"\n          ")]),t._v(" "),i("div",{staticClass:"Album-aritst"},[t._v(t._s(e.artist_name))]),t._v(" "),i("div",{staticClass:"Album-date"},[t._v(t._s(e.release_date))]),t._v(" "),i("div",{staticClass:"Album-genre"},[t._v(t._s(e.genres))])])])],1)}),0):i("div",{staticClass:"Album-empty"},[t._v("등록된 앨범이 없습니다.")])])},staticRenderFns:[]};var w=a("VU/8")(E,C,!1,function(t){a("calE")},null,null).exports,R={name:"AlbumLists",props:["addMusic"],data:function(){return{album:void 0,tracks:[]}},mounted:function(){this.getAlbum(this.$route.params.id)},methods:{getAlbum:function(t){var e=this;return h()(p.a.mark(function a(){var i;return p.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,T(t);case 2:i=a.sent,e.album=i.data.album[0],e.tracks=i.data.tracks;case 5:case"end":return a.stop()}},a,e)}))()},onAddMusic:function(t){var e={url:t.song_url,title:t.title,artist:t.artist_name};this.addMusic(e)}}},M={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"Album"}},[void 0!==t.album?i("div",{staticClass:"Album"},[i("h1",[i("i",{staticClass:"material-icons"},[t._v("album")]),t._v("\n      "+t._s(t.album.album_name)+"\n    ")]),t._v(" "),i("div",{staticClass:"Album-image"},[i("img",{attrs:{src:a("g2Y0")("./"+t.album.album_pic),alt:t.album.album_name}})]),t._v(" "),i("div",{staticClass:"Album-info"},[i("div",[i("span",[t._v("아티스트")]),t._v(" "),i("span",[t._v(t._s(t.album.artist_name))])]),t._v(" "),i("div",[i("span",[t._v("앨범종류")]),t._v(" "),i("span",[t._v(t._s(t.album.album_type))])]),t._v(" "),i("div",[i("span",[t._v("발매일")]),t._v(" "),i("span",[t._v(t._s(t.album.release_date))])]),t._v(" "),i("div",[i("span",[t._v("장르")]),t._v(" "),i("span",[t._v(t._s(t.album.genres))])]),t._v(" "),i("div",[i("span",[t._v("스타일")]),t._v(" "),i("span",[t._v(t._s(t.album.styles))])]),t._v(" "),i("div",[i("span",[t._v("기획사")]),t._v(" "),i("span",[t._v(t._s(t.album.agency))])]),t._v(" "),i("div",[i("span",[t._v("유통사")]),t._v(" "),i("span",[t._v(t._s(t.album.distributor))])]),t._v(" "),i("div",[i("span",[t._v("재생시간")]),t._v(" "),i("span",[t._v(t._s(t.album.Playback_time))])]),t._v(" "),i("div",[i("span",[t._v("고음질")]),t._v(" "),i("span",[t._v(t._s(t.album.high_pitched_quality))])]),t._v(" "),i("div",{staticClass:"Album-likes"},[t._m(0),t._v(" "),i("span",[t._v(t._s(t.album.likes))])])]),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"Album-track"},[i("div",{staticClass:"Album-track-heading"},[t._v("수록곡")]),t._v(" "),i("table",[t._m(1),t._v(" "),t._m(2),t._v(" "),t.tracks.length>0?i("tbody",t._l(t.tracks,function(e,a){return i("tr",{key:a},[i("td",[t._v(t._s(a+1))]),t._v(" "),i("td",[t._v(t._s(e.title))]),t._v(" "),i("td",[t._v(t._s(e.artist_name))]),t._v(" "),i("td",[i("a",{staticClass:"music-btn",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.onAddMusic(e)}}},[i("i",{staticClass:"material-icons"},[t._v("play_circle_filled")])])])])}),0):i("tbody",[t._m(3)])])])]):i("div",[t._v("Loading...")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"material-icons"},[this._v("star_border")]),this._v(" 좋아요\n        ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("colgroup",[e("col",{attrs:{width:"12%"}}),this._v(" "),e("col",{attrs:{width:"43%"}}),this._v(" "),e("col",{attrs:{width:"30%"}}),this._v(" "),e("col",{attrs:{width:"15%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("번호")]),this._v(" "),e("th",[this._v("곡")]),this._v(" "),e("th",[this._v("아티스트")]),this._v(" "),e("th",[this._v("듣기")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{attrs:{colspan:"4"}},[this._v("수록곡이 없습니다.")])])}]};var I=a("VU/8")(R,M,!1,function(t){a("Y+TH")},null,null).exports;i.a.use(d.a);var x=new d.a({mode:"history",routes:[{path:"/",name:"AlbumLists",component:w},{path:"/play",name:"MusicPlayer",component:c},{path:"/album/:id",name:"Album",component:I}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:x,components:{App:m},template:"<App/>"})},XTdv:function(t,e){},"Y+TH":function(t,e){},cKFT:function(t,e,a){t.exports=a.p+"static/img/fallinlove.ab2bff5.jpg"},calE:function(t,e){},feh2:function(t,e){},g2Y0:function(t,e,a){var i={"./fallinlove.jpg":"cKFT","./loveletters.jpg":"rpKR","./ratioFixer.png":"muWH","./whayobi.jpg":"iUZJ","./yesterday.jpg":"zTYT"};function s(t){return a(n(t))}function n(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}s.keys=function(){return Object.keys(i)},s.resolve=n,t.exports=s,s.id="g2Y0"},iUZJ:function(t,e,a){t.exports=a.p+"static/img/whayobi.a8bf8b3.jpg"},muWH:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTk0QTM0MzhBMEQxMUU5QTFGNEIyNTREQzRGMkRGQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTk0QTM0NDhBMEQxMUU5QTFGNEIyNTREQzRGMkRGQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlFOTRBMzQxOEEwRDExRTlBMUY0QjI1NERDNEYyREZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlFOTRBMzQyOEEwRDExRTlBMUY0QjI1NERDNEYyREZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iOApiwAAAAZQTFRF////AAAAVcLTfgAAALVJREFUeNrswQENAAAAwqD3T20ON6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHg0AQYAcq4AAUbpjk4AAAAASUVORK5CYII="},rpKR:function(t,e,a){t.exports=a.p+"static/img/loveletters.0433500.jpg"},xyCT:function(t,e){},zTYT:function(t,e,a){t.exports=a.p+"static/img/yesterday.a52ece0.jpg"}},["NHnr"]);
//# sourceMappingURL=app.23ee8b3f9a72e08e3cd4.js.map