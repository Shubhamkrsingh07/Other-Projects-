const movies = [
    { 
        id: 1, 
        title: 'Inception', 
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 
        price: 12,
        genre: 'Sci-Fi'
    },
    { 
        id: 2, 
        title: 'The Dark Knight', 
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 
        price: 10,
        genre: 'Action'
    },
    { 
        id: 3, 
        title: 'Interstellar', 
        image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', 
        price: 11,
        genre: 'Sci-Fi'
    },
    { 
        id: 4, 
        title: 'Pulp Fiction', 
        image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 
        price: 9,
        genre: 'Crime'
    },
    { 
        id: 5, 
        title: 'The Matrix', 
        image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 
        price: 10,
        genre: 'Sci-Fi'
    }
];

const sliderTrack = document.querySelector('.slider-track');
const movieGrid = document.getElementById('movie-grid');
const modal = document.getElementById('booking-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalPrice = document.getElementById('modal-price');
const seatsInput = document.getElementById('seats');
const confirmBookingBtn = document.getElementById('confirm-booking');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let currentSlide = 0;

function createSlider() {
    movies.forEach((movie, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        slide.style.backgroundImage = `url(${movie.image})`;
        slide.innerHTML = `
            <div>
                <h2>${movie.title}</h2>
                <p>${movie.genre}</p>
            </div>
        `;
        sliderTrack.appendChild(slide);
    });
}

function moveSlider(direction) {
    const slideWidth = document.querySelector('.slider-slide').offsetWidth;
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = movies.length - 1;
    if (currentSlide >= movies.length) currentSlide = 0;
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-card-content">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <p>$${movie.price}</p>
            <button onclick="openModal(${movie.id})">Book Now</button>
        </div>
    `;
    return card;
}

function displayMovies(moviesToDisplay) {
    movieGrid.innerHTML = '';
    moviesToDisplay.forEach(movie => {
        movieGrid.appendChild(createMovieCard(movie));
    });
}

function openModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    modalTitle.textContent = movie.title;
    modalImage.src = movie.image;
    modalPrice.textContent = `Price: $${movie.price}`;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function confirmBooking() {
    const movie = movies.find(m => m.title === modalTitle.textContent);
    const seats = parseInt(seatsInput.value);
    alert(`Booked ${seats} seat(s) for ${movie.title}. Total price: $${movie.price * seats}`);
    closeModal();
}

function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
}

// Event listeners
document.querySelector('.slider-arrow.prev').addEventListener('click', () => moveSlider(-1));
document.querySelector('.slider-arrow.next').addEventListener('click', () => moveSlider(1));
document.querySelector('.close').addEventListener('click', closeModal);
confirmBookingBtn.addEventListener('click', confirmBooking);
searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchMovies();
});

// Initialize
createSlider();
displayMovies(movies);