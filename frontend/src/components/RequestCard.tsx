import React, { useEffect, useState } from 'react'
import { Request } from '../interfaces/IntellectualProperties'
import Card from 'react-bootstrap/Card'
import getContract from '../utils/getContract'

type Props = {
  request: Request
}

const RequestCard = ({ request }: Props) => {
  const [contract, setContract] = useState(null)

  const fetchContract = async () => {
    setContract(getContract())
  }

  useEffect(() => {
    fetchContract()
  }, [])

  const declineRequest = () => {
    contract.declineRequest(
      request.id
    ) // call the declineRequest Contract Function
  }

  const acceptRequest = async () => {
    contract.acceptRequest(
      request.id
    ) // call the acceptRequest Contract Function
  }

  return (
    <div className="mr-5 mb-5 w-100 d-flex flex-row">
      <Card className="myip-card w-100 mr-3">
        <Card.Body>
          <Card.Text className="request-text-card mb-3 text-center ">
            The address {request.requestor} request a download.
          </Card.Text>
          <hr />
          <Card.Text className="myip-text-card my-3">
            reason :{' '}
            <span className="reason-request">{request.description}</span>
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="d-flex flex-column justify-content-around">
        <button className="request-accept-button" onClick={acceptRequest}>
          Accept
        </button>
        <button className="request-decline-button" onClick={declineRequest}>
          Decline
        </button>
      </div>
    </div>
  )
}

export default RequestCard
