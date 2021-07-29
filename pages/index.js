// import styled from 'styled-components';
import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons' ; 
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations' ;

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

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className= "smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((item) => {
          return (
            <li  key= {item}>
              <a href={`/users/${item}`}>
                  <img src={`https://github.com/${item}.png`} style={{ borderRadius: '8px'}} />
                <span>{item}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const nomePerfil = 'Rúvila';
  const githubUser = 'ruvism';
  const [comunidades, setComunidades] =  React.useState([]);
  const pessoasComunidade = [
    'backinkansas', 
    'vicduraes', 
    'taizarm',
    'rafaballerini', 
    'annelesinhovski', 
    'isadorastan',  
  ];

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
    //GET api github
    fetch(`https://api.github.com/users/ruvism/followers`)
    .then( function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'd26aa0c7ebab2e5bd91b72bc48afaa',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query" : `query{
        allCommunities {
          id
          title
          imageUrl
          externalLink
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json() )
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])
  
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
                imageUrl: dadosDoForm.get('image'),
                externalLink: dadosDoForm.get('url'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
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
                    <a href={`/communities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} style={{ borderRadius: '8px'}} />
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
