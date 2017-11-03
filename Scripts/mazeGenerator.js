var columnCount, 
	rowCount,
	currentCell,
	nextCell,
	isDeadEnd = false,
	w = 40,
	isMazeGenerated = false,
	direction = "right",
	isLightOn = true,
	lightSourceLength = 3;
	grid = [],
	cellWalls = [],
	stack = [];


function setup(){
	createCanvas(1400,680);
	columnCount = floor(width/w);
	rowCount = floor(height/w);
	grid = createGrid(rowCount,columnCount);
	cellWalls = createCellWalls(rowCount,columnCount);
	currentCell = grid[0];
	frameRate(20);
}


function draw(){
	//console.log(frameRate());
	background(0);
	
	currentCell.visited = true;
	
	//DRAWING GRID
	for(var cellIndex = 0; cellIndex < grid.length; cellIndex++){
		//if the cell is not hidden, draw the cell
		if(!grid[cellIndex].hidden)
		{
			grid[cellIndex].show();
			
			if(isMazeGenerated) 
			{
				grid[cellIndex].hidden = true;
			}
		}
	}
	
	//Generate the maze
	if(!isMazeGenerated){
		generateMaze();
	}
	
	if(isMazeGenerated){
		checkForBattery();
		unhideLightedCells();
	}
}


//creates an array of Cells
function createGrid(rowCount,columnCount){
	var localGrid = [];
	for(var rowIndex = 0; rowIndex < rowCount; rowIndex++){
		for(var columnIndex = 0; columnIndex < columnCount; columnIndex++){
			var cell = new Cell(rowIndex, columnIndex);
			localGrid.push(cell);
		}
	}
	return localGrid;
}


//creates an array of CellWalls
function createCellWalls(rowCount,columnCount){
	var localCellWallArray = []
	for(var rowIndex = 0; rowIndex < rowCount; rowIndex++){
		for(var columnIndex = 0; columnIndex < columnCount; columnIndex++){
			for(var sideIndex = 0; sideIndex < 4; sideIndex ++){
				var cellWall = new CellWall(rowIndex,columnIndex,sideIndex);
				localCellWallArray.push(cellWall);
			}
		}
	}
	return localCellWallArray;
}


//Generated the entire maze
function generateMaze(){
	//choose a randomly unvisited neighbor
	nextCell = getRandomNeighbor(currentCell);
	
	//if there is an unvisited neighbor, put the current cell on the stack and move from current cell to that neighbor
	if(nextCell){
		stack.push(currentCell);
		removeWalls(currentCell, nextCell);
		currentCell = nextCell;
		isDeadEnd = false;
	}
	//if there is no unvisited neighbors to the current cell, and the stack is fruitful, pop the last cell off the stack
	else if (stack.length > 0){
		
		//chance to spawn a battery
		if(!isDeadEnd){
			isDeadEnd = true;
			if(Math.random()<.20)
				currentCell.isBattery = true;
		}
		currentCell = stack.pop();
	}
	else{
		isMazeGenerated = true;
	}
}


//Get index in grid from a row and a column
function getCellIndex(row,column){
	if(row <= rowCount-1 && row >= 0 && column <= columnCount-1 && column >= 0)
		return column + row * columnCount;
	else
		return -1;
}


//show specific cells depending on the direction you are facing
function unhideLightedCells(){
	var lightedCellIndex;
	
	for(var i = 0; i < lightSourceLength; i++){
		for(var j = 0; j < lightSourceLength; j++){
			switch(direction){
				case "up":
					lightedCellIndex = getCellIndex(currentCell.row-i,currentCell.column+j-floor(lightSourceLength/2));
					if(grid[lightedCellIndex])
						grid[lightedCellIndex].hidden = false;
					break;
				case "right":
					lightedCellIndex = getCellIndex(currentCell.row-j+floor(lightSourceLength/2),currentCell.column+i);
					if(grid[lightedCellIndex])
						grid[lightedCellIndex].hidden = false;
					break;
				case "down":
					lightedCellIndex = getCellIndex(currentCell.row+i,currentCell.column+j-floor(lightSourceLength/2));
					if(grid[lightedCellIndex])
						grid[lightedCellIndex].hidden = false;
					break;
				case "left":
					lightedCellIndex = getCellIndex(currentCell.row-j+floor(lightSourceLength/2),currentCell.column-i);
					if(grid[lightedCellIndex])
						grid[lightedCellIndex].hidden = false;
					break;
			}
		}
	}
}


