import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { loveStory } from '../config/loveStory';

export const SectionWhyYou3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Create luxury floating 3D rings & crystalline octahedron (symbolizing the bond & clarity of love)
    const group = new THREE.Group();

    // Golden Outer Torus Ring
    const ringGeo1 = new THREE.TorusGeometry(1.6, 0.025, 32, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xE2B32E,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    group.add(ring1);

    // Inner Burgundy Torus Ring
    const ringGeo2 = new THREE.TorusGeometry(1.3, 0.02, 32, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xA91F44,
      metalness: 0.7,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    // Central Crystalline Diamond / Gem
    const gemGeo = new THREE.OctahedronGeometry(0.7, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      ior: 2.4, // diamond refractive index
      clearcoat: 1.0,
      reflectivity: 0.9,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    group.add(gem);

    // Star points surrounding
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 70;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 8;
      starPositions[i + 1] = (Math.random() - 0.5) * 8;
      starPositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xF4DE9C,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    group.add(starField);

    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xECC961, 2.5);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xDE5B7E, 2);
    dirLight2.position.set(-3, -3, 2);
    scene.add(dirLight2);

    // Animation loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      group.rotation.y += 0.005;
      group.rotation.x += 0.002;
      ring2.rotation.z += 0.004;

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#14060B] via-[#200711] to-[#14060B] text-ivory-50 flex flex-col items-center justify-center px-6 py-28 overflow-hidden my-12">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 opacity-85 pointer-events-none"
      />

      {/* Narrative Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gold-300 font-light"
        >
          “{loveStory.whyYou.phrase1}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory-100 font-normal leading-tight"
        >
          {loveStory.whyYou.phrase2}
        </motion.p>

        <div className="w-16 h-[1px] bg-gold-400/50 mx-auto" />

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-shimmer-gold font-normal leading-relaxed"
        >
          “{loveStory.whyYou.phrase3}”
        </motion.p>
      </div>
    </section>
  );
};
