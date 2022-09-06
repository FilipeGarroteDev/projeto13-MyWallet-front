import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../../Common/Form";

export default function SignIn(){

  function sendForm(e){
    e.preventDefault()
  }

  return(
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={sendForm}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <button>Cadastrar</button>
      </Form>
      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </Container>
  )
}

const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1{
    font-family: "Saira Stencil One", sans-serif;
    font-size: 32px;
    color: white;
    margin-bottom: 26px;
  }

  a {
    font-size: 15px;
    font-weight: 700;
    color: white;
    margin-top: 36px;
  }
`