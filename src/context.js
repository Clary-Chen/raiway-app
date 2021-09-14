import React, { useState, useContext, useEffect } from 'react'
import {stationSelectData} from './DATA/stationSelectData'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  console.log('context.js :')
  
  // 車站資料
  const [stationData, setStationData] = useState([])
  // 日期 出發站名 抵達站名 出發站ID 抵達站ID
  const [selectedDate, setSelectedDate] = useState('')
  const [startName, setStartName] = useState('')
  const [finishName, setFinishName] = useState('')
  const [startID, setStartID] = useState('')
  const [finishID, setFinishID] = useState('')
  // 時刻車種車次資料 票價資料
  const [resultsData, setResultsData] = useState(null)
  const [faresData, setFaresData] = useState(null)
  // 車次 車次資料
  const [trainNo, setTrainNo] = useState('')
  const [trainNoData, setTrainNoData] = useState(null)
  // 查詢按鈕
  const [isSending, setIsSending] = useState(false)

  // 抓車站資料 stationData
  useEffect(() => {
    const getStationData = async () => {
      const res = await fetch(
        'https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/Station?$select=StationName%2CStationID&$format=JSON'
      )
      const data = await res.json()
      setStationData(data)
    }
    getStationData()
  }, [])

  // 抓出發站ID/抵達站ID startID/finishID
  useEffect(() => {
    // 出發站抵達站選了才跑
    if (startName === '' || finishName === '') {
      return
    }
    stationData['Stations'].forEach((item) => {
      const { StationID, StationName } = item
      // 透過 出發站名 找到 出發站ID
      if (StationName['Zh_tw'] === startName) {
        setStartID(StationID)
      }
      // 透過 抵達站名 找到 抵達站ID
      if (StationName['Zh_tw'] === finishName) {
        setFinishID(StationID)
      }
    })
  }, [startName, finishName])

  // 抓時刻車種車次資料 resultsData
  const fetchResultData = async () => {
    if (
      selectedDate === '' ||
      startID === '' ||
      finishID === '' ||
      isSending === false
    ) {
      return
    }
    const res = await fetch(
      `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/DailyTrainTimetable/OD/${startID}/to/${finishID}/${selectedDate}?$format=JSON`
    )
    let data = await res.json()
    data = data.TrainTimetables
    // 先把resultsData按DepartureTime(出發時間)排好
    data.sort(function (a, b) {
      return a.StopTimes[0].DepartureTime.replace(/[^0-9]/gi, '') >
        b.StopTimes[0].DepartureTime.replace(/[^0-9]/gi, '')
        ? 1
        : -1
    })
    setResultsData(data)
  }

  // 抓票價資料 faresData
  const fetchFaresData = async () => {
    if (startID === '' || finishID === '' || isSending === false) {
      return
    }
    const res = await fetch(
      `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/ODFare/${startID}/to/${finishID}?$select=Fares&$filter=Direction%20eq%201%20
      &$format=JSON`
    )
    let data = await res.json()
    data = data.ODFares
    setFaresData(data)
  }

  // 抓車次資料 trainNoData
  const fetchTrainNoData = async () => {
    if (trainNo === '' || isSending === false) {
      return
    }
    const res = await fetch(
      `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/GeneralTrainTimetable/TrainNo/${trainNo}?&$format=JSON`
    )
    let data = await res.json()
    data = data.TrainTimetables
    setTrainNoData(data)
  }

  useEffect(() => {
    // 抓時刻車種車次
    fetchResultData()
    // 抓票價
    fetchFaresData()
    // 抓車次
    fetchTrainNoData()
    // 清空查詢關鍵字
    setIsSending(false)
    setStartName('')
    setFinishName('')
    setStartID('')
    setFinishID('')
    setTrainNo('')
  }, [isSending])


  // 方便除錯的LOG
  console.log(`1 車站下拉選單資料:${stationSelectData}/ 車站資料:${stationData}`)
  console.log(
    `2 日期:${selectedDate}/ 出發站名:${startName}/ 抵達站名:${finishName}/ 出發站ID:${startID}/ 抵達站ID:${finishID}`
  )
  console.log(`3 時刻車種車次資料:${resultsData}/ 票價資料:${faresData}`)
  console.log(`4 車次:${trainNo}/ 車次資料:${trainNoData}`)

  return (
    <AppContext.Provider
      value={{
        stationSelectData,
        selectedDate,
        setSelectedDate,
        startName,
        finishName,
        setStartName,
        setFinishName,
        resultsData,
        setIsSending,
        faresData,
        trainNo,
        setTrainNo,
        trainNoData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext }