import { createClient } from "contentful";

const space = "w5di5ujquwsn";
const accessToken = "bQ6bLxNW-5Fj1vuyHXXOanj65Q-RDjn7Gp5oPAaTcnk";

export const client = createClient({
  space: space,
  accessToken: accessToken,
  host: "preview.contentful.com",
});
