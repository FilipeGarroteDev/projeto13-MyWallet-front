import { GlobalStyle, Reset } from "./globalStyle"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Teste from "./Teste"


export default function App(){
  return(
    <>
      <Reset/>
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teste/>}/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}