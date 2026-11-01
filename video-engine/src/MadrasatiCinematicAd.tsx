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
  bg: "#050B16",
  navy: "#0B1930",
  blue: "#267BFF",
  cyan: "#48DDF5",
  gold: "#E9BD70",
  white: "#F7F5F0",
  muted: "#9EADC1",
  green: "#5CE0B0",
};

const rtl: React.CSSProperties = {
  direction: "rtl",
  fontFamily: '"Noto Sans Arabic", Arial, sans-serif',
  textAlign: "right",
};

const T = ({
  children,
  size = 32,
  color = C.white,
  weight = 700,
  style = {},
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}) => (
  <div style={{
    ...rtl,
    fontSize: size,
    color,
    fontWeight: weight,
    lineHeight: 1.5,
    ...style,
  }}>
    {children}
  </div>
);

const Brand = ({ scale = 1 }: { scale?: number }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 18 * scale,
    direction: "rtl",
  }}>
    <Img
      src={staticFile("madrasati-logo.png")}
      style={{
        width: 112 * scale,
        height: 112 * scale,
        objectFit: "contain",
        filter: "drop-shadow(0 0 24px #D9B56A88)",
      }}
    />
    <div>
      <T size={43 * scale} weight={900}>مدرستي</T>
      <T size={17 * scale} color={C.gold}>إدارة مدرسية ذكية</T>
    </div>
  </div>
);

const Backdrop = ({ frame }: { frame: number }) => (
  <AbsoluteFill style={{
    overflow: "hidden",
    background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 65) * 13}% 40%, #173454 0%, ${C.bg} 70%)`,
  }}>
    <AbsoluteFill style={{
      opacity: 0.10,
      backgroundImage:
        "linear-gradient(#76CFFF22 1px,transparent 1px),linear-gradient(90deg,#76CFFF22 1px,transparent 1px)",
      backgroundSize: "72px 72px",
      transform: `perspective(900px) rotateX(12deg) translateY(${(frame % 120) / 4}px)`,
    }} />
    <div style={{
      position: "absolute",
      width: 650,
      height: 650,
      borderRadius: "50%",
      background: C.blue,
      filter: "blur(190px)",
      opacity: 0.16,
      top: 300,
      left: -350,
    }} />
    <div style={{
      position: "absolute",
      width: 520,
      height: 520,
      borderRadius: "50%",
      background: C.gold,
      filter: "blur(190px)",
      opacity: 0.10,
      bottom: 50,
      right: -300,
    }} />
  </AbsoluteFill>
);

const Scene = ({
  frame,
  children,
}: {
  frame: number;
  children: React.ReactNode;
}) => {
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 16, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 19, stiffness: 75, mass: 1 },
  });
  const y = interpolate(entrance, [0, 1], [65, 0]);

  return (
    <AbsoluteFill style={{
      padding: "100px 65px",
      justifyContent: "center",
      opacity,
      transform: `translateY(${y}px)`,
    }}>
      {children}
    </AbsoluteFill>
  );
};

const Glass = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div style={{
    background: "linear-gradient(145deg,#19324BCC,#091629EE)",
    border: "1px solid #A8D8F333",
    borderRadius: 30,
    padding: 28,
    boxShadow: "0 30px 90px #0008,inset 0 1px 0 #FFFFFF18",
    backdropFilter: "blur(16px)",
    ...style,
  }}>
    {children}
  </div>
);

const GoldLine = () => (
  <div style={{
    height: 3,
    width: 115,
    borderRadius: 10,
    background: `linear-gradient(90deg,transparent,${C.gold},transparent)`,
    marginTop: 24,
  }} />
);

const Intro = ({ frame }: { frame: number }) => (
  <Scene frame={frame}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      <div style={{
        transform: `scale(${interpolate(frame, [0, 65], [0.72, 1], {
          extrapolateRight: "clamp",
        })})`,
        filter: `drop-shadow(0 0 ${20 + Math.sin(frame / 10) * 12}px #D9B56A66)`,
      }}>
        <Brand scale={1.18} />
      </div>
      <div style={{ height: 115 }} />
      <T size={22} color={C.gold} style={{ textAlign: "center", letterSpacing: 4 }}>
        رؤية جديدة للإدارة المدرسية
      </T>
      <T size={64} weight={900} style={{ textAlign: "center", marginTop: 22 }}>
        المدرسة...
      </T>
      <T size={73} weight={900} color={C.cyan} style={{ textAlign: "center" }}>
        بإدارة أذكى
      </T>
      <GoldLine />
    </div>
  </Scene>
);

