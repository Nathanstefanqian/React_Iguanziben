import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import List from "./Pages/List"
import Article from "./Pages/Article"
import Login from "./Pages/User/Login"
import Register from "./Pages/User/Register"
import Search from "./Pages/Search"
const App = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/channel/:id" element={<List />}></Route>
        <Route path="/article/:id" element={<Article />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/register" element={<Register />}></Route>
        <Route path="/search/:keyWord" element={<Search />}></Route>
      </Routes>
    </>
  )
}
export default App