
const initState = {
  categories: [],
  category: Object.create(null),
  message: '',
  totalSize: 0,
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function categories(state= initState, action: any) {
  switch(action.type) {
    case 'LIST_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: action.payload.data,
        message: action.payload.message,
        totalSize: action.payload.data.length
      }
    case 'FIND_CATEGORY_SUCCESS':
      return {
        ...state,
        category: action.payload.data,
        message: action.payload.message,
      }
    case 'SAVE_CATEGORY_SUCCESS':
      return {
        ...state,
        category: action.payload.data,
        message: action.payload.message
      }
    default:
      return state
  }
}

/**
 * action
 */
export function listSuccess(payload: any) {
  return {
    type: 'LIST_CATEGORY_SUCCESS',
    payload: payload
  }
}

export function listFailure(payload: any) {
  return {
    type: 'LIST_CATEGORY_FAILURE',
    payload: payload
  }
}

export function findSuccess(payload: any) {
  return {
    type: 'FIND_CATEGORY_SUCCESS',
    payload: payload
  }
}

export function findFailure(payload: any) {
  return {
    type: 'FIND_CATEGORY_FAILURE',
    payload: payload
  }
}

export function saveSuccess(payload: any) {
  return {
    type: 'SAVE_CATEGORY_SUCCESS',
    payload: payload
  }
}

export function saveFailure(data: any) {
  return {
    type: 'SAVE_CATEGORY_FAILURE',
    payload: data
  }
}


