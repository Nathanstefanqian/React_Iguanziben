import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import List from "./Pages/List"

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/list" element={<List />}></Route>
      </Routes>
    </>
  )
}
export default App