import './styles.css';
import * as THREE from 'three';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Stats } from '@react-three/drei/core/Stats';
import { Canvas, useFrame } from '@react-three/fiber';
import { vertexShader, fragmentShader } from './shader';

const Particles = () => {
  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 128, 128);
    const positions = planeGeometry.attributes.position.array;

    return positions;
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader,
      fragmentShader
    }),
    []
  );

  useFrame(() => {
    shaderArgs.uniforms.uTime.value++;
  }, []);

  return (
    <points rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={planePositions}
          itemSize={3}
          count={planePositions.length / 3}
        />
      </bufferGeometry>
      <shaderMaterial
        args={[shaderArgs]}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </points>
  );
};

export default function App() {
  return (
    <Canvas dpr={2}>
      <color attach="background" args={[0xf5f3fd]} />
      <OrbitControls makeDefault />
      <Stats />
      <Particles />
    </Canvas>
  );
}
