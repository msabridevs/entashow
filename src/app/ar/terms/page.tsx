import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default function TermsAR() {
  return (
    <main dir="rtl" style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>الشروط والأحكام</h1>

      <p style={{ lineHeight: 1.9 }}>
        باستخدامك منصة <b>أنت Show</b> فإنك توافق على الشروط التالية:
      </p>

      <h2>التصويت</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>يُسمح بصوت واحد فقط لكل عمل أدبي خلال نفس الجولة.</li>
        <li>لا يمكن التصويت أكثر من مرة لنفس العمل حتى عند إعادة تحميل الصفحة.</li>
        <li>التراجع عن التصويت متاح فقط خلال نفس الجلسة ونفس الجهاز.</li>
        <li>في حال مسح بيانات المتصفح أو تغيير الجهاز، قد لا يكون التراجع متاحًا.</li>
      </ul>

      <h2>التصويت كضيف</h2>
      <p style={{ lineHeight: 1.9 }}>
        يتم التصويت دون إنشاء حساب، ويُستخدم مُعرّف الجهاز لمنع التكرار والإساءة.
      </p>

      <h2>المحتوى المقدم</h2>
      <p style={{ lineHeight: 1.9 }}>
        أي أفكار أو نصوص يتم تقديمها تُحفظ للمراجعة، وقد يتم اختيار بعضها للتصويت أو التطوير.
      </p>

      <p style={{ marginTop: 24 }}>
        <a href="/ar" style={{ fontWeight: 700 }}>← العودة للرئيسية</a>
      </p>

      <SiteFooter lang="ar" />
    </main>
  );
}
