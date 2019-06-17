document.addEventListener('DOMContentLoaded', () => {

  const baseURL = 'http://localhost:3000'

  getRecipes()



  function getRecipes() {
    fetch('http://localhost:3000/recipes')
    .then(resp => resp.json())
    .then(json => console.log(json))
  }

// --- END --- //

})