//  ive simply copy and pasted a previous counter that I made

import { useState } from "react"


const Counter = () => {

    const [counting, setCounting] = useState(0);

    const increaseCount = () => {
        setCounting((prevCount) => prevCount + 1);
      };
    
      const decreaseCount = () => {
        setCounting((prevCount) => prevCount > 0 ? prevCount - 1 : 0);
      };



  return (
    <>
      
        <div className="text-center">

            <h1>Counter</h1>
            <h1>{counting}</h1>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mx-2" onClick={increaseCount}>
                    Add
                </button>

                <button className="btn btn-danger mx-2" onClick={decreaseCount} >
                    Decrease
                </button>
            </div>

        </div>  
      


    </>
  )
}

export default Counter