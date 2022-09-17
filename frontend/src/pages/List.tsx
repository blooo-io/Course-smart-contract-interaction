import React from 'react'
import IntellectualPropertyList from '../components/IntellectualPropertyList'

/**
 *  List page
 * @component
 * @category Page
 * @return {Jsx}
 */
const List = () => {
  return (
    <div className="w-100 d-flex flex-row align-items-center page-container background-magic-mint">
        <IntellectualPropertyList />
    </div>
  )
}

export default List
