import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

const GET_PATIENTS_QUERY = gql`
  query GetPatients($nurseId: String!) {
    getPatients(nurseId: $nurseId) {
      id
      firstName
      lastName
      email
      userId
    }
  }
`;

const PatientsDashboard = () => {
  const navigate = useNavigate();
  const nurseId = localStorage.getItem('userId');

  const { data, loading, error } = useQuery(GET_PATIENTS_QUERY, {
    variables: { nurseId: String(nurseId) },
    skip: !nurseId,
  });

  if (loading) return <LoadingIcon />;

  if (error) return <Alert variant="destructive">{(error as Error).message}</Alert>;

  // Safely access patients data
  const patients = data?.getPatients || [];

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>My Patients</CardTitle>
        </CardHeader>
        <div
          className="flex items-center space gap-4 "
        >
          <Button 
            onClick={() => navigate('/patients/add')}
            className="my-4 ml-auto w-fit mr-4 text-sm" 
            >
            Add New Patient
          </Button>
        </div>
        <CardContent>
          {patients.length === 0 ? (
            <p>No patients assigned to you.</p>
          ) : (
            <div className="space-y-4">
              {patients.map((patient: Patient) => (
                <div key={patient.id} className="p-4 border rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <p className="">{patient.email}</p>
                  <Button
                    variant="secondary"
                    className="mt-2"
                    onClick={() => navigate(`/patients/id/${patient.userId}`)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientsDashboard;
