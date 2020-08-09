import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import './App.css';

const App =()=> {

  const [data,setData]=useState();
  const [text,setNewData]=useState('');
  const [res,setRes]=useState()
  
  const fecthData = async ()=>{
   const res= await axios.get("http://localhost:3001/api/comments/")
    console.log(res.data)
        setData(res.data)
 
 }

    const handleDelete=(id)=>{
      axios.delete(`http://localhost:3001/api/comments/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setRes(res.data)
      })
    }
    const handleDeleteAll=(data)=>{
      // eslint-disable-next-line no-lone-blocks
      {data && data.map((data)=> {
        return  axios.delete(`http://localhost:3001/api/comments/${data.id}`).then(res =>  setRes(res.data))
        
      })}
    }
    const handleSubmit=(e)=>{
       e.preventDefault()
       setNewData('') 
      axios.post("http://localhost:3001/api/comments/", { text })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setRes(res.data)
      })
      
    }
const handleChange =(e)=>{
  setNewData(e.target.value) 
}
  
  useEffect(()=>{
    fecthData()
  },[res])
 
    return (
      <div className="App">
        <div className="App__box">
          <h1>Comment Feed</h1>
         <button onClick={()=>handleDeleteAll(data)} >Reset comment feed</button>
         <div>
             {data && data.map((data)=>{
               return <div className="App__box__data" key={data.id}>
                        <button onClick={()=>handleDelete(data.id)} >X</button>
                        <h3>{data.text}</h3>
                     </div>
             })}

             <div>
                <form onSubmit={handleSubmit}>
                  <input type="text" value={text} onChange={handleChange} placeholder="Enter new comment" />
                  <button>Reply</button>
                </form>
             </div>  
         </div>
        </div>
        
      </div>
    );


}

export default App;
