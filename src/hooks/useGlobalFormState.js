import { useReducer } from 'react'

const useGlobalFormState = (id, initialRow) => {
  const ADD = 'ADD'
  const DELETE = 'DELETE'
  const UPDATE = 'UPDATE'
  const RESET = 'RESET'
  
  const initialState = {
    form: {
      [id]: {
        ...initialRow, index: 0
      }
    },
    count: 0
  }
  
  
  function updateItem (state, id, key, value) {
    return {
      ...state.form,
      [id]: { ...state.form[id], [key]: value }
    }
  }
  
  function deleteItem (form, id) {
    let { [id]: _, ...rest } = form
    return rest
  }
  
  function reducer (state, action) {
    switch (action.type) {
      case ADD:
        return {
          form: { ...state.form, [action.id]: { index: state.count + 1, ...action.obj } },
          count: state.count + 1
        }
      case DELETE:
        return {
          form: deleteItem(state.form, action.id),
          count: state.count
        }
      case UPDATE:
        return {
          form: updateItem(state, action.id, action.key, action.value),
          count: state.count
        }
      case RESET:
        return init(action.id)
      default:
        throw new Error()
    }
  }
  
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const _dispatch = ({type, id, key, value, obj}) => {
    dispatch({ type, id, key, value, obj })
  }
  
  function update (e, id) {
    const key = e.target.name
    const value = e.target.value
    
    _dispatch({type: UPDATE, id, key, value})
  }
  
  function add (id, obj) {
    _dispatch({type: ADD, id, obj})
  }
  
  function remove (id) {
    _dispatch({type: DELETE, id})
  }
  
  return { state, add, remove, update }
}

export default useGlobalFormState
