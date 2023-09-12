import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cancelReservation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    await appointmentsService.cancelReservation(id);
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true });
  }
};

export default verifySignature(cancelReservation);
