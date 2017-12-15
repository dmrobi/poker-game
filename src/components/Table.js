/**
 * Phaser Table Plugin
 * @author       Robiul Islam Robi <dmrobi89@gmail.com>
 * @copyright    2017 Robiul Islam Robi
 * @version 1.0.0
 */
export default class Table extends Phaser.Plugin {
	constructor(game) {
		super(game);
		this.game = game;

		//Configure Table
		this.config = {
			width: this.game.width,
			font: 'Arial',
			fontSize: 22,
			colWidth: [0, 0, 0],
			rowHeight: 0,
			dataKey: [],
			smallText: '',
			pieCircle: '',
			pieGraphClass: {},
			paddingTop: 0,
			paddingRight: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			top: 0,
			left: 0
		};

		//Setup table property
		this.width = this.config.width;
		this.height = 0;
		
		//Parent group to hold all the rows.
		this.table = this.game.add.group();
		this.rows = {}; //Rows array to hold all the generated rows.
	}

	/**
    * Create rows as per provided data
    *
    * @method Phaser.Plugin.Table#create
    * @param {object}	[data= object]		- Json data object to be passed in this parameter.
    * @param {number}	[rowHeight= 60]		- Set height for every rows.
    */
	create(data, rowHeight = this.config.rowHeight) {
		//console.log(data.classObj.lobbyDetailsMap);

		let tournaments = data.classObj.lobbyDetailsMap;
		
		for(let key in tournaments){
			if(tournaments[key][0]){
				//let row = this.row(0, this.config.paddingTop + (rowHeight * i), data[i]);
				let row = this.row(tournaments[key][0]);
				//this.height += rowHeight;

				//this.table.add(row);
			}
		}

		this.table.x = this.config.left;
		this.table.y = this.config.top;

		//Return all the reows after creation
		return this.rows = this.table.children;
	}

	/**
    * Create rows as per provided data
    *
    * @method Phaser.Plugin.Table#row
    * @param {number}	[positionX= 50]		- Set x position of the row.
    * @param {number}	[positiony= 400]	- Set y position of the row.
    * @param {object}	[data= object]		- Json data object to be passed in this parameter.
    */
	row(data) {
		let row = this.game.add.group();
		row.data = {};

		//Asign data into row
		for(let key in this.config.dataKey){
			row.data[this.config.dataKey[key]] = data[this.config.dataKey[key]];
		}
		
		this.column(row); //Call column function to create columns with the json data object.
		this.table.add(row);
		this.height = (this.table.children.length * this.config.rowHeight) - this.config.rowHeight;

		row.x = this.config.paddingLeft;
		row.y = ((this.config.rowHeight + this.config.paddingTop) * this.table.children.length) - this.config.rowHeight;

		return row;
	}

	/**
    * Create columns as per provided data
    *
    * @param {group}	[row= group]	- Empty phaser group to hold columns.
    * @param {object}	[data= object]	- Json data object to be passed in this parameter.
    */
	column(row) {
		//Initialize some variable and group.
		let col = this.game.add.group();
		let cells = {};
		let tableWidth = this.game.width - (this.config.paddingLeft + this.config.paddingRight);
		let totalWidthOfColumns = 0;
		
		for(let id = 0; id < this.config.colWidth.length; id++){
			if(id == 0){
				cells[id] = this.game.add.text(0, 0, row.data.tournamentName)
			}else if(id == 1){
				//Add Pie cricle to the column.
				let playerStatusRad = Math.floor((row.data.minPlayers/row.data.maxPlayers) * 360);
				let circle = this.config.pieGraphClass.circle(playerStatusRad, totalWidthOfColumns + 12, 11, 25);
				col.add(circle);

				cells[id] = this.game.add.text(0, 0, row.data.minPlayers + '/' + row.data.maxPlayers)
				cells[id].addColor("#ffF", 0);
			}else if(id == 2){
				cells[id] = this.game.add.text(0, 0, row.data.smallBlind + '/' + row.data.bigBlind)
			}

			cells[id].font = this.config.font;
			cells[id].fontSize = this.config.fontSize;
			cells[id].maxWidth = (tableWidth * this.config.colWidth[id]) / 100; //Defining column width in percentage.

			//Set column position and anchor point for first and rest of the game objects in percentage.
			cells[id].x = totalWidthOfColumns;
			col.add(cells[id]);
			
			//Update total width of collumn
			totalWidthOfColumns += cells[id].maxWidth;
		}

		//Loop through all the item of colWidth mentioned in the configure.
		/*
		for(let id = 0; id < this.config.colWidth.length; id++){
			//Add Pie cricle to the column.
			if(this.config.pieCircle && this.config.pieGraphClass && this.config.dataKey[id] === this.config.pieCircle){
				let players = row.data[this.config.dataKey[id]].split("/");
				let playersJoined = Number(players[0]);
				let playersLimit = Number(players[1]);

				let playerStatusRad = Math.floor((playersJoined/playersLimit) * 360);

				let circle = this.config.pieGraphClass.circle(playerStatusRad, totalWidthOfColumns + 16, 11, 25);
				col.add(circle);
			}

			//cells[id] = this.game.add.bitmapText(0, 0, this.config.font, data[this.config.dataKey[id]], this.config.fontSize);
			cells[id] = this.game.add.text(0, 0, row.data[this.config.dataKey[id]]);
			cells[id].font = this.config.font;
			cells[id].fontSize = this.config.fontSize;
			cells[id].maxWidth = (tableWidth * this.config.colWidth[id]) / 100; //Defining column width in percentage.
			

			//Set column position and anchor point for first and rest of the game objects in percentage.
			cells[id].x = totalWidthOfColumns;
			col.add(cells[id]);
			
			//Update total width of collumn
			totalWidthOfColumns += cells[id].maxWidth;
			
		}
		*/

		//let buyIn = this.game.add.bitmapText(0, 0, this.config.font, "Buy-In: "+data.buyIn, 14);
		let buyIn =  this.game.add.text(0, 0, "Buy-In: " + row.data.minBuyIn + '/' + row.data.maxBuyIn);
		buyIn.font = this.config.font;
		buyIn.fontSize = 14;
		
		buyIn.y = 25;
		col.add(buyIn);

		row.add(col);
	}


