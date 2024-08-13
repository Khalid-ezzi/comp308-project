import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { gql } from '@apollo/client';

export const GET_TIPS_AND_VITAL_SIGNS_QUERY = gql`
  query GetTipsAndVitalSigns($userId: String!) {
    getTips(userId: $userId) {
      id
      message
      createdAt
    }
    getVitalSigns(userId: $userId) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;

const PatientDashboard = () => {
  const userId = localStorage.getItem('userId');

  const { data, loading, error } = useQuery(GET_TIPS_AND_VITAL_SIGNS_QUERY, {
    variables: { userId },
  });

  if (loading) return <LoadingIcon />;
  if (error) return <Alert variant="destructive">{error.message}</Alert>;

  const { getTips, getVitalSigns } = data;

  function formatDate(isoDate: any) {
    const date = new Date(parseInt(isoDate));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Tips and Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Tips</h2>
          {getTips.length === 0 ? (
            <p>No tips available.</p>
          ) : (
            <ul className="space-y-4">
              {getTips.map((tip: any) => (
                <li key={tip.id} className="p-4 border rounded-lg shadow-sm">
                  <p>{tip.message}</p>
                  <small className="">
                    {formatDate(tip.createdAt)}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-lg font-semibold mt-8 mb-4">Vital Signs</h2>
          {getVitalSigns.length === 0 ? (
            <p>No vital signs recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temperature (°C)</TableHead>
                  <TableHead>Heart Rate (bpm)</TableHead>
                  <TableHead>Blood Pressure (mmHg)</TableHead>
                  <TableHead>Respiratory Rate (breaths/min)</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getVitalSigns.map((vitalSign: any) => (
                  <TableRow key={vitalSign.id}>
                    <TableCell>{vitalSign.temperature}</TableCell>
                    <TableCell>{vitalSign.heartRate}</TableCell>
                    <TableCell>{vitalSign.bloodPressure}</TableCell>
                    <TableCell>{vitalSign.respiratoryRate}</TableCell>
                    <TableCell>{formatDate(vitalSign.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
