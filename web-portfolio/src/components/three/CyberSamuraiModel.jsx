import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fallback component while the model is loading
function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8B0000" />
    </mesh>
  );
}

// 3D Model Component
function Model({ url }) {
  const { scene } = useGLTF(url);
  
  // Scale and position the model for better visibility
  scene.scale.set(0.9, 0.9, 0.9);
  scene.position.y = -1.2; // Slightly lower to show more of the model
  scene.rotation.y = Math.PI / 3; // Rotate to a more dynamic angle
  
  // Update all materials to be more visible with better lighting
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      
      if (child.material) {
        // Make the material more reflective and visible
        child.material.metalness = 0.8;
        child.material.roughness = 0.3;
        child.material.color = new THREE.Color('#ff4d4d');
        child.material.emissive = new THREE.Color('#8B0000');
        child.material.emissiveIntensity = 0.5;
        child.material.envMapIntensity = 1.5;
        
        // Add some specular highlights
        child.material.specular = new THREE.Color(0xffffff);
        child.material.shininess = 100;
        
        // Enable flat shading for better visibility of details
        child.material.flatShading = true;
        child.material.needsUpdate = true;
      }
    }
  });

  return <primitive object={scene} />;
}

// Main 3D Scene Component
export default function CyberSamuraiModel({ modelPath }) {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-[#0a0a0a] border-2 border-[#1a1a1a]">
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Higher pixel ratio for better quality
      >
        {/* Main ambient light */}
        <ambientLight intensity={0.75} color="#ffffff" />
        
        {/* Key light - main light source */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#ffddcc"
        />
        
        {/* Fill light - soft light from the opposite side */}
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.75}
          color="#ccddff"
        />
        
        {/* Back light - rim light for better edge definition */}
        <directionalLight
          position={[0, 5, -5]}
          intensity={0.5}
          color="#ff4d4d"
        />
        
        {/* Additional point light for more depth */}
        <pointLight position={[0, 3, 0]} intensity={0.8} color="#ff4d4d" distance={10} decay={2} />
        
        <Suspense fallback={null}>
          <Model url={modelPath} />
          <Environment 
            preset="city"
            background={false} // Don't show the environment as background
            blur={0.5} // Slight blur for better performance
          />
          {/* Add a subtle ground plane for better shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
