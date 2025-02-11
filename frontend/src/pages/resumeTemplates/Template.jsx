import React, { useEffect, useState } from 'react';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Template = () => {
  const { tname, name } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = Cookies.get("token");
        console.log('hello upar');
        const response = await axios.get("http://localhost:3001/resume/my-resume", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log('hello');
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, []);

  // Show a loading indicator until the resume is fetched
  if (!resume) {
    return <div>Loading...</div>;
  }
  // Pass the fetched resume as a prop to the chosen template component
  if (tname === 'Classic') {
    return <Template1 data={resume} />;
  } else if (tname === 'Professional') {
    return <Template4 data={resume} />;
  } else if (tname === 'Creative') {
    return <Template3 data={resume} />;
  } else {
    return <Template2 data={resume} />;
  }
};

export default Template;
