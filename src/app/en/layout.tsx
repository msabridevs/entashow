export const dynamic = "force-dynamic";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" lang="en" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
