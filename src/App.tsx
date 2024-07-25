import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorPage from "./components/ui/errorpage"
import { createContext, useContext, useEffect, useState } from "react"
import Home from "./components/ui/home"

type Context = '/' | '/SavvySaver/'
const BaseContext = createContext<Context>('/')

export function App() {
   const [base, setBase] = useState<Context>('/')
   useEffect(() => {
      import.meta.env.DEV ? setBase('/') : setBase('/SavvySaver/')
   }, [])

  return (
   <BaseContext.Provider value={base}>
      <BrowserRouter  basename={import.meta.env.DEV ? '/' : '/SavvySaver/'}>
         <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
         </Routes> 
      </BrowserRouter>
   </BaseContext.Provider>
  )
}

export const useBaseContext = () => useContext(BaseContext)

