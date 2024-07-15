document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      if (query.length > 2) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
          .then(response => response.json())
          .then(data => {
            searchResults.innerHTML = '';
            if (data.meals) {
              data.meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal', 'd-flex', 'align-items-center', 'mb-3');
                mealDiv.innerHTML = `
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img me-3">
                  <div>
                    <h3>${meal.strMeal}</h3>
                    <button class="btn btn-primary me-2" onclick="addToFavorites(${meal.idMeal})">Add to Favorites</button>
                    <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary">View Details</a>
                  </div>
                `;
                searchResults.appendChild(mealDiv);
              });
            } else {
              searchResults.innerHTML = '<p>No results found.</p>';
            }
          });
      } else {
        searchResults.innerHTML = '';
      }
    });
  
    loadFavorites();
  });
  
  function addToFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(mealId)) {
      favorites.push(mealId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    loadFavorites();
  }
  
  function loadFavorites() {
    const favoriteMealsContainer = document.getElementById('favorite-meals');
    favoriteMealsContainer.innerHTML = '';
    const favoriteMeals = JSON.parse(localStorage.getItem('favorites')) || [];
  
    favoriteMeals.forEach(mealId => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          const mealDiv = document.createElement('div');
          mealDiv.classList.add('meal', 'd-flex', 'align-items-center', 'mb-3');
          mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img me-3">
            <div>
              <h3>${meal.strMeal}</h3>
              <button class="btn btn-danger me-2" onclick="removeFromFavorites(${meal.idMeal})">Remove from Favorites</button>
              <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary">View Details</a>
            </div>
          `;
          favoriteMealsContainer.appendChild(mealDiv);
        });
    });
  }
  
  function removeFromFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== mealId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
  }
  