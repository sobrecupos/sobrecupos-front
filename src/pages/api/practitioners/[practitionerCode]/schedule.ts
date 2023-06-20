import { NextApiRequest, NextApiResponse } from "next";

const getSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  const { practitionerCode } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/practitioners/${practitionerCode}/schedule`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.text().then((error) => {
        throw new Error(error);
      });
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default getSchedule;
