import { context } from './canvas';

export class Bullet {
  constructor(x, y, color = 'red', speed = 5, direction = 1) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
    this.size = 6;
    bulletMovehandler.addBullet(this);
  }

  draw() {
    context.fillStyle = this.color;
    const startX = this.x - this.size / 2;
    context.fillRect(startX, this.y, this.size, this.size);
  }

  clear() {
    const startX = this.x - this.size / 2;
    context.clearRect(startX, this.y, this.size, this.size);
  }
}

class BulletMoveHandler {
  constructor() {
    this.bullets = [];
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  draw(callback) {
    setInterval(() => {
      this.bullets.forEach((j, index) => {
        if (j.y + j.size > 0) {
          j.clear();
          j.y = j.y - j.speed;
          j.draw();
          callback();
        } else {
          this.bullets.splice(index, 1);
        }
      });
    }, 200);
  }
}

export const bulletMovehandler = new BulletMoveHandler();