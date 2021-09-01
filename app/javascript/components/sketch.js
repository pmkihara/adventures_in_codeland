import p5 from 'p5';

const initP5 = () => {
  const sketch = (s) => {
    s.setup = () => {
      // The background image must be the same size as the parameters
      // into the createCanvas() method. In this program, the size of
      // the image is 720x400 pixels.
      const canvas = s.createCanvas(500, 500);

      const map = s.createDiv();
      map.addClass('map pixel-art');
      map.style("background-image: url(/assets/map-05df230a8d7156c2802186ddd4486efe0accc75a3a3627c5966b72bcc5f8615c.png)");
      map.parent("sketch")

      const character = s.createDiv();
      character.addClass('character')
      character.id('character')
      character.parent("sketch")
      character.position(415,300)

      const characterSprite = s.createDiv();
      characterSprite.addClass('pixel-art character-sprite character-down');
      characterSprite.style("background-image: url(/assets/cat-sprite-3e3fbf4062b56d456f56c73f3b7d58bcef2b90f8c2d5a6bea565fa64173e1592.png)");
      characterSprite.parent("character")

    }

    s.draw = () => {
    }
  }

  new p5(sketch);
}

export { initP5 };
