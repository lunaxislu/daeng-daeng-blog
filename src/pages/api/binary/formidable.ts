import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((res, rej) => {
    const form = formidable(opts);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return rej(err);
      }
      return res({ fields, files });
    });
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { fields, files } = await formidablePromise(req, {
      keepExtensions: true, //기본적으로 Formidable은 임의의 이름을 생성하고 파일 확장자를 제거한 채 파일을 저장하지만, keepExtensions: true로 설정하면 원래 확장자가 유지
    });
    console.log("🚀 ~ fields:", fields); // 🚀 ~ fields: { text: [ 'formidable' ] }

    console.log("🚀 ~ files:", files);
    /* 🚀 ~ files: {
      file: [
        PersistentFile {
          _events: [Object: null prototype],
          _eventsCount: 1,
          _maxListeners: undefined,
          lastModifiedDate: 2024-08-03T09:34:25.488Z,
          filepath: 'C:\\Users\\admin\\AppData\\Local\\Temp\\253168dbf1f185ddddd7ce019.png',
          newFilename: '253168dbf1f185ddddd7ce019.png',
          originalFilename: '1.png',
          mimetype: 'image/png',
          hashAlgorithm: false,
          size: 53256,
          _writeStream: [WriteStream],
          hash: null,
          [Symbol(kCapture)]: false
        }
      ]
    } */
    const formData = new FormData();
    if (files && files.file) {
      const _file = files.file[0] as formidable.File;
      const readFile = fs.createReadStream(_file.filepath);
      formData.append("file", readFile);
    }
    for (const key in fields) {
      formData.append(key, fields[key]![0]);
    }

    await axios.postForm(
      "http://localhost:4000/users",
      JSON.stringify(formData),
    );

    res.send(200);
  } catch (err) {
    res.send(err);
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
// const form = new formidable.IncomingForm({

//   keepExtensions: true, //기본적으로 Formidable은 임의의 이름을 생성하고 파일 확장자를 제거한 채 파일을 저장하지만, keepExtensions: true로 설정하면 원래 확장자가 유지
// });
// form.parse(req, (err, fields, files) => {
//   console.log(req, "<- rep");
//   console.log(fields, "<- fields");
// });
