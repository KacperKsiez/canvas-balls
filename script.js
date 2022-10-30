const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

class Circle {
	constructor(x, y, radius, dx, dy, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.dx = dx;
		this.dy = dy;
		this.color = color;

		this.maxRadius = radius * 3;
		this.minRadius = radius / 6;
	}
	draw() {
		c.beginPath();

		c.fillStyle = this.color;

		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

		c.fill();
		c.stroke();
	}
	update() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		if (
			mouse.x - this.x < 60 &&
			mouse.x - this.x > -60 &&
			mouse.y - this.y < 60 &&
			mouse.y - this.y > -60
		) {
			this.radius += 2;
			if (this.radius >= this.maxRadius) {
				this.radius -= 2;
			}
		} else {
			this.radius -= 2;
			if (this.radius <= this.minRadius) {
				this.radius += 2;
			}
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

let circleList = [];

const mouse = {
	x: undefined,
	y: undefined,
};

window.addEventListener("mousemove", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener("mouseout", (event) => {
	mouse.x = undefined;
	mouse.y = undefined;
});

function returnCircle() {
	const colors = ["green", "blue", "red", "cyan", "lime"];

	const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

	const radius = Math.random() * (40 - 12) + 12;

	const x = random(radius * 2, innerWidth - radius * 3);
	const y = random(radius * 2, innerHeight - radius * 3);

	const dx = random(-5, 5);
	const dy = random(-5, 5);

	const color = colors[random(0, colors.length)];

	const circle = new Circle(x, y, radius, dx, dy, color);
	return circle;
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (const circle of circleList) {
		circle.update();
	}
}

function init() {
	const circlesNumber = (innerWidth * innerHeight) / 1500;

	canvas.height = innerHeight;
	canvas.width = innerWidth;

	circleList = [];
	for (let i = 0; i < circlesNumber; i++) {
		circleList.push(returnCircle());
	}

	console.log(circleList[0].dx);
}
animate();

window.addEventListener("resize", () => {
	init();
});

init();
