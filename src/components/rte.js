import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';


function RTE(props) {
  let contentState = convertFromRaw(JSON.parse(props.data));
  const [jData, setJData] = useState(props.data)
  const [count, setCount] = useState(0)
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

  useEffect(() => {
    loadEditorStateFromProps()
    props.onChange({
      editorState
    })

  }, [props, editorState])



  const loadEditorStateFromProps = () => {

    if (count < 2) {
      let contentState = convertFromRaw(JSON.parse(props.data));
      setEditorState(EditorState.createWithContent(contentState))
      setCount(count + 1)
    }
  }

  const handleInputChange = (e) => {
    // console.log(e);
    setEditorState(e)
  }

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  // const _onSave = () => {
  //   setJData(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  // }

  const displayData = () => {
    if (Object.keys(jData).length > 0) {
      let contentState = convertFromRaw(JSON.parse(jData));
      return (
        <div>
          <Editor editorState={EditorState.createWithContent(contentState)} />
        </div>
      )
    } else {
      return (<div>
        ...
      </div>)
    }


  }

  return (
    <div className="w-full h-auto bg-gray-200 border border-gray-100  p-5">
      <div className='grid grid-cols-12 gap-2 p-2'>
        <div className='col-span-2 m-1'>
          <button onClick={_onBoldClick} className="font-bold py-1 px-2 bg-purple-100 border rounded border-purple-500" >B</button>
        </div>
        <div className='col-span-2 m-1'>
          <button onClick={_onItalicClick} className="font-bold italic py-1 px-2 bg-purple-100 border rounded border-purple-500" >I</button>
        </div>
      </div>
      <div className='bg-white min-h-fit p-2 rounded'>
        <Editor editorState={editorState} onChange={handleInputChange} />
      </div>
    </div>
  )
}
export default RTE;