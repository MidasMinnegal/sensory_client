import './App.css';
import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {colors, spacing} from "./components/styled/variables";
import useWebSocket from 'react-use-websocket';
import Client from "./components/Client";

const ApplicationWrapper = styled.div`
  background-color: ${colors.lightestGrey};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.md};
`

const serverUrl = 'ws://sensory-server.onrender.com/index.js/'

const App = () => {
  const [clientList, setClientList] = useState([]) // Contains all clients, including webclients
  const [webClientList, setWebClientList] = useState([]) // Contains just the webclients so no arduinos

  const {sendMessage, lastMessage} = useWebSocket(serverUrl, {
    onOpen: () => {
      sendMessage("SET_ROLE_CLIENT")
      sendMessage("REQUEST_CLIENT_LIST")
      console.log('WebSocket connection established.');
    }
  });

  const updateClientList = (msg) => {
    const dataArray = msg.split(',')
    setClientList([...dataArray])
  }

  const updateWebClientList = (msg) => {
    const dataArray = msg.split(',')
    setWebClientList([...dataArray])
  }

  const executeMessage = (msg) => {
    const [cmdCat, cmd]= msg.split('|')
    switch(cmdCat) {
      case 'UPDATED_CLIENT_LIST':
        updateClientList(cmd)
        break;
      case 'UPDATED_WEBCLIENT_LIST':
        updateWebClientList(cmd)
        break
      default:
        console.log('Default handle message', cmd)
    }
  }

  const setClientAction = (id, action) => {
    sendMessage(`ARD_ACTION|${id},${action}`)
  }

  useEffect(() => {
    if(lastMessage?.data) {
      executeMessage(lastMessage.data)
    }
  }, [lastMessage])

  return (
    <ApplicationWrapper>
      <Container>
        <h1>Connected Clients</h1>
        {clientList.filter((id) => !webClientList.includes(id)).map((id) => <Client key={id} id={id} setClientAction={setClientAction} />)}
        <h1>Connected Webclients</h1>
        {webClientList.map((id) => <div key={id}>{id}</div>)}
      </Container>
    </ApplicationWrapper>
  )
}

export default App;
