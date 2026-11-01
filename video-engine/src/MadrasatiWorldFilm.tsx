import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";

const C = {
  navy: "#050B16",
  blue: "#267BFF",
  cyan: "#50DDF5",
  gold: "#E9BD70",
  white: "#FFFFFF",
};

const rtl: React.CSSProperties = {
  direction: "rtl",
  fontFamily: '"Noto Sans Arabic", Arial, sans-serif',
};

const fade = (frame: number, duration: number) =>
  interpolate(
    frame,
    [0, 20, duration - 20, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

const VideoScene: React.FC<{
  src: string;
  duration: number;
  children?: React.ReactNode;
}> = ({ src, duration, children }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, duration], [1.02, 1.15], {
    extrapolateRight: "clamp",
  });
  const opacity = fade(frame, duration);

  return (
    <AbsoluteFill style={{ backgroundColor: C.navy, opacity, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          filter: "saturate(1.12) contrast(1.08)",
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #03091633 0%, #03091600 35%, #030916BB 100%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const titleY = interpolate(frame, [45, 95], [90, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const titleOpacity = interpolate(frame, [45, 85], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <VideoScene src="worldfilm/01-school.mp4" duration={270}>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 65,
          right: 65,
          ...rtl,
          color: C.white,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: C.gold,
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          THE FUTURE STARTS HERE
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.45,
            textShadow: "0 8px 35px #000A",
          }}
        >
          لكل حلم...
          <br />
          مدرسة تصنع الفرق
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 115,
          left: 65,
          right: 65,
          height: 3,
          background: "#FFFFFF55",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, (frame / 270) * 100)}%`,
            background: C.gold,
            boxShadow: `0 0 18px ${C.gold}`,
          }}
        />
      </div>
    </VideoScene>
  );
};

const MiniStat: React.FC<{
  label: string;
  value: string;
  accent?: string;
}> = ({ label, value, accent = C.blue }) => (
  <div
    style={{
      background: "#14243A",
      border: "1px solid #FFFFFF12",
      borderRadius: 18,
      padding: "17px 18px",
      flex: 1,
      minWidth: 0,
    }}
  >
    <div style={{ ...rtl, color: "#A9BBD1", fontSize: 17 }}>{label}</div>
    <div
      style={{
        ...rtl,
        color: accent,
        fontSize: 34,
        fontWeight: 900,
        marginTop: 8,
      }}
    >
      {value}
    </div>
  </div>
);

const DashboardScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [40, 190], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const cardY = interpolate(frame, [20, 65], [55, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        width: 440,
        height: 850,
        borderRadius: 48,
        padding: 17,
        boxSizing: "border-box",
        background: "linear-gradient(145deg, #526176, #111827 35%, #02050A)",
        border: "2px solid #AFC8E477",
        boxShadow: "0 55px 100px #000C, 0 0 55px #267BFF44",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background: "#081426",
          padding: "30px 23px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#AFC3DA", fontSize: 15 }}>
          <span>9:41</span>
          <span>● ● ●</span>
        </div>
        <div style={{ ...rtl, color: C.white, marginTop: 34 }}>
          <div style={{ color: C.cyan, fontSize: 17, fontWeight: 700 }}>لوحة الإدارة</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>أهلاً بعودتك</div>
          <div style={{ color: "#AFC3DA", fontSize: 17, marginTop: 7 }}>مدرستك... تحت السيطرة</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 30,
            opacity: progress,
            transform: `translateY(${cardY}px)`,
          }}
        >
          <MiniStat label="الطلاب" value="١٢٨" accent={C.cyan} />
          <MiniStat label="الحضور" value="٩٦٪" accent="#6BE0A5" />
        </div>

        <div
          style={{
            marginTop: 18,
            borderRadius: 22,
            padding: 20,
            background: "linear-gradient(135deg, #173D69, #10223B)",
            border: "1px solid #52DDF533",
            opacity: progress,
            transform: `translateY(${cardY * 0.6}px)`,
          }}
        >
          <div style={{ ...rtl, color: "#B9D9F4", fontSize: 17 }}>متابعة الحضور اليومي</div>
          <div style={{ display: "flex", alignItems: "end", gap: 8, height: 105, marginTop: 15 }}>
            {[42, 67, 53, 88, 72, 100, 81].map((height, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${height * progress}%`,
                  borderRadius: 8,
                  background: `linear-gradient(180deg, ${C.cyan}, #267BFF)`,
                  boxShadow: "0 0 14px #267BFF44",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ ...rtl, color: C.white, fontSize: 20, fontWeight: 800, marginTop: 26 }}>
          إدارة متكاملة
        </div>
        {[
          ["♙", "إدارة الطلاب", "ملفات وسجلات"],
          ["✓", "الحضور والغياب", "متابعة يومية"],
          ["▣", "الحسابات", "تنظيم المدفوعات"],
        ].map(([symbol, title, desc], i) => (
          <div
            key={title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              marginTop: 13,
              padding: 13,
              borderRadius: 16,
              background: "#14243A",
              opacity: interpolate(frame, [65 + i * 18, 95 + i * 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div style={{ color: C.cyan, fontSize: 27, width: 35, textAlign: "center" }}>{symbol}</div>
            <div style={{ ...rtl, flex: 1 }}>
              <div style={{ color: C.white, fontSize: 17, fontWeight: 800 }}>{title}</div>
              <div style={{ color: "#8EA5C0", fontSize: 14, marginTop: 4 }}>{desc}</div>
            </div>
            <div style={{ color: C.cyan, fontSize: 20 }}>‹</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhoneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 100, 220], [18, -7, 0], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 45, 100], [0.68, 1.04, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = fade(frame, 270);

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 42%, #153B67 0%, #08182C 42%, #030812 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          border: "1px solid #52DDF533",
          left: "50%",
          top: "43%",
          transform: `translate(-50%, -50%) rotate(${frame * 0.12}deg)`,
          boxShadow: "0 0 100px #267BFF22",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 65,
          right: 65,
          ...rtl,
          color: C.white,
          textAlign: "center",
        }}
      >
        <div style={{ color: C.cyan, fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>
          ONE SMART PLATFORM
        </div>
        <div style={{ fontSize: 58, fontWeight: 900, marginTop: 18 }}>
          كل تفاصيل المدرسة
        </div>
        <div style={{ fontSize: 34, color: "#B8CBE0", marginTop: 8 }}>
          في تجربة واحدة
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 590,
          left: "50%",
          transform: `translateX(-50%) perspective(1500px) rotateY(${rotation}deg) rotateX(5deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        <DashboardScreen />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 115,
          left: 65,
          right: 65,
          ...rtl,
          textAlign: "center",
          color: "#D9E8F7",
          fontSize: 25,
        }}
      >
        إدارة الطلاب • الحضور • الحسابات • المتابعة
      </div>
    </AbsoluteFill>
  );
};

const GpsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [30, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = fade(frame, 270);
  const busX = interpolate(progress, [0, 1], [0, 430]);

  return (
    <VideoScene src="worldfilm/03-bus.mp4" duration={270}>
      <div
        style={{
          position: "absolute",
          top: 145,
          left: 55,
          right: 55,
          ...rtl,
          color: C.white,
          textShadow: "0 4px 25px #000",
        }}
      >
        <div style={{ color: C.gold, fontSize: 22, fontWeight: 800 }}>LIVE GPS TRACKING</div>
        <div style={{ fontSize: 62, fontWeight: 900, marginTop: 15 }}>رحلة الباص أمامك</div>
        <div style={{ fontSize: 27, color: "#E0EAF6", marginTop: 12 }}>
          شاهد موقع الباص مباشرة أثناء الرحلة
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 185,
          left: 45,
          right: 45,
          height: 490,
          borderRadius: 35,
          padding: 25,
          background: "#071629E8",
          border: "1px solid #52DDF566",
          boxShadow: "0 25px 80px #0009, 0 0 40px #267BFF33",
          opacity,
          transform: `translateY(${(1 - opacity) * 90}px)`,
        }}
      >
        <div style={{ ...rtl, color: C.white, fontSize: 25, fontWeight: 900 }}>
          تتبع الحافلة المدرسية
        </div>
        <div style={{ ...rtl, color: "#9FB5CE", fontSize: 16, marginTop: 7 }}>
          الموقع المباشر على الخريطة
        </div>
        <svg viewBox="0 0 600 300" width="100%" height="300" style={{ marginTop: 15 }}>
          <path d="M0 75 H600 M0 155 H600 M0 235 H600 M90 0 V300 M220 0 V300 M360 0 V300 M500 0 V300" stroke="#29415E" strokeWidth="12" fill="none" />
          <path d="M0 75 H600 M0 155 H600 M0 235 H600 M90 0 V300 M220 0 V300 M360 0 V300 M500 0 V300" stroke="#405873" strokeWidth="2" strokeDasharray="9 12" fill="none" />
          <path
            d="M65 235 C130 235 125 155 220 155 S300 75 390 75 S465 155 540 155"
            stroke="#52DDF5"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="12 12"
            strokeDashoffset={-frame * 2}
            fill="none"
          />
          <circle cx="65" cy="235" r="13" fill="#6BE0A5" />
          <circle cx="540" cy="155" r="16" fill={C.gold} />
          <circle cx="540" cy="155" r="29" stroke={C.gold} strokeWidth="3" opacity={0.5 + Math.sin(frame / 8) * 0.3} fill="none" />
          <g transform={`translate(${65 + busX}, ${235 - progress * 80 - Math.sin(progress * Math.PI) * 80})`}>
            <rect x="-24" y="-17" width="48" height="34" rx="8" fill={C.gold} />
            <rect x="-13" y="-12" width="15" height="11" rx="2" fill="#10243A" />
            <rect x="5" y="-12" width="12" height="11" rx="2" fill="#10243A" />
            <circle cx="-13" cy="18" r="5" fill="#DCE8F5" />
            <circle cx="14" cy="18" r="5" fill="#DCE8F5" />
          </g>
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <div style={{ ...rtl, color: "#9FB5CE", fontSize: 16 }}>حالة الرحلة</div>
          <div style={{ ...rtl, color: "#6BE0A5", fontSize: 17, fontWeight: 800 }}>● الباص يتحرك</div>
        </div>
      </div>
    </VideoScene>
  );
};

const FamilyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 270);
  const lift = interpolate(frame, [35, 95], [65, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <VideoScene src="worldfilm/04-family.mp4" duration={270}>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 60,
          right: 60,
          ...rtl,
          color: C.white,
          opacity,
          transform: `translateY(${lift}px)`,
          textShadow: "0 5px 25px #000A",
        }}
      >
        <div style={{ color: C.gold, fontSize: 22, fontWeight: 800 }}>A CLOSER CONNECTION</div>
        <div style={{ fontSize: 66, fontWeight: 900, marginTop: 18, lineHeight: 1.5 }}>
          لأن راحة الأهل
          <br />
          تبدأ بالاطمئنان
        </div>
        <div style={{ fontSize: 28, color: "#E0EAF6", marginTop: 18 }}>
          تواصل ومتابعة أقرب بين الأسرة والمدرسة
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
          borderRadius: 24,
          padding: 22,
          background: "#071629DD",
          border: "1px solid #FFFFFF33",
          opacity,
          transform: `translateY(${lift}px)`,
        }}
      >
        <div style={{ ...rtl, color: C.cyan, fontSize: 18, fontWeight: 800 }}>مدرستي</div>
        <div style={{ ...rtl, color: C.white, fontSize: 25, fontWeight: 800, marginTop: 8 }}>
          مدرستك أقرب إليك
        </div>
      </div>
    </VideoScene>
  );
};

const BrandEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 90], [0.65, 1], {
    extrapolateRight: "clamp",
  });
  const glow = 25 + Math.sin(frame / 9) * 12;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 42%, #17395D 0%, #091629 48%, #030812 100%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {[760, 940, 1120].map((size, i) => (
        <div
          key={size}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid ${i % 2 ? "#52DDF533" : "#E9BD7044"}`,
            transform: `scale(${1 + Math.sin(frame / (20 + i * 5)) * 0.025}) rotate(${frame * (i + 1) * 0.08}deg)`,
          }}
        />
      ))}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("madrasati-logo.png")}
          style={{
            width: 370,
            height: 370,
            objectFit: "contain",
            filter: `drop-shadow(0 0 ${glow}px #E9BD7088)`,
          }}
        />
        <div style={{ ...rtl, color: C.white, fontSize: 92, fontWeight: 900, marginTop: 10 }}>
          مدرستي
        </div>
        <div style={{ ...rtl, color: C.gold, fontSize: 31, fontWeight: 800, marginTop: 20 }}>
          إدارة مدرسية ذكية
        </div>
        <div
          style={{
            width: 190,
            height: 3,
            background: C.cyan,
            marginTop: 40,
            boxShadow: `0 0 25px ${C.cyan}`,
          }}
        />
        <div style={{ ...rtl, color: "#D7E5F5", fontSize: 25, marginTop: 30 }}>
          كل تفاصيل المدرسة... في مكان واحد
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MadrasatiWorldFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.navy }}>
    <Sequence from={0} durationInFrames={270}>
      <Opening />
    </Sequence>
    <Sequence from={270} durationInFrames={270}>
      <PhoneReveal />
    </Sequence>
    <Sequence from={540} durationInFrames={270}>
      <GpsScene />
    </Sequence>
    <Sequence from={810} durationInFrames={270}>
      <FamilyScene />
    </Sequence>
    <Sequence from={1080} durationInFrames={270}>
      <BrandEnding />
    </Sequence>
  </AbsoluteFill>
);
