var width = 500;
var height = 350;

var svg1 = d3
  .select("#svg1")
  .attr("width", width)
  .attr("height", height);

var url = "/topo.json";
d3.json(url, function(error, topology) {
  if (error) throw error;

  var geojson = topojson.feature(topology, topology.objects.POL_adm1).features;

  var projection = d3.geo
    .mercator()
    .scale(1700)
    .translate([-300, 2000]);

  var path = d3.geo.path().projection(projection);

  svg1
    .append("g")
    .selectAll("path")
    .data(geojson)
    .enter()
    .append("path")
    .attr("name", function(d) {
      return "map1_" + d.properties.VARNAME_1;
    })
    .attr("id", function(d) {
      return "map1_" + d.properties.ID_1;
    })
    .on("mouseover", function(d) {
      d3.select("#woj").text(d.properties.VARNAME_1);
    })
    .on("click", function(d) {
      d3.selectAll("path").classed("selected", false);
      d3.select(this).classed("selected", true);
    })
    .attr("d", path);

  //bubble
  var el = svg1
    .select("#map1_7")
    .node()
    .getBBox();
  var coords = [el.width / 2 + el.x, el.height / 2 + el.y];

  svg1
    .append("circle")
    .attr("cx", coords[0] + 2)
    .attr("cy", coords[1] + 2)
    .attr("r", 20)
    .style("fill", "#444");

  svg1
    .append("circle")
    .attr("cx", coords[0])
    .attr("cy", coords[1])
    .attr("r", 20)
    .style("fill", "#CD4309");

  svg1
    .append("text")
    .attr("x", coords[0])
    .attr("y", coords[1] + 5)
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("9999");
});
