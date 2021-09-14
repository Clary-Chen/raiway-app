import React from 'react'
import {useGlobalContext} from './context'


function DateSelector() {
    console.log('DateSelector.js :');
    // 另外設一個只在這file的變數date,輸入的時候才不會瘋狂re-render
    const { selectedDate,setSelectedDate } = useGlobalContext()

    return (
      <div>
          <label>日期: </label>
          <input
            type='text'
            placeholder='YYYY-MM-DD'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
      </div>
    )
}

export default DateSelector
