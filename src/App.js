import React, {useState, useEffect} from "react";
import './App.css';
import _ from "lodash";

const originalTileArray = [
  {
    id: '1',
    color: 'red',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '2',
    color: 'red',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '3',
    color: 'green',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '4',
    color: 'green',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '5',
    color: 'blue',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '6',
    color: 'blue',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '7',
    color: 'yellow',
    class: ['tile'],
    matched: false,
    active: false
  },
  {
    id: '8',
    color: 'yellow',
    class: ['tile'],
    matched: false,
    active: false
  },
];

function App() {
  const sleep = false;
  const [title, setTitle] = useState('Memory');
  const [tiles, setTiles] = useState(_.cloneDeep(_.shuffle(originalTileArray)));
  const [result, setResult] = useState(false);


  const reset = () => {
    setTitle('Memory');
    setResult(false);
    setTiles(_.cloneDeep(_.shuffle(originalTileArray)));
  }
  const tileClicked = (tile) => {
      const allMatchedForColor = tiles.filter(t => t.matched && t.color === tile.color);
      if(allMatchedForColor.length === 2) {
        return;
      }
      const clonedTiles = _.cloneDeep(tiles);
      const lastActiveTile = clonedTiles.filter(t =>  t.active && !t.matched);
      if (lastActiveTile.length === 1) {
          if(lastActiveTile[0].color === tile.color) {
              for(const cTile of clonedTiles) {
                  if(cTile.id === tile.id) {
                        cTile.class.push(cTile.color);
                        cTile.active = true;
                        cTile.matched = true;
                  }
                  if(cTile.id === lastActiveTile[0].id) {
                        cTile.matched = true;
                  }
                }  
          } else {
            for(const cTile of clonedTiles) {
              if(cTile.id === lastActiveTile[0].id) {
                    cTile.class.pop();
                    cTile.active = false;
                  break;
              }
            } 
          }
          setTiles(clonedTiles);
      } else {
        for(const cTile of clonedTiles) {
            if(cTile.id === tile.id) {
                cTile.class.push(cTile.color);
                cTile.active = true;
                break;
            }
        }
        setTiles(clonedTiles);
      }
  }

  useEffect(() => {
    if(tiles.filter(i => i.matched)?.length === 8) {
      setTitle('You win!');
      setResult(true);
    }
  }, [tiles])


  return (
    <div className="App">
        <h1>{title}</h1>
        <div className="board">
          {tiles.map(tile => <div key={tile.id} className={tile.class.join(' ')} onClick={()=> tile.active ? null :tileClicked(tile)}></div>)}
        </div>
        <div>
          {result ? <button onClick={() => reset()}>Reset</button> : null}
        </div>
    </div>
  );
}

export default App;
