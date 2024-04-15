const authApiPath = 'http://192.168.137.212:8081/happy-plants/v1/register'

const registerBtn = document.getElementById('regBtn');

const email = document.getElementById('email');
const fname = document.getElementById('fname');
const surname = document.getElementById('surname');
const password = document.getElementById('password');
const password_confirm = document.getElementById('password_confirm');

// Register API call
addApiEvent(registerBtn, authApiPath+'/register',
function(apiPath) {
    const data = {
        "firstname": `${fname.value}`,
        "lastname": `${surname.value}`,
        "email": `${email.value}`,
        "password": `${password.value}`,
        "role": "USER"
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