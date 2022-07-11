const initialState = {
  productTagsdata: []
};

export default function dxReducer(state = initialState, action) {

  switch (action.type) {
    case "ADD_PRODUCT_TAG/fulfilled": {
      const data = action.payload;
      return {
        ...state,
        productTagsdata: data
      };
    }
    default:
      return state;
  }

}