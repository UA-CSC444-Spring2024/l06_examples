////////////////////////////////////////////////////////////////
//
// Revise l05.js using scales and also a group transform, 
// Slightly different than what we did in class.
//
// Author: Joshua Levine
// Date: Feb. 5, 2024
//
////////////////////////////////////////////////////////////////

// Data arrays
let dataArray1 = [3,7,10,39,3,5,26,1,23,12];

// svg attributes
let svgWidth = 400;
let svgHeight = 400;

// Add and initialize the svg element and a group containing the rects
let rectGroup = d3.select("#div1")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(0,${svgHeight}) scale(1,-1)`) //invert!

// Data join for rects + dataArray1 using .call()
rectGroup.selectAll('rect')
  .data(dataArray1)
  .enter()
  .append("rect")
  .call(update) //accepts a function that passes the current selection


//by using .call() we can package up all of the attribute setting
function update(selection) {
  // Create some scales for x position and height and color
  let xScale = d3.scaleLinear()
    .domain([0,dataArray1.length])
    .range([50,svgWidth-50])  //set a 50 pixel margin
  
  let hScale = d3.scaleLinear()
    .domain([0, d3.max(dataArray1)])
    .range([0, 300])

  let colorScale = d3.scaleLinear()
    .domain([d3.min(dataArray1), d3.max(dataArray1)])
    .range(["brown", "steelblue"])

  // Update attributes
  selection
    .attr("x", (d,i) => xScale(i))
    .attr("y", 0)  //using the transform, we can avoid having to set y
    .attr("width", 20)
    .attr("height", d => hScale(d))
    .attr("fill", d => colorScale(d));
}




