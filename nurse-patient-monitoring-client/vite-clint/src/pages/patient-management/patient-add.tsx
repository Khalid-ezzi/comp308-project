import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const GET_USERS_BY_ROLE_QUERY = gql`
  query GetUsersByRole($role: String!) {
    getUsersByRole(role: $role) {
      id
      firstName
      lastName
      email
    }
  }
`;

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatient($firstName: String!, $lastName: String!, $email: String!, $nurseId: String!) {
    createPatient(firstName: $firstName, lastName: $lastName, email: $email, nurseId: $nurseId) {
      id
      firstName
      lastName
      email
    }
  }
`;

const ASSIGN_PATIENT_MUTATION = gql`
  mutation AssignPatientToNurse($patientId: String!, $nurseId: String!) {
    assignPatientToNurse(patientId: $patientId, nurseId: $nurseId) {
      id
      firstName
      lastName
      nurseId
    }
  }
`;

const AddPatientPage = () => {
  const nurseId = localStorage.getItem('userId');
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patientData, setPatientData] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const { data: patientsData, loading: patientsLoading } = useQuery(GET_USERS_BY_ROLE_QUERY, {
    variables: { role: 'patient' },
  });

  const [createPatient, { loading: createPatientLoading, error: createPatientError }] = useMutation(CREATE_PATIENT_MUTATION);
  const [assignPatientToNurse, { loading: assignPatientLoading, error: assignPatientError }] = useMutation(ASSIGN_PATIENT_MUTATION);

  const handleCreatePatient = async () => {
    if (!patientData.firstName || !patientData.lastName || !patientData.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await createPatient({
        variables: {
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          email: patientData.email,
          nurseId,
        },
      });
      console.log('New patient created:', data.createPatient);
      navigate('/patients');
    } catch (err:any) {
      console.error('Failed to create patient:', err.message);
    }
  };

  const handleAssignPatient = async () => {
    if (!selectedPatientId) {
      alert("Please select a patient.");
      return;
    }

    try {
      await assignPatientToNurse({
        variables: {
          patientId: selectedPatientId,
          nurseId: nurseId,
        },
      });
      navigate('/patients');
    } catch (error:any) {
      console.error('Error assigning patient:', error.message);
    }
  };

  return (
    <Card className="container mx-auto mt-8 p-6 max-w-lg shadow-lg">
      <h1 className="text-lg font-semibold mb-4 text-center">
        Add or Select Patient
      </h1>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button variant={isNewPatient ? 'secondary' : 'default'} onClick={() => setIsNewPatient(false)}>
          Select Existing Patient
        </Button>
        <Button variant={isNewPatient ? 'default' : 'secondary'} onClick={() => setIsNewPatient(true)}>
          Create New Patient
        </Button>
      </div>

      {isNewPatient ? (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">Add New Patient</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">First Name</label>
            <Input
              type="text"
              value={patientData.firstName}
              onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <Input
              type="text"
              value={patientData.lastName}
              onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={patientData.email}
              onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
              required
            />
          </div>
          {createPatientError && <p className="text-red-500">Error: {createPatientError.message}</p>}
          <Button onClick={handleCreatePatient} disabled={createPatientLoading}>
            {createPatientLoading ? 'Creating...' : 'Create Patient'}
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">Select Existing Patient</h2>
          {patientsLoading ? (
            <p>Loading patients...</p>
          ) : (
            <div>
              <Select onValueChange={(value: any) => setSelectedPatientId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Patients</SelectLabel>
                    {patientsData?.getUsersByRole?.map((patient: any) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.firstName} {patient.lastName} - {patient.email}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {assignPatientError && <p className="text-red-500">Error: {assignPatientError.message}</p>}
              <Button onClick={handleAssignPatient} disabled={!selectedPatientId || assignPatientLoading} className="mt-4">
                {assignPatientLoading ? 'Assigning...' : 'Submit'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default AddPatientPage;
