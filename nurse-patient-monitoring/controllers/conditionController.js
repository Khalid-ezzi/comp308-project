const conditionsData = {
  "Fever": ["Flu", "COVID-19", "Common Cold", "Malaria", "Dengue Fever", "Pneumonia", "Typhoid Fever"],
  "Cough": ["Bronchitis", "Asthma", "COVID-19", "Common Cold", "Tuberculosis", "Pneumonia", "Whooping Cough"],
  "Shortness of breath": ["Asthma", "Pneumonia", "COVID-19", "COPD", "Heart Failure", "Anemia", "Pulmonary Embolism"],
  "Fatigue": ["Anemia", "Hypothyroidism", "Diabetes", "COVID-19", "Depression", "Chronic Fatigue Syndrome", "Sleep Apnea"],
  "Muscle or body aches": ["Flu", "COVID-19", "Fibromyalgia", "Lyme Disease", "Rheumatoid Arthritis", "Polymyalgia Rheumatica"],
  "Headache": ["Migraine", "Tension Headache", "Cluster Headache", "Flu", "COVID-19", "Meningitis", "Sinusitis"],
  "Loss of taste or smell": ["COVID-19", "Common Cold", "Sinus Infection", "Head Injury", "Nasal Polyps"],
  "Sore throat": ["Strep Throat", "Common Cold", "Flu", "Mononucleosis", "COVID-19", "Tonsillitis"],
  "Congestion or runny nose": ["Common Cold", "Allergic Rhinitis", "Sinus Infection", "COVID-19", "Nasal Polyps"],
  "Nausea or vomiting": ["Gastroenteritis", "Food Poisoning", "Pregnancy", "Migraine", "Appendicitis", "Vertigo"],
  "Diarrhea": ["Gastroenteritis", "Food Poisoning", "IBS", "Crohn's Disease", "Ulcerative Colitis", "Lactose Intolerance"]
};


exports.generateConditions = ({ symptoms }) => {
  const conditionFrequencyMap = {};

  symptoms.forEach(symptom => {
    const associatedConditions = conditionsData[symptom];
    if (associatedConditions) {
      associatedConditions.forEach(condition => {
        if (conditionFrequencyMap[condition]) {
          conditionFrequencyMap[condition]++;
        } else {
          conditionFrequencyMap[condition] = 1;
        }
      });
    }
  });

  // Convert the frequency map to an array of condition objects
  const conditionsArray = Object.keys(conditionFrequencyMap).map(condition => ({
    name: condition,
    matchCount: conditionFrequencyMap[condition]
  }));

  // Sort conditions by match count in descending order
  conditionsArray.sort((a, b) => b.matchCount - a.matchCount);

  return conditionsArray;
};
