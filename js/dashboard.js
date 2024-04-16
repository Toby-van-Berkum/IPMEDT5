window.addEventListener('DOMContentLoaded', () => {
    const addRoomButton = document.getElementById("addRoomBtn");
    addRoomButton.addEventListener('click', () => {
        window.location.href = '/add-room.html';
    })
});

const plantContextApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/context'
const plantProfileApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/profile'

const plantContextGetBtn = document.getElementById('refreshBtn');

const roomButtonContainer = document.getElementById("toggle-buttons-container");
const roomButtons = roomButtonContainer.querySelectorAll(".filter-button");

roomButtons.forEach(function(button) {
    console.log(button.textContent)
    addApiEventParams(button, `${plantContextApiPath}/${button.textContent}`, getRoom, button.textContent);
});

function getRoom(apiPath, roomName) {
    const options = makeOptionsWithoutBody('GET', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("ACCESS")}`,
    })

    fetch(apiPath, options)
    .then(response => {
        if (!response.ok) 
            throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        console.log(data);
        const formattedData = data.map(plant => {
            return {
                roomName: `${roomName}`,
                plantProfiles: [plant]
            };
        })

        const plantContainer = document.querySelector('.grid');
        plantContainer.innerHTML = '';

        formattedData.forEach(plant => {
            const plantElement = document.createElement('section');
            plantElement.classList.add('relative', 'flex', 'flex-col', 'justify-end', 'px-8', 'pt-40', 'pb-4', 'overflow-hidden', 'rounded-sm', 'isolate');
            
            const plantImage = document.createElement('img');
            plantImage.src = `/img/plant3.avif`; // Assuming you have an image property in your data
            plantImage.alt = 'A plant';
            plantImage.classList.add('absolute', 'inset-0', 'object-cover', 'w-full', 'h-full');
            
            const gradientOverlay = document.createElement('div');
            gradientOverlay.classList.add('absolute', 'inset-0', 'bg-gradient-to-t', 'from-stone-900', 'via-stone-900/40');

            // Append elements to the plant container
            plantElement.appendChild(plantImage);
            plantElement.appendChild(gradientOverlay);
            
            if (plant.plantProfiles.length != 0) {
                const plantName = document.createElement('h3');
                plantName.textContent = plant.plantProfiles[0].plantProfileName; // Assuming you have a name property in your data
                plantName.classList.add('z-10', 'mt-3', 'text-3xl', 'font-bold', 'text-white');
                plantElement.appendChild(plantName);
            }

            plantContainer.appendChild(plantElement);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// Function to create filter buttons dynamically
function createFilterButtons(data) {
    const roomButtonContainer = document.getElementById("toggle-buttons-container");

    // Clear existing buttons (except the refresh button)
    roomButtonContainer.querySelectorAll('.filter-button').forEach(button => {
        button.remove();
    });

    data.forEach(room => {
        const button = document.createElement('button');
        button.textContent = room.roomName;
        button.classList.add('filter-button', 'px-6', 'py-2', 'mr-1', 'border-2', 'rounded-sm', 'bg-green', 'font-bold', 'text-darkgray', 'hover:bg-darkgray', 'hover:text-green', 'hover:border-gray', 'focus:backdrop-brightness-50');
        roomButtonContainer.appendChild(button);
        // Add event listener or API call for each button here if needed
        button.addEventListener('click', () => {
            // Call the function to fetch data for the clicked room
            getRoom(`${plantContextApiPath}/${room.roomName}`, room.roomName);
        });
    });
}

// Call the function to create filter buttons dynamically
createFilterButtons([]);

function getPlantContexts(apiPath) {
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
            console.log(data);
            createFilterButtons(data);
            // Clear existing plant elements
            const plantContainer = document.querySelector('.grid');
            plantContainer.innerHTML = '';

            // Iterate over the data and create HTML elements for each room and its plant profiles
            data.forEach(room => {
                room.plantProfiles.forEach(plant => {
                    const plantElement = document.createElement('section');
                    plantElement.classList.add('relative', 'flex', 'flex-col', 'justify-end', 'px-8', 'pt-40', 'pb-4', 'overflow-hidden', 'rounded-sm', 'isolate', 'cursor-pointer');
                    
                    const plantImage = document.createElement('img');
                    plantImage.src = `/img/plant3.avif`; // Assuming you have an image property in your data
                    plantImage.alt = 'A plant';
                    plantImage.classList.add('absolute', 'inset-0', 'object-cover', 'w-full', 'h-full');
                    
                    const gradientOverlay = document.createElement('div');
                    gradientOverlay.classList.add('absolute', 'inset-0', 'bg-gradient-to-t', 'from-stone-900', 'via-stone-900/40');

                    // Append elements to the plant container
                    plantElement.appendChild(plantImage);
                    plantElement.appendChild(gradientOverlay);
                    
                    if (plant.plantProfileName) {
                        const plantName = document.createElement('h3');
                        plantName.textContent = plant.plantProfileName; // Assuming you have a name property in your data
                        plantName.classList.add('z-10', 'mt-3', 'text-3xl', 'font-bold', 'text-white');
                        plantElement.appendChild(plantName);
                    }

                    plantContainer.appendChild(plantElement);

                    plantElement.addEventListener('click', () => {
                        // Redirect to the detail page with the plant object and room name
                        redirectToDetailPage(plant, room.roomName);
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function redirectToDetailPage(plantObject, roomName) {
    // Store the plant object and room name in localStorage
    localStorage.setItem('selectedPlant', JSON.stringify(plantObject));
    localStorage.setItem('selectedRoom', roomName);
    
    // Redirect to the detail page
    window.location.href = '/detail-page.html';
}



addApiEventOnLoad(plantContextApiPath, getPlantContexts);
addApiEvent(plantContextGetBtn, plantContextApiPath, getPlantContexts);
