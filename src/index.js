import Boot from 'states/Boot';
import Preload from 'states/Preload';
import LobbyTable from 'states/LobbyTable';

class Game extends Phaser.Game {
	constructor(){
		super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game', null);
		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
        this.state.add('LobbyTable', LobbyTable, false);

        this.state.start('Boot');
	}
}

new Game();
