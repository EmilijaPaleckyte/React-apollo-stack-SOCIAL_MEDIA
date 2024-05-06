import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
query {
    getAllUsers {
        id,
        username,
        age
    }
}
`

export const GET_ONE_USER = gql`
query getUser($id: ID){
    getUser(id: $id) {
        id,
        username
    }
}
`
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
    }
  }
`;