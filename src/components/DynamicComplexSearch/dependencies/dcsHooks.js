import { useReducer, useState } from 'react'

// reducer to handle form logic for a complex filter search
export const useComplexFilter = (id) => {
  const initSimpleRow = {
    field: '*',
    option: 'contains',
    query: '',
    maxQuery: undefined,
    type: 'simple',
    index: 0
  }

  const initCompRow = {
    operator: 'AND',
    field: '*',
    option: 'contains',
    query: '',
    maxQuery: undefined,
    type: 'complex'
  }
  const ADD = 'ADD'
  const REMOVE = 'REMOVE'
  const UPDATE = 'UPDATE'
  const RESET = 'RESET'

  function updateItem (forms, id, key, value) {
    return {
      ...forms,
      [id]: { ...forms[id], [key]: value }
    }
  }

  function removeItem (forms, id) {
    let { [id]: _, ...rest } = forms
    return rest
  }

  function reducer (state, action) {
    switch (action.type) {
      case ADD:
        return {
          forms: { ...state.forms, [action.id]: { ...initCompRow, index: state.count } },
          count: state.count + 1
        }
      case REMOVE:
        return {
          forms: removeItem(state.forms, action.id),
          count: state.count
        }
      case UPDATE:
        return {
          forms: updateItem(state.forms, action.id, action.key, action.value),
          count: state.count
        }
      case RESET:
        return init(action.id)
      default:
        throw new Error()
    }
  }

  function init (id) {
    return {
      forms: { [id]: initSimpleRow },
      count: 1
    }
  }

  const [state, dispatch] = useReducer(reducer, id, init)

  const _dispatch = (type, id, key, value) => {
    dispatch({ type, id, key, value })
  }

  function update (e, id) {
    const name = e.target.name
    const value = e.target.value

    _dispatch(UPDATE, id, name, value)
  }

  function add (id) {
    _dispatch(ADD, id)
  }

  function remove (id) {
    _dispatch(REMOVE, id)
  }

  return [state, add, remove, update]
}

const dateObject = {
  JAN: { days: 31, mm: '01' },
  FEB: { days: 29, mm: '02' },
  MAR: { days: 31, mm: '03' },
  APR: { days: 30, mm: '04' },
  MAY: { days: 31, mm: '05' },
  JUN: { days: 30, mm: '06' },
  JUL: { days: 31, mm: '07' },
  AUG: { days: 31, mm: '08' },
  SEP: { days: 30, mm: '09' },
  OCT: { days: 31, mm: '10' },
  NOV: { days: 30, mm: '11' },
  DEC: { days: 31, mm: '12' }
}

export const useDateTimePicker = () => {
  const [month, setMonth] = useState('01')
  const [day, setDay] = useState('01')
  const [year, setYear] = useState('1970')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')

  const isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  // dateObject.FEB.days = isLeapYear ? 29 : 28

  let numOfDays
  for (let m in dateObject) {
    if (dateObject[m].mm === month) {
      numOfDays = dateObject[m].days
      break
    }
  }
  if (isLeapYear) {
    numOfDays++
  }
  const days = []
  for (let i = 1; i <= numOfDays; i++) {
    let num = `${i}`
    if (i < 10) {
      num = '0' + num
    }
    days.push(num)
  }

  const years = []
  for (let i = 2020; i >= 1900; i--) {
    years.push(i)
  }

  const hours = []
  const minutes = []
  const seconds = []

  for (let i = 0; i < 60; i++) {
    let strNum = `${i}`
    if (i < 10) {
      strNum = `0${strNum}`
    }
    minutes.push(strNum)
    seconds.push(strNum)
    if (i <= 24) {
      hours.push(strNum)
    }
  }

  return {
    month,
    day,
    year, // state
    hour,
    minute,
    second, // state
    setMonth,
    setDay,
    setYear, // setstate
    setHour,
    setMinute,
    setSecond, // setstate
    days,
    years, // html maps
    hours,
    minutes,
    seconds, // html maps
    dateObject
  }
}
