import { StatusBadge } from "@/components/ui/status-badge";
import type { ShoppingSource } from "@/models/app";

const toneMap: Record<ShoppingSource, string> = {
  Manuell: "bg-[#f5f8ff] text-thw-navy",
  Essensplan: "bg-[#eef7f2] text-[#1f7a4c]",
};

export function ShoppingSourceBadge({ source }: { source: ShoppingSource }) {
  return <StatusBadge label={source} toneClassName={toneMap[source]} />;
}