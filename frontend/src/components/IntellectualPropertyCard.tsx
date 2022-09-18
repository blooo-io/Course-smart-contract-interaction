import React from 'react'
import { IntellectualProperty } from '../interfaces/IntellectualProperties'
import { Card, Button } from 'react-bootstrap'


/**
 *  Component that display the IP as a card
 * @component
 * @category My IP
 * @param {Object} props
 * @param {Object} props.ip  Intellectual property object
 * @return {Jsx}
 */
const IntellectualPropertyCard = (props: { ip: IntellectualProperty }) => {
  const { ip } = props

  /**
   * Function that format the description
   * @function
   * @returns {String}
   */
  const descriptionFormat = () => {
    return ip.description.length > 300 ? `${ip.description.substring(0,300)}...` : ip.description;
  }

  /**
   * Function that format the date
   * @function
   * @returns {String}
   */
  const dateFormat = () => {
    const dateInNumber = parseInt(ip.date._hex, 16);
    const date = new Date(dateInNumber);

    return date.toTimeString();
  }

  return (
    <div className='mx-3 mx-lg-0 mb-5 mb-lg-0 mr-lg-5 w-lg-30'>
      <Card className='myip-card w-100'>
        <Card.Body>
          <Card.Title className='myip-text-card myip-title-card'>{ip.firstName}</Card.Title>
          <hr/>
          <Card.Text className='myip-text-card my-3'>First name : {ip.firstName}</Card.Text>
          <Card.Text className='myip-text-card my-3'>Last name : {ip.lastName}</Card.Text>
          <Card.Text className='myip-text-card my-3'>Date : <span className='font-weight-normal'>{dateFormat()}</span></Card.Text>
          <Card.Text className='myip-text-card my-3'>Description : <span className='font-weight-normal'>{descriptionFormat()}</span></Card.Text>
          <hr/>
          <button className='myip-button-card'>Download ({ip.fileName}) </button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default IntellectualPropertyCard
