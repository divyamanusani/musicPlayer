
// Array which contains playlists added by user
let playlistsArr = [
    {
        name: 'Playlist1', song:
            [
                { songName: 'Baby', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/12/a3/49/mzm.hodpiwco.aac.p.m4a' },
                { songName: 'Rowdy baby', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/7a/ab/2a/7aab2ad5-0c10-6a10-7e83-4b8a9b4fae4f/mzaf_876931133502812493.plus.aac.p.m4a' },
                { songName: 'Ninnu Kori', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/98/5a/91/985a9198-e826-2569-4d17-62b5a0266060/mzaf_6805449438671444082.plus.aac.p.m4a' },
                { songName: 'Bahara', songurl: 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/23/7f/a6/mzm.palsmhbq.aac.p.m4a' }
            ]
    },
    {
        name: 'Musical', song:
            [
                { songName: 'Sound Helix1', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                { songName: 'SoundHelix2', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                
            ]
    }
];

// Adding the required playlists to playlists page
function reloadPlaylists() {

    let playlistPage = document.getElementById('songcolleft');
    playlistPage.innerHTML = " ";
    playlistsArr.forEach((list, index) => {
        let card1 = createEleWithClass('div', 'card mt-3 mb-3 cardList');
        card1.setAttribute('onclick', `displayReqSongsList(${index})`)
        let img = createEleWithClass('img', 'listImg');
        img.setAttribute('style', "filter:blur(3px)")
        let imgText = createEleWithClass('div', 'centered');
        imgText.innerHTML = list.name;
        img.src = `./musicImgs/img${Math.floor(Math.random() * 10) + 1}.jpg`;
        card1.append(img, imgText)
        playlistPage.append(card1);
    });
}

// displaying songs of requested playlist in playlists page
function displayReqSongsList(plyListIndex) {

    let colright = document.getElementById('songcolright');
    colright.innerHTML = "";
    let tot = playlistsArr[plyListIndex].song;
    let ul = document.createElement('ul');
    tot.forEach((title, index) => {
        if (index == 0)
            var card = createEleWithClass('div', 'card mt-4 p-1 songCard');
        else
            var card = createEleWithClass('div', 'card m-0 p-1 songCard');

        card.setAttribute('onclick', `playPlayListSong(${plyListIndex},${index})`);
        let body = createEleWithClass('div', 'card-body songtext p-1')
        let li = document.createElement('li');
        body.innerHTML = `${index + 1}. ${title.songName}`;
        card.append(body);
        li.append(card);
        ul.append(li);
    })
    colright.append(ul);

}

// playing the selected songs of playlist
async function playPlayListSong(listIndex, songIndex) {
    let audio = document.getElementById('audioPlayer');
    let audioSrc = document.getElementById('audioPlayersrc');
    let songTitleName = document.getElementById('songtitleheader');
    songTitleName.innerHTML = playlistsArr[listIndex].song[songIndex].songName;
    audioSrc.src = playlistsArr[listIndex].song[songIndex].songurl;

    await audio.load();
    audio.play();
}

//Getting album songs api from shazam music app
async function getSongsapi() {
    let songs = await fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=xxxxxxxx&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "xxxxxxxxxxxxxxxxx",
            "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
    });
    let songsJson = await songs.json();
    let tracks = songsJson.tracks;
    let count = tracks.length - 1;
    displaySongs(tracks, count, true);

}

// displaying the api songs on the home page
function displaySongs(tracks, count, isSongsApi) {
    let container = document.getElementById('songsContainer');
    container.innerHTML = "";
    for (let j = 0; j < tracks.length / 4; j++) {
        let row = createEleWithClass('div', 'row');
        for (let i = 0; i < 4; i++) {
            if (!tracks[count])
                continue;
            let col = createEleWithClass('div', 'col-lg-3 col-sm-6 col-xs-12');
            let card = createEleWithClass('div', 'card-flex mt-3 mb-3');
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
                playBtn.setAttribute('onclick', `playSong("${tracks[count].hub.actions[1].uri}","${tracks[count].title}")`);
                stopBtn.setAttribute('onclick', `stopSong("${tracks[count].hub.actions[1].uri}","${tracks[count].title}")`);
            }

            else {
                playBtn.setAttribute('onclick', `playSong('${tracks[count].track.hub.actions[1].uri}','${tracks[count].track.title}')`);
                stopBtn.setAttribute('onclick', `stopSong('${tracks[count].track.hub.actions[1].uri}','${tracks[count].track.title}')`);
            }
            var iconBtn = createEleWithClass('a', 'btn btn-outline-light btn-lg');
            iconBtn.setAttribute('href', '#');
            iconBtn.setAttribute('style', 'float:right');
            iconBtn.setAttribute('data-toggle', 'modal');
            iconBtn.setAttribute('data-target', '#myModal');
            if (isSongsApi)
                iconBtn.setAttribute('onclick', `getSongDetails("${tracks[count].title}","${tracks[count].hub.actions[1].uri}")`);
            else
                iconBtn.setAttribute('onclick', `getSongDetails("${tracks[count].track.title}","${tracks[count].track.hub.actions[1].uri}")`);
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

// getting song title and song url
function getSongDetails(songTitle, songURL) {
    document.getElementById('songtitle').value = songTitle;
    document.getElementById('songurl').value = songURL;

}

// fetching song from song search
async function getSongsSearch() {
    let searchTerm = document.getElementById('searchSong').value;
    console.log(searchTerm);
    let songs = await fetch(`https://shazam.p.rapidapi.com/search?term=${searchTerm}&locale=en-US&offset=0&limit=8`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "xxxxxxxxxxxxxxxxx",
            "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
    });
    let songsJson = await songs.json();
    let tracks = songsJson.tracks.hits;
    let count = songsJson.tracks.hits.length - 1;
    console.log(tracks);
    displaySongs(tracks, count, false);
}

// playing the song on clicking play button
async function playSong(songUrl, songtitle) {
    let audio = document.getElementById('player');
    let audioSrc = document.getElementById('sourceAudio');
    document.getElementById('hometitleheader').innerHTML = songtitle;
    audioSrc.src = songUrl;
    await audio.load();
    audio.play();
    audio.volume = 0.7;

}

// implements stopping song
async function stopSong(songUrl) {
    let audio = document.getElementById('player');
    let audioSrc = document.getElementById('sourceAudio');
    if (audioSrc.src == songUrl) {
        await audio.pause();
        audio.currentTime = 0;
    }
}

//adds songs to playlist array
function addSongToPlaylist() {
    let listEle = document.getElementById('newplaylistName');
    if (listEle.value.length == 0 || listEle.value == "") {
        listEle.focus();
        alert('Enter valid playlist name');
    }
    else {
        let songData = {
            name: document.getElementById('newplaylistName').value,
            song: [
                {
                    songName: document.getElementById('songtitle').value,
                    songurl: document.getElementById('songurl').value
                }
            ]
        }

        if (playlistsArr.length === 0) {
            playlistsArr.push(songData);
            addPlaylistsName();
        }
        else {
            let i = 0;
            for (i = 0; i < playlistsArr.length; i++) {

                if (playlistsArr[i].name == songData.name) {
                    addSongToExistingPlaylist(songData.song[0].songName, songData.song[0].songurl, songData.name);
                    break;
                }

            }
            if (i == playlistsArr.length) {
                playlistsArr.push(songData);
                addPlaylistsName();
            }
        }
    }
    reloadPlaylists();
}

//on adding songs to same playlist songs to be pushed to playlist array
function addSongToExistingPlaylist(sname, surl, playlistName) {
    let reqPlaylist = playlistsArr.find((list) => list.name == playlistName);
    reqPlaylist.song.push({ songName: sname, songurl: surl });
}

//adding playlists name to list of existing playlists
function addPlaylistsName() {
    let listEle = document.getElementById('playlistNames');
    let listName = playlistsArr[playlistsArr.length - 1].name;
    let option = document.createElement('option');
    option.setAttribute('value', listName);
    option.innerHTML = listName;
    listEle.appendChild(option);
}

//displays playlists tab
function displayAllPlaylists() {
    reloadPlaylists();
    document.getElementById('playermusic').style.display = 'none';
    document.getElementById('songsContainer').style.display = 'none'
    document.getElementById('playlistPage').style.display = 'block';
    document.getElementById('searchSong').disabled = true;
    document.getElementById('searchBtn').disabled = true;

}

//displays home page
function displayHome() {
    document.getElementById('playermusic').style.display = 'block';
    document.getElementById('songsContainer').style.display = 'block'
    document.getElementById('playlistPage').style.display = 'none';
    document.getElementById('searchSong').disabled = false;
    document.getElementById('searchBtn').disabled = false;
}

//creating element with classname
function createEleWithClass(ele, className) {
    var k = document.createElement(ele);
    k.setAttribute('class', className);
    return k;
}

// on loading the window, album is displayed
window.onload = getSongsapi;






