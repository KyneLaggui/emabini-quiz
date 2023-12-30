import React from 'react'
import ReactDOM from 'react-dom';
import styles from "./Loader.scss";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='loader-wrapper'>
        <div className='loader'>
            <img src={loaderImg} alt="Loading..." />
        </div>
    </div>, document.getElementById("loader")
  )
}

export default Loader;
