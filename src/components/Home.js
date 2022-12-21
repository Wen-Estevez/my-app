import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AuthContext } from "../App";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  if (!state.isLoggedIn) {  history.push("/login") }

  const { avatar_url, public_repos, followers, following, repos_url, login } = state.user
  const [repos, setRepos] = useState([]);
  const [word, setWord] = useState([]);

  const fetchData = async () => {
    const fetchRepos = await axios.get(repos_url);
    setRepos(fetchRepos.data)
  }
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  const handleFilter = () => {
    const search = repos.filter((repo) => repo.name.toLowerCase().includes(word.toLowerCase()) );
    setRepos(search)
  }

  const handleInput = (e) => { setWord(e.target.value) }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <div className="container">
        <button onClick={handleLogout}>Cerrar sesion</button>
        <input onChange={handleInput} />
        <button onClick={handleFilter}>Buscar</button>
        <button onClick={fetchData}>Borrar</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar" />
            <span>{login}</span>
            <span>{public_repos} Repositorios</span>
            <span>{followers} Seguidores</span>
            <span>{following} Siguiendo</span>
          </div>
        </div>
        {repos.map((repo) => <div>
          <div className="content">
            <span>{repo.name}</span>
          </div>
        </div>)}
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