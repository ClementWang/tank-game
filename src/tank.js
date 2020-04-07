import { canvas, context } from './canvas';
import { Fly, EnemyFly, DIRECTION, enemyFlyMoveHandler } from './fly';
import { Background } from './background';
import { bulletMovehandler } from './bullet';

export class Tank {

  constructor() {
    this.background = new Background();
    this.myfly = new Fly(canvas.width / 2, canvas.height - 20);
  }

  drawEnemyFly(num) {
    for (let i = 0; i < num; i++) {
      const x = Math.floor(Math.random() * canvas.width);
      const size = Math.floor(Math.random() * 10) + 10;
      const fly = new EnemyFly(x, 30, size);
      fly.draw(context);
    }
  }

  reDraw() {
    this.background.draw();
    this.myfly.draw();
  }

  run() {
    // draw background
    this.background.draw();
    // draw my fly
    this.myfly.draw();
    // draw enemy fly
    this.drawEnemyFly(10);

    // add listener
    bulletMovehandler.draw(() => this.reDraw());
    enemyFlyMoveHandler.draw(() => this.reDraw());

    document.onkeydown = e => {
      switch (e.code) {
        case 'ArrowLeft':
          this.myfly.move(DIRECTION.left);
          break;
        case 'ArrowRight':
          this.myfly.move(DIRECTION.right);
          break;
        case 'ArrowUp':
          this.myfly.move(DIRECTION.up);
          break;
        case 'ArrowDown':
          this.myfly.move(DIRECTION.down);
          break;
        case 'KeyJ':
          this.myfly.shot();
          break;
        default:
          console.log('default...');
      }
      this.reDraw();
    }
  }
}