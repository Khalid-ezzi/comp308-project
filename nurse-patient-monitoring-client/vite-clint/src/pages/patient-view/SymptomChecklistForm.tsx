// /frontend/pages/SymptomsAndConditions.js

import React, { useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';


const GENERATE_CONDITIONS_QUERY = gql`
  query GenerateConditions($symptoms: [String!]!) {
    generateConditions(symptoms: $symptoms) {
      name
      matchCount
    }
  }
`;

const SUBMIT_SYMPTOMS_MUTATION = gql`
  mutation SubmitSymptoms($userId: String!, $symptoms: [String!]!) {
    submitSymptoms(userId: $userId, symptoms: $symptoms) {
      id
      symptoms
      createdAt
    }
  }
`;

const symptomsList = [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Fatigue",
  "Muscle or body aches",
  "Headache",
  "Loss of taste or smell",
  "Sore throat",
  "Congestion or runny nose",
  "Nausea or vomiting",
  "Diarrhea"
  // Add more symptoms as needed
];

const SymptomsAndConditionsPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [resultMessage, setResultMessage] = useState('');
  const [conditionsData, setConditionsData] = useState<{ name: string; matchCount: number }[]>([]);
  
  const [generateConditions] = useLazyQuery(GENERATE_CONDITIONS_QUERY, {
    onCompleted: (data) => {
      setConditionsData(data.generateConditions);
    },
    onError: (error) => {
      console.error('Error generating conditions:', error);
      setResultMessage('Failed to generate conditions.');
    }
  });

  const [submitSymptoms] = useMutation(SUBMIT_SYMPTOMS_MUTATION, {
    onError: (error) => {
      console.error('Error submitting symptoms:', error);
      setResultMessage('Failed to submit symptoms.');
    }
  });

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Ensure the userId is stored in localStorage or retrieved appropriately

    if (!userId) {
      setResultMessage('User not logged in.');
      return;
    }

    if (selectedSymptoms.length === 0) {
      setResultMessage('Please select at least one symptom.');
      return;
    }

    try {
      // Submit symptoms
      await submitSymptoms({
        variables: { userId, symptoms: selectedSymptoms }
      });
      setResultMessage('Symptoms submitted successfully.');
      
      // Generate conditions
      generateConditions({ variables: { symptoms: selectedSymptoms } });
    } catch (error) {
      // Errors are handled in the onError callbacks
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Select Symptoms and View Possible Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Select the symptoms you are experiencing:</Label>
            <div className="space-y-2 mt-2">
              {symptomsList.map((symptom, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomChange(symptom)}
                  />
                  <Label className="ml-2">{symptom}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">Submit and Generate Conditions</Button>
          {resultMessage && (
            <div className={`mt-4 ${resultMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {resultMessage}
            </div>
          )}

          {conditionsData.length > 0 && (
            <Table className="mt-6">
            <TableHeader>
                <TableRow>
                <TableHead>Possible Condition</TableHead>
                <TableHead>Matching Symptoms</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {conditionsData.map((condition, index) => (
                <TableRow key={index}>
                    <TableCell>{condition.name}</TableCell>
                    <TableCell>{condition.matchCount}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
          )}

          {conditionsData.length === 0 && resultMessage === 'Symptoms submitted successfully.' && (
            <div className="mt-4 text-red-600">No conditions found for the selected symptoms.</div>
          )}
        </CardContent>
        <CardFooter>
          {/* Add more options or information if needed */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SymptomsAndConditionsPage;
