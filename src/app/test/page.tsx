'use client';
import React, { useState } from 'react';
import { X, Check, ChevronRight, Sparkles, Heart, Send, AlertCircle } from 'lucide-react';
import './SymptomChecker.css';

interface Symptom {
  id: string;
  name: string;
  category: string;
}

const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredSymptom, setHoveredSymptom] = useState<string | null>(null);

  const steps = ['Select Body Part', 'Choose Symptoms', 'Review & Submit'];

  const symptoms: Symptom[] = [
    { id: '1', name: 'Pain', category: 'Physical' },
    { id: '2', name: 'Swelling', category: 'Physical' },
    { id: '3', name: 'Redness', category: 'Physical' },
    { id: '4', name: 'Fever', category: 'General' },
    { id: '5', name: 'Fatigue', category: 'General' },
    { id: '6', name: 'Headache', category: 'Neurological' },
    { id: '7', name: 'Dizziness', category: 'Neurological' },
    { id: '8', name: 'Nausea', category: 'Digestive' },
  ];

  const bodyParts = [
    { id: 'head', name: 'Head & Face', top: '8%', left: '50%' },
    { id: 'neck', name: 'Neck', top: '18%', left: '50%' },
    { id: 'chest', name: 'Chest', top: '28%', left: '50%' },
    { id: 'leftShoulder', name: 'Left Shoulder', top: '22%', left: '30%' },
    { id: 'rightShoulder', name: 'Right Shoulder', top: '22%', left: '70%' },
    { id: 'leftArm', name: 'Left Arm', top: '35%', left: '25%' },
    { id: 'rightArm', name: 'Right Arm', top: '35%', left: '75%' },
    { id: 'abdomen', name: 'Abdomen', top: '40%', left: '50%' },
    { id: 'leftHand', name: 'Left Hand', top: '50%', left: '20%' },
    { id: 'rightHand', name: 'Right Hand', top: '50%', left: '80%' },
    { id: 'pelvis', name: 'Pelvis', top: '52%', left: '50%' },
    { id: 'leftThigh', name: 'Left Thigh', top: '62%', left: '42%' },
    { id: 'rightThigh', name: 'Right Thigh', top: '62%', left: '58%' },
    { id: 'leftKnee', name: 'Left Knee', top: '72%', left: '42%' },
    { id: 'rightKnee', name: 'Right Knee', top: '72%', left: '58%' },
    { id: 'leftLeg', name: 'Left Leg', top: '82%', left: '42%' },
    { id: 'rightLeg', name: 'Right Leg', top: '82%', left: '58%' },
    { id: 'leftFoot', name: 'Left Foot', top: '92%', left: '42%' },
    { id: 'rightFoot', name: 'Right Foot', top: '92%', left: '58%' },
  ];

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((prev) =>
      prev.find((s) => s.id === symptom.id)
        ? prev.filter((s) => s.id !== symptom.id)
        : [...prev, symptom]
    );
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s.id !== symptomId));
  };

  const handleBodyPartClick = (partId: string) => {
    setSelectedBodyPart(partId);
    if (currentStep === 0) setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0 && selectedBodyPart) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedSymptoms([]);
        setSelectedBodyPart('');
        setCurrentStep(0);
      }, 5000);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedBodyPart !== '';
    if (currentStep === 1) return selectedSymptoms.length > 0;
    return true;
  };

  return (
    <div className="symptom-checker">
      {/* Progress Stepper */}
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div key={index} className="stepper-step">
            <div className={`stepper-circle ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              {index < currentStep ? <Check size={20} /> : index + 1}
            </div>
            <div className="stepper-label">{step}</div>
            {index < steps.length - 1 && (
              <div className={`stepper-line ${index < currentStep ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Selected Symptoms Floating Chips */}
      {selectedSymptoms.length > 0 && (
        <div className="floating-symptoms">
          <div className="symptoms-header">
            <Heart size={18} className="pulse-icon" />
            <span>Your Symptoms ({selectedSymptoms.length})</span>
          </div>
          <div className="symptom-chips">
            {selectedSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="symptom-chip"
                onMouseEnter={() => setHoveredSymptom(symptom.id)}
                onMouseLeave={() => setHoveredSymptom(null)}
              >
                <span>{symptom.name}</span>
                {hoveredSymptom === symptom.id && (
                  <button
                    className="chip-remove"
                    onClick={() => removeSymptom(symptom.id)}
                    aria-label={`Remove ${symptom.name}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Step 0 & 1: Body Part Selection */}
        {currentStep <= 1 && (
          <div className="section body-section">
            <h2 className="section-title">
              <AlertCircle size={24} />
              Where does it hurt?
            </h2>
            <p className="section-subtitle">Tap on the body part that needs attention</p>
            
            <div className="body-diagram">
              <svg viewBox="0 0 200 400" className="body-svg">
                {/* Head */}
                <ellipse cx="100" cy="30" rx="20" ry="25" className={`body-part ${selectedBodyPart === 'head' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('head')} />
                
                {/* Neck */}
                <rect x="90" y="55" width="20" height="15" className={`body-part ${selectedBodyPart === 'neck' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('neck')} />
                
                {/* Shoulders */}
                <circle cx="70" cy="80" r="12" className={`body-part ${selectedBodyPart === 'leftShoulder' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftShoulder')} />
                <circle cx="130" cy="80" r="12" className={`body-part ${selectedBodyPart === 'rightShoulder' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightShoulder')} />
                
                {/* Chest */}
                <rect x="80" y="70" width="40" height="40" rx="8" className={`body-part ${selectedBodyPart === 'chest' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('chest')} />
                
                {/* Arms */}
                <rect x="55" y="92" width="15" height="50" rx="7" className={`body-part ${selectedBodyPart === 'leftArm' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftArm')} />
                <rect x="130" y="92" width="15" height="50" rx="7" className={`body-part ${selectedBodyPart === 'rightArm' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightArm')} />
                
                {/* Hands */}
                <ellipse cx="62" cy="150" rx="8" ry="10" className={`body-part ${selectedBodyPart === 'leftHand' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftHand')} />
                <ellipse cx="138" cy="150" rx="8" ry="10" className={`body-part ${selectedBodyPart === 'rightHand' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightHand')} />
                
                {/* Abdomen */}
                <rect x="80" y="110" width="40" height="40" rx="8" className={`body-part ${selectedBodyPart === 'abdomen' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('abdomen')} />
                
                {/* Pelvis */}
                <ellipse cx="100" cy="165" rx="25" ry="15" className={`body-part ${selectedBodyPart === 'pelvis' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('pelvis')} />
                
                {/* Thighs */}
                <rect x="75" y="180" width="18" height="60" rx="9" className={`body-part ${selectedBodyPart === 'leftThigh' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftThigh')} />
                <rect x="107" y="180" width="18" height="60" rx="9" className={`body-part ${selectedBodyPart === 'rightThigh' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightThigh')} />
                
                {/* Knees */}
                <circle cx="84" cy="250" r="10" className={`body-part ${selectedBodyPart === 'leftKnee' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftKnee')} />
                <circle cx="116" cy="250" r="10" className={`body-part ${selectedBodyPart === 'rightKnee' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightKnee')} />
                
                {/* Legs */}
                <rect x="77" y="260" width="14" height="70" rx="7" className={`body-part ${selectedBodyPart === 'leftLeg' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftLeg')} />
                <rect x="109" y="260" width="14" height="70" rx="7" className={`body-part ${selectedBodyPart === 'rightLeg' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightLeg')} />
                
                {/* Feet */}
                <ellipse cx="84" cy="340" rx="10" ry="15" className={`body-part ${selectedBodyPart === 'leftFoot' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('leftFoot')} />
                <ellipse cx="116" cy="340" rx="10" ry="15" className={`body-part ${selectedBodyPart === 'rightFoot' ? 'selected' : ''}`} onClick={() => handleBodyPartClick('rightFoot')} />
              </svg>
              
              {selectedBodyPart && (
                <div className="selected-part-indicator">
                  Selected: <strong>{bodyParts.find(p => p.id === selectedBodyPart)?.name}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 1: Symptoms Selection */}
        {currentStep === 1 && (
          <div className="section symptoms-section">
            <h2 className="section-title">
              <Sparkles size={24} />
              What are you feeling?
            </h2>
            <p className="section-subtitle">Select all symptoms that apply</p>
            
            <div className="symptoms-grid">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  className={`symptom-button ${selectedSymptoms.find(s => s.id === symptom.id) ? 'selected' : ''}`}
                  onClick={() => toggleSymptom(symptom)}
                >
                  <span className="symptom-name">{symptom.name}</span>
                  {selectedSymptoms.find(s => s.id === symptom.id) && (
                    <Check size={20} className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {currentStep === 2 && !isSubmitted && (
          <div className="section review-section">
            <h2 className="section-title">
              <Heart size={24} />
              Almost there! Let&apos;s review
            </h2>            
            <div className="review-card">
              <div className="review-item">
                <strong>Body Part:</strong>
                <span>{bodyParts.find(p => p.id === selectedBodyPart)?.name}</span>
              </div>
              <div className="review-item">
                <strong>Symptoms:</strong>
                <div className="review-symptoms">
                  {selectedSymptoms.map(s => (
                    <span key={s.id} className="review-symptom-tag">{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="submit-button" onClick={handleSubmit}>
              <Send size={20} />
              Submit for Diagnosis
              <Sparkles size={16} className="sparkle" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="success-animation">
            <div className="success-content">
              <div className="success-icon">
                <Check size={60} />
              </div>
              <h2 className="success-title">🎉 Great Job!</h2>
              <p className="success-message">
                Your symptoms have been recorded successfully!
              </p>
              <p className="success-submessage">
                Our medical team will review your information shortly. 
                Take a deep breath and relax! 💙
              </p>
              <div className="loading-hearts">
                <Heart className="heart-1" size={20} />
                <Heart className="heart-2" size={24} />
                <Heart className="heart-3" size={20} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {!isSubmitted && (
          <div className="navigation-buttons">
            {currentStep > 0 && (
              <button className="nav-button back-button" onClick={() => setCurrentStep(currentStep - 1)}>
                ← Back
              </button>
            )}
            {currentStep < 2 && (
              <button
                className={`nav-button next-button ${!canProceed() ? 'disabled' : ''}`}
                onClick={() => canProceed() && setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
              >
                Continue <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
