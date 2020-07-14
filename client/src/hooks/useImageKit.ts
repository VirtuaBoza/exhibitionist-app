import ImageKit from "imagekit-javascript";
import { useCallback, useState } from "react";
import { proxyUrl } from "../environment";

const imageKit = new ImageKit({
  publicKey: "A1C3TXkJRO5Uep1Po71y17zj9Tg=",
  urlEndpoint: "https://ik.imagekit.io/e1zv3hm1fuybqv",
  authenticationEndpoint: `${proxyUrl}/imageKit`,
});

interface ImageKitHookValue {
  isLoading: boolean;
  upload: (file: File) => Promise<unknown>;
}

export default function useImageKit(): ImageKitHookValue {
  const [isLoading, setIsLoading] = useState(false);

  const upload = useCallback((file: File) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      imageKit.upload(
        {
          file,
          fileName: file.name,
        },
        (err: unknown, result: unknown) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        }
      );
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return {
    isLoading,
    upload,
  };
}
