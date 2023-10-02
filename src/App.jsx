import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // store data
  const [data,setData] =useState([])
  // store data

  // onsubmit data 
const OnSubmitData = async(e) => {
  e.preventDefault()
  const data = e.target.text.value
  const dataEvent = {
    date:data,
    title:"Event Testing Titel",
    address:"Event Testing Address"
  }
  try {
   await  axios.post('http://localhost:5000/api/v1/event/create',dataEvent)
    .then(res=>res.json()).then(res=>{
      setData([...data,res?.data])
      e.target.reset()
    })
   
  } catch (error) {
    console.log(error)
  }
}
  // onsubmit data 
  // get all data and instent update

useEffect(()=>{
     async function getData(){
      try {
        const res = await axios.get('http://localhost:5000/api/v1/event/getevent')
        setData(res?.data?.data)
      } catch (error) {
        console.log(error)
      }
     } 
      getData()  
  }
//  use dependancy array
,[data])
  // get all data and instent update
  return (
    <>
      <form onSubmit={OnSubmitData}>
        <input type="text" name="text"/>
        <button type='submit'> Submit</button>
      </form>
      <div>
        {
          data?.map((item,index)=>(
            <div key={index}>
              <h1>{item?.title}</h1>
              <h1>{item?.address}</h1>
              <h1>{item?.date}</h1>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
