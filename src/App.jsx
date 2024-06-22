import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const newSkills = checked
          ? [...prevData.additionalSkills, value]
          : prevData.additionalSkills.filter((skill) => skill !== value);
        return { ...prevData, additionalSkills: newSkills };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (['Developer', 'Designer'].includes(formData.position)) {
      if (!formData.relevantExperience || formData.relevantExperience <= 0) {
        newErrors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
      }
    }
    if (formData.position === 'Designer') {
      if (!formData.portfolioUrl) newErrors.portfolioUrl = 'Portfolio URL is required';
      else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioUrl)) newErrors.portfolioUrl = 'Portfolio URL is invalid';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Job Application Form</h1>
        {submitted ? (
          <div className="bg-green-100 p-4 rounded">
            <h2 className="text-xl font-semibold">Application Submitted</h2>
            <div className="mt-4 p-4 bg-green-100 rounded">
              <h3 className="text-lg font-bold mb-2">Submission Summary:</h3>
              <p>Name: {formData.fullName}</p>
              <p>Email: {formData.email}</p>
              <p>Position: {formData.position}</p>
              <p>Experience: {formData.relevantExperience}</p>
              <p>Portfolio Url: {formData.portfolioUrl}</p>
              <p>Management Experience: {formData.managementExperience}</p>
              <p>Additional Skills: {formData.additionalSkills}</p>
              <p>Preferred Interview Date: {formData.preferredInterviewTime.slice(0,10)}</p>
              <p>Preferred Interview Time: {formData.preferredInterviewTime.slice(11,16)}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Applying for Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            {['Developer', 'Designer'].includes(formData.position) && (
              <div className="mb-4">
                <label className="block text-gray-700">Relevant Experience (years)</label>
                <input
                  type="number"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.relevantExperience && <p className="text-red-500">{errors.relevantExperience}</p>}
              </div>
            )}

            {formData.position === 'Designer' && (
              <div className="mb-4">
                <label className="block text-gray-700">Portfolio URL</label>
                <input
                  type="text"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.portfolioUrl && <p className="text-red-500">{errors.portfolioUrl}</p>}
              </div>
            )}

            {formData.position === 'Manager' && (
              <div className="mb-4">
                <label className="block text-gray-700">Management Experience</label>
                <input
                  type="text"
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                  className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.managementExperience && <p className="text-red-500">{errors.managementExperience}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">Additional Skills</label>
              <div className="mt-1 flex flex-wrap">
                {['JavaScript', 'CSS', 'Python'].map((skill) => (
                  <label key={skill} className="mr-4">
                    <input
                      type="checkbox"
                      name="additionalSkills"
                      value={skill}
                      checked={formData.additionalSkills.includes(skill)}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    {skill}
                  </label>
                ))}
              </div>
              {errors.additionalSkills && <p className="text-red-500">{errors.additionalSkills}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Preferred Interview Time</label>
              <input
                type="datetime-local"
                name="preferredInterviewTime"
                value={formData.preferredInterviewTime}
                onChange={handleChange}
                className="mt-1 block p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.preferredInterviewTime && <p className="text-red-500">{errors.preferredInterviewTime}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