	/**
    * Insert new row into table after crating base table or initialize.
    *
    * @method Phaser.Plugin.Table#addNewRow
    * @param {array}	[columnWidth= []]	- Here an object should be passed with column width
    * @param {array}	[gameObject= []]	- Here an object should be passed withy data of every column
    * [columnWidth= []] and [gameObject= []] array should be in same length, because column is generating as per length of clumnWidth
    * and content will inserted to the column with similar order.
    */
	addCustomRow(columnWidth, gameObject){
		// console.log(typeof(gameObject[0]));
		// return;
		//Check column is passed or not.
		if(columnWidth){
			let totalWidthOfColumns = 0; //Increasing this value on every column generation with column width
			let row = this.game.add.group(); //Group hold all the generated columns.

			//Check total length of colum and take individual action for single and multiple column
			if(columnWidth.length == 1){
				row.add(gameObject); //Adding single column into the row group.
				row.y = this.height + this.config.paddingTop; //Set the y position of the row after all existing rows.

				this.table.add(row); //Adding the newwly created row into table group.
			}else{
				let cols = []; //Temp variable to store all the generated columns.
				
				//Loop through all the clumns and insert them into a row to update table.
				for(let i = 0; i < columnWidth.length; i++){
					let cellWidth = (this.config.width * columnWidth[i]) / 100; //Setting individual cell width in percentage.
					cols[i] = this.game.add.group(); //Creating group for every column.
					
					//check the provided data parameter is string or object
					if(typeof(gameObject[i]) === 'object'){
						cols[i].add(gameObject[i]); //Adding every game object in the colum.
					}else{
						let text = this.game.add.bitmapText(0, 0, this.config.font, gameObject[i], this.config.fontSize);
						cols[i].add(text);
					}

					//Set column position and anchor point for first and rest of the game objects in percentage.
					cols[i].x = Math.floor(totalWidthOfColumns + this.config.paddingLeft);
					row.add(cols[i]); //Adding all the columns into the row.
					totalWidthOfColumns += cellWidth; //Update totalWidthOfColumns.
				}

				row.y = this.height + this.config.paddingTop; //Set the row y position after all the existing rows.
				this.table.add(row); //Adding the row into the table
				this.height += this.config.rowHeight; //Update the original table height with new row height.
			}

		}else{
			console.log('[addNewRow]: parameters are not set properly.');
		}
		
	}


	/**
    * Change Default Settings of the table
    *
    * @method Phaser.Plugin.Table#configure
    * @param {Object}	[options] - Object that contain properties to change the behavior of the plugin.
    * @param {string}	[options.font=custom-font]		- Custom font
    * @param {number}	[options.fontSize:54]			- Font size
    * @param {number}	[options.width=this.game.width]	- The width of the table.
    * @param {array}	[options.colWidth=[60, 30, 10]]	- Width of the individual Column in percentage and Sum of the all valus should be 100
    * @param {number}	[options.rowHeight=60]			- Height of individual row.
    * @param {array}	[options.dataKey=['name', 'buyInMin', 'playersJoined']]	- All the keys of json data to show in the table.
    * @param {obj key}	[options.smallText = '']		- This is data object key to add small text under first column.
    * @param {obj key}	[options.pieCircle = '']		- This is data object key to add pie circle.
    * @param {class}	[options.pieGraphClass = {}]	- This is class object to create pie cricle.
    * @param {number}	[options.paddingTop=400]		- Leave empty space Avobe of the table before start drawing.
    * @param {number}	[options.paddingRight=50]		- Leave empty space Right of the table before start drawing.
    * @param {number}	[options.paddingBottom=0]		- Leave empty space Bottom of the table before start drawing.
    * @param {number}	[options.paddingLeft=50]		- Leave empty space Left of the table before start drawing.
    */
    configure (options) {
        if (options) {
            for (let property in options) {
                if (this.config.hasOwnProperty(property)) {
                    this.config[property] = options[property];
                }
            }
        }
    }

    getRowById(id){
    	console.log(this.table.children.length);
    	for(let i = 0; i < this.table.children.length; i++){
    		if(this.table.children[i].data.id == id){
    			return this.table.children[i];
    		}
    	}
    }

    /**
	* Update all the rows position after taking any action like hiding rows and deleting any of them.
	*/
	updatePosition(){
		let activeRowCount = 0;
		let tableHeight = 0;
		for(let i = 0; i < this.table.length; i++){
			if(this.table.children[i].visible){
				activeRowCount += 1;
				this.table.children[i].y = (this.config.rowHeight * activeRowCount) - this.config.rowHeight;
			}
		}

		this.height = (activeRowCount * this.config.rowHeight) - this.config.rowHeight;
	}

    /**
    * Get the length of an object
    *
    * @method this.ObjLength()
    * @param {Object}	[object] - Object to get its length.
    */
    objLength(object) {
	    let size = 0, key;
	    for (key in object) {
	        if (object.hasOwnProperty(key)) size++;
	    }
	    return size;
	}
}
