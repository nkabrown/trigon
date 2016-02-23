function buildGrid(data) {
  var margin = {top: 10,right: 10,bottom: 10, left: 10},
      width = 100 - margin.right - margin.left,
      height = 100 - margin.top - margin.bottom;

  var xScale = d3.scale.linear()
      .domain([0, 100])
      .range([0, width]);

  var yScale = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([height, 0]);

  d3.select('.triangle-grid')
      .selectAll('div')
      .data(data)
    .enter().append('div')
      .attr('class', 'triangle-box')
      .on('click', function(d) {
        if (d3.select('.triangle-grid').classed('expand')) {
         d3.select('.triangle-grid').classed({'revert': true, 'expand': false});
        } else {
          d3.select('.triangle-grid').classed({'expand': true, 'revert': false});
        }
      });

  d3.selectAll('.triangle-box')
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
    .append('g')
      .attr('class', 'triangles') 
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .append('path')
      .attr('d', function(d) {
        return 'M ' + xScale(5) + ' ' + yScale(0) + ' L ' + xScale(88) + ' ' + yScale(5) + ' L ' + xScale(88) + ' ' + yScale(18815) + ' Z';
      })
      .style('fill', 'rgb(222,222,222)');

  d3.selectAll('.triangles')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .append('path')
      .attr('d', function(d) {
        return 'M ' + xScale(5) + ' ' + yScale(0) + ' L ' + xScale(88) + ' ' + yScale(5) + ' L ' + xScale(88) + ' ' + yScale(d.value) + ' Z'; 
      })
      .style('fill', 'rgba(181,227,147,0.5)');
     
}

d3.csv('assets/data/differentials.csv', function(data) {
  data.forEach(function(d) {
    d.value = +d.value;
  });
  
  const values = data;
  buildGrid(values);
});
