import { Input } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const { Search } = Input;


const Header = (props) => {
  const { id, url, name } = props
  let navigate = useNavigate()
  const [data, setData] = useState([])
  const getData = useCallback(async () => {
    let res = await axios({
      url: `/api/v1/${url}/${id}`
    })
    setData(res.data.data)
  }, [])
  useEffect(() => {
    if (!name) void getData()
  }, [])

  const showMenu = () => {
    let menu = document.querySelector(".home-header-menu-layout")
    menu.classList.add("show")
  }
  const hideMenu = () => {
    let menu = document.querySelector(".home-header-menu-layout")
    menu.classList.remove("show")
  }
  const goBack = () => {
    navigate(-1)
  }
  const goSearch = (value) => {
    console.log(value)
    navigate(`/search/${value}`)
  }


  return (
    <>
      <header className="home-header" >
        <div className="header-menu-back" onClick={() => goBack()}></div>
        <h2>{name ? name : url === "article" ? data.channel_name : data.name}</h2>
        <div className="home-header-btn" onClick={() => showMenu()}>
        </div>
      </header>
      <section className="home-header-menu-layout">
        <nav className="header-menu">
          <section className="header-search">
            <Search className="home-input" placeholder="请输入关键词" enterButton onSearch={goSearch} />
          </section>
          <ul>
            <Link to="/user/login"><li>会员中心</li></Link>
            <Link to="/"><li>首页</li></Link>
            <Link to="/channel/47"><li>政经</li></Link>
            <Link to="/channel/40"><li>公司</li></Link>
            <Link to="/channel/41"><li>地产</li></Link>
            <Link to="/channel/42"><li>科技</li></Link>
            <Link to="/channel/44"><li>金融</li></Link>
            <Link to="/channel/45"><li>民生</li></Link>
            <Link to="/channel/46"><li>环保</li></Link>
            <Link to="/channel/48"><li>产经</li></Link>
          </ul>
        </nav>
        <div className="header-menu-mask" onClick={() => hideMenu()}>
        </div>
      </section>
    </>
  )
}
export default Header;