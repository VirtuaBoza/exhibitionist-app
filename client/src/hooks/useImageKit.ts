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
  upload: (file: File) => Promise<ImageKitUploadResult>;
}

interface ImageKitUploadResult {
  fileId: string;
  filePath: string;
  fileType: string;
  height: number;
  name: string;
  size: number;
  thumbnailUrl: string;
  url: string;
  width: number;
}

export default function useImageKit(): ImageKitHookValue {
  const [isLoading, setIsLoading] = useState(false);

  const upload = useCallback((file: File) => {
    setIsLoading(true);
    return new Promise<ImageKitUploadResult>((resolve, reject) => {
      imageKit.upload(
        {
          file,
          fileName: file.name,
        },
        (err: any, result: ImageKitUploadResult) => {
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
