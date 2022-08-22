import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import IntellectualPropertyCard from '../components/IntellectualPropertyCard'

const SharedIPContainer = () => {
  const [contract, setContract] = useState(null)
  const [intellectualProperties, setIntellectualProperties] = useState([])

  useEffect(() => {
    setContract(getContract())
  }, [])

  useEffect(() => {
    if (contract) {
      getAllIPs()

      contract.on('ipCreated', async function () {
        getAllIPs()
      })
    }
  }, [contract])

  async function getAllIPs() {
    const retrievedIPs = await contract.getAllMySharedIntellectualProperties()

    const tempArray: any = []
    retrievedIPs.forEach((ip: IntellectualProperty) => {
      tempArray.push({
        id: ip.id,
        firstName: ip.firstName,
        lastName: ip.lastName,
        description: ip.description,
        fileHash: ip.fileHash,
        fileName: ip.fileName,
        ownerAddress: ip.ownerAddress,
        date: ip.date
      })
    })
    setIntellectualProperties(tempArray)
  }


  return (
    <>
      {intellectualProperties.length > 0 && (
        <div className='pt-rem-8 ml-5 d-flex flew-row'>
          {intellectualProperties.map(
            (ip: IntellectualProperty, index: number) => {
              return <IntellectualPropertyCard ip={ip} key={index} />
            }
          )}
        </div>
      )}
    </>
  )
}

export default SharedIPContainer
