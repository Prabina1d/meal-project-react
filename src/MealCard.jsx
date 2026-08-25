const MealCard = ({ meal }) => {
  return (
    <div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width="250"
      />

      <h2>{meal.strMeal}</h2>

      <p>Category: {meal.strCategory}</p>

      <p>Country: {meal.strArea}</p>
    </div>
  );
};

export default MealCard;