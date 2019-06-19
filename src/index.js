document.addEventListener('DOMContentLoaded', () => {
  const cardGallery = document.getElementById('card-gallery')
  const recipeCard = document.getElementById('recipe-card')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const reviewForm = document.getElementById('review-form')
  const reviewCard = document.getElementById('review-card')

  const reviewDescription = document.getElementById('description')
  const reviewPhoto = document.getElementById('photo')
  const createReviewButton = document.getElementById('create-review-button')
  const seeReviewsButton = document.getElementById('see-reviews')

  const showReviewRating = document.getElementById('show-review-rating')
  const showReviewTitle = document.getElementById('show-review-title')
  const showReviewDesc = document.getElementById('show-review-description')
  const showReviewPhoto = document.getElementById('show-review-photo')

  const loginForm = document.querySelector("#login-form")
  const userNameField = document.querySelector("#login-field")
  const welcomeArea = document.querySelector('.welcome-user')

  let user_id = 0
  let allRecipesArray = []
  let i = 0
  let starRating = 0

  document.addEventListener('click', handleClickEvents)
  loginForm.addEventListener('submit', handleSubmit)
  reviewForm.addEventListener('click', handleReviewFormClicks)
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
  document.getElementById('recipe-author').innerText = `By: ${allRecipesArray[i].author}`;
  document.getElementById('recipe-yield').innerText =`Yields: ${allRecipesArray[i].yield}`;
  document.getElementById('recipe-servings').innerText = `Serves: ${allRecipesArray[i].servings}`;
  document.getElementById('recipe-instructions').innerText = `Instructions: ${allRecipesArray[i].instructions}`;
  document.getElementById('recipe-description').innerText = `Description: ${allRecipesArray[i].description}`;
  document.getElementById('recipe-category').innerText = `Category: ${allRecipesArray[i].category}`;
  document.getElementById('recipe-cuisine').innerText = `Cuisine: ${allRecipesArray[i].cuisine}`;
  document.getElementById('recipe-budget').innerText = `Budget: ${allRecipesArray[i].budget}`;
  document.getElementById('recipe-hungriness').innerText = `Hungriness: ${allRecipesArray[i].hungriness}`;
  document.getElementById('recipe-photo').src = allRecipesArray[i].photo;
}


// --- CLICK EVENTS --- //

  function handleClickEvents(e) {
    if (e.target === nextBtn) {
      ++i
      i = i % allRecipesArray.length
      recipeCardObject()
      reviewCard.innerText = ''
    }

    else if (e.target === prevBtn) {
      if (i === 0) {
        i = allRecipesArray.length
        --i
        recipeCardObject()
        reviewCard.innerText = ''
      }
      else {--i; recipeCardObject(); reviewCard.innerText = ''}
    }

    else if (e.target.innerText === 'Add a Review') {
      showAddReviewForm(e)
    }

    else if (e.target === seeReviewsButton) {
      reviewCard.innerText = ''
      displayReviews(e)
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
    fetchUsers: fetchUsers(),

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
        <div id='star-rating-input'>
          <span id='star1'>☆</span> <span id='star2'>☆</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>
        </div>
        <input type="submit" id='create-review-button' data-id="">
      </form>`
  }

  function handleCreateReview(e) {
    e.preventDefault()
    // console.log(e.target.parentElement.parentElement.querySelector('.welcome-user'))

    const title = e.target.title.value
    const description = e.target.description.value
    const photo = e.target.photo.value
    user_id = e.target.parentElement.parentElement.querySelector('.welcome-user').childNodes[0].dataset.id
    const create_review_recipe_id = e.target.parentElement.parentElement.children[6].children['recipe-card'].children[0].dataset.id

    const reviewBody = {
      title: title,
      description: description,
      photo: photo,
      rating: starRating,
      recipe_id: create_review_recipe_id,
      user_id: user_id
    }

    if (title) reviewInit.createReview(reviewBody).then(res => { e.target.reset() })
    else alert("Please fill out all fields")
  }

  const reviewInit = {
    fetchReviews: fetchReviews(),

    createReview: (reviewBody) => {
      return fetch(`http:localhost:3000/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewBody)
      })
      .then(res => res.json())
      .then(data => {
        showReviewTitle.innerText = data.title
        showReviewDesc.innerText = data.description
        document.getElementById('show-review-photo').src = data.photo

        if (parseInt(data.rating) === 1) showReviewRating.innerText = '★☆☆☆☆'
        else if (parseInt(data.rating) === 2) showReviewRating.innerText = '★★☆☆☆'
        else if (parseInt(data.rating) === 3) showReviewRating.innerText = '★★★☆☆'
        if (parseInt(data.rating) === 4) showReviewRating.innerText = '★★★★☆'
        else if (parseInt(data.rating) === 5) showReviewRating.innerText = '★★★★★'
      })
    }
  }


  function handleReviewFormClicks(e) {
    selectedStar = e.target.id
    console.log(e)
    if (selectedStar === 'star1') {
      starRating = 1
      document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>☆</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`
    }
    else if (selectedStar === 'star2') {
      starRating = 2
      document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`
    }
    else if (selectedStar === 'star3') {
      starRating = 3
      document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`
    }
    else if (selectedStar === 'star4') {
      starRating = 4
      document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>★</span> <span id='star5'>☆</span>`
    }
    else if (selectedStar === 'star5') {
      starRating = 5
      document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>★</span> <span id='star5'>★</span>`
    }
  }


  function displayReviews(e){
    recipe_id = parseInt(e.target.parentElement.children[0].dataset.id)

    fetchReviews()
    .then(res => res.forEach(review => {
      if (review.recipe.id === recipe_id){

        if (review.rating === '1') review.rating = '★☆☆☆☆'
        else if (review.rating === '2') review.rating = '★★☆☆☆'
        else if (review.rating === '3') review.rating = '★★★☆☆'
        else if (review.rating === '4') review.rating = '★★★★☆'
        else if (review.rating === '5') review.rating = '★★★★★'

        reviewCard.innerHTML += `
          <h3 id='show-review-title' data-id='${review.id}'>${review.title}</h3>
          <span id='show-review-user'>${review.user.name}</span><br>
          <span id='show-review-description'>${review.description}</span><br>
          <img id='show-review-photo' src='${review.photo}'/><br>
          <span id='show-review-rating'>${review.rating}</span>`
      }
    }))
  }

// --- END --- //

})
