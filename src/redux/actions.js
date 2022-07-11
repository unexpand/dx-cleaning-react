import { createAsyncThunk } from '@reduxjs/toolkit'

const ROOT_URL = `http://192.168.1.5:7000/api` //`${process.env.REACT_APP_API_URL}/app`;

const GET_ALL = `company/info/all`
const GET_IDC = `company/info`
const DX_UPDATE = `company/info/update`
const DX_COS_ADD = `company/info/add`

// const DX_COS_ADD = `dxcos/add`

const DX_ADD = `dx/add/dx`
const DX_UPDATE_DX = `dx/update/dx`

const DX_ADD_PRODUCT = `dx/add/product`
const DX_UPDATE_PRODUCT = `dx/update/product`

const DX_ADD_CO_INFO = `dx/add/coinfo`
const DX_GET_INFO = `dx/info`

const PRODUCT_TAG = `tags/product/add`
const PLATFORM_TAG = `tags/platform/add`

const ASSAY_TAG = `tags/assay/add`
const PANEL_TAG = `tags/panel/add`
const REAGENT_TAG = `tags/reagent/add`


const getCoInfo = createAsyncThunk(
  'GET_ALL_DX',
  async (data) => {
    return fetch((`${ROOT_URL}/${GET_ALL}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


const getCoByIDC = createAsyncThunk(
  'GET_BY_IDC_DX',
  async (data) => {
    return fetch((`${ROOT_URL}/${GET_IDC}/${data}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      //  body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)

const updateInfoCompleted = createAsyncThunk(
  'UPDATE_DX',
  async (data) => {
    console.log(data);
    return fetch((`${ROOT_URL}/${DX_UPDATE}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)



// const ROOT_URL = `http://192.168.1.3:7000/api/company/info

// Add filtered DX Platform Data to postgres dxfiltered


const addDxFiltered = createAsyncThunk(
  'ADD_DX',
  async (data) => {
    return fetch((`${ROOT_URL}/${DX_ADD}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)

// Update DX Platform Data

const updateDxPlatform = createAsyncThunk(
  'DX_UPDATE_DX',
  async (data) => {
    return fetch((`${ROOT_URL}/${DX_UPDATE_DX}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


// Add filtered DX Product Data to postgres dxfiltered


const addDxProduct = createAsyncThunk(
  'ADD_PRODUCT',
  async (data) => {
    console.log(data);
    return fetch((`${ROOT_URL}/${DX_ADD_PRODUCT}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


// Update filtered DX Product Data to postgres dxfiltered


const updateDxProduct = createAsyncThunk(
  'UPDATE_DX_PRODUCT',
  async (data) => {
    console.log(data);
    return fetch((`${ROOT_URL}/${DX_UPDATE_PRODUCT}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)



const addDxCoInfoFiltered = createAsyncThunk(
  'DX_ADD_CO_INFO',
  async (data) => {
    return fetch((`${ROOT_URL}/${DX_ADD_CO_INFO}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


const getDxFiltered = createAsyncThunk(
  'GET_DX_FILTERED',
  async (data) => {
    return fetch((`${ROOT_URL}/${DX_GET_INFO}/${data}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


const resetDxFiltered = createAsyncThunk(
  'RESET_DX_FILTERED',
  async (data) => {
    return []
  }
)


// product tag add action

const addProductTag = createAsyncThunk(
  'ADD_PRODUCT_TAG',
  async (data) => {
    return fetch((`${ROOT_URL}/${PRODUCT_TAG}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


// platform tag add action

const addPlatformTag = createAsyncThunk(
  'ADD_PLATFORM_TAG',
  async (data) => {
    return fetch((`${ROOT_URL}/${PLATFORM_TAG}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)

// assay tag add action

const addAssayTag = createAsyncThunk(
  'ADD_ASSAY_TAG',
  async (data) => {
    return fetch((`${ROOT_URL}/${ASSAY_TAG}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


// panel tag add action

const addPanelTag = createAsyncThunk(
  'ADD_PANEL_TAG',
  async (data) => {
    return fetch((`${ROOT_URL}/${PANEL_TAG}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)

// reagent tag add action

const addReagentTag = createAsyncThunk(
  'ADD_REAGENT_TAG',
  async (data) => {
    return fetch((`${ROOT_URL}/${REAGENT_TAG}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


// add a new dxcompany

const addToDxCompanies = createAsyncThunk(
  'UPDATE_DX',
  async (data) => {
    console.log(data);
    return fetch((`${ROOT_URL}/${DX_COS_ADD}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '12345'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)


export { getCoInfo, getCoByIDC, updateInfoCompleted, addDxFiltered, addDxProduct, addPlatformTag, addDxCoInfoFiltered, getDxFiltered, resetDxFiltered, addProductTag, addAssayTag, addPanelTag, addReagentTag, addToDxCompanies, updateDxPlatform, updateDxProduct };





// const addInfo = createAsyncThunk(
//   'ADD_DX',
//   async (data) => {
//     return fetch((`${ROOT_URL}/${ADD}`), {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'api-key': '12345'
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         return res
//       })
//   }
// )


// const deleteInfo = createAsyncThunk(
//   'DELETE_DX',
//   async (data) => {
//     console.log(data);
//     return fetch((`${ROOT_URL}/${DELETE}`), {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'api-key': '12345'
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         return res
//       })
//   }
// )

