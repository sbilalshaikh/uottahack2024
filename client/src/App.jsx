import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch(`http://127.0.0.1:8000/neighbourhood/hello-world`);
              if (!response.ok) {
              throw new Error('Network response was not ok...');
              }
              const result = await response.json();
              console.log(result)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
  fetchData()
  }, [])
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
