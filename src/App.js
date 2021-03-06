import logo from './logo.svg';
import React, {component,useState,useEffect} from 'react'
import {BrowserRouter as Router, Switch,Link, Route, Redirect,useHistory} from 'react-router-dom';
import FadeInAnimation from "./FadeAni"
function App() {
  
  const normalList = [
    "What is your favourite color, that is also a smell?",
    "Do you have any pets?</p><p>A gold fish counts&#128032;",
    "What is your favorite</p><p>midnight snack?&#127868;&#127831;&#127829;",
    "What is your most used emoji&#128514;&#128536;&#128526;?",
    "&#128094;&#128095;&#128096;&#128098;</p><p>How many pairs of shoes do you own?",
    "What household &#10024;chore&#10024;<p><p>do you actually enjoy doing?",
    "What is your favourite season?&#127793;&#9924;",
    "What is your favourite</p><p>TV show/series?&#128250;&#127871;",
    "If you had to delete all but</p><p>3 apps from yoursmartphone&#128241;,</p><p>which ones would you keep?",
    "Once we can travel the world again,</p><p> where would you go for</p><p>your dream vacation?&#127940;&#127796;"
  ];
const romanceList = [
    "Will you &#10024;relocate&#10024;</p><p>for &#10024;love&#10024;?",
    "What qualities do you look for in a partner?&#128129;",
    "Have you ever been in love?&#128145;",
    "What is your ideal date?&#127871;&#128250;",
    "How many people have you dated?",
    "Are you fine with</p><p>&#127757;long distance relationships&#127759;",
    "What are your thoughts on PDA?&#128143;",
    "What is your love&#128152; language?",
    "What is your most treasured</p><p>memory?&#128173;",
    "What roles do love&#128149; and</p><p>affection&#128139; play in your life?"
  ];
const classList = [
    "What are you majoring in,</p><p>or thinking of majoring in?",
    "What are your favourite subjects?&#128175;",
    "Which university do you go to?    &#127890;",
    "Do you enjoy more theory&#128217; </p><p>or practical&#128296; study?",
    "What are your academic goals?&#128161;&#128170;",
    "How often do you study?&#129299;",
    "Do you try to be organised?",
    "Do you procrastinate?&#128544;",
    "Do you prefer learning from memory&#128173;</p><p>or understanding&#129504?",
    "Do you prefer to study with tech or sticks?"
  ];
const deepList = [
  "Is there such a thing as a</p><p>&#10024;perfect&#10024; life?",
  "What are your biggest fears in life?",
  "Do you think acts of</p><p>kindness have a motive?&#129297;",
  "Do you believe that there</p><p>is a being of higher power?&#128519;",
  "Do you believe</p><p>in &#128123;reincarnation&#128118;?",
  "Do you believe in aliens?&#128640;&#128125;",
  "What is your purpose in life&#128563;, if any&#128561;?",
  "Was there ever an event</p><p>that was a turning point</p><p>in your life?",
  "Are humans obligated to better themselves</p><p>and will that make them happier?",
  "Do we love ourselves more</p><p>in the virtual world    &#128126;</p><p>and less in the real world?&#127804;",
  "When was the last time you genuinely cried?    &#128557;"
];
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
    setTotalQues(0);
    setFinish(0);
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
        <FadeInAnimation wrapperElement="h1" direction="down">
          Bringing people<br/>
          together.
          </FadeInAnimation>
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
        <FadeInAnimation wrapperElement="div" direction="left" delay="0.4">
      <p className="small">hit enter to add</p>
      </FadeInAnimation>
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
        <FadeInAnimation wrapperElement="div" direction="left" delay="0.3">
      <Link to={"/settings"}>
        
      		<p className="start">Settings &#8594;</p>
      </Link>
      
      </FadeInAnimation>
      <FadeInAnimation wrapperElement="div" direction="left" delay="0.5">
      <Link to={`/lobby`}>
          <p className="custom-start">Start Game &#8594;</p>
       
      </Link> 
      
      
      </FadeInAnimation>
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
              <FadeInAnimation wrapperElement="div" direction="left" delay="0.8" distance="50">
                <div className="custom-tagline">
                <FadeInAnimation wrapperElement="div" direction="up" delay="1.2" distance="50">
                   <h1> Play it your way</h1>
                   </FadeInAnimation>
                </div>
                </FadeInAnimation>
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
              </div>
            </div>  
            </form>
            </div>
            </div>
            </div>
            <FadeInAnimation wrapperElement="div" direction="left" delay="0.5" >
            <Link to={`/lobby`}>
              <div className="start-container">
                <p className="custom-start">Start Game &#8594;</p>
              </div>
            </Link> 
</FadeInAnimation>
            </div>
          )}/>
          <Route path="/round:id" render={()=>(

            <div class="ingame-container">
                <div class="ingame-question-container">
                    <FadeInAnimation wrapperElement="div" direction="left" delay="0.1" distance="150">
                    <h1 class="ingame-greeting">
                        Hey, <span class = "ingame-name" id="personHolder">Lets Begin</span>!
                    </h1>
                    </FadeInAnimation>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="0.5" distance="50">
                    <p id="questionHolder"></p>
                    </FadeInAnimation>
                </div>
                <div class="ingame-order-container">
                <FadeInAnimation wrapperElement="div" direction="up" delay="0.5" distance="50">
                    <div class="ingame-left">
                        <p>Round {currentRound}</p>
                    </div>
                    </FadeInAnimation>
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
          {/* <img src="polygon.png" className="activity-polygon"/>
          <img src="star2.png" className="activity-star"/>
          <img src="squiggle.png" className="activity-squiggle"/> */}
          <div className="activity-logo">
              <img src="get2know-logo.png" alt="get2know logo"/>
          </div>
          <FadeInAnimation wrapperElement="div" direction="left" delay="0.4" distance="50">
          <div className="activity-header">
              <h1>So...whatcha wanna do?</h1>
          </div>
          </FadeInAnimation>
  
            <div className="activity-topics">
                    <FadeInAnimation wrapperElement="div" direction="left" delay="0.8" distance="50">
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("default")}} className="activity-rectangle" id="box1"><img src="box.png"/></div>
                        <p className="activity-content">Break the ice</p>
                        </Link>
                    </div>
                    </FadeInAnimation>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="1.6" distance="50">
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("class")}} className="activity-rectangle" id="box3"><img src="bell.png"/></div>
                        <p className="activity-content">Class is in session</p>
                        </Link>
                    </div>
                    </FadeInAnimation>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="1.2" distance="50">
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("romance")}} className="activity-rectangle" id="box2"><img src="flower.png"/></div>
                        <p className="activity-content">Budding romance &#128563;</p>
                        </Link>
                    </div>
                    </FadeInAnimation>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="2" distance="50">
                    <div className="activity-topic">
                    <Link to={`/round1`}>
                        <div onClick={(e) =>{newRound();setPack("deep")}} className="activity-rectangle" id="box4"><img src="file.png"/></div>
                        <p className="activity-content">Very Deep</p>
                        </Link>
                    </div>
                    </FadeInAnimation>
            </div>
      </div>  
          )}/>
          <Route path="/end" render={()=>(
          <div className="ingame-container">
                <div className="ingame-question-container">
                    <br/><br/><br/>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="0.2" distance="150">
                    <p>Thanks for playing!&#127881;</p>
                    </FadeInAnimation>
                    <FadeInAnimation wrapperElement="div" direction="left" delay="0.4" distance="150">
                    <p>We hope you had as much fun</p>
                    <p>as we did.</p>
                    </FadeInAnimation>
                </div>
                <div className="ingame-order-container">
             
                    <div className="ingame-right">   <FadeInAnimation wrapperElement="div" direction="up" delay="0.8" distance="50">
                        <Link to="/lobby">
                            <button onClick={resetRounds}>Play again</button>
                        </Link>
                    </FadeInAnimation>
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
