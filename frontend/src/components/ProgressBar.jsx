import React from "react"

const steps = [
  "PersonalDetails",
  "BriefDescription",
  "WorkExperience",
  "Education",
  "Projects",
  "Skills",
  "Achievements",
  "Certificates",
  "CodingProfiles",
  "CustomSection",
  "ExtraCurricularActivities",
]

const ProgressBar = ({ step }) => {
  const currentIndex = steps.indexOf(step)
  const progress = ((currentIndex + 1) / steps.length) * 100

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-blue-700 dark:text-blue-500">{step}</span>
        <span className="text-sm font-medium text-blue-700 dark:text-blue-500">{progress.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-4">
        {steps.map((stepName, index) => (
          <div key={stepName} className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full mb-1 transition-all duration-300 ${
                index <= currentIndex ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" : "bg-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500 hidden md:inline">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar

