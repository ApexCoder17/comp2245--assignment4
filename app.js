document.addEventListener('DOMContentLoaded', () => {
    // Get the search button element
    const searchButton = document.getElementById('searchBtn');

    // Add a click event listener to the search button
    searchButton.addEventListener('click', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the search input element
        const searchInput = document.getElementById('searchInput');

        // Construct the URL for the fetch request with the search query parameter
        const url = `superheroes.php?query=${encodeURIComponent(searchInput.value)}`;

        // Send a fetch GET request to the server with the search query
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Display the response in the result element
                document.getElementById('results').innerHTML = data;
            })
            .catch(() => {
                // If the request fails, display an alert message
                alert('There was a problem with the request.');
            });
    });
});