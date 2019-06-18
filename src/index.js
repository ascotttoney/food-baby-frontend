document.addEventListener('DOMContentLoaded', () => {

  const cardGallery = document.getElementById('card-gallery')

  getRecipes()

  
// --- GET FUNCTIONS --- //

  function getRecipes() {
    fetchRecipes()
    .then(json => json.data.forEach(showRecipes))
  }


// --- SHOW FUNCTIONS --- //

  function showRecipes(recipes) {
    console.log(recipes)

    const recipeCardDiv = document.createElement('div')
    recipeCardDiv.id = 'recipe-card'

    const nameH1 = document.createElement('h1')
    nameH1.innerText = recipes.attributes.name

    cardGallery.append(recipeCardDiv, nameH1)
  }


// --- END --- //

})