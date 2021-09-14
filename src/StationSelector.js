import React  from 'react'
import { useGlobalContext } from './context'

function StationSelector() {
  console.log('CitySeletor.js :')

  const {
    stationSelectData,
    startName,
    setStartName,
    setFinishName,
    setIsSending,
  } = useGlobalContext()

  const handleRequest = ()=>{
    setIsSending(true)
  }

  return (
    <>
      <section>
        {/* 出發站下拉選單 */}
        <label>出發站: </label>
        <select  defaultValue={'DEFAULT'} onChange={(e) => setStartName(e.target.value)}>
          <option value="DEFAULT" disabled>請選擇</option>
          {stationSelectData['data'].map((item, index) => {
            return (
              // 選縣市
              <optgroup key={index} label={item.city}>
                {/* 選車站 */}
                {item['station'].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })}
              </optgroup>
            )
          })}
        </select>
      </section>
      {/* 抵達站下拉選單 */}
      <section>
        <label>抵達站: </label>
        <select defaultValue={'DEFAULT'} onChange={(e) => setFinishName(e.target.value)}>
          <option value='DEFAULT' disabled>請選擇</option>
          {stationSelectData['data'].map((item, index) => {
            return (
              <optgroup key={index} label={item['city']}>
                {item['station'].map((item, index) => {
                  // 不可出發抵達站相同
                  if (item === startName) {
                    return (
                      <option key={index} value={item} disabled >
                        {item}
                      </option>
                    )
                  }
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })}
              </optgroup>
            )
          })}
        </select>
        <button type='button' onClick={handleRequest} >查詢</button>
      </section>
    </>
  )
}

export default StationSelector



 
