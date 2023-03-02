import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import getContract from '../utils/getContract'
import { Form, Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import classNames from 'classnames'

/**
 *  Component which handle the creation of an IP
 * @component
 * @category Home
 * @return {Jsx}
 */
const CreateVehiculeForm = () => {
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

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
  }

  useEffect(() => {
    fetchContract()
  }, [])

  /**
   * Submit the creation of an IP on the blockchain
   * @function
   * @param event Event object
   */
  const registerCar = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const { model, location } = event.target // get the information from formdata

      console.log(contract)

      contract
        .createCar( model.value, location.value )
        .catch((error) => {
          console.log(error);
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
        className="align-self-center w-75 pt-5 pb-5 pt-lg-0 pb-lg-0"
        noValidate
        validated={validated}
        onSubmit={registerCar}
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

        <Form.Group className="my-6" controlId="model">
          <Form.Label>Model (required)</Form.Label>
          <Form.Control type="text" required placeholder="Citroen..." />
        </Form.Group>
        <Form.Group className="my-6" controlId="location">
          <Form.Label>Location (required)</Form.Label>
          <Form.Control type="text" required placeholder="Paris" />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="background-indigo text-magic-mint w-100 w-md-50 mt-3 py-3 button-form"
          >
            Submit form
          </Button>
        </div>
      </Form>
    </>
  )
}

export default CreateVehiculeForm
