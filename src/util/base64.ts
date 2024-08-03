export function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(<string>reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function getArrayBuffer(file: File) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => res(<string>reader.result);
    reader.onerror = (error) => rej(error);
  });
}
