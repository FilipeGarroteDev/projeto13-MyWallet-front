import { GlobalStyle, Reset } from "../../Common/globalStyle"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Account from "../MainPage/Account"


export default function App(){
  return(
    <>
      <Reset/>
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}