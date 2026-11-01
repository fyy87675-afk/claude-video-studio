import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const floors = [-3, 0, 3];
const windowXs = [-7.2, -4.8, -2.4, 0, 2.4, 4.8, 7.2];

const WindowUnit: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <group position={[x, y, 5.12]}>
    <mesh castShadow>
      <boxGeometry args={[1.65, 1.95, 0.16]} />
      <meshStandardMaterial color="#182D42" metalness={0.75} roughness={0.22} />
    </mesh>
    <mesh position={[0, 0, 0.1]}>
      <boxGeometry args={[1.43, 1.72, 0.035]} />
      <meshStandardMaterial
        color="#397D9B"
        metalness={0.8}
        roughness={0.12}
        emissive="#17435C"
        emissiveIntensity={0.35}
      />
    </mesh>
    <mesh position={[0, 0, 0.14]}>
      <boxGeometry args={[0.045, 1.75, 0.04]} />
      <meshStandardMaterial color="#B8C8D0" metalness={0.8} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0, 0.14]}>
      <boxGeometry args={[1.45, 0.045, 0.04]} />
      <meshStandardMaterial color="#B8C8D0" metalness={0.8} roughness={0.25} />
    </mesh>
  </group>
);

const Tree: React.FC<{ x: number; z: number; scale: number }> = ({ x, z, scale }) => (
  <group position={[x, -4.5, z]} scale={scale}>
    <mesh position={[0, 1.3, 0]} castShadow>
      <cylinderGeometry args={[0.18, 0.28, 2.6, 10]} />
      <meshStandardMaterial color="#493A2C" roughness={0.95} />
    </mesh>
    <mesh position={[0, 3.1, 0]} castShadow>
      <icosahedronGeometry args={[1.25, 2]} />
      <meshStandardMaterial color="#244D3D" roughness={0.92} />
    </mesh>
    <mesh position={[0.55, 3.6, 0.1]} castShadow>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial color="#32664B" roughness={0.9} />
    </mesh>
  </group>
);

const SchoolArchitecture: React.FC = () => (
  <group>
    {/* Main architectural structure */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[18, 9, 10]} />
      <meshStandardMaterial color="#B7B5AD" roughness={0.78} />
    </mesh>

    {/* Front facade panels */}
    <mesh position={[0, 0, 5.035]}>
      <boxGeometry args={[17.8, 8.8, 0.12]} />
      <meshStandardMaterial color="#D5D1C6" roughness={0.82} />
    </mesh>

    {/* Floor divisions */}
    {[-1.5, 1.5].map((y) => (
      <mesh key={y} position={[0, y, 5.16]} castShadow>
        <boxGeometry args={[18.4, 0.22, 0.35]} />
        <meshStandardMaterial color="#687783" metalness={0.35} roughness={0.55} />
      </mesh>
    ))}

    {/* Windows */}
    {floors.map((y) =>
      windowXs.map((x) => <WindowUnit key={`${x}-${y}`} x={x} y={y} />),
    )}

    {/* Entrance portal */}
    <mesh position={[0, -2.75, 5.28]} castShadow>
      <boxGeometry args={[3.8, 3.5, 0.5]} />
      <meshStandardMaterial color="#26394B" metalness={0.55} roughness={0.35} />
    </mesh>
    <mesh position={[0, -3.15, 5.57]}>
      <boxGeometry args={[2.7, 2.65, 0.08]} />
      <meshStandardMaterial
        color="#193D52"
        metalness={0.8}
        roughness={0.16}
        emissive="#173B52"
        emissiveIntensity={0.25}
      />
    </mesh>
    <mesh position={[0, -3.15, 5.64]}>
      <boxGeometry args={[0.07, 2.65, 0.08]} />
      <meshStandardMaterial color="#C9B58A" metalness={0.7} roughness={0.3} />
    </mesh>

    {/* Entrance columns */}
    {[-2.15, 2.15].map((x) => (
      <mesh key={x} position={[x, -2.7, 5.6]} castShadow>
        <boxGeometry args={[0.32, 3.9, 0.45]} />
        <meshStandardMaterial color="#E4DFD2" roughness={0.5} />
      </mesh>
    ))}

    {/* Roof and architectural crown */}
    <mesh position={[0, 4.62, 0]} castShadow>
      <boxGeometry args={[18.8, 0.35, 10.8]} />
      <meshStandardMaterial color="#394B59" metalness={0.45} roughness={0.5} />
    </mesh>
    <mesh position={[0, 4.95, 4.9]}>
      <boxGeometry args={[7.5, 1.05, 0.35]} />
      <meshStandardMaterial color="#172D40" metalness={0.6} roughness={0.3} />
    </mesh>
    <mesh position={[0, 4.95, 5.12]}>
      <boxGeometry args={[7.15, 0.78, 0.08]} />
      <meshStandardMaterial
        color="#C4A66E"
        metalness={0.65}
        roughness={0.3}
        emissive="#735A30"
        emissiveIntensity={0.18}
      />
    </mesh>

    {/* Side architectural fins */}
    {[-8.7, 8.7].map((x) => (
      <mesh key={x} position={[x, 0, 5.22]} castShadow>
        <boxGeometry args={[0.35, 9.1, 0.45]} />
        <meshStandardMaterial color="#7C8A8F" metalness={0.3} roughness={0.6} />
      </mesh>
    ))}

    {/* Steps */}
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[0, -4.15 + i * 0.22, 6.2 + i * 0.65]} receiveShadow>
        <boxGeometry args={[6.5, 0.25, 1.3]} />
        <meshStandardMaterial color="#9A9B96" roughness={0.9} />
      </mesh>
    ))}
  </group>
);

