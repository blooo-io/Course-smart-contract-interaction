import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import getContract from '../utils/getContract'
import Form from 'react-bootstrap/Form'
import { ethers } from 'ethers'
import Alert from 'react-bootstrap/Alert'
import classNames from 'classnames'

type Props = {
  show: boolean
  setShow: Function
  id: number | null
}

/**
 *  Component which send a download request
 * @component
 * @category Request
 * @param {Object} props
 * @param {Boolean} props.show      Boolean which open or close the modal
 * @param {Function} props.setShow  Function to set the show variable
 * @param {String} props.id         Intellectual property id
 * @return {Jsx}
 */
const RequestModal = ({ show, setShow, id }: Props) => {
  const [contract, setContract] = useState(null)
  const [validated, setValidated] = useState(false)
  const [accounts, setAccounts] = useState<Array<string>>([])
  const [alert, setAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [first, setFirst] = useState(true)

  /**
   * Fetch the smart contract and the list of accounts
   * @function
   * @async
   */
  const fetchContract = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const accountsList = await provider.listAccounts()
    setAccounts(accountsList)

    setContract(getContract())
  }

  /**
   * Close the request modal
   * @function
   */
  const handleClose = () => setShow(false)

  /**
   * Create a request download transaction to the smart contract
   * @function
   * @async
   * @param {Event} event Event object
   */
  const handleSendRequest = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const { description } = event.target // get the description from event target

      contract.once(
        'requestCreated',
        async function (reqestId: Number, address: String) {
          setAlert(true)
          setAlertVariant('success')
          setAlertMessage(`${address} a envoyé une requête de téléchargement`)
        }
      )

      contract.requestDownload(id, description.value).catch((error) => {
        if (error.code === 4001) {
          //user rejected the transaction
          setAlert(true)
          setAlertVariant('danger')
          setAlertMessage(`user rejected the transaction`)
        }
      }) // call the requestDownload Contract Function

      handleClose()
    }
    setValidated(true)
  }

  useEffect(() => {
    fetchContract()
  }, [])

  useEffect(() => {
    if (contract && first) {
      contract.on('requestCreated', async function () {})
      return () => {
        contract.off('requestCreated', () => setFirst(false))
      }
    }
  }, [contract, first])

  return (
    <>
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
      <Modal show={show} onHide={handleClose}>
        <Form
          className="align-self-center w-75"
          noValidate
          validated={validated}
          onSubmit={handleSendRequest}
        >
          <Form.Group className="my-6" controlId="account">
            <Form.Label>Account public Key</Form.Label>
            <Form.Control
              type="text"
              defaultValue={accounts[0]}
              disabled
              required
              placeholder="Ox..."
            />
          </Form.Group>
          <Form.Group className="my-6" controlId="description">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describe your file"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center mb-4">
            <button
              className="cancel-button mr-2"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button className="send-button" type="submit">
              Send request
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default RequestModal
