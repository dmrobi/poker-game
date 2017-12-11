import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Lobby from 'states/Lobby';

class Game extends Phaser.Game {
	constructor(){
		super("100%", window.innerHeight, Phaser.AUTO, 'game', null, true, true);
		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
        this.state.add('Lobby', Lobby, false);

        this.state.start('Boot');
	}
}

new Game();
