import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import insertAsset from "../graphql/mutations/insertAsset";
import getAssets from "../graphql/queries/getAssets";
import Asset from "../models/asset.model";
import useOrg from "./useOrg";

const isLoadingAssetsState = atom({
  key: "isLoadingAssetsState",
  default: false,
});

const assetsState = atom<Asset[]>({
  key: "assetsState",
  default: [],
});

interface AssetsHookValue {
  isLoading: boolean;
  assets: Asset[];
  fetchAssets: () => Promise<void>;
  createAsset: (asset: Asset) => Promise<void>;
}

export default function useAssets(): AssetsHookValue {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAssetsState);
  const [assets, setAssets] = useRecoilState(assetsState);
  const { org } = useOrg();

  const fetchAssets = useCallback(() => {
    setIsLoading(true);
    return getAssets(org.id!)
      .then((res) => {
        setAssets(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAssets, org.id, setIsLoading]);

  const createAsset = useCallback(
    (asset: Asset) => {
      setIsLoading(true);
      return insertAsset(asset, org.id!).finally(() => {
        setIsLoading(false);
      });
    },
    [org.id, setIsLoading]
  );

  return {
    isLoading,
    assets,
    fetchAssets,
    createAsset,
  };
}
