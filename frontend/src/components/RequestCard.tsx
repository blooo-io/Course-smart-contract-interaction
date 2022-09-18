import React, { useEffect, useState } from 'react'
import { Request } from '../interfaces/IntellectualProperties'
import Card from 'react-bootstrap/Card'
import getContract from '../utils/getContract'
import Alert from 'react-bootstrap/Alert'
import classNames from 'classnames'

type Props = {
  request: Request
}

/**
 *  Component that display the request as a card
 * @component
 * @category Request
 * @param {Object} props
 * @param {Object} props.request  Request object
 * @return {Jsx}
 */
const RequestCard = ({ request }: Props) => {
  const [contract, setContract] = useState(null)
  const [alert, setAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [first, setFirst] = useState(true)

  /**
   * Function that fetch the contract
   * @function
   * @async
   */
  const fetchContract = async () => {
    setContract(getContract())
  }

  useEffect(() => {
    fetchContract()
  }, [])

  useEffect(() => {
    if (contract && first) {
      contract.on('requestAnswered', async function () {})
      return () => {
        contract.off('requestAnswered', () => setFirst(false))
      }
    }
  }, [contract, first])

  /**
   * Function that decline a request
   * @function
   */
  const declineRequest = () => {
    contract.once(
      'requestAnswered',
      async function () {
        setAlert(true)
        setAlertVariant('success')
        setAlertMessage(`La requête a été décliné.`)
      }
    )
    contract.declineRequest(
      request.id
    ).catch((error) => {
      if (error.code === 4001) {
        //user rejected the transaction
        setAlert(true)
        setAlertVariant('danger')
        setAlertMessage(`user rejected the transaction`)
      }
    }) // call the declineRequest Contract Function
  }

  /**
   * Function that accept a request
   * @function
   */
  const acceptRequest = async () => {
    contract.once(
      'requestAnswered',
      async function () {
        setAlert(true)
        setAlertVariant('success')
        setAlertMessage(`La requête a été accepté.`)
      }
    )
    contract.acceptRequest(
      request.id
    ).catch((error) => {
      if (error.code === 4001) {
        //user rejected the transaction
        setAlert(true)
        setAlertVariant('danger')
        setAlertMessage(`user rejected the transaction`)
      }
    }) // call the acceptRequest Contract Function
  }

  return (
    <div className="mr-5 mb-5 w-100 d-flex flex-column flex-lg-row">
      {alert && (
        <div className='d-flex justify-content-center'>
          <Alert
            className={classNames('text-center', {
              'alert-success': alertVariant === 'success'
            })}
            variant={alertVariant}
          >
            {alertMessage}
          </Alert>
        </div>
      )}
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
      <div className="d-flex flex-row flex-lg-column justify-content-around mt-3 mt-lg-0">
        <button className="request-accept-button mx-2 mx-lg-0" onClick={acceptRequest}>
          Accept
        </button>
        <button className="request-decline-button mx-2 mx-lg-0" onClick={declineRequest}>
          Decline
        </button>
      </div>
    </div>
  )
}

export default RequestCard
