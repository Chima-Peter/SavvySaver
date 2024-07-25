import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorPage from "./components/ui/errorpage"

function App() {
   let base = import.meta.env.DEV ? '/' : '/repo_name/'
   console.log(base)

  return (
   <BrowserRouter>
      <Routes>
         <Route path="*" element={<ErrorPage />} />
      </Routes> 
   </BrowserRouter>
  )
}

export default App
