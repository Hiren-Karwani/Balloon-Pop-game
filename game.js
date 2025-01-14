// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let balloon;
let pumpButton;
let burstSound;
let pumpSound;

function preload() {
    // Load graphics and sounds
    this.load.image('background', 'Graphics/background.png');
    this.load.image('balloon', 'Graphics/balloon.png');
    this.load.image('pump', 'Graphics/pump.png');
    this.load.audio('burst', 'Graphics/burst.mp3');
    this.load.audio('pump', 'Graphics/pump.mp3');
}

function create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Add pump button
    pumpButton = this.add.sprite(400, 550, 'pump').setInteractive();
    pumpButton.setScale(0.5);

    // Add balloon
    balloon = this.physics.add.sprite(400, 400, 'balloon');
    balloon.setScale(0.5);
    balloon.setInteractive();

    // Load sounds
    burstSound = this.sound.add('burst');
    pumpSound = this.sound.add('pump');

    // Balloon properties
    balloon.body.setCollideWorldBounds(true);
    balloon.body.setBounce(1);

    // Pump button interaction
    pumpButton.on('pointerdown', () => {
        pumpSound.play();
        if (balloon.scale < 1.5) {
            balloon.setScale(balloon.scale + 0.1);
        } else {
            balloon.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        }
    });

    // Balloon burst interaction
    balloon.on('pointerdown', () => {
        burstSound.play();
        balloon.destroy();
        setTimeout(() => resetBalloon(this), 1000);
    });
}

function update() {
    // Game logic (if any)
}

function resetBalloon(scene) {
    // Reset balloon
    balloon = scene.physics.add.sprite(400, 400, 'balloon');
    balloon.setScale(0.5);
    balloon.setInteractive();

    // Reset burst interaction
    balloon.on('pointerdown', () => {
        burstSound.play();
        balloon.destroy();
        setTimeout(() => resetBalloon(scene), 1000);
    });
}
