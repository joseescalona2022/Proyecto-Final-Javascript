const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ab5e8009bbmshcebff2aee40c7d4p1fbaaajsnbf791c7460a7',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=harry%20potter', options)
    .then(response => response.json())
    .then(data => {

        const arrayMovies = data.d
        arrayMovies.map((element) => {
            // console.log(element)
            const title = element.l
            const image = element.i.imageUrl
            const cast = element.s


            const poster =`
                    <div>
                    <img src= "${image}" />
                    <h2>${title}</h2>
                    </div>

            `

            document.getElementById(`contenedor1`).innerHTML += poster
            
    

        })

    })
    .catch(err => {
        console.error(err);
    });