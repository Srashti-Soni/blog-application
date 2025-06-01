import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import './Weather.css'
const Weather = () => {
  const [data,setData]= useState({})
  const [location,setLocation]=useState('')
  useEffect(()=>{
const fetchDefaultLocation=async ()=>{
  const defaultLocation="Delhi"
   const url =`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=7e97b76c7e333e8fddce9e823f865c54`
   
   const response=await axios.get(url)
    setData(response.data)

} 
fetchDefaultLocation()
  },[])
  const search = async ()=>{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=7e97b76c7e333e8fddce9e823f865c54`
   
   try{ 
    const response=await axios.get(url)
    if(response.data.cod!==200){
      setData({notFound:true})
    }
    else{
       setData(response.data)
    setLocation('')
    }
   }
   catch(error){
    if(error.response && error.response.status === 404){
      setData({notFound:true})
    }
    else{
      console.error(`error occured ${error}`)
    }
   }
    // console.log(data)
  }
  const handleInputChange=(e)=>{
    setLocation(e.target.value)
  }
  const handleKey=(e)=>{
    if(e.key==='Enter'){
      search()
    }
  }
  const getWeatherIcon=(weatherType)=>{
    switch(weatherType){ 
      case "Clear":
        return <i className='bx bxs-sun'></i>
        case "Clouds":
        return <i className='bx bxs-cloud'></i>
        case "Rain":
        return <i className='bx bxs-cloud-rain'></i>
        case "Thunderstorm":
        return <i className='bx bxs-cloud-lightning'></i>
        case "Snow":
        return <i className='bx bxs-cloud-snow'></i>
        case "Mist":
        return <i className='bx bxs-cloud'></i>
        case "Haze":
        return <i className='bx bxs-cloud'></i>
        default:
        return <i className='bx bxs-sun'></i>
    }
  }
  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
            <div className="loaction">{data.name}</div>
          </div>
          <div className="search-loaction">
            <input type="text" placeholder='enter loaction'
             className="type" value={location}
             onChange={handleInputChange} 
             onKeyDown={handleKey}
             />
             <i className="fa-solid fa-magnifying-glass" onClick={
              search
             }></i>
          </div>
      </div>
      {data.notFound ? (<div className='notFound'>not Found 🤔</div>):
      <div className="weather-data">
      {data.weather && data.weather[0] && 
      getWeatherIcon(data.weather[0].main)}
       <div className="weather-type">{data.weather?data.weather[0].main:null}</div>
       <div className="temp">{data.main?`${Math.floor(data.main.temp)}`:null}</div>
      </div>}
    </div>
  )
}

export default Weather
