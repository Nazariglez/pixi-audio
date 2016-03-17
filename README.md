pixi-audio - Under Development
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

In the above example, the audio loaded in chrome will be the __ogg__ and in safari will be the __mp3__. But, you don't need care about this, just need getAudio using the audio name.
