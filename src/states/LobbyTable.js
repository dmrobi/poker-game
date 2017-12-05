
class LobbyTable extends Phaser.State {
	
	create(){
		console.log("LobbyTable");

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

		//Create table rows from json data and insert into table group
		for(let id in this.tablesData){
			let playerStatus = this.tablesData[id].playersJoined * 100 / this.tablesData[id].playersLimit;
			let playerStatusRad = this.game.math.floorTo(playerStatus / 100 * 360);

			this['tableRow'+id] = this.add.group();
			let name = this.add.bitmapText(0, 0, 'custom-font', this.tablesData[id].name, 54);
			let buyIn = this.add.bitmapText(0, 75, 'custom-font', "Buy-In: " + this.tablesData[id].buyInMin + "/" + this.tablesData[id].buyInMin, 32);
			let players = this.add.bitmapText(this.game.width - 450, 30, 'custom-font', this.tablesData[id].playersJoined + "/" + this.tablesData[id].playersLimit, 48);
			let stakes = this.add.bitmapText(this.game.width - 300, 30, 'custom-font', this.tablesData[id].stakesMin + "/" + this.tablesData[id].stakesMin, 48);

			//Draw Pie Circle for players status
			this['circle'+id] = this.add.graphics(this.game.width - 420, 50);
			this['circle'+id].beginFill(0x00FF00, 1);
			this['circle'+id].drawCircle(0, 0, 100);
			this['circle'+id].endFill();

			this['pieCircle'+id] = this.add.graphics(this.game.width - 420, 50);
		    this['pieCircle'+id].beginFill(0xFF0000, 1);
		    this['pieCircle'+id].arc(0, 0, 60, this.game.math.degToRad(playerStatusRad), this.game.math.degToRad(360-playerStatusRad), true);
		    //this['pieCircle'+id].endFill();
		    
		    //Adding all the column/data into table row
			this['tableRow'+id].add(name);
			this['tableRow'+id].add(buyIn);
			this['tableRow'+id].add(this['pieCircle'+id]);
			this['tableRow'+id].add(this['circle'+id]);
			this['tableRow'+id].add(players);
			this['tableRow'+id].add(stakes);
			this['tableRow'+id].y = 160 * id;

			//Adding newly created table row into table group
			this.table.add(this['tableRow'+id]);
			this['tableRow'+id] = undefined;
		}

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

export default LobbyTable;
