import gql from "graphql-tag";
import Asset from "../../models/asset.model";
import client from "../apolloClient";

export default async function insertAsset(
  { title, description, artist_id, image_url }: Asset,
  orgId: string
) {
  const queryResult = await client.mutate({
    variables: { orgId, title, description, artist_id, image_url },
    mutation: gql`
      mutation InsertAsset(
        $orgId: uuid!
        $title: String!
        $description: String!
        $artist_id: uuid
        $image_url: String
      ) {
        insert_assets(
          objects: {
            org_id: $orgId
            title: $title
            description: $description
            artist_id: $artist_id
            image_url: $image_url
          }
        ) {
          returning {
            id
            title
            description
            created_at
            updated_at
            artist_id
            image_url
          }
        }
      }
    `,
  });

  return queryResult.data.insert_assets.returning[0];
}
