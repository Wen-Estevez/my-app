import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";
import axios from "axios";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  const { avatar_url, public_repos, followers, following, repos_url, login } = state.user

  const [repos, setRepos] = useState([]);
  const [word, setWord] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [viewFavorites, setViewFavorites] = useState(false);

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
    const search = repos.filter((repo) => repo.name === word);
    setRepos(search)
  }

  const handleInput = (e) => { setWord(e.target.value) }

  const handleFollow= (repo,i)=>{
    repo.followed= true;
    console.log(followed)
    setFollowed(followed.concat([repo]))
  }

  const handleUnfollow= (repo,i)=>{
    repo.followed= false;
    setFollowed(followed.filter((el)=>el.id!==repo.id))
  }

  const favorites = repos.filter((repo)=>repo?.followed)
  const handleFavorites= ()=>{
    setViewFavorites(!viewFavorites)
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (!state.isLoggedIn) { return <Redirect to="/login" /> }
  return (
    <Wrapper>
      <div className="container">
        <button onClick={handleLogout}>Cerrar sesion</button>
        <input onChange={handleInput} placeholder="Buscar repositorio..." />
        <button onClick={handleFilter}>Buscar</button>
        <button onClick={handleFavorites}>Favoritos</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar" />
            <span>{login}</span>
            <span>{public_repos} Repositorios</span>
            <span>{followers} Seguidores</span>
            <span>{following} Siguiendo</span>
          </div>
        </div>
        {viewFavorites?<div>
          {followed.map((repo,i) => <div key={repo.id}>
          <div className="content">
            <span>{repo.name}</span>
            {!repo?.followed?<button onClick={()=>handleFollow(repo,i)}>Seguir</button>:
            <button onClick={()=>handleUnfollow(repo,i)}>Dejar de seguir</button>}
          </div>
        </div>)}
        </div>:<div>
        {repos.map((repo,i) => <div key={repo.id}>
          <div className="content">
            <span>{repo.name}</span>
            {!repo?.followed?<button onClick={()=>handleFollow(repo,i)}>Seguir</button>:
            <button onClick={()=>handleUnfollow(repo,i)}>Dejar de seguir</button>}
          </div>
        </div>)}
        </div>}
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
  input{
    width: 50%;
    padding: 8px;
    font-size: 15px;
    margin: auto;
    border-radius: 15px;
    border: 1px solid #ccc;
    box-shadow: 3px 2px 5px 0px rgba(179,179,179,1);
  }
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    padding: 5px;
    align-self: flex-end;
    color: #fff;
    background: linear-gradient(90deg, #013E5C 10%, #2DB980 100%);
    text-align: center;
    border-radius: 5px;
    &:hover{
      transform: scale(0.9);
      background: -webkit-linear-gradient(#013E5C, #2DB980);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border: 1px solid #013E5C;
      border-radius: 5px;
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