import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PLANETS, SUN, type Planet } from "@/lib/space-data";

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geo} attach="geometry" />
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.18} />
    </line>
  );
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
  });
  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={3} distance={100} color="#ffd28a" />
      <mesh ref={ref}>
        <sphereGeometry args={[SUN.radius, 48, 48]} />
        <meshBasicMaterial color={SUN.color} />
      </mesh>
      <mesh scale={1.35}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color={SUN.emissive} transparent opacity={0.18} />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color={SUN.emissive} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function PlanetMesh({
  planet, onSelect, selected, speedMul,
}: { planet: Planet; onSelect: (p: Planet) => void; selected: boolean; speedMul: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const [hover, setHover] = useState(false);

  useFrame((_, dt) => {
    angle.current += dt * planet.speed * 0.15 * speedMul;
    if (group.current) {
      group.current.position.x = Math.cos(angle.current) * planet.orbit;
      group.current.position.z = Math.sin(angle.current) * planet.orbit;
    }
    if (mesh.current) mesh.current.rotation.y += dt * 0.5;
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = "default"; }}
        scale={hover || selected ? 1.2 : 1}
      >
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive ?? planet.color}
          emissiveIntensity={hover || selected ? 0.5 : 0.15}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {planet.ring && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.1, 64]} />
          <meshBasicMaterial color="#e0c68a" side={THREE.DoubleSide} transparent opacity={0.55} />
        </mesh>
      )}
      {(hover || selected) && (
        <mesh scale={1.35}>
          <sphereGeometry args={[planet.radius, 16, 16]} />
          <meshBasicMaterial color={planet.color} transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
}

function Scene({
  onSelect, selectedSlug, speedMul,
}: { onSelect: (p: Planet) => void; selectedSlug: string | null; speedMul: number }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={90} depth={60} count={6000} factor={3} saturation={0} fade speed={0.5} />
      <Sun />
      {PLANETS.map((p) => (
        <group key={p.slug}>
          <OrbitRing radius={p.orbit} />
          <PlanetMesh
            planet={p}
            onSelect={onSelect}
            selected={selectedSlug === p.slug}
            speedMul={speedMul}
          />
        </group>
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export function SolarSystem3D({
  onSelect, selectedSlug, speedMul = 1,
}: { onSelect: (p: Planet) => void; selectedSlug: string | null; speedMul?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 18, 32], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene onSelect={onSelect} selectedSlug={selectedSlug} speedMul={speedMul} />
      </Suspense>
    </Canvas>
  );
}
