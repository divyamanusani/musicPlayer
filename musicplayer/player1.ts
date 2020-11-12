interface songArr{
	songName:string,
	songurl:string
}

interface playlists{
	name:string,
	song:songArr[]
}

var playlistsArr: playlists[]=
 [
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

class Song {
	songName:string;
	songurl:string
	constructor(songName:string,songurl:string) {
		this.songName = songName;
		this.songurl = songurl;
		var links = (<HTMLDivElement>document.getElementById('audioLinks'));
		var anchor = document.createElement('a');
		anchor.className = "btn btn-info btn-block";
		anchor.setAttribute('role', 'button');
		anchor.href = "#";
		anchor.innerHTML = `Song${this.songId}`;
		var iconBtn = document.createElement('button');
		iconBtn.className = "btn btn-default";
		var icon = document.createElement('i');
		icon.setAttribute('class', 'fa fa-plus-circle');
		anchor.onclick = this.playSong(`${audioLinks[this.songId]}`);
		iconBtn.appendChild(icon);
		anchor.appendChild(iconBtn);
		links.append(anchor);

	}


	addTag(tag: {}) {

	}

	playSong(music: string): () => void {
		return () => {
			var player = (<HTMLAudioElement>document.getElementById('player'));
			player.pause();
			var sourceEle = document.getElementsByTagName('source')[0];
			sourceEle.setAttribute('src', music);
			player.load();
			player.play();
			player.volume = 0.5;
		}

	}
}
class Album {
	listOfSongs: [];
	constructor() {

	}


}

class PlayList {
	name: string;
	playListArr = [];
}


var mysong = new Array<Song>();
for (var i = 0; i <= 15; i++) {
	mysong[i] = new Song(i, {
		directorName: "AR Rahman",
		songType: 'pop',
		instrument: 'piano'
	});
}
function playSong(music: string) {
	var player = (<HTMLAudioElement>document.getElementById('player'));
	player.pause();
	var sourceEle = document.getElementsByTagName('source')[0];
	sourceEle.setAttribute('src', music);
	player.load();
	player.play();
	player.volume = 0.5;
}























// getSongsapi()=>{
//  fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "4a0570bdebmsh645f5041a2d18dfp199383jsn9793c3348ece",
// 		"x-rapidapi-host": "shazam.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response.json());
// })
// .catch(err => {
// 	console.error(err);
// });

// }















