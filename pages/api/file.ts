// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const fileName = "DELETE_ME.json";

type Data = {
  [x: string]: any;
};

const get = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const fileExists = fs.existsSync(fileName);
    if (fileExists) {
      const text = await readFile(fileName, "utf8");
      const json = JSON.parse(text);
      res.send(json);
    } else {
      res.status(404).send({ error: `${fileName} does not exist` });
    }
  } catch (error: any) {
    res.status(500).send(error);
  }
};

const post = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = req?.body;
  if (!data) return res.status(400).send({ error: "Body must not be empty" });
  writeFile(fileName, JSON.stringify(data, undefined, 4), "utf8")
    .then(() => {
      res.send({ result: `Wrote to file: ${data} to ${fileName}` });
    })
    .catch((error: any) => {
      res.status(500).send(error);
    });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    get(req, res);
  } else if (req.method === "POST") {
    post(req, res);
  } else {
    res.status(405);
  }
}
