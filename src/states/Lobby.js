import Table from 'components/Table'; //Import table component
import PieGraph from 'components/PieGraph';

class Lobby extends Phaser.State {
	
	create(){
		console.log("State - Lobby");

		this.PieGraph = new PieGraph(this.game);

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
			font: 'custom-font',
			fontSize: 22,
			colWidth: [50, 25, 25],
			rowHeight: 60,
			dataKey: ['name', 'players', 'stakes'],
			smallText: 'buyIn',
			pieCircle: 'players',
			pieGraphClass: this.PieGraph,
			paddingTop: 0,
			paddingRight: 20,
			paddingBottom: 0,
			paddingLeft: 20,
			top: 170
		});

		//Create Table with Json Data.
		this.lobbyTable.create(this.tablesData);

		/* Add new seperate row in the same table with different data and columns structure. */
		
		/*
		//Generating New Data
		this.text1 = this.add.bitmapText(0, 0, 'custom-font', "Text 1", 22);
		this.text2 = this.add.bitmapText(0, 0, 'custom-font', "Text 2", 22);
		this.text3 = this.add.bitmapText(0, 0, 'custom-font', "Text 3", 22);
		this.text4 = this.add.bitmapText(0, 0, 'custom-font', "Text 4", 22);
		this.header1 = this.add.sprite(0, 0, "header");
		this.header1.width = 200;
		this.header1.height = 50;

		this.lobbyTable.addCustomRow([25, 25, 25, 25], [this.text1, 'Text 2', 'Text 3', this.text4]);
		this.lobbyTable.addCustomRow([25, 25, 25, 25], ['Text 1', 'Text 2', 'Text 3', 'Text 4']);
		this.lobbyTable.addCustomRow([25, 25, 25, 25], ['Text 5', 6, 'Text 7', 'Text 8']);
		this.lobbyTable.addCustomRow([25, 25, 25, 25], [this.header1, 'Text 10', this.text3, 'Text 12']);

		//Create individual row with different position and data as like parent table data structure.
		//let row = this.lobbyTable.row(0, 2000, {name:"Robi", players:"2/8", stakes:"50/100"});
		
		*/

		//Simple Header and Footer Image
		this.header = this.add.sprite(0, 0, "header");
		this.header.width = this.game.width;
		this.header.height = 130;

		this.footer = this.add.sprite(0, this.game.height-130, "footer");
		this.footer.width = this.game.width;
		this.footer.height = 130;

		//Make some object fixed to camera or non movable
		this.header.fixedToCamera = true;
		this.footer.fixedToCamera = true;

		//Change game size implement scroll effect
		this.world.resize(window.innerWidth, this.lobbyTable.height + this.header.height + this.footer.height + 100);

	}

}

export default Lobby;
