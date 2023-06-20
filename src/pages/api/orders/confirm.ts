import { NextApiRequest, NextApiResponse } from "next";

const confirmOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  return res.redirect(303, `/resumen?paymentId=${token}`);
};

export default confirmOrder;
