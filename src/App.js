// imports
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

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


  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/recipe`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipes", error);
        setError("Failed to load recipe. Is the backend running?")
      } finally{
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, []);
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
          title: trimTitle,
        });
        const newlyCreatedRecipe = response.data;
        setRecipe(prevRecipe => [...prevRecipe,newlyCreatedRecipe]);
        setNewRecipeTitle(''); 
      } catch (error) {
        console.error('There was an error adding a new recipe', error);
        setError(error.response?.data?.message || 'Failed to load recipes');
      } finally {
        setIsSubmitting(false);
      }
    };
  

    return (
      <div className="App">
        <h1>Recipe Sharing Community</h1>
        <div className="recipe-container">
          {isLoading ? (
            <p>Loading recipes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : recipe.length === 0 ? (
            <p>No recipes yet. Add one!</p>
          ) : (
            recipe.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="add-card">
          <input
            type="text"
            placeholder="Enter new recipe name"
            value={newRecipeTitle}
            onChange={(e) => setNewRecipeTitle(e.target.value)}
            aria-label="New recipe name"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Recipe'}
          </button>
        </form>
      </div>
    );
  }
  
  export default App;