import React from 'react'
import DateSelector from './DateSelector'
import StationSelector from './StationSelector'
import Results from './Results'
import TrainNoSelector from './TrainNoSelector'

function App() {
  return (
    <>
      <h1>台鐵時刻查詢</h1>
      <h2>依出發抵達站查詢:</h2>
      <DateSelector />
      <StationSelector />
      <Results />
      <h1>
        ------------------------------
      </h1>
      <h2>依車次查詢:</h2>
      <TrainNoSelector />
    </>
  )
}

export default App
