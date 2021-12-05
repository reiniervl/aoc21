



function main(data) {
	var entries = data.split("\n").map(v => v.trim().match(/([0-9]+),([0-9]+)\s+->\s+([0-9]+),([0-9]+)/))
		.map(m => { return {x1: parseInt(m[1]), y1: parseInt(m[2]), x2: parseInt(m[3]), y2: parseInt(m[4])}; })
		.filter(e => e.x1 == e.x2 || e.y1 == e.y2);
	var max_x = Math.max(...entries.map(o => o.x1).concat(entries.map(o => o.x2))) + 1;
	var max_y = Math.max(...entries.map(o => o.y1).concat(entries.map(o => o.y2))) + 1;
	var points = entries.map(o => o.x1 != o.x2 ? {a: o.x1, b: o.x2, start: o.y1, dir: 'x'} : {a: o.y1, b: o.y2, start: o.x1, dir: 'y'})
		.map(o => o.a > o.b ? {a: o.b, b: o.a, start: o.start, dir: o.dir} : o);
	console.log(points);

	console.log(max_x)
	console.log(max_y)

	var result = new Array(max_x * max_y).fill(0);
	points.forEach(p => {
		if(p.dir == 'x') {
			for(var i = p.a + (p.start * max_y); i <= (p.b + (p.start * max_y)); i++ ) {
				result[i]++;
			}
		} else {
			for(var i = p.a; i <= p.b; i++) {
				result[p.start + (max_y * i)]++;

			}
		}
	});
	for(var i = 0; i < result.length; i += max_x) {
		console.log(result.slice(i, i+max_x));
	}
	var score = result.filter(v => v >= 2).length
	console.log(score);
}
