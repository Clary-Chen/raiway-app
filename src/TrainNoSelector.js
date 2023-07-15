import React from 'react'
import { useGlobalContext } from './context'


function TrainNoSelector() {
    console.log('TrainNoSelector.js :')
    const { trainNo, setTrainNo, setIsSending, trainNoData } = useGlobalContext()

    return (
      <div>
        {/* 輸入車次 */}
        <section>
          <label>車次:</label>
          <input
            type='text'
            placeholder='1137'
            value={trainNo}
            onChange={(e) => setTrainNo(e.target.value)}
          />
          {/* 查詢按鈕 */}
          <button onClick={() => setIsSending(true)}>查詢 C</button>
        </section>

        {/* 車次資料 */}
        {trainNoData && (
          <section>
            <div className='bold'>車種車次(起點--&gt;終點)</div>
            <span>{trainNoData[0]['TrainInfo']['TrainTypeName']['Zh_tw']}</span>
            <span>{trainNoData[0]['TrainInfo']['TrainNo']}</span>
            <span>
              ({trainNoData[0]['TrainInfo']['StartingStationName']['Zh_tw']}
              ---&gt;
              {trainNoData[0]['TrainInfo']['EndingStationName']['Zh_tw']})
            </span>
            <br />
            <br />
            <span className='bold'>停靠站--抵達時間--出發時間</span>
            {trainNoData[0]['StopTimes'].map((item, index) => {
              return (
                <div key={index}>
                  <span>{item['StationName']['Zh_tw']}-----</span>
                  <span>{item['ArrivalTime']}-----</span>
                  <span>{item['ArrivalTime']}</span>
                  <br />
                </div>
              )
            })}
          </section>
        )}
      </div>
    )
}

export default TrainNoSelector
