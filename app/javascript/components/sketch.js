import p5 from 'p5';

const initP5 = () => {
  let x = 0;
  let y = 0;

  const sketch = (s) => {
    s.setup = () => {
      // The background image must be the same size as the parameters
      // into the createCanvas() method. In this program, the size of
      // the image is 720x400 pixels.
      const canvas = s.createCanvas(800, 600);

      const map = s.createDiv();
      map.addClass('map pixel-art');
      map.style("background-image: url(/map.png)");
      map.parent("sketch")
      map.id('map')

      const character = s.createDiv();
      character.addClass('character')
      character.id('character')
      character.parent("sketch")
      character.position(415,300)

      const characterSprite = s.createDiv();
      characterSprite.addClass('pixel-art character-sprite character-down');
      characterSprite.style("background-image: url(/cat-sprite.png)");
      characterSprite.parent("character")

    }

    s.draw = () => {
      const map = s.select('#map');
      if (s.keyIsDown(s.LEFT_ARROW)) {
        x += 2;
      }

      if (s.keyIsDown(s.RIGHT_ARROW)) {
        x -= 2;
      }

      if (s.keyIsDown(s.UP_ARROW)) {
        y += 2;
      }

      if (s.keyIsDown(s.DOWN_ARROW)) {
        y -= 2;
      }
      s.clear();
      map.position(x,y);
    }



  }

  new p5(sketch);
}

export { initP5 };
