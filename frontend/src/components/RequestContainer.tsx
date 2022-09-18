import React, { useEffect, useState } from 'react'
import getContract from '../utils/getContract'
import { Request } from '../interfaces/IntellectualProperties'
import RequestCard from './RequestCard'
import classNames from 'classnames'

/**
 *  Component that contain the request card
 * @component
 * @category Request
 * @return {Jsx}
 */
const RequestContainer = () => {
  const [contract, setContract] = useState(null)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    setContract(getContract())
  }, [])

  useEffect(() => {
    if (contract) {
      getAllRequests()

      contract.on('requestCreated', async function () {
        getAllRequests()
      })

      contract.on('requestAnswered', async function () {
        getAllRequests()
      })
    }
  }, [contract])

  /**
   * Function that gets all the requests
   * @function
   * @async
   */
  async function getAllRequests() {
    const retrievedRequests = await contract.getAllMyRequest()

    const tempArray: any = []
    retrievedRequests.forEach((request: Request) => {
      tempArray.push({
        id: request.id,
        ipId: request.ipId,
        description: request.description,
        requestor: request.requestor
      })
    })
    setRequests(tempArray)
  }

  return (
    <div
      className={classNames('pt-rem-8 ml-lg-5 d-flex flex-column flex-lg-row', {
        'vh-100': requests.length < 2
      })}
    >
      {requests.length > 0 && (
        <>
          {requests.map((request: Request, index: number) => {
            return <RequestCard request={request} key={index} />
          })}
        </>
      )}
    </div>
  )
}

export default RequestContainer
