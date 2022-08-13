import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import Table from 'react-bootstrap/Table'

const IntellectualPropertyContainer = () => {
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
    const retrievedIPs = await contract.getAllDeployedIntellectualProperties()

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
    <>
      {intellectualProperties.length > 0 && (
        <div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Owner</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Description</th>
                <th>File Name</th>
              </tr>
            </thead>
            <tbody>
              {intellectualProperties.map((ip: IntellectualProperty, index:number) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{ip.ownerAddress}</td>
                    <td>{ip.firstName}</td>
                    <td>{ip.lastName}</td>
                    <td>{ip.description}</td>
                    <td>{ip.fileName}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default IntellectualPropertyContainer
