const plantContextApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/context'

const savePlantContextBtn = document.getElementById("saveBtn");

const roomName = document.getElementById("room-name");

// Plant POST context api call 
addApiEvent(savePlantContextBtn, plantContextApiPath,
    function(apiPath) {
        const data = {
            "roomName": `${roomName.value}`,
            "plantProfiles": []
        }
    
        const options = makeOptions('POST', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
        }, data)
    
        fetch(apiPath, options)
            .then(response => {
                if (!response.ok) 
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log("context id: ", data);
                location.replace("dashboard.html")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });