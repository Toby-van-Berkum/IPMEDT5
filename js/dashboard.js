window.addEventListener('DOMContentLoaded', () => {
    // Function to create room buttons
    function createRoomButton(room) {
        const roomButton = document.createElement('a');
        roomButton.href = "#";
        roomButton.textContent = room.roomName;
        roomButton.classList.add('px-6', 'py-2', 'mr-1', 'border-2', 'rounded-sm', 'bg-green', 'text-darkgray', 'hover:bg-darkgray', 'hover:text-green', 'hover:border-gray');
        roomButton.addEventListener('click', () => {
            // Handle click event for the room button
            // You can perform actions like fetching plant data for the selected room
            console.log(`Clicked on room: ${room.roomName}`);
        });
        return roomButton;
    }

    // Function to fetch rooms and create room buttons
    function loadRooms(apiPath) {
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
                const toggleButtonsContainer = document.getElementById('toggle-buttons-container');
                toggleButtonsContainer.innerHTML = ''; // Clear existing room buttons

                data.forEach(room => {
                    const roomButton = createRoomButton(room);
                    toggleButtonsContainer.appendChild(roomButton);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Call loadRooms function to fetch and create room buttons
    loadRooms(plantContextApiPath);
});


const plantContextApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/context'
const plantProfileApiPath = 'http://192.168.137.212:8081/happy-plants/v1/plant/profile'

const plantContextGetBtn = document.getElementById('refreshBtn');

function getPlantContexts(apiPath) {
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
            console.log(data)
            // Clear existing plant elements
            const plantContainer = document.querySelector('.grid');
            plantContainer.innerHTML = '';

            // Iterate over the data and create HTML elements for each plant
            data.forEach(plant => {
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
}

addApiEventOnLoad(plantContextApiPath, getPlantContexts);
addApiEvent(plantContextGetBtn, plantContextApiPath, getPlantContexts);