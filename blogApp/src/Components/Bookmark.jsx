import React from 'react'
import userImg from '../assets/Images/R.jpg'
import './Bookmark.css'
const Bookmark = ({show,bookmarks,onClose,onSelectArticle,onDeleteBookmark}) => {
  if(!show) return null;
  return (
<div
className='modal-out'>
<div className="modal-content">
<span className='close-button'onClick={onClose}>  <i className="fa-solid fa-xmark"></i>
</span>
<h2 className="bookmarks-heading">bookmarked</h2>
<div className="bookmark-list">
 {bookmarks.map((article, Index) => (
  <div className="bookmark-item" key={Index} onClick={() => onSelectArticle(article)}>
    <img src={article.image || userImg} alt={article.title} className="bookmarkimg" />
    <h3>{article.title}</h3>
    <span className="delete-button"
      onClick={(e) => {
        e.stopPropagation();
        onDeleteBookmark(article);
      }}>
      <i className="fa-regular fa-circle-xmark" />
    </span>
  </div>
))}


</div>
</div>
</div>
)
}

export default Bookmark
