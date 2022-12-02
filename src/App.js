import './App.css';
import './index';
import { useState } from "react";
import { Form } from "react-bootstrap";
import { movieData } from "./components/tiles.js"
import { Time } from './components/Time';
import { FormControlLabel, Checkbox } from '@mui/material';


function App() {

  

  movieData.forEach((item) => {
    item.image = item.image;
  });

  const [toWatch, setToWatch] = useState([])
  const [totalTime, setTime] = useState([])
  const [sort, setSort] = useState(false)
  const [filters, setFilters] = useState([])
  const [movies, setMovies] = useState([...movieData])
  const [preSort, setPreSort] = useState([...movies]);
  const [original, setOriginal] = useState([...movieData]);
 
  const filterItems = (input) => {
    if(!filters.includes(input)){
    let f = [...filters,input];
    f.forEach(element => {
      const newMovies = movies.filter((item) => {
        if (item.genre.includes(element)) {
          return true; 
        }
        else{
          return false; 
        }
      })
      setMovies(newMovies);
    })
  setFilters([...f]);
  }
}
//Adjusting for time
  const items = toWatch.map(item =>
    <li key={item.id}>
      {item.name} : {item.time} minutes
    </li>
  
)

const updateTime = () => {
  setTime([toWatch.reduce((partialSum, item) => partialSum + item.time, 0)]);
}  

const addTime = (item) => {
  const existingItem = toWatch.find(i => i.name === item.name)
  if (!existingItem) {
    setToWatch(oldTime => [...oldTime, item])
  } 
}

const removeTime = (item) => {
  const existingItem = toWatch.find(i => i.name === item.name)
  if (existingItem) {
    var index = toWatch.indexOf(existingItem)
    if(index >= 0) {
      toWatch.splice(index, 1);
    }
  } 
}

const sortedData = () => {
  if(!sort){
    setPreSort([...movies]);
    const g = movies.sort((a, b) =>{
    if(a.rating > b.rating){
      return -1; 
    }
    else if (a.rating < b.rating){
      return 1; 
    }
    else{
      return 0; 
    }
  })
    setSort(true); 
    setMovies(g)
  }else{ 
    setSort(false); 
    setMovies([...preSort]); 
  }

} 

const reset = () => {
  setMovies([...original])
  setSort(false)
  setFilters([])
  setToWatch([])
}
const resetFilters = () => {
  setMovies([...movieData])
  setFilters([])
  setSort(false)
}

  return (
    <div className="App">
      <h1>Your Curated Movie Playlist</h1>
      <div className="header">
        <div className="filterBar">
          <h2>Sort:</h2>
          <button onClick={sortedData}>Rating</button>
          <h2>Filters:</h2>
          <h5>{filters}</h5>
          <h4>Genres</h4>
          <button onClick={() => filterItems("Horror")}>Horror</button>
          <button onClick={() => filterItems("SciFi")}>SciFi</button>
          <button onClick={() => filterItems("Romance")}>Romance</button>
          <button onClick={() => filterItems("Musical")}>Musical</button>
          <button onClick={() => filterItems("Drama")}>Drama</button>
          <button onClick={() => filterItems("Action")}>Action</button>
          <button onClick={() => filterItems("Comedy")}>Comedy</button>
          <button onClick={() => filterItems("Fantasy")}>Fantasy</button>
          <h4>Rating</h4>
          <button onClick={() => filterItems("5")}> 5</button>
          <button onClick={() => filterItems("4")}>4</button>
          <button onClick={() => filterItems("3")}>3 </button>
          <button onClick={() => filterItems("2")}>2</button>
          <button onClick={() => filterItems("1")}>1</button>
          <br></br> <br></br>
          <button onClick ={resetFilters}>Reset Filters</button>
          <button onClick ={reset}>Reset Page</button>
        </div>
      
      {/* TODO: personalize your bakery (if you want) */}

      <div className="grid_container">
        <div className="movies_container">
          {movies.map((item, index) => (
            < Time data={item} id={index} onUpdateTime={updateTime} onAddToWatch={addTime} onRemoveToWatch={removeTime}  />
          ))}
        </div>
      </div>
      </div>
      <div className="agg">
          <h2>Movies to Watch</h2>
          <p>{items}</p>
          <p>{totalTime} minutes of movie to watch!</p>
      </div>

    </div>
    );
}



export default App;
