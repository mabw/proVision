import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Canvas } from "../components";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

function HomePage() {
  const router = useRouter();
  const mounted = useMounted();
  const { eventName, env } = router.query;
  let queryString = `/api/v1/event/${eventName}`;
  if (env !== "sta") {
    queryString = `/public/${eventName}.json`;
  }
  const { data, error } = useSWR(() => (mounted ? queryString : null), fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (data.nodes) return <Canvas nodes={data.nodes} />;

  return data.message;
}

export default HomePage;
