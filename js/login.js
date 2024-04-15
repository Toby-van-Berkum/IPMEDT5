import { addApiEvent } from "./lib";
const authApiPath = 'http://ipmedt5.local:8081/happy-plants/v1/auth'

const email = document.getElementById('email');
const password = document.getElementById('password');
const authBtn = document.getElementById('authButton');

addApiEvent(authBtn, authApiPath+'/authenticate',
function(apiPath) {
    const data = {
        "email": `${email.textContent}`,
        "password": `${password.textContent}`
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