document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', function() {
        fetch('superheroes.php')
            .then(response => response.json())
            .then(data => {
                // Create a list of superhero aliases
                const superheroList = data.map(hero => hero.alias);
                // Format the list as shown in the figure
                const formattedList = '<ul>\n' +
                    superheroList.map(alias => `  <li>${alias}</li>`).join('\n') +
                    '\n</ul>';
                // Show the alert with the formatted list
                alert(formattedList);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error loading superheroes data');
            });
    });
});