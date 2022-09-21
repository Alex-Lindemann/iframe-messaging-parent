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
        {showIframe && <iframe height='300' width='1000' src={`${getNavigateUrlBase()}/iframe`} title="description"></iframe>}
      </header>
    </div>
  );
}

export default App;
