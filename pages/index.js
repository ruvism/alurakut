// import styled from 'styled-components';
import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons' ; 
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations' ;

function ProfileSideBar(props){
  
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <br />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'ruvism';
  const nomePerfil = 'Rúvila';
  const [comunidades, setComunidades] =  React.useState([{
    id: new Date().toISOString(),
    title:'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://www.amazon.com.br/milagre-manh%C3%A3-Hal-Elrod/dp/8576849941/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1UQFJKW38QFBN&dchild=1&keywords=milagre+da+manha&qid=1627082507&sprefix=milag%2Caps%2C309&sr=8-1' 
  }]);
  const pessoasComunidade = [
    'rafaballerini', 
    'annelesinhovski', 
    'isadorastan',  
    'vicduraes', 
    'backinkansas', 
    'taizarm',
  ];

  return(
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid> 
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1>
              Bem-vinde, {nomePerfil}!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {  
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>

              <div className="">
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?">
                </input>
              </div>

              <div className="">
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa">
                </input>
              </div>

              <div className="">
                <input 
                  placeholder="Qual é o link para comunidade?" 
                  name="url" 
                  aria-label="Qual é o link para comunidade?">
                </input>
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className= "smallTitle">
              Pessoas da comunidade ({pessoasComunidade.length})
            </h2>
            <ul>
              {pessoasComunidade.map((pessoa) => {
                return (
                  <li  key= {pessoa}>
                    <a href={`/users/${pessoa}`}>
                        <img src={`https://github.com/${pessoa}.png`} style={{ borderRadius: '8px'}} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className= "smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key= {itemAtual.id}>
                    <a href={`${itemAtual.url}`}>
                        <img src={itemAtual.image} style={{ borderRadius: '8px'}} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
