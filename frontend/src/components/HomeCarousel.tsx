import React from 'react'
import { Carousel } from 'react-bootstrap'
import imageCarousel2 from '../../assets/carousel_2.jpg'
import imageCarousel4 from '../../assets/carousel_4.jpg'
import imageCarousel5 from '../../assets/carousel_5.jpg'

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={imageCarousel4} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageCarousel2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={imageCarousel5} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel
