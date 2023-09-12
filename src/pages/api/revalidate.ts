import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { practitionerId } = req.body;

  try {
    const practitioner = await practitionersService.getPrivateProfile({
      id: practitionerId,
    });

    if (!practitioner) {
      throw new Error(`Practitioner with id ${practitionerId} was not found`);
    }

    await Promise.all([
      res.revalidate(`/profesional/${practitioner.code}`),
      res.revalidate(`/especialidades/${practitioner.specialty.code}`),
    ]);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default verifySignature(handler);
