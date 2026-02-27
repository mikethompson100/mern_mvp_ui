import { useState, useEffect, useCallback } from "react";

export default function App() {
  const [visits, setVisits] = useState(0);
  const [name, setName] = useState('');

  // Memoization
  const refreshVisits = useCallback(async () => {
    console.log('Test refresh');
    const url = 'http://localhost:3000/data';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setVisits(data.visits);
  }, []);

  useEffect(() => {
    refreshVisits();
  }, [refreshVisits]);

  return (
    <>
      <h1>Welcome {name}</h1>
      <input value={name} onChange={(event) => {
        setName(event.target.value);
      }} />
      <button onClick={async () => {
        const url = 'http://localhost:3000/visit';
        const init = {
          method: 'POST'
        };
        const response = await fetch(url, init);
        const data = await response.json();
        console.log(data);
      }}>Add visit</button>

      <button onClick={refreshVisits}>Refresh visits</button>
      <p>Number of visits: {visits}</p>
    </>
  )
}
