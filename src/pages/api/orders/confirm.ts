import { NextApiRequest, NextApiResponse } from "next";

const confirmOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  try {
    const { itemId } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });

    return res.redirect(303, `/resumen?itemId=${itemId}`);
  } catch (error) {
    return res.redirect(303, "/resumen");
  }
};

export default confirmOrder;
