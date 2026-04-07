import { colorClassForBadge } from '@/lib/signal';

export function SignalBadge({ label }: { label: string }) {
  return <span className={colorClassForBadge(label)}>{label}</span>;
}
