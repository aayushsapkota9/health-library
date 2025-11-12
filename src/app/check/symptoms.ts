export interface Symptom {
  id: string;
  label: string;
  icon: string;
  description: string;
  triggers_body_map: boolean;
}

export interface Category {
  category: string;
  icon: string;
  symptoms: Symptom[];
}

export const SymptomsData: Category[] = [
  {
    category: 'Fever & Infection',
    icon: '🌡️',
    symptoms: [
      {
        id: 'fever',
        label: 'Fever',
        icon: '🌡️',
        description: 'Elevated body temperature above normal range',
        triggers_body_map: false,
      },
      {
        id: 'sore_throat',
        label: 'Sore Throat',
        icon: '🗣️',
        description: 'Pain or irritation in the throat',
        triggers_body_map: true,
      },
      {
        id: 'cough',
        label: 'Cough',
        icon: '😷',
        description: 'Sudden, forceful expulsion of air from the lungs',
        triggers_body_map: false,
      },
      {
        id: 'runny_nose',
        label: 'Runny Nose',
        icon: '🤧',
        description: 'Excess nasal discharge or drainage',
        triggers_body_map: false,
      },
      {
        id: 'body_ache',
        label: 'Body Ache',
        icon: '🤒',
        description: 'General pain or discomfort throughout the body',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Pain',
    icon: '🤕',
    symptoms: [
      {
        id: 'headache',
        label: 'Headache',
        icon: '🤕',
        description: 'Pain or discomfort in the head or scalp',
        triggers_body_map: true,
      },
      {
        id: 'chest_pain',
        label: 'Chest Pain',
        icon: '💔',
        description: 'Pain or discomfort in the chest area',
        triggers_body_map: true,
      },
      {
        id: 'abdominal_pain',
        label: 'Abdominal Pain',
        icon: '🤰',
        description: 'Pain or cramping in the stomach area',
        triggers_body_map: true,
      },
      {
        id: 'back_pain',
        label: 'Back Pain',
        icon: '🦴',
        description: 'Pain in the upper, middle, or lower back',
        triggers_body_map: true,
      },
      {
        id: 'muscle_joint_pain',
        label: 'Muscle/Joint Pain',
        icon: '💪',
        description: 'Pain in muscles or joints',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Bleeding',
    icon: '🩸',
    symptoms: [
      {
        id: 'nosebleed',
        label: 'Nosebleed',
        icon: '👃',
        description: 'Bleeding from the nose',
        triggers_body_map: false,
      },
      {
        id: 'blood_in_stool',
        label: 'Blood in Stool',
        icon: '🧻',
        description: 'Presence of blood in bowel movements',
        triggers_body_map: false,
      },
      {
        id: 'blood_in_urine',
        label: 'Blood in Urine',
        icon: '💧',
        description: 'Presence of blood in urine',
        triggers_body_map: false,
      },
      {
        id: 'gum_bleeding',
        label: 'Gum Bleeding',
        icon: '😬',
        description: 'Bleeding from gums',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Respiratory',
    icon: '🫁',
    symptoms: [
      {
        id: 'shortness_of_breath',
        label: 'Shortness of Breath',
        icon: '😮‍💨',
        description: 'Difficulty breathing or feeling breathless',
        triggers_body_map: true,
      },
      {
        id: 'wheezing',
        label: 'Wheezing',
        icon: '🌬️',
        description: 'Whistling sound when breathing',
        triggers_body_map: false,
      },
      {
        id: 'sneezing',
        label: 'Sneezing',
        icon: '🤧',
        description: 'Sudden, involuntary expulsion of air through nose',
        triggers_body_map: false,
      },
      {
        id: 'cough_with_phlegm',
        label: 'Cough with Phlegm',
        icon: '😤',
        description: 'Cough producing mucus or phlegm',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Gastrointestinal',
    icon: '🤢',
    symptoms: [
      {
        id: 'vomiting',
        label: 'Vomiting',
        icon: '🤮',
        description: 'Forceful expulsion of stomach contents',
        triggers_body_map: false,
      },
      {
        id: 'diarrhea',
        label: 'Diarrhea',
        icon: '🚽',
        description: 'Loose or watery bowel movements',
        triggers_body_map: false,
      },
      {
        id: 'constipation',
        label: 'Constipation',
        icon: '😣',
        description: 'Difficulty passing bowel movements',
        triggers_body_map: false,
      },
      {
        id: 'stomach_cramps',
        label: 'Stomach Cramps',
        icon: '🤢',
        description: 'Painful contractions in the stomach',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Skin & Minor Injuries',
    icon: '🩹',
    symptoms: [
      {
        id: 'rash',
        label: 'Rash',
        icon: '🌿',
        description: 'Red, irritated skin or outbreak',
        triggers_body_map: true,
      },
      {
        id: 'cuts_wounds',
        label: 'Cuts / Wounds',
        icon: '✂️',
        description: 'Break or tear in the skin',
        triggers_body_map: true,
      },
      {
        id: 'bruises',
        label: 'Bruises',
        icon: '🤕',
        description: 'Discoloration from injury or impact',
        triggers_body_map: true,
      },
      {
        id: 'swelling_sprain',
        label: 'Swelling / Sprain',
        icon: '🦵',
        description: 'Enlarged area due to fluid buildup or injury',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'ENT (Ear, Nose, Throat)',
    icon: '👂',
    symptoms: [
      {
        id: 'ear_pain',
        label: 'Ear Pain',
        icon: '👂',
        description: 'Pain or discomfort in the ear',
        triggers_body_map: false,
      },
      {
        id: 'ear_discharge',
        label: 'Ear Discharge',
        icon: '🦻',
        description: 'Fluid draining from the ear',
        triggers_body_map: false,
      },
      {
        id: 'hoarseness',
        label: 'Hoarseness / Voice Changes',
        icon: '🗣️',
        description: 'Changes in voice quality or difficulty speaking',
        triggers_body_map: false,
      },
      {
        id: 'blocked_nose',
        label: 'Blocked Nose',
        icon: '🤧',
        description: 'Nasal congestion or stuffiness',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'General / Systemic',
    icon: '😴',
    symptoms: [
      {
        id: 'fatigue',
        label: 'Fatigue',
        icon: '😴',
        description: 'Extreme tiredness or lack of energy',
        triggers_body_map: false,
      },
      {
        id: 'weakness',
        label: 'Weakness',
        icon: '🫀',
        description: 'Lack of physical strength or energy',
        triggers_body_map: true,
      },
      {
        id: 'dizziness',
        label: 'Dizziness',
        icon: '😵',
        description: 'Feeling lightheaded or unsteady',
        triggers_body_map: false,
      },
      {
        id: 'loss_of_appetite',
        label: 'Loss of Appetite',
        icon: '🍽️',
        description: 'Reduced desire to eat',
        triggers_body_map: false,
      },
    ],
  },
];
