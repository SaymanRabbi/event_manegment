import { useEffect, useState } from 'react'
import './App.css'

function App() {
 const [data,setData] =useState([])
const OnSubmitData = async(e) => {
  e.preventDefault()
  const data = e.target.text.value
  try {
   await fetch('http://localhost:5000/api/v1/event/create',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        date:data,
        title:'title6',
        address:'addres6'
      })
    }).then(res=>res.json()).then(res=>{
      setData([...data,res?.data])
      e.target.text.value=''
    })
   
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
     async function getData(){
      try {
        const res = await fetch('http://localhost:5000/api/v1/event/getevent')
        const data = await res.json()
        setData(data?.data)
      } catch (error) {
        console.log(error)
      }
     } 
      getData()  
  }
 
,[data])
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
