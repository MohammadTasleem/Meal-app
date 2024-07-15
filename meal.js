document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get('id');
  
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        document.getElementById('meal-title').textContent = meal.strMeal;
        document.getElementById('meal-image').src = meal.strMealThumb;
        document.getElementById('meal-instructions').textContent = meal.strInstructions;
      });
  });
  