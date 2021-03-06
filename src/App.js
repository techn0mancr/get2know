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
  const [qListSize, setqListSize] = useState(3);
  const [timePerQuestion,setQTimer] = useState(30);
  const [numRounds,setNumRounds] = useState(3);
  const [appearedPairs,setAppearedPairs] = useState([]);
  const [pack,setPack]= useState('default');

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
     <div className="rectangle" style={{zIndex:2}}>
      <div style={{zIndex:1}}>
      <img src="star.png" className="star"/>
      <img src="squiggle.png" className="squiggle"/>
      <img src="eclipse.png" className="eclipse"/>
      </div>
      <div className="logo">
          <img src="get2know-logo.png" alt="get2know logo"/>
      </div>
        
      <div class="motto">
          <h1>Bringing people</h1>
          <h1>together.</h1>
      </div>
        
    <form class="entername" autoComplete="off" onSubmit={getName}>

      <input
        id="namesInput"
        type='text'
        value={name}
        onChange={updateName}
        placeholder='Enter Name'
        className='border-rounded py-2'
      />
      <p className="small">hit enter to add</p>
    </form>
        

      {nameList&&(
        <div className=" player-container">
            <ul className="grid grid-col-5">
              {nameList.map(player =>(
                  <li key={player}>
                    {player}
                    {/* <button onClick={(e) =>{clearName(player);handleClick(e);}}>Clear</button> */}
                  </li>
              ))}
            </ul>
            </div>
      )}<div className="start-container">
      <Link to={"/settings"}>
        
      		<p className="start">Settings &#8594;</p>
      </Link>
      <Link to={`/lobby`}>
          <p className="custom-start">Start Game &#8594;</p>
       
      </Link> 
 </div>
    </div>

       </Sidebar>
          )}/>
          <Route path="/settings" render={()=>(
            
            <div className="outer-container-custom">
              <img src="star3.png" className="custom-star"/>
              <img src="semicircle.png" className="custom-semicircle"/>
              <img src="ellipse.png" className="custom-ellipse"/>

              <div className="custom-logo">
                  <img src="get2know-logo.png" alt="get2know logo"/>
              </div>

              <div className="custom-container">
                <div className="custom-tagline">
                   <h1> Play it your way</h1>
                </div>

                <div className="custom-rectangle">
                <div className="custom-settings">
            <form onChange={setSettings}>
            <div className="table">
                <div>
                  <p className="setting-names">Time per question slider:</p>
                  <div><input value={timePerQuestion} onChange={setTimer}type="range"  name="timePerQuestion" min="5" max="61" step="1"/></div>
                  <div><span id="timeshow">30</span> Seconds</div>
                </div>
                <div>
                  <p className="setting-names">Number of rounds slider:</p>
                  <div><input value={numRounds} onChange={setRounds} type="range" name="numRounds" min="1" max="11" step="1"/></div>
                  <div><span id="roundshow">3</span> Rounds</div>
                </div>
                <div>
                <p className="setting-names">Question pack dropdown:</p>
                <div>
                <select id="questionPackName" name="questionPackName">
                  <option value="icebreakers">Icebreakers</option>
                  <option value="nsfw">NSFW</option>
                </select>
                </div>
              </div>
            </div>  
            </form>
            </div>
            </div>
            </div>

            <Link to={`/lobby`}>
              <div className="start-container">
                <p className="custom-start" onClick={(e) =>{newRound();getQuestion()}}>Start Game &#8594;</p>
              </div>
            </Link> 

            </div>
          )}/>
          <Route path="/round:id" render={()=>(
            <div>
              <Link to={`/lobby`}>
            <button onClick={(e)=>resetRounds()}>back to lobbyu</button>
            </Link> 
              <h1>Round {currentRound-1}</h1>
              <h1 id="questionHolder" style={{fontSize:'6.5vw', color:'white'}}>enter question</h1>
              <br/>
              <h3 id="personHolder" style={{fontSize:'4.5vw', color:'white'}}>name</h3>
              <Link to={`/round${currentRound}`}>
            <button onClick={(e) =>{newRound();getQuestion()}}>next round!</button>
            </Link> 
            </div>
          )}/>
          <Route path="/lobby" render={()=>(
          <div className="activity-container">
          <img src="polygon.png" className="activity-polygon"/>
          <img src="star2.png" className="activity-star"/>
          <img src="squiggle.png" className="activity-squiggle"/>
          <div className="activity-logo">
              <img src="get2know-logo.png" alt="get2know logo"/>
          </div>
          <div className="activity-header">
              <h1>So...whatcha wanna do?</h1>
          </div>
  
            <div className="activity-topics">
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("default")}} className="activity-rectangle" id="box1"><img src="box.png"/></div>
                        <p className="activity-content">Break the ice</p>
                        </Link>
                    </div>
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("class")}} className="activity-rectangle" id="box3"><img src="bell.png"/></div>
                        <p className="activity-content">Class is in session</p>
                        </Link>
                    </div>
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("romance")}} className="activity-rectangle" id="box2"><img src="flower.png"/></div>
                        <p className="activity-content">Budding romance &#128563;</p>
                        </Link>
                    </div>
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("more")}} className="activity-rectangle" id="box4"><img src="file.png"/></div>
                        <p className="activity-content">More packs</p>
                        </Link>
                    </div>
            </div>
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
      overflow:'auto'
  }} {...props}/>
  
)
const Main = (props) => (
  <div style={{
      flex:1,
      height:'100vh-60px',
      overflow:'auto',
      margin: 0,
      fontFamily: "Poppins",
      background: '#131313',
      height: "100vh",
      textAlign: "center",
  }}>
    <div  {...props}/>
    </div>
)

export default App;
