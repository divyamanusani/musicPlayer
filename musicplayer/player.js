let playlistsArr = [];

//if modal is open
// let dropdownSel = document.getElementById('playlistNames');
// let inpTxt = document.getElementById('newplaylistName').value;

// if (dropdownSel.value !== 0) {
//     inpTxt.disabled = true;
// }
// else {
//     inpTxt.disabled = false;
// }

async function getSongsapi() {
    let songs = await fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c204cc8052msh96dac8f09970455p1cab12jsneb13a550fb65",
            "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
    });
    let songsJson = await songs.json();
    let tracks = songsJson.tracks;
    let count = tracks.length - 1;
    displaySongs(tracks, count, true);

}

function displaySongs(tracks, count, isSongsApi) {
    let container = document.getElementById('songsContainer');
    container.innerHTML = "";
    for (let j = 0; j < tracks.length / 4; j++) {
        let row = createEleWithClass('div', 'row');
        for (let i = 0; i < 4; i++) {
            if (!tracks[count])
                continue;
            let col = createEleWithClass('div', 'col-lg-3 col-md-6 col-sm-6 col-xs-12');
            let card = createEleWithClass('div', 'card-flex border mt-3 mb-3');
            let cardHeader = createEleWithClass('div', 'card-header');
            if (isSongsApi)
                cardHeader.innerHTML = `<h2>${tracks[count].title}</h2>`;
            else
                cardHeader.innerHTML = `<h2>${tracks[count].track.title}</h2>`;
            let cardBody = createEleWithClass('div', 'card-body p-0 text-center');
            let cardfooter = createEleWithClass('div', 'card-footer text-white bg-dark');
            let playBtn = createEleWithClass('a', 'btn btn-outline-light btn-lg');
            let stopBtn = createEleWithClass('a', 'btn btn-outline-light btn-lg');
            stopBtn.setAttribute('href', '#');
            stopBtn.innerHTML = "Stop";
            stopBtn.setAttribute('onclick', 'stopSong()');
            playBtn.setAttribute('href', '#');
            playBtn.innerHTML = "Play";
            if (isSongsApi) {
                playBtn.setAttribute('onclick', `playSong('${tracks[count].hub.actions[1].uri}')`);
                stopBtn.setAttribute('onclick', `stopSong('${tracks[count].hub.actions[1].uri}')`);
            }

            else {
                playBtn.setAttribute('onclick', `playSong('${tracks[count].track.hub.actions[1].uri}')`);
                stopBtn.setAttribute('onclick', `stopSong('${tracks[count].track.hub.actions[1].uri}')`);
            }
            var iconBtn = createEleWithClass('a', 'btn btn-outline-light btn-lg');
            iconBtn.setAttribute('href', '#');
            iconBtn.setAttribute('style', 'float:right');
            iconBtn.setAttribute('data-toggle', 'modal');
            iconBtn.setAttribute('data-target', '#myModal');
            if (isSongsApi)
                iconBtn.setAttribute('onclick', `getSongDetails('${tracks[count].title}','${tracks[count].hub.actions[1].uri}')`);
            else
                iconBtn.setAttribute('onclick', `getSongDetails('${tracks[count].track.title}','${tracks[count].track.hub.actions[1].uri}')`);
            var icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-plus-circle');
            let p = createEleWithClass('p', 'card-text');
            let img = document.createElement('img');
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
}

function getSongDetails(songTitle, songURL) {
    document.getElementById('songtitle').value = songTitle;
    document.getElementById('songurl').value = songURL;
}

async function getSongsSearch() {
    let searchTerm = document.getElementById('searchSong').value;
    console.log(searchTerm);
    let songs = await fetch(`https://shazam.p.rapidapi.com/search?term=${searchTerm}&locale=en-US&offset=0&limit=8`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c204cc8052msh96dac8f09970455p1cab12jsneb13a550fb65",
            "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
    });
    let songsJson = await songs.json();
    let tracks = songsJson.tracks.hits;
    let count = songsJson.tracks.hits.length - 1;
    console.log(tracks);
    displaySongs(tracks, count, false);
}

async function playSong(songUrl) {
    let audio = document.getElementById('player');
    let audioSrc = document.getElementById('sourceAudio');
    audioSrc.src = songUrl;
    await audio.load();
    audio.play();

}

async function stopSong(songUrl) {
    let audio = document.getElementById('player');
    let audioSrc = document.getElementById('sourceAudio');
    if (audioSrc.src == songUrl) {
        await audio.pause();
        audio.currentTime = 0;
    }
}

function addSongToPlaylist() {
    let songData = {
        name: document.getElementById('playlistName').value,
        song: [
            {
                songName: document.getElementById('songtitle').value,
                songUrl: document.getElementById('songurl').value
            }
        ]
    }

    if (playlistsArr.length === 0) {
        playlistsArr.push(songData);
        addPlaylistsName();
    }
    for (let i = 0; i < playlistsArr.length; i++) {

        if (playlistsArr[i].name == songData.name) {
            addSongToExistingPlaylist(songData.song[0].songName, songData.song[0].songURL);
            break;
        }
        if (i == playlistsArr.length - 1) {
            playlistsArr.push(songData);
            addPlaylistsName();
        }
    }

}

function addPlaylistsName() {
    let listEle = document.getElementById('playlistNames');
    let listName = playlistsArr[playlistsArr.length - 1].name;
    let option = document.createElement('option');
    option.setAttribute('value', listName);
    option.innerHTML = listName;
    listEle.appendChild(option);
}

//creating element with classname
function createEleWithClass(ele, className) {
    var k = document.createElement(ele);
    k.setAttribute('class', className);
    return k;
}

window.onload = getSongsapi;




// fetch("https://shazam.p.rapidapi.com/search?term=despacito&locale=en-US&offset=0&limit=5", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "4a0570bdebmsh645f5041a2d18dfp199383jsn9793c3348ece",
// 		"x-rapidapi-host": "shazam.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
// let audioLinks = {
//     0: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//     1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
//     2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
//     3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
//     4: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
//     5: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
//     6: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
//     7: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
//     8: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
//     9: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
//     10: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
//     11: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
//     12: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
//     13: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
//     14: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
//     15: 'sample.mp3'
// }
// //pause(), .volume=0 to 1, play()
// interface songTags {
//     directorName: string,
//     songType: string,
//     instrument: string,
//     playlist?: [],
// }
// class Song {
//     songId: number;
//     defaultSongTag: songTags;
//     constructor(songId: number, defSongTag: songTags) {
//         this.songId = songId;
//         this.defaultSongTag = defSongTag;
//         var links = (<HTMLDivElement>document.getElementById('audioLinks'));
//         var anchor = document.createElement('a');
//         anchor.className = "btn btn-info btn-block";
//         anchor.setAttribute('role', 'button');
//         anchor.href = "#";
//         anchor.innerHTML = `Song${this.songId}`;
//         var iconBtn=document.createElement('button');
//         iconBtn.className="btn btn-default";
//         var icon = document.createElement('i');
//         icon.setAttribute('class', 'fa fa-plus-circle');
//         anchor.onclick = this.playSong(`${audioLinks[this.songId]}`);
//         iconBtn.appendChild(icon);
//         anchor.appendChild(iconBtn);
//         links.append(anchor);
//     }
//     addTag(tag: {}) {
//     }
//     playSong(music: string): () => void {
//         return () => {
//             var player = (<HTMLAudioElement>document.getElementById('player'));
//             player.pause();
//             var sourceEle = document.getElementsByTagName('source')[0];
//             sourceEle.setAttribute('src', music);
//             player.load();
//             player.play();
//             player.volume = 0.5;
//         }
//     }
// }
// class Album {
//     listOfSongs: [];
//     constructor() {
//     }
// }
// class PlayList{
// name:string;
// playListArr=[];
// }
// class user {
//     userName: string;
//     userID;
//     album: Album;
// }
// var mysong = new Array<Song>();
// for (var i = 0; i <= 15; i++) {
//     mysong[i] = new Song(i, {
//         directorName: "AR Rahman",
//         songType: 'pop',
//         instrument: 'piano'
//     });
// }
// function playSong(music: string) {
//     var player = (<HTMLAudioElement>document.getElementById('player'));
//     player.pause();
//     var sourceEle = document.getElementsByTagName('source')[0];
//     sourceEle.setAttribute('src', music);
//     player.load();
//     player.play();
//     player.volume = 0.5;
// }
