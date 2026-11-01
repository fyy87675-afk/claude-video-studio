import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  bg: "#071426",
  panel: "#10243C",
  panel2: "#142D49",
  cyan: "#36D9F2",
  blue: "#3987FF",
  gold: "#F5C66B",
  white: "#F5F8FF",
  muted: "#A9BDD2",
  green: "#48D6A0",
};

const rtl: React.CSSProperties = {
  direction: "rtl",
  fontFamily: '"Noto Sans Arabic", "Arial", sans-serif',
  textAlign: "right",
};

const fade = (f: number) =>
  interpolate(f, [0, 18, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const rise = (f: number, fps: number, delay = 0) =>
  spring({
    frame: f - delay,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.8 },
  });

const Text = ({
  children,
  size = 38,
  color = C.white,
  weight = 600,
  style = {},
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      ...rtl,
      fontSize: size,
      color,
      fontWeight: weight,
      lineHeight: 1.55,
      ...style,
    }}
  >
    {children}
  </div>
);

const Brand = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      direction: "rtl",
    }}
  >
    <Img
      src={staticFile("madrasati-logo.png")}
      style={{
        width: 125,
        height: 125,
        objectFit: "contain",
        filter: "drop-shadow(0 12px 28px #3987FF66)",
      }}
    />
    <div>
      <Text size={43} weight={900}>مدرستي</Text>
      <Text size={19} color={C.gold}>إدارة مدرسية ذكية</Text>
    </div>
  </div>
);

const Background = ({ frame }: { frame: number }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 75) * 12}% 35%, #173A5C 0%, ${C.bg} 65%)`,
      overflow: "hidden",
    }}
  >
    <AbsoluteFill
      style={{
        opacity: 0.12,
        backgroundImage:
          "linear-gradient(#6DC9FF22 1px, transparent 1px), linear-gradient(90deg, #6DC9FF22 1px, transparent 1px)",
        backgroundSize: "65px 65px",
        transform: `perspective(800px) rotateX(8deg) translateY(${(frame % 120) / 5}px)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "#1B8CFF",
        filter: "blur(170px)",
        opacity: 0.15,
        top: 450,
        left: -250,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 450,
        height: 450,
        borderRadius: "50%",
        background: C.cyan,
        filter: "blur(170px)",
        opacity: 0.12,
        bottom: 100,
        right: -220,
      }}
    />
  </AbsoluteFill>
);

const Glass = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "linear-gradient(145deg, #193650EE, #0B1B30F2)",
      border: "1px solid #75CFF52B",
      borderRadius: 30,
      padding: 30,
      boxShadow: "0 25px 70px #0005",
      ...style,
    }}
  >
    {children}
  </div>
);

const Header = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div style={{ ...rtl, marginBottom: 38 }}>
    <Text size={20} color={C.cyan} weight={800}>{eyebrow}</Text>
    <Text size={57} weight={900} style={{ marginTop: 12 }}>
      {title}
    </Text>
    <Text size={27} color={C.muted} style={{ marginTop: 12 }}>
      {subtitle}
    </Text>
  </div>
);

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <Glass style={{ flex: 1, padding: 22, minWidth: 0 }}>
    <Text size={20} color={C.muted}>{label}</Text>
    <Text size={43} color={color} weight={900}>{value}</Text>
  </Glass>
);

const Feature = ({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
}) => (
  <Glass
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: 25,
      marginBottom: 18,
      direction: "rtl",
    }}
  >
    <div
      style={{
        width: 76,
        height: 76,
        borderRadius: 22,
        flexShrink: 0,
        background: `${color}22`,
        border: `1px solid ${color}77`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontSize: 35,
        fontWeight: 900,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <Text size={29} weight={800}>{title}</Text>
      <Text size={20} color={C.muted}>{description}</Text>
    </div>
  </Glass>
);

const Scene = ({
  frame,
  fps,
  children,
}: {
  frame: number;
  fps: number;
  children: React.ReactNode;
}) => {
  const opacity = fade(frame);
  const y = interpolate(rise(frame, fps, 4), [0, 1], [65, 0]);

  return (
    <AbsoluteFill
      style={{
        padding: "105px 65px",
        opacity,
        transform: `translateY(${y}px)`,
        justifyContent: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Intro = ({ frame, fps }: { frame: number; fps: number }) => (
  <Scene frame={frame} fps={fps}>
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
      <div style={{ transform: `scale(${rise(frame, fps, 2)})` }}>
        <Brand />
      </div>
      <div style={{ height: 130 }} />
      <Text size={76} weight={900} style={{ textAlign: "center" }}>
        مدرستك...
      </Text>
      <Text size={76} color={C.cyan} weight={900} style={{ textAlign: "center" }}>
        بإدارة أذكى
      </Text>
      <div style={{ height: 35 }} />
      <Text size={29} color={C.muted} style={{ textAlign: "center" }}>
        كل تفاصيل مدرستك في مكان واحد
      </Text>
      <div style={{ height: 95 }} />
      <Glass style={{ borderRadius: 50, padding: "18px 40px" }}>
        <Text size={24} color={C.cyan}>منظومة واحدة • رؤية أوضح • إدارة أسهل</Text>
      </Glass>
    </div>
  </Scene>
);

const Dashboard = ({ frame, fps }: { frame: number; fps: number }) => (
  <Scene frame={frame} fps={fps}>
    <Header
      eyebrow="01 — لوحة الإدارة"
      title="مدرستك أمامك"
      subtitle="تابع أداء المدرسة من شاشة واحدة"
    />
    <Glass style={{ padding: 25 }}>
      <div style={{ ...rtl, display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
        <Text size={27} weight={800}>لوحة المدرسة</Text>
        <Text size={18} color={C.green}>● مباشر</Text>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Stat label="الطلاب" value="1,250" color={C.cyan} />
        <Stat label="الحضور" value="94%" color={C.green} />
      </div>
      <div style={{ height: 18 }} />
      <div style={{ display: "flex", gap: 12 }}>
        <Stat label="المعلمون" value="68" color={C.gold} />
        <Stat label="الشعب" value="32" color={C.blue} />
      </div>
      <div style={{ marginTop: 35 }}>
        <Text size={23}>مؤشر الحضور الأسبوعي</Text>
        <div style={{ display: "flex", alignItems: "end", gap: 17, height: 180, marginTop: 25 }}>
          {[55, 78, 65, 90, 72, 100, 85].map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v * rise(frame, fps, i * 5)}%`,
                borderRadius: "12px 12px 4px 4px",
                background: `linear-gradient(180deg, ${C.cyan}, ${C.blue})`,
                boxShadow: "0 0 20px #36D9F233",
              }}
            />
          ))}
        </div>
      </div>
    </Glass>
    <Text size={22} color={C.muted} style={{ textAlign: "center", marginTop: 35 }}>
      بيانات واضحة تساعدك على اتخاذ القرار
    </Text>
  </Scene>
);

const Management = ({ frame, fps }: { frame: number; fps: number }) => (
  <Scene frame={frame} fps={fps}>
    <Header
      eyebrow="02 — تنظيم العملية التعليمية"
      title="كل شيء منظم"
      subtitle="أدوات متكاملة لإدارة يومك الدراسي"
    />
    <Feature icon="ح" title="الحضور والغياب" description="متابعة يومية لسجلات الطلاب" color={C.cyan} />
    <Feature icon="د" title="الدرجات والامتحانات" description="إدارة النتائج والتقييمات بسهولة" color={C.gold} />
    <Feature icon="و" title="الواجبات المدرسية" description="تنظيم الواجبات ومتابعة إنجازها" color={C.green} />
    <Feature icon="م" title="إدارة الكادر" description="تنظيم المعلمين والصفوف والشعب" color={C.blue} />
    <Text size={21} color={C.muted} style={{ textAlign: "center", marginTop: 20 }}>
      واجهة واحدة تجمع تفاصيل العمل المدرسي
    </Text>
  </Scene>
);


const BusTracking = ({ frame, fps }: { frame: number; fps: number }) => {
  const busX = interpolate(frame, [0, 220], [12, 70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.65 + Math.sin(frame / 8) * 0.2;

  return (
    <Scene frame={frame} fps={fps}>
      <Header
        eyebrow="03 — تتبّع الباص المباشر"
        title="طريقهم أمام عينيك"
        subtitle="تابع موقع الباص على الخريطة أثناء الرحلة"
      />

      <Glass style={{ padding: 20, overflow: "hidden" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          marginBottom: 18,
        }}>
          <Text size={25} weight={900}>خريطة الرحلة</Text>
          <div style={{
            background: "#48D6A022",
            border: "1px solid #48D6A077",
            borderRadius: 30,
            padding: "8px 15px",
          }}>
            <Text size={18} color={C.green} weight={800}>● GPS نشط</Text>
          </div>
        </div>

        <div style={{
          height: 570,
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          background: "linear-gradient(145deg,#173653,#10263C)",
          border: "1px solid #65C8F533",
        }}>
          <div style={{
            position: "absolute",
            inset: -100,
            opacity: 0.5,
            transform: `translate(${(frame % 80) / 5}px, ${(frame % 100) / 7}px)`,
            backgroundImage:
              "linear-gradient(35deg, transparent 46%, #7896A733 47%, #7896A733 50%, transparent 51%), linear-gradient(125deg, transparent 43%, #7896A733 44%, #7896A733 48%, transparent 49%)",
            backgroundSize: "145px 125px",
          }} />

          <svg
            viewBox="0 0 600 570"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <path d="M-30 430 L130 350 L245 390 L365 230 L650 140"
              fill="none" stroke="#7896A7" strokeWidth="34" opacity="0.18" />
            <path d="M-30 430 L130 350 L245 390 L365 230 L650 140"
              fill="none" stroke="#36D9F2" strokeWidth="7"
              strokeLinecap="round" strokeDasharray="13 13" opacity="0.9" />
            <path d="M-30 430 L130 350 L245 390 L365 230 L650 140"
              fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />
            <circle cx="130" cy="350" r="17" fill="#48D6A0" opacity="0.9" />
            <circle cx="130" cy="350" r="29" fill="none" stroke="#48D6A0" strokeWidth="3" opacity={pulse} />
            <circle cx="500" cy="185" r="17" fill="#F5C66B" />
            <circle cx="500" cy="185" r="29" fill="none" stroke="#F5C66B" strokeWidth="3" opacity={pulse} />
          </svg>

          <div style={{
            position: "absolute",
            left: `${busX}%`,
            top: `${65 - (busX - 12) * 0.55}%`,
            transform: "translate(-50%,-50%)",
            width: 100,
            height: 76,
            borderRadius: 22,
            background: "linear-gradient(145deg,#FFE29A,#EFAF3E)",
            border: "3px solid #FFF0C2",
            boxShadow: "0 0 35px #F5C66B88",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 49,
          }}>
            🚌
          </div>

          <div style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#071426DD",
            border: "1px solid #FFFFFF22",
            borderRadius: 16,
            padding: "10px 16px",
          }}>
            <Text size={18} color={C.white}>حركة الباص</Text>
            <Text size={16} color={C.cyan}>تحديث الموقع</Text>
          </div>

          <div style={{
            position: "absolute",
            bottom: 18,
            left: 18,
            background: "#071426DD",
            borderRadius: 16,
            padding: "10px 16px",
          }}>
            <Text size={18} color={C.green}>● موقع مباشر</Text>
          </div>
        </div>

        <div style={{
          display: "flex",
          direction: "rtl",
          gap: 12,
          marginTop: 18,
        }}>
          <div style={{ flex: 1 }}>
            <Text size={18} color={C.muted}>الخدمة</Text>
            <Text size={22} weight={800}>تتبّع GPS</Text>
          </div>
          <div style={{ flex: 1 }}>
            <Text size={18} color={C.muted}>المشاهدة</Text>
            <Text size={22} weight={800}>خريطة متحركة</Text>
          </div>
        </div>
      </Glass>

      <Text size={23} color={C.cyan} style={{ textAlign: "center", marginTop: 25 }}>
        اطمئن على الطريق... من هاتفك
      </Text>
    </Scene>
  );
};

