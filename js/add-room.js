const plantContextApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/context'

const savePlantContextBtn = document.getElementById("saveBtn");

const roomName = document.getElementById("room-name");

// Plant POST context api call 
addApiEvent(savePlantContextBtn, plantContextApiPath,
    function(apiPath) {

        let options;
        let path;
        let data = localStorage.getItem('allRooms');
        const plantProfile = {
            "plantProfileName": document.getElementById("plant-name").value,
            "plantThreshold": document.getElementById("plant-percentage").value,
            "lastHumidificationDate": new Date().toISOString().replace("Z", "+00:00"),
            "nextHumidificationDate": new Date().toISOString().replace("Z", "+00:00")
        };
        
        console.log("data: ", data)
        if (data.includes(roomName.value)) {
            console.log("roomName: ", roomName.value)
            path = `${apiPath}/${roomName.value}`;
            options = makeOptions('PATCH', {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
            }, plantProfile)
        }
        else {
            console.log("roomName: ", roomName.value)
            path = apiPath;
            const data = {
                "roomName": `${roomName.value}`,
                "plantProfiles": [
                    plantProfile
                ]
            }
            options = makeOptions('POST', {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
            }, data)  
        }
    
        fetch(path, options)
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