/**
 * Phaser PieGraph Plugin
 * @author       Robiul Islam Robi <dmrobi89@gmail.com>
 * @copyright    2017 Robiul Islam Robi
 * @version 1.0.0
 */
export default class PieGraph extends Phaser.Plugin {
	constructor(game){
		super(game);
		this.game = game;
	}

	/**
    * Create Pie Circle to display status
    *
    * @method Phaser.Plugin.PieGraph#circle
    * @param {number}	[positionX= 0]		- Set x position of the row.
    * @param {number}	[positionY= 0]		- Set y position of the row.
    * @param {number}	[size=50]			- Circle size
    * @param {number}	[radius=235]		- Radius to fill with active status
    */
	circle(radius = 235, x = 0, y = 0, size = 50){
		//Draw Pie circle
		let pieCircle = this.game.add.graphics(x, y);
		pieCircle.beginFill(0x000000, 1);
	    if(radius === 360){
	    	pieCircle.drawCircle(0, 0, size * 2);
	    }else{
	    	pieCircle.arc(0, 0, size, this.game.math.degToRad(radius - 90), this.game.math.degToRad(360 - 90), true);
	    }
	    pieCircle.endFill();
	    pieCircle.anchor.setTo(0.5);

	    //Draw Inner circle
		let innerCircle = this.game.add.graphics(x, y);
		innerCircle.beginFill(0x0093e8, 1);
		innerCircle.drawCircle(0, 0, (size * 2) - ((size * 40)/100));
		innerCircle.endFill();
		innerCircle.anchor.setTo(0.5);

		let circle = this.game.add.group();
		circle.add(pieCircle);
		circle.add(innerCircle);

		return circle;
	}
}