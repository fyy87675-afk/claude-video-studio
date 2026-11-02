import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  bg: "#030711",
  panel: "#0B1729",
  panel2: "#10223A",
  blue: "#397DFF",
  cyan: "#5CE1F2",
  gold: "#E6BD78",
  white: "#F7FAFF",
  muted: "#9CB0C9",
  green: "#65D9A2",
};

const rtl: React.CSSProperties = {
  direction: "rtl",
  fontFamily: '"Noto Sans Arabic", Arial, sans-serif',
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};


const Particles: React.FC<{ count?: number; color?: string }> = ({
  count = 34,
  color = "#7BCBFF",
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: count }, (_, i) => {
        const x = (i * 137.5) % 100;
        const y = (i * 71.3) % 100;
        const drift = (frame * (0.12 + (i % 5) * 0.035) + i * 19) % 115;
        const opacity = 0.12 + ((i * 7) % 10) / 35;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${(y - drift + 115) % 110}%`,
              width: i % 7 === 0 ? 4 : 2,
              height: i % 7 === 0 ? 4 : 2,
              borderRadius: 50,
              background: color,
              opacity,
              boxShadow: `0 0 12px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const CinematicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 1800], [0, 80]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 34%, #142E50 0%, #081426 42%, #02050C 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -300,
          opacity: 0.18,
          transform: `perspective(900px) rotateX(65deg) translateY(${drift}px)`,
          backgroundImage:
            "linear-gradient(#4CA5FF33 1px, transparent 1px), linear-gradient(90deg,#4CA5FF33 1px,transparent 1px)",
          backgroundSize: "85px 85px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 950,
          height: 950,
          borderRadius: "50%",
          left: "50%",
          top: "43%",
          transform: `translate(-50%,-50%) rotate(${frame * 0.025}deg)`,
          border: "1px solid #62C8FF18",
          boxShadow: "0 0 150px #1D65B833",
        }}
      />
      <Particles />
    </AbsoluteFill>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      color: C.gold,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 3,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: "linear-gradient(145deg,#152943F2,#091629F5)",
      border: "1px solid #8CCBFF25",
      borderRadius: 22,
      boxShadow: "0 22px 65px #0008, inset 0 1px #FFFFFF12",
      backdropFilter: "blur(18px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Metric: React.FC<{
  title: string;
  value: string;
  sub: string;
  accent: string;
  delay: number;
}> = ({ title, value, sub, accent, delay }) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <GlassCard
      style={{
        flex: 1,
        minWidth: 0,
        padding: "20px 17px",
        opacity: p,
        transform: `translateY(${(1 - p) * 55}px) scale(${0.92 + p * 0.08})`,
      }}
    >
      <div style={{ ...rtl, color: C.muted, fontSize: 17 }}>{title}</div>
      <div
        style={{
          ...rtl,
          color: accent,
          fontSize: 34,
          fontWeight: 900,
          marginTop: 12,
        }}
      >
        {value}
      </div>
      <div style={{ ...rtl, color: "#8EA6C2", fontSize: 13, marginTop: 7 }}>
        {sub}
      </div>
      <div
        style={{
          height: 3,
          borderRadius: 9,
          marginTop: 15,
          background: `linear-gradient(90deg,${accent},transparent)`,
          boxShadow: `0 0 14px ${accent}66`,
        }}
      />
    </GlassCard>
  );
};

