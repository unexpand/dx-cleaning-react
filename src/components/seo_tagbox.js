import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';


// import { addProductTag, addAssayTag } from '../redux/actions';

function SEOTagBox(props) {

  const dispatch = useDispatch();

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(props.data);


  const handleTagAddition = t => {
    setTags([...tags, tag]);
    props.onChange(tag, props.id)
    setTag('')
  };

  const handleTagDelete = (i, v) => {
    setTags(tags.filter((tag, index) => index !== i));
    props.onDelete(v, props.id)
  };

  const handleNewTag = (e) => {
    setTag(e.target.value)
  }


  return (
    <div className="">
      <div className='my-4 grid grid-cols-12 gap-2'>
        <div className='col-span-3 grid grid-flow-col auto-cols-max gap-1'>
          <TextField autoComplete="off" id="outlined-basic" label={props.name} variant="outlined" onChange={handleNewTag} value={tag} />
          <Fab size="small" color="primary" aria-label="add" onClick={handleTagAddition}>
            <AddIcon />
          </Fab>
        </div>

        <div className='col-span-8'>
          <div className="h-auto min-h-40 mb-10">
            <div className="grid grid-flow-row-dense grid-cols-3 gap-1">
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

      </div>
    </div>
  )
}

export default SEOTagBox;