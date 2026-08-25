import { useEffect, useState } from "react";
import "./App.css";
import MealCard from "./MealCard";

const App = () => {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMeals = async (mealName) => {
    if (!mealName.trim()) {
      setError("Please enter a meal name");
      setMeals([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
      );

      const data = await response.json();

      if (!data.meals) {
        setError("No meals found");
        setMeals([]);
      } else {
        setMeals(data.meals);
      }
    } catch (error) {
      setError("Something went wrong!");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMeals("chicken");
  }, []);

  return (
    <div>
      <h1>Meal Finder</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchMeals(search);
        }}
      >
        <input
          type="text"
          placeholder="Search Meal...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <div>
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
          />
        ))}
      </div>

      <p>You searched: {search}</p>
    </div>
  );
};

export default App;