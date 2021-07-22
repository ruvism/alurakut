// import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons' ; 
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations' ;

function ProfileSideBar(props){
  
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'ruvism';
  const nomePerfil = 'Rúvila'
  const pessoasComunidade = ['rafaballerini', 
    'annelesinhovski', 
    'isadorastan',  
    'vicduraes', 
    'backinkansas', 
    'taizarm',
  ];

  return(
    <>
      <AlurakutMenu />
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className= "smallTitle">
              Pessoas da comunidade ({pessoasComunidade.length})
            </h2>
            <ul>
              {pessoasComunidade.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key= {pessoa}>
                        <img src={`https://github.com/${pessoa}.png`} style={{ borderRadius: '8px'}} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades </Box>
        </div>
      </MainGrid>
    </>
  )
}
