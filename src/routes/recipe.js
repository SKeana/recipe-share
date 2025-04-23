const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /api/recipe - Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error while fetching recipes' });
  }
});

// POST /api/recipe - Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Recipe title is required' });
    }
    const recipe = new Recipe({ title, description });
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error while creating recipe' });
  }
});

module.exports = router;