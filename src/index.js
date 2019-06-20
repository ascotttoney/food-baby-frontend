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
  const deleteReview = document.getElementById('delete-btn')

  const showReviewRating = document.getElementById('show-review-rating')
  const showReviewTitle = document.getElementById('show-review-title')
  const showReviewDesc = document.getElementById('show-review-description')
  const showReviewPhoto = document.getElementById('show-review-photo')
  const editReviewForm = document.getElementById('edit-review-form')

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

  reviewCard.addEventListener('click', handleDeleteOrEdit)


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



  function handleSubmit(e){
    e.preventDefault()
    const name = userNameField.value
    const body = {name: name}

    if (name) {
      sessionInit.createUser(body).then(res => {
        e.target.reset()
        user_id = res.id
        welcomeArea.innerHTML = `<span id='name-of-user' data-id="${res.id}"> Welcome, ${name}!</span>`
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
        showReviewPhoto.src = data.photo
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

        let signed_in_user = parseInt(document.getElementById('name-of-user').dataset.id)
        let current_user = parseInt(review.user.id)

        if (review.rating === '1') review.rating = '★☆☆☆☆'
        else if (review.rating === '2') review.rating = '★★☆☆☆'
        else if (review.rating === '3') review.rating = '★★★☆☆'
        else if (review.rating === '4') review.rating = '★★★★☆'
        else if (review.rating === '5') review.rating = '★★★★★'

        if (current_user === signed_in_user){

        reviewCard.innerHTML += `
          <div id='individual-review'>
          <h3 id='show-review-title' data-id='${review.id}'>${review.title}</h3>
          <span id='show-review-user'>${review.user.name}</span><br>
          <span id='show-review-description'>${review.description}</span><br>
          <img id='show-review-photo' src='${review.photo}'/><br>
          <span id='show-review-rating'>${review.rating}</span>
          <button id='delete-btn'>Delete Review</button><button id='delete-btn'>Edit Review</button>
          </div>
          `}
        else {
            reviewCard.innerHTML += `
            <div id='individual-review'>
            <h3 id='show-review-title' data-id='${review.id}'>${review.title}</h3>
            <span id='show-review-user'>${review.user.name}</span><br>
            <span id='show-review-description'>${review.description}</span><br>
            <img id='show-review-photo' src='${review.photo}'/><br>
            <span id='show-review-rating'>${review.rating}</span>
            </div>
            `
          }
      }
    }))
  }

  function handleDeleteOrEdit(e){
    if(e.target.innerText === 'Delete Review'){
    let reviewToDelete = e.target.parentElement
    let id = e.target.parentElement.children[0].dataset.id

    alert('Are you sure you want to delete?')

    fetch(`http://localhost:3000/reviews/${id}`,{
      method: 'DELETE'
    })
    reviewToDelete.remove()
  }
  else if(e.target.innerText === 'Edit Review'){

    let reviewToEdit = e.target.parentElement
    reviewToEdit.addEventListener('click', handleEditReviewFormClicks)
    reviewToEdit.addEventListener('submit', handleEditReviewFormSubmit)


    let id = e.target.parentElement.children[0].dataset.id
    let signed_in_user = parseInt(document.getElementById('name-of-user').dataset.id)
    let reviewTitleToEdit = e.target.parentElement.children[0].innerHTML
    let reviewDescriptionToEdit = e.target.parentElement.children[3].innerHTML
    let reviewUserToUpdate = e.target.parentElement.children[1].innerHTML
    let reviewPhotoToEdit = e.target.parentElement.children[5].src
    let reviewRatingToEdit = e.target.parentElement.children[7].innerHTML
    let reviewRecipeIdToUpdate = e.target.parentElement.parentElement.parentElement.children[6].children[0].children[0].dataset.id

    reviewToEdit.innerHTML = `
            <form id='edit-review-form'>
              <input id='edit-title' value='${reviewTitleToEdit}'>
              <input id='edit-description' value='${reviewDescriptionToEdit}'>
              <input id='edit-photo' value='${reviewPhotoToEdit}'>
              <div id='edit-star-rating-input'>
                <span id='edit-star1'>☆</span> <span id='edit-star2'>☆</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>
              </div>
              <input type="submit" id='edit-review-button' data-id='${id}'>
            </form>
          `

        function handleEditReviewFormClicks(e) {
            selectedStar = e.target.id
            if (selectedStar === 'edit-star1') {
              // starRating = 1
              document.getElementById('edit-star-rating-input').innerHTML = `
                <span id='edit-star1'>★</span> <span id='edit-star2'>☆</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`
            }
            else if (selectedStar === 'edit-star2') {
              // starRating = 2
              document.getElementById('edit-star-rating-input').innerHTML = `
                <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`
            }
            else if (selectedStar === 'edit-star3') {
              // starRating = 3
              document.getElementById('edit-star-rating-input').innerHTML = `
                <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`
            }
            else if (selectedStar === 'edit-star4') {
              // starRating = 4
              document.getElementById('edit-star-rating-input').innerHTML = `
                <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>★</span> <span id='edit-star5'>☆</span>`
            }
            else if (selectedStar === 'edit-star5') {
              // starRating = 5
              document.getElementById('edit-star-rating-input').innerHTML = `
                <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>★</span> <span id='edit-star5'>★</span>`
            }
          }

          function handleEditReviewFormSubmit(e){
            e.preventDefault()
            let id = e.target.children[4].dataset.id
            // let signed_in_user = parseInt(document.getElementById('name-of-user').dataset.id)
            let newReviewTitle = e.path[0][0].value
            let newReviewDescription = e.path[0][1].value
            let newReviewPhoto = e.path[0][2].value
            let newReviewRating = e.target.children[3].innerText
            let sameUser = e.target.parentElement.parentElement.parentElement.children[2].children[0].dataset.id
            let sameRecipe = e.target.parentElement.parentElement.parentElement.children[6].children[0].children[0].dataset.id

            let editReviewBody = {
              title: newReviewTitle,
              description: newReviewDescription,
              photo: newReviewPhoto,
              rating: newReviewRating,
              recipe_id: sameRecipe,
              user_id: sameUser
            }
            // console.log(editReviewBody)
            fetch(`http://localhost:3000/reviews/${id}`, {
              method: 'PATCH',
              headers:{
                'Content-Type': 'application/json',
                Accepts: 'application/json'
              },
              body: JSON.stringify(editReviewBody),
            }).then(res => res.json())
            .then(data => {
              reviewCard.innerHTML = `
                <div id='individual-review'>
                <h3 id='show-review-title' data-id='${id}'>${newReviewTitle}</h3>
                <span id='show-review-user'>${data.user.name}</span><br>
                <span id='show-review-description'>${newReviewDescription}</span><br>
                <img id='show-review-photo' src='${newReviewPhoto}'/><br>
                <span id='show-review-rating'>${newReviewRating}</span>
                <button id='delete-btn'>Delete Review</button><button id='delete-btn'>Edit Review</button>
                </div>
                `
            })

          }

  }
  }


// --- END --- //

})
