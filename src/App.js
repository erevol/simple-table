import { useEffect, useState } from 'react';

import './App.css';
import data from './data.json';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
      || item.location.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredResults);
  }, [query]);

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSort = (field) => {
    setToggle(!toggle);
    const sortedResults = results.sort((a, b) => {
      if (a[field] < b[field]) {
        return toggle ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return toggle ? 1 : -1
      }
      return 0;
    });
    setResults(sortedResults);
  };

  return (
    <div>
      <input
        placeholder="Search"
        type="search"
        value={query}
        onChange={handleOnChange}
      />
      <table>
        <thead>
          <tr>
            <th>name <button onClick={() => handleSort('name')}>Sort</button></th>
            <th>photo</th>
            <th>location</th>
            <th>dateFounded</th>
            <th>area</th>
            <th>visitors <button onClick={() => handleSort('visitors')}>Sort</button></th>
          </tr>
        </thead>
        <tbody>
          {
            results.map(({
              name,
              photo,
              location,
              dateFounded,
              area,
              visitors,
            }) => (
              <tr key={`${name}-${location}`}>
                <td>{name}</td>
                <td><img src={photo} alt={name} /></td>
                <td>{location}</td>
                <td>{dateFounded}</td>
                <td>{area}</td>
                <td>{visitors}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
