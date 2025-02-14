import { useState, useEffect } from "react";
import { ArrowDown, List } from "lucide-react";
import PersonalDetails from "./PersonalDetails";
import Signin from "./Signin";
import temp1 from "../../assets/template-1.svg";
import temp2 from "../../assets/ats-friendly-Combined-Resume-Template.png";
import temp3 from "../../assets/temp3.webp";
import temp4 from "../../assets/template-2.png";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    return localStorage.getItem("currentStep") || "Home";
  });
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const templates = [
    { id: 1, name: "Classic", imageUrl: temp1 },
    { id: 2, name: "Professional", imageUrl: temp2 },
    { id: 3, name: "Creative", imageUrl: temp3 },
    { id: 4, name: "Modern", imageUrl: temp4 },
  ];

  const detailsList = [
    "Personal Details",
    "Brief Description",
    "Work Experience",
    "Education",
    "Projects",
    "Skills",
    "Achievements",
    "Certificates",
    "Extra-Curricular Activities",
  ];

  const scrollToSteps = () => {
    const stepsSection = document.getElementById("steps-section");
    stepsSection?.scrollIntoView({ behavior: "smooth" });
  };

  if(currentStep === "signin") {
    return <Signin/>
  }

  if(currentStep === "personaldetails") {
    return <PersonalDetails/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {currentStep === "Step1" ? (
        <PersonalDetails />
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-blue-600">
                Create Your Professional Resume
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stand out from the crowd with a beautifully crafted resume
              </p>
              <button
                onClick={() => setCurrentStep("signin")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold 
                          transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                Create Resume Now
              </button>

              <div className="mt-16 flex flex-col items-center">
                <p className="text-gray-600 mb-2">Discover Our 3-Step Process</p>
                <ArrowDown 
                  className="w-8 h-8 text-blue-600 cursor-pointer animate-bounce"
                  onClick={scrollToSteps}
                />
              </div>
            </div>
          </div>

          {/* 3-Step Process Section */}
          <div id="steps-section" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-blue-600">
                Follow 3 Easy Steps:
              </h2>

              {/* Step 1 */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Step 1: Provide Details
                </h3>
                <p className="text-gray-600 mb-4">
                  Fill in your information to create your resume:
                </p>
                <div className="flex flex-wrap gap-3">
                  {detailsList.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg"
                    >
                      <List className="w-4 h-4" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Step 2: Choose Template
                </h3>
                <p className="text-gray-600 mb-6">
                  Pick from our wide variety of visually appealing templates:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                    >
                      <img
                        src={template.imageUrl}
                        alt={template.name}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-xl font-semibold">{template.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Step 3: Download & Share
                </h3>
                <p className="text-gray-600">
                  Once your resume is ready, download it as a PDF or share a direct link with employers or friends.
                </p>
              </div>
            </div>
          </div>

          {/* Auth Modal */}
          {/* {isAuthModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                {authMode === "signin" ? (
                  <Signin 
                    // onSignUp={() => setAuthMode("signup")}
                    onSuccessfulSignIn={() => {
                      setIsAuthModalOpen(false);
                    }}
                  />
                ) : (
                  <Signup
                    // onSignIn={() => setAuthMode("signin")}
                    onSuccessfulSignUp={() => {
                      setIsAuthModalOpen(false);
                    }}
                  />
                )}
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Home;