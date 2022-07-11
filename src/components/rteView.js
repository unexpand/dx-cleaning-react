import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';

function RteView(props) {
  let contentState = convertFromRaw(JSON.parse(props.data));
  const [jData, setJData] = useState(props.data)
  const [count, setCount] = useState(0)
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.data))));


  useEffect(() => {
    //   loadEditorStateFromProps()

  }, [props, editorState])


  const loadEditorStateFromProps = () => {
    console.log("called before");
    if (count < 2) {
      console.log("called after");
      let contentState = convertFromRaw(JSON.parse(props.data));
      setEditorState(EditorState.createWithContent(contentState))
      setCount(count + 1)
    }
  }

  const handleInputChange = (e) => {
    // console.log(e);
    setEditorState(e)
  }


  // {EditorState.createWithContent(contentState)}

  if (Object.keys(jData).length > 1) {
    let contentState = convertFromRaw(JSON.parse(props.data));

    // setEditorState(EditorState.createWithContent(contentState))

    return (
      <div className='w-auto h-auto'>
        <div>
          <div className='grid grid-cols-12 gap-2 h-18'>

          </div>
          <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(props.data)))} onChange={handleInputChange} />
        </div>
      </div>
    )
  } else {
    return (<div>
      ...
    </div>)
  }
}

export default RteView;