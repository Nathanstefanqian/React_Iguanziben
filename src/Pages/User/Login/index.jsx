import Header from "../../../Components/getApi/Header"
import Footer from "../../../Components/getApi/Footer"
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
      <Header name={"会员登录"} />
      <div className="clearfix"></div>
      <div className="user-layout">
        <div className="user-layout-header">
          《观资本网》欢迎您！
        </div>
        <div className="user-layout-content">
          <div className="user-layout-content-cell">
            <input type="text" placeholder="请输入登录账号" />
          </div>
          <div className="user-layout-content-cell">
            <input type="password" placeholder="请输入登录密码" />
          </div>
          <div className="user-layout-content-button-cell">
            <div className="user-layout-content-button">登录</div>
          </div>
          <div className="user-layout-content-cell">
            <Link to="/user/register"><span>没有账号？立即注册</span></Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Login