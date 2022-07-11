const initialState = {
  data: [],
  loaded: "false"
};

export default function getAllReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BY_IDC_DX/pending": {
      return {
        ...state,
        loaded: "loading"
      };
    }
    case "GET_BY_IDC_DX/fulfilled": {
      return {
        ...state,
        data: action.payload, loaded: "true"
      };
    }
    default:
      return state;
  }

}