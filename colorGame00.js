


function Square ({id, player, newState}) {
  const [color,setColor] = React.useState("red")
  const colors = ['#ffb147', "#ffb192", "red", "#5eb192"];
  const getRandomColor = () => colors[Math.floor(Math.random()*4)];
  
  React.useEffect (() => {
    console.log(`re-render square ${id}`);
    return () => console.log(`unmounted square ${id}`);

  })
  //bug in this return, check solution below
//   return (
//     <button  style={{color:"#ffffff"}} onClick={(e) => {
//       alert(`this is square ${id}`);
//       e.target.style.border= `10px solid ${color}`;
//       e.target.style.borderRadius= "0px";
//       return setColor(getRandomColor());
//     }}>{player}</button>
//   )
// }

// solution to  bug -delay of displayin a random color at setcolor  no calling the setcolor but instead a differet var col(instead color)
return (
<button  style={{color:"#ffffff"}} onClick={(e) => {
  alert(`this is square ${id}`);
  let col = getRandomColor();
  newState({id:id, color:col});
  e.target.style.border= `10px solid ${col}`;
  e.target.style.borderRadius= "0px";
  return setColor(col);
}}>{player}</button>
)
} 


const Board = (id) => {
  
  const [isMounted, setIsMounted] = React.useState(true);
  const [state, setState] = React.useState([])
  const [player, setPlayer] = React.useState(0);
  const [render, setRender] = React.useState(0);
  // const [xTurn, setXTurn] = React.useState(true);
  let status = `Player ${player}`;

  const newState = (obj) => {
    setState([...state, obj]);
    // A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().
    console.log(`setting newState ${JSON.stringify(obj)}`);
    console.log(`setting newState ${obj}`);
    console.log(`adding to state ${JSON.stringify(state)}`);
  }
    



  console.log(`unmounting square ${id}`);

  const reRender = () =>{ 
    return setRender(Math.random())};
    
  const toggle = (id) => {
     setIsMounted(!isMounted);
    return () => console.log(`unmounting square ${id}`);
  };
  // function handleOnClick () {

  //   if ( xTurn) {
  //     return setPlayer(1);
  //   } else {
  //     return setPlayer(0);
  //   }
  //   status = `Player ${player}`;
  //   setXTurn(!xTurn);

  // }

  function handleOnClick () {
    
    setPlayer((player + 1) % 2); //module of any number with 2will ether be 1 or 0
    status = `Player ${player}`;
  }

  function renderSquare(i) {
   
    return (
      <Square id={i} player={player} newState={newState}></Square>
    );
  }

  return (
    <div id="info">
        <h1>Turn of {status}</h1>
        <div>
        <button className="button-3" role="button" style={{color:"#ffffff"}} onClick={toggle}> <h4> Mounting/Unmounting Rows </h4> </button>
        </div>
        <div><button className="button-3" role="button" style={{color:"#ffffff"}} onClick={reRender}> <h3> Re-rendering </h3> </button>
        </div>
        
{/* changing setplayer re -render the player therefore will re-render also square componen, which is the child component and contains props pass from parent called player */}
        <div style={{whiteSpace: "pre-line"}} className="game-board" onClick={(e) => {
          handleOnClick();}}
          >
          <div className="grid-row">
          {isMounted && renderSquare(0)}
          {isMounted && renderSquare(1)}
          {isMounted && renderSquare(2)}
          </div>
          <div className="grid-row">
          {isMounted && renderSquare(3)}
          {isMounted && renderSquare(4)}
          {isMounted && renderSquare(5)}
          </div>
          <div className="grid-row">
          {isMounted && renderSquare(6)}
          {isMounted && renderSquare(7)}
          {isMounted && renderSquare(8)}
          </div>
          <div  className="grid-row">
          <div> <button className="button-3" role="button" style={{color:"#ffffff"}} onClick={toggle}> <h4> Mounting/Unmounting Rows </h4> </button></div>
          <div><button className="button-3" role="button" style={{color:"#ffffff"}} onClick={reRender}> <h4> Re-rendering </h4> </button>
          </div>
          </div>
        </div>
      </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
