





















getSongsapi()=>{
 fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4a0570bdebmsh645f5041a2d18dfp199383jsn9793c3348ece",
		"x-rapidapi-host": "shazam.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response.json());
})
.catch(err => {
	console.error(err);
});

}

































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

