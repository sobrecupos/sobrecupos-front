import { NextApiRequest, NextApiResponse } from "next";

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toUpperCase() !== "POST") return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }

    const data = await response.text();

    throw new Error(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export default createOrder;
