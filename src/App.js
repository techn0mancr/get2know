import logo from './logo.svg';
import React, {component,useState,useEffect} from 'react'
import {BrowserRouter as Router, Switch,Link, Route} from 'react-router-dom';
import Home from './Home'
function App() {
  const [name,setName]= useState('');
  const [nameList,setnamesList]= useState([]);

  const updateName = e =>{
    setName(e.target.value);
  }

  const getName = e => {
    e.preventDefault();
    const newList = nameList.concat(name);
    setnamesList(newList);
    console.log(nameList);

    setName("");
  }

  const clearName = (nameToDelete) => {
    const newList = nameList;
    const index = newList.indexOf(nameToDelete);
    console.log(index);
    console.log(nameToDelete);
    console.log(newList);

    if (index > -1) {
      newList.splice(index, 1);
      setnamesList(newList);
    }
    console.log(nameList);
    return null;
  }

  return (
    <Router>
    <div className="App">
      <Route path="/" exact render={({match})=>(
         <Sidebar>
    <form onSubmit={getName}>
      <h1>Enter Name</h1>

      <input
        id="namesInput"
        type='text'
        value={name}
        onChange={updateName}
        placeholder='Enter Name'
        className='border-rounded py-2'
      />
      <button type='submit'>Send!</button>
    </form>

      {nameList&&(
            <div className="grid grid-col-5">
              {nameList.map(player =>(
                  <div key={player}>
                    <div>
                      <h1 className="styleas{player.color}">{player}</h1>
                    </div> 
                    <button onClick={() => clearName(player)}>Clear</button>
                  </div>
              ))}
            </div>
      )}

       </Sidebar>
      )}/>
          <Main>
          <Switch>
          <Route path="/" exact component={Home}/>

          </Switch>
          </Main>
    </div>
    </Router>
  );
}

const Sidebar = (props) => (
  <div style={{
      width:'33vw',
      height:'100vh',
      overflow:'auto',
      background:'#eee'
  }} {...props}/>
  
)
const Main = (props) => (
  <div style={{
      flex:1,
      height:'100vh-60px',
      overflow:'auto',
      background: '#ded3c9'
  }}>
    <div  {...props}/>
    </div>
)

export default App;
