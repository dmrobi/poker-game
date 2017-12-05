class Boot extends Phaser.State {
	init(){
		this.stage.backgroundColor = "#FFFFFF";
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize = false;

		//Initialize kinetic scroll plugin
		this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
	}

	create(){
		console.log("Boot");
		this.state.start('Preload');
	}

}

export default Boot;
