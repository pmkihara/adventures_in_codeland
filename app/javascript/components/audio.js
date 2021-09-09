const backgroundAudio = () => {
  const sound = document.getElementById("background_audio");
  const buttonSoundOn = document.getElementById("toggle-sound-on");
  const buttonSoundOff = document.getElementById("toggle-sound-off");
  const buttonStart = document.getElementById("start-audio")

  const startAudio = (event) => {
    sound.volume = 0.2;
    sound.play();
  }

  const pauseAudio = (event) => {
    sound.pause();
  }

  buttonSoundOn.addEventListener("click", startAudio);
  buttonSoundOff.addEventListener("click", pauseAudio);
  buttonStart.addEventListener("click", startAudio);

  sound.addEventListener("ended", startAudio);
}

export { backgroundAudio }
