import styled from "styled-components";

export default function Account(){

  return(
    <Container>
      <Header>
        <h1>Olá, Fulano</h1>
        <span>X</span>
      </Header>
      <TransationsHistoric>
        <span>Não há registros de entrada ou saída</span>
      </TransationsHistoric>
      <Movimentation>
        <div>
          <h1>X</h1>
          <span>Nova entrada</span>
        </div>
        <div>
          <h1>X</h1>
          <span>Nova saída</span>
        </div>
      </Movimentation>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.header`
  height: 80px;
  width: 86%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1, span{
    font-size: 26px;
    font-weight: 700;
    color: white;
  }
`

const TransationsHistoric = styled.header`
  height: 67%;
  width: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #FFFFFF;

  span{
    width: 180px;
    font-size: 20px;
    color: #868686;
    text-align: center;
  }
`

const Movimentation = styled.header`
  height: 21%;
  width: 86%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  div{
    height: 80%;
    width: 47%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: #A328D6;


    span{
      width: 64px;
      color: #FFFFFF;
      font-size: 17px;
      font-weight: 700;
    }
  }
`