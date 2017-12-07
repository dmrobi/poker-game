class Preload extends Phaser.State {
	
	preload() {
		console.log("Preload");

		//Load all the assets
		this.load.image('header', 'assets/sprites/header.jpg');
		this.load.image('footer', 'assets/sprites/footer.jpg');

		//Load json data file
		this.load.json('tablesData', 'assets/data.json');

		//Load Custo fonts
		this.load.bitmapFont('custom-font', 'assets/fonts/custom-font.png', 'assets/fonts/custom-font.fnt');
	}

	create() {
		this.state.start('Lobby');
	}

}

export default Preload;
