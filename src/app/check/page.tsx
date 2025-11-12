'use client';
import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Progress,
  Badge,
  Container,
  Textarea,
} from '@mantine/core';
import { BodyComponent } from '@darshanpatel2608/human-body-react';

interface Symptom {
  id: string;
  label: string;
  icon: string;
  description: string;
  triggers_body_map: boolean;
}

interface Category {
  category: string;
  icon: string;
  color: string;
  symptoms: Symptom[];
}

interface BodyPartParams {
  [key: string]: {
    selected?: boolean;
    show?: boolean;
  };
}

interface BodyClickEvent {
  part?: string;
  [key: string]: any;
}

const SymptomsData: Category[] = [
  {
    category: 'Fever & Infection',
    icon: '🤒',
    color: '#ff6b6b',
    symptoms: [
      {
        id: 'fever',
        label: 'Fever',
        icon: '🌡️',
        description:
          'Body temperature higher than normal, often with chills or sweating.',
        triggers_body_map: false,
      },
      {
        id: 'sore_throat',
        label: 'Sore Throat',
        icon: '🗣️',
        description: 'Pain or irritation in the throat, worse on swallowing.',
        triggers_body_map: false,
      },
      {
        id: 'cough',
        label: 'Cough',
        icon: '😷',
        description:
          'Dry or productive cough, lasting short-term or persistent.',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Pain',
    icon: '⚡',
    color: '#ff8787',
    symptoms: [
      {
        id: 'headache',
        label: 'Headache',
        icon: '🤕',
        description:
          'Pain anywhere in the head: front, back, sides, or behind eyes.',
        triggers_body_map: true,
      },
      {
        id: 'chest_pain',
        label: 'Chest Pain',
        icon: '💔',
        description:
          'Pressure, tightness, or pain in chest. Can be left, right, or center.',
        triggers_body_map: true,
      },
      {
        id: 'abdominal_pain',
        label: 'Stomach Pain',
        icon: '🤰',
        description: 'Pain in upper/lower abdomen, left or right.',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Breathing',
    icon: '💨',
    color: '#4dabf7',
    symptoms: [
      {
        id: 'shortness_of_breath',
        label: 'Hard to Breathe',
        icon: '😮‍💨',
        description: 'Difficulty breathing or breathing faster than usual.',
        triggers_body_map: false,
      },
      {
        id: 'wheezing',
        label: 'Wheezing',
        icon: '🌬️',
        description: 'High-pitched whistling sound when breathing.',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Stomach Issues',
    icon: '🤢',
    color: '#51cf66',
    symptoms: [
      {
        id: 'vomiting',
        label: 'Vomiting',
        icon: '🤮',
        description: 'Forceful expulsion of stomach contents.',
        triggers_body_map: false,
      },
      {
        id: 'diarrhea',
        label: 'Diarrhea',
        icon: '🚽',
        description: 'Loose or watery stool happening more often than normal.',
        triggers_body_map: false,
      },
      {
        id: 'constipation',
        label: 'Constipation',
        icon: '😣',
        description: 'Difficulty passing stool or fewer bowel movements.',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Bleeding',
    icon: '🩸',
    color: '#f03e3e',
    symptoms: [
      {
        id: 'nosebleed',
        label: 'Nosebleed',
        icon: '👃',
        description: 'Bleeding from inside the nose.',
        triggers_body_map: true,
      },
      {
        id: 'blood_in_stool',
        label: 'Blood in Stool',
        icon: '🧻',
        description: 'Visible red or black stool.',
        triggers_body_map: true,
      },
      {
        id: 'blood_in_urine',
        label: 'Blood in Urine',
        icon: '💧',
        description: 'Red or brown discoloration in urine.',
        triggers_body_map: true,
      },
    ],
  },
];

interface BodyMapProps {
  bodyParams: BodyPartParams;
  // @ts-ignore
  onBodyClick: (e: BodyClickEvent) => {};
}

const BodyMap: React.FC<BodyMapProps> = ({ bodyParams, onBodyClick }) => {
  return (
    <div
      style={{
        backgroundColor: '#1e3a8a',
        borderRadius: '12px',
        padding: '40px',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size="xl" fw={700} ta="center" mb="xl" c="white">
        Tap on the body where it hurts
      </Text>
      <div
        style={{
          transform: 'scale(1.2)',
          backgroundColor: '#1e3a8a',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <BodyComponent partsInput={bodyParams} onClick={onBodyClick} />
      </div>
      <Text size="lg" ta="center" mt="xl" c="white" style={{ opacity: 0.9 }}>
        Selected parts will be highlighted in color
      </Text>
    </div>
  );
};

export default function SeniorFriendlySymptoms() {
  const [step, setStep] = useState<number>(0); // 0: categories, 1: symptoms, 2: more symptoms?, 3: body map, 4: description, 5: summary
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [bodyParams, setBodyParams] = useState<BodyPartParams>({});
  const [description, setDescription] = useState<string>('');
  const [processedCategories, setProcessedCategories] = useState<string[]>([]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep(1);
  };

  const handleSymptomToggle = (symptom: Symptom) => {
    const isSelected = selectedSymptoms.find((s) => s.id === symptom.id);
    if (isSelected) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleBodyPartClick = (e: BodyClickEvent) => {
    const part = e?.part;
    if (!part) return;

    setBodyParams((prev) => ({
      ...prev,
      [part]: {
        selected: !prev[part]?.selected,
      },
    }));
  };

  const handleNextFromSymptoms = () => {
    if (selectedCategory) {
      setProcessedCategories([
        ...processedCategories,
        selectedCategory.category,
      ]);
    }
    setSelectedCategory(null);
    setStep(2); // Go to "more symptoms?" screen
  };

  const handleAddMoreSymptoms = () => {
    setStep(0); // Go back to category selection
  };

  const handleNoMoreSymptoms = () => {
    // Check if any selected symptom triggers body map
    const needsBodyMap = selectedSymptoms.some((s) => s.triggers_body_map);
    if (needsBodyMap) {
      setStep(3); // Go to body map
    } else {
      setStep(4); // Skip to description
    }
  };

  const handleNextFromBodyMap = () => {
    setStep(4); // Go to description
  };

  const handleNextFromDescription = () => {
    setStep(5); // Go to summary
  };

  const handleBack = () => {
    if (step === 1) {
      setSelectedCategory(null);
      setStep(0);
    } else if (step === 2) {
      // Go back to last category
      if (selectedCategory) {
        setStep(1);
      } else {
        setStep(0);
      }
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      const needsBodyMap = selectedSymptoms.some((s) => s.triggers_body_map);
      if (needsBodyMap) {
        setStep(3);
      } else {
        setStep(2);
      }
    } else if (step === 5) {
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedCategory(null);
    setSelectedSymptoms([]);
    setBodyParams({});
    setDescription('');
    setProcessedCategories([]);
  };

  const getAvailableCategories = () => {
    return SymptomsData.filter(
      (cat) => !processedCategories.includes(cat.category)
    );
  };

  const progressSteps = 6;
  const progressValue = ((step + 1) / progressSteps) * 100;

  return (
    <Container
      size="lg"
      p="xl"
      style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
    >
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title
            order={1}
            size="h1"
            ta="center"
            mb="xs"
            style={{ fontSize: '2.5rem' }}
          >
            Tell Us How You Feel
          </Title>
          <Text size="xl" ta="center" c="dimmed" mb="md">
            {step === 0 && 'Step 1: Choose a symptom category'}
            {step === 1 && 'Step 2: Select your symptoms'}
            {step === 2 && 'Step 3: Do you have other symptoms?'}
            {step === 3 && 'Step 4: Show where it hurts'}
            {step === 4 && 'Step 5: Describe in your own words'}
            {step === 5 && 'Review and submit'}
          </Text>
          <Progress value={progressValue} size="xl" radius="xl" />

          {selectedSymptoms.length > 0 && (
            <Card mt="md" p="md" style={{ backgroundColor: '#e7f5ff' }}>
              <Text size="lg" fw={600} mb="xs">
                Selected Symptoms: {selectedSymptoms.length}
              </Text>
              <Group gap="xs">
                {selectedSymptoms.slice(0, 5).map((s) => (
                  <Badge key={s.id} size="lg" variant="filled">
                    {s.icon} {s.label}
                  </Badge>
                ))}
                {selectedSymptoms.length > 5 && (
                  <Badge size="lg" variant="filled">
                    +{selectedSymptoms.length - 5} more
                  </Badge>
                )}
              </Group>
            </Card>
          )}
        </div>

        {/* Step 0: Category Selection */}
        {step === 0 && (
          <Stack gap="lg">
            {getAvailableCategories().length === 0 ? (
              <Card
                shadow="md"
                padding="xl"
                radius="lg"
                style={{ textAlign: 'center' }}
              >
                <Title order={2} mb="md">
                  All categories covered!
                </Title>
                <Text size="xl" c="dimmed" mb="xl">
                  You&apos;ve selected symptoms from all categories.
                  {selectedSymptoms.length === 0
                    ? ' Please go back and select some symptoms.'
                    : ' Ready to continue?'}
                </Text>
                <Button
                  size="xl"
                  onClick={handleNoMoreSymptoms}
                  disabled={selectedSymptoms.length === 0}
                  style={{ fontSize: '1.3rem', padding: '20px 40px' }}
                >
                  Continue →
                </Button>
              </Card>
            ) : (
              getAvailableCategories().map((category) => (
                <Card
                  key={category.category}
                  shadow="md"
                  padding="xl"
                  radius="lg"
                  style={{
                    cursor: 'pointer',
                    border: '3px solid #dee2e6',
                    backgroundColor: '#fff',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => handleCategorySelect(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.borderColor = category.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = '#dee2e6';
                  }}
                >
                  <Group gap="xl">
                    <div style={{ fontSize: '80px' }}>{category.icon}</div>
                    <div style={{ flex: 1 }}>
                      <Title order={2} size="h2" style={{ fontSize: '2rem' }}>
                        {category.category}
                      </Title>
                      <Text size="lg" c="dimmed" mt="xs">
                        {category.symptoms.length} symptoms
                      </Text>
                    </div>
                    <Text size="4xl" fw={700} c="dimmed">
                      ›
                    </Text>
                  </Group>
                </Card>
              ))
            )}
          </Stack>
        )}

        {/* Step 1: Symptom Selection */}
        {step === 1 && selectedCategory && (
          <Stack gap="lg">
            <Card shadow="sm" p="lg" style={{ backgroundColor: '#fff3cd' }}>
              <Text size="xl" fw={600} ta="center">
                🤔 Tap all symptoms that apply to you
              </Text>
            </Card>

            {selectedCategory.symptoms.map((symptom) => {
              const isSelected = selectedSymptoms.find(
                (s) => s.id === symptom.id
              );
              return (
                <Card
                  key={symptom.id}
                  shadow="md"
                  padding="xl"
                  radius="lg"
                  style={{
                    cursor: 'pointer',
                    border: `3px solid ${
                      isSelected ? selectedCategory.color : '#dee2e6'
                    }`,
                    backgroundColor: isSelected ? '#e7f5ff' : '#fff',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => handleSymptomToggle(symptom)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Group gap="xl" align="flex-start">
                    <div style={{ fontSize: '70px' }}>{symptom.icon}</div>
                    <div style={{ flex: 1 }}>
                      <Group gap="md" mb="xs">
                        <Title order={2} size="h2" style={{ fontSize: '2rem' }}>
                          {symptom.label}
                        </Title>
                        {isSelected && (
                          <Badge size="xl" color="blue" variant="filled">
                            Selected ✓
                          </Badge>
                        )}
                      </Group>
                      <Text size="lg" c="dimmed">
                        {symptom.description}
                      </Text>
                    </div>
                  </Group>
                </Card>
              );
            })}

            <Group justify="space-between" mt="xl">
              <Button
                size="xl"
                variant="outline"
                onClick={handleBack}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                ← Back
              </Button>
              <Button
                size="xl"
                onClick={handleNextFromSymptoms}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                Continue →
              </Button>
            </Group>
          </Stack>
        )}

        {/* Step 2: More Symptoms? */}
        {step === 2 && (
          <Stack gap="lg">
            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '100px', marginBottom: '20px' }}>🤔</div>
              <Title order={1} size="h1" mb="xl" style={{ fontSize: '2.5rem' }}>
                Do you have other symptoms?
              </Title>
              <Text size="xl" c="dimmed" mb="xl">
                You can select symptoms from multiple categories
              </Text>

              <Group justify="center" gap="xl" mt="xl">
                <Button
                  size="xl"
                  variant="outline"
                  onClick={handleNoMoreSymptoms}
                  style={{
                    fontSize: '1.5rem',
                    padding: '30px 50px',
                    height: 'auto',
                    minWidth: '250px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                      👍
                    </div>
                    <div>No, I&apos;m Done</div>
                  </div>
                </Button>

                <Button
                  size="xl"
                  onClick={handleAddMoreSymptoms}
                  disabled={getAvailableCategories().length === 0}
                  style={{
                    fontSize: '1.5rem',
                    padding: '30px 50px',
                    height: 'auto',
                    minWidth: '250px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                      ➕
                    </div>
                    <div>Yes, Add More</div>
                  </div>
                </Button>
              </Group>

              {getAvailableCategories().length === 0 && (
                <Text size="lg" c="orange" mt="xl" fw={600}>
                  ℹ️ You&apos;ve selected from all available categories
                </Text>
              )}
            </Card>

            <Group justify="center" mt="md">
              <Button
                size="xl"
                variant="subtle"
                onClick={handleBack}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                ← Back
              </Button>
            </Group>
          </Stack>
        )}

        {/* Step 3: Body Map */}
        {step === 3 && (
          <Stack gap="lg">
            <Card shadow="sm" p="lg" style={{ backgroundColor: '#d1f2eb' }}>
              <Text size="xl" fw={600} ta="center">
                👆 Tap on body parts where you feel pain
              </Text>
            </Card>

            <BodyMap
              bodyParams={bodyParams}
              onBodyClick={(e) => handleBodyPartClick}
            />

            <Group justify="space-between" mt="xl">
              <Button
                size="xl"
                variant="outline"
                onClick={handleBack}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                ← Back
              </Button>
              <Button
                size="xl"
                onClick={handleNextFromBodyMap}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                Continue →
              </Button>
            </Group>
          </Stack>
        )}

        {/* Step 4: Description */}
        {step === 4 && (
          <Stack gap="lg">
            <Card shadow="sm" p="lg" style={{ backgroundColor: '#fff3cd' }}>
              <Text size="xl" fw={600} ta="center">
                ✍️ Tell us more in your own words (optional)
              </Text>
            </Card>

            <Card shadow="md" padding="xl" radius="lg">
              <Title order={3} mb="lg" style={{ fontSize: '1.8rem' }}>
                How are you feeling? Describe your symptoms:
              </Title>

              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: I have a headache that started this morning. It feels like pressure on both sides of my head. I also feel a bit dizzy when I stand up..."
                minRows={8}
                styles={{
                  input: {
                    fontSize: '1.3rem',
                    padding: '20px',
                    lineHeight: '1.8',
                  },
                }}
                maxLength={1000}
              />

              <Text size="lg" c="dimmed" mt="md" ta="right">
                {description.length} / 1000 characters
              </Text>

              <Card mt="lg" p="md" style={{ backgroundColor: '#e7f5ff' }}>
                <Text size="lg" fw={600} mb="sm">
                  💡 Tips for describing your symptoms:
                </Text>
                <Stack gap="xs">
                  <Text size="md">• When did it start?</Text>
                  <Text size="md">
                    • How severe is it? (mild, moderate, severe)
                  </Text>
                  <Text size="md">• Is it getting better or worse?</Text>
                  <Text size="md">• What makes it better or worse?</Text>
                </Stack>
              </Card>
            </Card>

            <Group justify="space-between" mt="xl">
              <Button
                size="xl"
                variant="outline"
                onClick={handleBack}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                ← Back
              </Button>
              <Button
                size="xl"
                onClick={handleNextFromDescription}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                Review Summary →
              </Button>
            </Group>
          </Stack>
        )}

        {/* Step 5: Summary */}
        {step === 5 && (
          <Stack gap="lg">
            <Card shadow="md" padding="xl" radius="lg">
              <Title order={2} size="h2" mb="xl" style={{ fontSize: '2.2rem' }}>
                📋 Summary of Your Symptoms
              </Title>

              <div style={{ marginBottom: '30px' }}>
                <Title
                  order={3}
                  size="h3"
                  mb="md"
                  style={{ fontSize: '1.8rem' }}
                >
                  Selected Symptoms ({selectedSymptoms.length})
                </Title>
                <Stack gap="md">
                  {selectedSymptoms.map((symptom) => (
                    <Group
                      key={symptom.id}
                      gap="lg"
                      style={{ padding: '10px' }}
                    >
                      <Text size="3xl">{symptom.icon}</Text>
                      <div>
                        <Text size="xl" fw={600}>
                          {symptom.label}
                        </Text>
                        <Text size="md" c="dimmed">
                          {symptom.description}
                        </Text>
                      </div>
                    </Group>
                  ))}
                </Stack>
              </div>

              {Object.keys(bodyParams).filter((k) => bodyParams[k]?.selected)
                .length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <Title
                    order={3}
                    size="h3"
                    mb="md"
                    style={{ fontSize: '1.8rem' }}
                  >
                    📍 Pain Locations
                  </Title>
                  <Group gap="md">
                    {Object.keys(bodyParams)
                      .filter((k) => bodyParams[k]?.selected)
                      .map((part) => (
                        <Badge
                          key={part}
                          size="xl"
                          variant="filled"
                          color="blue"
                          style={{ fontSize: '1.1rem', padding: '12px 20px' }}
                        >
                          {part.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                      ))}
                  </Group>
                </div>
              )}

              {description && (
                <div>
                  <Title
                    order={3}
                    size="h3"
                    mb="md"
                    style={{ fontSize: '1.8rem' }}
                  >
                    💬 Your Description
                  </Title>
                  <Card p="lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <Text
                      size="lg"
                      style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
                    >
                      {description}
                    </Text>
                  </Card>
                </div>
              )}
            </Card>

            <Group justify="space-between" mt="xl">
              <Button
                size="xl"
                variant="outline"
                onClick={handleBack}
                style={{ fontSize: '1.3rem', padding: '20px 40px' }}
              >
                ← Back
              </Button>
              <Group gap="md">
                <Button
                  size="xl"
                  variant="outline"
                  color="red"
                  onClick={handleReset}
                  style={{ fontSize: '1.3rem', padding: '20px 40px' }}
                >
                  🔄 Start Over
                </Button>
                <Button
                  size="xl"
                  color="green"
                  onClick={() =>
                    alert(
                      'Symptoms submitted successfully! Your doctor will review this information.'
                    )
                  }
                  style={{ fontSize: '1.3rem', padding: '20px 40px' }}
                >
                  ✅ Submit to Doctor
                </Button>
              </Group>
            </Group>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
