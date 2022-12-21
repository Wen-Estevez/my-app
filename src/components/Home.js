import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";


export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <Wrapper>
      <div className="container">
        <button onClick={() => handleLogout()}>Cerrar sesion</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar" />
            <span>{name}</span>
            <span>{public_repos} Repositorios</span>
            <span>{followers} Seguidores</span>
            <span>{following} Siguiendo</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;  
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;    
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      border-radius: 25px;
      box-shadow: 5px 5px 6px 4px rgba(214,214,214,1);
      width: auto;
      &:hover{
        transform: scale(1.05);
      }
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }
  }
}
`;