//Moving Cells in the Maze after Maze Generation
function keyPressed(){
	if(isMazeGenerated){
		var index;
		
		switch(keyCode){
			case UP_ARROW:
				index = getCellIndex(currentCell.row-1,currentCell.column);
				if(grid[index] && cellWalls[getCellIndex(currentCell.row,currentCell.column)*4].hidden){
					direction = "up";
					currentCell = grid[index];
				}
				break;
			case RIGHT_ARROW:
				index = getCellIndex(currentCell.row,currentCell.column+1);
				if(grid[index] && cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+1].hidden){
					direction = "right";
					currentCell = grid[index];
				}
				break;
			case DOWN_ARROW:
				index = getCellIndex(currentCell.row+1,currentCell.column);
				if(grid[index] && cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+2].hidden){
					direction = "down";
					currentCell = grid[index];
				}
				break;
			case LEFT_ARROW:
				index = getCellIndex(currentCell.row,currentCell.column-1);
				if(grid[index] && cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+3].hidden){
					direction = "left";
					currentCell = grid[index];
				}
				break;
		}
	}
}


//Check if the Current Cell is a battery
function checkForBattery(){
	if(currentCell.isBattery)
	{
		lightSourceLength++;
		currentCell.isBattery = false;
	}
}


//removes walls depending where the current and next cell are.
function removeWalls(currentCell, nextCell) {
	if(nextCell.row < currentCell.row){
		cellWalls[getCellIndex(nextCell.row,nextCell.column)*4+2].hidden = true;
		cellWalls[getCellIndex(currentCell.row,currentCell.column)*4].hidden = true;
	}
	if(nextCell.column > currentCell.column){
		cellWalls[getCellIndex(nextCell.row,nextCell.column)*4+3].hidden = true;
		cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+1].hidden = true;
	}
	if(nextCell.row > currentCell.row){
		cellWalls[getCellIndex(nextCell.row,nextCell.column)*4].hidden = true;
		cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+2].hidden = true;
	}
	if(nextCell.column < currentCell.column){
		cellWalls[getCellIndex(nextCell.row,nextCell.column)*4+1].hidden = true;
		cellWalls[getCellIndex(currentCell.row,currentCell.column)*4+3].hidden = true;
	}
}


//randomly chooses an unvisited neighbor of the current cell.
function getRandomNeighbor(currentCell) {
	var row = currentCell.row;
	var column = currentCell.column;
	var unvisitedNeighbors = [];
	
	//loops through each wall to check that wall's adjacent neighbor.
	for(var side = 0; side < 4; side++){
		switch(side){
			case 0:
				var top = grid[getCellIndex(row+1,column)];
				if(top && !top.visited)
					unvisitedNeighbors.push(top);
				break;
			case 1:
				var right = grid[getCellIndex(row,column+1)];
				if(right && !right.visited)
					unvisitedNeighbors.push(right);
				break;
			case 2:
				var bottom = grid[getCellIndex(row-1,column)];
				if(bottom && !bottom.visited)
					unvisitedNeighbors.push(bottom);
				break;
			case 3:
				var left = grid[getCellIndex(row,column-1)];
				if(left && !left.visited)
					unvisitedNeighbors.push(left);
				break;
		}
	}
	
	if(unvisitedNeighbors.length > 0)
		return unvisitedNeighbors[floor(Math.random()*unvisitedNeighbors.length)];
	else
		return undefined;
}




//Cell Wall Object
function CellWall(row,column,side){
	this.row = row;
	this.column = column;
	this.side = side;
	this.hidden = false;
}




//Cell Object
function Cell(row,column){
	this.row = row;
	this.column = column;
	this.hidden = false;
	this.visited = false;
	this.index = getCellIndex(this.row,this.column);
	this.isBattery = false;
	
	
	//Draws the Cell
	this.show = function() {
		var x = column * w;
		var y = row * w;
		
		//makes the current cell a lighter color
		if(this == currentCell){
			push();
			strokeWeight(1);
			stroke(20,20,20);
			fill(0,100,100);
			rect(x,y,w,w);
			pop();
		}
		//makes battery cells yellow
		else if(this.isBattery){
			push();
			strokeWeight(1);
			stroke(20,20,20);
			fill(200,200,0);
			rect(x,y,w,w);
			pop();
		}
		//makes visited cells light gray
		else if(this.visited){
			push();
			strokeWeight(1);
			stroke(20,20,20);
			fill(100,100,100);
			rect(x,y,w,w);
			pop();
		}
		
		//if a sidewall is not hidden, draw it
		push();
		stroke(20);
		strokeWeight(4);		
		if(!cellWalls[this.index*4].hidden)
			line(x,y,x+w,y);
		if(!cellWalls[this.index*4+1].hidden)
			line(x+w,y,x+w,y+w);
		if(!cellWalls[this.index*4+2].hidden)
			line(x+w,y+w,x,y+w);
		if(!cellWalls[this.index*4+3].hidden)
			line(x,y+w,x,y);
		pop();
	}
}