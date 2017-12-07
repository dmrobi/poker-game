import Table from 'components/Table';

class Lobby extends Phaser.State {
	
	create(){
		console.log("State - Lobby");

		//Start and Configure kinetic scroll plugin
		this.game.kineticScrolling.start();
		this.game.kineticScrolling.configure({
			kineticMovement: true,
			timeConstantScroll: 325, //really minic iOS
			horizontalScroll: false,
			verticalScroll: true,
			horizontalWheel: false,
			verticalWheel: true,
			deltaWheel: 40
		});

		//Load the json data into the game
		this.tablesData = this.cache.getJSON('tablesData');

		//Create table group to hold all the table rows
		this.table = this.add.group();

		//Draw table with Table component
		this.lobbyTable = new Table;
		this.lobbyTable.draw(this, this.tablesData);

		//Header and Footer
		this.header = this.add.sprite(0, 0, "header");
		this.footer = this.add.sprite(0, this.game.height-315, "footer");

		//Adjust table position
		this.table.x = 50;
		this.table.y = this.header.height + 50;

		//Change game size implement scroll effect
		this.world.resize(window.innerWidth, this.table.height + this.header.height + this.footer.height + 100);

		//Make some object fixed to camera or non movable
		this.header.fixedToCamera = true;
		this.footer.fixedToCamera = true;
	}

}

export default Lobby;
