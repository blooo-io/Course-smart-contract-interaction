import React from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import { Card, Button } from 'react-bootstrap'

const IntellectualPropertyCard = (props: { ip: IntellectualProperty }) => {
  const { ip } = props

  const descriptionFormat = () => {
    return ip.description.length > 300 ? `${ip.description.substring(0,300)}...` : ip.description;
  }

  return (
    <div className='mr-5 w-30'>
      <Card className='myip-card w-100'>
        <Card.Body>
          <Card.Title className='myip-text-card myip-title-card'>{ip.firstName}</Card.Title>
          <hr/>
          <Card.Text className='myip-text-card my-3'>First name : {ip.firstName}</Card.Text>
          <Card.Text className='myip-text-card my-3'>Last name : {ip.lastName}</Card.Text>
          <Card.Text className='myip-text-card my-3'>Description : <span className='font-weight-normal'>{descriptionFormat()}</span></Card.Text>
          <hr/>
          <button className='myip-button-card'>Download ({ip.fileName}) </button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default IntellectualPropertyCard
