import { StatusBadge } from "@/components/ui/status-badge";
import { getMaterialStatusTone } from "@/lib/materials";
import type { MaterialStatus } from "@/models/app";

export function MaterialStatusBadge({ status }: { status: MaterialStatus }) {
  return <StatusBadge label={status} toneClassName={getMaterialStatusTone(status)} />;
}