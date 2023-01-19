import { Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Search = ({setUser}) => {
    const [name,setName]=useState([])

    useEffect(() => {
     axios.get('http://localhost:8000/users')
     .then((data)=>setName(data.data))
    }, [])
    
    const handleSearch =(e)=>{
        let newData = name.filter((element)=>
            element.name
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase())

        )
       
        setUser(newData)
    } 
  return (
    <div>
           <Input placeholder="Search" onChange={(e)=>handleSearch(e)}></Input>
    </div>
  )
}

export default Search