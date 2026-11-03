import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const TOTAL = 2360;

const colors = {
  navy: "#030916",
  white: "#F7FAFF",
  cyan: "#62DDF5",
  muted: "#C5D2E5",
};

const rtl: React.CSSProperties = {
  direction: "rtl",
  fontFamily: '"Noto Sans Arabic", Arial, sans-serif',
};

const Shot: React.FC<{
  src: string;
  title: string;
  subtitle: string;
  durationInFrames: number;
  tag?: string;
}> = ({ src, title, subtitle, durationInFrames, tag = "MADRASATI | مدرستي" }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 18, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rise = interpolate(frame, [0, 30], [45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navy, overflow: "hidden", opacity }}>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(1,7,17,.12) 0%, rgba(1,7,17,.04) 35%, rgba(1,7,17,.86) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: "0 64px 190px",
          ...rtl,
        }}
      >
        <div
          style={{
            color: colors.cyan,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          {tag}
        </div>

        <div
          style={{
            color: colors.white,
            fontSize: 57,
            fontWeight: 800,
            lineHeight: 1.45,
            textShadow: "0 5px 25px rgba(0,0,0,.5)",
            transform: `translateY(${rise}px)`,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: colors.muted,
            fontSize: 27,
            lineHeight: 1.7,
            marginTop: 22,
            maxWidth: 850,
            transform: `translateY(${rise}px)`,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            width: 120,
            height: 4,
            borderRadius: 10,
            background: colors.cyan,
            marginTop: 34,
            boxShadow: "0 0 22px rgba(98,221,245,.7)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BrandEnding: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [15, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [15, 75], [0.72, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [75, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 42%, #17365D 0%, #08172B 48%, #020610 100%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 850,
          height: 850,
          borderRadius: "50%",
          border: "1px solid rgba(98,221,245,.18)",
          boxShadow: "0 0 100px rgba(57,125,255,.15)",
        }}
      />

      <Img
        src={staticFile("madrasati-logo.png")}
        style={{
          width: 470,
          height: 470,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          filter: "drop-shadow(0 20px 45px rgba(0,0,0,.4))",
        }}
      />

      <div
        style={{
          ...rtl,
          textAlign: "center",
          opacity: textOpacity,
          marginTop: 35,
        }}
      >
        <div
          style={{
            color: colors.white,
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          مدرستي
        </div>
        <div
          style={{
            color: colors.cyan,
            fontSize: 27,
            marginTop: 22,
            letterSpacing: 3,
          }}
        >
          مستقبل التعليم يبدأ هنا
        </div>
        <div
          style={{
            color: "#9CB0C9",
            fontSize: 18,
            marginTop: 42,
            letterSpacing: 5,
          }}
        >
          MADRASATI
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MadrasatiMasterFilm: React.FC = () => {
  const frame = useCurrentFrame();

  const musicVolume = (f: number) =>
    interpolate(f, [0, 90, 2200, 2360], [0, 0.19, 0.19, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const voiceVolume = (f: number) =>
    interpolate(f, [0, 8, 2320, 2360], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const globalFade = interpolate(
    frame,
    [0, 20, TOTAL - 35, TOTAL],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navy, opacity: globalFade }}>
      <Audio
        src={staticFile("audio/new/madrasati-hopeful-orchestral.mp3")}
        volume={musicVolume}
      />

      <Audio
        src={staticFile("audio/new/madrasati-voice.mp3")}
        volume={voiceVolume}
      />

      <Sequence from={0} durationInFrames={300}>
        <Shot durationInFrames={300}
          src="stock-footage/madrasati/school_entrance.mp4"
          title="التعليم يتجاوز حدود الفصل"
          subtitle="عالم يتسارع فيه التطور... وتجربة تصنع المستقبل"
        />
      </Sequence>

      <Sequence from={282} durationInFrames={288}>
        <Shot durationInFrames={288}
          src="stock-footage/madrasati-new/classroom-students-4k.mp4"
          title="من هنا تأتي مدرستي"
          subtitle="منصة ذكية تجمع المدرسة والمعلمين والطلاب وأولياء الأمور"
        />
      </Sequence>

      <Sequence from={552} durationInFrames={348}>
        <Shot durationInFrames={348}
          src="stock-footage/madrasati/teacher_classroom.mp4"
          title="إدارة مدرسية أكثر كفاءة"
          subtitle="تنظيم ومتابعة للعملية التعليمية ضمن منظومة واحدة"
        />
      </Sequence>

      <Sequence from={882} durationInFrames={318}>
        <Shot durationInFrames={318}
          src="stock-footage/madrasati/teacher_students.mp4"
          title="متابعة أكاديمية متكاملة"
          subtitle="حضور وغياب، امتحانات ودرجات، سجلات وواجبات"
        />
      </Sequence>

      <Sequence from={1182} durationInFrames={408}>
        <Shot durationInFrames={408}
          src="stock-footage/madrasati/parent_phone.mp4"
          title="الأسرة أقرب إلى أبنائها"
          subtitle="تواصل مباشر ومتابعة مستمرة للرحلة التعليمية"
        />
      </Sequence>

      <Sequence from={1572} durationInFrames={327}>
        <Shot durationInFrames={327}
          src="stock-footage/madrasati/school_bus.mp4"
          title="اطمئنان يمتد إلى الطريق"
          subtitle="متابعة الحافلات المدرسية عبر نظام تحديد المواقع GPS"
        />
      </Sequence>

      <Sequence from={1881} durationInFrames={198}>
        <Shot durationInFrames={198}
          src="stock-footage/madrasati/classroom_4k.mp4"
          title="كل الإمكانيات"
          subtitle="تجتمع في تجربة تعليمية واحدة"
        />
      </Sequence>

      <Sequence from={2061} durationInFrames={299}>
        <BrandEnding />
      </Sequence>
    </AbsoluteFill>
  );
};
