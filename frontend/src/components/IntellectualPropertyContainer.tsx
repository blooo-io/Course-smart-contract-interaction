import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import IntellectualPropertyCard from '../components/IntellectualPropertyCard'
import classNames from 'classnames'

/**
 *  Component which contain the property card
 * @component
 * @category My IP
 * @return {Jsx}
 */
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

  /**
   * Function that get the array of the user IP
   * @function
   * @async
   */
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
        ownerAddress: ip.ownerAddress,
        date: ip.date
      })
    })
    setIntellectualProperties(tempArray)
  }

  return (
    <div
      className={classNames('pt-rem-8 ml-lg-5 d-flex flex-column flex-lg-row', {
        'vh-100': intellectualProperties.length < 2
      })}
    >
      {intellectualProperties.length > 0 && (
        <>
          {intellectualProperties.map(
            (ip: IntellectualProperty, index: number) => {
              return <IntellectualPropertyCard ip={ip} key={index} />
            }
          )}
        </>
      )}
    </div>
  )
}

export default IntellectualPropertyContainer
