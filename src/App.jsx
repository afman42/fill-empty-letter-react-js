import { useState } from 'react'
import './App.css'
import PlayGame from './components/PlayGame';
import data from './data'

function App() {
  let [countStart, setCountStart] = useState(3);
  const [startEnable, setStartEnable] = useState(false);

  function countSt() {
    const myInterval = setInterval(countStarted, 1000);
    function countStarted() {
      if (countStart <= 0) {
        setCountStart(0);
        clearInterval(myInterval)
      } else {
        setCountStart(countStart -= 1);
      }
    }
  }
  const buttonStartComponent = (
    <button className='buttonStart' onClick={() => { setStartEnable(true); countSt(); }}>Mulai</button>
  )
  return (
    <div className="container">
      <h1>Puzzle Text</h1>
      <div className="divCenter">
        <p>Menyatukan alphabet menjadi suatu kalimat</p>
        {
          startEnable
            ? countStart === 0 ? <PlayGame data={data} setStartEnable={setStartEnable} setCountStart={setCountStart} /> : countStart
            : buttonStartComponent
        }
      </div>
    </div>
  )
}

export default App
