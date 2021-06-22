document.addEventListener('DOMContentLoaded', () => {
	const prevBtn = document.getElementById('prev-btn');
	const nextBtn = document.getElementById('next-btn');
	const reviewForm = document.getElementById('review-form');
	const reviewCard = document.getElementById('review-card');
	const ingredientsList = document.getElementById('ingredient-list');
	const seeReviewsButton = document.getElementById('see-reviews');
	const loginFormDiv = document.getElementById('login-form-div');
	const loginForm = document.getElementById('login-form');
	const userNameField = document.getElementById('login-field');
	const welcomeUser = document.getElementById('welcome-user');
	const afterLogin = document.getElementById('after-login');
	afterLogin.style.display = 'none';

	let user_id = 0;
	let allRecipesArray = [];
	let allRecipeIngredientsArray = [];
	let i = 0; // i = the current recipe on display
	let starRating = 0;

	document.addEventListener('click', handleClickEvents);
	loginForm.addEventListener('submit', handleSubmit);
	reviewForm.addEventListener('click', handleReviewFormClicks);
	reviewForm.addEventListener('submit', handleCreateReview);
	reviewCard.addEventListener('click', handleDeleteOrEdit);

	getRecipes();
	getRecipeIngredients();

	const URL = `https://toney-foodbaby-back.herokuapp.com/`;

	// --- GET FUNCTIONS --- //

	function getRecipes(num) {
		fetchRecipes()
			.then((data) =>
				data.forEach((recipe) => {
					allRecipesArray.push(recipe);
				})
			)
			.then(recipeCardObject);
	}

	function getRecipeIngredients(recIngNum) {
		fetchRecipeIngredients().then((data) =>
			data.forEach((ingredient) => {
				allRecipeIngredientsArray.push(ingredient);
			})
		);
	}

	// --- SHOW FUNCTIONS --- //

	function recipeCardObject() {
		document.getElementById('recipe-name').innerText =
			allRecipesArray[i].name;
		document.getElementById('recipe-name').dataset.id =
			allRecipesArray[i].id;
		document.getElementById(
			'recipe-author'
		).innerText = `By: ${allRecipesArray[i].author}`;
		document.getElementById(
			'recipe-yield'
		).innerText = `${allRecipesArray[i].yield}`;
		document.getElementById(
			'recipe-servings'
		).innerText = `${allRecipesArray[i].servings}`;
		document.getElementById(
			'recipe-instructions'
		).innerText = `${allRecipesArray[i].instructions}`;
		document.getElementById(
			'recipe-description'
		).innerText = `${allRecipesArray[i].description}`;
		document.getElementById(
			'recipe-category'
		).innerText = `${allRecipesArray[i].category}`;
		document.getElementById(
			'recipe-cuisine'
		).innerText = `${allRecipesArray[i].cuisine}`;
		document.getElementById(
			'recipe-budget'
		).innerText = `${allRecipesArray[i].budget}`;
		document.getElementById(
			'recipe-hungriness'
		).innerText = `${allRecipesArray[i].hungriness}`;
		document.getElementById('recipe-photo').src = allRecipesArray[i].photo;

		let currentIngredients = [];

		allRecipeIngredientsArray.forEach((ri) => {
			if (ri.recipe.id === i + 1) {
				currentIngredients.push(ri.ingredient.name);
				ingredientsList.innerHTML = '';
			}
		});

		currentIngredients.forEach((ingredient) => {
			ingredientsList.innerHTML += `<li class="list-group-item">${ingredient}</li>`;
		});
	}

	// --- CLICK EVENTS --- //

	function handleClickEvents(e) {
		if (e.target === nextBtn) {
			++i;
			i = i % allRecipesArray.length;
			recipeCardObject();
			reviewCard.innerText = '';
		} else if (e.target === prevBtn) {
			if (i === 0) {
				i = allRecipesArray.length;
				--i;
				recipeCardObject();
				reviewCard.innerText = '';
			} else {
				--i;
				recipeCardObject();
				reviewCard.innerText = '';
			}
		} else if (e.target.innerText === 'Add a Review') {
			showAddReviewForm(e);
		} else if (e.target === seeReviewsButton) {
			reviewCard.innerText = '';
			displayReviews(e);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		const name = userNameField.value;
		const body = { name: name };

		if (name) {
			sessionInit.createUser(body).then((res) => {
				e.target.reset();
				user_id = res.id;
				welcomeUser.innerText = `Welcome, ${name}!`;
				welcomeUser.dataset.id = res.id;
				afterLogin.style.display = 'block';
				loginFormDiv.style.display = 'none';

				recipeCardObject();
			});
		} else {
			alert('Please enter a username');
		}
	}

	const sessionInit = {
		fetchUsers: fetchUsers(),

		createUser: (name) => {
			return fetch(URL + 'users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(name),
			}).then((res) => res.json());
		},
	};

	function showAddReviewForm(e) {
		// console.log(e)
		reviewForm.innerHTML = `
      <div class='container text-left'>
        <div class="row justify-content-center">
          <div class='form-group col-lg-6' data-id="">
            <form id='review-form' class="form-signin">
              <label for="title" data-id="">Title</label>
              <input class="form-control text-center" id='title'><br>
              <label for="photo">Photo URL</label>
              <input class="form-control text-center" id='photo'><br>
              <label for="description">Review</label>
              <input class="form-control" type='text-area' id='description'><br>
              <div id='star-rating-input' class="h3">
                <span id='star1'>☆</span> <span id='star2'>☆</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>
              </div> <br>
              <input type="submit" id='create-review-button' data-id="" class="btn btn-success">
            </form>
          </div>
        </div>
      </div>`;
	}

	function handleCreateReview(e) {
		e.preventDefault();

		console.log(e);

		const title = e.target[0].value;
		const description = e.target[2].value;
		const photo = e.target[1].value;
		user_id = welcomeUser.dataset.id;
		const create_review_recipe_id = i + 1;

		const reviewBody = {
			title: title,
			description: description,
			photo: photo,
			rating: starRating,
			recipe_id: create_review_recipe_id,
			user_id: user_id,
		};

		if (title)
			reviewInit.createReview(reviewBody).then((res) => {
				e.target.reset();
			});
		else alert('Please fill out all fields');
	}

	const reviewInit = {
		fetchReviews: fetchReviews(),

		createReview: (reviewBody) => {
			return fetch(URL + 'reviews', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(reviewBody),
			})
				.then((res) => res.json())
				.then((review) => {
					let starStar = '';

					if (parseInt(review.rating) === 1) starStar = '★☆☆☆☆';
					else if (parseInt(review.rating) === 2) starStar = '★★☆☆☆';
					else if (parseInt(review.rating) === 3) starStar = '★★★☆☆';
					else if (parseInt(review.rating) === 4) starStar = '★★★★☆';
					else if (parseInt(review.rating) === 5) starStar = '★★★★★';

					reviewCard.innerHTML += `<div class='col-sm-6 my-3' id='review-${review.id}' data-id='${review.id}'>
            <div class='card text-left my-1'>
              <h3 id='show-review-title' class='card-header' data-id='${review.id}'>${review.title}</h3>
                <div class='card-body' data-id='${review.id}'>
                  <span class='h5'>By: </span><span id='show-review-user' class='h5'>${review.user.name}</span><br><br>
                  <span id='show-review-description'>${review.description}</span><br><br>
                  <span id='show-review-rating' class='h5'>${starStar}</span>
                    <br><br>
                  <button id='edit-btn' class="btn btn-success" data-id='${review.id}'>Edit Review</button>  <button id='delete-btn' class="btn btn-danger" data-id='${review.id}'>Delete Review</button>
                </div>  
              <img id='show-review-photo' src='${review.photo}' class="card-img-top" data-id='${review.id}'/><br>
            </div>
          </div>`;
				});
		},
	};

	function handleReviewFormClicks(e) {
		selectedStar = e.target.id;

		if (selectedStar === 'star1') {
			starRating = 1;
			document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>☆</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`;
		} else if (selectedStar === 'star2') {
			starRating = 2;
			document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>☆</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`;
		} else if (selectedStar === 'star3') {
			starRating = 3;
			document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>☆</span> <span id='star5'>☆</span>`;
		} else if (selectedStar === 'star4') {
			starRating = 4;
			document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>★</span> <span id='star5'>☆</span>`;
		} else if (selectedStar === 'star5') {
			starRating = 5;
			document.getElementById('star-rating-input').innerHTML = `
        <span id='star1'>★</span> <span id='star2'>★</span> <span id='star3'>★</span> <span id='star4'>★</span> <span id='star5'>★</span>`;
		}
	}

	function displayReviews(e) {
		fetchReviews().then((res) =>
			res.forEach((review) => {
				if (review.recipe.id === i + 1) {
					let signed_in_user = parseInt(welcomeUser.dataset.id);
					let current_user = parseInt(review.user.id);

					if (review.rating === '1') review.rating = '★☆☆☆☆';
					else if (review.rating === '2') review.rating = '★★☆☆☆';
					else if (review.rating === '3') review.rating = '★★★☆☆';
					else if (review.rating === '4') review.rating = '★★★★☆';
					else if (review.rating === '5') review.rating = '★★★★★';

					if (current_user === signed_in_user) {
						reviewCard.innerHTML += `
            <div class='col-sm-6 my-3' id='review-${review.id}' data-id='${review.id}'>
              <div class='card text-left my-1'>
                <h3 id='show-review-title' class='card-header' data-id='${review.id}'>${review.title}</h3>
                  <div class='card-body' data-id='${review.id}'>
                    <span class='h5'>By: </span><span id='show-review-user' class='h5'>${review.user.name}</span><br><br>
                    <span id='show-review-description'>${review.description}</span><br><br>
                    <span id='show-review-rating' class='h5'>${review.rating}</span>
                      <br><br>
                    <button id='edit-btn' class="btn btn-success" data-id='${review.id}'>Edit Review</button>  <button id='delete-btn' class="btn btn-danger" data-id='${review.id}'>Delete Review</button>
                  </div>  
                <img id='show-review-photo' src='${review.photo}' class="card-img-top" data-id='${review.id}'/><br>
              </div>
            </div>`;
					} else {
						reviewCard.innerHTML += `
            <div class='col-sm-6 my-3' id='review-${review.id}' data-id='${review.id}'>
              <div class='card text-left my-1'>
                <h3 id='show-review-title' class='card-header' data-id='${review.id}'>${review.title}</h3>
                  <div class='card-body' data-id='${review.id}'>
                    <span class='h5'>By: </span><span id='show-review-user' class='h5'>${review.user.name}</span><br><br>
                    <span id='show-review-description'>${review.description}</span><br><br>
                    <span id='show-review-rating' class='h5'>${review.rating}</span>
                  </div>  
                <img id='show-review-photo' src='${review.photo}' class="card-img-top" data-id='${review.id}' /><br>
              </div>
            </div>`;
					}
				}
			})
		);
	}

	function handleDeleteOrEdit(e) {
		let reviewId = e.target.dataset.id;

		if (e.target.innerText === 'Delete Review') {
			let reviewToDelete = e.target.parentElement.parentElement;

			alert('Are you sure you want to delete?');

			fetch(URL + `reviews/${reviewId}`, {
				method: 'DELETE',
			});
			reviewToDelete.remove();
		} else if (e.target.innerText === 'Edit Review') {
			let reviewToEdit = e.target.parentElement;
			reviewToEdit.addEventListener('click', handleEditReviewFormClicks);
			reviewToEdit.addEventListener('submit', handleEditReviewFormSubmit);

			let reviewTitleToEdit =
				e.target.parentElement.parentElement.children[0].innerHTML;
			let reviewDescriptionToEdit =
				e.target.parentElement.children[4].innerHTML;
			let reviewPhotoToEdit =
				e.target.parentElement.parentElement.children[2].src;
			recipe_id = document.getElementById('recipe-name').dataset.id;

			reviewToEdit.innerHTML = `
        <div class='container text-left'>
          <div class="form">
            <div class='form-group'>
              <form id='edit-review-form' class="form-signin">
                <label for="title" class="h5">Title</label>
                  <input class="form-control" id='title' value="${reviewTitleToEdit}"><br>
                <label for="photo" class="h5">Photo URL</label>
                  <input class="form-control" id='photo' value='${reviewPhotoToEdit}'><br>
                <label for="description" class="h5">Review</label>
                  <input class="form-control" type='text-area' id='description' value="${reviewDescriptionToEdit}"><br>
                <div id='edit-star-rating-input' class="h3">
                  <span id='edit-star1'>☆</span> <span id='edit-star2'>☆</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>
                </div> <br>
                <input type="submit" id='edit-review-button' data-id="${reviewId}" class="btn btn-success">
              </form>
            </div>
          </div>
        </div>`;

			function handleEditReviewFormClicks(e) {
				selectedStar = e.target.id;
				if (selectedStar === 'edit-star1') {
					starRating = 1;
					document.getElementById(
						'edit-star-rating-input'
					).innerHTML = `
          <span id='edit-star1'>★</span> <span id='edit-star2'>☆</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`;
				} else if (selectedStar === 'edit-star2') {
					starRating = 2;
					document.getElementById(
						'edit-star-rating-input'
					).innerHTML = `
            <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>☆</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`;
				} else if (selectedStar === 'edit-star3') {
					starRating = 3;
					document.getElementById(
						'edit-star-rating-input'
					).innerHTML = `
            <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>☆</span> <span id='edit-star5'>☆</span>`;
				} else if (selectedStar === 'edit-star4') {
					starRating = 4;
					document.getElementById(
						'edit-star-rating-input'
					).innerHTML = `
            <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>★</span> <span id='edit-star5'>☆</span>`;
				} else if (selectedStar === 'edit-star5') {
					starRating = 5;
					document.getElementById(
						'edit-star-rating-input'
					).innerHTML = `
            <span id='edit-star1'>★</span> <span id='edit-star2'>★</span> <span id='edit-star3'>★</span> <span id='edit-star4'>★</span> <span id='edit-star5'>★</span>`;
				}
			}

			function handleEditReviewFormSubmit(e) {
				e.preventDefault();

				let reviewId =
					e.target.parentElement.parentNode.parentElement
						.parentElement.parentElement.children[0].dataset.id;
				let newReviewTitle =
					e.target.parentElement.children[0][0].value;
				let newReviewDescription =
					e.target.parentElement.children[0][2].value;
				let newReviewPhoto =
					e.target.parentElement.children[0][1].value;
				let newReviewRating = e.target.children[9].innerText;
				let signed_in_user = welcomeUser.dataset.id;
				recipe_id = document.getElementById('recipe-name').dataset.id;

				let reviewToEditId = document.getElementById(
					`review-${reviewId}`
				);

				let editReviewBody = {
					title: newReviewTitle,
					description: newReviewDescription,
					photo: newReviewPhoto,
					rating: newReviewRating,
					recipe_id: recipe_id,
					user_id: signed_in_user,
				};

				fetch(URL + `reviews/${reviewId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(editReviewBody),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.id == reviewToEditId.dataset.id) {
							reviewToEditId.innerHTML = `
              <div class='card text-left my-1'>
                <h3 id='show-review-title' class='card-header' data-id='${data.id}'>${data.title}</h3>
                  <div class='card-body' data-id='${data.id}'>
                    <span class='h5'>By: </span><span id='show-review-user' class='h5'>${data.user.name}</span><br><br>
                    <span id='show-review-description'>${data.description}</span><br><br>
                    <span id='show-review-rating' class='h5'>${data.rating}</span>
                      <br><br>
                    <button id='edit-btn' class="btn btn-success" data-id='${data.id}'>Edit Review</button>  <button id='delete-btn' class="btn btn-danger" data-id='${data.id}'>Delete Review</button>
                  </div>  
                <img id='show-review-photo' src='${data.photo}' class="card-img-top" data-id='${data.id}'/><br>
              </div>`;
						}
					});
			}
		}
	}

	// --- END --- //
});