const Dashboard = ({ frame }: { frame: number }) => (
  <Scene frame={frame}>
    <T size={20} color={C.gold}>01 / لوحة التحكم</T>
    <T size={59} weight={900} style={{ marginTop: 14 }}>
      كل شيء في مكان واحد
    </T>
    <T size={25} color={C.muted} style={{ marginTop: 10, marginBottom: 42 }}>
      نظرة أوضح على تفاصيل يومك الدراسي
    </T>

    <div style={{
      transform: `perspective(1200px) rotateY(${interpolate(frame, [0, 100], [9, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
    }}>
      <Glass style={{ padding: 30, borderRadius: 34 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          marginBottom: 28,
        }}>
          <T size={27} weight={900}>لوحة الإدارة</T>
          <div style={{
            background: "#48D6A022",
            border: "1px solid #48D6A066",
            padding: "8px 16px",
            borderRadius: 30,
          }}>
            <T size={17} color={C.green}>النظام جاهز</T>
          </div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}>
          {[
            ["إدارة الطلبة", "01", C.cyan],
            ["الحضور والغياب", "02", C.gold],
            ["الموظفون", "03", C.green],
            ["الحسابات", "04", C.blue],
          ].map(([label, number, color]) => (
            <div key={number} style={{
              background: "linear-gradient(145deg,#203B59,#102239)",
              border: "1px solid #FFFFFF16",
              borderRadius: 22,
              padding: 23,
            }}>
              <T size={18} color={color as string}>{number}</T>
              <T size={24} weight={800} style={{ marginTop: 15 }}>
                {label}
              </T>
              <div style={{
                height: 3,
                width: "55%",
                marginTop: 18,
                borderRadius: 5,
                background: color as string,
                opacity: 0.8,
              }} />
            </div>
          ))}
        </div>
        <div style={{
          height: 1,
          background: "#FFFFFF20",
          margin: "26px 0",
        }} />
        <T size={20} color={C.muted}>منظومة واحدة لتنظيم العمل اليومي</T>
      </Glass>
    </div>
  </Scene>
);

const Management = ({ frame }: { frame: number }) => (
  <Scene frame={frame}>
    <T size={20} color={C.gold}>02 / تنظيم وإدارة</T>
    <T size={58} weight={900} style={{ marginTop: 14 }}>
      وقت أقل في التفاصيل
    </T>
    <T size={26} color={C.muted} style={{ marginTop: 12, marginBottom: 35 }}>
      وأنت تركز على تطوير مدرستك
    </T>

    {[
      ["01", "إدارة الطلبة", "ملفات الطلبة وتنظيم بياناتهم", C.cyan],
      ["02", "الحضور والغياب", "متابعة يومية أكثر وضوحاً", C.gold],
      ["03", "الإدارة المالية", "تنظيم الحسابات والمدفوعات", C.green],
      ["04", "إدارة الكادر", "تنسيق شؤون الموظفين", C.blue],
    ].map(([n, title, desc, color], i) => {
      const delay = i * 9;
      const x = interpolate(spring({
        frame: frame - delay,
        fps: 30,
        config: { damping: 18, stiffness: 80 },
      }), [0, 1], [75, 0]);
      return (
        <Glass key={n} style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          direction: "rtl",
          marginBottom: 17,
          padding: 23,
          transform: `translateX(${x}px)`,
          borderRight: `4px solid ${color as string}`,
        }}>
          <T size={25} color={color as string} weight={900}>{n}</T>
          <div style={{ flex: 1 }}>
            <T size={27} weight={900}>{title}</T>
            <T size={19} color={C.muted}>{desc}</T>
          </div>
          <T size={30} color={color as string}>✦</T>
        </Glass>
      );
    })}
  </Scene>
);

const BusTracking = ({ frame }: { frame: number }) => {
  const busX = interpolate(frame, [0, 220], [100, 690], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.65 + Math.sin(frame / 7) * 0.2;

  return (
    <Scene frame={frame}>
      <T size={20} color={C.gold}>03 / تتبع GPS</T>
      <T size={57} weight={900} style={{ marginTop: 14 }}>
        الباص أمام عينيك
      </T>
      <T size={25} color={C.muted} style={{ marginTop: 10, marginBottom: 30 }}>
        تابع موقعه وحركته أثناء الرحلة
      </T>

      <Glass style={{
        padding: 20,
        borderRadius: 34,
        background: "linear-gradient(145deg,#102C42,#071625)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          padding: "8px 8px 22px",
        }}>
          <T size={24} weight={900}>خريطة حركة الباص</T>
          <T size={17} color={C.green}>● GPS نشط</T>
        </div>

        <div style={{
          height: 440,
          borderRadius: 24,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#102C3A",
          backgroundImage:
            "linear-gradient(30deg,transparent 47%,#5CA7A522 48%,#5CA7A522 50%,transparent 51%),linear-gradient(120deg,transparent 43%,#5CA7A522 44%,#5CA7A522 46%,transparent 47%),linear-gradient(#6CA6A411 1px,transparent 1px),linear-gradient(90deg,#6CA6A411 1px,transparent 1px)",
          backgroundSize: "170px 150px,190px 180px,42px 42px,42px 42px",
        }}>
          <svg
            viewBox="0 0 700 440"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <path
              d="M65 350 C160 300 155 180 280 205 S420 330 520 210 S590 110 650 80"
              fill="none"
              stroke="#48DDF5"
              strokeWidth="5"
              strokeDasharray="12 12"
              opacity="0.9"
            />
            <path
              d="M65 350 C160 300 155 180 280 205 S420 330 520 210 S590 110 650 80"
              fill="none"
              stroke="#48DDF5"
              strokeWidth="17"
              opacity="0.10"
            />
            <circle cx="65" cy="350" r="13" fill={C.gold} />
            <circle cx="650" cy="80" r="13" fill={C.green} />
          </svg>

          <div style={{
            position: "absolute",
            left: 25,
            bottom: 22,
            background: "#071725DD",
            padding: "10px 17px",
            borderRadius: 14,
          }}>
            <T size={16} color={C.gold}>نقطة الانطلاق</T>
          </div>
          <div style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "#071725DD",
            padding: "10px 17px",
            borderRadius: 14,
          }}>
            <T size={16} color={C.green}>الوجهة</T>
          </div>

          <div style={{
            position: "absolute",
            left: busX,
            top: 190 + Math.sin(frame / 16) * 13,
            transform: "translate(-50%,-50%)",
            width: 80,
            height: 80,
            borderRadius: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 49,
            background: "linear-gradient(145deg,#F4D28D,#B67A36)",
            boxShadow: `0 0 ${35 * pulse}px #F5C66B99,0 12px 30px #0009`,
            border: "2px solid #FFE5AE",
          }}>
            🚌
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          direction: "rtl",
          padding: "22px 5px 5px",
        }}>
          <div>
            <T size={17} color={C.muted}>حالة التتبع</T>
            <T size={22} color={C.green}>مشاركة الموقع أثناء الرحلة</T>
          </div>
          <div>
            <T size={17} color={C.muted}>التحديث</T>
            <T size={22} color={C.cyan}>GPS مباشر</T>
          </div>
        </div>
      </Glass>

      <T size={19} color={C.muted} style={{ marginTop: 22, textAlign: "center" }}>
        اطمئنان أكبر للأهل خلال رحلة الباص
      </T>
    </Scene>
  );
};

