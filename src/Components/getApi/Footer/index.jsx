import { useEffect, useState, useCallback } from "react"
import axios from "axios"
const Footer = () => {
  const [data, setData] = useState([])
  const getData = useCallback(async () => {
    let res = await axios({
      url: '/api/v1/site'
    })
    setData(res.data.data.mcopyright)
  })
  useEffect(() => void getData(), [])
  return (
    <footer className="home-footer">
      {data}
    </footer>
  )
}
export default Footer