document.addEventListener('DOMContentLoaded', () => {
  const cardGallery = document.getElementById('card-gallery')
  const recipeCard = document.getElementById('recipe-card')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const reviewForm = document.getElementById('review-form')
  let allRecipesArray = []

  document.addEventListener('click', handleClickEvents)
  // recipeCard.addEventListener('click', handleClickEvents)
  reviewForm.addEventListener('click', handleCreateReview)

  let i = 0

  getRecipes()


// --- GET FUNCTIONS --- //

  function getRecipes(num) {
    fetchRecipes()
    .then(data => data.forEach(recipe => {
      allRecipesArray.push(recipe)
      // console.log(allRecipesArray)
    }))
  }


// --- SHOW FUNCTIONS --- //
// function showRecipeName(recipe){
//   const recipeNameSpan = document.createElement('span')
//   recipeNameSpan.id = 'recipe-name'
//   recipeNameSpan.innerText = recipe.name
//   recipeNameSpan.dataset.id = recipe.id
//
//   const recipeAuthorSpan = document.createElement('span')
//   recipeAuthorSpan.id = 'recipe-author'
//   recipeAuthorSpan.innerText = recipe.author
//
//   const recipeYieldSpan = document.createElement('span')
//   recipeYieldSpan.id = 'recipe-yield'
//   recipeYieldSpan.innerText = recipe.yield
//
//   const recipeServingsSpan = document.createElement('span')
//   recipeServingsSpan.id = 'recipe-servings'
//   recipeServingsSpan.innerText = recipe.servings
//
//   const recipeInstructionsSpan = document.createElement('span')
//   recipeInstructionsSpan.id = 'recipe-instructions'
//   recipeInstructionsSpan.innerText = recipe.instructions
//
//   const recipeDescriptionSpan = document.createElement('span')
//   recipeDescriptionSpan.id = 'recipe-description'
//   recipeDescriptionSpan.innerText = recipe.description
//
//   const recipeCategorySpan = document.createElement('span')
//   recipeCategorySpan.id = 'recipe-category'
//   recipeCategorySpan.innerText = recipe.category
//
//   const recipeCuisineSpan = document.createElement('span')
//   recipeCuisineSpan.id = 'recipe-cuisine'
//   recipeCuisineSpan.innerText = recipe.cuisine
//
//   const recipeBudgetSpan = document.createElement('span')
//   recipeBudgetSpan.id = 'recipe-budget'
//   recipeBudgetSpan.innerText = recipe.budget
//
//   const recipeHungrinessSpan = document.createElement('span')
//   recipeHungrinessSpan.id = 'recipe-hungriness'
//   recipeHungrinessSpan.innerText = recipe.hungriness
//
//   const recipePhotoImg = document.createElement('img')
//   recipePhotoImg.id = 'recipe-image'
//   recipePhotoImg.src = recipe.image
//
//   const addReviewButton = document.createElement('button')
//   addReviewButton.id = 'add-review'
//   addReviewButton.innerText = 'Add a review'
//
//   const seeReviewsButton = document.createElement('button')
//   seeReviewsButton.id = 'see-reviews'
//   seeReviewsButton.innerText = 'See all reviews'
//
//
//   recipeCard.append(
//     recipeNameSpan,
//     recipeAuthorSpan,
//     recipeYieldSpan,
//     recipeServingsSpan,
//     recipeInstructionsSpan,
//     recipeDescriptionSpan,
//     recipeCategorySpan,
//     recipeCuisineSpan,
//     recipeBudgetSpan,
//     recipeHungrinessSpan,
//     recipePhotoImg,
//     addReviewButton,
//     seeReviewsButton
//   )
// }
  // function showRecipes(recipes) {
  //   const recipeCardDiv = document.createElement('div')
  //   recipeCardDiv.id = 'recipe-card'
  //
  //   const nameH1 = document.createElement('h1')
  //   nameH1.innerText = recipes.name
  //
  //   const selectButton = document.createElement('button')
  //   selectButton.innerText = 'This looks good'
  //   selectButton.id = recipes.id
  //
  //   const moreInfoButton = document.createElement('button')
  //   moreInfoButton.innerText = 'Show more about this recipe'
  //
  //   cardGallery.append(recipeCardDiv, nameH1, selectButton, moreInfoButton)
  // }


// --- CLICK EVENTS --- //

function handleClickEvents(e) {
  if (e.target === nextBtn) {
    ++i
    i = i % allRecipesArray.length
    // console.log(allRecipesArray[i].name)
    document.getElementById('recipe-name').innerText = allRecipesArray[i].name
    document.getElementById('recipe-name').dataset.id = allRecipesArray[i].id
    document.getElementById('recipe-author').innerText = allRecipesArray[i].author
    document.getElementById('recipe-yield').innerText = allRecipesArray[i].yield
    document.getElementById('recipe-servings').innerText = allRecipesArray[i].servings
    document.getElementById('recipe-instructions').innerText = allRecipesArray[i].instructions
    document.getElementById('recipe-description').innerText = allRecipesArray[i].description
    document.getElementById('recipe-category').innerText = allRecipesArray[i].category
    document.getElementById('recipe-cuisine').innerText = allRecipesArray[i].cuisine
    document.getElementById('recipe-budget').innerText = allRecipesArray[i].budget
    document.getElementById('recipe-hungriness').innerText = allRecipesArray[i].hungriness
    document.getElementById('recipe-photo').src = allRecipesArray[i].photo
  }
  else if (e.target === prevBtn) {
    if (i === 0) {
      i = allRecipesArray.length
      --i
      // console.log(allRecipesArray[i].author)
      document.getElementById('recipe-name').innerText = allRecipesArray[i].name
      document.getElementById('recipe-name').dataset.id = allRecipesArray[i].id
      document.getElementById('recipe-author').innerText = allRecipesArray[i].author
      document.getElementById('recipe-yield').innerText = allRecipesArray[i].yield
      document.getElementById('recipe-servings').innerText = allRecipesArray[i].servings
      document.getElementById('recipe-instructions').innerText = allRecipesArray[i].instructions
      document.getElementById('recipe-description').innerText = allRecipesArray[i].description
      document.getElementById('recipe-category').innerText = allRecipesArray[i].category
      document.getElementById('recipe-cuisine').innerText = allRecipesArray[i].cuisine
      document.getElementById('recipe-budget').innerText = allRecipesArray[i].budget
      document.getElementById('recipe-hungriness').innerText = allRecipesArray[i].hungriness
      document.getElementById('recipe-photo').src = allRecipesArray[i].photo
    }
  }
  else if(e.target.innerText === 'Add a Review'){
    showAddReviewForm(e)
  }

}

function fetchFullRecipe(e){
  let id = e.target.parentElement.childNodes[3].id

      fetch(`http:localhost:3000/recipes/${id}`)
      .then(res => res.json())
      .then(showFullRecipe)
    }

    function showAddReviewForm(e){
      reviewForm.innerHTML = `<form id='review-form'>
      <input id='title' placeholder='give your review a title...'>
      <input id='description' placeholder='Leave your review here ...'>
      <input id='photo' placeholder='figure out how to upload a photo ...'>
      <input id='rating' placeholder='Figure out how to add stars ...'>
      <button>Create</button>
      </form>
      `
    }

    function handleCreateReview(e){
      e.preventDefault()
      // console.log(e.target.parentElement[0].form[3].value)
      let recipe_id = e.target.parentElement.firstElementChild.dataset.id
      let title = e.target.parentElement[0].form[0].value
      let description = e.target.parentElement[0].form[1].value
      let photo = e.target.parentElement[0].form[2].value
      let rating = e.target.parentElement[0].form[3].value
      let user_id = 1

      fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          photo: photo,
          rating: rating,
          recipe_id: recipe_id,
          user_id: user_id
        })
      }).then(res => res.json())

    }


  // function showFullRecipe(recipe){
  //   console.log(recipe[2].author)
  //
  //   const recipeInfoDiv = document.createElement('div')
  //   recipeInfoDiv.id = 'recipe-info'
  //
  //   const author = document.createElement('h3')
  //   author.innerText = recipe.author
  //
  //   recipeInfoDiv.append(author)
  //   moreRecipeInfo.append(recipeInfoDiv)
  // }


// --- END --- //

})
