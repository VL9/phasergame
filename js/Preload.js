var InfiniteScroller = InfiniteScroller || {};

//loading the game assets
InfiniteScroller.Preload = function(){};

InfiniteScroller.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('platform-1', 'assets/platform-1.png');
    this.load.image('platform-2', 'assets/platform-2.png');
    this.load.image('platform-3', 'assets/platform-3.png');
    this.load.audio('theme1', 'assets/theme1.mp3');



  },
  create: function() {
    this.state.start('Game');
  }
};
