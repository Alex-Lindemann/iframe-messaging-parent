import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ReturnedData from './components/ReturnedData';
import './App.css';

function getNavigateUrlBase() {
  if (window.location.origin === "http://localhost:3000") {
    return 'http://localhost:3001';
  }
  return 'https://someurl';
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
        {/* <Routes>
          <Route path='/showData' element={<>
            <ReturnedData />
          </>} />
        </Routes> */}
        <Button href={getNavigateUrlBase()} variant="outlined">Go to App Two</Button>
        {/* <Button component={Link} to={getNavigateUrlBase()} variant="outlined">Go to App Two</Button> */}
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
