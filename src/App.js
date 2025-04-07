// imports
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './app.css';
import '/recipe-share-backend/server.js';

function App() {
  //state of recipes
  const [recipe, setRecipe] = useState();



  return (
    <div className="App">
      <head>
        <h1>recipe Sharing</h1>
      </head>
      <main>
        
      </main>
    </div>
  );
}

export default App;
