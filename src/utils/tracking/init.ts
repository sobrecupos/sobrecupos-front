import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init("phc_pRa2fHv4zFtW07XOatxs9xL2JuZhZXrLZlK2aqP6eWh", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
      }
    },
    capture_pageview: false,
  });
}
