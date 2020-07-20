import React, { useRef } from "react";
import { useAssets, useImageKit } from "../../hooks";
import Asset from "../../models/asset.model";
import Form from "../shared/Form";

const AddAsset: React.FC<{}> = (props) => {
  const { createAsset, isLoading: isSavingAsset } = useAssets();
  const { upload, isLoading: isUploadingImage } = useImageKit();
  const fileRef = useRef<any>();

  function onSubmit(data: Asset) {
    if (fileRef.current?.files?.length) {
      upload(fileRef.current.files[0]).then((result) => {
        const asset: Asset = { ...data, image_url: result.url };
        createAsset(asset);
      });
    } else {
      createAsset(data);
    }
  }

  return (
    <>
      <h1>Add Asset</h1>
      <Form onSubmit={onSubmit} disabled={isSavingAsset || isUploadingImage}>
        <Form.Input label="Title" name="title" />
        <Form.Input label="Description" name="description" />
        <input type="file" ref={fileRef} />
      </Form>
    </>
  );
};

export default AddAsset;
