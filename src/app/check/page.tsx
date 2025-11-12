'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { SymptomsData, type Symptom, type Category } from './symptoms';

type BodyPartKey = 'head' | 'neck' | 'chest' | 'abdomen' | 'left_arm' | 'right_arm' | 'left_leg' | 'right_leg';
type BodyParams = Record<BodyPartKey, boolean>;

interface SymptomTab {
  id: string;
  symptom: Symptom;
  bodyParts: BodyPartKey[];
  description: string;
}

const bodyParts: { id: BodyPartKey; label: string; top: string; left: string }[] = [
  { id: 'head', label: 'Head', top: '8%', left: '50%' },
  { id: 'neck', label: 'Neck', top: '18%', left: '50%' },
  { id: 'chest', label: 'Chest', top: '30%', left: '50%' },
  { id: 'abdomen', label: 'Abdomen', top: '45%', left: '50%' },
  { id: 'left_arm', label: 'Left Arm', top: '35%', left: '25%' },
  { id: 'right_arm', label: 'Right Arm', top: '35%', left: '75%' },
  { id: 'left_leg', label: 'Left Leg', top: '65%', left: '40%' },
  { id: 'right_leg', label: 'Right Leg', top: '65%', left: '60%' },
];

const styleSheet = `
  @keyframes scaleIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.3) !important;
  }
  .hover-scale:hover {
    transform: scale(1.05);
  }
  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6) !important;
  }
  .category-card {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center;
  }
  .category-card:hover {
    transform: scale(1.15);
    z-index: 10;
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4) !important;
  }
  .symptom-card {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center;
  }
  .symptom-card:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4) !important;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .tab-button {
    transition: all 0.3s ease;
  }
  .tab-button:hover {
    transform: translateY(-2px);
  }
`;

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [symptomTabs, setSymptomTabs] = useState<SymptomTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [processedCategories, setProcessedCategories] = useState<string[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);

  const availableCategories = useMemo(
    () => SymptomsData.filter((c) => !processedCategories.includes(c.category)),
    [processedCategories]
  );

  const activeTab = useMemo(
    () => symptomTabs.find(tab => tab.id === activeTabId),
    [symptomTabs, activeTabId]
  );

  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategory(category);
    setStep(1);
  }, []);

  const handleToggleSymptomTab = useCallback((symptom: Symptom) => {
    const existingTab = symptomTabs.find(tab => tab.symptom.id === symptom.id);
    
    if (existingTab) {
      setSymptomTabs(prev => {
        const filtered = prev.filter(tab => tab.symptom.id !== symptom.id);
        if (activeTabId === existingTab.id && filtered.length > 0) {
          setActiveTabId(filtered[filtered.length - 1].id);
        } else if (filtered.length === 0) {
          setActiveTabId(null);
        }
        return filtered;
      });
    } else {
      const newTab: SymptomTab = {
        id: `tab-${Date.now()}-${Math.random()}`,
        symptom,
        bodyParts: [],
        description: '',
      };
      setSymptomTabs(prev => [...prev, newTab]);
      setActiveTabId(newTab.id);
    }
  }, [symptomTabs, activeTabId]);

  const handleCloseTab = useCallback((tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSymptomTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId && filtered.length > 0) {
        setActiveTabId(filtered[filtered.length - 1].id);
      } else if (filtered.length === 0) {
        setActiveTabId(null);
      }
      return filtered;
    });
  }, [activeTabId]);

  const handleUpdateActiveTab = useCallback((updates: Partial<Omit<SymptomTab, 'id' | 'symptom'>>) => {
    if (!activeTabId) return;
    setSymptomTabs(prev => prev.map(tab => 
      tab.id === activeTabId ? { ...tab, ...updates } : tab
    ));
  }, [activeTabId]);

  const handleBodyPartToggle = useCallback((partId: BodyPartKey) => {
    if (!activeTab) return;
    const newBodyParts = activeTab.bodyParts.includes(partId)
      ? activeTab.bodyParts.filter(id => id !== partId)
      : [...activeTab.bodyParts, partId];
    handleUpdateActiveTab({ bodyParts: newBodyParts });
  }, [activeTab, handleUpdateActiveTab]);

  const handleNextFromSymptoms = useCallback(() => {
    if (selectedCategory) setProcessedCategories(p => [...p, selectedCategory.category]);
    setSelectedCategory(null);
    setStep(2);
  }, [selectedCategory]);

  const handleNoMoreSymptoms = useCallback(() => {
    const requiresBody = symptomTabs.some(tab => tab.symptom.triggers_body_map);
    setStep(requiresBody ? 3 : 4);
  }, [symptomTabs]);

  const handleReset = useCallback(() => {
    setStep(0);
    setSelectedCategory(null);
    setSymptomTabs([]);
    setActiveTabId(null);
    setProcessedCategories([]);
    setShowCongrats(false);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log({
      symptoms: symptomTabs.map(tab => ({
        id: tab.symptom.id,
        bodyParts: tab.bodyParts,
        description: tab.description,
      })),
    });
    setShowCongrats(true);
  }, [symptomTabs]);

  const btnStyle = (variant: 'primary' | 'secondary' | 'outline' = 'primary', disabled = false) => ({
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600' as const,
    borderRadius: '12px',
    border: variant === 'outline' ? '2px solid #667eea' : 'none',
    background: disabled ? '#e0e0e0' : variant === 'primary' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : variant === 'secondary' ? '#fff' : 'transparent',
    color: variant === 'primary' ? '#fff' : '#667eea',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: variant === 'primary' && !disabled ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <>
      <style>{styleSheet}</style>
      <div style={{
        minHeight: '100vh',
        background: '#009acb',
        padding: '40px 20px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Normal Tabs with Light Aqua Gradient */}
          {symptomTabs.length > 0 && !showCongrats && (
            <div style={{
              marginBottom: '20px',
              background: 'linear-gradient(135deg, rgba(127, 255, 212, 0.3) 0%, rgba(64, 224, 208, 0.3) 100%)',
              borderRadius: '16px',
              padding: '12px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
              }}
              className="scrollbar-hide"
              >
                {symptomTabs.map((tab) => {
                  const isActive = activeTabId === tab.id;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className="tab-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 20px',
                        borderRadius: '12px',
                        background: isActive 
                          ? 'linear-gradient(135deg, #7fffd4 0%, #40e0d0 100%)'
                          : 'rgba(255, 255, 255, 0.5)',
                        border: isActive ? '2px solid #20b2aa' : '2px solid transparent',
                        cursor: 'pointer',
                        minWidth: 'fit-content',
                        boxShadow: isActive 
                          ? '0 4px 15px rgba(64, 224, 208, 0.4)'
                          : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        animation: 'slideIn 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: '20px', flexShrink: 0 }}>{tab.symptom.icon}</div>
                      <div style={{ 
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? '#006d5b' : '#333',
                        whiteSpace: 'nowrap',
                      }}>
                        {tab.symptom.label}
                      </div>
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          fontSize: '14px',
                          color: isActive ? '#006d5b' : '#666',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                        aria-label="Close tab"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Congratulations */}
          {showCongrats && (
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '60px 40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center' as const
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                fontSize: '60px',
                animation: 'scaleIn 0.5s ease'
              }}>🎉</div>
              <h1 style={{ fontSize: '36px', color: '#667eea', marginBottom: '30px' }}>Congratulations!</h1>
              <button style={btnStyle('primary')} onClick={handleReset} className="hover-glow">
                Start New Check
              </button>
            </div>
          )}

          {/* Step 0: Category Selection */}
          {!showCongrats && step === 0 && (
            <div style={{
              background: 'rgba(200, 249, 255, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' as const, marginBottom: '40px' }}>
                <h2 style={{ fontSize: '50px', color: '#ffffff', marginBottom: '8px' }}>
                  Select SYMPTOMS
                </h2>
                <p style={{ fontSize:'15px', color: '#ffffff' }}>
                  Select the category that best describes your condition
                </p>
              </div>
              
              {availableCategories.length === 0 ? (
                <div style={{ textAlign: 'center' as const, padding: '40px' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '20px' }}>All categories covered!</h3>
                  <button
                    onClick={handleNoMoreSymptoms}
                    disabled={symptomTabs.length === 0}
                    style={btnStyle('primary', symptomTabs.length === 0)}
                    className="hover-glow"
                  >
                    Continue →
                  </button>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}>
                  {availableCategories.map((cat) => (
                    <div
                      key={cat.category}
                      onClick={() => handleCategorySelect(cat)}
                      className="category-card"
                      style={{
                        background: '#fff',
                        padding: '30px 20px',
                        borderRadius: '16px',
                        border: '2px solid #f0f0f0',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div style={{ fontSize: '64px', lineHeight: '1' }}>{cat.icon}</div>
                      <h3 style={{ 
                        margin: 0, 
                        color: '#333', 
                        fontSize: '15px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                      }}>
                        {cat.category}
                      </h3>
                      <p style={{ 
                        margin: 0, 
                        color: '#999', 
                        fontSize: '13px',
                        fontWeight: '400',
                      }}>
                        {cat.symptoms.length} symptoms
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 1: Symptom Selection */}
          {!showCongrats && step === 1 && selectedCategory && (
            <div style={{
              background: 'rgba(200, 249, 255, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' as const, marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '8px' }}>
                  Select Your Symptoms
                </h2>
                <p style={{ color: '#ffffff', fontSize: '15px' }}>
                  Click on symptoms to add them as tabs (click again to remove)
                </p>
              </div>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
                {selectedCategory.symptoms.map((s) => {
                  const isAdded = symptomTabs.some((tab) => tab.symptom.id === s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleToggleSymptomTab(s)}
                      className="symptom-card"
                      style={{
                        padding: '24px 16px',
                        borderRadius: '16px',
                        border: '3px solid',
                        borderColor: isAdded ? '#667eea' : '#f0f0f0',
                        background: isAdded 
                          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                          : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '12px',
                        boxShadow: isAdded ? '0 8px 20px rgba(102, 126, 234, 0.2)' : '0 4px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                      }}
                    >
                      {isAdded && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}>
                          ✓
                        </div>
                      )}
                      <div style={{ fontSize: '48px', lineHeight: '1' }}>{s.icon}</div>
                      <h4 style={{ 
                        margin: 0, 
                        color: '#333', 
                        fontSize: '15px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                      }}>
                        {s.label}
                      </h4>
                      <p style={{ 
                        margin: 0, 
                        color: '#666', 
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                      }}>
                        {s.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '30px',
                gap: '12px'
              }}>
                <button
                  onClick={() => { setSelectedCategory(null); setStep(0); }}
                  style={btnStyle('outline')}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNextFromSymptoms}
                  style={btnStyle('primary')}
                  className="hover-glow"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: More Symptoms */}
          {!showCongrats && step === 2 && (
            <div style={{
              background: 'rgba(200, 249, 255, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center' as const
            }}>
              <div style={{ fontSize: '70px', marginBottom: '16px' }}>🤔</div>
              <h2 style={{ fontSize: '28px', color: '#667eea', marginBottom: '8px' }}>
                Do you have other symptoms?
              </h2>
              <p style={{ color: '#666', marginBottom: '30px' }}>
                You can add symptoms from multiple categories
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap' as const
              }}>
                <button
                  onClick={handleNoMoreSymptoms}
                  style={{ ...btnStyle('secondary'), minWidth: '160px' }}
                  className="hover-lift"
                >
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>👍</div>
                  <div>No, I&apos;m Done</div>
                </button>
                <button
                  onClick={() => setStep(0)}
                  disabled={availableCategories.length === 0}
                  style={{ ...btnStyle('primary', availableCategories.length === 0), minWidth: '160px' }}
                  className="hover-glow"
                >
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>➕</div>
                  <div>Yes, Add More</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Body Map */}
          {!showCongrats && step === 3 && (
            <div style={{
              background: 'rgba(200, 249, 255, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' as const, marginBottom: '20px' }}>
                <h2 style={{ fontSize: '28px', color: '#667eea', marginBottom: '8px' }}>
                  Where Does It Hurt?
                </h2>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  Tap on the body parts where you feel pain for: <strong>{activeTab?.symptom.label}</strong>
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '30px',
                minHeight: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ position: 'relative' as const, width: '300px', height: '500px' }}>
                  <svg width="300" height="500" viewBox="0 0 300 500">
                    <ellipse cx="150" cy="45" rx="40" ry="50" fill="#ffd8b8" stroke="#333" strokeWidth="2" />
                    <rect x="136" y="92" width="28" height="58" rx="10" fill="#ffd8b8" stroke="#333" strokeWidth="2" />
                    <rect x="125" y="155" width="50" height="100" rx="15" fill="#87ceeb" stroke="#333" strokeWidth="2" />
                    <rect x="120" y="260" width="60" height="130" rx="18" fill="#87ceeb" stroke="#333" strokeWidth="2" />
                    <rect x="70" y="162" width="25" height="110" rx="12" fill="#ffd8b8" stroke="#333" strokeWidth="2" />
                    <rect x="205" y="162" width="25" height="110" rx="12" fill="#ffd8b8" stroke="#333" strokeWidth="2" />
                    <rect x="110" y="400" width="30" height="85" rx="14" fill="#4682b4" stroke="#333" strokeWidth="2" />
                    <rect x="160" y="400" width="30" height="85" rx="14" fill="#4682b4" stroke="#333" strokeWidth="2" />
                  </svg>
                  {bodyParts.map((part) => {
                    const active = activeTab?.bodyParts.includes(part.id);
                    return (
                      <button
                        key={part.id}
                        onClick={() => handleBodyPartToggle(part.id)}
                        className="hover-glow"
                        style={{
                          position: 'absolute' as const,
                          top: part.top,
                          left: part.left,
                          transform: 'translate(-50%, -50%)',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontWeight: 'bold' as const,
                          backgroundColor: active ? '#ff4757' : 'rgba(255,255,255,0.95)',
                          color: active ? '#fff' : '#333',
                          border: `2px solid ${active ? '#dc2626' : '#333'}`,
                          borderRadius: '18px',
                          cursor: 'pointer',
                          boxShadow: active ? '0 4px 12px rgba(255,71,87,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {part.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '24px',
                gap: '12px'
              }}>
                <button
                  onClick={() => setStep(2)}
                  style={btnStyle('outline')}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  style={btnStyle('primary')}
                  className="hover-glow"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          {!showCongrats && step === 4 && (
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' as const, marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', color: '#667eea', marginBottom: '8px' }}>
                  Tell Us More
                </h2>
                <p style={{ color: '#666' }}>
                  Describe your symptoms for: <strong>{activeTab?.symptom.label}</strong> (optional)
                </p>
              </div>

              <textarea
                value={activeTab?.description || ''}
                onChange={(e) => handleUpdateActiveTab({ description: e.target.value })}
                placeholder="Example: The pain started this morning and gets worse when I move..."
                rows={7}
                maxLength={1000}
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '15px',
                  borderRadius: '12px',
                  border: '2px solid #f0f0f0',
                  fontFamily: 'inherit',
                  resize: 'vertical' as const,
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div style={{
                textAlign: 'right' as const,
                color: '#999',
                marginTop: '6px',
                fontSize: '13px'
              }}>
                {activeTab?.description.length || 0} / 1000 characters
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '24px',
                gap: '12px'
              }}>
                <button
                  onClick={() => setStep(symptomTabs.some(tab => tab.symptom.triggers_body_map) ? 3 : 2)}
                  style={btnStyle('outline')}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  style={btnStyle('primary')}
                  className="hover-glow"
                >
                  Review Summary →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {!showCongrats && step === 5 && (
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '28px',
                color: '#667eea',
                marginBottom: '24px',
                textAlign: 'center' as const
              }}>
                Review Your Submission
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '12px', fontSize: '18px' }}>
                  Your Symptoms ({symptomTabs.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                  {symptomTabs.map((tab) => (
                    <div
                      key={tab.id}
                      style={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        borderRadius: '12px',
                        border: '2px solid rgba(102, 126, 234, 0.2)',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <div style={{ fontSize: '32px', flexShrink: 0 }}>{tab.symptom.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontWeight: 'bold' as const,
                            color: '#333',
                            fontSize: '18px',
                            marginBottom: '4px'
                          }}>
                            {tab.symptom.label}
                          </div>
                          <div style={{ color: '#666', fontSize: '14px' }}>
                            {tab.symptom.description}
                          </div>
                        </div>
                      </div>

                      {tab.bodyParts.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <div style={{
                            fontSize: '13px',
                            color: '#667eea',
                            fontWeight: 'bold' as const,
                            marginBottom: '8px'
                          }}>
                            Pain Locations:
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                            {tab.bodyParts.map((part) => (
                              <span
                                key={part}
                                style={{
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  color: '#fff',
                                  padding: '6px 12px',
                                  borderRadius: '16px',
                                  fontSize: '12px',
                                  fontWeight: '500' as const,
                                }}
                              >
                                {part.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tab.description && (
                        <div style={{ marginTop: '12px' }}>
                          <div style={{
                            fontSize: '13px',
                            color: '#667eea',
                            fontWeight: 'bold' as const,
                            marginBottom: '8px'
                          }}>
                            Description:
                          </div>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            padding: '12px',
                            borderRadius: '8px',
                            color: '#555',
                            fontSize: '14px',
                            lineHeight: '1.5',
                          }}>
                            {tab.description}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '30px',
                gap: '12px'
              }}>
                <button
                  onClick={() => setStep(4)}
                  style={btnStyle('outline')}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleReset}
                    style={{
                      ...btnStyle('secondary'),
                      border: '2px solid #ff4757',
                      color: '#ff4757'
                    }}
                    className="hover-scale"
                  >
                    🔄 Start Over
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      ...btnStyle('primary'),
                      background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'
                    }}
                    className="hover-glow"
                  >
                    ✅ Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}