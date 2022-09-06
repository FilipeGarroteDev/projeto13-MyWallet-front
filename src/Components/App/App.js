import { GlobalStyle, Reset } from "../../Common/globalStyle"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "../SignIn/SignIn"


export default function App(){
  return(
    <>
      <Reset/>
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}