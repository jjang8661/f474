$(function() {
  var width = 960,
      height = 500,
      padding = 10, // separation between nodes
      maxRadius = 12;

  var n = 0; // total number of nodes
  var m = 1;
  var p = 10; // percent of potency

  var x = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangePoints([0, width], 1);

  // var nodes = d3.range(n).map(function() {
  //   return {
  //     color: '#EEEEEE',
  //     cx: width/2,
  //     cy: height / 2
  //   };
  // });
  var nodes = []
  for (i = 0; i < n; i++) {
    nodes.push({
      id: (i + 1),
      color: '#EEEEEE'
    });
  }

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0.2)
      .charge(-60)
      .on("tick", tick)
      .start();

  var svg = d3.select('#chart').append("svg")
      .attr("width", width)
      .attr("height", height);

  var circles = svg.selectAll("circle")
      .data(nodes)

  circles.enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", function(d) { return d.color; });

  circles.exit().remove();

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

  $('form').submit(function(event){
    // nodes.pop();
    for (i = 1; i <= 10; i++) {
      nodes.push({
        id: (nodes.length + 1),
        // color: '#F22613'
        color: '#eeeeee'

      });
    }
    // nodes.pop();
    // circles =  circles.data(force.nodes(), function(d) { return d.color });
    circles = circles.data(force.nodes());
    circles.enter()
           .append("circle")
           .attr("r", 10)
           // .style('fill', function(d){return (+d.id < p ? '#EEEEEE' : '#F22613');});
           .style("fill", function(d) { return d.color });
    circles.exit().remove();
    force.start();
    return false;
  });
});