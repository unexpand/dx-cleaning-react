import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { convertToRaw } from 'draft-js';

import { v4 as uuidv4 } from 'uuid';

import RTE from './rte';
import RteView from './rteView';
import TypeCheckBox from "./typeCheckBox";
import TagBox from './tagBox';


function ProductAdd(props) {
  const product_key = uuidv4();
  const [platformKey, setPlatformKey] = useState('')
  const [brandName, setBrandName] = React.useState('');
  const [genericName, setGenericName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('{ "blocks": [], "entityMap": {} }');
  const [speciality, setSpeciality] = React.useState('');
  const [isAssay, setIsAssay] = useState(false)
  const [isPanel, setIsPanel] = useState(false)
  const [isReagent, setIsReagent] = useState(false)
  const [tags, setTags] = useState([])
  const [platformIndependent, setPlatformIndependent] = useState(false);
  const [onOtherPlatform, setOnOtherPlatform] = useState(false);
  const [otherKey, setOtherKey] = useState('');
  const [otherPlatformKey, setOtherPlatformKey] = useState([]);
  const [isVisible, setIsVisible] = useState('invisible')

  useEffect(() => {
    props.onChange({
      "platform_key": platformKey,
      "product_key": product_key,
      "platform_independent": platformIndependent,
      "brand_name": brandName,
      "generic_name": genericName,
      "company_name": props.name,
      "product_description": productDescription,
      "speciality": speciality,
      "type_assay": isAssay,
      "type_panel": isPanel,
      "type_reagent": isReagent,
      "on_other_platform": onOtherPlatform,
      "on_other_platform_key": otherPlatformKey,
      "tags": tags
    })
  }, [platformKey, brandName, genericName, productDescription, speciality, isAssay, isPanel, isReagent, tags])


  const handlePlatformKey = (e) => {
    setPlatformKey(e.target.value)
  }

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value)
  }

  const handleGenericNameChange = (e) => {
    setGenericName(e.target.value)
  }

  const handleProductDefinitionChange = (e) => {
    // setProductDescription(e.target.value)
    setProductDescription(JSON.stringify(convertToRaw(e.editorState.getCurrentContent())))
  }

  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value)
  }

  const handleIsAssay = (e) => {
    setIsAssay(e)
  }

  const handleIsPanel = (e) => {
    setIsPanel(e)
  }

  const handleIsReagent = (e) => {
    setIsReagent(e)
  }

  const handleTagsAdd = (e, i) => {
    setTags([...tags, e])
  }

  const handleTagsDelete = (i) => {
    setTags(tags.filter((index) => index !== i));
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

  const handleAddOtherKey = () => {
    setOtherPlatformKey([...otherPlatformKey, otherKey])
    setOtherKey('')
  }

  // Using Generic for Gmdn
  return (
    <div className="w-full h-auto p-3">

      <div className='grid grid-cols-6 gap-2'>

        <div className='col-span-3'>
          <div className='mb-2'>
            <TextField autoComplete="off" fullWidth id="outlined-basic" label="Platform Key" variant="outlined" onChange={handlePlatformKey} value={platformKey} />
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
            <div className='grid grid-cols-8 gap-1 mt-2'>
              <div className='col-span-4 bg-purple-200 text-xs'>
                <TypeCheckBox name="Not On Any Platform" onChange={handleNoPlatform} />
              </div>
              <div className='col-span-4 bg-purple-200 text-xs'>
                <TypeCheckBox name="On A Different Platform" onChange={handleOtherPlatform} />
              </div>
            </div>
          </div>

          <TextField autoComplete="off" id="outlined-basic" label="Brand Name" variant="outlined" onChange={handleBrandNameChange} />
          <TextField autoComplete="off" id="outlined-basic" label="Generic Name" variant="outlined" onChange={handleGenericNameChange} />

          <div>
            <div className='text-xs font-base '>
              Product Description:
            </div>

            <RTE data={productDescription} onChange={handleProductDefinitionChange} />
          </div>


          <TextField
            autoComplete="off"
            id="outlined-multiline-static"
            label="Medical Speciality"

            onChange={handleSpecialityChange}
          />
          <div className='grid grid-cols-9 gap-1 mt-2'>
            <div className='col-span-3 bg-purple-200 text-sm'>
              <TypeCheckBox name="Assay" onChange={handleIsAssay} />
            </div>
            <div className='col-span-3 bg-purple-200'>
              <TypeCheckBox name="Panel" onChange={handleIsPanel} />
            </div>
            <div className='col-span-3 bg-purple-200'>
              <TypeCheckBox name="Reagent" onChange={handleIsReagent} />
            </div>
          </div>


        </div>

        <div className='col-span-3'>
          <div>
            Other Platform Keys:
            <div>
              {otherPlatformKey.map((k, i) => {
                return <div key={i} className="text-sm font-base">{k}</div>
              })}
            </div>
          </div>

          <div>
            Brand Name: {brandName}
          </div>
          <div>
            Generic Name: {genericName}
          </div>

          <div>
            Medical Speciality: {speciality}
          </div>
          <div>
            Product Description:
            <RteView data={productDescription} onChange={() => { }} />
          </div>
        </div>
        <div className='col-span-6'>
          <TagBox id={product_key} onChange={(e, i) => handleTagsAdd(e, i)} onDelete={(i) => handleTagsDelete(i)} />
        </div>

      </div>


    </div >
  )
}
export default ProductAdd;