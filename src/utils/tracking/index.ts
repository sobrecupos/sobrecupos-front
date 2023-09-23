import posthog from "posthog-js";

let init = false;

if (process.env.NODE_ENV === "production" && !init) {
  posthog.init("phc_pRa2fHv4zFtW07XOatxs9xL2JuZhZXrLZlK2aqP6eWh", {
    api_host: "https://app.posthog.com",
  });

  init = true;
}

export const tracking = posthog;
