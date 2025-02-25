import {useState,useEffect} from 'react';
import './Counter.css';
const Counter = () => {
    let [count, setCount] = useState(0);
    let [counter, setCounter] = useState(0);

    return (
        <div className="counter-container">
            <p>Count:{count}</p>
            <button onClick={() => setCount(prevCount => prevCount +1)}>
                Add 1
            </button>

            <p>Count: {counter}</p>
            <button onClick={() => setCounter(prevCounter => prevCounter + 2)}>
                Add 2
            </button>
        </div>
    )
}
export default Counter;