export const dynamic = "force-dynamic";

export default function ArLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="ar" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
