var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MusicAlbum = /** @class */ (function () {
    function MusicAlbum() {
        var _this = this;
        this.playlistsArr = [];
        this.getSongsApi = function () { return __awaiter(_this, void 0, void 0, function () {
            var songs, songsJson, tracks, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=xxxxxxxx&locale=en-US", {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-key": "xxxxxxxxxxxxxxxxx",
                                "x-rapidapi-host": "shazam.p.rapidapi.com"
                            }
                        })];
                    case 1:
                        songs = _a.sent();
                        return [4 /*yield*/, songs.json()];
                    case 2:
                        songsJson = _a.sent();
                        tracks = songsJson.tracks;
                        count = tracks.length - 1;
                        this.displaySongs(tracks, count, true);
                        return [2 /*return*/];
                }
            });
        }); };
        this.playPlayListSong = function (listIndex, songIndex) { return __awaiter(_this, void 0, void 0, function () {
            var audio, audioSrc, songTitleName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audio = document.getElementById('audioPlayer');
                        audioSrc = document.getElementById('audioPlayersrc');
                        songTitleName = document.getElementById('songtitleheader');
                        songTitleName.innerHTML = this.playlistsArr[listIndex].song[songIndex].songName;
                        audioSrc.src = this.playlistsArr[listIndex].song[songIndex].songurl;
                        return [4 /*yield*/, audio.load()];
                    case 1:
                        _a.sent();
                        audio.play();
                        audio.volume = 0.6;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSongsSearch = function () { return __awaiter(_this, void 0, void 0, function () {
            var searchTerm, songs, songsJson, tracks, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchTerm = document.getElementById('searchSong').value;
                        console.log(searchTerm);
                        return [4 /*yield*/, fetch("https://shazam.p.rapidapi.com/search?term=" + searchTerm + "&locale=en-US&offset=0&limit=8", {
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-key": "xxxxxxxxxxxxxxxxx",
                                    "x-rapidapi-host": "shazam.p.rapidapi.com"
                                }
                            })];
                    case 1:
                        songs = _a.sent();
                        return [4 /*yield*/, songs.json()];
                    case 2:
                        songsJson = _a.sent();
                        tracks = songsJson.tracks.hits;
                        count = songsJson.tracks.hits.length - 1;
                        console.log(tracks);
                        this.displaySongs(tracks, count, false);
                        return [2 /*return*/];
                }
            });
        }); };
        this.playSong = function (songUrl, songtitle) { return __awaiter(_this, void 0, void 0, function () {
            var audio, audioSrc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audio = document.getElementById('player');
                        audioSrc = document.getElementById('sourceAudio');
                        document.getElementById('hometitleheader').innerHTML = songtitle;
                        audioSrc.src = songUrl;
                        return [4 /*yield*/, audio.load()];
                    case 1:
                        _a.sent();
                        audio.play();
                        audio.volume = 0.6;
                        return [2 /*return*/];
                }
            });
        }); };
        this.stopSong = function (songUrl) { return __awaiter(_this, void 0, void 0, function () {
            var audio, audioSrc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audio = document.getElementById('player');
                        audioSrc = document.getElementById('sourceAudio');
                        if (!(audioSrc.src == songUrl)) return [3 /*break*/, 2];
                        return [4 /*yield*/, audio.pause()];
                    case 1:
                        _a.sent();
                        audio.currentTime = 0;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        this.playlistsArr = [
            {
                name: 'Playlist1', song: [
                    { songName: 'Baby', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/12/a3/49/mzm.hodpiwco.aac.p.m4a' },
                    { songName: 'Rowdy baby', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/7a/ab/2a/7aab2ad5-0c10-6a10-7e83-4b8a9b4fae4f/mzaf_876931133502812493.plus.aac.p.m4a' },
                    { songName: 'Ninnu Kori', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/98/5a/91/985a9198-e826-2569-4d17-62b5a0266060/mzaf_6805449438671444082.plus.aac.p.m4a' },
                    { songName: 'Bahara', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/23/7f/a6/mzm.palsmhbq.aac.p.m4a' }
                ]
            },
            {
                name: 'Musics', song: [
                    { songName: 'Sound Helix1', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                    { songName: 'SoundHelix2', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                ]
            }
        ];
        this.getSongsApi();
    }
    MusicAlbum.prototype.displaySongs = function (tracks, count, isSongsApi) {
        var container = document.getElementById('songsContainer');
        container.innerHTML = "";
        for (var j = 0; j < tracks.length / 4; j++) {
            var row = this.createEleWithClass('div', 'row');
            for (var i = 0; i < 4; i++) {
                if (!tracks[count])
                    continue;
                var col = this.createEleWithClass('div', 'col-lg-3 col-sm-6 col-xs-12');
                var card = this.createEleWithClass('div', 'card-flex mt-3 mb-3');
                var cardHeader = this.createEleWithClass('div', 'card-header');
                if (isSongsApi)
                    cardHeader.innerHTML = "<h2>" + tracks[count].title + "</h2>";
                else
                    cardHeader.innerHTML = "<h2>" + tracks[count].track.title + "</h2>";
                var cardBody = this.createEleWithClass('div', 'card-body p-0 text-center');
                var cardfooter = this.createEleWithClass('div', 'card-footer text-white bg-dark');
                var playBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
                var stopBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
                stopBtn.setAttribute('href', '#');
                stopBtn.innerHTML = "Stop";
                stopBtn.setAttribute('onclick', 'this.stopSong()');
                playBtn.setAttribute('href', '#');
                playBtn.innerHTML = "Play";
                if (isSongsApi) {
                    playBtn.setAttribute('onclick', "this.playSong(\"" + tracks[count].hub.actions[1].uri + "\",\"" + tracks[count].title + "\")");
                    stopBtn.setAttribute('onclick', "this.stopSong(\"" + tracks[count].hub.actions[1].uri + "\",\"" + tracks[count].title + "\")");
                }
                else {
                    playBtn.setAttribute('onclick', "this.playSong('" + tracks[count].track.hub.actions[1].uri + "','" + tracks[count].track.title + "')");
                    stopBtn.setAttribute('onclick', "this.stopSong('" + tracks[count].track.hub.actions[1].uri + "','" + tracks[count].track.title + "')");
                }
                var iconBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
                iconBtn.setAttribute('href', '#');
                iconBtn.setAttribute('style', 'float:right');
                iconBtn.setAttribute('data-toggle', 'modal');
                iconBtn.setAttribute('data-target', '#myModal');
                if (isSongsApi)
                    iconBtn.setAttribute('onclick', "this.getSongDetails(\"" + tracks[count].title + "\",\"" + tracks[count].hub.actions[1].uri + "\")");
                else
                    iconBtn.setAttribute('onclick', "this.getSongDetails(\"" + tracks[count].track.title + "\",\"" + tracks[count].track.hub.actions[1].uri + "\")");
                var icon = document.createElement('i');
                icon.setAttribute('class', 'fa fa-plus-circle');
                var p = this.createEleWithClass('p', 'card-text');
                var img = document.createElement('img');
                if (isSongsApi)
                    img.src = tracks[count--].images.coverarthq;
                else
                    img.src = tracks[count--].track.images.coverarthq;
                p.appendChild(img);
                cardBody.appendChild(p);
                iconBtn.appendChild(icon);
                cardfooter.append(playBtn, stopBtn, iconBtn);
                card.append(cardHeader, cardBody, cardfooter);
                col.appendChild(card);
                row.appendChild(col);
            }
            container.appendChild(row);
        }
    };
    MusicAlbum.prototype.reloadPlaylists = function () {
        var _this = this;
        var playlistPage = document.getElementById('songcolleft');
        playlistPage.innerHTML = " ";
        this.playlistsArr.forEach(function (list, index) {
            var card1 = _this.createEleWithClass('div', 'card mt-3 mb-3 cardList');
            card1.setAttribute('onclick', "this.displayReqSongsList(" + index + ")");
            var img = _this.createEleWithClass('img', 'listImg');
            img.setAttribute('style', "filter:blur(3px)");
            var imgText = _this.createEleWithClass('div', 'centered');
            imgText.innerHTML = list.name;
            img.src = "./musicImgs/img" + (Math.floor(Math.random() * 10) + 1) + ".jpg";
            card1.append(img, imgText);
            playlistPage.append(card1);
        });
    };
    MusicAlbum.prototype.displayReqSongsList = function (plyListIndex) {
        var _this = this;
        var colright = document.getElementById('songcolright');
        colright.innerHTML = "";
        var tot = this.playlistsArr[plyListIndex].song;
        var ul = document.createElement('ul');
        tot.forEach(function (title, index) {
            if (index == 0)
                var card = _this.createEleWithClass('div', 'card mt-4 p-1 songCard');
            else
                var card = _this.createEleWithClass('div', 'card m-0 p-1 songCard');
            card.setAttribute('onclick', "this.playPlayListSong(" + plyListIndex + "," + index + ")");
            var body = _this.createEleWithClass('div', 'card-body songtext p-1');
            var li = document.createElement('li');
            body.innerHTML = index + 1 + ". " + title.songName;
            card.append(body);
            li.append(card);
            ul.append(li);
        });
        colright.append(ul);
    };
    MusicAlbum.prototype.getSongDetails = function (songTitle, songURL) {
        document.getElementById('songtitle').value = songTitle;
        document.getElementById('songurl').value = songURL;
    };
    MusicAlbum.prototype.addSongToPlaylist = function () {
        var listEle = document.getElementById('newplaylistName');
        if (listEle.value.length == 0 || listEle.value == " ") {
            listEle.focus();
            alert('Enter valid playlist name');
        }
        else {
            var songData = {
                name: listEle.value,
                song: [
                    {
                        songName: document.getElementById('songtitle').value,
                        songurl: document.getElementById('songurl').value
                    }
                ]
            };
            if (this.playlistsArr.length === 0) {
                this.playlistsArr.push(songData);
                this.addPlaylistsName();
            }
            else {
                var i = 0;
                for (i = 0; i < this.playlistsArr.length; i++) {
                    if (this.playlistsArr[i].name == songData.name) {
                        this.addSongToExistingPlaylist(songData.song[0].songName, songData.song[0].songurl, songData.name);
                        break;
                    }
                }
                if (i == this.playlistsArr.length) {
                    this.playlistsArr.push(songData);
                    this.addPlaylistsName();
                }
            }
        }
        this.reloadPlaylists();
    };
    MusicAlbum.prototype.addSongToExistingPlaylist = function (sname, surl, playlistName) {
        var i = 0;
        for (i = 0; i < this.playlistsArr.length; i++) {
            if (this.playlistsArr[i].name === playlistName) {
                this.playlistsArr[i].song.push({ songName: sname, songurl: surl });
            }
        }
    };
    MusicAlbum.prototype.addPlaylistsName = function () {
        var listEle = document.getElementById('playlistNames');
        var listName = this.playlistsArr[this.playlistsArr.length - 1].name;
        var option = document.createElement('option');
        option.setAttribute('value', listName);
        option.innerHTML = listName;
        listEle.appendChild(option);
    };
    MusicAlbum.prototype.displayAllPlaylists = function () {
        this.reloadPlaylists();
        document.getElementById('playermusic').style.display = 'none';
        document.getElementById('songsContainer').style.display = 'none';
        document.getElementById('playlistPage').style.display = 'block';
        document.getElementById('searchSong').disabled = true;
        document.getElementById('searchBtn').disabled = true;
    };
    MusicAlbum.prototype.displayHome = function () {
        document.getElementById('playermusic').style.display = 'block';
        document.getElementById('songsContainer').style.display = 'block';
        document.getElementById('playlistPage').style.display = 'none';
        document.getElementById('searchSong').disabled = false;
        document.getElementById('searchBtn').disabled = false;
    };
    //creating element with classname
    MusicAlbum.prototype.createEleWithClass = function (ele, className) {
        var k = document.createElement(ele);
        k.setAttribute('class', className);
        return k;
    };
    return MusicAlbum;
}());
var media = new MusicAlbum();
