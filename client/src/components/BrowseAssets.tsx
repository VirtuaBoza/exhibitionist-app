import React, { useEffect } from "react";
import { useAssets } from "../hooks";

const BrowseAssets: React.FC<{}> = (props) => {
  const { assets, isLoading, fetchAssets } = useAssets();

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <>
      <h1>Assets</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {assets.map((item) => (
            <li key={item.id}>
              {item.title}
              {item.image_url && (
                <img
                  src={`${item.image_url}?tr=n-media_library_thumbnail`}
                  alt={item.title}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BrowseAssets;
