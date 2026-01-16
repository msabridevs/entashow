// src/app/ar/privacy/page.tsx
export const dynamic = "force-dynamic";

export default function PrivacyAR() {
  return (
    <main
      dir="rtl"
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
        borderRadius: 12,
      }}
    >
      <h1>سياسة الخصوصية</h1>
      <p style={{ lineHeight: 1.9 }}>
        نجمع البريد الإلكتروني (اختياري) للمشاركة في سحب الجوائز، ونستخدم مُعرّف الجهاز لمنع تكرار التصويت،
        ونحفظ الأفكار/الملخصات المقدّمة للمراجعة. لا نبيع البيانات الشخصية.
      </p>
      <p style={{ lineHeight: 1.9 }}>
        قد نستخدم البريد للتواصل مع الفائزين فقط أو لإشعارات تتعلق بالجوائز/التحديثات.
      </p>
    </main>
  );
}

