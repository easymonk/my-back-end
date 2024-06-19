import type { NextApiRequest, NextApiResponse } from "next";
import NotionServer from "../../lib/NotionServer";

type Data = any;

const notionServer = new NotionServer();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const data = await notionServer.query();
  const data = await notionServer.detail('957a1b2c-fca6-46b3-82ca-f14d208c39fc');
  // const data = await notionServer.update('d73675a692c944b0b0da7c2286f196e8');
  // const data = await notionServer.create();
  res.status(200).json(data);
}