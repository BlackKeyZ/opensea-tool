import React from 'react'
import styled from 'styled-components'

const ConnectButton = styled.div`
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 3px 10px;
  font-weight: 500;
  color: #333333;
  :hover {
    background-color: #dddddd;
  }
`

async function connect() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
}

export function Welcome() {
  return (
    <div onClick={connect} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 200}}>
      <ConnectButton>Connect MetaMask</ConnectButton>
    </div>
  )
}
