import React from 'react'

const LandingPage = props => {
  function handleClick() {
    props.history.push(`/products`)
  }
  return (
    <div>
      <img src="landingPage.jpg" id="landingPage" />
      <button id="enterSiteButton" type="button" onClick={handleClick}>
        Enter Site
      </button>
    </div>
  )
}

export default LandingPage
