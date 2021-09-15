import * as PIXI from "pixi.js"

const spriteSize = 128;
const stackMaxHeight = 32;
const cardNum = 144;
const gap = 16;

class Card {
	sprite: PIXI.Sprite;
	origPos: number;
	targetPos: number;
	animT = 0;

	constructor(i: number, texture: PIXI.Texture) {
		this.origPos = i;

		this.sprite = PIXI.Sprite.from(texture);

		this.sprite.y = stackMaxHeight - i * stackMaxHeight / cardNum;

		const ratio = this.sprite.height / this.sprite.width;
		this.sprite.height = ratio * spriteSize;
		this.sprite.width = spriteSize;
	}
}

export default function startCards() {
	const app = new PIXI.Application({
		resizeTo: window,
		autoDensity: true,
		resolution: window.devicePixelRatio,
		antialias: true,
		transparent: false,
		autoStart: false
	});

	const fpsMeter = app.stage.addChild(new PIXI.Text('', {
		fill: 'white'
	}));
	setInterval(() => fpsMeter.text = `FPS: ${app.ticker.FPS.toFixed(0)}`, 500);

	const container = app.stage.addChild(new PIXI.Container());

	const cards: Card[] = new Array(cardNum);

	const loader = PIXI.Loader.shared;
	loader.add('card', 'card.png');
	loader.load((loader, resources) => {
		for (let i = 0; i < cardNum; i++) {
			cards[i] = new Card(i, resources.card.texture);
			container.addChild(cards[i].sprite);
		}

		container.x = window.innerWidth / 2 - spriteSize - gap / 2;
		container.y = window.innerHeight / 2 - cards[0].sprite.height / 2;

		const animationLenghtMS = 2000;

		app.ticker.add(() => {
			cards.forEach(card => {
				if (card.targetPos != null) {
					card.animT += app.ticker.elapsedMS;

					if (card.animT > animationLenghtMS) {
						card.sprite.x = spriteSize + gap;
						card.sprite.y = stackMaxHeight - card.targetPos * stackMaxHeight / cardNum;
					} else {
						const targetX = spriteSize + gap;
						const targetY = stackMaxHeight - card.targetPos * stackMaxHeight / cardNum;

						const origX = 0;
						const origY = stackMaxHeight - card.origPos * stackMaxHeight / cardNum;

						let q = 1 - card.animT / animationLenghtMS;
						q *= q;

						card.sprite.x = q * origX + (1-q) * targetX;
						card.sprite.y = q * origY + (1-q) * targetY;
					}
				}
			})
		})

		let firstStack = cardNum;
		let secondStack = 0;
		const cardMovingFrequencyMS = 1000;

		setInterval(() => {
			if (firstStack > 0) {
				const topCard = cards[firstStack - 1];

				topCard.targetPos = secondStack;

				firstStack--;
				secondStack++;

				container.setChildIndex(topCard.sprite, cardNum - 1);
			}

		}, cardMovingFrequencyMS)

		app.start();
	});

	document.body.appendChild(app.view);
}