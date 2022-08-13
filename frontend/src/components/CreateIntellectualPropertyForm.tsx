import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { ipfsService } from '../../services/ipfsService'
import getContract from '../utils/getContract'
import {Form,Button,Card} from 'react-bootstrap'

export const CreateIntellectualPropertyForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [validated, setValidated] = useState(false)

  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider( (window as any).ethereum);
    const accountsList = await provider.listAccounts();
    setAccounts(accountsList);

    setContract(getContract())
    ipfsService.testAuthentication()
  }, [])

  const IPFSUploadHandler = async (): Promise<string> => {
    const resp = await ipfsService.pinFileToIPFS(selectedFile)
    if (!resp.data.IpfsHash) throw Error('no IPFS Hash')
    return `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`
  }

  const registerIntellectualProperty = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const { firstName, lastName, description } = event.target // get the information from formdata

      const ipfsImageHash = await IPFSUploadHandler() // getting the IPFS Image Hash from the Pinata API Service

      contract.createIntellectualProperty(
        firstName.value,
        lastName.value,
        description.value,
        ipfsImageHash,
        selectedFile.name
      ) // call the VoteManager registerIntellectualProperty Contract Function
    }
    setValidated(true)
  }

  return (
    <Card className="card-form">
      <Form
        noValidate
        validated={validated}
        onSubmit={registerIntellectualProperty}
      >
        <Form.Group className="my-6" controlId="account">
          <Form.Label>Account public Key</Form.Label>
          <Form.Control
            type="text"
            className="text-center"
            defaultValue={accounts[0]}
            disabled
            required
          />
        </Form.Group>
        <Form.Group className="my-6" controlId="firstName">
          <Form.Label>First name (required)</Form.Label>
          <Form.Control type="text" className="text-center" required />
        </Form.Group>
        <Form.Group className="my-6" controlId="lastName">
          <Form.Label>Last name (required)</Form.Label>
          <Form.Control type="text" className="text-center" required />
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
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <div className='d-flex justify-content-center'>
          <Button type="submit" className="my-6 py-2 px-4 button-form">
            Submit form
          </Button>
        </div>
      </Form>
    </Card>
  )
}
