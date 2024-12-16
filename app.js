document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    // Function to sanitize user input
    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '').trim();
    }

    // Function to display a single superhero
    function displaySuperhero(hero) {
        return `
            <h3>${hero.alias}</h3>
            <h4>${hero.name}</h4>
            <p>${hero.biography}</p>
        `;
    }

    // Function to display list of superheroes
    function displaySuperheroList(heroes) {
        return `
            <ul>
                ${heroes.map(hero => `<li>${hero.alias}</li>`).join('')}
            </ul>
        `;
    }

    function performSearch() {
        // Sanitize the search input
        const query = sanitizeInput(searchInput.value);

        // Create the URL with the query parameter
        const url = query ? `superheroes.php?query=${encodeURIComponent(query)}` : 'superheroes.php';

        // Fetch the data
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    resultDiv.innerHTML = "Superhero not found";
                } else if (data.length === 1 && query) {
                    // Display single superhero
                    resultDiv.innerHTML = displaySuperhero(data[0]);
                } else {
                    // Display list of superheroes
                    resultDiv.innerHTML = displaySuperheroList(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = "Error loading superhero data";
            });
    }

    // Add event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Initial load of all superheroes
    performSearch();
});