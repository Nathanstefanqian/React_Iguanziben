import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const TabHits = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({
      url: '/api/v1/article',
      params: {
        pageSize: 8,
        status: "NORMAL",
        type: "HOT"
      }
    })
    setData(res.data.data.list)
    setLoading(false)
  })
  useEffect(() => void getData(), [])
  return (
    <>
      <div className="home-tabbar-list">
        {data.map((item, index) => (
          <Link to={`/article/${item.id}`} key={index} >
            <li className="home-small-list">
              {<span>{item.title}</span>}
            </li>
          </Link>
        ))}
      </div>
    </>
  )
}
export default TabHits;