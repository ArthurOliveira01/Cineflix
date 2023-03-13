import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react";;

export default function App() {

    const [cpf, setCPF] = useState("");
    const [nome, setNome] = useState("");
    const [cadeiras, setCadeiras] = useState([]);
    const [url, setURL] = useState("")
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [hour, setHour] = useState("");

    return (
        <>
           <BrowserRouter>
               <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage 
                    time = {time}
                    setTime={setTime}
                    />} />
                    <Route path="/assentos/:idSessao" element={<SeatsPage
                    nome={nome}
                    setNome={setNome}
                    cpf={cpf}
                    setCPF={setCPF}
                    cadeiras={cadeiras}
                    setCadeiras={setCadeiras}
                    url={url}
                    setURL={setURL}
                    title={title}
                    setTitle={setTitle}
                    time = {time}
                    setTime={setTime}
                    setHour={setHour}
                    hour={hour}
                    />} />
                    <Route path="/sucesso" element={<SuccessPage
                    nome={nome}
                    setNome={setNome}
                    cpf={cpf}
                    setCPF={setCPF} 
                    cadeiras={cadeiras}
                    setCadeiras={setCadeiras}
                    url={url}
                    title={title}
                    setTitle={setTitle}
                    time = {time}
                    setTime={setTime}
                    setHour={setHour}
                    hour={hour}
                    />} />
                </Routes>
           </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
