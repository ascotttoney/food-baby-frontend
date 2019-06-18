function showRecipeName(recipe){
  const recipeNameSpan = document.createElement('span')
  recipeNameSpan.id = 'recipe-name'
  recipeNameSpan.innerText = recipe.name
  recipeNameSpan.dataset.id = recipe.id

  const recipeAuthorSpan = document.createElement('span')
  recipeAuthorSpan.id = 'recipe-author'
  recipeAuthorSpan.innerText = recipe.author

  const recipeYieldSpan = document.createElement('span')
  recipeYieldSpan.id = 'recipe-yield'
  recipeYieldSpan.innerText = recipe.yield

  const recipeServingsSpan = document.createElement('span')
  recipeServingsSpan.id = 'recipe-servings'
  recipeServingsSpan.innerText = recipe.servings

  const recipeInstructionsSpan = document.createElement('span')
  recipeInstructionsSpan.id = 'recipe-instructions'
  recipeInstructionsSpan.innerText = recipe.instructions

  const recipeDescriptionSpan = document.createElement('span')
  recipeDescriptionSpan.id = 'recipe-description'
  recipeDescriptionSpan.innerText = recipe.description

  const recipeCategorySpan = document.createElement('span')
  recipeCategorySpan.id = 'recipe-category'
  recipeCategorySpan.innerText = recipe.category

  const recipeCuisineSpan = document.createElement('span')
  recipeCuisineSpan.id = 'recipe-cuisine'
  recipeCuisineSpan.innerText = recipe.cuisine

  const recipeBudgetSpan = document.createElement('span')
  recipeBudgetSpan.id = 'recipe-budget'
  recipeBudgetSpan.innerText = recipe.budget

  const recipeHungrinessSpan = document.createElement('span')
  recipeHungrinessSpan.id = 'recipe-hungriness'
  recipeHungrinessSpan.innerText = recipe.hungriness

  const recipePhotoImg = document.createElement('img')
  recipePhotoImg.id = 'recipe-image'
  recipePhotoImg.src = recipe.image

  const addReviewButton = document.createElement('button')
  addReviewButton.id = 'add-review'
  addReviewButton.innerText = 'Add a review'

  const seeReviewsButton = document.createElement('button')
  seeReviewsButton.id = 'see-reviews'
  seeReviewsButton.innerText = 'See all reviews'

  recipeCard.append(
    recipeNameSpan,
    recipeAuthorSpan,
    recipeYieldSpan,
    recipeServingsSpan,
    recipeInstructionsSpan,
    recipeDescriptionSpan,
    recipeCategorySpan,
    recipeCuisineSpan,
    recipeBudgetSpan,
    recipeHungrinessSpan,
    recipePhotoImg,
    addReviewButton,
    seeReviewsButton
  )
}



function showFullRecipe(recipe){
  console.log(recipe[2].author)

  const recipeInfoDiv = document.createElement('div')
  recipeInfoDiv.id = 'recipe-info'

  const author = document.createElement('h3')
  author.innerText = recipe.author

  recipeInfoDiv.append(author)
  moreRecipeInfo.append(recipeInfoDiv)
}
