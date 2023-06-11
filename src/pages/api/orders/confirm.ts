import { NextApiRequest, NextApiResponse } from "next";

const confirmOrder = (_req: NextApiRequest, res: NextApiResponse) => {
  return res.redirect("/");
};

export default confirmOrder;
