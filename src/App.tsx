import {Activity, useState} from 'react'
import './App.css'
import {Map} from './Map.tsx'

function App() {
  const [count, setCount] = useState(1)
  const [selectedView, setSelectedView] = useState<'map' | 'list' | 'activity-map'>('list')

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <label htmlFor="view-select">View: </label>
        <select
          id="view-select"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value as 'map' | 'list' | 'activity-map')}
        >
          <option value="list">List</option>
          <option value="map">Map</option>
          <option value="activity-map">Activity Map</option>
        </select>
      </div>

      <Activity mode={selectedView === 'list' ? 'visible' : 'hidden'}>
        <div>Showing list</div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>click</button>
      </Activity>

      <Activity mode={selectedView === 'activity-map' ? 'visible' : 'hidden'}>
        <div>Showing activity map</div>
        <div style={{height:'500px', width:'500px'}}>
          <Map/>
        </div>
      </Activity>

      <div style={{display: selectedView === 'map' ? 'block' : 'none'}}>
        <div>Showing map</div>
        <div style={{height:'500px', width:'500px'}}>
          <Map/>
        </div>
      </div>
    </div>
  )
}

export default App
