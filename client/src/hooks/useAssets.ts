import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
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
  fetchAssets: () => void;
}

export default function useAssets(): AssetsHookValue {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAssetsState);
  const [assets, setAssets] = useRecoilState(assetsState);
  const { org } = useOrg();

  const fetchAssets = useCallback(async () => {
    if (org.id) {
      setIsLoading(true);
      getAssets(org.id)
        .then((res) => {
          setAssets(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setAssets, org.id, setIsLoading]);

  return {
    isLoading,
    assets,
    fetchAssets,
  };
}
