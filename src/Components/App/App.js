import { GlobalStyle, Reset } from "../../Common/globalStyle"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"


export default function App(){
  return(
    <>
      <Reset/>
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}