import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeRingCanvas: React.FC<{ isCelebration?: boolean }> = ({ isCelebration = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 4.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ringGroup = new THREE.Group();

    // 1. Gold Band (Torus)
    const bandGeo = new THREE.TorusGeometry(1.2, 0.12, 32, 100);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xE5C158, // Warm 18k Yellow Gold
      metalness: 0.95,
      roughness: 0.15,
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.rotation.x = Math.PI / 2.2;
    ringGroup.add(band);

    // 2. Diamond Crown Setting / Prongs
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.25, 0.1);

    const prongMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      metalness: 0.9,
      roughness: 0.1,
    });

    const prongCount = 4;
    for (let i = 0; i < prongCount; i++) {
      const angle = (i / prongCount) * Math.PI * 2;
      const prongGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 16);
      const prong = new THREE.Mesh(prongGeo, prongMat);
      prong.position.set(Math.cos(angle) * 0.22, 0.1, Math.sin(angle) * 0.22);
      prong.rotation.z = -Math.cos(angle) * 0.2;
      prong.rotation.x = Math.sin(angle) * 0.2;
      crownGroup.add(prong);
    }

    // 3. Solitaire Diamond Gemstone (Brilliant Cut Polyhedron)
    const diamondGeo = new THREE.OctahedronGeometry(0.42, 2);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 2.42, // Real Diamond IOR
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.position.set(0, 0.22, 0);
    crownGroup.add(diamond);

    ringGroup.add(crownGroup);

    // 4. Sparkling Aura Particles
    const sparkleCount = isCelebration ? 60 : 30;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePositions[i] = (Math.random() - 0.5) * 3;
      sparklePositions[i + 1] = Math.random() * 2;
      sparklePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xFDFBF7,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    ringGroup.add(sparkles);

    scene.add(ringGroup);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xFFF4D2, 3, 50);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xE5C158, 2.5, 50);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const sparkleLight = new THREE.PointLight(0xFFFFFF, 4, 20);
    sparkleLight.position.set(0, 3, 2);
    scene.add(sparkleLight);

    // Mouse interactive tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and auto-rotation
      ringGroup.rotation.y = elapsedTime * (isCelebration ? 0.8 : 0.4) + mouseX * 0.4;
      ringGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.12 - mouseY * 0.3;
      ringGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

      sparkles.rotation.y = -elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isCelebration]);

  return (
    <div
      ref={mountRef}
      className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
};
