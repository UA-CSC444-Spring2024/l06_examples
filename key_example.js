////////////////////////////////////////////////////////////////
//
// d3 examples of using keys, and then updating based on 
// rebinding to a different data array
//
// Author: Joshua Levine
// Date: Feb. 5, 2024
//
////////////////////////////////////////////////////////////////

// Data array with keys
let dataArray1 = [
  {month: "jan", count: 2},
  {month: "feb", count: 3},
  {month: "mar", count: 5},
  {month: "apr", count: 7},
  {month: "may", count: 11},
  {month: "jun", count: 13},
  {month: "jul", count: 17},
  {month: "aug", count: 19},
  {month: "sep", count: 23},
  {month: "oct", count: 29},
  {month: "nov", count: 31},
  {month: "dec", count: 37}
]

// Add and initialize the svg element
let svg = d3.select("#div1")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400)

// Data join for rects + dataArray1 using keys and .call()
svg.selectAll('rect')
  .data(dataArray1, function(d) { return d.month; })
  .enter()
  .append("rect")
  .call(update)


// By using .call() we can package up all of the attribute setting
function update(selection) {
  selection
    .attr("width", function() {
      return 20;
    })
    .attr("x", function(d,i) {
       return i*25;
    })
    .attr("height", computeHeight)
    .attr("y", computeYValue)
    .attr("fill", d3.rgb(255,0,0));
}

// Helper functions for attributes
function computeYValue(d) {
  return 400 - d.count*10;
}
function computeHeight(d) {
  return d.count*10; 
}


// Smaller array
let dataArray2 = [
  {month: "jun", count: 19},
  {month: "jul", count: 17},
  {month: "aug", count: 13}
]




// Update data join
let updatedRects = svg.selectAll('rect')
  //.data(dataArray2)  //WRONG, doesn't use the key
  .data(dataArray2, function(d) { return d.month; })  //uses key

// Modify the bars which changed values
updatedRects
  .transition()
  .duration(5000)
  .attr("height",computeHeight)
  .attr("y",computeYValue)
  .attr("fill", "blue")

// Remove the bars that aren't in dataArray2
updatedRects
  .exit()
  .transition()
  .duration(5000)
  .attr("y",400)
  .attr("height",0)
  .remove()


updatedRects
  .enter()
  .append("rect")
  .transition()
  .duration(5000)
  .call(update)



