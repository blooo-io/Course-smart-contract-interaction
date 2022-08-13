import React, { useEffect, useState } from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import getContract from '../utils/getContract'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { columns } from '../utils/dataList'

const IntellectualPropertyList = () => {
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

  async function getAllIPs() {
    const retrievedIPs = await contract.getAllDeployedIntellectualProperties()

    const tempArray: any = []
    retrievedIPs.forEach((ip: IntellectualProperty, index: number) => {
      tempArray.push({
        id: index+1,
        firstName: ip.firstName,
        lastName: ip.lastName,
        description: ip.description,
        fileHash: ip.fileHash,
        fileName: ip.fileName,
        ownerAddress: ip.ownerAddress
      })
    })
    setIntellectualProperties(tempArray)
  }

  const handleClickAction = () => {

  }


  const actionFormatter = () => {
    return (
      <div>
          <Button
            className="mx-2 w-50 fs--2"
            onClick={() => handleClickAction()}
          >
            Request a download
          </Button>
      </div>
    );
  };


  columns.forEach((obj) => {
    if (obj.dataField === "action") {
      obj.formatter = actionFormatter;
    }
  })


  return (
    <>
      <BootstrapTable
        bootstrap4={true}
        keyField="id"
        data={intellectualProperties}
        columns={columns}
        bordered={false}
        classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
        rowClasses="btn-reveal-trigger"
        headerClasses="bg-200 text-900"
      />
    </>
  )
}

export default IntellectualPropertyList
