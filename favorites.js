document.addEventListener('DOMContentLoaded', () => {
    const favoriteMeals = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteMealsContainer = document.getElementById('favorite-meals');
  
    favoriteMeals.forEach(mealId => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          const mealDiv = document.createElement('div');
          mealDiv.classList.add('meal');
          mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <button class="btn btn-danger" onclick="remove(${meal.idMeal})">Remove</button>
            <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary">View Details</a>
          `;
          favoriteMealsContainer.appendChild(mealDiv);
        });
    });
  });
  
  function removeFromFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== mealId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload();
  }
  