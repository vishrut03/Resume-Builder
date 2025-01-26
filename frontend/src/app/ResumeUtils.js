export const addResumeField = (resume, section, newEntry) => {
    const updatedSection = [...resume[section], newEntry];
    if(section === 'education' || section === 'workExperience') {
      updatedSection.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }
    return { ...resume, [section]: updatedSection };
  };
  
   export const updateSimpleField = (resume, section, value) => {
        return {
        ...resume,
        [section]: value,
        };
    };

    export const updateObjectField = (resume, section, modifiedObject) => {
        const newResume = { ...resume };
        newResume[section] = { ...newResume[section], ...modifiedObject };
        return newResume;
      };
 
  export const updateArrayField = (resume, section, index, fieldKey, value) => {
    const updatedEntry = { ...resume[section][index], [fieldKey]: value };
    const updatedSection = [...resume[section]];
    updatedSection[index] = updatedEntry;
    if(section === 'education' || section === 'workExperience') {
      updatedSection.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }
    return {
      ...resume,
      [section]: updatedSection,
    };
  };
  
  
  export const deleteResumeField = (resume, section, index) => {
    const updatedSection = resume[section].filter((_, i) => i !== index);
    return { ...resume, [section]: updatedSection };
  };
  