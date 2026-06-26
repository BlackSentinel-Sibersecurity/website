"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 2500;
const CONNECTION_DISTANCE = 1.8;
const SPHERE_RADIUS = 2.2;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function generateParticles() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const opacities = new Float32Array(PARTICLE_COUNT);
  const phases = new Float32Array(PARTICLE_COUNT);
  const isOrbiting: boolean[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = seededRandom(i * 2) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
    const r = SPHERE_RADIUS * (0.85 + seededRandom(i * 5 + 2) * 0.3);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = 1.0 + seededRandom(i * 17) * 3.0;
    opacities[i] = 0.3 + seededRandom(i * 19) * 0.7;
    phases[i] = seededRandom(i * 23) * Math.PI * 2;
    isOrbiting.push(seededRandom(i * 29) > 0.85);
  }

  return { positions, sizes, opacities, phases, isOrbiting };
}

function generateConnections(positions: Float32Array) {
  const maxConnections = PARTICLE_COUNT * 3;
  const pos = new Float32Array(maxConnections * 3);
  const op = new Float32Array(maxConnections);
  let idx = 0;

  for (let i = 0; i < PARTICLE_COUNT && idx < maxConnections; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT && idx < maxConnections; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < CONNECTION_DISTANCE) {
        pos[idx * 6] = positions[i * 3];
        pos[idx * 6 + 1] = positions[i * 3 + 1];
        pos[idx * 6 + 2] = positions[i * 3 + 2];
        pos[idx * 6 + 3] = positions[j * 3];
        pos[idx * 6 + 4] = positions[j * 3 + 1];
        pos[idx * 6 + 5] = positions[j * 3 + 2];
        op[idx * 2] = 1.0 - dist / CONNECTION_DISTANCE;
        op[idx * 2 + 1] = 1.0 - dist / CONNECTION_DISTANCE;
        idx++;
      }
    }
  }

  return {
    positions: new Float32Array(pos.buffer, 0, idx * 6),
    opacities: new Float32Array(op.buffer, 0, idx * 2),
  };
}

const particleVertexShader = `
  attribute float aSize;
  attribute float aOpacity;
  attribute float aPhase;
  uniform float uTime;
  varying float vOpacity;
  varying float vPhase;
  void main() {
    vOpacity = aOpacity;
    vPhase = aPhase;
    vec3 pos = position;
    float pulse = sin(uTime * 0.5 + aPhase) * 0.05;
    pos += normalize(pos) * pulse;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying float vOpacity;
  varying float vPhase;
  uniform float uTime;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
    float flicker = 0.85 + 0.15 * sin(uTime * 2.0 + vPhase * 6.28);
    vec3 color = mix(vec3(1.0, 0.416, 0.0), vec3(1.0, 0.604, 0.235), vPhase);
    gl_FragColor = vec4(color, alpha * flicker);
  }
`;

const connectionVertexShader = `
  attribute float aOpacity;
  varying float vOpacity;
  void main() {
    vOpacity = aOpacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const connectionFragmentShader = `
  varying float vOpacity;
  uniform float uTime;
  void main() {
    float pulse = 0.5 + 0.5 * sin(uTime * 1.5 + vOpacity * 6.28);
    vec3 color = mix(vec3(1.0, 0.416, 0.0), vec3(1.0, 0.604, 0.235), pulse);
    float alpha = vOpacity * (0.15 + 0.1 * pulse);
    gl_FragColor = vec4(color, alpha);
  }
