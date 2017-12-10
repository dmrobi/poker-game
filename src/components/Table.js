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
			colWidth: [0, 0, 0],
			rowHeight: 0,
			dataKey: [],
			paddingTop: 0,
			paddingRight: 0,
			paddingBottom: 0,
			paddingLeft: 0
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
		for(let i in data){
			let row = this.row(0, this.config.paddingTop + (rowHeight * i), data[i]);
			this.height += rowHeight;

			this.table.add(row);
		}

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
	row(positionX, positoinY, data) {
		let row = this.game.add.group();
		
		this.column(row, data); //Call column function to create columns with the json data object.
		
		row.x = positionX;
		row.y = positoinY;

		return row;
	}

	/**
    * Create columns as per provided data
    *
    * @param {group}	[row= group]	- Empty phaser group to hold columns.
    * @param {object}	[data= object]	- Json data object to be passed in this parameter.
    */
	column(row, data) {
		//Initialize some variable and group.
		let col = this.game.add.group();
		let cells = {};
		let tableWidth = this.game.width - (this.config.paddingLeft + this.config.paddingRight);
		let totalWidthOfColumns = 0;
		
		//Loop through all the item of colWidth mentioned in the configure.
		for(let id = 0; id < this.config.colWidth.length; id++){

			//Creating text for every columns by taking data from json data object.
			cells[id] = new Phaser.Text(this.game, 0, 0, data[this.config.dataKey[id]], {
	            font: '48px Verdana',
	            fill: 'black',
	            align: 'left'
	        });

			cells[id].maxWidth = (tableWidth * this.config.colWidth[id]) / 100; //Defining column width in percentage.

			//Set column position and anchor point for first and rest of the game objects in percentage.
			if(id === 0) {
				cells[id].anchor.setTo(0, 0.5);
				cells[id].x = this.config.paddingLeft;
			}else{
				cells[id].anchor.setTo(0.5);
				cells[id].x = Math.floor(totalWidthOfColumns + (cells[id].maxWidth / 2));
			}

			col.add(cells[id]);

			//Update total width of collumn
			totalWidthOfColumns += cells[id].maxWidth;
		}

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
	addNewRow(columnWidth, gameObject){
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
					cols[i].add(gameObject[i]); //Adding every game object in the colum.

					//Set column position and anchor point for first and rest of the game objects in percentage.
					if(i === 0) {
						gameObject[i].anchor.setTo(0, 0.5);
						cols[i].x = this.config.paddingLeft;
					}else{
						gameObject[i].anchor.setTo(0.5);
						cols[i].x = Math.floor(totalWidthOfColumns + (cellWidth / 2));
					}

					row.add(cols[i]); //Adding all the columns into the row.

					totalWidthOfColumns += cellWidth; //Update totalWidthOfColumns.
				}

				row.y = this.height + this.config.paddingTop; //Set the row y position after all the existing rows.
				this.table.add(row); //Adding the row into the table
				this.height += this.config.rowHeight; //Update the original table height with new row height.

				cols = undefined; //Reset the temp cols variable to its original.
			}

		}else{
			console.log('This function received only object as parameter.');
		}
		
	}


	/**
    * Change Default Settings of the table
    *
    * @method Phaser.Plugin.Table#configure
    * @param {Object}	[options] - Object that contain properties to change the behavior of the plugin.
    * @param {number}	[options.width=this.game.width]	- The width of the table.
    * @param {array}	[options.colWidth=[60, 30, 10]]	- Width of the individual Column in percentage and Sum of the all valus should be 100
    * @param {number}	[options.rowHeight=60]			- Height of individual row.
    * @param {array}	[options.dataKey=['name', 'buyInMin', 'playersJoined']]	- All the keys of json data to show in the table.
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

    };

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