const SchoolScene: React.FC<{ frame: number }> = ({ frame }) => {
  const cameraX = interpolate(frame, [0, 239], [17, 11]);
  const cameraY = interpolate(frame, [0, 239], [13, 9]);
  const cameraZ = interpolate(frame, [0, 239], [47, 39]);

  return (
    <ThreeCanvas
      width={1080}
      height={1920}
      camera={{
        position: [cameraX, cameraY, cameraZ],
        fov: 43,
        near: 0.1,
        far: 200,
      }}
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#101C29"]} />
      <fog attach="fog" args={["#101C29", 35, 95]} />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#DDEBFF", "#334438", 1.2]} />

      <directionalLight
        position={[-18, 25, 20]}
        intensity={3.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0002}
      />

      <pointLight position={[0, 8, 13]} intensity={65} color="#F4D7A0" distance={35} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.65, 0]} receiveShadow>
        <planeGeometry args={[180, 180]} />
        <meshStandardMaterial color="#343E3D" roughness={0.96} />
      </mesh>

      {/* Forecourt */}
      <mesh position={[0, -4.58, 12]} receiveShadow>
        <boxGeometry args={[34, 0.12, 16]} />
        <meshStandardMaterial color="#777A76" roughness={0.9} />
      </mesh>

      {/* Walkway */}
      <mesh position={[0, -4.48, 10]} receiveShadow>
        <boxGeometry args={[7, 0.1, 12]} />
        <meshStandardMaterial color="#B4AA94" roughness={0.88} />
      </mesh>

      <SchoolArchitecture />

      <Tree x={-13} z={3} scale={1.5} />
      <Tree x={13} z={2} scale={1.35} />
      <Tree x={-12} z={13} scale={1.1} />
      <Tree x={12} z={14} scale={1.15} />

      {/* Boundary walls */}
      {[-17, 17].map((x) => (
        <mesh key={x} position={[x, -3.8, 9]} castShadow>
          <boxGeometry args={[0.45, 1.7, 25]} />
          <meshStandardMaterial color="#777E7D" roughness={0.85} />
        </mesh>
      ))}
    </ThreeCanvas>
  );
};

export const RealisticSchool3D: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [35, 75, 205, 235], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [35, 85], [45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#101C29", overflow: "hidden" }}>
      <SchoolScene frame={frame} />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,rgba(3,10,19,.82) 0%,rgba(3,10,19,.08) 28%,rgba(3,10,19,.02) 58%,rgba(3,10,19,.68) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 190,
          left: 55,
          right: 55,
          textAlign: "center",
          direction: "rtl",
          color: "#FFFFFF",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: "Noto Sans Arabic, sans-serif",
        }}
      >
        <div
          style={{
            color: "#D9BD87",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 5,
          }}
        >
          MADRASATI • SMART EDUCATION
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            marginTop: 30,
            lineHeight: 1.45,
            textShadow: "0 8px 35px rgba(0,0,0,.75)",
          }}
        >
          مدرستي
          <br />
          مستقبل التعليم
        </div>
        <div style={{ fontSize: 28, color: "#E2E8EF", marginTop: 24 }}>
          إدارة المدرسة تبدأ من هنا
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#D9BD87",
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: 4,
          opacity: interpolate(frame, [100, 145], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        A NEW STANDARD IN SCHOOL MANAGEMENT
      </div>
    </AbsoluteFill>
  );
};
