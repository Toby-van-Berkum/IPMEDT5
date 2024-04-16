const currentUserApiPath = 'http://192.168.137.212:8081/happy-plants/v1/user/users/owned'

function getCurrentUser(apiPath) {
    const options = makeOptionsWithoutBody('GET', {
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
            document.getElementById("fname-label").textContent=data['firstname']
            document.getElementById("lname-label").textContent=data['lastname']
            const email = data['email'];
            const atIndex = email.indexOf('@');
            const username = email.substring(0, atIndex);
            const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
            const maskedEmail = maskedUsername + email.substring(atIndex);
            document.getElementById("email-label").textContent = maskedEmail;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

addApiEventOnLoad(currentUserApiPath, getCurrentUser)