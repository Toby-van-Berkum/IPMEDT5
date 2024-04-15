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