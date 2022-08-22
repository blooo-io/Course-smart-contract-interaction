import React, { useEffect, useState } from 'react'
import getContract from '../utils/getContract'
import { Request } from '../interfaces/IntellectualProperties'
import RequestCard from './RequestCard'

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
    <>
      {requests.length > 0 && (
        <div className="pt-rem-8 mx-5 d-flex flex-column">
          {requests.map((request: Request, index: number) => {
            return <RequestCard request={request} key={index} />
          })}
        </div>
      )}
    </>
  )
}

export default RequestContainer
