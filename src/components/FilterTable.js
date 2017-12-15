/**
 * Phaser Filter Plugin
 * @author       Robiul Islam Robi <dmrobi89@gmail.com>
 * @copyright    2017 Robiul Islam Robi
 * @version 1.0.0
 */
export default class FilterTable extends Phaser.Plugin {
	constructor(game, target) {
		super(game);
		this.game = game;
		this.target = target;
		this.table = this.target.table;
		this.rows = this.table.children;
	}

	/**
	* Filter all the rows as per filter keys and data
	* @param {Object}	[data = {}] - A data object to pass all the filter options in the function.
	*/
	show(data){

		for(let i = 0; i < this.rows.length; i++){
			this.rows[i].visible = false;

			//Hide all the rows except those rows are selected by data
			for(let key in data){
				for(let j = 0; j < data[key].length; j++){
					if(this.rows[i].data[key] == data[key][j]){
						this.rows[i].visible = true;
					}
				}
			}
		}

		//Update position to fill the empty space after hiding some rows.
		this.target.updatePosition();
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