`;

function Particles({
  particleData,
  speedRef,
}: {
  particleData: ReturnType<typeof generateParticles>;
  speedRef: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current || !materialRef.current) return;
    timeRef.current += delta * speedRef.current;
    materialRef.current.uniforms.uTime.value = timeRef.current;

    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (particleData.isOrbiting[i]) {
        const x = arr[i * 3];
        const z = arr[i * 3 + 2];
        const angle = delta * 0.15 * speedRef.current;
        arr[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
        arr[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[particleData.sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[particleData.opacities, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[particleData.phases, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Connections({
  connectionData,
  speedRef,
}: {
  connectionData: ReturnType<typeof generateConnections>;
  speedRef: React.MutableRefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    timeRef.current += delta * speedRef.current;
    materialRef.current.uniforms.uTime.value = timeRef.current;
  });

  if (connectionData.positions.length === 0) return null;

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[connectionData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[connectionData.opacities, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={connectionVertexShader}
        fragmentShader={connectionFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function EnergyPulses({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const pulsePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const theta = seededRandom(i * 31) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 37) - 1);
      const r = SPHERE_RADIUS * (0.9 + seededRandom(i * 41) * 0.15);
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speedRef.current;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const phase = i * 0.7;
      const scale = 0.02 + 0.03 * Math.sin(t * 1.5 + phase);
      mesh.scale.setScalar(scale);
      const opacity = (0.3 + 0.2 * Math.sin(t * 2 + phase)) * speedRef.current;
      (mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
    });
  });

  return (
    <group ref={groupRef}>
      {pulsePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#FF9A3C"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlowSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1.0 + 0.02 * Math.sin(t * 0.5);
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SPHERE_RADIUS * 1.3, 32, 32]} />
      <meshBasicMaterial
        color="#FF6A00"
        transparent
        opacity={0.06}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function CoreGroup({
  mouseRef,
  dragRef,
  speedRef,
  particleData,
  connectionData,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector2>;
  dragRef: React.MutableRefObject<{ x: number; y: number }>;
  speedRef: React.MutableRefObject<number>;
  particleData: ReturnType<typeof generateParticles>;
  connectionData: ReturnType<typeof generateConnections>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const targetX = mouseRef.current.y * 0.2;
    const targetY = mouseRef.current.x * 0.2;
    const dragX = dragRef.current.y * 0.3;
    const dragY = dragRef.current.x * 0.3;

    const idleX = Math.sin(t * 0.05) * 0.05;
    const idleY = t * ((2 * Math.PI) / 60);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX + dragX + idleX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + dragY + idleY,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <Particles particleData={particleData} speedRef={speedRef} />
      <Connections connectionData={connectionData} speedRef={speedRef} />
      <EnergyPulses speedRef={speedRef} />
      <GlowSphere />
    </group>
  );
}

function Scene({
  mouseRef,
  dragRef,
  speedRef,
  particleData,
  connectionData,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector2>;
  dragRef: React.MutableRefObject<{ x: number; y: number }>;
  speedRef: React.MutableRefObject<number>;
  particleData: ReturnType<typeof generateParticles>;
  connectionData: ReturnType<typeof generateConnections>;
}) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <CoreGroup
        mouseRef={mouseRef}
        dragRef={dragRef}
        speedRef={speedRef}
        particleData={particleData}
        connectionData={connectionData}
      />
      <Preload all />
    </>
  );
}

export default function NeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const dragRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(1);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  const particleData = useMemo(() => generateParticles(), []);
  const connectionData = useMemo(
    () => generateConnections(particleData.positions),
    [particleData.positions]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    if (mq.matches) {
      speedRef.current = 0.15;
    }
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      speedRef.current = e.matches ? 0.15 : 1;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);

    if (isDragging.current) {
      const dx = (e.clientX - lastMouse.current.x) * 0.005;
      const dy = (e.clientY - lastMouse.current.y) * 0.005;
      dragRef.current.x += dx;
      dragRef.current.y += dy;
      velocity.current = { x: dx, y: dy };
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseEnter = useCallback(() => {
    speedRef.current = reducedMotionRef.current ? 0.15 : 1.05;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.set(0, 0);
    isDragging.current = false;
    speedRef.current = reducedMotionRef.current ? 0.15 : 1;
  }, []);

  const handleClick = useCallback(() => {
    if (reducedMotionRef.current) return;
    speedRef.current = 1.15;
    setTimeout(() => {
      speedRef.current = 1.05;
    }, 1000);
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (!isDragging.current) {
        dragRef.current.x *= 0.95;
        dragRef.current.y *= 0.95;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: "grab" }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-[0.08] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF6A00 0%, transparent 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene
          mouseRef={mouseRef}
          dragRef={dragRef}
          speedRef={speedRef}
          particleData={particleData}
          connectionData={connectionData}
        />
      </Canvas>
    </div>
  );
}
