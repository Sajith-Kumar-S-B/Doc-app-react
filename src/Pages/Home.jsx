import React from 'react'

function Home(props) {
  return (
    <div>
      <h3>{props.name? `Welcome - ${props.name} `: 'Login please'}</h3>
    </div>
  )
}

export default Home