import React from 'react'
import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3'
import Template4 from './Template4'
import { useParams } from 'react-router-dom';


const Template = () => {
    const {tname,name} = useParams();
    console.log(tname,name);
    if (tname === 'Classic') {
        return <Template1 />
    } else if (tname === 'Professional') {
        return <Template2 />
    } else if (tname === 'Creative') {
        return <Template3 />
    } else  {
        return <Template4 />
    } 
}

export default Template
