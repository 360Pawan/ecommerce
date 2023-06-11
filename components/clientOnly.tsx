"use Client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export const ClientOnly = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return <Skeleton className={className} />;

  return <>{children}</>;
};
