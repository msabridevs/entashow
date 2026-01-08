export const dynamic = "force-dynamic";

import HomeLanding from "@/components/HomeLanding";

export default function EnglishHome() {
  return (
    <HomeLanding
      locale="en"
      stats={{
        categories: 17,
        daysInRound: 7,
        hoursToFinale: 72,
      }}
    />
  );
}
