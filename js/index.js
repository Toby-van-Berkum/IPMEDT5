const authApiPath = 'http://ipmedt5.local:8081/happy-plants/v1/auth'
const plantContextApiPath = 'http://ipmedt5.local:8081/happy-plants/v1/plant/context'
const plantProfileApiPath = 'http://ipmedt5.local:8081/happy-plants/v1/plant/profile'

const registerBtn = document.getElementById('test-register');
const authBtn = document.getElementById('test-authenticate');
const plantContextInsertBtn = document.getElementById('test-plant-context');
const plantContextGetBtn = document.getElementById('test-plant-context-gets')

const apiKey = {
    access: '',
    refresh: '',
}

// Register API call
addApiEvent(registerBtn, authApiPath+'/register',
function(apiPath) {
    const data = {
        "firstname": "rolanus",
        "lastname": "michelle bommel",
        "email": "rolanus1@mail.com",
        "password": 5678,
        "role": "ADMIN"
    }

    const options = makeOptions('POST', {
        'Content-Type': 'application/json',
    }, data)

    fetch(apiPath, options)
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            apiKey.access = data.access_token;
            apiKey.refresh = data.refresh_token;
            console.log(apiKey);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

// Authenticate user API call
addApiEvent(authBtn, authApiPath+'/authenticate',
function(apiPath) {
    const data = {
        "email": "rolanus1@mail.com",
        "password": 5678
    }

    const options = makeOptions('POST', {
        'Content-Type': 'application/json',
    }, data)

    fetch(apiPath, options)
        .then(response => {
            if (!response.ok) 
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            apiKey.access = data.access_token;
            apiKey.refresh = data.refresh_token;
            console.log(apiKey);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

// Plant POST context api call 
addApiEvent(plantContextInsertBtn, plantContextApiPath,
function(apiPath) {
    const data = {
        "roomName": "living room",
        "plantProfiles": [
            {
                "plantProfileName": "Complex Plant Profile 1",
                "plantThreshold": 52.5,
                "lastHumidificationDate": "2024-03-27T12:00:00Z",
                "nextHumidificationDate": "2024-04-27T12:00:00Z",
                "hardware": {
                    "lastUsed": "2024-04-27T12:00:00Z",
                    "name": "Sensor1",
                    "value": 33.0
                }
            },
            {
                "plantProfileName": "Complex Plant Profile 2",
                "plantThreshold": 62.5,
                "lastHumidificationDate": "2024-03-27T12:00:00Z",
                "nextHumidificationDate": "2024-04-27T12:00:00Z",
                "hardware": {
                    "lastUsed": "2024-04-27T12:00:00Z",
                    "name": "Sensor2",
                    "value": 57.0
                }
            }
        ]
    }

    const options = makeOptions('POST', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.access}`,
    }, data)

    fetch(apiPath, options)
        .then(response => {
            if (!response.ok) 
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // If data is -1 then something is wrong else everything worked fine
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

// Plant context GET api call 
addApiEvent(plantContextGetBtn, plantContextApiPath,
    function(apiPath) {
        const options = makeOptionsWithoutBody('GET', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.access}`,
        })
    
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
    })