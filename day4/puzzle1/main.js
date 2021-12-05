function diff(nums, board) {
	var di = board.filter(v => !nums.includes(v));
	var sum = di.reduce((acc, v) => acc += parseInt(v), 0);
	console.log(`board: ${board}, nums: ${nums}, diff: ${di}, sum: ${sum}, result: ${sum * parseInt(nums[nums.length - 1])}`)
}

function columns(nums, board) {
	for (let i = 0; i < 5; i++) {
		var column = [board[i], board[i+5], board[i+10], board[i+15], board[i+20]]
		if(column.every(v => nums.includes(v))) {
			diff(nums, board);
			return true;
		}
	}
	return false;
}

function rows(nums, board) {
	for (let i = 0; i < 25; i+=5) {
		var row = board.slice(i, i+5);
		if(row.every(v => nums.includes(v))) {
			diff(nums, board);
			return true;
		}
	}
	return false;
}

function main(nums, brds) {
	var numbers = nums.trim().split(",");
	var boards = brds.split("\n\n").map(b => b.trim().split(/\s+/))
	var boards = boards.map(b => [b, 0])
	var found = false;
	for(var i = 1; i < numbers.length && !found; i++) {
		for(var board of boards) {
			if(board[1] == 1) continue;
			if((columns(numbers.slice(0, i), board[0]) || rows(numbers.slice(0, i), board[0]))) {
				var count = boards.filter(b => b[1] == 1).length;
				if(count == boards.length - 1) {
					console.log(`last: ${board[0]}`)
					diff(numbers.slice(0, i), board[0])
					found = true;
					break;
				}
				board[1] = 1;
			}
		}
		console.log(`count: ${count}/${boards.length}`);
	}
}

function main1(nums, brds) {
	var numbers = nums.trim().split(",");
	var boards = brds.split("\n\n").map(b => b.trim().split(/\s+/))
	var found = false;
	for(var i = 1; i < numbers.length && !found; i++) {
		for(var board of boards) {
			if(columns(numbers.slice(0, i), board) || rows(numbers.slice(0, i), board)) {
				found = true;
				break;
			}
		}
	}
}