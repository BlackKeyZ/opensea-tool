import React from 'react'

export const AddressContext = React.createContext({
  address: null,
  setAddress: address => {}
})
