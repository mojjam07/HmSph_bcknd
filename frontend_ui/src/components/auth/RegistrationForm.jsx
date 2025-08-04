import React, { useState } from 'react';
import { ArrowLeft, User, Home, Shield } from 'lucide-react';
import RoleSelection from './RoleSelection';
import Input from '../common/Input';
import Button from '../common/Button';
import { register } from '../../api';

const RegistrationForm = () => {
  const [step, setStep] = useState(1); // 1: role selection, 2: common info, 3: role-specific info, 4: review
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    
    // Role-specific fields
    businessName: '',
    licenseNumber: '',
    yearsOfExperience: '',
    department: '',
    employeeId: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 2) {
      // Validate common fields
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (role !== 'admin') {
        if (!formData.phone) newErrors.phone = 'Phone number is required';
      }
    }
    
    if (currentStep === 3) {
      // Validate role-specific fields
      if (role === 'agent') {
        if (!formData.businessName) newErrors.businessName = 'Business name is required';
        if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      }
      
      if (role === 'admin') {
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'user': return 'Property Seeker';
      case 'agent': return 'Real Estate Agent';
      case 'admin': return 'Administrator';
      default: return '';
    }
  };

  // Function to handle registration submission
  const handleRegistration = async () => {
    setSubmitting(true);
    setMessage('');
    
    try {
      // Prepare data based on role
      let registrationData = {
        role: role,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      };
      
      // Add role-specific fields
      if (role === 'agent') {
        registrationData.phone = formData.phone;
        registrationData.businessName = formData.businessName;
        registrationData.licenseNumber = formData.licenseNumber;
        registrationData.yearsOfExperience = formData.yearsOfExperience;
      } else if (role === 'admin') {
        registrationData.department = formData.department;
        registrationData.employeeId = formData.employeeId;
      } else {
        // Regular user
        registrationData.phone = formData.phone;
      }
      
      // Call the registration API
      const result = await register(registrationData);
      
      // Show success message
      setMessage('Registration successful! You can now log in.');
      console.log('Registration result:', result);
    } catch (error) {
      // Show error message
      setMessage('Registration failed: ' + error.message);
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      
      case 2:
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Enter your personal information</p>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              
              {role !== 'admin' && (
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required={role !== 'admin'}
                />
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  required
                />
                
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  required
                />
              </div>
              
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                required
              />
              
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                required
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
              <p className="text-gray-600">Provide details specific to your role</p>
            </div>
            
            <div className="space-y-4">
              {role === 'agent' && (
                <>
                  <Input
                    label="Business Name"
                    name="businessName"
                    type="text"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    error={errors.businessName}
                    required
                  />
                  
                  <Input
                    label="License Number"
                    name="licenseNumber"
                    type="text"
                    placeholder="Enter your license number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    error={errors.licenseNumber}
                    required
                  />
                  
                  <Input
                    label="Years of Experience"
                    name="yearsOfExperience"
                    type="number"
                    placeholder="Enter years of experience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                  />
                </>
              )}
              
              {role === 'admin' && (
                <>
                  <Input
                    label="Department"
                    name="department"
                    type="text"
                    placeholder="Enter your department"
                    value={formData.department}
                    onChange={handleInputChange}
                    error={errors.department}
                    required
                  />
                  
                  <Input
                    label="Employee ID"
                    name="employeeId"
                    type="text"
                    placeholder="Enter your employee ID"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    error={errors.employeeId}
                    required
                  />
                </>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
              <p className="text-gray-600">Please review before submitting</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{getRoleTitle()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                {role !== 'admin' && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                )}
              </div>
            </div>
            
            {role === 'agent' && (
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{formData.businessName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{formData.licenseNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Years of Experience</p>
                    <p className="font-medium">{formData.yearsOfExperience || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}
            
            {role === 'admin' && (
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{formData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium">{formData.employeeId}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Display success or error message */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    if (step === 1) return null;
    
    const steps = ['Role', 'Info', 'Details', 'Review'];
    const currentStepIndex = step - 1;
    
    return (
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between relative">
          {steps.map((stepName, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStepIndex;
            const isCurrent = stepNumber === currentStepIndex;
            
            return (
              <div key={index} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isActive 
                    ? isCurrent 
                      ? 'bg-blue-600 text-white border-2 border-blue-600' 
                      : 'bg-green-500 text-white border-2 border-green-500'
                    : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}>
                  {isActive && !isCurrent ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepName}
                </span>
              </div>
            );
          })}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
            style={{ width: `${((currentStepIndex - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step > 1 && (
          <div className="mb-6">
            <button
              onClick={prevStep}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
        )}
        
        {renderProgressBar()}
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
          
          {step > 1 && step < 4 && (
            <div className="mt-8 flex justify-between">
              <Button
                onClick={prevStep}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {step === 3 ? 'Review' : 'Next'}
              </Button>
            </div>
          )}
          
          {step === 4 && (
            <div className="mt-8">
              <Button
                onClick={handleRegistration}
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {submitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
