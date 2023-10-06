// app/providers.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

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

export const TrackPageview = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <></>;
};

export const TrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <PostHogProvider client={posthog}>{children}</PostHogProvider>;
