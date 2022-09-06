import styled from "styled-components";

export default function SignIn(){
  return(
    <Container>
      <h1>MyWallet</h1>
      <form>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button>Entrar</button>
      </form>
      <span>Primeira vez? Cadastre-se!</span>
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

  form{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    input{
      height: 60px;
      width: 86%;
      border-radius: 5px;
      font-size: 20px;
      padding-left: 15px;
      border: none;
    }

    button{
      height: 48px;
      width: 86%;
      border-radius: 5px;
      padding-left: 15px;
      border: none;
      background-color: #A328D6;
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
    }
  }

  span{
    font-size: 15px;
    font-weight: 700;
    color: white;
    margin-top: 36px;
  }
`