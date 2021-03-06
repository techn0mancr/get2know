import logo from './logo.svg';
import React, {component,useState,useEffect} from 'react'
import {BrowserRouter as Router, Switch,Link, Route, Redirect,useHistory} from 'react-router-dom';
import Home from './Home'
function App() {
  const normalList = ["how are you","Do you consider yourself an introvert or an extrovert?","do you want a pet?","what do you do in your spare time", "What is your fav food?","do you have a job","have you played any instruments", "Do you play any sports","What is your favourite tv show/series", "What is your background"];
  const romanceList = ["will you relocate for love?","what qualities do you look for in a partner","Have you ever been in love?","What is your ideal date?","How many people have you dated?","superirior or inferior?","Are you fine with Long Distance","What are your thoughts on PDA","What is your love language?","What is your favourite romantic memory?"]
  const classList = ["What are you majoring/studying", "What are your favourite subjects","What university do you go to?","Do you enjoy more theory or practical","What are your educational goals","How often do you study?","Do you try to be organised","Do you procrastinate? >:(", "Do you use memory or understanding?","Do you prefer to study with tech or sticks?"]
  const deepList = ["Do you believe in fate or destiny?","what are your biggest fears in life?", "what is your biggest regret in life","what god do you believe in","Do you believe in reincarnation?","Do you believe in aliens", "What is your purpose in life","what event changed you the most","what is your biggest insecurity","When was the last time you genuinely cried"]

  const [finishline,setFinish]=useState(0);

  const [name,setName]= useState('');
  const [nameList,setnamesList]= useState([]);
  const [currentRound,setcurrentRound]= useState(0);
  const [pListSize, setpListSize] = useState(0);
  const [qListSize, setqListSize] = useState(10);
  const [timePerQuestion,setQTimer] = useState(30);
  const [numRounds,setNumRounds] = useState(3);
  const [appearedPairs,setAppearedPairs] = useState([]);
  const [pack,setPack]= useState('default');
  const [totalques,setTotalQues] = useState(0);


  const resetRounds = () =>{
    setcurrentRound(0);
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
    //var newRoundnum = currentRound + 1;
    //setcurrentRound(newRoundnum);
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
    // if (currentRound >= numRounds) return <Redirect to="/end"/>
    var currentIndexPair = generateIndexPair(pListSize, qListSize, appearedPairs);
    const newpair = appearedPairs.concat(currentIndexPair);
    setAppearedPairs(newpair);
    console.log(nameList);
    console.log("question#"+currentIndexPair.qIndex);
    console.log("player#"+currentIndexPair.pIndex);
    console.log("current round"+currentRound);
    var output = document.getElementById("questionHolder");
    console.log(output);
    const ques=totalques+1;
    setTotalQues(ques);
    //list selector
    if (pack==="default"){
      output.innerHTML = normalList[currentIndexPair.qIndex];
    } else if (pack==="class"){
      output.innerHTML = classList[currentIndexPair.qIndex];
    } else if (pack==="romance"){
      output.innerHTML = romanceList[currentIndexPair.qIndex];
    } else if (pack==="deep"){
      output.innerHTML = deepList[currentIndexPair.qIndex];
    }
    


    var outputr = document.getElementById("personHolder");
    outputr.innerHTML = nameList[currentIndexPair.pIndex];

    {/* <show user[currentIndexPair.pIndex] the question[currentIndexPair.qIndex]>
    <start counting down until timePerRound expires, then kick the user to the next question> */}
  }

  function HomeButton() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/end");
    }
  
    return (
      <Redirect to="/end/" />
    );
  }

  let generateIndexPair = (pListSize, qListSize, pqIndexPairs) => {
    // Clear the index pairs array if all the player-question combinations
    // have been exhausted
    if (pqIndexPairs.length >= pListSize*qListSize) {
        pqIndexPairs.length = 0;
    }

    let isDupQ, pi, qi;
    let isAsked = [];
    let numPlayersAsked = pqIndexPairs.length % pListSize;
    let numPlayersUnasked = pListSize - numPlayersAsked;
    let candidatePI = [];
    if (numPlayersAsked === 0) {
      setcurrentRound(currentRound + 1);
  }

    // Figure out who has been asked this round
    for (let i = 0; i < pListSize; i++) {
        isAsked.push(false);
    }
    for (let i = 0; i < numPlayersAsked; i++) {
        isAsked[pqIndexPairs[pqIndexPairs.length-1-i].pIndex] = true;
    }
    
    // Make an array consisting of who has not been asked this round
    for (let i = 0; i < pListSize; i++) {
        if (!isAsked[i]) {
            candidatePI.push(i);
        }
    }

    // Choose a random player from that array
    pi = candidatePI[Math.floor(Math.random() * numPlayersUnasked)];
    do {
        // Pick random indices for the question
        qi = Math.floor(Math.random() * qListSize);
        
        // Check for duplicate question
        isDupQ = false;
        for (let pqIndexPair of pqIndexPairs) {
            if (pqIndexPair.pIndex === pi && pqIndexPair.qIndex === qi) {
                // Is a duplicate question
                isDupQ = true;
                break;
            }
        }
    } while (isDupQ)

    return {pIndex: pi, qIndex: qi};
}

let link=`/round${currentRound}`;
if ((totalques) >= (numRounds*pListSize)){
  console.log("Finishlineincoming");
//   setFinish(1)

// } else if ((finishline==1)&&(currentRound >= numRounds)){
  link="/end";
}
console.log("total ques"+totalques);
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
      <img src="squiggle.png" className="squiggleone"/>
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
                <p className="custom-start">Start Game &#8594;</p>
              </div>
            </Link> 

            </div>
          )}/>
          <Route path="/round:id" render={()=>(

            <div class="ingame-container">
                <div class="ingame-question-container">
                    <h1 class="ingame-greeting">
                        Hey, <span class = "ingame-name" id="personHolder">Lets Begin</span>!
                    </h1>
                    <p id="questionHolder"></p>
                </div>
                <div class="ingame-order-container">
                    <div class="ingame-left">
                        <p>Round {currentRound}</p>
                    </div>
                    <div class="ingame-right">
                        <Link to={link}>
                            <button onClick={(e) =>{newRound();getQuestion()}}>next question</button>
                        </Link>
                    </div>
                </div>
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
                        <div onClick={(e) =>{newRound();setPack("deep")}} className="activity-rectangle" id="box4"><img src="file.png"/></div>
                        <p className="activity-content">Very Deep</p>
                        </Link>
                    </div>
            </div>
      </div>  
          )}/>
          <Route path="/end" component={Home}/>
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
