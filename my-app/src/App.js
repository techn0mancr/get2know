import logo from './logo.svg';
import React, {component,useState,useEffect} from 'react'
import {BrowserRouter as Router, Switch,Link, Route} from 'react-router-dom';
import Home from './Home'
function App() {
  const qlist = ["how are you","what is your favourite color","do you want a pet?"];
  const [name,setName]= useState('');
  const [nameList,setnamesList]= useState([]);
  const [currentRound,setcurrentRound]= useState(1);
  const [pListSize, setpListSize] = useState(0);
  const [qListSize, setqListSize] = useState(2);
  const [timePerQuestion,setQTimer] = useState(15);
  const [numRounds,setNumRounds] = useState(10);
  const [appearedPairs,setAppearedPairs] = useState([]);
  
  const resetRounds = () =>{
    setcurrentRound(1);
    setAppearedPairs([]);
  }
  const setTimer = e =>{
    setQTimer(e.target.value);
  }

  const setRounds = e =>{
    setNumRounds(e.target.value)
  }

  const updateName = e =>{
    setName(e.target.value);
  }

  const getName = e => {
    e.preventDefault();
    const newList = nameList.concat(name);
    setnamesList(newList);
    console.log(nameList);
    const psize = pListSize+1;
    setpListSize(psize);
    setName("");
  }
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
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


  const newRound = () =>{
    var newRoundnum = currentRound + 1;
    setcurrentRound(newRoundnum);
    console.log("current round:" +currentRound)
    console.log("player count:" +pListSize);
    console.log("question count:" +qListSize);
    console.log("time per ques:" +timePerQuestion);
    console.log("maxrounds:"+numRounds);
    return null;
  }
  const setSettings = () =>{
    var slider = document.getElementById("timePerQuestion");;
    var output = document.getElementById("timeshow");
    output.innerHTML = timePerQuestion; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)


    var sliderr = document.getElementById("numRounds");
    var outputr = document.getElementById("roundshow");
    outputr.innerHTML = numRounds;
    // Update the current slider value (each time you drag the slider handle)
    
  }


  
  const getQuestion = () =>{
    var currentIndexPair = generateIndexPair(pListSize, qListSize, appearedPairs)
    const newpair = appearedPairs.concat(currentIndexPair);
    setAppearedPairs(newpair);
    console.log(currentIndexPair.qIndex);
    console.log(currentIndexPair.pIndex);
    console.log(qlist);
    var output = document.getElementById("questionHolder");
    console.log(output);
    output.innerHTML = qlist[currentIndexPair.qIndex];

    var outputr = document.getElementById("personHolder");
    outputr.innerHTML = nameList[currentIndexPair.pIndex];

    {/* <show user[currentIndexPair.pIndex] the question[currentIndexPair.qIndex]>
    <start counting down until timePerRound expires, then kick the user to the next question> */}
  }

  let generateIndexPair = (pListSize, qListSize, pqIndexPairs) => {
    let isDuplicate = true, pi, qi, newPair;
    while (isDuplicate) {
        // Pick random indices for the player and question
        pi = Math.floor(Math.random() * pListSize);
        qi = Math.floor(Math.random() * qListSize);
        
        // Check for duplicate pairing
        isDuplicate = false;
        for (let pqIndexPair of pqIndexPairs) {
            if (pqIndexPair.pIndex === pi && pqIndexPair.qIndex === qi) {
                // Is a duplicate pairing
                isDuplicate = true;
                break;
            }
        }
    }

    // Not a duplicate pairing
    newPair = {pIndex: pi, qIndex: qi};
    pqIndexPairs.push(newPair);
    return newPair;
}



  return (
    <Router>
    <div className="App">
          <Main>
          <Switch>
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
      <Link to={"/lobby"}>
      <button>Begin Game!</button>
      </Link>
      {nameList&&(
            <ul className="grid grid-col-5">
              {nameList.map(player =>(
                  <li key={player}>
                    <div>
                      <h1 className="styleas{player.color}">{player}</h1>
                    </div> 
                    <button onClick={(e) =>{clearName(player);handleClick(e);}}>Clear</button>
                  </li>
              ))}
            </ul>
      )}

       </Sidebar>
          )}/>
          <Route path="/lobby" render={()=>(
            
            <div>
              <h1>whatchu wanna do</h1>
            <form onChange={setSettings}>
            <table>
                <tr>
                  <td>Time per question slider:</td>
                  <td><input value={timePerQuestion} onChange={setTimer}type="range"  name="timePerQuestion" min="5" max="60" step="1"/></td>
                  <td><span id="timeshow">15</span> Seconds</td>
                </tr>
                <tr>
                  <td>Number of rounds slider:</td>
                  <td><input value={numRounds} onChange={setRounds} type="range" name="numRounds" min="1" max="50" step="1"/></td>
                  <td><span id="roundshow">10</span> Rounds</td>
                </tr>
                <tr>
                  <td>Question pack dropdown:</td>
                  <td>
                  <select id="questionPackName" name="questionPackName">
                    <option value="icebreakers">Icebreakers</option>
                    <option value="nsfw">NSFW</option>
                  </select>
                  </td>
                </tr>
            </table>  
            </form>
            <Link to={`/round1`}>
            <button onClick={(e) =>{newRound();getQuestion()}}>Begin Game!</button>
            </Link> 
            </div>
          )}/>
          <Route path="/round:id" render={()=>(
            <div>
              <Link to={`/lobby`}>
            <button onClick={(e)=>resetRounds()}>back to lobbyu</button>
            </Link> 
              <h1>Round {currentRound-1}</h1>
              <h1 id="questionHolder">enter question</h1>
              <br/>
              <h3 id="personHolder">name</h3>
              <Link to={`/round${currentRound}`}>
            <button onClick={(e) =>{newRound();getQuestion()}}>next round!</button>
            </Link> 
            </div>
          )}/>
          </Switch>
          </Main>
    </div>
    </Router>
  );
}

const Sidebar = (props) => (
  <div style={{
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
