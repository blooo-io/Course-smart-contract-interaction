import React from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import {Card,Button} from 'react-bootstrap'

const IntellectualPropertyCard = (props: {
  ip: IntellectualProperty
}) => {
  const { ip } = props

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>{ip.fileName}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {ip.description}
          </Card.Text>
          <Button variant="primary">Download file</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default IntellectualPropertyCard
