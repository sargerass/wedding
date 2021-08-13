import Resizer from "react-image-file-resizer";
export function sleeper(ms: number) {
  return function (x: any) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}
export function resizeImage() {}

export const resizeFile = (file: any) => {
  const MAX_DIMENTION = 768;
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      MAX_DIMENTION,
      MAX_DIMENTION,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};
