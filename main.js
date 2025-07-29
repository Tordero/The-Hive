const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 1000,
  backgroundColor: '#1d1d1d',
  scene: {
    create,
  }
};

const game = new Phaser.Game(config);

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;
const HEX_SIZE = 32;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;
const HEX_HORIZ_SPACING = HEX_WIDTH;
const HEX_VERT_SPACING = HEX_HEIGHT * 0.75;

let board = [];

function drawHexagon(graphics, x, y, radius, color = 0x00ff00) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = Phaser.Math.DegToRad(60 * i - 30);
    points.push({
      x: x + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle),
    });
  }

  graphics.lineStyle(1, color, 1);
  graphics.beginPath();
  graphics.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < 6; i++) {
    graphics.lineTo(points[i].x, points[i].y);
  }
  graphics.closePath();
  graphics.strokePath();
}

function create() {
  const graphics = this.add.graphics();
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_WIDTH; col++) {
      const x = col * HEX_HORIZ_SPACING + (row % 2) * (HEX_HORIZ_SPACING / 2);
      const y = row * HEX_VERT_SPACING;

      drawHexagon(graphics, x, y, HEX_SIZE);

      // Creamos una casilla lógica para cada hexágono
      board[row][col] = {
        x,
        y,
        row,
        col,
        contenido: null
      };
    }
  }
}
