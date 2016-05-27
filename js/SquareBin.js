var SquareBin = function() {
	var color = '#1F3A93';	// default color (some shade of blue)
	var h = 700;		// default dimensions
	var w = 700;
	var len = 30; 		// defeault length of square
	var opac = 0.6;		// default opacity scale

	// default axis/title text
	var xText = 'x axis here';
	var yText = 'y axis here';
	var title = 'title here';

	var grid = true;

	var margin = {
		left: 50,
		right: 50,
		top: 50,
		bottom: 50
	};

	// dimensions of VISIBLE chart
	var height = h - margin.top - margin.bottom;
	var width = w - margin.left - margin.right;

	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this)
						.append('svg')
						.attr('height', h)
						.attr('width', w);
			var g = svg.append('g')
						.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
						.attr('height', height)
						.attr('width', width);

			// create scales
			var xMax =d3.max(data, function(d){return +d.x});
			var xMin =d3.min(data, function(d){return +d.x});
			var xScale = d3.scale.linear().range([0, width]).domain([xMin, xMax]);

			var yMin =d3.min(data, function(d){return +d.y});
			var yMax =d3.max(data, function(d){return +d.y});
			var yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax]);


			// calculate individual squares/bins
			var bins = [];
			for (var i = 0; i < data.length; i++) {
				var x = Math.floor(xScale(data[i].x) / len) * len;
				if(x > width) x -= len;
				var y = Math.floor(yScale(data[i].y) / len) * len;
				if(y >= height) y -= len;
				var id = x + ',' + y;

				// does bin exist?
				var exists = bins.some(function(f) {
					return f.id === id;
				});
				if (!exists) { // create new bin
					bins.push({
						id: id,
						x: x,
						y: y,
						count: 1
					});
				} else {	// increment count of existing bin
					bins.find(x=> x.id === id).count++;
				}
			}
			// horizontal grid lines
			for (var i = 0; i < width; i+=len) {
				g.append('line')
					.attr('x1', 0)
					.attr('y1', i)
					.attr('x2', width)
					.attr('y2', i)
					.style('stroke', 'grey')
					.style('opacity', grid == true ? 0.5 : 0);
			}
			// vertical grid lines
			for (var i = 0; i < height; i+=len) {
				g.append('line')
					.attr('x1', i)
					.attr('y1', 0)
					.attr('x2', i)
					.attr('y2', height)
					.style('stroke', 'grey')
					.style('opacity', grid == true ? 0.5 : 0);
			}

			// draw the bins
			var squares = g.selectAll('rect').data(bins);
			squares.enter().append('rect')
							.attr('x', function(b){return +b.x})
							.attr('y', function(b){return +b.y})
							.attr('height', function(b){return (+b.y + len > height ? height - +b.y : len);})
							.attr('width', function(b){return (+b.x + len > width ? width - +b.x : len);})
							.style('fill', color)
							.style('opacity', function(b){return (opac * +b.count * bins.length / data.length)});
			squares.exit().remove();

			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')
						.ticks(width / len / 2);

			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.ticks(height / len / 2);

			svg.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
				.call(xAxis);
			svg.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
				.call(yAxis);
			svg.append('text')
				.attr('transform', 'translate(' + width/2 + ',' + (height + margin.top + 40) + ')')
				.text(xText);
			svg.append('text')
				.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + h/2) + ') rotate(-90)')
				.text(yText);
			svg.append('text')
				.attr('transform', 'translate(' + width/2 + ',' + 40 + ')')
				.text(title);
		});
	};

	/*			GETTER/SETTER METHODS			*/

	// chart base color
	chart.color = function(value) {
	    if(!arguments.length) return color;
	    color = value;
	    return this;
	};

	// length/size of squares
	chart.len = function(value) {
	    if(!arguments.length) return len;
	    len = value;
	    return this;
	};

	// chart height
	chart.height = function(value) {
	    if(!arguments.length) return height;
	    height = value;
	    h = height + margin.top + margin.bottom;
	    return this;
	};

	// chart width
	chart.width = function(value) {
	    if(!arguments.length) return width;
	    width = value;
	    w = width + margin.left + margin.right;
	    return this;
	};

	// weight of opacity of the squares
	chart.opac = function(value) {
	    if(!arguments.length) return opac;
	    opac = value;
	    return this;
	};

	// x-axis label
	chart.xLabel = function(value) {
	    if(!arguments.length) return xText;
	    xText = value;
	    return this;
	};

	// y-axis label
	chart.yLabel = function(value) {
	    if(!arguments.length) return yText;
	    yText = value;
	    return this;
	};

	// chart title
	chart.title = function(value) {
	    if(!arguments.length) return title;
	    title = value;
	    return this;
	};

	// show gridlines
	chart.grid = function(value) {
		if(!arguments.length) return grid;
	    grid = value;
	    return this;
	};


	return chart;
};

