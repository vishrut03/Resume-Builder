export const addResumeField = (resume, section, newEntry) => {
    const updatedSection = [...resume[section], newEntry];
    return { ...resume, [section]: updatedSection };
  };
  
   export const updateSimpleField = (resume, section, value) => {
        return {
        ...resume,
        [section]: value,
        };
    };
 
  export const updateArrayField = (resume, section, index, fieldKey, value) => {
    const updatedEntry = { ...resume[section][index], [fieldKey]: value };
    const updatedSection = [...resume[section]];
    updatedSection[index] = updatedEntry;
    return {
      ...resume,
      [section]: updatedSection,
    };
  };
  
  
  export const deleteResumeField = (resume, section, index) => {
    const updatedSection = resume[section].filter((_, i) => i !== index);
    return { ...resume, [section]: updatedSection };
  };
  