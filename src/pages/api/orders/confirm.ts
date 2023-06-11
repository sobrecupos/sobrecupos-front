import { NextApiRequest, NextApiResponse } from "next";

const confirmOrder = (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(301).redirect("/");
};

export default confirmOrder;
