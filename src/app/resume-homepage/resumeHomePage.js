import './App.css';
import MainPage from './components/mainPage/mainPage';
import NavBar from './components/mainPage/components/navigation/nav';
import React, {useState} from 'react';
// const normalize = {
//   display: inline-block;
//   flex-direction: row;
//   align-items: end;
//   justify-content: start;
// }


function ResumeHomePage() {
  const [currPage, setCurrPage] = useState("About Me")

  return (
    <>
      <NavBar currPage={currPage} setPage={setCurrPage}/>
      <div className='mainBackground'>
        <div style={{backgroundColor:"#eff1f4", justifyContent:'flex-end', alignItems:'flex-start'}}>
        </div>
        <div className='mainContainer'>
          <div className='mainGrid'>
            <MainPage currPage={currPage}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeHomePage;
