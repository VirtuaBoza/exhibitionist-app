import React from "react";
import { useForm } from "react-hook-form";
import { useAssets } from "../hooks";
import Asset from "../models/asset.model";

const AddAsset: React.FC<{}> = (props) => {
  const { register, handleSubmit } = useForm();
  const { createAsset, isLoading } = useAssets();

  function onSubmit(data: Asset) {
    createAsset(data);
  }

  return (
    <>
      <h1>Add Asset</h1>
      <form onSubmit={handleSubmit<Asset>(onSubmit)}>
        <input
          placeholder="title"
          name="title"
          ref={register}
          disabled={isLoading}
        />
        <input
          placeholder="description"
          name="description"
          ref={register}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddAsset;
