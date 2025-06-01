import React, { useEffect, useState } from 'react';
import './Blogs.css'
import userImg from '../assets/Images/R.jpg'
const Blogs = ({onBack,oncreateblog,editpost,isediting}) => {
  const [showform,setshowform]= useState(false)
  const [image,setimage]= useState(null)
  const [title,settitle]=useState('')
  const [content,setcontent]= useState('')
  const [submitted,setsubmitted] = useState(false)
  const [titlevalid,settitlevalid]= useState(true)
  const [contentvalid,setcontentvalid]= useState(true)
 useEffect(()=>{
 if(isediting&&editpost){
     setimage(editpost.image)
     settitle(editpost.title)
     setcontent(editpost.content)
     setshowform(true)}
     else{
      setimage(null)
     settitle("")
     setcontent("")
     setshowform(false)
     }
 },[isediting,editpost])
//FileReader is a built-in JavaScript API that helps read the content of files
  const handleimagechange =(e)=>{// change happens so e gets passed
if(e.target.files &&e.target.files[0]){
  const files=e.target.files[0]
  const maxSize=1*1024*1024 
  if(files.size > maxSize){
    alert("file size exceeds 1MB")
    return }//it ensures that the file inout actually contains the selected files
  const reader = new FileReader()//create a new instance
  //e.target.files[0]: This checks if at least one file is selected (we take the first one).
reader.onload=()=>{
  setimage(reader.result)//it run when file finised loading
}
reader.readAsDataURL(e.target.files[0])
}
  }
  const handletitlechange=(e)=>{
    settitle(e.target.value)
    settitlevalid(true)
   }
  
  const handlecontentchange=(e)=>{
    setcontent(e.target.value)
    setcontentvalid(true)
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    if(!title || !content){
      if(!title) settitlevalid(false)
        if(!content) setcontentvalid(false)
          return 
    }
    const newblog={
      image: image || userImg,
      title,
      content,
    }
    oncreateblog(newblog ,isediting)
    setimage(null)
    settitle("")
    setcontent("")
    setshowform(false)
    setsubmitted(true)
    setTimeout(()=>{
        setsubmitted(false)
        onBack()
    },3000)
  }

//   reader.readAsDataURL(e.target.files[0]);
// Starts reading the image file.

// readAsDataURL reads the file and converts it into a base64 string, which is a web-safe way to embed images directly in HTML.

// This triggers the onload function once reading is complete.
  return (
    <div className='blogs'>
      <div className="blogs-left">
        {/* Optional: Remove this image if it's just for background */}
        <img src={userImg} alt="Decorative" />
      </div>
      <div className="blogs-right">
        {!showform && !submitted && ( <button className="post-btn"
       onClick={()=>{setshowform(true) }}
       >Create New Post</button>)}
       {submitted &&<p className='submission-msg'>POST SUBMITTED</p>}
        <div className={`blogs-right-form  ${showform? "visible":
          "hidden"
        }`}>
          <h1>{isediting? "Edit Post":"New Post"}</h1>
          <form onSubmit={handlesubmit}
>
            <div className="img-upload">
             <label htmlFor="file-upload" className='file-upload'> 
              <i className="bx bx-upload"></i>
               UPLOAD
              </label>
              <input type='file' id='file-upload' 
              onChange={handleimagechange}/>
            </div>
            <input type="text" 
            placeholder='Add Title(max 60 characters'
            className={`title-input ${!titlevalid?'invalid':""}`}
            value={title}
            onChange={handletitlechange}
            maxLength={60}
            />
            <textarea className=
            {`text-input ${!contentvalid?'invalid':""}`}
            placeholder='Add Text'
            value={content} 
            onChange={handlecontentchange}></textarea>
            <button type='submit' className="submit-button">{isediting? "update post":"submit post"}</button>
          </form>
        </div>
        <button className="blogs-close-button" onClick={onBack}>BACK
            <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
