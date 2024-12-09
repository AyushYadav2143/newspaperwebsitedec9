let slideIndex = 0;

// Array of local image URLs for the slideshow
const images = [
    "newsimage1.jpg",
    "newsimage2.jpg",
    "newsimage3.jpg"
];

// Array of captions corresponding to each image
const captions = [
    "Breaking News: Major event happening in the city.",
    "Local Update: Community gathers for annual festival.",
    "Sports Highlight: Local team wins championship."
];

// Function to create the slideshow
function createSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';
        slide.innerHTML = `<img src="${image}" class="w-full h-64 object-cover">`;
        slideshowContainer.appendChild(slide);
    });
    showSlides();
}

// Function to show slides
function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const captionText = document.getElementById("caption"); // Get the caption element
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    captionText.innerHTML = captions[slideIndex - 1]; // Update the caption text
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Initialize the slideshow
createSlideshow();

document.addEventListener("DOMContentLoaded", function() {
    const trustSection = document.querySelector('.trust-section');

    // Function to check if the element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add the visible class when the section is in view
    function checkVisibility() {
        if (isInViewport(trustSection)) {
            trustSection.classList.add('visible');
            window.removeEventListener('scroll', checkVisibility); // Remove event listener after visibility is triggered
        }
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});

document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const postalCode = document.getElementById('location').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},us&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Postal code not found');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Get the weather icon URL

            // Update weather info
            document.getElementById('temperature').innerText = `${temperature} °C`;
            document.getElementById('description').innerText = weatherDescription;
            document.getElementById('weather-icon').src = weatherIcon; // Set the weather icon

            // Update local news based on weather
            const localNewsArticle = document.getElementById('local-news-article');
            if (weatherDescription.includes('rain')) {
                localNewsArticle.innerText = "It's a rainy day! Don't forget your umbrella. Check out these indoor activities!";
            } else if (weatherDescription.includes('clear')) {
                localNewsArticle.innerText = "It's a beautiful sunny day! Perfect for outdoor activities.";
            } else {
                localNewsArticle.innerText = "Stay updated with the latest news!";
            }
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p style="color: red;">${error.message}</p>`;
            // Reset temperature and description on error
            document.getElementById('temperature').innerText = '-- °C';
            document.getElementById('description').innerText = '--';
            document.getElementById('weather-icon').src = ''; // Clear the icon
        });
});

// Function to update the clock
function updateClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false // Use 24-hour format
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    document.getElementById('clock').innerText = dateTimeString;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
