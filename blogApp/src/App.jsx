import React, { useEffect, useState } from 'react'
import Blogs from './Components/Blogs'
import News from './Components/news'

const App = () => {
  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [selectedPost, setselectedPost]=useState(null)
  const [isEditing,setisEditing]= useState(false)

  const [blogs,setblogs]= useState([])
  useEffect(()=>{
   const savedBlogs=JSON.parse(localStorage.getItem('blogs'))|| []
   setblogs(savedBlogs)
  },[])
  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleBackToNews = () => {
    setShowNews(true)
    setShowBlogs(false)
    setisEditing(false)
    setselectedPost(null)
  }
  const handleBlogspost=(newblog,isEdit)=>{
     setblogs((prevblogs)=>
     {
      const updateblogs= isEdit? prevblogs.
      map((blog)=>(blog === selectedPost?
        newblog :blog
      )): [...prevblogs,newblog]
      localStorage.setItem("blogs",JSON.stringify(updateblogs))
    return updateblogs;
    }
 )
 setisEditing(false)
 setselectedPost(null)

 }
 const handledeleteblog=(blogtodelete)=>{
   setblogs((prevblogs)=>{
     const updateblogs=prevblogs.filter((blog)=> blog !==blogtodelete)
     localStorage.setItem("blog",JSON.stringify(updateblogs))
     return updateblogs
   })
 }
 const handleeditingblog=(blog)=>{
  setselectedPost(blog)
  setisEditing(true)
  setShowNews(false)
  setShowBlogs(true)
 }
  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} 
        oneditblogs={handleeditingblog}
        ondeleteblog={handledeleteblog}/>}
        {showBlogs && <Blogs onBack={handleBackToNews} oncreateblog
        ={handleBlogspost} editpost={selectedPost}
        isediting={isEditing}/>}
      </div>
    </div>
  )
}

export default App