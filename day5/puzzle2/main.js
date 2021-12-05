function main(data) {
	var entries = data.split("\n").map(v => v.trim().match(/([0-9]+),([0-9]+)\s+->\s+([0-9]+),([0-9]+)/))
		.map(m => { return { x1: parseInt(m[1]), y1: parseInt(m[2]), x2: parseInt(m[3]), y2: parseInt(m[4]) }; })
	var max_x = Math.max(...entries.map(o => o.x1).concat(entries.map(o => o.x2))) + 1;
	var max_y = Math.max(...entries.map(o => o.y1).concat(entries.map(o => o.y2))) + 1;

	var result = new Array(max_x * max_y).fill(0);

	entries.forEach(e => {
		x1 = e.x1
		x2 = e.x2
		y1 = e.y1
		y2 = e.y2

		if (y1 == y2 && x1 != x2) { // horizontal
			// console.log(`horizontal ${x1},${y1} -> ${x2},${y2}`)
			if (x1 < x2) {
				for (var i = x1 + (max_y * y1); i <= x2 + (max_y * y1); i++) {
					result[i]++;
				}
			} else {
				for (var i = x2 + (max_y * y1); i <= x1 + (max_y * y1); i++) {
					result[i]++;
				}
			}
		} else if (x1 == x2 && y1 != y2) { // vertical
			// console.log(`vertical ${x1},${y1} -> ${x2},${y2}`)
			if (y1 < y2) {
				for (var i = y1; i <= y2; i++) {
					result[x1 + (max_y * i)]++;

				}
			} else {
				for (var i = y2; i <= y1; i++) {
					result[x1 + (max_y * i)]++;

				}
			}
		} else { // diagonal
			var x = x1
			var y = y1
			var limit = (y1 < y2 ? y1 : y2)
			
			// console.log(`diagonal ${x1},${y1} -> ${x2},${y2} | ${x}/${y} - ${limit}`)
			for (;;) {
				result[x + (max_y * y)]++;
				if(x1 < x2) x++;
				else x--;
				if(y1 < y2) y++;
				else y--;
				if(x1 < x2 && x > x2) break;
				if(x1 > x2 && x < x2) break;
				// console.log(x + (max_y * y))
			}
		}
	});
	// for (var i = 0; i < result.length; i += max_x) {
	// 	console.log(result.slice(i, i + max_x));
	// }
	var score = result.filter(v => v >= 2).length
	console.log(score);
}
