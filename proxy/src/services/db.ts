import gql from "graphql-tag";
import client from "../apolloClient";

export async function createClient(
  name: string
): Promise<{ id: string; name: string }> {
  const createClientResult = await client.mutate({
    variables: { name },
    mutation: gql`
      mutation InsertClient($name: String!) {
        insert_clients(objects: { name: $name }) {
          returning {
            id
            name
          }
        }
      }
    `,
  });

  return createClientResult.data.insert_clients.returning[0];
}

export async function createUser(
  userId: string,
  clientId: string
): Promise<boolean> {
  const createUserResult = await client.mutate({
    variables: {
      userId,
      clientId,
    },
    mutation: gql`
      mutation InsertUser($userId: String!, $clientId: uuid!) {
        insert_users(objects: { id: $userId, client_id: $clientId }) {
          affected_rows
        }
      }
    `,
  });

  return Boolean(createUserResult.data.insert_users.affected_rows);
}

export async function getUserClientData(
  userId: string
): Promise<{ id: string; name: string }> {
  const getUserClientResult = await client.query({
    variables: { userId },
    query: gql`
      query GetUserClient($userId: String!) {
        users_by_pk(id: "5f0b690371468c0013001a77") {
          client {
            id
            name
          }
        }
      }
    `,
  });

  return getUserClientResult.data.users_by_pk.client;
}
