const hardwareApiPath = 'http://192.168.137.212:8081/happy-plants/v1/auth/hardware'
const plantProfilePath = 'http://192.168.137.212:8081/happy-plants/v1/plant/profile'
const plantContextPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/context'

const pumpBtn = document.getElementById('pumpBtn');
const saveBtn = document.getElementById('saveBtn');
const delBtn = document.getElementById('delBtn');

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

function deletePlantProfile(apiPath) {
  const options = makeOptionsWithoutBody('DELETE', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
  });

  fetch(apiPath, options)
  .then(response => {
    if (!response.ok) 
        throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    // console.log(localStorage.getItem("selectedPlant", "id"));
    window.location.href = '/dashboard.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

addApiEvent(delBtn, `${plantProfilePath}/${JSON.parse(localStorage.getItem("selectedPlant")).id}`, deletePlantProfile);

function getPlantThreshold() {
  const options = makeOptionsWithoutBody('GET', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
  });

  fetch(`${hardwareApiPath}/Virtual`, options) 
  .then(response => {
    if (!response.ok) 
        throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    const threshold = data.value;
    const thresholdElement = document.getElementById("threshold");
    thresholdElement.textContent = threshold + "%";
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

addApiEvent(saveBtn, `${hardwareApiPath}/Virtual`, function(apiPath) {
  const options = makeOptions('PATCH', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
  }, {
    "value": document.getElementById("thresholdInput").value
  });

  fetch(apiPath, options) 
  .then(response => {
    if (!response.ok) 
        throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

addApiEvent(pumpBtn, `${hardwareApiPath}/Pump`, function(apiPath) {
  var val = 1;
  sendData();
  setTimeout(() => {
    val = 0;
    sendData();
  }, 4000);

  function sendData() {
    const data = {
      "value": val
    };

    const options = makeOptions('PATCH', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
    }, data);

    fetch(apiPath, options)
      .then(response => {
        if (!response.ok)
          throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (val == 0) {
          pumpBtn.textContent = "Give water";
          pumpBtn.classList.remove('bg-red-600');
          pumpBtn.classList.add('bg-green');
        } else {
          pumpBtn.textContent = "Watering...";
          pumpBtn.classList.remove('bg-green');
          pumpBtn.classList.add('bg-red-600');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
});

setInterval(getPlantThreshold, 2000);

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