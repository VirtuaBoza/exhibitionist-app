import gql from "graphql-tag";
import client from "../apolloClient";

export default async function fetchAssets(orgId: string) {
  const queryResult = await client.query({
    variables: { orgId },
    query: gql`
      query GetAssets($orgId: uuid!) {
        orgs_by_pk(id: $orgId) {
          assets {
            id
            title
            updated_at
            created_at
            description
            artist {
              id
              name
            }
          }
        }
      }
    `,
  });

  return queryResult.data.orgs_by_pk.assets;
}
