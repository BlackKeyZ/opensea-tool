import React, {useEffect, useContext, useState} from 'react'
import {seaport} from '../util/seaport'
import {AddressContext} from '../util/context'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const pageSize = 20 // by opensea

const AssetDiv = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 230px;
  padding: 3px;
  margin: 5px;
  color: #333333;
  :hover {
    background-color: #dddddd;
  }
`

function AssetItem(props) {
  const {asset} = props
  return <AssetDiv>
    <img src={asset.imagePreviewUrl} style={{width: 200, height: 200}} />
    <div style={{fontSize: 12, fontWeight: 500, margin: '5px 10px'}}>{asset.name}</div>
  </AssetDiv>
}

export function Assets() {
  const {address} = useContext(AddressContext)
  const [assetPage, setAssetPage] = useState({
    assets: null,
    page: 1,
    totalPage: 1
  })
  const [page, setPage] = useState(1)
  useEffect(function () {
    seaport.api.getAssets({owner: address}, page).then(pageContent => {
      console.log(pageContent)
      setAssetPage({
        assets: pageContent.assets,
        totalPage: Math.ceil(pageContent.estimatedCount / pageSize)
      })
    })
  }, [page])
  const [inputPage, setInputPage] = useState(1)

  if (!assetPage.assets) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {assetPage.assets.map(asset => {
          return <Link to={`/asset/${asset.tokenAddress}/${asset.tokenId}`}>
            <AssetItem asset={asset} />
          </Link>
        }
        )}
      </div>
      <div style={{textAlign: 'center'}}>
        jump to page 
        <input
          type="number"
          value={inputPage}
          onChange={event => {setInputPage(event.target.value)}}
          onKeyDown = {(event) => {
            if (event.key === 'Enter') {
              setPage(parseInt(inputPage, 10))
            }}
          }
        />
        <br />
        {page} / {assetPage ? assetPage.totalPage : '-'}
        <br />
        opensea havent return count, so I dont known how many pages...
      </div>
    </div>
  )
}
