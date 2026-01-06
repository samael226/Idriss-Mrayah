// src/components/three/ThreeScene.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useGame } from './useGame'; // assuming useGame is imported from a separate file

const ThreeScene = () => {
  const mountRef = useRef(null);
  const { unlockAchievement } = useGame();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff83,
      shininess: 100,
      wireframe: false,
      transparent: true,
      opacity: 0.9
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Camera position
    camera.position.z = 3;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    mountRef.current.appendChild(renderer.domElement);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      controls.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-white/10"
      onMouseEnter={() => {
        // Unlock 3D interaction achievement
        unlockAchievement('skill-3d');
      }}
    />
  );
};

export default ThreeScene;