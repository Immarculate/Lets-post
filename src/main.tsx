import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/authContext.tsx';
import { Queryprovider } from './lib/react-query/Queryprovider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Queryprovider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Queryprovider>
    </BrowserRouter>

  </React.StrictMode>,
)
