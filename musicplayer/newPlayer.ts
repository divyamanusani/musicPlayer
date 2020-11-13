interface songArr {
	songName: string,
	songurl: string
}

interface playlists {
	name: string,
	song: songArr[]
}

class MusicAlbum {
	playlistsArr: playlists[] = [];
	constructor() {
		this.playlistsArr = [
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
				name: 'Musics', song:
					[
						{ songName: 'Sound Helix1', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
						{ songName: 'SoundHelix2', songurl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },

					]
			}
		];
		this.getSongsApi();
	}

	getSongsApi = async (): Promise<any>  => {
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
		this.displaySongs(tracks, count, true);
	}

	displaySongs(tracks, count: number, isSongsApi: boolean) {
		let container = document.getElementById('songsContainer');
		container.innerHTML = "";
		for (let j = 0; j < tracks.length / 4; j++) {
			let row = this.createEleWithClass('div', 'row');
			for (let i = 0; i < 4; i++) {
				if (!tracks[count])
					continue;
				let col = this.createEleWithClass('div', 'col-lg-3 col-sm-6 col-xs-12');
				let card = this.createEleWithClass('div', 'card-flex mt-3 mb-3');
				let cardHeader = this.createEleWithClass('div', 'card-header');
				if (isSongsApi)
					cardHeader.innerHTML = `<h2>${tracks[count].title}</h2>`;
				else
					cardHeader.innerHTML = `<h2>${tracks[count].track.title}</h2>`;
				let cardBody = this.createEleWithClass('div', 'card-body p-0 text-center');
				let cardfooter = this.createEleWithClass('div', 'card-footer text-white bg-dark');
				let playBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
				let stopBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
				stopBtn.setAttribute('href', '#');
				stopBtn.innerHTML = "Stop";
				stopBtn.setAttribute('onclick', 'this.stopSong()');
				playBtn.setAttribute('href', '#');
				playBtn.innerHTML = "Play";
				if (isSongsApi) {
					playBtn.setAttribute('onclick', `this.playSong("${tracks[count].hub.actions[1].uri}","${tracks[count].title}")`);
					stopBtn.setAttribute('onclick', `this.stopSong("${tracks[count].hub.actions[1].uri}","${tracks[count].title}")`);
				}

				else {
					playBtn.setAttribute('onclick', `this.playSong('${tracks[count].track.hub.actions[1].uri}','${tracks[count].track.title}')`);
					stopBtn.setAttribute('onclick', `this.stopSong('${tracks[count].track.hub.actions[1].uri}','${tracks[count].track.title}')`);
				}
				var iconBtn = this.createEleWithClass('a', 'btn btn-outline-light btn-lg');
				iconBtn.setAttribute('href', '#');
				iconBtn.setAttribute('style', 'float:right');
				iconBtn.setAttribute('data-toggle', 'modal');
				iconBtn.setAttribute('data-target', '#myModal');
				if (isSongsApi)
					iconBtn.setAttribute('onclick', `this.getSongDetails("${tracks[count].title}","${tracks[count].hub.actions[1].uri}")`);
				else
					iconBtn.setAttribute('onclick', `this.getSongDetails("${tracks[count].track.title}","${tracks[count].track.hub.actions[1].uri}")`);
				var icon = document.createElement('i');
				icon.setAttribute('class', 'fa fa-plus-circle');
				let p = this.createEleWithClass('p', 'card-text');
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

	reloadPlaylists() {

		let playlistPage = document.getElementById('songcolleft');
		playlistPage.innerHTML = " ";
		this.playlistsArr.forEach((list, index) => {
			let card1 = this.createEleWithClass('div', 'card mt-3 mb-3 cardList');
			card1.setAttribute('onclick', `this.displayReqSongsList(${index})`);
			let img = this.createEleWithClass('img', 'listImg');
			img.setAttribute('style', "filter:blur(3px)")
			let imgText = this.createEleWithClass('div', 'centered');
			imgText.innerHTML = list.name;
			img.src = `./musicImgs/img${Math.floor(Math.random() * 10) + 1}.jpg`;
			card1.append(img, imgText)
			playlistPage.append(card1);
		});
	}

	displayReqSongsList(plyListIndex: number) {

		let colright = document.getElementById('songcolright');
		colright.innerHTML = "";
		let tot = this.playlistsArr[plyListIndex].song;
		let ul = document.createElement('ul');
		tot.forEach((title, index) => {
			if (index == 0)
				var card = this.createEleWithClass('div', 'card mt-4 p-1 songCard');
			else
				var card = this.createEleWithClass('div', 'card m-0 p-1 songCard');
			card.setAttribute('onclick', `this.playPlayListSong(${plyListIndex},${index})`);
			let body = this.createEleWithClass('div', 'card-body songtext p-1')
			let li = document.createElement('li');
			body.innerHTML = `${index + 1}. ${title.songName}`;
			card.append(body);
			li.append(card);
			ul.append(li);
		})
		colright.append(ul);

	}

	playPlayListSong = async (listIndex: number, songIndex: number): Promise<any> => {
		let audio = <HTMLAudioElement>document.getElementById('audioPlayer');
		let audioSrc = <HTMLSourceElement>document.getElementById('audioPlayersrc');
		let songTitleName = <HTMLDivElement>document.getElementById('songtitleheader');
		songTitleName.innerHTML = this.playlistsArr[listIndex].song[songIndex].songName;
		audioSrc.src = this.playlistsArr[listIndex].song[songIndex].songurl;

		await audio.load();
		audio.play();
		audio.volume = 0.6;
	}

	getSongDetails(songTitle: string, songURL: string) {
		(<HTMLInputElement>document.getElementById('songtitle')).value = songTitle;
		(<HTMLInputElement>document.getElementById('songurl')).value = songURL;

	}


	getSongsSearch = async () : Promise<any>=> {
		let searchTerm = (<HTMLInputElement>document.getElementById('searchSong')).value;
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
		this.displaySongs(tracks, count, false);
	}

	playSong = async (songUrl: string, songtitle: string): Promise<any> => {
		let audio = <HTMLAudioElement>document.getElementById('player');
		let audioSrc = <HTMLSourceElement>document.getElementById('sourceAudio');
		(<HTMLHeadingElement>document.getElementById('hometitleheader')).innerHTML = songtitle;
		audioSrc.src = songUrl;
		await audio.load();
		audio.play();
		audio.volume = 0.6;

	}

	stopSong = async (songUrl: string): Promise<any> => {
		let audio = <HTMLAudioElement>document.getElementById('player');
		let audioSrc = <HTMLSourceElement>document.getElementById('sourceAudio');
		if (audioSrc.src == songUrl) {
			await audio.pause();
			audio.currentTime = 0;
		}
	}

	addSongToPlaylist() {
		let listEle = <HTMLInputElement>document.getElementById('newplaylistName');
		if (listEle.value.length == 0 || listEle.value == " ") {
			listEle.focus();
			alert('Enter valid playlist name');
		}
		else {
			let songData = {
				name: listEle.value,
				song: [
					{
						songName: (<HTMLInputElement>document.getElementById('songtitle')).value,
						songurl: (<HTMLInputElement>document.getElementById('songurl')).value
					}
				]
			}

			if (this.playlistsArr.length === 0) {
				this.playlistsArr.push(songData);
				this.addPlaylistsName();
			}
			else {
				let i = 0;
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
	}

	addSongToExistingPlaylist(sname, surl, playlistName) {
		let i = 0;
		for (i = 0; i < this.playlistsArr.length; i++) {
			if (this.playlistsArr[i].name === playlistName) {
				this.playlistsArr[i].song.push({ songName: sname, songurl: surl });
			}
		}
	}

	addPlaylistsName() {
		let listEle = <HTMLSelectElement>document.getElementById('playlistNames');
		let listName = this.playlistsArr[this.playlistsArr.length - 1].name;
		let option = <HTMLOptionElement>document.createElement('option');
		option.setAttribute('value', listName);
		option.innerHTML = listName;
		listEle.appendChild(option);
	}

	displayAllPlaylists() {
		this.reloadPlaylists();
		(<HTMLDivElement>document.getElementById('playermusic')).style.display = 'none';
		(<HTMLDivElement>document.getElementById('songsContainer')).style.display = 'none';
		(<HTMLDivElement>document.getElementById('playlistPage')).style.display = 'block';
		(<HTMLInputElement>document.getElementById('searchSong')).disabled = true;
		(<HTMLButtonElement>document.getElementById('searchBtn')).disabled = true;

	}

	displayHome() {
		(<HTMLDivElement>document.getElementById('playermusic')).style.display = 'block';
		(<HTMLDivElement>document.getElementById('songsContainer')).style.display = 'block';
		(<HTMLDivElement>document.getElementById('playlistPage')).style.display = 'none';
		(<HTMLInputElement>document.getElementById('searchSong')).disabled = false;
		(<HTMLButtonElement>document.getElementById('searchBtn')).disabled = false;
	}

	//creating element with classname
	createEleWithClass(ele, className: string) {
		var k = document.createElement(ele);
		k.setAttribute('class', className);
		return k;
	}

}

let media = new MusicAlbum();
