"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const CONNECTION_DISTANCE = 1.6;
const SPHERE_RADIUS = 2.0;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = seededRandom(i * 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = SPHERE_RADIUS * (0.8 + seededRandom(i * 5 + 2) * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const brightness = 0.5 + seededRandom(i * 7) * 0.5;
      col[i * 3] = 1.0 * brightness;
      col[i * 3 + 1] = 0.42 * brightness;
      col[i * 3 + 2] = 0;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const speed = speedRef.current;
    pointsRef.current.rotation.y += delta * 0.08 * speed;
    pointsRef.current.rotation.x += delta * 0.03 * speed;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = performance.now() * 0.001;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const phase = seededRandom(i * 23) * Math.PI * 2;
      const pulse = Math.sin(t * 0.5 + phase) * 0.03;
      const len = Math.sqrt(arr[idx] ** 2 + arr[idx + 1] ** 2 + arr[idx + 2] ** 2);
      if (len > 0) {
        arr[idx] += (arr[idx] / len) * pulse * speed;
        arr[idx + 1] += (arr[idx + 1] / len) * pulse * speed;
        arr[idx + 2] += (arr[idx + 2] / len) * pulse * speed;
      }
    }
    posAttr.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.size = 3.0 + Math.sin(t * 0.8) * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={3}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralConnections({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const particlePositions: [number, number, number][] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = seededRandom(i * 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = SPHERE_RADIUS * (0.8 + seededRandom(i * 5 + 2) * 0.4);
      particlePositions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }

    const maxConn = 2000;
    const pos = new Float32Array(maxConn * 6);
    const col = new Float32Array(maxConn * 6);
    let idx = 0;

    for (let i = 0; i < PARTICLE_COUNT && idx < maxConn; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && idx < maxConn; j++) {
        const dx = particlePositions[i][0] - particlePositions[j][0];
        const dy = particlePositions[i][1] - particlePositions[j][1];
        const dz = particlePositions[i][2] - particlePositions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const fade = 1.0 - dist / CONNECTION_DISTANCE;
          pos[idx * 6] = particlePositions[i][0];
          pos[idx * 6 + 1] = particlePositions[i][1];
          pos[idx * 6 + 2] = particlePositions[i][2];
          pos[idx * 6 + 3] = particlePositions[j][0];
          pos[idx * 6 + 4] = particlePositions[j][1];
          pos[idx * 6 + 5] = particlePositions[j][2];

          col[idx * 6] = fade;
          col[idx * 6 + 1] = fade * 0.42;
          col[idx * 6 + 2] = 0;
          col[idx * 6 + 3] = fade;
          col[idx * 6 + 4] = fade * 0.42;
          col[idx * 6 + 5] = 0;
          idx++;
        }
      }
    }

    return {
      positions: new Float32Array(pos.buffer, 0, idx * 6),
      colors: new Float32Array(col.buffer, 0, idx * 6),
    };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    linesRef.current.rotation.y += 0.0005 * speedRef.current;

    const colorAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    const arr = colorAttr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 6) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.01);
      arr[i] = pulse * 0.8;
      arr[i + 1] = pulse * 0.34;
      arr[i + 2] = 0;
      arr[i + 3] = pulse * 0.8;
      arr[i + 4] = pulse * 0.34;
      arr[i + 5] = 0;
    }
    colorAttr.needsUpdate = true;
  });

  if (positions.length === 0) return null;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function OrbitingParticles({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const arr: { pos: [number, number, number]; speed: number; offset: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const theta = seededRandom(i * 31) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 37) - 1);
      const r = SPHERE_RADIUS * (1.2 + seededRandom(i * 41) * 0.5);
      arr.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        speed: 0.3 + seededRandom(i * 43) * 0.7,
        offset: seededRandom(i * 47) * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const p = particles[i];
      const angle = t * p.speed + p.offset;
      const r = SPHERE_RADIUS * 1.3;
      mesh.position.x = Math.cos(angle) * r;
      mesh.position.y = Math.sin(angle * 0.7) * r * 0.3;
      mesh.position.z = Math.sin(angle) * r;
      const scale = 0.5 + 0.5 * Math.sin(t * 2 + p.offset);
      mesh.scale.setScalar(scale * 0.08);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial
            color="#FF6A00"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlowCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1.0 + 0.05 * Math.sin(t * 0.5);
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SPHERE_RADIUS * 0.3, 16, 16]} />
      <meshBasicMaterial
        color="#FF6A00"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function EnergyRings({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    groupRef.current.children.forEach((child, i) => {
      const ring = child as THREE.Mesh;
      ring.rotation.x = t * 0.1 * (i + 1);
      ring.rotation.z = t * 0.05 * (i + 1);
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + 0.04 * Math.sin(t + i);
    });
  });

  return (
    <group ref={groupRef}>
      {[1.0, 1.15, 1.3].map((scale, i) => (
        <mesh key={i} scale={[scale, scale, scale]}>
          <torusGeometry args={[SPHERE_RADIUS, 0.005, 8, 64]} />
          <meshBasicMaterial
            color="#FF6A00"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function CoreScene({
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
    const targetX = mouseRef.current.y * 0.15;
    const targetY = mouseRef.current.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX + Math.sin(t * 0.05) * 0.03,
      0.03
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + t * 0.02,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <ParticleField speedRef={speedRef} />
      <NeuralConnections speedRef={speedRef} />
      <OrbitingParticles speedRef={speedRef} />
      <GlowCore />
      <EnergyRings speedRef={speedRef} />
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
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);
  }, []);

  const handleMouseEnter = useCallback(() => {
    speedRef.current = 1.1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.set(0, 0);
    speedRef.current = 1;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) speedRef.current = 0.2;
    const handler = (e: MediaQueryListEvent) => {
      speedRef.current = e.matches ? 0.2 : 1;
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
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <CoreScene mouseRef={mouseRef} speedRef={speedRef} />
      </Canvas>
    </div>
  );
}
