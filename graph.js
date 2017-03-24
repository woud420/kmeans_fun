// ...time to throw all this shit in a class... it's getting very mPlatformish

// constants
const MAX_VECTORS = 500;
const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 20;
const K = 3;

// generate data
let vectors = [];

console.log(arr);

for (let i = 0; i < arr.length; i++) {
  //let x = ((arr[i].x * (WIDTH - MARGIN * 2)) | 0) + MARGIN;
  let x = arr[i].x;
  //let y = ((arr[i].y * (HEIGHT - MARGIN * 2)) | 0) + MARGIN;
  let y = arr[i].y;
  vectors.push({
    id: i,
    x: x,
    y: y,
    r: 2
  });
}

let clusters = [];
for (let i = 0; i < means.length; i++) {
  //let x = ((means[i].x * (WIDTH - MARGIN * 2)) | 0) + MARGIN;
  let x = arr[i].x;
  //let y = ((means[i].y * (HEIGHT - MARGIN * 2)) | 0) + MARGIN;
  let y = arr[i].y;
  clusters.push({
    id: i + MAX_VECTORS,
    x: x,
    y: y,
    r: 3
    
  });
}

// setup svg
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

// create main container
let mainGroup = svg
  .append("g")
  .classed("main-group", true);

// create cluster group
let clusterGroup = svg
  .append("g")
  .classed("cluster-group", true);

// plot all vectors
mainGroup
  .selectAll("circle")  
  .data(vectors, d => d.id)
  .enter()
  .append("circle")
  .attr("r", 0)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .transition()
  .delay(d => d.id * 4)
  .attr("r", d => d.r);

// plot all clusters
clusterGroup
  .selectAll("circle")  
  .data(clusters, d => d.id)
  .enter()
  .append("circle")
  .style("fill", "red")
  .attr("r", d => -d.id/MAX_VECTORS)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .transition()  
  .delay(d => d.id * 4)
  .style("fill", "orange")  
  .attr("r", d => d.r)
  .ease('elastic');

