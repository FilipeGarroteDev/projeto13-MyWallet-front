import styled from "styled-components";
import { Form } from "../../Common/Form";
import { Header } from "../../Common/Header";

export default function Inflow(){

  return(
    <Container>
      <Header>
        <h1>Nova entrada</h1>
        <span>X</span>
      </Header>
      <Form>
        <input type="number" placeholder="Valor" />
        <input type="text" placeholder="Descrição" />
        <button>Salvar entrada</button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`