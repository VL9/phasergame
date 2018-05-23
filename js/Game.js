var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.Game = function(){};

InfiniteScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {

    this.themeSound = this.game.add.audio('theme1');
    this.themeSound.play();

    var sky = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
		sky.fixedToCamera = true;

    this.clouds = this.game.add.tileSprite(0, this.game.height-this.game.cache.getImage('clouds').height-64, this.game.width, this.game.world.height, 'clouds');
    this.clouds.fixedToCamera = true;

    this.farGrounds = this.game.add.tileSprite(0, this.game.height-this.game.cache.getImage('far-grounds').height-64, this.game.width, this.game.world.height, 'far-grounds');
    this.farGrounds.fixedToCamera = true;

    this.game.world.setBounds(0, 0, 40000, this.game.height);
    this.ground = this.add.tileSprite(0,this.game.height-70,this.game.world.width,70,'ground');

    //create player and walk animation
    this.player = this.game.add.sprite(this.game.width/4, this.game.height-350, 'dude');
    this.player.animations.add('walk');

    // this.generatePlatforms(); ////////////////////////Generate platforms to jump on
    // this.generateBaddies(); TODO
    this.generateStars();

    // this.game.world.bringToTop(this.ground);

    //enable physics on the player and ground
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.ground);

    //player gravity
    this.player.body.gravity.y = 1000;
    this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;

    //so player can walk on ground
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //play the walking animation
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //...or by swiping
    this.swipe = this.game.input.activePointer;

    let score = 0;
		let scoreText;
    this.score = 0;
    this.scoreText = true;
    this.wraps = 0;
    this.wrapping = true;
    this.points = 0;
    this.stop = false;

    // stars = this.game.add.group();
		// 		stars.enableBody = true;
    //
		// 		for (let i = 0; i < 12; i++) {
		// 			let star = stars.create(i * 70, 0, 'star')
		// 			star.body.gravity.y = 1000;
		// 			star.body.bounce.y = 3 + Math.random() * 0.2
		// 		}

        //stats
    var style1 = { font: "20px Arial", fill: "#ff0"};
    var t1 = this.game.add.text(10, 20, "Time:", style1);
    var t2 = this.game.add.text(this.game.width-300, 20, "Points:", style1);
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;
    // this.refreshStats();
    this.pointsText = this.game.add.text(80, 18, "", style1);
    this.pointsText.fixedToCamera = true;
    this.pointsTime = this.game.add.text(80, 18, this.game.time.totalElapsedSeconds(), style1);
    this.pointsTime.fixedToCamera = true;

  },

    update: function()
  {

    // this.themeSound.play(); // y u no play dammit

    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
    this.game.physics.arcade.collide(this.stars, this.ground, this.starBounce, null, this);
    this.game.physics.arcade.collide(this.player, this.stars, this.starHit, null, this);
    this.game.physics.arcade.collide(this.player, this.baddies, this.playerHit, null, this);


    cursors = this.game.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
				this.player.body.velocity.x = -150
				this.player.animations.play('left')
			} else if (cursors.right.isDown) {
				this.player.body.velocity.x = 550
        this.player.animations.play('right')
			} else{
				this.player.body.velocity.x = 350;
				this.player.animations.play('right')
			}

      if (this.swipe.isDown && (this.swipe.positionDown.y > this.swipe.position.y)) {
        this.playerJump();
      }
      else if (this.cursors.up.isDown) {
        this.playerJump();
      }

      if(!this.wrapping && this.player.x < this.game.width) {
        //Not used yet, but may be useful to know how many times we've wrapped
        this.wraps++;

        //We only want to destroy and regenerate once per wrap, so we test with wrapping var
        this.wrapping = true;
        this.stars.destroy();
        this.stars();
        this.baddies.destroy();
        this.generateBaddies();

      }
      else if(this.player.x >= this.game.width) {
        this.wrapping = false;
      }
  },

  playerJump: function() {
    //when the ground is a sprite, we need to test for "touching" instead of "blocked"
    if(this.player.body.touching.down) {
      this.player.body.velocity.y -= 550;
    }
  },

  // playerHit: function(dude, star) {
  //   console.log('test2');
  // }
  // generateBaddies: function() {
  //   this.baddies = this.game.add.group();
  //
  //   //enable physics in them
  //   this.baddies.enableBody = true;
  //
  //   //phaser's random number generator
  //   var numBaddies = this.game.rnd.integerInRange(1, 5)
  //   var baddie;
  //
  //   for (var i = 0; i < numBaddies; i++) {
  //     //add sprite within an area excluding the beginning and ending
  //     //  of the game world so items won't suddenly appear or disappear when wrapping
  //     var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
  //     // baddie = this.baddies.create(x, this.game.height-115, 'baddie');
  //     baddie = this.game.add.sprite(this.game.width/4, this.game.height-350, 'baddie');
  //     baddie.animations.add('fly');
  //     baddie.animations.add('fly', [0,1], true);
  //
  //
  //     //physics properties
  //     baddie.body.velocity.x = this.game.rnd.integerInRange(-20, 0);
  //
  //     baddie.body.immovable = true;
  //     baddie.body.collideWorldBounds = false;
  //   }
  // },

  starHit: function(player, stars) {
    this.themeSound.stop();
    this.game.state.start('Game')
    // this.game.time.state.start(Phaser.Timer.SECOND * 2, gameOver, this);
  },

//   gameOver: function() {
//   this.game.state.start('Game');
// },

  generateStars: function() {
    this.stars = this.game.add.group();

    //enable physics in them
    this.stars.enableBody = true;

    //phaser's random number generator
    var numStars = this.game.rnd.integerInRange(100, 120)
    var star;

    for (var i = 0; i < numStars; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
      var x = this.game.rnd.integerInRange(this.game.width, this.game.world.width - this.game.width);
      star = this.stars.create(x, this.game.height-450, 'star');

      //physics properties
      star.body.velocity.x = this.game.rnd.integerInRange(-100, 0);
      star.body.gravity.y = 300;
      star.body.bounce.y = .9 + Math.random() * 0.2;

      star.body.immovable = false;
      star.body.collideWorldBounds = true;
    }
  },

    render: function()
  {

      //this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
  }
};

console.log('test')
