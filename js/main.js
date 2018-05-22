var InfiniteScroller = InfiniteScroller || {};

InfiniteScroller.game = new Phaser.Game(800 , 400, Phaser.CANVAS, '');

InfiniteScroller.game.state.add('Boot', InfiniteScroller.Boot);
InfiniteScroller.game.state.add('Preload', InfiniteScroller.Preload);
InfiniteScroller.game.state.add('Menu', InfiniteScroller.Menu);
InfiniteScroller.game.state.add('Game', InfiniteScroller.Game);

InfiniteScroller.game.state.start('Boot');
