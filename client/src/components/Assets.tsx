import React, { useEffect } from "react";
import { useAssets } from "../hooks";

const Assets: React.FC<{}> = (props) => {
  const { assets, isLoading, fetchAssets } = useAssets();

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <div>
      <h1>Assets</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {assets.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Assets;
