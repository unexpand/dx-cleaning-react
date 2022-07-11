import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Checkbox from '@mui/material/Checkbox';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import { convertToRaw } from 'draft-js';

import RTE from './rte';


import { updateDxProduct } from '../redux/actions';

function ProductEdit(props) {

  const dispatch = useDispatch();
  const [openDialogue, setOpenDialogue] = useState(props.show);
  const [platformKey, setPlatformKey] = useState(props.data.platform_key)
  const [platformIndependent, setPlatformIndependent] = useState(props.data.platform_independent)
  const [onOtherPlatform, setOnOtherPlatform] = useState(false);
  const [otherKey, setOtherKey] = useState('');
  const [otherPlatformKey, setOtherPlatformKey] = useState(props.data.on_other_platform_key);
  const [brandName, setBrandName] = useState(props.data.brand_name)
  const [genericName, setGenericName] = useState(props.data.generic_name)
  const [speciality, setSpeciality] = useState(props.data.speciality)
  const [description, setDescription] = useState(props.data.description)
  const [isAssay, setIsAssay] = useState(props.data.type_assay);
  const [isPanel, setIsPanel] = useState(props.data.type_panel);
  const [isReagent, setIsReagent] = useState(props.data.type_reagent)
  const [tag, setTag] = useState('');
  const [tags, setTags] = React.useState(props.data.tags);
  const [includedTags, setIncludedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([])
  const [isVisible, setIsVisible] = useState('invisible')

  useEffect(() => {
    console.log(props);
    if (props.show === true) {
      setOpenDialogue(true)
    }
    props.onChange(false)
  }, [props, openDialogue, tags, description, brandName])

  const handlePlatformKey = (e) => {
    setPlatformKey(e.target.value)
  }

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value)
  }

  const handleGenericNameChange = (e) => {
    setGenericName(e.target.value)
  }

  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value)
  }

  const handleNoPlatform = () => {
    if (platformIndependent === false) {
      let sameKey = '11111111-1111-1111-1111-111111111111';
      setPlatformKey(sameKey)
      setPlatformIndependent(true)
    } else {
      setPlatformKey('')
      setPlatformIndependent(false)
    }
  }

  const handleOtherPlatform = () => {
    if (onOtherPlatform === false) {
      let sameKey = '00000000-0000-0000-0000-000000000000';
      setPlatformKey(sameKey)
      setIsVisible('visible')
      setOnOtherPlatform(true)
    } else {
      setPlatformKey('')
      setIsVisible('invisible')
      setOnOtherPlatform(false)
    }
  }

  const handleOtherKey = (e) => {
    setOtherKey(e.target.value)
  }

  const handleOriginalKey = () => {
    setPlatformKey(props.data.key)
    if (platformIndependent === true) {
      setPlatformIndependent(false)
    }
  }

  const handleAddOtherKey = () => {
    setOtherPlatformKey([...otherPlatformKey, otherKey])
    setOtherKey('')
  }

  const handleChangeDescription = (e) => {
    setDescription(JSON.stringify(convertToRaw(e.editorState.getCurrentContent())))
  }

  const handleIsAssay = () => {
    if (isAssay === false) {
      setIsAssay(true)
    } else {
      setIsAssay(false)
    }

  }

  const handleIsPanel = () => {
    if (isPanel === false) {
      setIsPanel(true)
    } else {
      setIsPanel(false)
    }
  }

  const handleIsReagent = () => {
    if (isReagent === false) {
      setIsReagent(true)
    } else {
      setIsReagent(false)
    }
  }

  const handleNewTag = (e) => {
    setTag(e.target.value)
  }

  const handleAddNewTag = (v) => {
    setTags([...tags, tag]);
    props.onChange(tag, props.id)
    setTag('')
  }

  const handleTagDelete = (i, v) => {
    setTags(tags.filter(index => index !== v));
  }

  const handleUpdateInfo = () => {
    let incs = tags.filter(d => !props.data.tags.includes(d))
    console.log(incs);
    setIncludedTags(incs)
    let exck = props.data.tags.filter(d => !tags.includes(d))
    console.log(exck);
    setExcludedTags(exck)
    let updatedData = {
      "product": {
        "platform_key": platformKey,
        "product_key": props.data.key,
        "platform_independent": platformIndependent,
        "brand_name": brandName,
        "generic_name": genericName,
        "company_name": props.data.company_name,
        "product_description": description,
        "speciality": speciality,
        "type_assay": isAssay,
        "type_panel": isPanel,
        "type_reagent": isReagent,
        "on_other_platform": onOtherPlatform,
        "on_other_platform_key": otherPlatformKey,
        "tags": tags,
        "included_tags": includedTags,
        "excluded_tags": excludedTags,
        "previous_platform_key": props.data.platform_key,
        "previous_tags": props.data.tags,
        "iddx": props.iddx,
      },
      "iddx": props.iddx
    }
    console.log(updatedData);
    dispatch(updateDxProduct(updatedData))
  }

  return (
    <Dialog maxWidth="lg" open={openDialogue} onClose={handleCloseDialogue}>
      <DialogTitle>Edit Product Info</DialogTitle>
      <DialogContent>
        <div className='grid grid-flow-row gap-2'>
          <div className='grid  grid-flow-row  gap-1 my-1 p-1'>
            <div className='row-span-1'>
              <TextField autoComplete="off" fullWidth id="outlined-basic" label="Platform Key" variant="outlined" onChange={handlePlatformKey} value={platformKey} />
            </div>
            <div className='row-span-1'>
              <div className={isVisible}>
                <div className="grid grid-cols-12 gap-2 my-1">
                  <div className="col-span-10">
                    <TextField autoComplete="off" fullWidth id="outlined-basic" label="Other Platform Key" variant="outlined" onChange={handleOtherKey} value={otherKey} />
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    <Fab size="small" color="secondary" aria-label="add" onClick={handleAddOtherKey}>
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-9 gap-1 mt-2'>
              <div className='col-span-3 text-xs flex justify-center items-center'>
                <Button variant="contained" onClick={handleOriginalKey}>Original Platform Key</Button>
              </div>
              <div className='col-span-3 bg-purple-200 text-xs'>
                <Checkbox name="Not On Any Platform" onChange={handleNoPlatform} /> Not On Any Platform
              </div>
              <div className='col-span-3 bg-purple-200 text-xs'>
                <Checkbox name="On A Different Platform" onChange={handleOtherPlatform} /> On A Different Platform
              </div>
            </div>
          </div>
          <div className='my-5 grid grid-cols-3 gap-2'>
            <div className='col-span-1'>
              <div className='text-xs'>
                Brand Name
              </div>
              <TextField id="outlined-basic" value={brandName} onChange={handleBrandNameChange} />
            </div>
            <div className='col-span-1'>
              <div className='text-xs'>
                Generic Name
              </div>
              <TextField id="outlined-basic" value={genericName} onChange={handleGenericNameChange} />
            </div>
            <div className='col-span-1'>
              <div className='text-xs'>
                Speciality
              </div>
              <TextField id="outlined-basic" value={speciality} onChange={handleSpecialityChange} />
            </div>
          </div>
          <div>
            <RTE data={description} onChange={handleChangeDescription} />
          </div>
          <div className='w-full'>
            <div className="h-auto min-h-40 mb-10">
              <div className='col-span-3 grid grid-flow-col auto-cols-max gap-1'>
                <TextField autoComplete="off" id="outlined-basic" label={props.name} variant="outlined" onChange={handleNewTag} value={tag} />
                <Fab size="small" color="primary" aria-label="add" onClick={handleAddNewTag}>
                  <AddIcon />
                </Fab>
              </div>
              <div className="grid grid-flow-row-dense grid-cols-3 gap-1 mt-2">
                {
                  tags.map((v, i) => {
                    return (
                      <div key={i} className="grid grid-flow-col w-36 border-2 text-gray-800 bg-white border-purple-200 rounded-md font-normal text-xs">
                        <div className="mx-1 p-2">
                          {v}
                        </div>

                        <IconButton aria-label="delete" className="mx-2" size="small" onClick={() => { handleTagDelete(i, v) }}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    )
                  })
                }
              </div>
              <div className='p-2 grid grid-flow-col gap-4'>
                <div className='text-xs font-semibold'>
                  <Checkbox checked={isAssay} size="small" name="Assay" onChange={handleIsAssay} />Assay
                </div>
                <div className='text-xs font-semibold'>
                  <Checkbox checked={isPanel} size="small" name="Assay" onChange={handleIsPanel} />Panel
                </div>
                <div className='text-xs font-semibold'>
                  <Checkbox checked={isReagent} size="small" name="Assay" onChange={handleIsReagent} />Reagent
                </div>
              </div>
            </div>
          </div>


        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogue}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdateInfo}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductEdit;