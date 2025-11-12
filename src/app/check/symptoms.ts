export const SymptomsData = [
  {
    category: 'Fever & Infection',
    symptoms: [
      {
        id: 'fever',
        label: 'Fever',
        description:
          'Body temperature higher than normal, often with chills or sweating.',
        image: '/images/symptoms/fever.png',
        triggers_body_map: false,
      },
      {
        id: 'sore_throat',
        label: 'Sore Throat',
        description: 'Pain or irritation in the throat, worse on swallowing.',
        image: '/images/symptoms/sore_throat.png',
        triggers_body_map: false,
      },
      {
        id: 'cough',
        label: 'Cough',
        description:
          'Dry or productive cough, lasting short-term or persistent.',
        image: '/images/symptoms/cough.png',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Pain',
    symptoms: [
      {
        id: 'headache',
        label: 'Headache',
        description:
          'Pain anywhere in the head: front, back, sides, or behind eyes.',
        image: '/images/symptoms/headache.png',
        triggers_body_map: true,
      },
      {
        id: 'chest_pain',
        label: 'Chest Pain',
        description:
          'Pressure, tightness, or pain in chest. Can be left, right, or center.',
        image: '/images/symptoms/chest_pain.png',
        triggers_body_map: true,
      },
      {
        id: 'abdominal_pain',
        label: 'Abdominal Pain',
        description: 'Pain in upper/lower abdomen, left or right.',
        image: '/images/symptoms/abdominal_pain.png',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Bleeding',
    symptoms: [
      {
        id: 'nosebleed',
        label: 'Nosebleed',
        description: 'Bleeding from inside the nose.',
        image: '/images/symptoms/nosebleed.png',
        triggers_body_map: true,
      },
      {
        id: 'blood_in_stool',
        label: 'Blood in Stool',
        description: 'Visible red or black stool.',
        image: '/images/symptoms/blood_in_stool.png',
        triggers_body_map: true,
      },
      {
        id: 'blood_in_urine',
        label: 'Blood in Urine',
        description: 'Red or brown discoloration in urine.',
        image: '/images/symptoms/blood_in_urine.png',
        triggers_body_map: true,
      },
    ],
  },
  {
    category: 'Respiratory',
    symptoms: [
      {
        id: 'shortness_of_breath',
        label: 'Shortness of Breath',
        description: 'Difficulty breathing or breathing faster than usual.',
        image: '/images/symptoms/shortness_of_breath.png',
        triggers_body_map: false,
      },
      {
        id: 'wheezing',
        label: 'Wheezing',
        description: 'High-pitched whistling sound when breathing.',
        image: '/images/symptoms/wheezing.png',
        triggers_body_map: false,
      },
    ],
  },
  {
    category: 'Gastrointestinal',
    symptoms: [
      {
        id: 'vomiting',
        label: 'Vomiting',
        description: 'Forceful expulsion of stomach contents.',
        image: '/images/symptoms/vomiting.png',
        triggers_body_map: false,
      },
      {
        id: 'diarrhea',
        label: 'Diarrhea',
        description: 'Loose or watery stool happening more often than normal.',
        image: '/images/symptoms/diarrhea.png',
        triggers_body_map: false,
      },
      {
        id: 'constipation',
        label: 'Constipation',
        description: 'Difficulty passing stool or fewer bowel movements.',
        image: '/images/symptoms/constipation.png',
        triggers_body_map: false,
      },
    ],
  },
];
