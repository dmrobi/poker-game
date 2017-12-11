class Boot extends Phaser.State {
	init(){
		this.stage.backgroundColor = "#FFFFFF";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize = true;

		//Initialize kinetic scroll plugin
		this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
	}

	create(){
		console.log("Boot");
		this.state.start('Preload');
	}

}

export default Boot;
