import React, {useEffect, useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AddressContext} from '../util/context'
import {seaport} from '../util/seaport'
import styled from 'styled-components'

const ListButton = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  padding: 3px 20px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-top: 40px;
  :hover {
    background-color: #cccccc;
  }
`

// asset: {tokenId, tokenAddress}
async function batchSell(accountAddress, tokenAddress, tokenId, price, num, schema) {
  if (!price.length) {
    alert('price empty')
    return
  }
  if (!num.length) {
    alert('num empty')
    return
  }
  alert(`you will sell this item\nnum: ${num}, at price ${price}\nif it's correct, please signature then, for ${num} times`)
  for (let i = 0; i < num; i++) {
    await seaport.createSellOrder({
      asset: {
        tokenAddress,
        tokenId,
        schemaName: schema
      },
      accountAddress,
      startAmount: price,
    })
  }
}

export function Asset(props) {
  const {tokenId, tokenAddress} = useParams()
  const {address} = useContext(AddressContext)
  const [asset, setAsset] = useState(null)
  const [price, setPrice] = useState('')
  const [num, setNum] = useState('')
 
  useEffect(function() {
    seaport.api.getAsset({tokenAddress, tokenId}).then(asset => {
      setAsset(asset)
    })
  }, [])
  if (!asset) {
    return <div>Loading...</div>
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: '20px 10px'}}>
      <div style={{display: 'flex'}}>
        <img src={asset.imageUrl} />
        <div style={{marginLeft: 20, marginTop: 40, fontSize: 20, fontWeight: 600}}>{asset.name}</div>
      </div>
      <div style={{marginTop: 20}}>
        <div>SELL PRICE</div>
        <input type="number" value={price} onChange={event => {setPrice(event.target.value)}} />
      </div>
      <div style={{marginTop: 20}}>
        <div>SELL NUM (not opensea quantity, this num means there will be {'{num}'} sell orders, every order sell one item)</div>
        <input type="number" value={num} onChange={event => {setNum(event.target.value)}} />
      </div>
      <div style={{display: 'flex'}}>
        <ListButton
          style={{}}
          onClick={() => {batchSell(address, tokenAddress, tokenId, price, num, asset.assetContract.schemaName)}}>
          List
        </ListButton>
      </div>
    </div>
  )
}
