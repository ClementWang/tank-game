import { context, canvas } from './canvas';
import { Bullet } from './bullet';

const MY_FLY_COLOR = 'red';
const ENEMY_FLY_COLOR = 'yellow';

export const DIRECTION =  {
  left: 1,
  right: 2,
  up: 3,
  down: 4
}

export class Fly {

  /**
   * @param {number} x 起点x坐标
   * @param {number} y 起点y坐标
   * @param {number} size 大小
   * @param {number} direction 方向, 1-正向, -1反向
   */
  constructor(x, y, size = 15, direction = 1) {
    this.size = size;
    this.direction = direction;
    this.points = [
      {x: x, y: y},
      {x: x - size, y: y + size * direction},
      {x: x + size, y: y + size * direction}
    ];
  }

  draw() {
    const p = this.points;
    context.fillStyle = this.direction > 0 ? MY_FLY_COLOR : ENEMY_FLY_COLOR;
    context.beginPath();
    context.moveTo(p[0].x, p[0].y);
    context.lineTo(p[1].x, p[1].y);
    context.lineTo(p[2].x, p[2].y);
    context.closePath();
    context.fill();
  }

  clear() {
    const p = this.points;
    const minX = Math.min(p[0].x, p[1].x, p[2].x);
    const minY = Math.min(p[0].y, p[1].y, p[2].y);
    const maxX = Math.max(p[0].x, p[1].x, p[2].x);
    const maxY = Math.max(p[0].y, p[1].y, p[2].y);
    context.clearRect(minX, minY, maxX - minX, maxY - minY);
  }

  move(direc, step = 15) {
    this.clear();
    const p = this.points;
    const minX = Math.min(p[0].x, p[1].x, p[2].x);
    const minY = Math.min(p[0].y, p[1].y, p[2].y);
    const maxX = Math.max(p[0].x, p[1].x, p[2].x);
    const maxY = Math.max(p[0].y, p[1].y, p[2].y);

    p.forEach(i => {
      if (direc === DIRECTION.left) {
        i.x = minX - step > 0 ? i.x - step : i.x;
      }
      else if (direc === DIRECTION.right) {
        i.x = maxX + step < canvas.width ? i.x + step : i.x;
      }
      else if (direc === DIRECTION.up) {
        i.y = minY - step > 0 ? i.y - step : i.y;
      }
      else if (direc === DIRECTION.down) {
        i.y = maxY + step < canvas.height ? i.y + step : i.y;
      }
      else {
        console.log('move fly default');
      }
    });
  }

  shot() {
    new Bullet(this.points[0].x, this.points[0].y);
  }
}

export class EnemyFly extends Fly {

  constructor(x, y, size = 15, direction = -1) {
    super(x, y, size, direction);
    this.speed = 10;
    enemyFlyMoveHandler.addFly(this);
  }

  shot() {
    new Bullet(this.points[0].x, this.points[0].y, 'yellow', 4, -1);
  }
}

class EnemyFlyMoveHandler {

  constructor() {
    this.flies = [];
  }

  addFly(fly) {
    this.flies.push(fly);
  }

  draw(callback) {
    setInterval(() => {
      console.log(this.flies.length);
      this.flies.forEach((i, index) => {
        if (i.points[0].y - i.size < canvas.height) {
          i.move(DIRECTION.down);
          i.draw();
          callback();
        } else {
          this.flies.splice(index, 1);
        }
      });
    }, 2000);
  }
}

export const enemyFlyMoveHandler = new EnemyFlyMoveHandler();