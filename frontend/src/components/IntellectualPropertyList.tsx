import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import Card from 'react-bootstrap/Card'
import RequestModal from './RequestModal'

const IntellectualPropertyList = () => {
  const [contract, setContract] = useState(null)
  const [intellectualProperties, setIntellectualProperties] = useState([])
  const [show, setShow] = useState(false);
  const [ipId, setID] = useState<number | null>(null);

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
    retrievedIPs.forEach((ip: IntellectualProperty, index: number) => {
      tempArray.push({
        id: index + 1,
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

  const handleShow = (id:number) => {
    console.log(id);
    
    setShow(true)
    setID(id)
  };

  return (
    <>
      {intellectualProperties.length > 0 && (
        <div className="w-100 h-100 pt-rem-8 mx-5 d-flex flex-column">
          <button className="list-button mx-2 background-indigo text-magic-mint">
            List of all intellectual properties saved on the smart contract
          </button>
          <div className="h-100 mx-2 d-flex flex-column">
            {intellectualProperties.map(
              (ip: IntellectualProperty, index: number) => {
                return (
                  <div className="mt-5 w-100 d-flex flex-row" key={index}>
                    <Card className="myip-card w-100 mr-4">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-around">
                          <Card.Text className="myip-text-card my-3">
                            Owner address : {ip.ownerAddress}
                          </Card.Text>
                          <Card.Text className="myip-text-card my-3">
                            Last name : {ip.lastName}
                          </Card.Text>
                          <Card.Text className="myip-text-card my-3">
                            Last name : {ip.lastName}
                          </Card.Text>
                        </div>
                        <hr />
                        <Card.Text className="myip-text-card my-3">
                          Description : {ip.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <button className="list-button-request" onClick={() => handleShow(ip.id)}>
                      Send a download request
                    </button>
                  </div>
                )
              }
            )}
          </div>
          <RequestModal show={show} setShow={setShow} id={ipId}/>
        </div>
      )}
    </>
  )
}

export default IntellectualPropertyList
