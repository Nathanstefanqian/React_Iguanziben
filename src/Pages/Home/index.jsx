import { useState, useEffect, useCallback, usememo, useref } from "react"
import { Drawer, Carousel } from 'antd';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TabEnts from "./Components/TabEnts"
import TabHits from "./Components/TabHits"
import TabNews from "./Components/TabNews"
import axios from 'axios'
import getApi from "../../Components/getApi";
const HomeFooter = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({
      url: '/api/v1/site'
    })
    setData(res.data.data.mcopyright)
    setLoading(false)
  })
  useEffect(() => void getData(), [])
  return (
    <footer className="home-footer">
      {data}
    </footer>
  )
}

const HomeSection = (props) => {
  const { item, index } = props;
  const [Headlist, setHeadlist] = useState([])
  const [name, setName] = useState([])
  const [list, setList] = useState([])
  const getName = useCallback(async () => {
    let res = await getApi(`channel/${item}`, {})
    setName(res.data.data.name)
  }, [])
  const getHeadlist = useCallback(async () => {
    let res = await getApi("channel_article", { channel_id: item, status: "NORMAL", type: "RECOMMEND" })
    setHeadlist(res.data.data.list[0])
  }, [])
  const getList = useCallback(async () => {
    let res = await getApi("channel_article", { channel_id: item, status: "NORMAL", pageSize: 5 })
    setList(res.data.data.list)
  }, [])
  useEffect(() => void getName(), [])
  useEffect(() => void getHeadlist(), [])
  useEffect(() => void getList(), [])


  // setName(getData.data.data.name)
  // getData = useApi("channel_article", { channel_id: item, status: "NORMAL", type: "RECOMMEND" })
  // setHeadlist(getData.data.data.list[0])
  // getData = useApi("channel_article", { channel_id: item, status: "NORMAL", pageSize: 5 })
  // setList(getData.data.data.list)
  return (
    <section className="home-section" key={index} >
      <header className="home-section-header">
        <h2>{name}</h2>
        <a href="#">更多</a>
      </header>
      <section className="home-section-photo">
        <a href='#'>
          <img src={Headlist.img} alt={Headlist.title} />
          <div className="home-section-photo-detail">
            <h4>{Headlist.title}</h4>
            <p>{Headlist.description}</p>
          </div>
        </a>
      </section>
      <section className="home-section-list">
        <ul>
          {
            list.map((item, index) => (
              <li className="home-small-list" key={index}>
                <span>{item.title}</span>
              </li>
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
    let mydiv = document.getElementById("home_tabbar")
    let mydiv_move = document.getElementById("home_tabbar_move")
    translatexvalue += (id - myid) * 390
    translatexvalue_move += (myid - id) * 130
    mydiv.style.transform = `translatex(${translatexvalue}px)`
    mydiv_move.style.transform = `translatex(${translatexvalue_move}px)`

    mydiv.style.transition = "all 0.5s"
    mydiv_move.style.transition = "all 0.5s"

    id = myid
  }
  return (
    <>
      <div className="home-tabbar">
        <div id="home_tabbar_move"></div>
        <div className="home-tab" onClick={() => handleChange(1)}><span>热点</span></div>
        <div className="home-tab" onClick={() => handleChange(2)}><span>要闻</span></div>
        <div className="home-tab" onClick={() => handleChange(3)}><span>舆情</span></div>
      </div >
      <div id="home_tabbar">
        <TabEnts />
        <TabHits />
        <TabNews />
      </div>

    </>
  )
}

const HomeSwiper = () => {
  const [data, setData] = useState([])
  const getres = useCallback(async () => {
    let res = await getApi("article", { type: 'FOCUS', pageSize: 5 })
    setData(res.data.data.list)
  }, [])
  useEffect(() => void getres(), [])

  return (
    <>
      <Carousel Carousel autoplay>
        {data.map((item, index) => (
          <div key={index}>
            <h3 >
              <img className="home-swiper-img" src={item.img} alt={item.title} />
            </h3>
          </div>
        )
        )}
      </Carousel>
    </ >
  )
}

const HomeHeaderBtn = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  }
  const DrawerStyle = {
    background: 'rgba(0,0,0,.7)'
  }

  return (
    <>

      <div className="home-header-btn" onClick={showDrawer}>
      </div>
      <Drawer placement="right" onClose={onClose} open={open} style={DrawerStyle} headerStyle={{ display: 'none' }} width="247px">
        <section className='home-header-drawer'>
        </section>
      </Drawer>
    </>
  );
}

const HomeHeader = () => {
  return (
    <header className="home-header" >
      <div className="logo" >
        <a><h1>观资本网 </h1></a >
      </div>
      < HomeHeaderBtn />
    </header>
  )
}

const Home = () => {
  const channel_id = ["47", "40", "41", "42", "44", "45", "46", "48"];
  return (
    <>
      <HomeHeader />
      <div className="clearfix"></div>
      <HomeSwiper />
      <HomeTabbar />
      {channel_id.map((item, index) => < HomeSection item={item} />)}
      <HomeFooter />
    </>
  )
}

export default Home