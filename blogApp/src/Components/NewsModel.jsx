import React from 'react'
import './newsModal.css'
import './Modal.css'
import userImg from '../assets/Images/R.jpg'
const NewsModel = ({show,article,onClose}) => {
  if(!show) return null
  
return (
<div className='modal-out' >
<div className="modal-content">
<span className='close-button' onClick={onClose} >
    <i className='fa-solid fa-xmark' />
</span>
{article && ( 
  <>
<img width="60%" src={article.image} className
='demo'alt='demo'/>
<h2 className='modal-title'>{article.title}</h2>
<p className='modal-source'>{article.source.name}</p>
<p className='modal-date'>{new Date(article.publishedAt).toLocaleString
  ('en-IN',{month:'short',day:'2-digit',year:'numeric'
    ,hour:'2-digit',minute:'2-digit'
  })}</p>
<p className='modal-text'>{article.content}</p>
<a href={article.url} target='_blank' 
rel='noopener noreferrer'
className='read-more'>read more</a></>)}
</div>

</div>
)
}

export default NewsModel
