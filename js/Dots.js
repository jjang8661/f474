var Dots = function() {
	var color = '#1F3A93';	// default color (some shade of blue)
	var width = 800,
      height = 400,
      padding = 10, // separation between nodes
      maxRadius = 12;

	var n = 10; // total number of nodes
 	var m = 1;
	var p = 10; // percent of potency
	var nodes = [];

	var x = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangePoints([0, width], 1);
  
	
	var chart = function(selection) {
		selection.each(function(data) {
			var svg = d3.select(this)
						.selectAll('.dots').data(data);
			svg.enter().insert('svg')
						.attr('height', height)
						.attr('width', width)
						.attr('class', 'dots');


			for (i = 1; i <= n; i++) {
			    nodes.push({
			        id: (nodes.length + 1),
			        color: color
			    });
		    }

			var force = d3.layout.force()
		    	.nodes(nodes)
		        .size([width, height])
		        .gravity(0.2)
		        .charge(-60)
		        .on("tick", tick)
		        .start();

			var circles = svg.selectAll("circle")
				      .data(nodes)

		  	circles.enter()
		        .insert("circle")
		        .attr("r", 10)
		        .style("fill", function(d) { return d.color; });

		    circles.exit().remove();

		    circles.transition()
		    	.duration(1000)
		    	.attr('r', 10)
		    	.style('fill', function(d) { return d.color; });

		    function tick() {
		    	circles.attr("cx", function(d) { return d.x; })
		           .attr("cy", function(d) { return d.y; });
		    // circles.each(gravity(.2 * e.alpha))
		    //       .attr("cx", function(d) { return d.x; })
		    //       .attr("cy", function(d) { return d.y; });
		  	}

			function gravity(alpha) {
				return function(d) {
					d.y += (height/2 - d.y) * alpha;
					d.x += (width/2 - d.x) * alpha;
				};
			}
			
		});
	};

	/*			GETTER/SETTER METHODS			*/

	// chart base color
	chart.color = function(value) {
	    if(!arguments.length) return color;
	    color = value;
	    return this;
	};

	chart.numNodes = function(value) {
	    if(!arguments.length) return n;
	    n = value;
	    return this;
	};

	return chart;

	
};

