import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

const registerWorker = async () => {
   let basename = import.meta.env.DEV ? '/' : '/SavvySaver/'
   if ("serviceWorker" in navigator) {
      try {
         const registration = await navigator.serviceWorker.register("/sw.js", {scope: basename})
         if (registration.installing)
            console.log('sw installing')
         else if (registration.waiting)
            console.log('sw waiting')
         else if (registration.active)
            console.log('sw active')
      }
      catch (error) {
         console.log('sw failed with: ', error)
      }
   }
}

registerWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
