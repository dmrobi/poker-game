import Table from 'components/Table'; //Import table component

class Lobby extends Phaser.State {
	
	create(){
		console.log("State - Lobby");

		//Load the json data into the game
		this.tablesData = this.cache.getJSON('tablesData');

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

		//Create and Configure Table Comonent
		this.lobbyTable = new Table(this.game);
		this.lobbyTable.configure({
			width: this.game.width,
			colWidth: [60, 30, 10],
			rowHeight: 60,
			dataKey: ['name', 'buyInMin', 'playersJoined'],
			paddingTop: 400,
			paddingRight: 50,
			paddingBottom: 0,
			paddingLeft: 50
		});

		//Create Table with Json Data.
		this.lobbyTable.create(this.tablesData);

		/* Add new seperate row in the same table with different data and columns structure. */
		//Generating New Data
		this.text1 = this.add.bitmapText(0, 0, 'custom-font', "Text 1", 54);
		this.text2 = this.add.bitmapText(0, 0, 'custom-font', "Text 2", 54);
		this.text3 = this.add.bitmapText(0, 0, 'custom-font', "Text 3", 54);
		this.text4 = this.add.bitmapText(0, 0, 'custom-font', "Text 4", 54);
		
		//Create and Insert new Row into the existing table this.lobbyTable;
		this.lobbyTable.addNewRow([25, 25, 25, 25], [this.text1, this.text2, this.text3, this.text4]);

		//Create individual row with different position and data as like parent table data structure.
		let row = this.lobbyTable.row(0, 1100, {name:"Robi", buyInMin:30, playersJoined:6});

		//Simple Header and Footer Image
		this.header = this.add.sprite(0, 0, "header");
		this.footer = this.add.sprite(0, this.game.height-315, "footer");

		//Make some object fixed to camera or non movable
		this.header.fixedToCamera = true;
		this.footer.fixedToCamera = true;

		//Change game size implement scroll effect
		this.world.resize(window.innerWidth, this.lobbyTable.height + this.header.height + this.footer.height + 100);
	}

}

export default Lobby;