const AttendanceChart: React.FC = () => {
  const frame = useCurrentFrame();
  const values = [35, 58, 46, 77, 63, 92, 72];

  return (
    <GlassCard style={{ padding: 22, marginTop: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ ...rtl, color: C.white, fontSize: 20, fontWeight: 800 }}>
          مؤشرات الحضور
        </div>
        <div style={{ color: C.green, fontSize: 15 }}>متابعة يومية</div>
      </div>
      <div
        style={{
          height: 160,
          display: "flex",
          alignItems: "end",
          gap: 15,
          paddingTop: 20,
        }}
      >
        {values.map((v, i) => {
          const p = interpolate(frame, [35 + i * 5, 85 + i * 5], [0, 1], clamp);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v * p}%`,
                minHeight: 3,
                borderRadius: "9px 9px 3px 3px",
                background:
                  "linear-gradient(180deg,#73E6F6 0%,#397DFF 100%)",
                boxShadow: "0 0 22px #397DFF55",
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        {["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map(
          (d) => (
            <span key={d} style={{ color: "#829AB5", fontSize: 12 }}>
              {d}
            </span>
          ),
        )}
      </div>
    </GlassCard>
  );
};


type AppIconName = "students" | "attendance" | "finance" | "staff";

const AppIcon: React.FC<{ name: AppIconName }> = ({ name }) => {
  const paths: Record<AppIconName, React.ReactNode> = {
    students: <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
    attendance: <>
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M8 2v4M16 2v4M3 10h18M8 15l2 2 5-5" />
    </>,
    finance: <>
      <rect x="3" y="5" width="18" height="15" rx="3" />
      <path d="M3 10h18M7 15h4M16 15h1M7 2v3M17 2v3" />
    </>,
    staff: <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 21v-2a6.5 6.5 0 0 1 13 0v2M17 5.5a3.5 3.5 0 0 1 0 6.8M18 15a5 5 0 0 1 3.5 4.8V21" />
    </>,
  };

  return (
    <svg viewBox="0 0 24 24" width="25" height="25"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const ModuleRow: React.FC<{
  icon: AppIconName;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 18, stiffness: 110 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "15px 17px",
        marginTop: 11,
        borderRadius: 17,
        background: "linear-gradient(100deg,#142943,#0B1B30)",
        border: "1px solid #FFFFFF0C",
        opacity: p,
        transform: `translateX(${(1 - p) * 75}px)`,
      }}
    >
      <div
        style={{
          width: 47,
          height: 47,
          borderRadius: 15,
          display: "grid",
          placeItems: "center",
          color: C.cyan,
          fontSize: 25,
          background: "#287BFF20",
          border: "1px solid #5CE1F233",
        }}
      >
        <AppIcon name={icon} />
      </div>
      <div style={{ ...rtl, flex: 1 }}>
        <div style={{ color: C.white, fontSize: 19, fontWeight: 800 }}>
          {title}
        </div>
        <div style={{ color: C.muted, fontSize: 14, marginTop: 4 }}>
          {description}
        </div>
      </div>
      <div style={{ color: C.cyan, fontSize: 25 }}>‹</div>
    </div>
  );
};

const AdminInterface: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + Math.sin(frame / 13) * 0.5;

  return (
    <div
      style={{
        width: 850,
        minHeight: 1110,
        padding: 25,
        boxSizing: "border-box",
        borderRadius: 32,
        background: "linear-gradient(145deg,#263C59,#0A1424 35%,#030812)",
        border: "2px solid #A6CFFF55",
        boxShadow:
          "0 55px 130px #000D, 0 0 75px #287DFF38, inset 0 1px #FFFFFF55",
        transform: "translateZ(30px)",
      }}
    >
      <div
        style={{
          borderRadius: 23,
          minHeight: 1060,
          padding: 27,
          boxSizing: "border-box",
          background: "#071426",
          border: "1px solid #FFFFFF13",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#8CA5C3", fontSize: 16 }}>09:41</div>
          <div style={{ color: C.green, fontSize: 14 }}>● النظام متصل</div>
        </div>

        <div style={{ ...rtl, marginTop: 28 }}>
          <div style={{ color: C.cyan, fontSize: 18, fontWeight: 800 }}>
            مركز الإدارة الذكية
          </div>
          <div style={{ color: C.white, fontSize: 42, fontWeight: 900, marginTop: 8 }}>
            كل شيء تحت السيطرة
          </div>
          <div style={{ color: C.muted, fontSize: 18, marginTop: 8 }}>
            إدارة الروضة من لوحة واحدة
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 25 }}>
          <Metric
            title="الطلاب"
            value="إدارة"
            sub="الملفات والسجلات"
            accent={C.cyan}
            delay={15}
          />
          <Metric
            title="الحضور"
            value="متابعة"
            sub="الحضور والغياب"
            accent={C.green}
            delay={27}
          />
        </div>

        <AttendanceChart />

        <div style={{ ...rtl, color: C.white, fontSize: 23, fontWeight: 900, marginTop: 28 }}>
          وحدات النظام
        </div>

        <ModuleRow icon="students" title="إدارة الطلاب" description="الملفات والبيانات والسجلات" delay={70} />
        <ModuleRow icon="attendance" title="الحضور والغياب" description="متابعة وتنظيم يومي" delay={83} />
        <ModuleRow icon="finance" title="الحسابات والاشتراكات" description="تنظيم المدفوعات والسجلات" delay={96} />
        <ModuleRow icon="staff" title="إدارة الكادر" description="الموظفون والصلاحيات" delay={109} />

        <div
          style={{
            marginTop: 22,
            padding: 17,
            borderRadius: 17,
            background: "#102A46",
            border: "1px solid #5CE1F233",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ ...rtl, color: C.white, fontSize: 18, fontWeight: 800 }}>
            منصة مدرستي
          </div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 20,
              background: C.cyan,
              opacity: pulse,
              boxShadow: `0 0 ${12 + pulse * 18}px ${C.cyan}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [25, 115], [70, 0], clamp);
  const opacity = interpolate(frame, [20, 70], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.bg }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 35%, #18385B 0%, #09182D 48%, #020711 100%)",
        }}
      >
        <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="schoolWall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#294C70" />
              <stop offset="1" stopColor="#09182B" />
            </linearGradient>
            <linearGradient id="schoolGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#70DDF2" stopOpacity=".8" />
              <stop offset="1" stopColor="#397DFF" stopOpacity=".12" />
            </linearGradient>
            <filter id="schoolGlow">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <circle cx="540" cy="700" r="330" fill="#397DFF" opacity=".12" filter="url(#schoolGlow)" />
          <path d="M0 1250 L540 1000 L1080 1250 V1920 H0Z" fill="#071323" />
          <path d="M120 790 L540 510 L960 790 V1450 H120Z" fill="url(#schoolWall)" stroke="#52799E" strokeOpacity=".55" strokeWidth="5" />
          <path d="M80 800 L540 475 L1000 800" fill="none" stroke="#E6BD78" strokeWidth="12" opacity=".8" />
          <rect x="430" y="570" width="220" height="105" rx="12" fill="#102C49" stroke="#E6BD78" strokeWidth="4" />
          <text x="540" y="638" textAnchor="middle" fill="#F7FAFF" fontSize="42" fontWeight="bold">مدرستي</text>
          <rect x="205" y="835" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="380" y="835" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="555" y="835" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="730" y="835" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="205" y="1010" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="380" y="1010" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="555" y="1010" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="730" y="1010" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="205" y="1185" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="380" y="1185" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="555" y="1185" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" /><rect x="730" y="1185" width="105" height="112" rx="8" fill="url(#schoolGlass)" stroke="#75CFE8" strokeOpacity=".5" strokeWidth="3" />
          <rect x="465" y="1240" width="150" height="210" rx="70" fill="#071323" stroke="#E6BD78" strokeWidth="5" />
          <path d="M0 1500 Q540 1390 1080 1500 V1920 H0Z" fill="#030914" />
          <path d="M0 1630 Q540 1510 1080 1630" stroke="#5CE1F2" strokeOpacity=".4" strokeWidth="5" fill="none" />
          <path d="M0 1770 Q540 1650 1080 1770" stroke="#E6BD78" strokeOpacity=".18" strokeWidth="3" fill="none" />
        </svg>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#02071322 0%,#02071300 35%,#020713AA 100%)" }} />
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,#02071355,#02071322 30%,#020713EE 100%)",
        }}
      />
      <Particles count={24} color={C.gold} />
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 65,
          right: 65,
          ...rtl,
          color: C.white,
          textAlign: "center",
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <Eyebrow>THE NEXT ERA OF EDUCATION</Eyebrow>
        <div
          style={{
            fontSize: 79,
            lineHeight: 1.5,
            fontWeight: 900,
            marginTop: 28,
            textShadow: "0 10px 50px #000",
          }}
        >
          إدارة تصنع
          <br />
          فرقاً كل يوم
        </div>
        <div style={{ color: "#D5E4F5", fontSize: 27, marginTop: 28 }}>
          عالم المدرسة... في تجربة واحدة
        </div>
      </div>
    </AbsoluteFill>
  );
};

const AdminWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 17, stiffness: 65, mass: 1.1 },
  });
  const cameraX = interpolate(frame, [0, 170, 430, 700, 900], [90, 0, -28, 20, -70], clamp);
  const cameraScale = interpolate(frame, [0, 100, 500, 850, 900], [0.72, 0.94, 1.06, 1.14, 0.96], clamp);
  const turn = interpolate(frame, [0, 150, 500, 900], [13, 0, -3, 8], clamp);
  const titleOpacity = interpolate(frame, [0, 50, 125, 165], [0, 1, 1, 0], clamp);
  const detailOpacity = interpolate(frame, [130, 190, 850, 900], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <CinematicBackground />

      <div
        style={{
          position: "absolute",
          top: 135,
          left: 55,
          right: 55,
          textAlign: "center",
          ...rtl,
          color: C.white,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleOpacity) * 35}px)`,
        }}
      >
        <Eyebrow>ONE POWERFUL CONTROL CENTER</Eyebrow>
        <div style={{ fontSize: 66, fontWeight: 900, marginTop: 18 }}>
          إدارة مدرستك...
        </div>
        <div style={{ color: C.cyan, fontSize: 48, fontWeight: 800, marginTop: 4 }}>
          برؤية أوضح
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 390,
          left: "50%",
          transform: `translateX(-50%) perspective(1800px) translateX(${cameraX}px) rotateY(${turn}deg) scale(${cameraScale * enter})`,
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 45px 75px #000C)",
        }}
      >
        <AdminInterface />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 55,
          right: 55,
          textAlign: "center",
          ...rtl,
          opacity: detailOpacity,
          transform: `translateY(${(1 - detailOpacity) * 25}px)`,
        }}
      >
        <div style={{ color: C.white, fontSize: 31, fontWeight: 900 }}>
          كل أقسام الروضة... مترابطة
        </div>
        <div style={{ color: C.muted, fontSize: 20, marginTop: 13 }}>
          الطلاب • الحضور • الحسابات • الكادر
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BusWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [25, 250], [0, 1], clamp);
  const x = interpolate(progress, [0, 1], [80, 550]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 35%, #173B59 0%, #08182C 52%, #020711 100%)",
        }}
      >
        <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="busBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F5C96F" />
              <stop offset="1" stopColor="#C77A2D" />
            </linearGradient>
            <filter id="busGlow">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>
          <circle cx="530" cy="1050" r="390" fill="#397DFF" opacity=".13" filter="url(#busGlow)" />
          <path d="M-200 0 L80 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M-40 0 L240 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M120 0 L400 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M280 0 L560 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M440 0 L720 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M600 0 L880 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M760 0 L1040 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" /><path d="M920 0 L1200 950" stroke="#5CE1F2" strokeOpacity=".10" strokeWidth="3" />
          <g opacity=".72"><rect x="-20" y="650" width="115" height="330" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="5" y="680" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="55" y="680" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="145" y="560" width="115" height="420" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="170" y="590" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="220" y="590" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="310" y="470" width="115" height="510" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="335" y="500" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="385" y="500" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="475" y="650" width="115" height="330" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="500" y="680" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="550" y="680" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="640" y="560" width="115" height="420" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="665" y="590" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="715" y="590" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="805" y="470" width="115" height="510" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="830" y="500" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="880" y="500" width="28" height="38" fill="#E6BD78" opacity=".35" /></g><g opacity=".72"><rect x="970" y="650" width="115" height="330" fill="#102943" stroke="#315577" strokeWidth="3" /><rect x="995" y="680" width="28" height="38" fill="#5CE1F2" opacity=".35" /><rect x="1045" y="680" width="28" height="38" fill="#E6BD78" opacity=".35" /></g>
          <path d="M0 1170 Q540 1030 1080 1170 V1920 H0Z" fill="#050D19" />
          <path d="M0 1430 Q540 1280 1080 1430" fill="none" stroke="#5CE1F2" strokeOpacity=".35" strokeWidth="6" />
          <path d="M0 1590 Q540 1450 1080 1590" fill="none" stroke="#E6BD78" strokeOpacity=".2" strokeWidth="4" />
          <path d="M470 1920 L525 1320 L555 1320 L650 1920" fill="#15263A" opacity=".8" />
          <path d="M535 1800 L548 1640 M545 1530 L550 1430" stroke="#E6BD78" strokeWidth="9" strokeDasharray="45 35" opacity=".8" />
          <g transform={`translate(${x},0)`}>
            <ellipse cx="250" cy="1300" rx="220" ry="45" fill="#000" opacity=".55" />
            <rect x="55" y="1035" width="390" height="230" rx="48" fill="url(#busBody)" stroke="#FFE0A0" strokeWidth="7" />
            <path d="M85 1065 Q85 1050 110 1050 H400 Q420 1050 420 1075 V1155 H85Z" fill="#15334C" />
            <rect x="110" y="1070" width="75" height="65" rx="9" fill="#70DDF2" opacity=".8" />
            <rect x="200" y="1070" width="75" height="65" rx="9" fill="#70DDF2" opacity=".8" />
            <rect x="290" y="1070" width="75" height="65" rx="9" fill="#70DDF2" opacity=".8" />
            <rect x="390" y="1155" width="30" height="48" rx="8" fill="#FFF1B8" />
            <rect x="70" y="1170" width="25" height="42" rx="8" fill="#F87171" />
            <text x="250" y="1225" textAnchor="middle" fill="#14243A" fontSize="37" fontWeight="900">مدرستي</text>
            <circle cx="145" cy="1270" r="42" fill="#101B2B" stroke="#8DA5BC" strokeWidth="9" />
            <circle cx="360" cy="1270" r="42" fill="#101B2B" stroke="#8DA5BC" strokeWidth="9" />
          </g>
        </svg>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#02071355 0%,#02071300 35%,#020713CC 100%)" }} />
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,#020713CC 0%,#06132666 45%,#020713EE 100%)",
        }}
      />
      <Particles count={20} />

      <div style={{ position: "absolute", top: 170, left: 55, right: 55, ...rtl, color: C.white }}>
        <Eyebrow>LIVE BUS EXPERIENCE</Eyebrow>
        <div style={{ fontSize: 67, fontWeight: 900, marginTop: 18 }}>
          الطريق... أصبح أوضح
        </div>
        <div style={{ color: "#D0E1F5", fontSize: 27, marginTop: 13 }}>
          تابع موقع الحافلة مباشرة أثناء الرحلة
        </div>
      </div>

      <GlassCard
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 190,
          padding: 25,
          background: "#071629ED",
          borderColor: "#5CE1F255",
        }}
      >
        <div style={{ ...rtl, color: C.white, fontSize: 24, fontWeight: 900 }}>
          التتبع المباشر للحافلة
        </div>
        <div style={{ ...rtl, color: C.muted, fontSize: 16, marginTop: 8 }}>
          موقع الحافلة على الخريطة
        </div>
        <svg viewBox="0 0 600 330" width="100%" height="330" style={{ marginTop: 18 }}>
          <path
            d="M0 65 H600 M0 160 H600 M0 260 H600 M80 0 V330 M210 0 V330 M350 0 V330 M500 0 V330"
            stroke="#344D69"
            strokeWidth="15"
            fill="none"
          />
          <path
            d="M0 65 H600 M0 160 H600 M0 260 H600 M80 0 V330 M210 0 V330 M350 0 V330 M500 0 V330"
            stroke="#7188A2"
            strokeWidth="2"
            strokeDasharray="8 14"
            fill="none"
          />
          <path
            d="M65 260 C140 260 125 160 220 160 S315 65 390 65 S475 160 540 160"
            stroke={C.cyan}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="15 13"
            strokeDashoffset={-frame * 2}
            fill="none"
          />
          <circle cx="65" cy="260" r="12" fill={C.green} />
          <circle cx="540" cy="160" r="18" fill={C.gold} />
          <circle
            cx="540"
            cy="160"
            r={29 + Math.sin(frame / 8) * 5}
            stroke={C.gold}
            strokeWidth="3"
            opacity=".55"
            fill="none"
          />
          <g transform={`translate(${x},${260 - progress * 100})`}>
            <rect x="-30" y="-21" width="60" height="39" rx="10" fill={C.gold} />
            <rect x="-17" y="-14" width="17" height="12" rx="3" fill="#14243A" />
            <rect x="5" y="-14" width="17" height="12" rx="3" fill="#14243A" />
            <circle cx="-17" cy="20" r="7" fill="#DCE8F5" />
            <circle cx="18" cy="20" r="7" fill="#DCE8F5" />
          </g>
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ ...rtl, color: C.muted, fontSize: 17 }}>حالة الرحلة</div>
          <div style={{ ...rtl, color: C.green, fontSize: 18, fontWeight: 800 }}>
            ● الباص يتحرك
          </div>
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};

const ParentWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const p = spring({ frame: frame - 20, fps: 30, config: { damping: 16 } });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 40%,#1C3B60 0%,#08172B 52%,#02060D 100%)",
      }}
    >
      <Particles count={28} color={C.gold} />
      <div
        style={{
          position: "absolute",
          top: 235,
          left: 60,
          right: 60,
          textAlign: "center",
          ...rtl,
          color: C.white,
        }}
      >
        <Eyebrow>CONNECTED WITH YOUR SCHOOL</Eyebrow>
        <div style={{ fontSize: 66, fontWeight: 900, marginTop: 24 }}>
          راحة الأهل...
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: C.gold }}>
          تبدأ بالاطمئنان
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 680,
          left: "50%",
          transform: `translateX(-50%) perspective(1200px) rotateY(-9deg) scale(${p})`,
          width: 520,
          height: 720,
          borderRadius: 60,
          padding: 17,
          boxSizing: "border-box",
          background: "linear-gradient(145deg,#8195AB,#101B2B 35%,#02050B)",
          border: "2px solid #B8D7F477",
          boxShadow: "0 50px 100px #000C,0 0 70px #287DFF33",
        }}
      >
        <div style={{ background: "#071426", borderRadius: 43, height: "100%", padding: 28, boxSizing: "border-box" }}>
          <div style={{ color: C.muted, fontSize: 15 }}>9:41</div>
          <div style={{ ...rtl, color: C.cyan, fontSize: 19, fontWeight: 800, marginTop: 45 }}>
            مدرستي
          </div>
          <div style={{ ...rtl, color: C.white, fontSize: 33, fontWeight: 900, marginTop: 12 }}>
            متابعة طفلك
          </div>
          <GlassCard style={{ padding: 22, marginTop: 32 }}>
            <div style={{ ...rtl, color: C.white, fontSize: 22, fontWeight: 800 }}>
              حالة الحافلة
            </div>
            <div style={{ ...rtl, color: C.green, fontSize: 19, marginTop: 15 }}>
              ● الرحلة جارية
            </div>
            <div style={{ height: 4, borderRadius: 9, background: "#243D59", marginTop: 20 }}>
              <div style={{ width: `${Math.min(100, progressValue(frame))}%`, height: 4, borderRadius: 9, background: C.cyan }} />
            </div>
          </GlassCard>
          <GlassCard style={{ padding: 22, marginTop: 18 }}>
            <div style={{ ...rtl, color: C.white, fontSize: 21, fontWeight: 800 }}>
              التواصل مع الروضة
            </div>
            <div style={{ ...rtl, color: C.muted, fontSize: 16, marginTop: 12 }}>
              متابعة معلومات طفلك من مكان واحد
            </div>
          </GlassCard>
          <div style={{ ...rtl, color: "#8CA5C3", fontSize: 15, marginTop: 28 }}>
            تجربة أقرب بين الأسرة والمدرسة
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const progressValue = (frame: number) =>
  interpolate(frame, [0, 180], [12, 88], clamp);

const BrandEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 15, stiffness: 65 } });
  const glow = 22 + Math.sin(frame / 8) * 12;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 42%,#24466D 0%,#091629 48%,#02050B 100%)",
      }}
    >
      <Particles count={60} color={C.gold} />
      {[650, 850, 1050, 1250].map((size, i) => (
        <div
          key={size}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid ${i % 2 ? "#5CE1F233" : "#E6BD7844"}`,
            transform: `scale(${1 + Math.sin(frame / (18 + i * 4)) * 0.025}) rotate(${frame * (i + 1) * 0.06}deg)`,
          }}
        />
      ))}
      <div
        style={{
          opacity: p,
          transform: `scale(${0.75 + p * 0.25})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("madrasati-logo.png")}
          style={{
            width: 390,
            height: 390,
            objectFit: "contain",
            filter: `drop-shadow(0 0 ${glow}px #E6BD78AA)`,
          }}
        />
        <div style={{ ...rtl, color: C.white, fontSize: 100, fontWeight: 900, marginTop: 5 }}>
          مدرستي
        </div>
        <div style={{ ...rtl, color: C.gold, fontSize: 31, fontWeight: 800, marginTop: 20 }}>
          إدارة مدرسية ذكية
        </div>
        <div
          style={{
            width: 210,
            height: 3,
            marginTop: 38,
            background: C.cyan,
            boxShadow: `0 0 25px ${C.cyan}`,
          }}
        />
        <div style={{ ...rtl, color: "#DCE8F5", fontSize: 25, marginTop: 30 }}>
          كل تفاصيل المدرسة... في مكان واحد
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MadrasatiGlobalFilm: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Audio
      src={staticFile("audio/madrasati-cinematic.mp3")}
      volume={(frame) =>
        interpolate(
          frame,
          [0, 45, 1710, 1800],
          [0, 0.65, 0.65, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      }
    />
    <Sequence from={0} durationInFrames={150}>
      <Opening />
    </Sequence>
    <Sequence from={150} durationInFrames={900}>
      <AdminWorld />
    </Sequence>
    <Sequence from={1050} durationInFrames={300}>
      <BusWorld />
    </Sequence>
    <Sequence from={1350} durationInFrames={180}>
      <ParentWorld />
    </Sequence>
    <Sequence from={1530} durationInFrames={270}>
      <BrandEnding />
    </Sequence>
  </AbsoluteFill>
);