const Ending = ({ frame }: { frame: number }) => (
  <Scene frame={frame}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{
        transform: `scale(${interpolate(frame, [0, 60], [0.8, 1], {
          extrapolateRight: "clamp",
        })})`,
        filter: "drop-shadow(0 0 35px #D9B56A55)",
      }}>
        <Brand scale={1.2} />
      </div>
      <div style={{ height: 120 }} />
      <T size={27} color={C.gold} style={{ textAlign: "center" }}>
        مستقبل الإدارة المدرسية يبدأ بخطوة
      </T>
      <T size={66} weight={900} style={{ textAlign: "center", marginTop: 25 }}>
        مدرستي
      </T>
      <T size={46} color={C.cyan} weight={900} style={{ textAlign: "center" }}>
        إدارة أذكى. وقت أفضل.
      </T>
      <GoldLine />
      <div style={{ height: 85 }} />
      <Glass style={{
        padding: "23px 50px",
        borderRadius: 60,
        background: "linear-gradient(110deg,#E9BD70,#A8793C)",
        border: "1px solid #FFE3A8",
        boxShadow: "0 15px 55px #D9A64C44",
      }}>
        <T size={27} color="#101522" weight={900}>
          اكتشف مدرستي الآن
        </T>
      </Glass>
      <div style={{ height: 65 }} />
      <T size={19} color={C.muted} style={{ textAlign: "center" }}>
        منظومة الإدارة المدرسية المتكاملة
      </T>
    </div>
  </Scene>
);

export const MadrasatiCinematicAd: React.FC = () => {
  const frame = useCurrentFrame();
  const scene = Math.min(4, Math.floor(frame / 240));
  const local = frame - scene * 240;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Backdrop frame={frame} />

      {scene === 0 && <Intro frame={local} />}
      {scene === 1 && <Dashboard frame={local} />}
      {scene === 2 && <Management frame={local} />}
      {scene === 3 && <BusTracking frame={local} />}
      {scene === 4 && <Ending frame={local} />}

      <div style={{
        position: "absolute",
        bottom: 38,
        left: 65,
        right: 65,
        height: 3,
        background: "#FFFFFF22",
        borderRadius: 10,
      }}>
        <div style={{
          width: `${(frame / 1200) * 100}%`,
          height: "100%",
          borderRadius: 10,
          background: `linear-gradient(90deg,${C.gold},${C.cyan})`,
        }} />
      </div>
    </AbsoluteFill>
  );
};
