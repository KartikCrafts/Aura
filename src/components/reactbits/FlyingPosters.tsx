import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export interface FlyingPosterItem {
  image: string;
  title: string;
  subtitle?: string;
}

export interface FlyingPostersProps {
  items: FlyingPosterItem[];
  speed?: number;
  distortion?: number;
  className?: string;
  onPosterClick?: (item: FlyingPosterItem, index: number) => void;
}

export default function FlyingPosters({
  items,
  speed = 1,
  distortion = 0.5,
  className = '',
  onPosterClick
}: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<FlyingPosterItem | null>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const posterMeshes: THREE.Mesh[] = [];
    const radius = 4.2;

    const posterGeometry = new THREE.PlaneGeometry(2.0, 2.7, 16, 16);

    items.forEach((item, index) => {
      const texture = textureLoader.load(item.image);
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(posterGeometry, material);
      (mesh as any).itemData = item;
      (mesh as any).itemIndex = index;

      scene.add(mesh);
      posterMeshes.push(mesh);
    });

    let angleOffset = 0;
    let targetSpeed = speed * 0.005;
    let isHovered = false;

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isHovered) {
        angleOffset += targetSpeed;
      } else {
        angleOffset += targetSpeed * 0.3;
      }

      const count = posterMeshes.length;
      posterMeshes.forEach((mesh, i) => {
        const angle = angleOffset + (i / count) * Math.PI * 2;
        mesh.position.x = Math.sin(angle) * radius;
        mesh.position.z = Math.cos(angle) * (radius * 0.75) - 1.2;
        mesh.position.y = Math.sin(angle * 2) * 0.35 * distortion;

        // Face slightly inward towards center
        mesh.rotation.y = -angle + Math.PI;
        mesh.rotation.z = Math.cos(angle) * 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      posterMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [items, speed, distortion]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border-2 border-[#d9ccb6] bg-[#eef1e6] shadow-xl ${className}`}>
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[450px] relative cursor-grab active:cursor-grabbing"
      />

      {/* Overlay caption */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="bg-[#ffffff]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#d9ccb6] shadow-sm text-xs pointer-events-auto">
          <span className="font-technical text-[10px] text-[#637254] uppercase tracking-widest block">
            ReactBits 3D Flying Posters
          </span>
          <span className="font-editorial text-sm font-semibold text-[#283223]">
            Orbiting Spatial Editions Gallery
          </span>
        </div>
        <div className="text-[10px] font-technical text-[#5a684d] bg-[#ffffff]/80 px-3 py-1.5 rounded-lg border border-[#d9ccb6]">
          Hover to Slow · 3D Cylindrical Sweep
        </div>
      </div>
    </div>
  );
}
