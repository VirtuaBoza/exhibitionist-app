import gql from "graphql-tag";
import client from "../apolloClient";

export async function createOrg(
  name: string
): Promise<{ id: string; name: string }> {
  const createOrgResult = await client.mutate({
    variables: { name },
    mutation: gql`
      mutation InsertOrg($name: String!) {
        insert_orgs(objects: { name: $name }) {
          returning {
            id
            name
          }
        }
      }
    `,
  });

  return createOrgResult.data.insert_orgs.returning[0];
}

export async function createUser(
  userId: string,
  orgId: string
): Promise<boolean> {
  const createUserResult = await client.mutate({
    variables: {
      userId,
      orgId,
    },
    mutation: gql`
      mutation InsertUser($userId: String!, $orgId: uuid!) {
        insert_users(objects: { id: $userId, org_id: $orgId }) {
          affected_rows
        }
      }
    `,
  });

  return Boolean(createUserResult.data.insert_users.affected_rows);
}

export async function getUserOrgData(
  userId: string
): Promise<{ id: string; name: string }> {
  const getUserOrgResult = await client.query({
    variables: { userId },
    query: gql`
      query GetUserOrg($userId: String!) {
        users_by_pk(id: $userId) {
          org {
            id
            name
          }
        }
      }
    `,
  });

  return getUserOrgResult.data.users_by_pk.org;
}
