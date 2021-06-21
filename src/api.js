const URL = `https://toney-foodbaby-back.herokuapp.com/`

// --- RECIPES --- //

function fetchRecipes(p = '') {
	return fetch(URL + `recipes/${p}`)
	.then(resp => resp.json())
}


// --- USERS --- //

function fetchUsers() {
	return fetch(URL + 'users')
	.then(resp => resp.json())
}


// --- REVIEWS --- //

function fetchReviews() {
	return fetch(URL + 'reviews')
	.then(resp => resp.json())
}


// --- INGREDIENTS --- //

function fetchIngredients() {
	return fetch(URL + 'ingredients')
	.then(resp => resp.json())
}


// --- RECIPE INGREDIENTS --- //

function fetchRecipeIngredients() {
	return fetch(URL + `recipe_ingredients/`)
	.then(resp => resp.json())
}
