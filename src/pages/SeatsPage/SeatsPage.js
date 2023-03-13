import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

export default function SeatsPage({nome, setNome, cpf, setCPF, cadeiras, setCadeiras, url, setURL, title, setTitle, hour, setHour}) {

    const [lugares, setLugares] = useState([]);
    const img = lugares?.movie?.posterURL;
    setURL(img);
    const fil = lugares?.movie?.title;
    const time = lugares?.name;
    const {idSessao, data} = useParams();
    const [servidor, setServidor] = useState([]);
    const navigate = useNavigate();
    setHour(time);

    useEffect(() => {
        const test = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        test.then(final => {
            setLugares(final.data);
        });

        test.catch(error =>{
            alert('Reload');
        });
    })
    
    function booking(ato){
        ato.preventDefault();
        if(cadeiras.length < 1){
            alert("Selecione pelo menos uma cadeira");
        } else{
            if(cpf === "" || nome === ""){
                alert("preencha os campos de cpf ou de nome");
            } else{
                const enviar = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {name: nome, cpf: cpf, ids: servidor});
                setTitle(fil);  
                enviar.then(() => navigate("/sucesso"));
            }
        }
        console.log(nome);
        console.log(cpf);
        console.log(cadeiras);
    }

    const add = (item, id) =>{
        const y = [...cadeiras];
        const w = [...servidor];
        y.push(item);
        w.push(id);
        setCadeiras(y);
        setServidor(w);
    }

    const remove = (item, id) =>{
        const x = cadeiras.filter((i) => i !== item);
        const k = servidor.filter((t) => t !== id);
        setServidor(k);
        setCadeiras(x);
    }

    function escolher(numero, id, ok){
        if(ok === true){
            if(cadeiras.indexOf(numero) === -1){
                add(numero, id);
            } else{
                remove(numero, id);
            }
            
            
        }else{
            alert('Indisponível');
        }
        console.log(nome);
        console.log(cadeiras);
        console.log(servidor);
        console.log(cpf);
    }
    

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {lugares.seats?.map((seat) =>{
                    let border1;
                    let color1;
                    if(seat.isAvailable === true){
                        if(!cadeiras.includes(seat.name)){
                            color1 = "#C3CFD9";
                            border1 = "#808F9D";
                        } else{
                            border1 = "#0E7D71";
                            color1 = "#1AAE9E";
                        }
                    } else{
                        border1="#F7C52B";
                        color1="#FBE192";
                    }
                    return(
                        <SeatItem data-test="seat" color={color1} border={border1} onClick={() => escolher(seat.name, seat.id, seat.isAvailable) } key={seat.id}>{seat.name}</SeatItem>
                    )
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle border="#0E7D71" color="#1AAE9E" />
                    <p>Selecionado</p>
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle border="#7B8B99" color="#C3CFD9"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle border="#F7C52B" color="#FBE192"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" required placeholder="Digite seu nome..." onChange={e => setNome(e.target.value)} />

                CPF do Comprador:
                
                <input data-test="client-cpf" required placeholder="Digite seu CPF..." onChange={e => setCPF(e.target.value)} />

                <Link to="/sucesso" style={{ textDecoration: 'none'}}><button data-test="book-seat-btn" onClick={(booking)} type="submit">Reservar Assento(s)</button></Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={lugares?.movie?.posterURL} alt={lugares?.movie?.overview} />
                </div>
                <div>
                    <p>{lugares?.movie?.title}</p>
                    <p>{lugares?.day?.weekday} - {lugares?.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`