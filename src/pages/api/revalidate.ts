import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await Promise.all([
      res.revalidate(`/profesional/${req.query.practitionerCode}`),
      res.revalidate(`/especialidades/${req.query.specialtyCode}`),
    ]);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
