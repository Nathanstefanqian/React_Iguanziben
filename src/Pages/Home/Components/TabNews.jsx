import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
const TabNews = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({
      url: '/api/v1/article',
      params: {
        pageSize: 8,
        status: "NORMAL",
        type: "RECOMMEND"
      }
    })
    setData(res.data.data.list)
    setLoading(false)
  })
  useEffect(() => void getData(), [])
  return (
    <>
      <div id="myid-home-tabbar-list" className="home-tabbar-list">
        {data.map((item, index) => (
          <li className="home-small-list" key={index}>
            {<span>{item.title}</span>}
          </li>
        ))}
      </div>
    </>
  )
}
export default TabNews;