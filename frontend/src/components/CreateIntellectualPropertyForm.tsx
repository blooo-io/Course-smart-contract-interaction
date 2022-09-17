import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ipfsService } from '../../services/ipfsService'
import getContract from '../utils/getContract'
import { Form, Button, Card } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import classNames from 'classnames'

/**
 *  Component which handle the creation of an IP
 * @component
 * @category Home
 * @return {Jsx}
 */
const CreateIntellectualPropertyForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [first, setFirst] = useState(true)

  /**
   * Fetch the contract object to interact with the contract
   * @function
   * @async
   * @example
   *
   * fetchContract()
   */
  const fetchContract = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const accountsList = await provider.listAccounts()
    setAccounts(accountsList)

    setContract(getContract())
    ipfsService.testAuthentication()
  }

  useEffect(() => {
    fetchContract()
  }, [])

  useEffect(() => {
    if (contract && first) {
      contract.on(
        'ipCreated',
        async function (address: String, name: String, lastName: String) {
          console.log(address, name, lastName)
        }
      )
      return () => {
        contract.off('ipCreated', () => setFirst(false))
      }
    }
  }, [contract, first])

  /**
   * Upload the file into an IPFS service
   * @function
   * @async
   * @returns {Promise}
   */
  const IPFSUploadHandler = async (): Promise<string> => {
    const resp = await ipfsService.pinFileToIPFS(selectedFile)
    if (!resp.data.IpfsHash) throw Error('no IPFS Hash')
    return `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`
  }

  /**
   * Submit the creation of an IP on the blockchain
   * @function
   * @param event Event object
   */
  const registerIntellectualProperty = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const { firstName, lastName, description } = event.target // get the information from formdata

      const ipfsImageHash = await IPFSUploadHandler() // getting the IPFS Image Hash from the Pinata API Service

      const date = Date.now()
      console.log(contract)

      contract.once(
        'ipCreated',
        async function (address: String, name: String, lName: String) {
          console.log(address, name, lastName)
          setAlert(true)
          setAlertVariant('success')
          setAlertMessage(
            `${name} ${lName} a enregistré sa propriété intellectuelle sur le contrat ${address}`
          )
          firstName.value = ''
          lastName.value = ''
          description.value = ''
        }
      )

      contract
        .createIntellectualProperty({
          firstName: firstName.value,
          lastName: lastName.value,
          description: description.value,
          fileHash: ipfsImageHash,
          fileName: selectedFile.name,
          date: date
        })
        .catch((error) => {
          if (error.code === 4001) {
            //user rejected the transaction
            setAlert(true)
            setAlertVariant('danger')
            setAlertMessage(
              `user rejected the transaction`
            )
          }
        }) // call the registerIntellectualProperty Contract Function
    }
    setValidated(true)
  }

  return (
    <>
      {alert && (
        <Alert className={classNames("",{
          "alert-success": alertVariant === "success",
        })} variant={alertVariant}>
          {alertMessage}
        </Alert>
      )}
      <Form
        className="align-self-center w-75"
        noValidate
        validated={validated}
        onSubmit={registerIntellectualProperty}
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
        <Form.Group className="my-6" controlId="firstName">
          <Form.Label>First name (required)</Form.Label>
          <Form.Control type="text" required placeholder="Guillaume..." />
        </Form.Group>
        <Form.Group className="my-6" controlId="lastName">
          <Form.Label>Last name (required)</Form.Label>
          <Form.Control type="text" required placeholder="Dupont..." />
        </Form.Group>
        <Form.Group className="my-6" controlId="file">
          <Form.Label>File (required)</Form.Label>
          <Form.Control
            onChange={(e) => setSelectedFile(e.target?.files[0])}
            type="file"
            size="lg"
            multiple
            required
          />
        </Form.Group>
        <Form.Group className="my-6" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe your file"
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="background-indigo text-magic-mint w-50 mt-3 py-3 button-form"
          >
            Submit form
          </Button>
        </div>
      </Form>
    </>
  )
}

export default CreateIntellectualPropertyForm
