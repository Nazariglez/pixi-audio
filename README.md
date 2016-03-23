pixi-audio
======================

pixi-audio is a plugin for Pixi.js v3.0.8 or higher to add Audio support using the pixi resource-loader. This plugin use WebAudio by default , and fallbacks to HTMLAudio if it's needed.

## Installation
```
npm install pixi-audio
```

## Usage
### Browserify - webpack
if you use Browserify or Webpack you can use pixi-audio like this:

```js
var PIXI = require('pixi');
var audio = require('pixi-audio'); //pixi-audio is added automatically to the PIXI namespace
```

### Prebuilt files
Just add [pixi-audio.js](https://raw.githubusercontent.com/Nazariglez/pixi-audio/master/build/pixi-audio.js) under `pixi.js` in your HTML file.

### Loading and using Audio
To load audio files you need to use the resource-loader built in pixi.

```js
PIXI.loader.add([
  {name:"AwesomeMusic", url:"./assets/AwesomeMusic.ogg"}
]).load(function(){
  var awesomeMusic = PIXI.audioManager.getAudio('AwesomeMusic');
  awesomeMusic.play();
});
```

### Audio formats support
This lib support mp3, ogg, wav and m4a formats. Unfortunately all [browsers doesn't support all this Audio formats](http://www.w3schools.com/html/html5_audio.asp), to solve this you can pass as an array some urls with different formats for the same file. So, the loader can load the correct format depending of the browser:

```js
var files = ["./assets/AwesomeMusic.ogg", "./assets/AwesomeMusic.mp3"];

PIXI.loader.add([
  {name:"AwesomeMusic", url: files}
]).load(function(){
  var awesomeMusic = PIXI.audioManager.getAudio('AwesomeMusic');
  awesomeMusic.play();
});
```

In the above example, the audio loaded in chrome will be the __ogg__ and in safari will be the __mp3__. But, you don't need care about this, just need to call getAudio using the audio name as param.

### How it works
This plugin add a new namespace named `audio` to the PIXI namespace. This namespace has some audio utils under the name `utils`, the `audioParser` for the resource-loader, and two new classes: `Audio` and `AudioManager`. Also, an instance of `AudioManager` is added to `PIXI` with the `audioManager` name. So, you don't need do anything, just use PIXI.audioManager if you want.

It's important to know when you call `PIXI.audioManager.getAudio('myAudio')` a new instance is created, so if you try again to get the same audio, it will be the same sound, but in a different instance.

### Events
The Audio class extends from [PIXI.utils.EventEmitter](https://github.com/primus/eventemitter3), and emit some events: play, stop, end, pause and resume. This events name are so clear about what they doing. More info: [Node.js Events](https://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2)

### Some examples
Listening the basic events
```js
var myAudio = PIXI.audioManager.getAudio('myAudio');
myAudio.on('start', function(){ console.log('Start!!'); });
myAudio.on('end', function(){ console.log('End!!'); });

myAudio.play();
```

Adding custom categories to our audios.
```js
var myFX = PIXI.audioManager.getAudio('myAudio1');
myFX.fx = true;
var myFX2 = PIXI.audioManager.getAudio('myAudio2');
myFX2.fx = true;

//filter
var myFXAudios = PIXI.audioManager.filterAudios('fx');
for(var i = 0; i < myFXAudios.length; i++)myFXAudios[i].stop();
```

## api
### AudioManager
#### constructor()
The constructor
#### .getAudio( name )
Return a new instance of your sound (previously loaded).
#### .removeAudio( audio )
Remove the audio (instance) from the .sounds array.
#### .filterAudios( tag [, value] )
Return an array with all the audios matched with the tag and value passed.
#### .mute()
Mute all the sounds in the sounds array.
#### .unmute()
Unmute all the sounds in the sounds array.
#### .pause()
Pause all the sounds in the sounds array.
#### .resume()
Resume all the sounds paused in the sounds array.

### Audio
#### constructor( data, manager )
The constructor, usually you don't create an Audio, just call audioManager.getAudio(name).
#### .manager
The AudioManager instance who manage this audio.
#### .data
The audio source
#### .playing
Read only, it's the state of this sound.
#### .paused
Set true to pause the sound and false to resume.
#### .loop
Set true if you want to play the sound in a loop.
#### .volume
The sound volume.
#### .muted
Set true if you want to mute the sound, or false if you want unmute.
#### .play()
Start playing the audio.
#### .stop()
Stop playing the audio.
#### .remove()
Remove this audio instance from the AudioManager
