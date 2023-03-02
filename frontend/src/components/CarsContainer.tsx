import React, { useEffect, useState } from 'react'
import { Vehicule } from '../interfaces/Vehicule'
import getContract from '../utils/getContract'
import CarCard from './CarCard'
import classNames from 'classnames'

/**
 *  Component which contain the property card
 * @component
 * @category My IP
 * @return {Jsx}
 */
const CarsContainer = () => {
  const [contract, setContract] = useState(null)
  const [cars, setCars] = useState([])

  useEffect(() => {
    setContract(getContract())
  }, [])

  useEffect(() => {
    if (contract) {
      getAllCars()
    }
  }, [contract])

  /**
   * Function that get the array of the user IP
   * @function
   * @async
   */
  async function getAllCars() {
    const retrievedCars = await contract.getAllDeployedCars()

    const tempArray: any = []
    retrievedCars.forEach((car: Vehicule, index: number) => {
      tempArray.push({
        id: index,
        model: car.model,
        location: car.location,
        ownerAddress: car.ownerAddress,
      })
    })
    setCars(tempArray)
  }

  return (
    <div
      className={classNames('pt-rem-8 ml-lg-5 d-flex flex-column flex-lg-row', {
        'vh-100': cars.length < 2
      })}
    >
      {cars.length > 0 && (
        <>
          {cars.map(
            (car: Vehicule, index: number) => {
              return <CarCard car={car} key={index} />
            }
          )}
        </>
      )}
    </div>
  )
}

export default CarsContainer
