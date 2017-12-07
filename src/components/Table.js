class Table extends Phaser.Plugin {
	
	draw(state, data) {
		console.log("LobbyTable - Start");
		for(let id in data){
			state['tableRow'+id] = state.add.group();
			let name = state.add.bitmapText(0, 0, 'custom-font', data[id].name, 54);
			let buyIn = state.add.bitmapText(0, 75, 'custom-font', "Buy-In: " + data[id].buyInMin + "/" + data[id].buyInMin, 32);
			let players = state.add.bitmapText(state.game.width - 450, 30, 'custom-font', data[id].playersJoined + "/" + data[id].playersLimit, 48);
			let stakes = state.add.bitmapText(state.game.width - 300, 30, 'custom-font', data[id].stakesMin + "/" + data[id].stakesMin, 48);

			/************************************************
				Draw Pie Circle to show player joining status
			************************************************/
			let playerStatusRad = Math.ceil((data[id].playersJoined/data[id].playersLimit) * 360);
			//Draw Inner circle
			state['circle'+id] = state.add.graphics(state.game.width - 420, 50);
			state['circle'+id].beginFill(0x00FF00, 1);
			state['circle'+id].drawCircle(0, 0, 100);
			state['circle'+id].endFill();

			//Draw Status circle
			state['pieCircle'+id] = state.add.graphics(state.game.width - 420, 50);
		    state['pieCircle'+id].beginFill(0xFF0000, 1);
		    if(playerStatusRad === 360){
		    	state['pieCircle'+id].drawCircle(0, 0, 120);
		    }else{
		    	state['pieCircle'+id].arc(0, 0, 60, state.game.math.degToRad(playerStatusRad - 90), state.game.math.degToRad(360 - 90), true);
		    }
		    state['pieCircle'+id].endFill();
		    
		    //Adding all the column/data into table row
			state['tableRow'+id].add(name);
			state['tableRow'+id].add(buyIn);
			state['tableRow'+id].add(state['pieCircle'+id]);
			state['tableRow'+id].add(state['circle'+id]);
			state['tableRow'+id].add(players);
			state['tableRow'+id].add(stakes);
			state['tableRow'+id].y = 160 * id;

			//Adding newly created table row into table group
			state.table.add(state['tableRow'+id]);
			state['tableRow'+id] = undefined;
		}
		console.log("LobbyTable - End");
	}
}

export default Table;

/*
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
*/