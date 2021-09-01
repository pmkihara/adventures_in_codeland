const character = document.querySelector('.character');
const characterSprite = document.querySelector('.character-sprite');
const map = document.querySelector('.map');
const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

// ---------------------------- Character location -----------------------------
var x = 160;
var y = 160;

// ---------------------------- Character movement -----------------------------
const held_directions = []; // Array of the keys that were pressed (in case the user presses more than one key)
const speed = 0.5; //How many pixels will the position change

/* Direction key state */
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}
const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
}

const placeCharacter = () => {
  const held_direction = held_directions[0];
  if (held_direction) {
    if (held_direction === directions.right) { x += speed; }
    if (held_direction === directions.left) { x -= speed; }
    if (held_direction === directions.down) { y += speed; }
    if (held_direction === directions.up) { y -= speed; }
  }
  // Sets the position of the camera
  const camera_left = pixelSize * 66;
  const camera_top = pixelSize * 42;

  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
  character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
}

//Set up the game loop
const step = () => {
  placeCharacter();
  window.requestAnimationFrame(() => {
    step();
  })
}
step(); //kick off the first step!

// ----------- Animation -----------

document.addEventListener("keydown", (event) => {
  var dir = keys[event.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir)
  }

  // Removes the previous status
  characterSprite.classList.remove("character-down", "character-right", "character-left", "character-up")

  if (event.key === "ArrowDown") {
    characterSprite.classList.add("character-walking", "character-down");
    y += speed;
  }
  if (event.key === "ArrowRight") {
    characterSprite.classList.add("character-walking", "character-right");
    x += speed;
  }
  if (event.key === "ArrowLeft") {
    characterSprite.classList.add("character-walking", "character-left");
    x - + speed;
  }
  if (event.key === "ArrowUp") {
    characterSprite.classList.add("character-walking", "character-up");
    y -= speed;
  }
})

document.addEventListener("keyup", (event) => {
  var dir = keys[event.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    held_directions.splice(index, 1)
  }
  if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp") {
    characterSprite.classList.remove("character-walking");
  }
});
