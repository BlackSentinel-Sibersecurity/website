"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 1.2;
const SPHERE_RADIUS = 1.8;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Points({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = seededRandom(i * 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = SPHERE_RADIUS * (0.85 + seededRandom(i * 5 + 2) * 0.3);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06 * speedRef.current;
    ref.current.rotation.x += delta * 0.02 * speedRef.current;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FF6A00"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Lines({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, count } = useMemo(() => {
    const pts: number[] = [];
    const particlePos: [number, number, number][] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = seededRandom(i * 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = SPHERE_RADIUS * (0.85 + seededRandom(i * 5 + 2) * 0.3);
      particlePos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = particlePos[i][0] - particlePos[j][0];
        const dy = particlePos[i][1] - particlePos[j][1];
        const dz = particlePos[i][2] - particlePos[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          pts.push(
            particlePos[i][0], particlePos[i][1], particlePos[i][2],
            particlePos[j][0], particlePos[j][1], particlePos[j][2]
          );
        }
      }
    }

    return { positions: new Float32Array(pts), count: pts.length / 3 };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0003 * speedRef.current;
  });

  if (count === 0) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <lineBasicMaterial
        color="#FF6A00"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + 0.03 * Math.sin(t * 0.4));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[SPHERE_RADIUS * 0.15, 16, 16]} />
      <meshBasicMaterial
        color="#FF6A00"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function Rings({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.z = t * 0.04;
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[SPHERE_RADIUS * 1.1, 0.003, 8, 80]} />
        <meshBasicMaterial color="#FF6A00" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS * 1.2, 0.002, 8, 80]} />
        <meshBasicMaterial color="#FF6A00" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[SPHERE_RADIUS * 1.3, 0.002, 8, 80]} />
        <meshBasicMaterial color="#FF6A00" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Dots({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const arr: { angle: number; axis: number; radius: number; speed: number }[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        angle: seededRandom(i * 61) * Math.PI * 2,
        axis: seededRandom(i * 67),
        radius: SPHERE_RADIUS * (1.15 + seededRandom(i * 71) * 0.2),
        speed: 0.2 + seededRandom(i * 73) * 0.3,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const d = dots[i];
      const a = t * d.speed + d.angle;
      mesh.position.set(
        Math.cos(a) * d.radius,
        Math.sin(a * 0.7) * d.radius * 0.4,
        Math.sin(a) * d.radius
      );
      mesh.scale.setScalar(0.6 + 0.4 * Math.sin(t * 1.5 + i));
    });
  });

  return (
    <group ref={ref}>
      {dots.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial color="#FF8124" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({
  mouseRef,
  speedRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector2>;
  speedRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.y * 0.12;
    const my = mouseRef.current.x * 0.12;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mx + Math.sin(t * 0.04) * 0.02,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      my,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <Points speedRef={speedRef} />
      <Lines speedRef={speedRef} />
      <CoreGlow />
      <Rings speedRef={speedRef} />
      <Dots speedRef={speedRef} />
    </group>
  );
}

export default function NeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const speedRef = useRef(1);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
  }, []);

  const handleMouseEnter = useCallback(() => {
    speedRef.current = 1.08;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.set(0, 0);
    speedRef.current = 1;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) speedRef.current = 0.15;
    const handler = (e: MediaQueryListEvent) => {
      speedRef.current = e.matches ? 0.15 : 1;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "visible" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{
          background: "transparent",
          overflow: "visible",
        }}
      >
        <Scene mouseRef={mouseRef} speedRef={speedRef} />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, #000000 70%)",
        }}
      />
    </div>
  );
}
