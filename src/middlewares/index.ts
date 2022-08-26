import { NextApiRequest, NextApiResponse } from "next";

export const withOpenSea =
  (
    handler: (req: NextApiRequest, res: NextApiResponse, ...rest: any[]) => void
  ) =>
  (req: NextApiRequest, res: NextApiResponse, ...rest: any[]) => {
    if (!process.env.OPENSEA_API_KEY) {
      console.error(`(Events API) missing OPENSEA_API_KEY`);
      res.status(500).json({ error: "Missing OPENSEA_API_KEY" });
      return;
    }
    const openSeaApiKey = process.env.OPENSEA_API_KEY;

    return handler(req, res, openSeaApiKey, ...rest);
  };

export const withAddressAndPage =
  (
    handler: (req: NextApiRequest, res: NextApiResponse, ...rest: any[]) => void
  ) =>
  (req: NextApiRequest, res: NextApiResponse, ...rest: any[]) => {
    const { address: addressQuery, page: pageQuery } = req.query;
    const address = Array.isArray(addressQuery)
      ? addressQuery[0]
      : addressQuery;
    const page = pageQuery
      ? Array.isArray(pageQuery)
        ? pageQuery[0]
        : pageQuery
      : 1;

    return handler(req, res, address, page, ...rest);
  };
