import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js Twinkling Stars background for Dreamy template.
 * Midnight Rose palette: deep navy (#0a0e1a) + gold & rose accents.
 * Renders 800 twinkling star particles with mouse-follow camera.
 */
export function DreamyStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting — warm gold + soft rose
    const ambientLight = new THREE.AmbientLight(0xffd1dc, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4a574, 1.5, 200); // warm gold
    pointLight1.position.set(30, 40, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xc98bb9, 1.2, 200); // soft rose
    pointLight2.position.set(-30, -30, 40);
    scene.add(pointLight2);

    // Twinkling Stars (Particle System) — 800 stars
    const starCount = 800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    // Midnight Rose palette for stars
    const midnightPalette = [
      new THREE.Color(0xffecd2), // warm cream gold
      new THREE.Color(0xffd1dc), // soft rose
      new THREE.Color(0xc9b1ff), // lavender
      new THREE.Color(0xffe5b4), // peach gold
      new THREE.Color(0xffffff), // pure white
      new THREE.Color(0xd4a574), // antique gold
      new THREE.Color(0xe8b4b8), // dusty rose
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 250;

      const color =
        midnightPalette[Math.floor(Math.random() * midnightPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;

      starSizes[i] = 1.2 + Math.random() * 2.5;
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(starColors, 3)
    );

    // Circular star texture via canvas
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 32;
    texCanvas.height = 32;
    const ctx = texCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 230, 200, 0.9)');
    gradient.addColorStop(0.5, 'rgba(212, 165, 116, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const starTexture = new THREE.CanvasTexture(texCanvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 2.0,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse & Touch Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    function onPointerMove(e: MouseEvent | TouchEvent) {
      const clientX =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      targetMouseX = (clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove as EventListener, {
      passive: true,
    });

    // Handle Resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Store original sizes for twinkling
    const originalOpacities = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      originalOpacities[i] = 0.5 + Math.random() * 0.5;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;
      camera.position.x = currentMouseX * 10;
      camera.position.y = currentMouseY * 10;
      camera.lookAt(scene.position);

      // Rotate stars slowly
      stars.rotation.y = elapsedTime * 0.015;
      stars.rotation.x = elapsedTime * 0.008;

      // Breathing effect on star positions
      const positions = starGeometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        // Move stars slightly to create a breathing effect
        const baseY = positions[i * 3 + 1];
        positions[i * 3 + 1] =
          baseY + Math.sin(elapsedTime * 0.3 + i) * 0.01;
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Pulse overall star opacity for dreamy feel
      starMaterial.opacity = 0.75 + Math.sin(elapsedTime * 0.5) * 0.15;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener(
        'touchmove',
        onPointerMove as EventListener
      );
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

