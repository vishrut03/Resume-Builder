import Logo from '../../pages/Logo/Logo'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-2 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Logo size={24} color="#3B82F6" />
              <span className="ml-2 text-lg font-semibold text-gray-800">ResumeBuilder</span>
            </div>
            <p className="text-sm text-gray-600">Create professional resumes with ease.</p>
          </div>
          <div className="w-full md:w-1/2 md:text-right">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Legal</h3>
            <ul className="space-y-1">
              {["Privacy Policy", "Terms of Service"].map((text, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
