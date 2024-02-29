// import checkOfWinner from "./checkWinner";

const checkOfWinner= (state) => {
  const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

  for (let i = 0; i < win.length; i++) {
      //deconstruction
      const [a, b, c] = win[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
};


const Square = ({id, newState}) => {
  const [color,setColor] = React.useState("red")
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];

  const colores = ['#ffb147', "#5eb192"];
  
  React.useEffect (() => {
    console.log(`Render square ${id}`);
    return () => console.log(`unmounted square ${id}`);

  });
// bug -delay of displayin a random color at setcolor  no calling the setcolor but instead a differet var col(instead color)
return (
<button  style={{color:"#ffffff"}} onClick={(e) => {
  let col = colores[newState(id)];
  setColor(col);
  let nextPlayer = newState(id);
  setStatus(nextPlayer);  
  e.target.style.border= `10px solid ${col}`;
  e.target.style.borderRadius= "10px";
  
}}
>
  {XorO[status]}
</button>
);
};

const Board = () => {
  const [isMounted, setIsMounted] = React.useState(true);
  const [state, setState] = React.useState(Array(9).fill(null));
  const [player, setPlayer] = React.useState(1);
  

  let status = `Player ${player}`;
  let winner = checkOfWinner(state);
  if(winner != null) status = `Player ${winner} wins`;

  const newState = idOfSquare => {
    //is this the player from the begining ? const [player, setPlayer] = React.useState(1);
    let presentPlayer = player;
    state[idOfSquare] = player; //present player
    setState(state); //state is an arrayof o or x or null

    let nextPlayer = (player + 1) % 2; //module of any number with 2will ether be 1 or 0
    setPlayer(nextPlayer);
  
    //i guess i return a variable if i want to no lose it wht the scope finishes , on the otherside for set state variable you dont need to reetunr becasue they keep updated automaticly?
    return presentPlayer;
    };

  let reset = () => setState(Array(9).fill(null));
 
  const reRender = () => setRender(true);

  const toggle = () => setIsMounted(!isMounted);
  

 
  function renderSquare(i) {
    return  <Square id={i}  newState={newState}></Square>  };

  return (
    <div style={{whiteSpace: "pre-line"}} className="game-board">
          <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          </div>
          <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          </div>
          <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
          </div>
          <div  id="info" >
          <h1 style={{color:"#ffffff"}}>{status}</h1>
          <div> <button className="button-3" role="button" style={{color:"#ffffff"}} onclick={reset}><h4> Start Over </h4> </button>
          <br></br>
          </div>
          </div>
    </div>
     
     
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
