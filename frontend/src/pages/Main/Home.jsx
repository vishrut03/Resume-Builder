import React,{useState} from "react"
import PersonalDetails from "./PersonalDetails"

const Home = () => {
  const [currentStep, setCurrentStep] = useState("Home")
  // Base64 encoded light blue gradient (replace this with your preferred background)
  const backgroundImage ="https://png.pngtree.com/background/20210711/original/pngtree-my-resume-background-material-picture-image_1117680.jpg"

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "calc(100vh - 120px)", // Adjust 120px based on your header and footer height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#333", // Dark text for better contrast on light background
      textAlign: "center",
      padding: "20px",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
    },
    button: {
      padding: "12px 24px",
      fontSize: "1.1rem",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  }

  const handleCreateResume = () => {
    setCurrentStep("PersonalDetails")
  }
  if(currentStep === "PersonalDetails"){
    return <PersonalDetails />
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Professional Resume</h1>
      <p style={styles.subtitle}>Stand out from the crowd with a beautifully crafted resume</p>
      <button
        style={styles.button}
        onClick={handleCreateResume}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Create Resume
      </button>
    </div>
  )
}

export default Home

