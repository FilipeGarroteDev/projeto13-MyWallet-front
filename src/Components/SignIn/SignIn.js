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
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button>Entrar</button>
      </Form>
      <Link to="/signup">
        Primeira vez? Cadastre-se!
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