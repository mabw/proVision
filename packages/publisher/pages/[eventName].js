import React, { useState, useEffect } from "react";
import { Root } from "../components/RootWidget";
import Widgets from "widgets";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Canvas } from "../components";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

const nodes1 = {
  root: {
    type: "Root",
    displayName: "root",
    parentId: "",
    childrenId: ["abc123", "cde123"],
    index: 0,
    styleProps: { ...Root.styleProps.formData },
    settingProps: { ...Root.settingProps.formData },
    eventProps: { ...Root.eventProps.formData },
  },
  abc123: {
    type: "BasicText",
    displayName: "textDemo1",
    parentId: "root",
    childrenId: [],
    index: 0,
    styleProps: { ...Widgets.BasicText.styleProps.formData },
    settingProps: { ...Widgets.BasicText.settingProps.formData },
    eventProps: { ...Widgets.BasicText.eventProps.formData },
  },
  cde123: {
    type: "BasicText",
    displayName: "textDemo2",
    parentId: "root",
    childrenId: [],
    index: 1,
    styleProps: { ...Widgets.BasicText.styleProps.formData },
    settingProps: { ...Widgets.BasicText.settingProps.formData },
    eventProps: { ...Widgets.BasicText.eventProps.formData },
  },
};

function HomePage() {
  const router = useRouter();
  const mounted = useMounted();
  const { eventName, env } = router.query;
  let queryString = `/api/v1/event/${eventName}`;
  if (env !== "sta") {
    queryString += ".json";
  }
  const { data, error } = useSWR(() => (mounted ? queryString : null), fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <Canvas nodes={data.nodes} />;
}

export default HomePage;
