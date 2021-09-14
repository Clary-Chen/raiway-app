import React from 'react'
import {useGlobalContext} from './context'

function Results() {
  console.log('Results.js :')
  const { resultsData, faresData } = useGlobalContext()

  return (
    <>
      {resultsData && faresData && <section>
        {/* 顯示查詢結果 */}
        <span className='bold'>
          出發時間--抵達時間--車種車次(起點--&gt;終點)-----票價
        </span>
        {resultsData.map((item, index) => {
            const { TrainInfo, StopTimes } = item
            const {
              TrainTypeCode,
              TrainTypeName,
              TrainNo,
              StartingStationName,
              EndingStationName,
            } = TrainInfo
            const { DepartureTime } = StopTimes[0]
            const { ArrivalTime } = StopTimes[StopTimes.length - 1]

            // 用trainTypeCode 找到 對應車種的票價資料
            const singlePrice = faresData.filter((item) => {
              return item.TrainType === parseInt(TrainTypeCode)
            })

            // 在票價資料 找到 成人孩童敬老的票價 放在price
            let price = []
            singlePrice[0].Fares.forEach((item) => {
              const { FareClass, Price } = item
              if (FareClass === 1) {
                price.push(`成人:${Price}`)
              } else if (FareClass === 3) {
                price.push(`孩童:${Price}`)
              } else if (FareClass === 4) {
                price.push(`敬老:${Price}`)
              }
            })

            return (
              <div key={index}>
                {/* 顯示查詢時刻 */}
                <span>
                  {DepartureTime}---&gt;
                  {ArrivalTime}----------
                </span>
                {/* 顯示查詢車種車次(起點站->終點站) */}
                <span>
                  {TrainTypeName['Zh_tw'].match(
                    '自強'
                  ) /* 有些自強號的資料太醜 */
                    ? '自強'
                    : TrainTypeName['Zh_tw']}
                  {TrainNo}
                </span>
                <span>
                  ({StartingStationName['Zh_tw']}---&gt;
                  {EndingStationName['Zh_tw']})----
                </span>
                {/* 顯示查詢票價 */}
                {price.map((item, index) => {
                  return <span key={index}>{item}</span>
                })}
              </div>
            )
          })}
      </section>}
    </>
  )
}

export default Results
