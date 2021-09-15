import * as PIXI from "pixi.js"

const lifeTime = 500;

class Particle {
	size = 6;
	r = 255;
	g = 255;
	b = 128;
	a = 1;
	x: number;
	y: number;
	t = Math.random() * lifeTime;
	vx: number;
	vy: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.vx = Math.random() * 1 - 0.5;
		this.vy = -(2 + Math.random() * 2);
	}
}

export default function startFire() {
	const app = new PIXI.Application({
		resizeTo: window,
		autoDensity: true,
		resolution: window.devicePixelRatio,
		antialias: true,
		transparent: false,
		autoStart: true
	});

	document.body.appendChild(app.view);

	const particleNum = 10;
	const particles: Particle[] = [];

	const graphics = new PIXI.Graphics();

	app.stage.addChild(graphics);

	for (let i = 0; i < particleNum; i++) {
		particles.push(new Particle(window.innerWidth * 0.5, window.innerHeight * 0.7))
	}

	app.ticker.add(() => {
		graphics.clear();

		const speed = 0.8;

		const q = app.ticker.elapsedMS / 16 * speed;

		particles.forEach((p, i) => {
			p.size += 0.3 * q;
			p.x += p.vx * q;
			p.y += p.vy * q;
			p.g = Math.max(0, p.g - 8 * q);
			p.b = Math.max(0, p.b - 8 * q);
			p.a -= 0.02 * q;
			p.t += (0.5 + Math.random()) * app.ticker.elapsedMS * speed;

			if (p.t > 500 ) {
				particles[i] = new Particle(window.innerWidth * 0.5, window.innerHeight * 0.7);
			}

			graphics.beginFill(PIXI.utils.rgb2hex([p.r / 255, p.g / 255, p.b / 255]), p.a);
			graphics.drawCircle(p.x, p.y, p.size);
		});
	});
}