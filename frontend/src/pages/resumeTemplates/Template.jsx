import React from 'react'
import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3'
import Template4 from './Template4'
import { useParams } from 'react-router-dom';


const Template = () => {
    const {id,name} = useParams();
    const numericId = Number(id);
    console.log(id,name);
    if (numericId === 1) {
        return <Template1 />
    } else if (numericId === 2) {
        return <Template4 />
    } else if (numericId === 3) {
        return <Template3 />
    } else if (numericId === 4) {
        return <Template2 />
    } else {
        return <Template1 />
    }
}

export default Template
