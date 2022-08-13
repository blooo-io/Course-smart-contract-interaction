import React, { useEffect, useState } from 'react'
import IntellectualPropertyCard from '../components/IntellectualPropertyCard'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'

const Dashboard = () => {
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
    const retrievedIPs = await contract.getMyIntellectualProperties()

    const tempArray: any = []
    retrievedIPs.forEach((ip: IntellectualProperty) => {
      tempArray.push({
        id: ip.id,
        firstName: ip.firstName,
        lastName: ip.lastName,
        description: ip.description,
        fileHash: ip.fileHash,
        fileName: ip.fileName,
        ownerAddress: ip.ownerAddress
      })
    })
    setIntellectualProperties(tempArray)
  }

  return (
    <div>
      {intellectualProperties.length > 0 && (
        <>
          {intellectualProperties.map((ip: IntellectualProperty, index: number) => {
            return(
              <IntellectualPropertyCard ip={ip} key={index}/>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Dashboard