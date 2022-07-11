const initialState = {
  dxdata: [],
  loaded: "false"
};

export default function dxReducer(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {
    case "ADD_DX/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        dxdata: data
      };
    }

    case "DX_UPDATE_DX/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        dxdata: data
      };
    }

    case "ADD_PRODUCT/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        dxdata: data
      };
    }

    case "UPDATE_DX_PRODUCT/fulfilled": {
      const data = action.payload;
      console.log(data);
      return {
        ...state,
        dxdata: data
      };
    }

    case "DX_ADD_CO_INFO/pending": {
      return {
        ...state,
        loaded: "loading"
      };
    }
    case "DX_ADD_CO_INFO/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        dxdata: data, loaded: "true"
      };
    }

    case "GET_DX_FILTERED/pending": {
      return {
        ...state,
        loaded: "loading"
      };
    }
    case "GET_DX_FILTERED/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        dxdata: data, loaded: "true"
      };
    }

    case "RESET_DX_FILTERED/pending": {
      return {
        ...state,
        loaded: "false"
      };
    }
    case "RESET_DX_FILTERED/fulfilled": {

      return {
        ...state,
        dxdata: [], loaded: "false"
      };
    }
    default:
      return state;
  }

}