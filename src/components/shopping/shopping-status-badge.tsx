import { StatusBadge } from "@/components/ui/status-badge";
import type { ShoppingStatus } from "@/models/app";

const toneMap: Record<ShoppingStatus, string> = {
  Offen: "bg-[#fffaeb] text-[#b54708]",
  "Wird besorgt": "bg-[#eef5fb] text-thw-navy",
  Erledigt: "bg-[#ecfdf3] text-[#027a48]",
};

export function ShoppingStatusBadge({
  status,
}: {
  status: ShoppingStatus;
}) {
  return <StatusBadge label={status} toneClassName={toneMap[status]} />;
}