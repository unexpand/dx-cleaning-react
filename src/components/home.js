import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from "react-router-dom";

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { v4 as uuidv4 } from 'uuid';

import { getCoInfo, addToDxCompanies } from '../redux/actions';

import Header from './header';

function Home() {

  const dispatch = useDispatch();
  const { getAll } = useSelector(state => state)

  const [heartColor, setHeartColor] = useState("lightgray");
  const [name, setName] = useState('')
  const [coName, setCoName] = useState('')


  const [enteredName, setEnteredName] = useState('')
  const [cos, setCos] = useState([])
  const [openCompanyDialogue, setOpenCompanyDialogue] = React.useState(false);

  const idc = uuidv4();

  const [newFdas, setNewFdas] = useState({

    "is_rx": "false",
    "is_kit": "false",
    "is_otc": "false",
    "is_hct_p": "false",
    "brand_name": "unknown",
    "gmdn_terms": [
      {
        "name": "",
        "definition": ""
      }
    ],
    "mri_safety": "",
    "identifiers": [
      {
        "id": "",
        "type": "Primary",
        "issuing_agency": "GS1"
      }
    ],
    "company_name": "",
    "is_pm_exempt": "false",
    "publish_date": "2016-08-22",
    "is_single_use": "false",
    "product_codes": [
      {
        "code": "",
        "name": "",
        "openfda": {
          "device_name": "",
          "device_class": "2",
          "regulation_number": "",
          "medical_specialty_description": ""
        }
      }
    ],
    "record_status": "Published",
    "sterilization": {
      "is_sterile": "false",
      "is_sterilization_prior_use": "false"
    },
    "catalog_number": "",
    "customer_contacts": [
      {
        "email": "",
        "phone": ""
      }
    ],
    "has_serial_number": "true",
    "is_labeled_as_nrl": "false",
    "device_description": "",
    "has_expiration_date": "false",
    "labeler_duns_number": "",
    "public_version_date": "2019-03-25",
    "is_labeled_as_no_nrl": "false",
    "premarket_submissions": [
      {
        "submission_number": "",
        "supplement_number": "000"
      }
    ],
    "public_version_number": "4",
    "public_version_status": "Update",
    "has_donation_id_number": "false",
    "has_manufacturing_date": "true",
    "is_combination_product": "false",
    "has_lot_or_batch_number": "false",
    "version_or_model_number": "1500, 3000, or both",
    "is_direct_marking_exempt": "false",
    "public_device_record_key": "00000000-0000-0000-0000-000000000000",
    "device_count_in_base_package": "1",
    "commercial_distribution_status": "In Commercial Distribution"


  });

  useEffect(() => {
    // console.log(newFdas);
    if (getAll.data.length === 0) {
      dispatch(getCoInfo())
    }
    setCos(getAll.data)
  }, [getAll])


  const handleNameChange = (e) => {
    // console.log(enteredName.length);
    setEnteredName(e.target.value)
    // console.log(name);
    let oldtags = cos.filter(v => v.name.toLowerCase().includes(enteredName.toLowerCase()));
    // console.log(oldtags);
    setCos(oldtags)
    if (enteredName.length < 3) {
      setCos(getAll.data)
    }
  }



  const handleCoNameChange = e => {
    setCoName(e.target.value)
  }

  const showName = (name) => {
    if (name !== undefined) {
      return (<div>
        {name.toUpperCase()}
      </div>)
    } else {
      return (<div>
        ...
      </div>)
    }
  }

  const showHeartColor = (isLiked) => {
    if (isLiked) {
      return "red"
    } else {
      return "lightgray"
    }
  }

  const handleAddNewCo = () => {
    let data = { idc: idc, name: coName, fdas: newFdas }
    console.log(data);
    handleCloseCompanyDialogue()
    dispatch(addToDxCompanies(data))
  }

  const changeHeartColor = (isLiked) => {
    // do nothing here, because it will happen in description when saved
  }

  const handleClickOpenCompanyDialogue = () => {
    setOpenCompanyDialogue(true);
  };

  const handleCloseCompanyDialogue = () => {
    setOpenCompanyDialogue(false);
  };


  const displayList = () => {
    if (getAll.data.length < 1) {
      return (
        <div>
          Loading ...
        </div>
      )
    } else {

      return (
        <div className='grid grid-flow-row grid-cols-4 gap-4'>
          {
            cos.map((v, i) => {
              //      console.log(v.no_fda);

              if ((v.no_fda === false) || (v.no_fda === null)) {
                return (
                  <div key={i}>
                    <div className='bg-purple-50 h-48 py-3 px-3 border border-purple-200
                  rounded-md flex justify-center items-center text-center tracking-wide text-sm font-semibold text-gray-900'
                    >
                      <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/dx/${v.name}`}
                        key={v.idc}
                        state={v}
                      >
                        <div className='w-10/12 mx-auto'>
                          {showName(v.name)}
                        </div>

                      </Link>
                      <div className='mx-1 flex justify-end items-end'>
                        <IconButton aria-label="delete" size="small" onClick={changeHeartColor(v.liked_co)} style={{ color: showHeartColor(v.liked_co) }} >
                          <FavoriteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </div>

                  </div>
                )
              } else {
                return (
                  <div key={i}>
                    <div className='bg-purple-200 h-48 py-3 px-3 border border-purple-200
                  rounded-md flex justify-center items-center text-center tracking-wide text-sm font-semibold text-gray-900'
                    >
                      <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/dx/${v.name}`}
                        key={v.idc}
                        state={v}
                      >
                        <div className='w-10/12 mx-auto'>
                          {showName(v.name)}
                        </div>

                      </Link>
                      <div className='mx-1 flex justify-end items-end'>
                        <IconButton aria-label="delete" size="small" onClick={changeHeartColor(v.liked_co)} style={{ color: showHeartColor(v.liked_co) }} >
                          <FavoriteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    </div>

                  </div>
                )
              }

            })
          }
        </div >
      )
    }
  }

  return (
    <div className='h-screen min-h-screen  bg-white'>
      <div className='h-1/5 p-1 bg-purple-50'>
        <Header />
        <div className='sticky top-20 h-20'>
          <div className="grid grid-cols-12 gap-2">
            <div className='col-span-11 bg-white'>
              <TextField
                id="outlined-multiline-static"
                label="Company name"
                fullWidth
                onChange={handleNameChange}
                value={enteredName}
              />
            </div>
            <div className='col-span-1'>
              <Button variant="contained" onClick={handleClickOpenCompanyDialogue}>
                Add Company
              </Button>
              <Dialog width="lg" open={openCompanyDialogue} onClose={handleCloseCompanyDialogue}>
                <DialogTitle>New Company</DialogTitle>
                <DialogContent>

                  <TextField id="outlined-basic" label="Company Name" variant="outlined" onChange={handleCoNameChange} value={coName} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCompanyDialogue}>Cancel</Button>
                  <Button variant="contained" onClick={handleAddNewCo}>Add</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

        </div>
      </div>

      <div className='p-2 scroll-smooth h-4/5 overflow-auto'>
        {displayList()}
      </div>
    </div>
  )
}

export default Home;