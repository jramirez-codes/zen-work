import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';


export default function NavBar(props) {
  const actions = [
    { icon: <PersonIcon color={props.currPage === 'About Me'?"primary":""}/>, name: 'About Me' },
    // { icon: <FolderSpecialIcon color={props.currPage === 'Portfolio'?"primary":""}/>, name: 'Portfolio' },
    { icon: <ContactPageIcon color={props.currPage === 'Contact Me'?"primary":""}/>, name: 'Contact Me' },
  ];

  React.useEffect(()=>{
  },[props])

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', top: "4.5%", right: "6vw" }}
      icon={<SpeedDialIcon />}
      direction="down"
    >
      {actions.map((action) => {
        return(
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>{props.setPage(action.name)}}
          />
        )
        })}
    </SpeedDial>
  );
}