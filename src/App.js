import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/recipe`);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setError('Unexpected data format from server');
        }
      } catch (error) {
        console.error('Error fetching recipes', error);
        setError('Failed to load recipes. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimTitle = newRecipe.title.trim();
    const trimDescription = newRecipe.description.trim();
    if (trimTitle === '') {
      setFormError('You need to have a name for your recipe');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setFormError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/recipe`, {
        title: trimTitle,
        description: trimDescription,
      });
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
      setNewRecipe({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding recipe', error);
      setError(error.response?.data?.message || 'Failed to add recipe');
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
        ) : recipes.length === 0 ? (
          <p>No recipes yet. Add one!</p>
        ) : (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="add-card">
        {formError && <p className="error">{formError}</p>}
        <label htmlFor="recipe-title">Recipe Name</label>
        <input
          id="recipe-title"
          type="text"
          placeholder="Enter new recipe name"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          aria-label="New recipe name"
          disabled={isSubmitting}
        />
        <label htmlFor="recipe-description">Description</label>
        <textarea
          id="recipe-description"
          placeholder="Enter recipe description"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
          aria-label="Recipe description"
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