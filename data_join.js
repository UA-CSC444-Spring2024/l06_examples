////////////////////////////////////////////////////////////////
//
// Modifying l05.js to show off different parts of the data join
//
// Author: Joshua Levine
// Date: Feb. 5, 2024
//
////////////////////////////////////////////////////////////////

// Add the svg element
let div = d3.select("#div1")

let svg = div.append("svg")

svg.attr("width", 500)
   .attr("height", 500)

// Data arrays
let dataArray = [5,8,10,42,3,7,1,8,9,2]
let dataArray2 = [2,3,5,7,11,13,17,19,23,29];
let dataArray3 = [29,23,19,17];

let group = svg.append("g")


// Data Join on dataArray1 and setting attributes
let rects = group.selectAll("rect")
               .data(dataArray)
               .enter()
               .append("rect")

rects.call(setAttributes)

// Attribute setting function
function setAttributes(selection) {
  selection.attr("x", function(d,i) {
               return i*50;
           })
          .attr("y", d => 500-d*10) 
          .attr("width", 50)
          .attr("height", (d,i) => d*10)
          .style("fill", "orange")
}

//data join with just an update
rects.data(dataArray2)
     .transition()
     .duration(2000)
     .call(setAttributes)

//data join with an exit

//handling exit selection
rects.data(dataArray3)
     .exit()
     .remove()

//handle update selection
rects.call(setAttributes)
