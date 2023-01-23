import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Service } from "./services/service";
import { useQuery } from "react-query";

const samplePayload = {
  name: 'Dom',
  minAge :1,
  maxAge: 100,
}
const {get} = Service;
function App() {

  const {data} = useQuery('todos', () => get(samplePayload));

  console.log(data);

  return (
    <div className="App">
      <div className={'flex'}>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

    </div>
  )
}

export default App
