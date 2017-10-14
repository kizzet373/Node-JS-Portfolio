var angle, 
	slider,
	button,
	img;

function setup() {
	createCanvas(1400,725);
	slider = createSlider(0,PI,PI/8, 0.002);
	slider.style('width', '200px');
	button = createButton('redraw');
	button.mousePressed(createTree);
	document.querySelector("body input[type]").addEventListener("input", createTree);
	createTree();
	noLoop();
}

function createTree()
{
	background(50,100,255);
	angle = slider.value();
	push();
	translate(width / 2, height);
	stroke(55, 35, 15);
	branch(140);
	pop();
}

function branch(length) {	
	strokeWeight(length/4);
	line(0, 0, 0, -length);
	translate(0, -length);
		
	if(length > 4){
		push();
		rotate(angle * ((Math.random() / 2) + 1));
		branch(length * ((Math.random() / 3) + .55));
		pop();
		push();
		rotate(-angle * ((Math.random() / 2) + 1));
		branch(length * ((Math.random() / 3) + .55));
		pop()
	}
	else if(length > 3)
	{
		push();
		rotate(angle * ((Math.random() / 2) + 1));
		makeLeaf(length * ((Math.random() / 2.5) + 1.50));
		pop();
		push();
		rotate(-angle * ((Math.random() / 2) + 1));
		makeLeaf(length * ((Math.random() / 2.5) + 1.50));
		pop()
	}
}

function makeLeaf(length)
{
	stroke(100 * (Math.random() * 3 + .50), 130 * (Math.random() * 1.2 + .75), 0);
	strokeWeight(3);
	line(0, 0, 0, -length);
	translate(0, -length);
}

/*var angle, 
	slider,
	button,
	img;

function setup() {
	createCanvas(1400,725);
	slider = createSlider(0,PI,PI/8, 0.002);
	slider.style('width', '200px');
	button = createButton('redraw');
	button.mousePressed(redraw);
	document.querySelector("body input[type]").addEventListener("input", redraw);
	noLoop();
}

function draw() {
	background(50,100,255);
	angle = slider.value();
	translate(width / 2, height);
	stroke(55, 40, 15);
	branch(140);
	frameRate(0);
}

function branch(length) {	
	strokeWeight(length/4);
	line(0, 0, 0, -length);
	translate(0, -length);
		
	if(length > 4){
		push();
		rotate(angle * ((Math.random() / 2) + 1));
		branch(length * ((Math.random() / 3) + .55));
		pop();
		push();
		rotate(-angle * ((Math.random() / 2) + 1));
		branch(length * ((Math.random() / 3) + .55));
		pop()
	}
	else if(length > 3)
	{
		push();
		rotate(angle * ((Math.random() / 2) + 1));
		makeLeaf(length * ((Math.random() / 2.5) + 1.50));
		pop();
		push();
		rotate(-angle * ((Math.random() / 2) + 1));
		makeLeaf(length * ((Math.random() / 2.5) + 1.50));
		pop()
	}
}

function makeLeaf(length)
{
	stroke(100 * (Math.random() * 3 + .50), 130 * (Math.random() * 1.2 + .75), 0);
	strokeWeight(3);
	line(0, 0, 0, -length);
	translate(0, -length);
}*/