import React from 'react'

const SideNavbar = props => {
  const onClick = props.click
  const bikeTypes = ['Chopper', 'Sport Bike', 'Dirt Bike']
  const colors = ['Silver', 'Blue']

  return (
    <div id="sideNavBar">
      <h3>
        Bike Type:
        <ul>
          {bikeTypes.map(type => {
            return (
              <li onClick={onClick} id={type}>
                {type}
              </li>
            )
          })}
        </ul>
      </h3>
      <h3>
        Color:
        <ul>
          {colors.map(color => {
            return (
              <li onClick={onClick} id={color}>
                {color}
              </li>
            )
          })}
        </ul>
      </h3>
    </div>
  )
}

export default SideNavbar
