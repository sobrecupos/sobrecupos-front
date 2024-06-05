export const specialtyProjection = {
  _id: 0,
  id: { $toString: "$_id" },
  picture: 1,
  name: 1,
  code: 1,
  seo: 1,
  enabled: true,
  type: "$type",
};
