const config = {
type: Phaser.AUTO,
width: 1400,
height: 1000,
backgroundColor: '#1d1d1d',
scene: {
preload,
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

function preload() {
this.load.image('hex', 'assets/hex.png'); // Asegúrate de subir este recurso a tu repositorio
}

function create() {
for (let row = 0; row < BOARD_HEIGHT; row++) {
board[row] = [];
for (let col = 0; col < BOARD_WIDTH; col++) {
const x = col * HEX_HORIZ_SPACING + (row % 2) * (HEX_HORIZ_SPACING / 2);
const y = row * HEX_VERT_SPACING;

const hex = this.add.image(x, y, 'hex').setOrigin(0.5).setInteractive();  
  hex.displayWidth = HEX_WIDTH;  
  hex.displayHeight = HEX_HEIGHT;  

  // Cada casilla es un objeto que puede almacenar "contenido"  
  hex.casilla = {  
    row,  
    col,  
    contenido: null // Aquí pondrás los objetos más adelante  
  };  

  board[row][col] = hex;  
}

}
}
