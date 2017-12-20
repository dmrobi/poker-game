import Table from 'components/Table'; //Import table component
import PieGraph from 'components/PieGraph';
import FilterTable from 'components/FilterTable';

class Lobby extends Phaser.State {
	
	create(){
		console.log("State - Lobby");

		this.PieGraph = new PieGraph(this.game);
		this.lobbyTable = new Table(this.game);
		this.filter = new FilterTable(this.game, this.lobbyTable);

		//Load the json data into the game
		this.tablesData = this.cache.getJSON('tablesData');
		this.tournaments = this.cache.getJSON('tournaments');

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

		//Configure Table Comonent
		this.lobbyTable.configure({
			width: this.game.width,
			font: 'Roboto',
			fontSize: 18,
			colWidth: [60, 20, 20],
			rowHeight: 60,
			dataKey: ['tournamentName', 'minBuyIn', 'maxBuyIn', 'minPlayers', 'maxPlayers', 'smallBlind', 'bigBlind'],
			smallText: 'buyIn',
			pieCircle: 'players',
			pieGraphClass: this.PieGraph,
			paddingTop: 0,
			paddingRight: 20,
			paddingBottom: 0,
			paddingLeft: 20,
			top: 170
		});

		//Create Table with Tournaments Data.
		this.lobbyTable.create(this.tournaments);


		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 01', 'minBuyIn':100, 'maxBuyIn':500, 'minPlayers':3, 'maxPlayers':9, 'smallBlind':10, 'bigBlind':20});
		}, 2000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 02', 'minBuyIn':1000, 'maxBuyIn':5000, 'minPlayers':1, 'maxPlayers':6, 'smallBlind':50, 'bigBlind':100});
		}, 4000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 03', 'minBuyIn':2000, 'maxBuyIn':20000, 'minPlayers':7, 'maxPlayers':9, 'smallBlind':5, 'bigBlind':10});
		}, 6000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 05', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 8000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 06', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 10000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 07', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 12000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 08', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 14000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 09', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 16000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 10', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 18000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 11', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 20000);

		setTimeout(()=>{
			this.lobbyTable.row({'tournamentName':'Test 12', 'minBuyIn':500, 'maxBuyIn':1000, 'minPlayers':2, 'maxPlayers':6, 'smallBlind':2, 'bigBlind':4});
		}, 22000);

		//this.lobbyTable.row({'tournamentName':'Test 01', 'minBuyIn':100, 'maxBuyIn':500, 'minPlayers':3, 'maxPlayers':9, 'smallBlind':5, 'bigBlind':10});
		// this.lobbyTable.row({id:10, name:'test2', buyIn: "50/300", players:'1/5', stakes:'10/20'});
		// this.lobbyTable.row({id:11, name:'test3', buyIn: "50/300", players:'4/5', stakes:'10/20'});

		//let row = this.lobbyTable.getRowById(10);
		//console.log(row.data);

		//Filter all the rows
		this.filterOptions = {
			minBuyIn: [0, 50, 100],
			//maxBuyIn: [100, 8000],
			//maxPlayers: [2, 6],
			//smallBlind: [10, 5],
			//bigBlind: [20, 10]
		}

		//this.filter.show(this.filterOptions);
		setTimeout(()=>{
			this.lobbyTable.sort("tournamentName");
		}, 24000);

		setTimeout(()=>{
			this.lobbyTable.sort("bigBlind");
		}, 28000);

		setTimeout(()=>{
			this.filter.show(this.filterOptions);
		}, 60000);

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
	}

	update(){
		//Change game size implement scroll effect
		this.world.resize(window.innerWidth, this.lobbyTable.height + this.header.height + this.footer.height + 100);
	}
}

export default Lobby;
