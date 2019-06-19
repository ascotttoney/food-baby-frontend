// --- RECIPES --- //

function fetchRecipes() {
  return fetch('http://localhost:3000/recipes/')
  .then(resp => resp.json())
}


// --- USERS --- //

function fetchUsers() {
  return fetch('http://localhost:3000/users')
  .then(resp => resp.json())
}


// --- REVIEWS --- //

function fetchReviews() {
  return fetch('http://localhost:3000/reviews')
  .then(resp => resp.json())
}


// --- INGREDIENTS --- //

function fetchIngredients() {
  return fetch('http://localhost:3000/ingredients')
  .then(resp => resp.json())
}


// --- RECIPE INGREDIENTS --- //

function fetchRecipeIngredients() {
  return fetch('http://localhost:3000/recipe_ingredients')
  .then(resp => resp.json())
}
