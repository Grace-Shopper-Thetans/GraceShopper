import React from 'react'

const SideNavbar = (props) => {
  const onClick = props.click
  const bikeTypes = ['Chopper', 'Sport Bike', 'Dirt Bike']
  const colors = ['Black', 'Blue', 'Green', 'Orange', 'Red', 'Silver', 'Yellow']

  return (
    <div id="sideNavBar">
      <h1 id="filterTitle">Filter Products</h1>
      <h3 className="filterType">
        Bike Type:
        <ul>
          {bikeTypes.map((type) => {
            return (
              <li
                className="type"
                key={type}
                onClick={onClick}
                id={
                  props.state.type === type
                    ? 'filterTypeSelected'
                    : 'filterType'
                }
              >
                {type}
              </li>
            )
          })}
        </ul>
      </h3>
      <h3 className="filterType">
        Color:
        <ul>
          {colors.map((color) => {
            return (
              <li
                key={color}
                onClick={onClick}
                className="color"
                id={
                  props.state.color === color
                    ? 'filterTypeSelected'
                    : 'filterType'
                }
              >
                {color}
              </li>
            )
          })}
        </ul>
      </h3>
      <button type="button" onClick={props.resetFilter} id="resetFilter">
        Reset Filter
      </button>
    </div>
  )
}

export default SideNavbar
