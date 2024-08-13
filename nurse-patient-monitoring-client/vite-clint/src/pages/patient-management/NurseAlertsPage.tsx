import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';

const GET_ALL_ALERTS = gql`
  query GetAllAlerts {
    getAllAlerts {
      id
      userName
      userEmail
      message
      createdAt
    }
  }
`;

const NurseAlertsPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_ALERTS);

  if (loading) return <LoadingIcon />;
  if (error) return <Alert variant="destructive">{error.message}</Alert>;

  function formatDate(isoDate: any) {
    const date = new Date(parseInt(isoDate));
    const formattedDateTime = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return formattedDateTime;
}

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Emergency Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.getAllAlerts.length === 0 ? (
            <p>No alerts available.</p>
          ) : (
            data.getAllAlerts.map((alert:any) => (
              <div key={alert.id} className="p-4 border rounded-lg shadow-sm mb-4">
                <h3 className="text-lg font-semibold">{alert.userName}</h3>
                <p className="text-sm">{alert.userEmail}</p>
                <p>{alert.message}</p>
                <small className="">{formatDate(alert.createdAt)}</small>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NurseAlertsPage;
