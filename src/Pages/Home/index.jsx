import { useState, useEffect, useCallback } from "react"
import { Carousel, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import TabEnts from "./Components/TabEnts"
import TabHits from "./Components/TabHits"
import TabNews from "./Components/TabNews"
import Footer from "../../Components/getApi/Footer";
import getApi from "../../Components/getApi";
import Loadings from "../../Components/getApi/Loadings";
const { Search } = Input;
const rem = px => px / 100;

const HomeSection = (props) => {
  const { item, index, addCount } = props;
  const [Headlist, setHeadlist] = useState([])
  const [name, setName] = useState([])
  const [list, setList] = useState([])
  const getData = useCallback(async () => {
    let res = await getApi(`channel/${item}`, {})
    setName(res.data.data.name)
    res = await getApi("channel_article", { channel_id: item, status: "NORMAL", type: "RECOMMEND" })
    setHeadlist(res.data.data.list[0])
    res = await getApi("channel_article", { channel_id: item, status: "NORMAL", pageSize: 5 })
    setList(res.data.data.list)
    addCount()
    console.log("调用2次")
  }, [])

  useEffect(() => {
    void getData()
  }, [])

  return (
    <section className="home-section" key={index} >
      <header className="home-section-header">
        <h2>{name}</h2>
        <Link to={`/channel/${item}`} className="home-section-header-link">更多</Link>
      </header>
      <Link to={`/article/${Headlist.id}`}>
        <section className="home-section-photo">
          <img src={Headlist.img} alt={Headlist.title} />
          <div className="home-section-photo-detail">
            <h4>{Headlist.title}</h4>
            <p>{Headlist.description}</p>
          </div>
        </section>
      </Link>

      <section className="home-section-list">
        <ul>
          {
            list.map((item, index) => (
              <Link to={`/article/${item.id}`} key={index}>
                <li className="home-small-list">
                  <span>{item.title}</span>
                </li>
              </Link>
            ))
          }
        </ul>
      </section>
    </section >
  )
}

const HomeTabbar = () => {
  let id = 1
  let translatexvalue = 0
  let translatexvalue_move = 0
  const handleChange = (myid) => {
    if (id === myid) return;
    for (let i = 1; i <= 3; i++) {
      let span = document.getElementById(`home_tab_span${i}`)
      span.style.fontWeight = 400;
    }
    let mydiv = document.getElementById("home_tabbar")
    let mydiv_move = document.getElementById("home_tabbar_move")
    let span = document.getElementById(`home_tab_span${myid}`)
    translatexvalue += (id - myid) * 390
    translatexvalue_move += (myid - id) * 130
    mydiv.style.transform = `translatex(${rem(translatexvalue)}rem)`
    mydiv_move.style.transform = `translatex(${rem(translatexvalue_move)}rem)`
    mydiv.style.transition = "all 0.5s"
    mydiv_move.style.transition = "all 0.5s"
    span.style.fontWeight = 500;
    id = myid
  }
  return (
    <>
      <div className="home-tabbar">
        <div id="home_tabbar_move"></div>
        <div className="home-tab" onClick={() => handleChange(1)}><span id="home_tab_span1">热点</span></div>
        <div className="home-tab" onClick={() => handleChange(2)}><span id="home_tab_span2">要闻</span></div>
        <div className="home-tab" onClick={() => handleChange(3)}><span id="home_tab_span3">舆情</span></div>
      </div >
      <div id="home_tabbar">
        <TabEnts />
        <TabNews />
        <TabHits />
      </div>

    </>
  )
}

const HomeSwiper = (props) => {
  const { addCount } = props
  const [data, setData] = useState([])
  const getData = useCallback(async () => {
    let res = await getApi("article", { type: 'FOCUS', pageSize: 5 })
    setData(res.data.data.list)
    addCount()
    console.log("调用1次")
  }, [])
  useEffect(() => void getData(), [])
  return (
    <>
      <Carousel Carousel autoplay>
        {data.map((item, index) => (
          <div key={index}>
            <h3 >
              <Link to={`/article/${item.id}`} ><img className="home-swiper-img" src={item.img} alt={item.title} /></Link>
            </h3>
          </div>
        )
        )}
      </Carousel>
    </ >
  )
}

const HomeHeader = () => {
  const navigate = useNavigate()
  const showMenu = () => {
    let menu = document.querySelector(".home-header-menu-layout")
    menu.classList.add("show")
  }
  const hideMenu = () => {
    let menu = document.querySelector(".home-header-menu-layout")
    menu.classList.remove("show")
  }

  const goSearch = (value) => {
    console.log(value)
    navigate(`/search/${value}`)
  }
  return (
    <>
      <header className="home-header" >
        <div className="logo" >
          <Link to="/" className="logo-link">
            <h1>观资本网 </h1>
          </Link>
        </div>
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

const Home = () => {
  const channel_id = ["47", "40", "41", "42", "44", "45", "46", "48"];
  const [loading, setLoading] = useState(false)
  let count = 0
  const addCount = () => {
    count += 1
    if (count === 18) {
      setLoading(false)
      count = 0
      return;
    }
    setLoading(true)
  }

  return (
    <>
      <HomeHeader />
      <div className="clearfix"></div>
      <HomeSwiper addCount={addCount} />
      <HomeTabbar />
      {channel_id.map((item, index) => < HomeSection item={item} key={index} addCount={addCount} />)}
      <Footer />
      {
        loading ? <Loadings /> : null
      }
    </>
  )
}

export default Home