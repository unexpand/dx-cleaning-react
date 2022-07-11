import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import { convertToRaw } from 'draft-js';

import TagBox from './tagBox';
import RTE from './rte';
import SEOTagBox from './seo_tagbox';


import { updateDxPlatform } from '../redux/actions';

function PlatformEdit(props) {

  const dispatch = useDispatch();
  const [openDialogue, setOpenDialogue] = useState(props.show);
  const [coName, setCoName] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState({})
  const [metaDescription, setMetaDescription] = useState("")
  const [platformSummary, setPlatformSummary] = useState("")
  const [seoTags, setSeoTags] = React.useState([])

  const [tag, setTag] = useState('');
  const [tags, setTags] = React.useState([]);
  const [prevTags, setPrevTags] = useState([])

  const [includedTags, setIncludedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);

  useEffect(() => {
    console.log(props.data);
    if (props.show === true) {
      setOpenDialogue(true)
      setName(props.data.name)
      setTags(props.data.tags)
      setDescription(props.data.description)
      checkCoNameFirst()
      checkMetaDescriptionFirst()
      checkPlatformSummaryFirst()
      checkSeoTagsFirst()
    }
    props.onChange(false)
    
  }, [props, openDialogue, tags, description, name, coName, platformSummary, metaDescription, seoTags])

  const checkCoNameFirst = () => {
    if(props.data.company_name === null){
      setCoName("")
    } else {
      setCoName(props.data.company_name)
    }
  }

  const checkMetaDescriptionFirst = () => {
    if(props.data.meta_description === null){
      setMetaDescription("")
    } else {
      setMetaDescription(props.data.meta_description)
    }
  }

  const checkPlatformSummaryFirst = () => {
    if(props.data.platform_summary === null){
      setPlatformSummary("")
    } else {
      setPlatformSummary(props.data.platform_summary)
    }
  }

  const checkSeoTagsFirst = () => {
    if(props.data.seo_tags === null){
      setSeoTags([])
    } else {
      setSeoTags(props.data.seo_tags)
    }
  }

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleCoNameChange = (e) => {
    setCoName(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescription(JSON.stringify(convertToRaw(e.editorState.getCurrentContent())))
  }

  const handlePlatformSummary = e => {
    setPlatformSummary(e.target.value)
  }
  
  const handleMetaDescription = e => {
    setMetaDescription(e.target.value)
  }

  const handleNewTag = (e) => {
    setTag(e.target.value)
  }

  const handleAddNewTag = (v) => {
    setPrevTags(tags)
    setTags([...tags, tag]);
    props.onChange(tag, props.id)
    setTag('')
    handleIncludedTags(tag)
  }

  const handleTagDelete = (i, v) => {
    setTags(tags.filter(index => index !== v));
    handleExcludedTags(v)
  }

  const handleIncludedTags = (tag) => {
    if(props.data.tags.includes(tag) === false){
      setIncludedTags([...includedTags, tag])
    }
    // console.log(tags);
    // let incs = tags.filter(d => !props.data.tags.includes(d))
    // console.log(incs);
    // setIncludedTags([...includedTags, incs])
    // let exck = props.data.tags.filter(d => !tags.includes(d))
    // console.log(exck);
    // setExcludedTags([...excludedTags, exck])
  }

  const handleExcludedTags = (tag) => {

    if(props.data.tags.includes(tag) === true){
      setExcludedTags([...excludedTags, tag])
    }
    // let exck = props.data.tags.filter(d => !tags.includes(tag))
    // console.log(exck);
    
  }

  const handleNewSEOTag = (tag) =>{
    setSeoTags([...seoTags, tag])
  }

  const handleDeleteSEOTag = (i) =>{
    setSeoTags(seoTags.filter((index) => index !== i));
  }

  const handleUpdateInfo = () => {
    console.log(prevTags);
    let updatedData = {
      "iddx": props.iddx,
      "key": props.data.key,
      "name": name,
      "description": description,
      "metaDescription": metaDescription,
      "platformSummary": platformSummary,
      "tags": tags,
      "included_tags": includedTags,
      "excluded_tags": excludedTags,
      "companyName": coName,
      "seoTags": seoTags,
    }
    console.log(updatedData);
    dispatch(updateDxPlatform(updatedData))
    setOpenDialogue(false);
  }

  if(Object.keys(props.data).length > 1 && props.data.tags.length > 0){
    // console.log(props.data);
    return (
      <Dialog maxWidth="lg" open={openDialogue} onClose={handleCloseDialogue}>
        <DialogTitle>Edit Platform Info</DialogTitle>
        <DialogContent>
          <div className='grid grid-cols-6 gap-2'>
            <div className='col-span-6'>
            <div className='my-5'>
                <TextField id="outlined-basic" value={coName} onChange={handleCoNameChange} />
              </div>
              <div className='my-5'>
                <TextField id="outlined-basic" value={name} onChange={handleNameChange} />
              </div>
              <div>
                <RTE data={description} onChange={handleChangeDescription} />
              </div>
              <div className='my-2'>
                <TextField autoComplete='off' label="Platform Summary" variant="outlined" fullWidth={true} minRows={2} maxRows={4} onChange={handlePlatformSummary} value={platformSummary}  />
          </div>
          <div className='my-2'>
                <TextField autoComplete='off' label="Meta description" variant="outlined" fullWidth={true} minRows={2} maxRows={4} onChange={handleMetaDescription} value={metaDescription}  />
          </div>
              <div className='w-full'>
                <div className="h-auto min-h-40 mb-10">
                  <div className='col-span-3 grid grid-flow-col auto-cols-max gap-1'>
                    <TextField autoComplete="off" id="outlined-basic" label={"platform tags"} variant="outlined" onChange={handleNewTag} value={tag} />
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
                </div>
              </div>
              <div className='w-full'>
                      <SEOTagBox name="seo tags" onChange={(v) => handleNewSEOTag(v)} onDelete={(v) => handleDeleteSEOTag(v)} 
                        data = {seoTags}/>  
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
  } else {
    return null
  }

  
}

export default PlatformEdit;