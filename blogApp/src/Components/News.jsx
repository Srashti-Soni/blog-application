import { useEffect, useState } from 'react'
import Weather from './Weather'
import Calender from './Calender'
import './News.css'
import NewsModel from './NewsModel'
import img1 from '../assets/Images/travelImg.jpg'
import userImg from '../assets/Images/R.jpg'
import noImg from '../assets/Images/R.jpg'
import axios from 'axios'
import Bookmark from './Bookmark'
import Blogmodal from './Blogmodal'
const categories = [
  "business",
  "sports",
  "technology",
  "health",
  "entertainment",
  "nation"
]

const News = ({ onShowBlogs,blogs ,oneditblogs,ondeleteblog}) => {
  const [headline, setheadline] = useState(null)
  const [news, setnews] = useState([])
  const [selectCate, setSelectCate] = useState("general")
  const [searchIn, setSearchIn] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setModal] = useState(false)
  const [selectArt, setSelectArt] = useState(null)
  const [bookmark, setBookmark] = useState([])
  const [showbook, setshowbookmark] = useState(false)
  const [selectedpost,setselectedpost]=useState(null)
  const [showblogmodal,setshowblogmodal]=useState(false) 
   useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectCate}&lang=en&apikey=aa1e0de45d09106aa9ec1757884054b2`
      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=aa1e0de45d09106aa9ec1757884054b2`
      }
      const response = await axios.get(url)
      const fetchedNews = response.data.articles
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg
        }
      })
      setheadline(fetchedNews[0])
      setnews(fetchedNews.slice(1, 7))
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
      setBookmark(savedBookmarks)
    }
    fetchNews()
  }, [selectCate, searchQuery])

  const handleSearchfn = (e) => {
    e.preventDefault()
    setSearchQuery(searchIn)
    setSearchIn("")
  }

  const handleCategory = (e, category) => {
    e.preventDefault()
    setSelectCate(category)
  }

  const handleArticle = (article) => {
    setSelectArt(article)
    setModal(true)
  }

  const handleBookmark = (article) => {
    setBookmark((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) =>
            bookmark.title !== article.title
          )
        : [...prevBookmarks, article]
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      return updatedBookmarks
    })
 
  }
  const handleblogclick=(blog)=>{
    setselectedpost(blog)
    setshowblogmodal(true)
  }
  const closeblogmodal=()=>{
    setshowblogmodal(false)
    setselectedpost(null)
  }
  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className='logo'>Blogs & News</h1>
        <div className="search-bar">
          <form onSubmit={handleSearchfn}>
            <input
              type='text'
              value={searchIn}
              onChange={(e) => setSearchIn(e.target.value)}
              placeholder='Search here...'
            />
            <button type="submit">
              <i className="fa fa-search" />
            </button>
          </form>
        </div>
      </header>

      <div className='news-content'>
        <div className='navbar'>
          <div className='user' onClick={onShowBlogs}>
            <img className="userImage" src={userImg} alt="userimg" />
            <p className='blogger'>SRASHTI'S SONI</p>
          </div>
          <nav className='categories'>
            <h1 className='nav-heading'>CATEGORIES</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  key={category}
                  href='#'
                  className='nav-link'
                  onClick={(e) => handleCategory(e, category)}
                >
                  {category}
                </a>
              ))}
              <a
                href='#'
                className='nav-link'
                onClick={() => setshowbookmark(true)}
              >
                travelling
                <i className='fa-regular fa-bookmark' />
              </a>
            </div>
          </nav>
        </div>

        <div className='news-section'>
          {headline && (
            <div
              className="headline"
              onClick={(e) => {
                e.preventDefault()
                handleArticle(headline)
              }}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className='title'>
                {headline.title}
                <i
                  className={`${
                    bookmark.some((b) => b.title === headline.title)
                      ? 'fa-solid'
                      : 'fa-regular'
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmark(headline)
                  }}
                />
              </h2>
            </div>
          )}

          <div className="newsgrid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={(e) => {
                  e.preventDefault()
                  handleArticle(article)
                }}
              >
                <img src={article.image || userImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`${
                      bookmark.some((b) => b.title === article.title)
                        ? 'fa-solid'
                        : 'fa-regular'
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookmark(article)
                    }}
                  />
                </h3>
              </div>
            ))}
          </div>
        </div>

        <NewsModel
          show={showModal}
          article={selectArt}
          onClose={() => setModal(false)}
        />

        <Bookmark
          show={showbook}
          bookmarks={bookmark}
          onClose={() => setshowbookmark(false)}
          onSelectArticle={handleArticle}
          onDeleteBookmark={handleBookmark}
        />

        <div className="myblogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
          {blogs.map((blog,index)=> (
            <div key={index}
          className="blog-post"
          onClick={()=> handleblogclick(blog)}>
              <img src={blog.image|| userImg} alt={blog.title} />
               <h3>{blog.title}</h3>
               <p>{blog.content}</p> 
               <div className="post-buttons">
                  <button className="edit-post" onClick={()=>
                    oneditblogs(blog)
                  }>
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button className="delete-post" onClick={(e)=>
               {   e.stopPropagation()
                    ondeleteblog(blog)}
                  }>
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
          </div>
          ))}
          </div>
          {selectedpost&&showblogmodal &&( <Blogmodal
          show={showblogmodal} blog={selectedpost}
          onClose={closeblogmodal}/>)}
         
        </div>

        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      <footer className='news-footer'>
        <p><span>NEWS & BLOG APP</span></p>
        <p>&copy; All Right Reserved. By Code And Create</p>
      </footer>
    </div>
  )
}

export default News
