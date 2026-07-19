"use client";

import { useMemo } from "react";

import { ActivityLogSection } from "@/components/activity/activity-log-section";
import { useAppStore } from "@/store/useAppStore";

export function LatestChangesPanel() {
  const activityLog = useAppStore((state) => state.activityLog);
  const entries = useMemo(() => activityLog.slice(0, 3), [activityLog]);

  return <ActivityLogSection entries={entries} />;
}