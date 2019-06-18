document.addEventListener('DOMContentLoaded', () => {
  const cardGallery = document.getElementById('card-gallery')
  const moreRecipeInfo = document.getElementById('more-recipe-info')
  const recipeBar = document.getElementById('recipe-bar')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const reviewForm = document.getElementById('review-form')
  let allRecipesArray = []

  document.addEventListener('click', handleClickEvents)


  let i = 0



  getRecipes()


// --- GET FUNCTIONS --- //

  function getRecipes(num) {
    return fetch('http://localhost:3000/recipes/')
    .then(resp => resp.json())
    .then(data => data.forEach(recipe => {
      showRecipeName(recipe)
      allRecipesArray.push(recipe)
    }))
  }


// --- SHOW FUNCTIONS --- //
function showRecipeName(recipe){
  recipeBar.innerHTML = `<span data-id='${recipe.id}'>${recipe.name}</span><button class='reviewBtn'>Add Review</button><button class='seeReviewBtn'>See Reviews</button>`
}
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
    console.log(allRecipesArray[i].name)
    recipeBar.innerText = allRecipesArray[i].name
  }
  else if (e.target === prevBtn) {
    if (i === 0) {
      i = array.length
      --i
      console.log(allRecipesArray[i])
      recipeBar.innerText = allRecipesArray[i].name
    }
  }
  else if(e.target.innerText === 'Add Review'){
    showAddReviewForm(e)
  }
}

function fetchFullRecipe(e){
  // console.log(e.target.parentElement.childNodes[3].id)
  let id = e.target.parentElement.childNodes[3].id

      fetch(`http:localhost:3000/recipes/${id}`)
      .then(res => res.json())
      .then(showFullRecipe)
    }

    function showAddReviewForm(e){
      reviewForm.innerHTML = `<form id='review-form'>
      <input id='stars' placeholder='name...'>
      <input id='description' placeholder='Leave your review here ...'>
      <button>Create</button>
      </form>
      `
    }
      //

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
