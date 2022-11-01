import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movie_name, set_movie_name] = useState('')
  const [movie_review, set_review] = useState('')
  const [reviews_list, set_reviews_list] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) =>{
      set_reviews_list(response.data)
    })
  }, []);

  const submit_review = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movie_name: movie_name, 
      movie_review: movie_review,
    }).then(() => {
      alert('successful insert');
    });
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {
          set_movie_name(e.target.value)
        }}/>
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => {
          set_review(e.target.value)
        }}/>
        <button type="button" onClick={submit_review}>Submit</button>
        {reviews_list.map((val) =>{
          return (
            <h1 key={val.id}>
              Movie Name: {val.movie_name} | Review: {val.movie_review}
            </h1>
          )
        })}
      </div>
    </div>
  );
}

export default App;
