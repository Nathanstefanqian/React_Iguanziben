import Header from "../../../Components/getApi/Header"
import Footer from "../../../Components/getApi/Footer"
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <>
      <Header name={"会员注册"} />
      <div className="clearfix"></div>
      <div className="user-layout">
        <div className="user-layout-header">
          欢迎注册 《观资本网》
        </div>
        <div className="user-layout-content">
          <div className="user-layout-content-cell">
            <input type="text" placeholder="请输入登录账号" />
          </div>
          <div className="user-layout-content-cell">
            <input type="password" placeholder="请输入登录密码" />
          </div>
          <div className="user-layout-content-cell">
            <input type="password" placeholder="请再次输入登录密码" />
          </div>
          <div className="user-layout-content-button-cell">
            <div className="user-layout-content-button">登录</div>
          </div>
          <div className="user-layout-content-cell">
            <Link to="/user/login"><span>已有账号？立即登录</span></Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Register