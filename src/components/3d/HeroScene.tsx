"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Trail, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Sphere args={[1, 100, 100]} ref={mesh} scale={2.2}>
        <MeshDistortMaterial
          color="#5800FF"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          opacity={0.9}
          transparent={true}
          emissive="#5800FF"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);
  
  // Create a random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.05;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#5800FF" 
        sizeAttenuation 
        transparent
        opacity={0.5}
      />
    </points>
  );
};

const OrbitingSpheres = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 5 }).map((_, i) => (
        <OrbitingSphere 
          key={i} 
          radius={3 + i * 0.5} 
          speed={0.2 - i * 0.03} 
          size={0.2} 
          color={new THREE.Color().setHSL(i * 0.1, 0.8, 0.5)}
        />
      ))}
    </group>
  );
};

const OrbitingSphere = ({ radius, speed, size, color }: { radius: number; speed: number; size: number; color: THREE.Color }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [startAngle] = React.useState(() => Math.random() * Math.PI * 2);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const angle = startAngle + clock.getElapsedTime() * speed;
      mesh.current.position.x = Math.cos(angle) * radius;
      mesh.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <Trail
      width={0.1}
      length={8}
      color={color.getStyle()}
      attenuation={(width) => width}
    >
      <mesh ref={mesh}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Trail>
  );
};

const HeroScene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#5800FF" />
        
        <AnimatedSphere />
        <Particles />
        <OrbitingSpheres />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene; 