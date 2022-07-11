import React, { useState, useEffect } from 'react'

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getCoByIDC, addDxFiltered, getDxFiltered, updateInfoCompleted } from '../redux/actions';

import Header from './header';
import TagBox from './tagBox';
import TypeCheckBox from './typeCheckBox';



function FDAList() {
  let navigate = useNavigate();
  let params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const fdaData = useSelector(state => state.fdaData)
  const dxsData = useSelector(state => state.dxsData)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [website, setWebsite] = useState('');
  const [platformText, setPlatformText] = useState('');

  const [selectedValue, setSelectedValue] = React.useState([]);

  const [checkedDx, setCheckedDx] = React.useState(true);
  const [checkedTx, setCheckedTx] = React.useState(false);
  const [checkedOther, setCheckedOther] = React.useState(false);

  const [tag, setTag] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [assayTags, setAssayTags] = React.useState([]);


  const [dxs, setDxs] = React.useState([]);
  const [txs, setTxs] = React.useState([]);
  const [oxs, setOxs] = React.useState([]);

  const [prodAssay, setProdAssay] = React.useState([]);
  const [prodPanel, setProdPanel] = React.useState([]);
  const [prodReagent, setProdReagent] = React.useState([]);

  const [checkedDxObject, setCheckedDxObject] = React.useState({});

  const dxInfo = location.state

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    loadFdaData()
    loadDxsData()
    console.log(dxsData);
    if (dxsData.dxdata.length === 1) {
      //setTags(dxsData.dxdata[0].tags[0])
      setWebsite(dxsData.dxdata[0].website)
      setPlatformText(dxsData.dxdata[0].platform)
    }
  }, [fdaData, dxsData, tag, tags])


  const loadFdaData = () => {
    // console.log(fdaData.data, dxInfo.idc);
    if (fdaData.data.length === 0 && fdaData.loaded === "false") {
      dispatch(getCoByIDC(dxInfo.idc))
    }
    else if (fdaData.data.length > 0 && fdaData.loaded === "true") {
      if ((dxInfo.idc !== fdaData.data[0].idc)) (
        dispatch(getCoByIDC(dxInfo.idc))
      )
    }
  }


  const loadDxsData = () => {
    // console.log(dxsData.dxdata);
    if (dxsData.dxdata.length === 0 && dxsData.loaded === "false") {
      dispatch(getDxFiltered(dxInfo.idc))
    }
  }


  const showCompleted = () => {
    if (dxsData.dxdata.length > 0) {
      return (
        <div>
          <IconButton aria-label="delete" size="large" style={{ color: "red" }} >
            <FavoriteIcon fontSize="inherit" />
          </IconButton>
        </div>
      )
    } else {
      return (
        <div>
          <IconButton aria-label="delete" size="large" style={{ color: "gray" }} >
            <FavoriteIcon fontSize="inherit" />
          </IconButton>
        </div>
      )
    }
  }

  const handleSave = () => {
    if (checkedDx && dxs.length !== 0) {
      let data = {
        "idc": dxInfo.idc, name: dxInfo.name, fdas: dxs, prodTags: tags, assayTags: assayTags,
        website: website, platform: platformText, assays: prodAssay, panels: prodPanel, reagents: prodReagent
      }
      console.log(data);
      dispatch(addDxFiltered(data))
      // dispatch(updateInfoCompleted(data))
    }
  }


  const handleWebsite = e => {
    setWebsite(e.target.value)
  }

  const handlePlatformTextChange = (e) => {
    setPlatformText(e.target.value)
  }

  const handleTagAddition = t => {
    setTags([...tags, tag]);
    setTag('')
  };

  const handleTagDelete = (t, v) => {
    let oldtags = tags.filter((i) => { return (Object.keys(i)[0]) !== t });
    let filtag = tags.filter((i) => { return (Object.keys(i)[0]) === t });

    let filtagvals = Object.values(filtag[0])[0]
    let itIsArr = Array.isArray(filtagvals[0])

    if (itIsArr === false) {
      setTags(oldtags)
    } else {
      const index = filtagvals[0].indexOf(v);
      filtagvals[0].splice(index, 1)
      setTags([...oldtags, { [t]: filtagvals[0] }])
    }
  };

  const handleNewTag = (v, id) => {
    let ares = tags.filter((i) => { return (Object.keys(i)[0]) === v });
    if (ares.length < 1) {
      setTags([...tags, { [v]: [id] }]);
    } else {
      let newvals = Object.values(Object.values(ares)[0])
      newvals[0].push(id)
      let oldtags = tags.filter((i) => { return (Object.keys(i)[0]) !== v });
      setTags([...oldtags, { [Object.keys(ares[0])[0]]: newvals }]);
    }
  }


  const handleAssayTagDelete = (t, v) => {
    let oldtags = assayTags.filter((i) => { return (Object.keys(i)[0]) !== t });
    let filtag = assayTags.filter((i) => { return (Object.keys(i)[0]) === t });

    let filtagvals = Object.values(filtag[0])[0]
    let itIsArr = Array.isArray(filtagvals[0])

    if (itIsArr === false) {
      setAssayTags(oldtags)
    } else {
      const index = filtagvals[0].indexOf(v);
      filtagvals[0].splice(index, 1)
      setAssayTags([...oldtags, { [t]: filtagvals[0] }])
    }
  };

  const handleNewAssayTag = (v, id) => {
    let ares = assayTags.filter((i) => { return (Object.keys(i)[0]) === v });
    if (ares.length < 1) {
      setAssayTags([...assayTags, { [v]: [id] }]);
    } else {
      let newvals = Object.values(Object.values(ares)[0])
      newvals[0].push(id)
      let oldtags = assayTags.filter((i) => { return (Object.keys(i)[0]) !== v });
      setAssayTags([...oldtags, { [Object.keys(ares[0])[0]]: newvals }]);
    }
  }


  const handleCheckDx = () => {
    if (checkedDx === false) {
      setCheckedDx(true)
    } else {
      setCheckedDx(false)
    }
  }

  const handleCheckTx = () => {
    if (checkedTx === false) {
      setCheckedTx(true)
    } else {
      setCheckedTx(false)
    }
  }

  const handleCheckOther = () => {
    if (checkedOther === false) {
      setCheckedOther(true)
    } else {
      setCheckedOther(false)
    }
  }

  const handleFilterSelectedValue = (arr, query) => {
    //   console.log(arr, query);
    let ov = arr.filter(el => el.indexOf(query) !== -1)
    if (ov.length > 0) {
      return true
    } else {
      return false
    }
  }




  const handleRadioDxChange = (event, v) => {
    setCheckedDxObject(v)
    if (selectedValue.map((val) => {
      if (val.slice(0, 36) === event.target.value.slice(0, 36)) {
        var index;
        if (val.slice(-2) === 'tx') {
          index = txs.findIndex(i => i.public_device_record_key === val.slice(0, 36));
          if (index !== -1) {
            txs.splice(index, 1);
          }
        } else {
          index = oxs.findIndex(i => i.public_device_record_key === val.slice(0, 36));
          if (index !== -1) {
            oxs.splice(index, 1);
          }
        }
        var idx = selectedValue.indexOf(val)
        selectedValue.splice(idx, 1)
      }
    })) {
      setDxs([...dxs, v])
      setSelectedValue([...selectedValue, event.target.value]);
    }
  };

  const handleRadioTxChange = (event, v) => {
    if (selectedValue.map((val, i) => {
      // console.log(val, event.target.value);
      if (val.slice(0, 36) === event.target.value.slice(0, 36)) {
        console.log(val.slice(-2), event.target.value);
        if (val.slice(-2) === 'dx') {
          console.log(dxs, val);
          var index;
          index = dxs.findIndex(i => i.public_device_record_key === val.slice(0, 36));
          console.log(index);
          if (index !== -1) {
            dxs.splice(index, 1);
          }
        } else {
          index = dxs.findIndex(i => i.public_device_record_key === val.slice(0, 36));

          if (index !== -1) {
            oxs.splice(index, 1);
          }
        }
        var idx = selectedValue.indexOf(val)
        selectedValue.splice(idx, 1)
      }
    })) {
      setTxs([...txs, v])
      setSelectedValue([...selectedValue, event.target.value]);
    }
  };

  const handleRadioOxChange = (event, v) => {
    if (selectedValue.map((val, i) => {
      if (val.slice(0, 36) === event.target.value.slice(0, 36)) {
        console.log(val.slice(-2), event.target.value);
        var index;
        if (val.slice(-2) === 'dx') {

          index = dxs.findIndex(i => i.public_device_record_key === val.slice(0, 36));

          if (index !== -1) {
            dxs.splice(index, 1);
          }
        } else {
          index = txs.findIndex(i => i.public_device_record_key === val.slice(0, 36));

          if (index !== -1) {
            txs.splice(index, 1);
          }
        }
        var idx = selectedValue.indexOf(val)
        selectedValue.splice(idx, 1)
      }
    })) {
      setOxs([...oxs, v])
      setSelectedValue([...selectedValue, event.target.value]);
    }
  };


  const handleProdTypeAssayChange = (p, id) => {
    if (p === true) {
      setProdAssay([...prodAssay, id])
    } else {
      let opop = prodAssay.filter((p) => p !== id);
      setProdAssay(prodAssay.filter((p) => p !== id));
    }
  }

  const handleProdTypePanelChange = (p, id) => {
    if (p === true) {
      setProdPanel([...prodPanel, id])
    } else {
      let opop = prodPanel.filter((p) => p !== id);
      setProdPanel(prodPanel.filter((p) => p !== id));
    }
  }

  const handleProdTypeReagentChange = (p, id) => {
    if (p === true) {
      setProdReagent([...prodReagent, id])
    } else {
      let opop = prodReagent.filter((p) => p !== id);
      setProdReagent(prodReagent.filter((p) => p !== id));
    }
  }


  const showProductTagBox = (v) => {
    if (v.public_device_record_key === checkedDxObject.public_device_record_key) {
      return (
        <div className=' subpixel-antialiased font-mono border border-purple-200 tracking-tighter'>
          <TagBox name="tag" id={v.public_device_record_key} onChange={(v, id) => handleNewTag(v, id)} onDelete={(v, id) => handleTagDelete(v, id)} />
        </div>
      )
    }
  }

  const showAssayTagBox = (v) => {
    if (v.public_device_record_key === checkedDxObject.public_device_record_key) {
      return (
        <div className=' subpixel-antialiased font-mono border border-purple-200 tracking-tighter'>
          <TagBox name="assay" id={v.public_device_record_key} onChange={(v, id) => handleNewAssayTag(v, id)} onDelete={(v, id) => handleAssayTagDelete(v, id)} />
        </div>
      )
    }
  }

  const showProducts = (products) => {
    return products.map((v, i) => {
      return (
        <div key={i}>
          <div className='font-semibold text-base flex justify-center items-center'>
            {v.openfda.device_name}
          </div>
          <div className='font-semibold text-purple-800 text-base  flex justify-center items-center my-2'>
            {v.openfda.medical_specialty_description}
          </div>
        </div>)
    })
  }

  const showGmdnTerms = (gmdn) => {
    return gmdn.map((v, i) => {
      return (
        <div className='grid grid-cols-12 gap-4' key={i}>
          <div className='col-span-3 text-purple-900 font-medium text-md inline-block text-center align-text-bottom'>
            {v.name}
          </div>
          <div className='col-span-8 flex justify-center items-center tracking-tight text-left font-mono	'>
            {v.definition}
          </div>
        </div>)
    })
  }


  const showNameAddedToDxFiltered = (v) => {
    let res = 0;

    if ((typeof dxsData.dxdata) === "object") {
      // console.log(dxsData.dxdata);
      if (dxsData.dxdata[0]) {
        res = dxsData.dxdata[0].fdas[0].filter(x => x.public_device_record_key === v.public_device_record_key);
      }

    }

    if (res.length > 0) {
      return (
        <div className='text-purple-500'>
          {v.company_name}
        </div>)
    } else {
      return (<div>
        {v.company_name}
      </div>)
    }

  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (fdaData.loaded !== "true") {
    // console.log(fdaData.loaded);
    return (
      <div>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </div>
    )
  } else {
    // console.log(dxInfo);

    return (
      <div className='h-screen max-h-screen'>
        <Header />
        <div className='grid grid-cols-12 gap-1'>

          <div className='col-span-4 bg-yellow-300 h-full'>
            <div className='text-base text-gray-800 font-bold p-1'>

              <div className='mt-20 grid grid-cols-5 gap-2'>
                <div className='col-span-4'>
                  {dxInfo.name}
                </div>

                <div className='col-span-1'>
                  {showCompleted()}
                </div>
              </div>
              <div className=' p-2 mb-1 text-xs font-medium'>
                {dxInfo.idc}
              </div>

              <div className='p-4 bg-purple-50 border border-purple-200 rounded'>
                <div className='mb-4 flex justify-center items-center'>
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                </div>
                <div className='grid grid-cols-3 gap-4 text-base'>
                  <div className='col-span-1'>
                    <Checkbox {...label} checked={checkedDx} onChange={handleCheckDx} size="small" />Dx
                  </div>
                  <div className='col-span-1'>
                    <Checkbox {...label} checked={checkedTx} onChange={handleCheckTx} size="small" />Tx
                  </div>
                  <div className='col-span-1'>
                    <Checkbox {...label} checked={checkedOther} onChange={handleCheckOther} size="small" />Ox
                  </div>
                </div>
                <div className='my-5'>
                  <TextField id="outlined-basic" label="website" variant="outlined" onChange={handleWebsite} value={website} />
                </div>
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Platform description"
                    fullWidth
                    multiline
                    rows={6}
                    onChange={handlePlatformTextChange}
                    value={platformText}
                  />
                </div>


                <div className='p-2 bg-gray-200 my-2'>
                  tags:
                  <div className="h-auto my-1">
                    <div className="grid grid-flow-row-dense grid-cols-3 gap-1">
                      {
                        tags.map((v, i) => {
                          // console.log(Object.keys(v)[0]);
                          return (
                            <div key={i} className="grid grid-flow-col border-2 text-gray-800 bg-white border-purple-200 rounded-md font-normal text-xs">
                              <div className="mx-1 p-2">
                                {Object.keys(v)[0]}
                              </div>

                              <IconButton aria-label="delete" className="mx-2" size="small" onClick={() => (handleTagDelete(i, v))}>
                                <ClearIcon />
                              </IconButton>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className='p-2 bg-gray-200 my-2'>
                  assay tags:
                  <div className="h-auto my-1">
                    <div className="grid grid-flow-row-dense grid-cols-3 gap-1">
                      {
                        assayTags.map((v, i) => {
                          // console.log(Object.keys(v)[0]);
                          return (
                            <div key={i} className="grid grid-flow-col border-2 text-gray-800 bg-white border-purple-200 rounded-md font-normal text-xs">
                              <div className="mx-1 p-2">
                                {Object.keys(v)[0]}
                              </div>

                              <IconButton aria-label="delete" className="mx-2" size="small" onClick={() => (handleTagDelete(i, v))}>
                                <ClearIcon />
                              </IconButton>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div>
              <div className='bg-gray-100 p-1 mb-1 text-xs font-light grid grid-cols-6 gap-1'>
                <div className='col-span-1'>Assay :</div>
                <div className='col-span-1 font-semibold'>{prodAssay.length} </div>
                <div className='col-span-1'>Panel :</div>
                <div className='col-span-1 font-semibold'>{prodPanel.length}</div>
                <div className='col-span-1'>Reagent :</div>
                <div className='col-span-1 font-semibold'>{prodReagent.length}</div>
              </div>

              <div className='bg-gray-300 p-2 mb-3'>
                {selectedValue.map((v, i) => <div className='text-xs font-light' key={i}>{v}</div>)}
              </div>


              <div className='bg-gray-50 p-2 mb-3'>
                {dxs.map((v, i) => <div className='text-xs font-light' key={i}>{i + 1}{'-'}{v.public_device_record_key}</div>)}
              </div>

              <div className='bg-gray-100 p-2 mb-3'>
                {txs.map((v, i) => <div className='text-xs font-light' key={i}>{i + 1}{'-'}{v.public_device_record_key}</div>)}
              </div>

              <div className='bg-gray-200 p-2 mb-3'>
                {oxs.map((v, i) => <div className='text-xs font-light' key={i}>{i + 1}{'-'}{v.public_device_record_key}</div>)}
              </div>
            </div>

          </div>

          <div className='col-span-8 scroll-smooth max-h-screen overflow-auto'>
            <div className='mt-24'>
              {fdaData.data[0].fdas.map((v, i) => {
                //   console.log(v);
                return (
                  <div className='text-sm font-base flex justify-center items-center my-5' key={i}>
                    <div className='grid grid-rows-8 gap-2 bg-purple-50 p-4 w-10/12 mx-auto border border-purple-100 rounded-md'>
                      <div className='row-span-1 grid grid-cols-7 gap-4'>
                        <div className='col-span-1 text-xs font-semibold'>
                          {i + 1}
                        </div>
                        <div className='col-span-3 text-base font-semibold text-gray-900'>
                          {showNameAddedToDxFiltered(v)}
                        </div>
                        <div className='col-span-3 p-1 text-xs text-center font-bold text-gray-700 border border-purple-200 tracking-wide flex justify-center items-center rounded-md'>
                          {v.brand_name}
                        </div>
                      </div>
                      <div className='row-span-2'>
                        {showProducts(v.product_codes)}
                      </div>
                      <div className='row-span-2'>
                        {showGmdnTerms(v.gmdn_terms)}
                      </div>
                      <div className='row-span-2 subpixel-antialiased font-mono border border-purple-200 p-5 tracking-tighter'>
                        {v.device_description}
                      </div>
                      <div className='row-span-2 subpixel-antialiased font-mono border border-purple-200 p-5 tracking-tighter'>
                        <div className='grid grid-cols-9 gap-2'>

                          <div className='col-span-1'>
                            <Radio
                              checked={handleFilterSelectedValue(selectedValue, (v.public_device_record_key + 'dx'))}
                              onChange={(e) => { handleRadioDxChange(e, v) }}
                              value={v.public_device_record_key + 'dx'}
                              name="radio-buttons"
                              inputProps={{ 'aria-label': 'A' }}
                            /> Dx
                          </div>
                          <div className='col-span-1'>
                            <Radio
                              checked={handleFilterSelectedValue(selectedValue, (v.public_device_record_key + 'tx'))}
                              onChange={(e) => { handleRadioTxChange(e, v) }}
                              value={v.public_device_record_key + "tx"}
                              name="radio-buttons"
                              inputProps={{ 'aria-label': 'A' }}
                            /> Tx
                          </div>
                          <div className='col-span-1'>
                            <Radio
                              checked={handleFilterSelectedValue(selectedValue, (v.public_device_record_key + 'ox'))}
                              onChange={(e) => { handleRadioOxChange(e, v) }}
                              value={v.public_device_record_key + 'ox'}
                              name="radio-buttons"
                              inputProps={{ 'aria-label': 'A' }}
                            /> Ox
                          </div>
                          <div className='col-span-2 bg-purple-200 text-sm'>
                            <TypeCheckBox name="Assay" onChange={(p) => { handleProdTypeAssayChange(p, v.public_device_record_key) }} />
                          </div>
                          <div className='col-span-2 bg-purple-200'>
                            <TypeCheckBox name="Panel" onChange={(p) => { handleProdTypePanelChange(p, v.public_device_record_key) }} />
                          </div>
                          <div className='col-span-2 bg-purple-200'>
                            <TypeCheckBox name="Reagent" onChange={(p) => { handleProdTypeReagentChange(p, v.public_device_record_key) }} />
                          </div>
                        </div>
                      </div>
                      <div>
                        {showProductTagBox(v)}
                      </div>
                      <div>
                        {showAssayTagBox(v)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default FDAList;


