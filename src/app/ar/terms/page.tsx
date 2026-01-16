// src/app/ar/terms/page.tsx
export const dynamic = "force-dynamic";

export default function TermsAR() {
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
      <h1>الشروط والأحكام</h1>
      <h2>التصويت</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>يُسمح بصوت واحد فقط لكل عمل أدبي خلال نفس الجولة.</li>
        <li>لا يمكن التصويت مرتين لنفس العمل في نفس الجولة.</li>
        <li>التراجع عن التصويت متاح طالما لم يتغيّر مُعرّف الجهاز.</li>
        <li>قد يؤدي مسح بيانات المتصفح/تغيير الجهاز إلى فقدان إمكانية التراجع.</li>
      </ul>

      <h2>المشاركات</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>الأفكار/الملخصات المقدمة تُحفظ للمراجعة وقد يتم اختيارها ضمن فئة (مستقل).</li>
        <li>يُمنع إرسال أي محتوى مخالف للقانون أو مسيء.</li>
      </ul>
    </main>
  );
}

