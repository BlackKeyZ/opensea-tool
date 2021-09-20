import { OpenSeaPort, Network } from 'opensea-js'

export const seaport = new OpenSeaPort(window.ethereum, {
  networkName: Network.Main
})
