import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
      {Array.from({ length: 16 }).map((_, index) => (
        <Skeleton key={index} className="w-[300px] h-[300px]" />
      ))}
    </section>
  );
}
