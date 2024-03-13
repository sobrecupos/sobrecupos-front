export const publicPractitionerProfileProjection = {
  _id: 0,
  id: { $toString: "$_id" },
  code: 1,
  picture: 1,
  description: 1,
  licenseId: 1,
  specialty: 1,
  fullName: 1,
  addressTags: {
    $reduce: {
      input: "$practices",
      initialValue: [],
      in: {
        $setUnion: [
          "$$value",
          {
            $cond: [
              { $eq: [{ $type: "$$this.tag" }, "string"] },
              ["$$this.tag"],
              [],
            ],
          },
        ],
      },
    },
  },
  enabled: 1,
};
