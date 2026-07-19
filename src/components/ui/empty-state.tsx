type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-thw-ice bg-white p-6 text-sm leading-6 text-thw-steel sm:p-8">
      {message}
    </div>
  );
}