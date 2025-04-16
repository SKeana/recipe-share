// imports
import React, {useState, useEffect} from 'react';
//import axios from 'axios'
import './App.css';
//import '/recipe-share-backend/server.js';

function App() {
  //state of recipes
  const [recipe, setRecipe] = useState([]);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);


  const recipes = [
    { id: 1, title: "Spaghetti Carbonara", description: "Creamy pasta with bacon and cheese." },
    { id: 2, title: "Chicken Curry", description: "Spicy and flavorful chicken stew." },
    { id: 3, title: "Chocolate Cake", description: "Rich and moist dessert." },
  ];



  return (
    <div className="App">
      <h1>Recipe Sharing Community</h1>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
      <div className="add-card">
        <form>+ Add Recipe</form>
      </div>
    </div>
  );
}

export default App;