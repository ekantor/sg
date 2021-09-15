import * as PIXI from "pixi.js"

const app = new PIXI.Application({
	resizeTo: window,
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
	transparent: false,
	autoStart: false
});

export default function startText() {
	const loader = PIXI.Loader.shared;
	loader.add('card', 'card.png');
	loader.load((loader, resources) => {
		render(resources.card.texture);
		app.start();
	});

	function render(texture: PIXI.Texture) {
		app.stage.removeChildren();

		const itemNum = 3;

		let lastX = 0;
		const size = 16 + 32 * Math.random();
		const spacing = size * 0.2;

		const container = app.stage.addChild(new PIXI.Container());

		for (let i = 0; i < itemNum; i++) {
			if (Math.random() < 0.5) {
				const sprite = PIXI.Sprite.from(texture);

				const ratio = sprite.width / sprite.height;
				sprite.width = ratio * size;
				sprite.height = size;

				container.addChild(sprite);

				sprite.x = lastX;
				lastX += sprite.width + spacing;
			} else {
				const str = String(Math.round(Math.random() * 1000000));
				const text = new PIXI.Text(str, {
					fill: 'white',
					fontSize: size
				})
				container.addChild(text);

				text.x = lastX;
				lastX += text.width + spacing;
			}
		}

		container.x = window.innerWidth / 2 - lastX / 2;
		container.y = window.innerHeight / 2 - size / 2;

		const updateFrequencyMS = 2000;
		setTimeout(() => render(texture), updateFrequencyMS);
	}

	document.body.appendChild(app.view);
}

