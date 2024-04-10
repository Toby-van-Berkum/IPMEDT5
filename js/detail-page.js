document.addEventListener("DOMContentLoaded", () => {
  console.log("test");
  var plantWeekGraphs = document.getElementsByClassName("plant-week-graph");

  for (let i = 0; i < plantWeekGraphs.length; i++) {
    const plantGraph = plantWeekGraphs[i];

    console.log(plantGraph.style.height);
  }
});