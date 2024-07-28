import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorPage from "./components/ui/errorpage"
import { createContext, useContext, useEffect, useState } from "react"
import Home from "./components/ui/home"
import LogIn from "./components/ui/form/login"
import SignUp from "./components/ui/form/signup"
import ForgotPassword from "./components/ui/form/forgot_password"
import SentMail from "./components/ui/form/sentmail"
import Code from "./components/ui/form/code"
import ResetPassword from "./components/ui/form/reset"
import SetUpPin01 from "./components/ui/setup/setup_pin01"
import SetUpPin02 from "./components/ui/setup/setup_pin02"

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
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="sent_mail" element={<SentMail />} />
            <Route path="code" element={<Code />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="setup1" element={<SetUpPin01 />} />
            <Route path="setup2" element={<SetUpPin02 />} />
         </Routes> 
      </BrowserRouter>
   </BaseContext.Provider>
  )
}

export const useBaseContext = () => useContext(BaseContext)

