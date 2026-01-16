// 1) Replace this file completely
// src/app/ar/about/page.tsx

export const dynamic = "force-dynamic";

export default function AboutAR() {
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
      <h1 style={{ marginTop: 0 }}>من نحن</h1>

      <p style={{ lineHeight: 1.9 }}>
        <b>أنت Show</b> منصة من القرّاء لاختيار الأعمال الأدبية التي يرغبون برؤيتها على الشاشة.
        التصويت متاح كضيف، ويمكن للمستخدمين إدخال بريدهم للمشاركة في سحب جوائز مثل زيارة موقع التصوير وغيرها.
      </p>

      <h2>كيف يعمل</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>تُعرض أعمال مختارة تحت كل تصنيف، ويمكنك التصويت لها.</li>
        <li>يُستخدم مُعرّف الجهاز لمنع تكرار التصويت لنفس العمل داخل الجولة.</li>
        <li>يمكنك تقديم فكرة/نص مستقل ليتم مراجعته وقد يُختار للتصويت ضمن فئة (مستقل).</li>
      </ul>

      <p style={{ marginTop: 18 }}>
        <a href="/ar" style={{ fontWeight: 700 }}>
          ← العودة للرئيسية
        </a>
      </p>
    </main>
  );
}

