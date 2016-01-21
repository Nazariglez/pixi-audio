!function(e){function t(o){if(i[o])return i[o].exports;var u=i[o]={exports:{},id:o,loaded:!1};return e[o].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){e.exports=i(6)},function(e,t,i){"use strict";function o(e){s?u.loaders.Resource.setExtensionXhrType(e,u.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER):u.loaders.Resource.setExtensionLoadType(e,u.loaders.Resource.LOAD_TYPE.AUDIO)}Object.defineProperty(t,"__esModule",{value:!0});var u=i(2),a=!!window.Audio,n=window.AudioContext||window.webkitAudioContext,s=!!n,r=s||a,d=!1,l=!1,f=!1,c=!1,p=null,h=s?new n:null;if(r){var m=document.createElement("audio");d=""!==m.canPlayType("audio/mpeg;"),l=""!==m.canPlayType('audio/ogg; codecs="vorbis"'),f=""!==m.canPlayType("audio/wav"),c=""!==m.canPlayType('audio/mp4; codecs="mp4a.40.5"'),d&&o("mp3"),l&&o("ogg"),f&&o("wav"),c&&o("m4a"),s&&(p=function(e){return e.createGain?e.createGain():e.createGainNode()})}t["default"]={isHTMLAudioSupported:a,webAudioContext:n,isWebAudioSupported:s,isAudioSupported:r,isMp3Supported:d,isOggSupported:l,isWavSupported:f,isM4aSupported:c,globalWebAudioContext:h,createGainNode:p}},function(e,t){e.exports=PIXI},function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,i,o){return i&&e(t.prototype,i),o&&e(t,o),t}}();Object.defineProperty(t,"__esModule",{value:!0});var n=i(1),s=o(n),r=i(4),d=o(r),l=function(){function e(){u(this,e),this.enabled=s["default"].isAudioSupported,this.sounds=[],s["default"].isWebAudioSupported&&(this.context=s["default"].globalWebAudioContext,this.gainNode=s["default"].createGainNode(this.context),this.gainNode.connect(this.context.destination))}return a(e,[{key:"getAudio",value:function(t){var i=new d["default"](e.audios[t],this);return this.sounds.push(i),i}},{key:"removeAudio",value:function(e){var t=this.sounds.indexOf(e);-1!==t&&this.sounds.splice(t,1)}},{key:"getFx",value:function(){for(var e=[],t=this.sounds.length,i=0;t>i;i++)this.sounds[i].fx&&e.push(this.sounds[i]);return e}},{key:"getMusic",value:function(){for(var e=[],t=this.sounds.length,i=0;t>i;i++)this.sounds[i].music&&e.push(this.sounds[i]);return e}},{key:"mute",value:function(e){e=e!==!1;for(var t=this.sounds.length,i=0;t>i;i++)this.sounds[i].muted=e}},{key:"unmute",value:function(){return this.mute(!1)}},{key:"pause",value:function(e){e=e!==!1;for(var t=this.sounds.length,i=0;t>i;i++)this.sounds[i].paused=e}},{key:"resume",value:function(){return this.pause(!1)}}]),e}();l.audios={},t["default"]=l},function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,i,o){return i&&e(t.prototype,i),o&&e(t,o),t}}();Object.defineProperty(t,"__esModule",{value:!0});var r=i(2),d=o(r),l=i(1),f=o(l),c=function(e){function t(e,i){u(this,t);var o=a(this,Object.getPrototypeOf(t).call(this));return o._loop=!1,o._paused=!1,o._muted=!1,o._volume=1,o._startTime=0,o._lastPauseTime=0,o._offsetTime=0,o.playing=!1,o._fx=!0,o._music=!1,o.manager=i,o.data=e,f["default"].isWebAudioSupported||(o.audio=new window.Audio,o.audio.addEventListener("ended",o._onEnd.bind(o))),o}return n(t,e),s(t,[{key:"play",value:function(e){return!e&&this.paused||!e&&this.playing?this:(this.playing=!0,this.emit("play"),f["default"].isWebAudioSupported?(this.audio=this.manager.context.createBufferSource(),this.audio.start=this.audio.start||this.audio.noteOn,this.audio.stop=this.audio.stop||this.audio.noteOff,this.audio.buffer=this.data,this.audio.loop=this.loop,this._startTime=this.manager.context.currentTime,this.audio.onended=this._onEnd.bind(this),this.audio.gainNode=f["default"].createGainNode(this.manager.context),this.audio.gainNode.gain.value=this.muted?0:this.volume,this.audio.gainNode.connect(this.manager.gainNode),this.audio.connect(this.audio.gainNode),this.audio.start(0,e?this._lastPauseTime:null)):(this.audio.src=this.data.children[0].src,this.audio.preload="auto",this.audio.volume=this.muted?0:this.volume,this.audio.load(),this.audio.play()),this)}},{key:"stop",value:function(){return this.playing?(f["default"].isWebAudioSupported?this.audio.stop(0):(this.audio.pause(),this.audio.currentTime=0),this.playing=!1,this.emit("stop"),this):this}},{key:"reset",value:function(){this._startTime=0,this._lastPauseTime=0,this._offsetTime=0,f["default"].isWebAudioSupported&&(this.audio=null)}},{key:"remove",value:function(){this.manager.removeAudio(this)}},{key:"_onEnd",value:function(){f["default"].isWebAudioSupported?this.paused||(this.reset(),this.emit("end")):this.loop?(this.audio.currentTime=0,this.audio.play()):(this.reset(),this.emit("end"))}},{key:"paused",get:function(){return this._paused},set:function(e){e!==this._paused&&(e?(f["default"].isWebAudioSupported?(this._offsetTime+=this.manager.context.currentTime-this._startTime,this._lastPauseTime=this._offsetTime%this.audio.buffer.duration,this.audio.stop(0)):this.audio.pause(),this.emit("pause")):(f["default"].isWebAudioSupported?this.play(!0):this.audio.play(),this.emit("resume")),this._paused=e)}},{key:"loop",get:function(){return this._loop},set:function(e){e!==this._loop&&(this._loop=e,f["default"].isWebAudioSupported&&(this.audio.loop=e))}},{key:"volume",get:function(){return this._volume},set:function(e){e!==this._volume&&(f["default"].isWebAudioSupported?this.audio.gainNode.gain.value=this.muted?0:this.volume:this.audio.volume=this.muted?0:this.volume,this._volume=e)}},{key:"fx",get:function(){return this._fx},set:function(e){e!==this._fx&&(this.music=!e,this._fx=e)}},{key:"music",get:function(){return this._music},set:function(e){e!==this._music&&(this.fx=!e,this._music=e)}},{key:"muted",get:function(){return this._muted},set:function(e){e!==this._muted&&(this._muted=e,f["default"].isWebAudioSupported?this.audio.gainNode.gain.value=this._muted?0:this.volume:this.audio.volume=this._muted?0:this.volume)}}]),t}(d["default"].utils.EventEmitter);t["default"]=c},function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function u(){return function(e,t){if(!d["default"].isAudioSupported||!e.data)return t();var i=n(e.url);if(-1===c.indexOf(i)||!s(i))return t();var o=e.name||e.url;return d["default"].isWebAudioSupported?void d["default"].globalWebAudioContext.decodeAudioData(e.data,function(e){f["default"].audios[o]=e,t()}):(f["default"].audios[o]=e.data,t())}}function a(e){for(var t=void 0,i=0;i<e.length;i++){var o=n(e[i]);if(-1===c.indexOf(o))break;if(s(o)){t=e[i];break}}return t}function n(e){return e.split("?").shift().split(".").pop().toLowerCase()}function s(e){var t=!1;switch(e){case"m4a":t=d["default"].isM4aSupported;break;case"mp3":t=d["default"].isMp3Supported;break;case"ogg":t=d["default"].isOggSupported;break;case"wav":t=d["default"].isWavSupported}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.audioParser=u,t.audioUrlParser=a;var r=i(1),d=o(r),l=i(3),f=o(l),c=["m4a","ogg","mp3","wav"]},function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var a=i(2),n=o(a),s=i(1),r=o(s),d=i(3),l=o(d),f=i(5),c={utils:r["default"],AudioManager:l["default"],Audio:Audio,audioParser:f.audioParser};n["default"].AudioManager||!function(){var e=n["default"].loaders.Loader;e.addPixiMiddleware(f.audioParser);var t=e.prototype.add;e.prototype.add=function(e,i,o,a){return"object"===("undefined"==typeof e?"undefined":u(e))&&"[object Array]"===Object.prototype.toString.call(e.url)&&(e.url=(0,f.audioUrlParser)(e.url)),"[object Array]"===Object.prototype.toString.call(i)&&(i=(0,f.audioUrlParser)(i)),t.call(this,e,i,o,a)},n["default"].audio=c,n["default"].loader=new n["default"].loaders.Loader,n["default"].loaders.audioParser=f.audioParser,n["default"].audioManager=new l["default"]}(),t["default"]=c}]);
//# sourceMappingURL=pixi-audio.js.map