const Parents = ({ frame, fps }: { frame: number; fps: number }) => (
  <Scene frame={frame} fps={fps}>
    <Header
      eyebrow="04 — متابعة ولي الأمر"
      title="الأهل بالصورة"
      subtitle="متابعة أسهل واطمئنان أكبر"
    />
    <Glass style={{ padding: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", ...rtl }}>
        <Text size={27} weight={800}>متابعة الطالب</Text>
        <Text size={18} color={C.green}>● متصل</Text>
      </div>
      <div style={{ height: 25 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, direction: "rtl" }}>
        <div style={{
          width: 90, height: 90, borderRadius: 28,
          background: "linear-gradient(135deg,#36D9F2,#3987FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 43, color: C.bg, fontWeight: 900,
        }}>ط</div>
        <div>
          <Text size={31} weight={900}>ملخص اليوم الدراسي</Text>
          <Text size={21} color={C.muted}>الحالة الدراسية للطالب</Text>
        </div>
      </div>
      <div style={{ height: 30 }} />
      {[
        ["الحضور", "تم تسجيل الحضور", C.green],
        ["الواجبات", "متابعة الواجبات", C.cyan],
        ["الدرجات", "الاطلاع على النتائج", C.gold],
      ].map(([a, b, color], i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between",
          padding: "22px 0", borderTop: "1px solid #FFFFFF18",
          direction: "rtl",
        }}>
          <Text size={24}>{a}</Text>
          <Text size={19} color={color}>{b}</Text>
        </div>
      ))}
    </Glass>
    <Glass style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 22 }}>
      <div style={{ fontSize: 60 }}>🚌</div>
      <div style={{ flex: 1 }}>
        <Text size={27} weight={900}>متابعة حركة الباص</Text>
        <Text size={20} color={C.muted}>شاهد موقع الباص أثناء الرحلة</Text>
      </div>
      <Text size={20} color={C.green}>مباشر</Text>
    </Glass>
  </Scene>
);

const Ending = ({ frame, fps }: { frame: number; fps: number }) => (
  <Scene frame={frame} fps={fps}>
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Brand />
      <div style={{ height: 125 }} />
      <Text size={69} weight={900} style={{ textAlign: "center" }}>
        ابدأ عصر
      </Text>
      <Text size={82} color={C.cyan} weight={900} style={{ textAlign: "center" }}>
        الإدارة الذكية
      </Text>
      <div style={{ height: 40 }} />
      <Text size={27} color={C.muted} style={{ textAlign: "center" }}>
        مدرستي... لأن وقتك يستحق الأفضل
      </Text>
      <div style={{ height: 100 }} />
      <Glass style={{
        padding: "25px 55px",
        borderRadius: 60,
        background: `linear-gradient(110deg, ${C.cyan}, ${C.blue})`,
      }}>
        <Text size={29} color={C.bg} weight={900}>اكتشف مدرستي الآن</Text>
      </Glass>
      <div style={{ height: 75 }} />
      <Text size={20} color={C.muted} style={{ textAlign: "center" }}>
        منظومة الإدارة المدرسية المتكاملة
      </Text>
    </div>
  </Scene>
);

export const MadrasatiAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = Math.min(5, Math.floor(frame / 240));
  const local = frame - scene * 240;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, color: C.white }}>
      <Background frame={frame} />
      {scene === 0 && <Intro frame={local} fps={fps} />}
      {scene === 1 && <Dashboard frame={local} fps={fps} />}
      {scene === 2 && <Management frame={local} fps={fps} />}
      {scene === 3 && <BusTracking frame={local} fps={fps} />}
          {scene === 4 && <Parents frame={local} fps={fps} />}
      {scene === 5 && <Ending frame={local} fps={fps} />}
      <div style={{
        position: "absolute", bottom: 42, left: 65, right: 65,
        height: 4, borderRadius: 10, background: "#FFFFFF20",
      }}>
        <div style={{
          width: `${(frame / 1440) * 100}%`,
          height: "100%", borderRadius: 10,
          background: `linear-gradient(90deg, ${C.cyan}, ${C.blue})`,
        }} />
      </div>
    </AbsoluteFill>
  );
};
