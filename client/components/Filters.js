import React from 'react'

const SideNavbar = props => {
  const onClick = props.click
  return (
    <div>
      <h3>
        Bike Type:
        <ul>
          <li onClick={onClick} id="Chopper">
            Chopper
          </li>
          <li onClick={onClick}>Sport Bike</li>
          <li onClick={onClick}>Dirt Bike</li>
        </ul>
      </h3>
    </div>
  )
}

export default SideNavbar
