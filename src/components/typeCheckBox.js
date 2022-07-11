import React, { useState, useEffect } from 'react'

import Checkbox from '@mui/material/Checkbox';

function TypeCheckBox(props) {

  const label = { inputProps: { 'aria-label': 'Checkbox Type of Product' } };

  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    if (checked === false) {
      setChecked(true)
      props.onChange(true)
    } else {
      setChecked(false)
      props.onChange(false)
    }
  }


  return (
    <div className='text-xs  p-1 bg-purple-200'>
      <Checkbox {...label} checked={checked} onChange={handleChecked} size="small" />{props.name}
    </div>
  )
}

export default TypeCheckBox;