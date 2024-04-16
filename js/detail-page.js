document.addEventListener("DOMContentLoaded", () => {
  const plantWeekGraphs = document.getElementsByClassName("plant-week-graph");

  for (let i = 0; i < plantWeekGraphs.length; i++) {
    const plantGraph = plantWeekGraphs[i];
    const progressBar = plantGraph.firstElementChild;
    let percentage = progressBar.style.height;
    let percentageStripped = stripPercentage(percentage);
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

window.addEventListener('DOMContentLoaded', () => {
  // Retrieve the plant object from localStorage
  const plantObjectString = localStorage.getItem('selectedPlant');
  const roomName = localStorage.getItem("selectedRoom")
  const plantObject = JSON.parse(plantObjectString);
  
  // Check if the plant object is available
  if (plantObject) {
      // Set the plant name dynamically
      const plantNameElement = document.querySelector('h1');
      plantNameElement.textContent = plantObject.plantProfileName;

      // Set the room name dynamically
      const roomNameElement = document.querySelector('p.ml-auto');
      roomNameElement.textContent = roomName;
  } else {
      console.error('Error: Plant object is missing or incomplete.');
  }
});