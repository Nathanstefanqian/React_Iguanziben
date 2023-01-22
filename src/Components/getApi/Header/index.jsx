import { Input } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const { Search } = Input;


const Header = (props) => {
  let { id, name, url } = props
  let navigate = useNavigate()
  const [data, setData] = useState([])
  const getData = useCallback(async (thisid) => {
    console.log("id为", thisid)
    let res = await axios({
      url: `/api/v1/${url}/${thisid}`
    })
    setData(res.data.data)
  }, [])
  useEffect(() => {
    if (!name) {
      void getData(id)
    }
  }, [id])
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
            <Link to="/user/login"><li onClick={() => hideMenu()}>会员中心</li></Link>
            <Link to="/"><li onClick={() => hideMenu()}>首页</li></Link>
            <Link to="/channel/47"><li onClick={() => hideMenu()}>政经</li></Link>
            <Link to="/channel/40"><li onClick={() => hideMenu()}>公司</li></Link>
            <Link to="/channel/41"><li onClick={() => hideMenu()}>地产</li></Link>
            <Link to="/channel/42"><li onClick={() => hideMenu()}>科技</li></Link>
            <Link to="/channel/44"><li onClick={() => hideMenu()}>金融</li></Link>
            <Link to="/channel/45"><li onClick={() => hideMenu()}>民生</li></Link>
            <Link to="/channel/46"><li onClick={() => hideMenu()}>环保</li></Link>
            <Link to="/channel/48"><li onClick={() => hideMenu()}>产经</li></Link>
          </ul>
        </nav>
        <div className="header-menu-mask" onClick={() => hideMenu()}>
        </div>
      </section>
    </>
  )
}
export default Header;