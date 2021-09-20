import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect
} from 'react-router-dom'

import {Welcome} from './page/Welcome'
import {Assets} from './page/Assets'
import {Asset} from './page/Asset'
import {AddressContext} from './util/context'

const Container = styled.div`
  margin: auto;
  background: #fff;
  position: relative;
  height: 100%;
`

export function App() {
  if (typeof window.ethereum === 'undefined') {
    return <div>Please install MetaMask</div>
  }
  const [address, setAddress] = useState(null)

  useEffect(function() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      setAddress(accounts[0])
    })
  }, [])

  useEffect(function() {
    ethereum.on('accountsChanged', function (accounts) {
      setAddress(accounts[0])
    })
  }, [])

  if (!address || !address.length) {
    return (
      <Container id="app">
        <AddressContext.Provider value={{address, setAddress}}>
          <Welcome />
        </AddressContext.Provider>
      </Container>
    )
  }

  return (
    <Container id="app">
      <AddressContext.Provider value={{address, setAddress}}>
        <Router>
          <Switch>
            <Route path="/assets">
              <Assets />
            </Route>
            <Route path="/asset/:tokenAddress/:tokenId">
              <Asset />
            </Route>
            <Redirect from="*" to="/assets" />
          </Switch>
        </Router>
      </AddressContext.Provider>
    </Container>
  )
}
