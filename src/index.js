document.addEventListener('DOMContentLoaded', () => {
  const cardGallery = document.getElementById('card-gallery')
  const recipeCard = document.getElementById('recipe-card')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const reviewForm = document.getElementById('review-form')

  const loginForm = document.querySelector("#login-form")
  const userNameField = document.querySelector("#login-field")
  const welcomeArea = document.querySelector('.welcome-user')
  let user_id = 0
  //const currentUser = User.last

  loginForm.addEventListener('submit', handleSubmit)

  let allRecipesArray = []

  document.addEventListener('click', handleClickEvents)
  reviewForm.addEventListener('click', handleCreateReview)

  let i = 0

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
    // console.log(e)

    const name = userNameField.value
    const body = {name: name}

    if(name){
      sessionInit.createUser(body).then(res=> {
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

  function welcomeUser(e){
    // console.log(e)
    // let user =
    // const welcomeArea = document.querySelector('.welcome-user')
    // welcomeArea.innerHTML = <span data-id=`${user.id}`> Welcome, ${user.name}</span>
  }

  const sessionInit = {

    fetchUsers: () => {
      return fetch(`http:localhost:3000/users`)
      .then(res=>res.json())
      .then (json => console.log(json.id))
    },

    createUser: (name) => {
      return fetch(`http:localhost:3000/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(name)
      })
      .then(res => res.json())
    },

    // createSession: (review) => {
    //   return fetch(`http:localhost:3000/reviews`, {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body)
    //   })
  }

  function showAddReviewForm(e){
    reviewForm.innerHTML = `
      <form id='review-form'>
        <input id='title' placeholder='give your review a title...'>
        <input id='description' placeholder='Leave your review here ...'>
        <input id='photo' placeholder='figure out how to upload a photo ...'>
        <input id='rating' placeholder='Figure out how to add stars ...'>
        <button data-id="${user_id}">Create</button>
      </form>`
  }

  function handleCreateReview(e){
    e.preventDefault()
    console.log('submit')
    //
    // let recipe_id = e.target.parentElement.firstElementChild.dataset.id
    // let title = e.target.parentElement[0].form[0].value
    // let description = e.target.parentElement[0].form[1].value
    // let photo = e.target.parentElement[0].form[2].value
    // let rating = e.target.parentElement[0].form[3].value
    //
    // fetch('http://localhost:3000/reviews', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accepts: 'application/json'
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     photo: photo,
    //     rating: rating,
    //     recipe_id: recipe_id,
    //     user_id: user_id
    //   })
    // })
    // .then(res => res.json())
  }


// --- END --- //

})
