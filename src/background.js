import { context, canvas } from './canvas';

export class Background {

  draw() {
    this.stars = this.stars || this.createStars(500);
    context.fillStyle = '#ffffff';

    for (let i = 0; i < this.stars.length; i++) {
      const x = this.stars[i].x;
      const y = this.stars[i].y;
      const r = this.stars[i].r;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    }
  }

  createStars(num) {
    const w = canvas.width;
    const h = canvas.height;
    const stars = [];
    for (let i = 0; i < num; i++) {
      const x = Math.floor(Math.random() * w);
      const y = Math.floor(Math.random() * h);
      const r = Math.ceil(Math.random() * 4) / 3;
      stars.push({x, y, r})
    }
    return stars;
  }
}