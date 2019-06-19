document.addEventListener('DOMContentLoaded', () => {
  const cardGallery = document.getElementById('card-gallery')
  const recipeCard = document.getElementById('recipe-card')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const reviewForm = document.getElementById('review-form')

  const reviewDescription = document.getElementById('description')
  const reviewPhoto = document.getElementById('photo')
  const reviewRating = document.getElementById('rating')
  const createReviewButton = document.getElementById('create-review-button')

  const loginForm = document.querySelector("#login-form")
  const userNameField = document.querySelector("#login-field")
  const welcomeArea = document.querySelector('.welcome-user')

  let user_id = 0
  let review_id = 0
  let allRecipesArray = []
  let i = 0

  document.addEventListener('click', handleClickEvents)
  loginForm.addEventListener('submit', handleSubmit)
  reviewForm.addEventListener('submit', handleCreateReview)

  getRecipes()


// --- GET FUNCTIONS --- //

  function getRecipes(num) {
    fetchRecipes()
    .then(data => data.forEach(recipe => {
      allRecipesArray.push(recipe)
    }))
    .then(recipeCardObject)
  }


// --- SHOW FUNCTIONS --- //

function recipeCardObject() {
  document.getElementById('recipe-name').innerText = allRecipesArray[i].name;
  document.getElementById('recipe-name').dataset.id = allRecipesArray[i].id;
  document.getElementById('recipe-author').innerText = allRecipesArray[i].author;
  document.getElementById('recipe-yield').innerText = allRecipesArray[i].yield;
  document.getElementById('recipe-servings').innerText = allRecipesArray[i].servings;
  document.getElementById('recipe-instructions').innerText = allRecipesArray[i].instructions;
  document.getElementById('recipe-description').innerText = allRecipesArray[i].description;
  document.getElementById('recipe-category').innerText = allRecipesArray[i].category;
  document.getElementById('recipe-cuisine').innerText = allRecipesArray[i].cuisine;
  document.getElementById('recipe-budget').innerText = allRecipesArray[i].budget;
  document.getElementById('recipe-hungriness').innerText = allRecipesArray[i].hungriness;
  document.getElementById('recipe-photo').src = allRecipesArray[i].photo;
}


// --- CLICK EVENTS --- //

  function handleClickEvents(e) {
    if (e.target === nextBtn) {
      ++i
      i = i % allRecipesArray.length
      recipeCardObject()
    }

    else if (e.target === prevBtn) {
      if (i === 0) {
        i = allRecipesArray.length
        --i
        recipeCardObject()
      }
      else {--i; recipeCardObject()}
    }
    else if (e.target.innerText === 'Add a Review') {
      showAddReviewForm(e)
    }
  }

  function handleSubmit(e){
    e.preventDefault()

    const name = userNameField.value
    const body = {name: name}

    if (name) {
      sessionInit.createUser(body).then(res => {
        e.target.reset()
        user_id = res.id
        welcomeArea.innerHTML = `<span data-id="${res.id}"> Welcome, ${name}!</span>`
        console.log('current user id', res.id)
      })
    }
    else {
      alert("Please enter a username")
    }
  }

  const sessionInit = {
    fetchUsers:
      fetchUsers()
      .then (json => console.log('sessionInit', json)),

    createUser: (name) => {
      return fetch(`http:localhost:3000/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(name)
      })
      .then(res => res.json())
    }
  }

  function showAddReviewForm(e){
    reviewForm.innerHTML = `
      <form id='review-form'>
        <input id='title' placeholder='give your review a title...'>
        <input id='description' placeholder='Leave your review here ...'>
        <input id='photo' placeholder='figure out how to upload a photo ...'>
        <input id='rating' placeholder='Figure out how to add stars ...'>
        <input type="submit" id='create-review-button' data-id="">
      </form>`
  }

  function handleCreateReview(e) {
    e.preventDefault()
    // console.log(e.target.parentElement.parentElement.children[6].children['recipe-card'].children[0].dataset.id)
    const title = e.target.title.value
    const description = e.target.description.value
    const photo = e.target.photo.value
    const rating = e.target.rating.value
    user_id = e.target.parentElement.parentElement.querySelector('.welcome-user').childNodes[0].dataset.id
    const recipe_id = e.target.parentElement.parentElement.children[6].children['recipe-card'].children[0].dataset.id

    const reviewBody = {
      title: title,
      description: description,
      photo: photo,
      rating: rating,
      recipe_id: recipe_id,
      user_id: user_id
    }

    if (title) {
      reviewInit.createReview(reviewBody).then(res => {
        e.target.reset()
        review_id = res.id
        console.log('current response', res)
      })
    }
    else {
      alert("Please fill out all fields")
    }
  }

  const reviewInit = {
    fetchReviews:
      fetchReviews()
      .then (json => console.log('fetch reviews', json)),

    createReview: (reviewBody) => {
      return fetch(`http:localhost:3000/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewBody)
      })
      .then(res => res.json())
      .then('rewiewInit', console.log)
    }
  }


// --- END --- //

})
