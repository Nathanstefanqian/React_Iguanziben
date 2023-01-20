import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from "react-router-dom";
import Header from '../../Components/getApi/Header';
import axios from 'axios'
import Loadings from '../../Components/getApi/Loadings';
import { PullDownRefresh } from 'tdesign-mobile-react';


const List = () => {
  const params = useParams()
  const { id } = params
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)

  console.log(id)


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
    console.log(11111, id)

    setData([...data, res.data.data.list])
    setLoading(false)
  }, [id])
  useEffect(() =>
    setPages(pages => pages + 1), []
  )
  useEffect(() => {
    void getData()
    console.log(data, " id ", id)
  }, [pages, id])
  window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop
    console.log("scrolltop", scrollTop)
    let innerHeight = window.innerHeight
    console.log("innerHeight", innerHeight)
    let clientHeight = document.body.clientHeight
    console.log("clientHeight", clientHeight)
    if (scrollTop + innerHeight >= clientHeight - 3) {
      setPages(pages => pages + 1)
      console.log("完成更新")
    }
  }

  return (
    <>
      <Header url={"channel"} id={id} />
      <div className="clearfix">
        {
          loading && (pages === 0 || 1) ? <Loadings /> : null
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
    </>
  )

}

export default List
