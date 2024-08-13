import { gql } from '@apollo/client';

export const GET_PATIENTS_QUERY = gql`
  query GetPatients($nurseId: ID!) {
    getPatients(nurseId: $nurseId) {
      id
      firstName
      lastName
      email
    }
  }
`;