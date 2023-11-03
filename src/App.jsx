import { useState } from 'react'
import Products from './pages/Products';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Products/>
      </div>
    </>
  )
}

export default App
