import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from "react-router-dom";
import Header from '../../Components/getApi/Header';
import axios from 'axios'
import Footer from "../../Components/getApi/Footer"
import Loadings from '../../Components/getApi/Loadings';


const List = () => {
  const params = useParams()
  let { id } = params
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)
  const [myid, setMyid] = useState(0)
  if (myid === 0) setMyid(id)

  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({
      url: '/api/v1/channel_article',
      params: {
        status: 'NORMAL',
        channel_id: `${id}`,
        page: pages
      }
    })

    if (id === myid)
      setData([...data, res.data.data.list])
    else {
      setData([])
      setData(data => [...data, res.data.data.list])
      setMyid(id)
    }
    setLoading(false)
  })
  useEffect(() => void getData(), [pages, id])
  window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop
    let innerHeight = window.innerHeight
    let clientHeight = document.body.clientHeight
    if (scrollTop + innerHeight >= clientHeight - 3) {
      setPages(pages => pages + 1)
    }
  }

  return (
    <>
      <Header url={"channel"} id={myid} />
      <div className="clearfix">
        {
          loading && (pages === 1) ? <Loadings /> : null
        }
      </div>
      <div className="list-layout">
        {
          data.map((item, index) => (
            <div key={index}>
              {
                item.map((subitem, subindex) => (
                  <Link to={`/article/${subitem.id}`} key={subindex}>
                    <div className="List-item" >
                      {subitem.img && <img src={subitem.img} alt={subitem.title} />}
                      <div className='List-item-detail'>
                        <h4>{subitem.title}</h4>
                        <p>{subitem.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          ))
        }
      </div>
      {loading ? <div className="list-footer">加载中...</div> : <div className="list-footer">没有更多了</div>}
      <Footer />
    </>
  )

}

export default List
