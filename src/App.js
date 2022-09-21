import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ReturnedData from './components/ReturnedData';
import './App.css';
import SimpleBottomNavigation from './components/Navigation';

function getNavigateUrlBase() {
  if (window.location.origin === "http://localhost:3000") {
    return 'http://localhost:3001';
  }
  return 'https://iframe-messaging-child.herokuapp.com';
}

function App() {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === 'message-to-parent') {
        setShowIframe(false);
      }
    }, false);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <SimpleBottomNavigation />
        <Button href={getNavigateUrlBase()} variant="outlined">Go to App Two</Button>
        <br />
        <Button variant="outlined" onClick={() => {
          setShowIframe(true)
        }}>iframe App Two</Button>
        <br />
        <ReturnedData />
        <br />
      </header>
      {showIframe && <iframe height='100%' width='100%' style={{ border: 0, position: 'absolute', top: 0, left: 0, zIndex: 5 }} src={`${getNavigateUrlBase()}/iframe`} title="description"></iframe>}
    </div>
  );
}

export default App;
