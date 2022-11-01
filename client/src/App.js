import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movie_name, set_movie_name] = useState("")
  const [movie_review, set_review] = useState("")
  const [new_review, set_new_review] = useState("")
  const [reviews_list, set_reviews_list] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      set_reviews_list(response.data)
    })
  }, []);

  const submit_review = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movie_name: movie_name, 
      movie_review: movie_review,
    });

    set_reviews_list([
      ...reviews_list, 
      { movie_name: movie_name, movie_review: movie_review }
    ]);
  };

  const delete_review = (movie) => {
    Axios.delete("http://localhost:3001/api/delete/", {data: {movie_name: movie}});
  };

  const update_review = (movie) => {
    Axios.put("http://localhost:3001/api/update/", {
      movie_name: movie,
      movie_review: new_review,
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
            <div className="card"> 
              <h3 key={val.id}>{val.movie_name}</h3>
              <p>{val.movie_review}</p>
              <button type="button" onClick={() => {delete_review(val.movie_name)}}>Delete</button>
              <input type="text" id="update-text" onChange={(e) => {
                set_new_review(e.target.value)
              }}/>
              <button type="button" onClick={() => {
                if (new_review.length > 0)
                update_review(val.movie_name)}
                }>Update</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
