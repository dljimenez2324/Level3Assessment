import axios from "axios";
import { Key, useEffect, useState } from "react"

interface ThingsTodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const Errands = () => {

    const [input, setInput] = useState("");
    const [items, setItems] = useState<ThingsTodo[]>([]);
    const [error, setError] = useState("");
    const [updateId, setUpdateId] = useState<Key>("");
    const [editTitle, setEditTitle] = useState("");

    const FetchData = () => {
        axios   
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((response) => {setItems(response.data)})
            .catch((error)=>{setError(error.message)});

    }

    useEffect(() => {
      
        FetchData();
      
    }, [])
    


    const addErrand = (newItem: string) => {

        const newErrand: ThingsTodo = {
            userId: 0,
            id: Math.random(),
            title: newItem,
            completed: false
        }

        setItems([...items, newErrand]);
        setInput("");
        console.log("New ID is: ", newErrand.id);
    };


    // UPDATE STUFF
    // START UPDATE
    const startUpdate = (id: number, title: string) => {
        setUpdateId(id);
        setEditTitle(title);
    }
    // CONTINUE UPDATE
    const continueUpdate = (id: number) => {
        setItems(items.map( (item) => (item.id === id ? {...item, title: editTitle}  : item )));
        stopUpdate();
    }


    // STOP UPDATE
    const stopUpdate = () => {
        setUpdateId("");
        setEditTitle("");
    }


    const thingsDelete = (id: number) => {
        setItems(items.filter((data => data.id != id) ));
    }




  return (

    <>
        <h2 className="text-center">ToDo List</h2>
        <div className="container">

            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="btn btn-primary m-2" onClick={() => input ? addErrand(input) : null }>Add</button>

            <ul className="list-group">
                {items.map((item) => (
                    <div className="container" key={item.id}>
                        {error && <p className="text-danger">{error}</p>}
                        <li
                            className="list-group-item d-flex justify-content-between"
                            key={item.id}
                            >
                            {/* {item.title} */}

                            {updateId === item.id ?   <input 
                                                            type="text" 
                                                            value={editTitle} 
                                                            onChange={(e) => setEditTitle(e.target.value) }
                                                            onBlur={() => stopUpdate()}
                                                            onKeyDown={(e) => e.key === "Enter" ? continueUpdate(item.id) : e.key === "Escape" ? stopUpdate() : null }
                                                            />   
                                                            :  (item.title)  }

                            <div className="div">

                                <button className="btn btn-outline-primary mx-2" onClick={() => startUpdate(item.id, item.title)}>Update</button>
                                <button className="btn btn-outline-danger mx-2" onClick={() => thingsDelete(item.id)} >Delete</button>
                        
                            </div>
                        </li>
                    </div>
                ))}
            </ul>

        </div>
    </>
  )
}

export default Errands