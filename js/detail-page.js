document.addEventListener("DOMContentLoaded", () => {
  const plantWeekGraphs = document.getElementsByClassName("plant-week-graph");

  for (let i = 0; i < plantWeekGraphs.length; i++) {
    const plantGraph = plantWeekGraphs[i];
    const progressBar = plantGraph.firstElementChild;
    let percentage = progressBar.style.height;
    let percentageStripped = stripPercentage(percentage);
    console.log(percentageStripped);
    if (percentageStripped < 40) {
      progressBar.classList.remove('bg-green');
      progressBar.classList.remove('bg-yellow-600');
      progressBar.classList.add('bg-yellow-600');
    }
    if (percentageStripped < 20) {
      progressBar.classList.remove('bg-green');
      progressBar.classList.remove('bg-yellow-600');
      progressBar.classList.add('bg-red-600');
    }
  }
});

function stripPercentage(percentageString) {
  return percentageString.replace('%', '');
}