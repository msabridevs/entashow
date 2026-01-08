export const dynamic = "force-dynamic";

import HomeLanding from "@/components/HomeLanding";

export default function ArabicHome() {
  return (
    <HomeLanding
      locale="ar"
      stats={{
        categories: 17,
        daysInRound: 7,
        hoursToFinale: 72,
      }}
    />
  );
}
