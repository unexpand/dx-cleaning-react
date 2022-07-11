import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { v4 as uuidv4 } from 'uuid';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';

import TagBox from './tagBox';
import RTE from './rte';
import RteView from './rteView';
import SEOTagBox from './seo_tagbox';

function PlatformAdd(props) {

  const [newPlatformInfo, setNewPlatformInfo] = React.useState({});
  const platform_key = uuidv4();
  const [platformName, setPlatformName] = React.useState('');
  const [gmdnName, setGmdnName] = React.useState('');
  const [gmdnDefinition, setGmdnDefinition] = React.useState('');

  const [platformDescription, setPlatformDescription] = React.useState('{ "blocks": [], "entityMap": {} }');
  const [tag, setTag] = React.useState({});
  const [pTags, setPTags] = React.useState([]);
  const [metaDescription, setMetaDescription] = React.useState('')
  const [platformSummary, setPlatformSummary] = React.useState('')
  const [seoTags, setSeoTags] = React.useState([])

  useEffect(() => {
    props.onChange({
      "iddx": props.idc,
      "name": props.name,
      "platform_key": platform_key,
      "platform_name": platformName,
      "platform_description": platformDescription,
      "platform_summary": platformSummary,
      "metaDescription": metaDescription,
      "tags": pTags,
      "seoTags": seoTags
    })
  }, [platformName, platformDescription, pTags, seoTags])

  const handlePlatformNameChange = (e) => {
    setPlatformName(e.target.value)
  }


  const handlePlatformDescriptionChange = (e) => {
    // setPlatformDescription(e.target.value)
    setPlatformDescription(JSON.stringify(convertToRaw(e.editorState.getCurrentContent())))
  }

  const handleNewTag = (v) => {
    setPTags([...pTags, v])
  }

  const handleTagDelete = (i) => {
    setPTags(pTags.filter((index) => index !== i));
  }

  const handlePlatformSummary = e => {
    setPlatformSummary(e.target.value)
  }
  
  const handleMetaDescription = e => {
    setMetaDescription(e.target.value)
  }

  const handleNewSEOTag = (tag) =>{
    setSeoTags([...seoTags, tag])
  }

  const handleDeleteSEOTag = (i) =>{
    setSeoTags(seoTags.filter((index) => index !== i));
  }
  
  return (
    <div className="w-auto h-auto p-1">
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <div className='my-2 font-medium'>
            {props.name}
          </div>
          <div className='m-1'>
            <TextField autoComplete="off" id="outlined-basic" fullWidth label="Platform Name" variant="outlined" onChange={handlePlatformNameChange} />
          </div>
          <div className='m-1 min-h-40'>
            <RTE data={platformDescription} onChange={handlePlatformDescriptionChange} />
          </div>
          <div className='my-2'>
                <TextField autoComplete='off' label="Platform Summary" variant="outlined" fullWidth={true} minRows={2} maxRows={4} onChange={handlePlatformSummary} value={platformSummary}  />
          </div>
          <div className='my-2'>
                <TextField autoComplete='off' label="Meta description" variant="outlined" fullWidth={true} minRows={2} maxRows={4} onChange={handleMetaDescription} value={metaDescription}  />
          </div>
        </div>
        <div className='col-span-1 border-gray-100 border p-2'>
          <div className='grid grid-flow-row auto-rows-max'>
            <div className='text-xl font-semibold'>
              {platformName}
            </div>
            <div className='my-2 '>
              <RteView data={platformDescription} onChange={() => { }} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <TagBox id={platform_key} onChange={(v, id) => handleNewTag(v, id)} onDelete={(v, id) => handleTagDelete(v, id)} />
      </div>
      <div className='w-full'>
                      <SEOTagBox name="seo tags" onChange={(v) => handleNewSEOTag(v)} onDelete={(v) => handleDeleteSEOTag(v)} 
                        data = {seoTags}/>  
                    </div>
    </div>
  )
}
export default PlatformAdd;


// const handleNewTag = (v, id) => {
  //   // console.log(v, id);
  //   let ares = pTags.filter((i) => { return (Object.keys(i)[0]) === v });
  //   // console.log(ares);
  //   if (ares.length < 1) {
  //     setPTags([...pTags, { [v]: [id] }]);
  //   } else {
  //     let newvals = Object.values(Object.values(ares)[0])
  //     newvals[0].push(id)
  //     let oldtags = pTags.filter((i) => { return (Object.keys(i)[0]) !== v });
  //     setPTags([...oldtags, { [Object.keys(ares[0])[0]]: newvals }]);
  //   }

  // }

  // const handleTagDelete = (t, v) => {
  //   let oldtags = pTags.filter((i) => { return (Object.keys(i)[0]) !== t });
  //   let filtag = pTags.filter((i) => { return (Object.keys(i)[0]) === t });

  //   let filtagvals = Object.values(filtag[0])[0]
  //   let itIsArr = Array.isArray(filtagvals[0])

  //   if (itIsArr === false) {
  //     setPTags(oldtags)
  //   } else {
  //     const index = filtagvals[0].indexOf(v);
  //     filtagvals[0].splice(index, 1)
  //     setPTags([...oldtags, { [t]: filtagvals[0] }])
  //   }
  // };
