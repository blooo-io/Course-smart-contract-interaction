import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import Card from 'react-bootstrap/Card'
import RequestModal from './RequestModal'
import { BigNumber } from 'ethers'

/**
 *  Component that display the List of IP that has been saved since the beginning
 * @component
 * @category List
 * @return {Jsx}
 */
const IntellectualPropertyList = () => {
  const [contract, setContract] = useState(null)
  const [intellectualProperties, setIntellectualProperties] = useState([])
  const [show, setShow] = useState(false)
  const [ipId, setID] = useState<number | null>(null)

  useEffect(() => {
    setContract(getContract())
  }, [])

  useEffect(() => {
    if (contract) {
      getAllIPs()

      contract.on('requestCreated', async function () {})

      contract.on('ipCreated', async function () {
        getAllIPs()
      })

      return () => {
        contract.off('requestCreated', async function () {})
      }
    }
  }, [contract])

  /**
   * Function that format the description
   * @function
   * @async
   * @returns {String}
   */
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
        ownerAddress: ip.ownerAddress,
        date: ip.date
      })
    })
    setIntellectualProperties(tempArray)
  }

  /**
   * Function that format the date
   * @function
   * @returns {String}
   */
  const dateFormat = (ipDate: BigNumber) => {
    const dateInNumber = parseInt(ipDate._hex, 16)
    const date = new Date(dateInNumber)

    return date.toTimeString()
  }

  /**
   * Triger the modal and set the IP id
   * @param id ID of the intellectual property
   */
  const handleShow = (id: number) => {
    setShow(true)
    setID(id)
  }

  return (
    <>
      {intellectualProperties.length > 0 && (
        <div className="w-100 h-100 pt-rem-8 mx-lg-5 d-flex flex-column mb-3 mb-lg-0">
          <button className="list-button mx-2 background-indigo text-magic-mint">
            List of all intellectual properties saved on the smart contract
          </button>
          <div className="h-100 mx-2 d-flex flex-column">
            {intellectualProperties.map(
              (ip: IntellectualProperty, index: number) => {
                return (
                  <div
                    className="mt-5 w-100 d-flex flex-column flex-lg-row"
                    key={index}
                  >
                    <Card className="myip-card w-100 mr-4">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex flex-column flex-lg-row justify-content-around">
                          <Card.Text className="myip-text-card my-3">
                            Owner address : {ip.ownerAddress}
                          </Card.Text>
                          <Card.Text className="myip-text-card my-3">
                            Last name : {ip.lastName}
                          </Card.Text>
                          <Card.Text className="myip-text-card my-3">
                            Last name : {ip.lastName}
                          </Card.Text>
                          <Card.Text className="myip-text-card my-3">
                            Date : {dateFormat(ip.date)}
                          </Card.Text>
                        </div>
                        <hr />
                        <Card.Text className="myip-text-card my-3">
                          Description : {ip.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <button
                      className="list-button-request mt-3 mt-lg-0"
                      onClick={() => handleShow(ip.id)}
                    >
                      Send a download request
                    </button>
                  </div>
                )
              }
            )}
          </div>
          <RequestModal show={show} setShow={setShow} id={ipId} />
        </div>
      )}
    </>
  )
}

export default IntellectualPropertyList
