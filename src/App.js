//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';

function App() {

  const [foodName, setFoodName] = useState("");

  const [days, setDays] = useState(0);

  const[foodList, setFoodList] = useState([]);

  const[newFoodName, setNewFoodName] = useState('');

  //const [newDays, setNewDays] = useState();

  useEffect(() => {
    Axios.get("https://mighty-thicket-89142.herokuapp.com/read").then((response)=>{
      setFoodList(response.data);
    })
  }, [])
   
  const addToList = () =>{
    Axios.post("https://mighty-thicket-89142.herokuapp.com/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) =>{
    Axios.put("https://mighty-thicket-89142.herokuapp.com/update", {
      id:id,
      newFoodName: newFoodName,
      //newDays: newDays,
    });
  };

  const deleteFood = (id) =>{
    Axios.delete(`https://mighty-thicket-89142.herokuapp.com/delete/${id}`);
  };




  return (
    <React.Fragment>
    <div className="App">
    <h1> CRUD App with MERN</h1>
    <label>Food Name</label>
    <input type="text" onChange={(event) => {setFoodName(event.target.value)}}/>
    <label>Number of Days Since You Ate</label>
    <input type="number" onChange={(event) => {setDays(event.target.value)}}/>
    <button onClick={addToList}>Add to list</button>

    <h1>Food List</h1>

    {foodList.map((val,key) => {
      return(
        <div key={key} className="food">
      <h1>{val.foodName}</h1>
      <h1>{val.daysSinceIate}</h1>

      <input type="text" placeholder="New Food Name.." onChange={(event) => {setNewFoodName(event.target.value)}}/>
      
      <button onClick={()=> updateFood(val._id)}>Update</button>

     {/* <input type="number" placeholder="enter the no. of days" onChange={(event) => {setNewDays(event.target.value)}}/>
      <button onClick={()=> updateFood(val._id)}>Update</button>*/}

      
      <button onClick={()=> deleteFood(val._id)}>Delete</button>
      </div>
      );

    })}

    </div>
    </React.Fragment>
  );
}

export default App;
