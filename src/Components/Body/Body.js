import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Connections from '../Connections/Connections'
import TeleOperation from '../TeleOperation/TeleOperation'

const Body = () => {
    const [count, setCount] = useState(0)
  return (
      <Container>
          <main>
            <h1 className='text-center mt-3'>Robot Control Page</h1>
              <h6>Counter:{ count} </h6>
              <Button onClick={() => { let result = count; result++; setCount(result) }} variant="primary">Add</Button>
              <Connections></Connections>
              <TeleOperation/>
          </main>
    </Container>
  )
}

export default Body