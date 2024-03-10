import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Helmet from 'react-helmet'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
   {/* <React.StrictMode> */}
    <Helmet>
      <title>Association de l'amitié Franco-Marocaine de Grigny.</title>
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      {/* <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" /> */}
      <link rel="icon" type="image/webp" href="/logo_clean.webp"></link>
    </Helmet>
    <App />
   {/* </React.StrictMode>, */}
  </>
)
