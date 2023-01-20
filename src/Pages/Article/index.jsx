import Header from "../../Components/getApi/Header";
import Footer from "../../Components/getApi/Footer";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loadings from "../../Components/getApi/Loadings";
function timestampToTime(timestamp) {
  const date = new Date(timestamp)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
const Article = () => {
  const params = useParams()
  const { id } = params
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const getData = useCallback(async () => {
    setLoading(true)
    let res = await axios({ url: `/api/v1/article/${id}` })
    setData(res.data.data)
    setLoading(false)
  }, [])
  useEffect(() => {
    void getData()
  }, [])
  const htmlTranslator = () => {
    let content = document.getElementById("article_content")
    content.innerHTML = data.content
  }
  useEffect(() => {
    void htmlTranslator()
  }, [loading])
  return (
    <>
      <Header url={"article"} id={id} />
      <div className="clearfix">
        {loading ? <Loadings /> : null}
      </div>
      <div className="article-layout">
        <h2 id="article_title">{data.title}</h2>
        <div id="article_content"></div>
        <div id="article_date">
          <p>来源：观资本网</p>
          <p>作者：{data.editor === null ? "佚名" : data.editor}</p>
          <p>日期：{timestampToTime(data.time)}</p>
          <p>阅读量：{data.hits}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Article;