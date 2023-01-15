import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const ListHeader = () => {
  return (
    <>
      <div className="List-Header">
        <div className="List-Header-Back"></div>
        <h2>地产</h2>
        <div className="List-Header-Menu"></div>
      </div>
      <div className="clearfix"></div>
    </>
  )
}

const List = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)

  const prePages = () => {
    setPages(pages => pages - 1)
    getData()
  }

  const nextPages = () => {
    setPages(pages => pages + 1)
    getData()
  }

  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({
      url: '/api/v1/channel_article',
      params: {
        status: 'NORMAL',
        channel_id: 41,
        page: pages
      }
    })
    setData(res.data.data.list)
    setLoading(false)
  }, [pages])

  useEffect(() => void getData(), [])

  if (loading) return <div className="list">Loading</div>
  if (data.length === 0) return <div className="list">No Data</div>

  return (
    <>
      <ListHeader />
      <div className="List-long">
        {data.map((item, index) => (
          <a href='#'>
            <div className="List-item" key={index}>
              {item.img && <img src={item.img} alt={item.title} />}
              <div className='List-item-detail'>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          </a>
        ))}
        <button onClick={prePages} >上一页</button>
        <button onClick={nextPages} >下一页</button>
      </div>
    </>

  )
}

export default List
