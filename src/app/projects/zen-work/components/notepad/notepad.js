import React from "react";
import { useDispatch } from 'react-redux'
import { updateWindowData } from "../../store/settingStore";
export default function Notepad(props) {
  const dispatch = useDispatch()
  const [notes, setNotes] = React.useState(props.data[0]===null? "": props.data[0])
  return(
    <div>
      <textarea style={{
        width:'100%',
        minWidth: 200,
        border:0,
        backgroundColor: 'transparent'
      }}
        value={notes}
        onChange={(e)=>{setNotes(e.target.value)}}
        onBlur={()=>{dispatch(updateWindowData({idx: props.windowIdx, data: [notes]}))}}
      />
    </div>
  )
}