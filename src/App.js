// imports
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import { set } from 'date-fns';
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimTitle = newRecipeTitle.trim();
    if (trimTitle === "") {
      alert('You need to have a name for your recipe')
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/recipe`,{
        title:trimTitle
      });
      const newlyCreatedRecipe = response.data;
      setRecipe(prevRecipe => [...prevRecipe,newlyCreatedRecipe]);
      setNewRecipeTitle(''); 
    } catch (error) {
      console.error('There been an error adding a new recipe', error);
      setError(error.response?.data?.message || 'Failed to add recipe');
    } finally {
      setIsSubmitting(false);
    }
  };


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