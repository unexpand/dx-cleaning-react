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
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { convertToRaw } from 'draft-js';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit'

import { getCoByIDC, addDxFiltered, addDxProduct, getDxFiltered, addProductTag, addPlatformTag, addAssayTag, addPanelTag, addReagentTag, resetDxFiltered, addDxCoInfoFiltered, updateInfoCompleted } from '../redux/actions';

import Header from './header';
import TagBox from './tagBox';
import TypeCheckBox from './typeCheckBox';
import ProductAdd from './productAdd';
import PlatformAdd from './platformAdd';
import RTE from './rte';
import RteView from './rteView';
import PlatformEdit from './platformEdit';
import ProductEdit from './productEdit';
import SEOTagBox from './seo_tagbox';
import { useTabs } from '@mui/material';

function Company() {


  let navigate = useNavigate();
  let params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const fdaData = useSelector(state => state.fdaData)
  const dxsData = useSelector(state => state.dxsData)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [website, setWebsite] = useState('');
  const [coHandle, setCoHandle] = useState('');
  const [coDescriptionText, setCoDescriptionText] = useState('{ "blocks": [], "entityMap": {} }');
  const [metaDescription,setMetaDescription] =useState('')
  const [seoTags, setSeoTags] = useState([])
  // const [coDescriptionText, setCoDescriptionText] = useState('{ "blocks": [{ "key": "", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }');
  
  const [platformText, setPlatformText] = useState('');

  const [newPlatform, setNewPlatform] = useState({});
  const [newProduct, setNewProduct] = useState({});

  const [selectedValue, setSelectedValue] = React.useState([]);

  const [checkedDx, setCheckedDx] = React.useState(true);
  const [checkedTx, setCheckedTx] = React.useState(false);
  const [checkedOther, setCheckedOther] = React.useState(false);

  const [tag, setTag] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [assayTags, setAssayTags] = React.useState([]);


  const [reload, setReload] = React.useState(false)
  const [dxs, setDxs] = React.useState([]);
  const [txs, setTxs] = React.useState([]);
  const [oxs, setOxs] = React.useState([]);

  const [prodAssay, setProdAssay] = React.useState([]);
  const [prodPanel, setProdPanel] = React.useState([]);
  const [prodReagent, setProdReagent] = React.useState([]);

  const [checkedDxObject, setCheckedDxObject] = React.useState({});

  const [page, setPage] = React.useState(1);
  const [openCoInfoDialogue, setOpenCoInfoDialogue] = React.useState(false);
  const [openProductDialogue, setOpenProductDialogue] = React.useState(false);
  const [openPlatformDialogue, setOpenPlatformDialogue] = React.useState(false);

  const [showPlatformEdit, setShowPlatformEdit] = useState(false)
  const [showProductEdit, setShowProductEdit] = useState(false)

  const [platformEditIddx, setPlatformEditIddx] = useState('')
  const [platformEditData, setPlatformEditData] = useState({})

  const dxInfo = location.state

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {

    resetDxsData()
    loadFdaData()
    loadDxsData()
    loadEditorStateFromProps()
    //  console.log(fdaData);
    // console.log(dxsData, platformEditData);
  }, [fdaData, dxsData, tag, tags, platformEditData, platformEditIddx])


  const loadEditorStateFromProps = () => {
    // console.log(JSON.parse(coDescriptionText).blocks.length, Object.keys(dxsData.dxdata).length);
    if (Object.keys(dxsData.dxdata).length > 1) {
      setWebsite(dxsData.dxdata.coInfo[0].website)
      setCoDescriptionText(dxsData.dxdata.coInfo[0].description)
      setMetaDescription(dxsData.dxdata.coInfo[0].meta_description)
      setCoHandle(dxsData.dxdata.coInfo[0].company_handle)
      setSeoTags(dxsData.dxdata.coInfo[0].seo_tags)
    }
  }

  const resetDxsData = () => {
    if (reload === false) {
      dispatch(resetDxFiltered())
    }
    setReload(true)
    //   console.log("resetDxsData");

  }

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
    //  console.log(dxsData.dxdata);
    if ((dxsData.dxdata.length === 0 && dxsData.loaded === "false")) {
      dispatch(getDxFiltered(dxInfo.idc))
    }
  }


  const showCompleted = () => {
    // console.log(dxsData.dxdata.length);
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
      // dispatch(addDxFiltered(data))
      // dispatch(updateInfoCompleted(data))
    }
  }


  const handleWebsite = e => {
    setWebsite(e.target.value)
  }

  const handleCoHandle = e => {
    setCoHandle(e.target.value)
  }

  const handleMetaDescription = e => {
    setMetaDescription(e.target.value)
  }

  const handleCoDescriptionTextChange = (e) => {
    // console.log(e.editorState.getCurrentContent());
    setCoDescriptionText(JSON.stringify(convertToRaw(e.editorState.getCurrentContent())))
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

  const handlePageChange = (event, value) => {
    // console.log(value);
    setPage(value);
  };


  const handleClickOpenProductDialogue = () => {
    setOpenProductDialogue(true);
  };

  const handleCloseProductDialogue = () => {
    setOpenProductDialogue(false);
  };


  const handleClickOpenPlatformDialogue = () => {
    setOpenPlatformDialogue(true);
  };

  const handleClosePlatformDialogue = () => {
    setOpenPlatformDialogue(false);
  };

  const handleAddPlatformDialogue = (e) => {
    e.preventDefault();
    let data = { iddx: newPlatform.iddx, name: newPlatform.name,
       platform: { platform_key: newPlatform.platform_key,
         platform_name: newPlatform.platform_name,
       platform_description: newPlatform.platform_description, platform_summary: newPlatform.platform_summary,
       platform_metaDescription: newPlatform.metaDescription,
        platform_tags: newPlatform.tags, platform_seo_tags: newPlatform.seoTags } }
      dispatch(addDxFiltered(data))
    let tagData = { iddx: dxInfo.idc, tags: newPlatform.tags }
    dispatch(addPlatformTag(tagData))
    // console.log(data);
    setOpenPlatformDialogue(false);
  };

  const handleAddProductDialogue = (e) => {
    e.preventDefault()
    let data = { iddx: dxInfo.idc, product: newProduct }
    dispatch(addDxProduct(data))

    let tagData = { iddx: dxInfo.idc, tags: newProduct.tags, product_key: newProduct.product_key }

    dispatch(addProductTag(tagData))

    if (newProduct.type_assay === true) {
      dispatch(addAssayTag(tagData))
    }
    if (newProduct.type_panel === true) {
      dispatch(addPanelTag(tagData))
    }
    if (newProduct.type_reagent === true) {
      dispatch(addReagentTag(tagData))
    }

    setOpenProductDialogue(false);
  }


  const handleClickOpenCoInfoDialogue = () => {
    setOpenCoInfoDialogue(true);
  };

  const handleCloseCoInfoDialogue = () => {
    setOpenCoInfoDialogue(false);
  };

  const handleAddCoInfoDialogue = () => {

    let data = { iddx: dxInfo.idc, name: dxInfo.name, website: website, description: coDescriptionText, companyHandle: coHandle, metaDescription: metaDescription, seoTags: seoTags }

    // console.log(data);
    dispatch(addDxCoInfoFiltered(data))
    setOpenCoInfoDialogue(false);
  };

  const handleNewPlatform = (e) => {
    setNewPlatform(e)
  }

  const handleNewProduct = (e) => {
    setNewProduct(e);
  }

  const handleNewSEOTag = (tag) =>{
    setSeoTags([...seoTags, tag])
  }

  const handleDeleteSEOTag = (i) =>{
    setSeoTags(seoTags.filter((index) => index !== i));
  }

  const handleShowPlatformEdit = (iddx, v) => {
    // console.log(iddx, v);
    setPlatformEditIddx(iddx)
    setPlatformEditData(v)
    setShowPlatformEdit(true)
  }

  const handleClosePlatformEdit = (e) => {
    setShowPlatformEdit(e)
  }


  const handleShowProductEdit = () => {
    setShowProductEdit(true)
  }

  const handleCloseProductEdit = (e) => {
    setShowProductEdit(e)
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
          <div className='font-semibold text-purple-800 text-base  flex justify-center items-center text-yellow-500 my-2'>
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


  const updateCompanyInfo = () => {

  }


  const showCompanyInfo = () => {
    if (Object.keys(dxsData.dxdata).length > 0) {
      // console.log(dxsData.dxdata.coInfo[0].description === coDescriptionText);

      return (
        <div className='border border-gray-400 p-2 rounded-md mb-5'>
          <div className='font-bold text-xl p-2'>
            {dxsData.dxdata.coInfo[0].website}
          </div>
          <div className='font-light p-1 mt-4'>
            <RteView data={coDescriptionText} onChange={() => { }} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Nope
        </div>
      )
    }
  }


  const showProductsAdded = (p) => {

    return (<div className="border-gray-200 p-2 border rounded-md m-2" key={p.key} >
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-1 text-md font-bold my-1'>{p.brand_name}</div>
        <div className='col-span-1 text-sm font-base my-1'>{p.generic_name}</div>
        <div className='col-span-1 flex justify-end items-end'>
          <IconButton aria-label="fingerprint" color="secondary" onClick={handleShowProductEdit}>
            <EditIcon />
          </IconButton>
          <ProductEdit data={p} iddx={dxsData.dxdata.coInfo[0].iddx} show={showProductEdit} onChange={handleCloseProductEdit} />
        </div>
      </div>

      <div className='text-sm font-base p-3'>
        <RteView data={p.description} onChange={() => { }} />
      </div>

      <div className='text-sm font-base my-2 p-2'>{p.speciality}</div>
      <div className='grid grid-flow-col auto-cols-max my-1'>
        {
          p.tags.map((tag, n) => {
            return (
              <div key={n} className="bg-purple-100 rounded-lg border border-purple-300 px-1 text-xs py-2 mx-1">
                {tag}
              </div>
            )
          })
        }
      </div>
      <div className='p-2 grid grid-flow-col gap-4'>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_assay} size="small" name="Assay" />Assay
        </div>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_panel} size="small" name="Assay" />Panel
        </div>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_reagent} size="small" name="Assay" />Reagent
        </div>
      </div>
    </div>)
  }


  const showPlatformsAdded = () => {

    if (Object.keys(dxsData.dxdata).length > 0) {
      // console.log(dxsData.dxdata);
      return (<div className='border border-gray-400 rounded-md p-1'>
        {dxsData.dxdata.plats.map((v, i) => {
          return (
            <div className="border-gray-200 p-2 border rounded-md m-2" key={i}>
              <div className='text-sm font-bold '>
                <div className='grid grid-cols-6 gap-2  '>
                  <div className='col-span-5  border border-purple-100 p-2 flex justify-center items-center'>
                    <div className='select-all ' onClick={() => { navigator.clipboard.writeText(v.key) }} >
                      {v.key}
                    </div>
                  </div>
                  <div className='col-span-1 flex justify-end items-end'>
                    <IconButton aria-label="fingerprint" color="secondary" onClick={() => {handleShowPlatformEdit(dxsData.dxdata.coInfo[0].iddx, v)}}>
                      <EditIcon />
                    </IconButton>
                   
                  </div>
                </div>

              </div>
              <div className='text-sm font-semibold my-1'>
                {v.name}
              </div>
              <div className='text-sm font-base my-1'>

                <RteView data={v.description} onChange={() => { }} />
              </div>
              <div className='grid grid-flow-col auto-cols-max my-2'>
                {
                  v.tags.map((tag, n) => {
                    return (
                      <div key={n} className="bg-purple-100 rounded-lg border border-purple-300 px-1 text-xs py-2 mx-1">
                        {tag}
                      </div>
                    )
                  })
                }
              </div>
              {dxsData.dxdata.prods.map((p, q) => {
                if (p.platform_key === v.key) {
                  return showProductsAdded(p)
                }
              })}
            </div>
          )
        })}  
            <PlatformEdit data={platformEditData} iddx={platformEditIddx} show={showPlatformEdit} onChange={handleClosePlatformEdit} />
      </div>)


    } else {
      return (
        <div>
          Nope
        </div>
      )
    }
  }


  const showOtherProductsAdded = (p) => {

    return (<div className="border-purple-600 p-2 border-2 rounded-md m-2" key={p.key} >
      <div className='text-sm font-bold my-1'>{p.brand_name}</div>
      <div className='text-sm font-base my-1'>{p.description}</div>
      <div className='text-sm font-base my-1'>{p.generic_name}</div>
      <div className='text-sm font-base my-1'>{p.speciality}</div>
      <div className='grid grid-flow-col auto-cols-max my-1'>
        {
          p.tags.map((tag, n) => {
            return (
              <div key={n} className="bg-purple-100 rounded-lg border border-purple-300 px-1 text-xs py-2 mx-1">
                {tag}
              </div>
            )
          })
        }
      </div>
      <div className='p-2 grid grid-flow-col gap-4'>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_assay} size="small" name="Assay" />Assay
        </div>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_panel} size="small" name="Assay" />Panel
        </div>
        <div className='text-xs font-semibold'>
          <Checkbox checked={p.type_reagent} size="small" name="Assay" />Reagent
        </div>
      </div>



    </div>)
  }

  const checkIfProds = () => {
    if (dxsData.dxdata.prods !== undefined) {
      return dxsData.dxdata.prods.map((prod, i) => {
        if (prod.platform_key === "00000000-0000-0000-0000-000000000000" || prod.platform_key === "11111111-1111-1111-1111-111111111111") {
          return showOtherProductsAdded(prod)
        }
      })
    } else {
      return null
    }
  }

  const showNameAddedToDxFiltered = (v) => {
    let res = 0;

    // if ((typeof dxsData.dxdata) === "object") {
    //   // console.log(dxsData.dxdata);
    //   if (dxsData.dxdata[0]) {
    //     res = dxsData.dxdata[0].fdas[0].filter(x => x.public_device_record_key === v.public_device_record_key);
    //   }

    // }

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
    let fdasLength = fdaData.data[0].fdas.length;

    let start = (page - 1) * 99
    let end = start + 99

    let slicedFdas = fdaData.data[0].fdas.slice(start, end);


    return (
      <div className='h-screen max-h-screen'>
        <Header />
        <div>
          <div className='col-span-1 h-full'>
            <div className='text-sm text-gray-800 font-bold p-1'>

              <div className='mt-20 grid grid-cols-5 gap-2'>
                <div className='col-span-4'>
                  {dxInfo.name}
                  <div className=' p-2 mb-1 text-xs font-medium'>
                    {dxInfo.idc}
                  </div>
                </div>

                <div className='col-span-1'>
                  {showCompleted()}
                </div>
              </div>


              <div className='p-1 bg-purple-50 border border-purple-200 rounded'>

                <div className='grid grid-cols-3 gap-2 text-base'>
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
              </div>

      {/* Company Info Dialogue Box */}

              <div className='grid grid-flow-col auto-rows-max gap-2 my-2'>
                <div className='mx-1'>
                  <Button variant="contained" onClick={handleClickOpenCoInfoDialogue} size='small'>
                    + Co. Info
                  </Button>
                </div>
                <Dialog maxWidth="lg" open={openCoInfoDialogue} onClose={handleCloseCoInfoDialogue}>
                  <DialogTitle>Add Company Info</DialogTitle>
                  <DialogContent>
                    <div className='grid grid-cols-6 gap-2'>
                      <div className='col-span-4'>
                        <div className='grid grid-cols-2 gap-2 my-3'>
                        <div className='col-span-1'>
                          <TextField autoComplete="off" id="outlined-basic" label="website" variant="outlined" onChange={handleWebsite} value={website} />
                        </div>
                        <div className='col-span-1'>
                          <TextField autoComplete='off' label="Company Handle " variant="outlined" onChange={handleCoHandle} value={coHandle} />
                        </div>
                        </div>                      
                        <div>
                          <RTE data={coDescriptionText} onChange={handleCoDescriptionTextChange} />
                        </div>
                       
                        <div className='my-2'>
                          <TextField autoComplete='off' label="Meta description" variant="outlined" fullWidth={true} minRows={2} maxRows={4} onChange={handleMetaDescription} value={metaDescription}  />
                        </div>
                        
                      </div>
                      <div className='col-span-2'>
                        <div className='text-2xl font-bold m-2'>
                          {website}
                        </div>
                        <div className='text-sx font-base p-2'>
                          {/* <RteView data={coDescriptionText} onChange={(e) => handleCoDescriptionTextChange(e)} /> */}
                          <RteView data={coDescriptionText} onChange={() => { }} />
                        </div>
                        <div className='m-6 p-3 '>
                          {metaDescription}
                        </div>
                      </div>
                     
                    </div>
                    <div className='w-full'>
                      <SEOTagBox name="seo tags" onChange={(v) => handleNewSEOTag(v)} onDelete={(v) => handleDeleteSEOTag(v)} 
                        data = {seoTags}/>  
                    </div>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCoInfoDialogue}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddCoInfoDialogue}>Save</Button>
                  </DialogActions>
                </Dialog>

                      {/* Platform Info Dialogue Box */}


                <div className='mx-1'>
                  <Button variant="contained" onClick={handleClickOpenPlatformDialogue} size='small'>
                    + Platform
                  </Button>
                </div>
                <Dialog maxWidth="lg" open={openPlatformDialogue} onClose={handleClosePlatformDialogue}>
                  <DialogTitle>Add Platform</DialogTitle>
                  <DialogContent>
                    <PlatformAdd name={dxInfo.name} idc={dxInfo.idc} onChange={(e) => { handleNewPlatform(e) }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosePlatformDialogue}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddPlatformDialogue}>Add</Button>
                  </DialogActions>
                </Dialog>


      {/* Product Info Dialogue Box */}

                <div className='mx-1'>
                  <Button variant="contained" onClick={handleClickOpenProductDialogue} size='small'>
                    + Product
                  </Button>
                </div>
                <Dialog maxWidth="md" open={openProductDialogue} onClose={handleCloseProductDialogue}>
                  <DialogTitle>Add Product for {dxInfo.name}</DialogTitle>
                  <DialogContent>

                    <ProductAdd Productname={dxInfo.name} idc={dxInfo.idc} name={dxInfo.name} onChange={(e) => { handleNewProduct(e) }}
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseProductDialogue}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddProductDialogue}>Add</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

          </div>
        </div>
        <div className='grid grid-cols-12 gap-1 h-4/6'>
          <div className='col-span-4 scroll-smooth h-full max-h-screen overflow-auto'>
            <div className='mt-2 mb-20'>
              {
                slicedFdas.map((v, i) => {
                  //  console.log(v);

                  if (i <= 2) {
                    return (
                      <div className='text-sm font-base flex justify-center items-center my-5' key={i}>
                        <div className='grid grid-rows-8 gap-2 bg-purple-50 w-auto p-1 mx-auto border border-purple-100 rounded-md'>
                          <div className='row-span-1 grid grid-cols-7 gap-2 '>
                            <div className='col-span-1 text-xs font-semibold'>
                              {start + i + 1}
                            </div>
                            <div className='col-span-4 text-base font-semibold text-gray-900'>
                              {showNameAddedToDxFiltered(v)}
                            </div>
                            <div className='col-span-2 p-1 text-xs text-center font-bold text-gray-700 border border-purple-200 tracking-wide flex justify-center items-center rounded-md'>
                              {v.brand_name}
                            </div>
                          </div>
                          <div className='row-span-2 text-red-500'>
                            {showProducts(v.product_codes)}
                          </div>
                          <div className='row-span-2'>
                            {showGmdnTerms(v.gmdn_terms)}
                          </div>
                          <div className='row-span-2 subpixel-antialiased font-mono border border-purple-200 p-5 tracking-tighter'>
                            {v.device_description}
                          </div>
                          <div className='row-span-2 subpixel-antialiased font-mono border border-purple-200 p-5 tracking-tighter'>
                            <div className='grid grid-cols-9 gap-1'>

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
                              <div className='col-span-2 '>
                                <TypeCheckBox name="Assay" onChange={(p) => { handleProdTypeAssayChange(p, v.public_device_record_key) }} />
                              </div>
                              <div className='col-span-2  '>
                                <TypeCheckBox name="Panel" onChange={(p) => { handleProdTypePanelChange(p, v.public_device_record_key) }} />
                              </div>
                              <div className='col-span-2 '>
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
                  }

                })}
            </div>

          </div>
          <div className='col-span-8 scroll-smooth max-h-screen overflow-auto'>
            <div className='mt-1 mb-10' >
              {showCompanyInfo()}
              {showPlatformsAdded()}
              {checkIfProds()}
              {/* {dxsData.dxdata.prods.map((prod, i) => {
                if (prod.platform_key === "00000000-0000-0000-0000-000000000000" || prod.platform_key === "11111111-1111-1111-1111-111111111111") {
                  return showOtherProductsAdded(prod)
                }
              })} */}
            </div>
            <div>
              <div className='bg-gray-100 p-1  mb-1 text-xs font-light grid grid-cols-6 gap-1'>
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
        <div className='w-full bg-gray-100 py-2 z-40 left-0 bottom-0 fixed'>
          <div className='grid grid-cols-12 gap-2'>
            <div className=' col-span-2 my-4 flex justify-center items-center'>
              <Button variant="contained" onClick={handleSave}>Save</Button>
            </div>
            <div className='col-span-10 flex justify-center items-center'>
              <Pagination
                count={Math.floor(fdasLength / 100) + 1}
                page={page} onChange={handlePageChange}

              />
            </div>
          </div>



        </div>

      </div>
    )
  }
}

export default Company;


