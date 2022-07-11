
const initialState = {
  data: []
};

export default function getAllReducer(state = initialState, action) {

  switch (action.type) {
    case "GET_ALL_DX/pending": {
      const data = [{}];
      return {
        ...state,
        data: data
      };
    }
    case "GET_ALL_DX/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        data: data
      };
    }
    case "DX_UPDATE/pending": {
      const data = [{}];
      return {
        ...state,
        data: data
      };
    }
    case "DX_UPDATE/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        data: data
      };
    }
    case "ADD_DX/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        data: data
      };
    }
    default:
      return state;
  }

}