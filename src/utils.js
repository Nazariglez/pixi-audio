let isHTMLAudioSupported = !!window.audio,
  webAudioContext = window.AudioContext || window.webkitAudioContext,
  isWebAudioSupported = !!webAudioContext,
  isAudioSupported = isWebAudioSupported || isHTMLAudioSupported,
  isMp3Supported = false,
  isOggSupported = false,
  isWavSupported = false,
  isM4aSupported = false,
  globalWebAudioContext = isWebAudioSupported ? new webAudioContext() : null;

if(isAudioSupported){
  let audio = document.createElement("audio");
  isMp3Supported = audio.canPlayType('audio/mpeg;') !== "";
  isOggSupported = audio.canPlayType('audio/ogg; codecs="vorbis"') !== "";
  isWavSupported = audio.canPlayType('audio/wav') !== "";
  isM4aSupported = audio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !== "";
}

export default {
  isHTMLAudioSupported : isHTMLAudioSupported,
  webAudioContext : webAudioContext,
  isWebAudioSupported : isWebAudioSupported,
  isAudioSupported : isAudioSupported,
  isMp3Supported : isMp3Supported,
  isOggSupported : isOggSupported,
  isWavSupported : isWavSupported,
  isM4aSupported : isM4aSupported,
  globalWebAudioContext : globalWebAudioContext
};
