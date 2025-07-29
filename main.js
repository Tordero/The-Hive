const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 1000,
  backgroundColor: '#0f2f0f', // fondo verde oscuro
  scene: {
    preload,
    create,
    update
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  input: {
    activePointers: 3
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
let isDragging = false;
let dragStart = { x: 0, y: 0 };

function preload() {
  this.load.image('hex', 'assets/hex.png');
}

function create() {
  const container = this.add.container(0, 0);
  this.container = container;

  for (let row = 0; row < BOARD_HEIGHT; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_WIDTH; col++) {
      const x = col * HEX_HORIZ_SPACING + (row % 2) * (HEX_HORIZ_SPACING / 2);
      const y = row * HEX_VERT_SPACING;

      const hex = this.add.image(x, y, 'hex').setOrigin(0.5).setInteractive();
      hex.displayWidth = HEX_WIDTH;
      hex.displayHeight = HEX_HEIGHT;

      hex.casilla = {
        row,
        col,
        contenido: null
      };

      container.add(hex);
      board[row][col] = hex;
    }
  }

  // Movimiento y zoom
  const cam = this.cameras.main;

  this.input.on('pointerdown', (pointer) => {
    isDragging = true;
    dragStart.x = pointer.x;
    dragStart.y = pointer.y;
  });

  this.input.on('pointerup', () => {
    isDragging = false;
  });

  this.input.on('pointermove', (pointer) => {
    if (isDragging) {
      cam.scrollX -= (pointer.x - dragStart.x) / cam.zoom;
      cam.scrollY -= (pointer.y - dragStart.y) / cam.zoom;
      dragStart.x = pointer.x;
      dragStart.y = pointer.y;
    }
  });

  this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    const zoomFactor = 0.001;
    cam.zoom -= deltaY * zoomFactor;
    cam.zoom = Phaser.Math.Clamp(cam.zoom, 0.3, 3);
  });

  // Tocar para hacer zoom (en tablet)
  this.input.addPointer(2);
}

function update() {
  // Aquí puedes agregar lógica futura si lo necesitas
}
