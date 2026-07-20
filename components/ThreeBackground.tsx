"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Accessibility & Performance check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return; // Do not initialize heavy WebGL animation
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Create Particles & Connecting Lines (Abstract Network Grid)
    // Reduce count on mobile for excellent performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 150;
    const maxDistance = isMobile ? 35 : 45;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    // Colors mapping to BWP corporate palette
    const colorRed = new THREE.Color("#910006"); // Corporate Crimson Red
    const colorSlate = new THREE.Color("#475569"); // Corporate Slate-600

    const areaRange = 250;

    for (let i = 0; i < particleCount; i++) {
      // Position particles randomly within a 3D box
      const x = (Math.random() - 0.5) * areaRange;
      const y = (Math.random() - 0.5) * areaRange;
      const z = (Math.random() - 0.5) * areaRange;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Velocities for slow, organic drift
      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });

      // Distribute colors across the particle population (mix of crimson and slate)
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().copy(colorSlate).lerp(colorRed, mixRatio);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create a circular particle texture procedurally so we don't need external assets
    const createCircleTexture = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw elegant soft radial gradient circle
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 5 : 6,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic Line Connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#910006",
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });

    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const lineColors = new Float32Array(particleCount * particleCount * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 4. Interactive Mouse Tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Clean Animation Loop with Visibility and Scroll Checks
    let animationFrameId: number;
    let isVisible = true;

    // Toggle animation loop if tab is out of focus to save battery/GPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Intersection observer to pause rendering if canvas is scrolled completely out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera lag matching mouse coordinates (Slight organic response)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x += (mouse.x * 35 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 35 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Rotate particle systems slowly over time
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;
      lineSegments.rotation.copy(particleSystem.rotation);

      // Update Particle Positions based on Velocities
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Add velocity
        positionsArray[i3] += velocities[i].x;
        positionsArray[i3 + 1] += velocities[i].y;
        positionsArray[i3 + 2] += velocities[i].z;

        // Bounce off boundary box to keep particles within active viewport
        const bound = areaRange / 2;
        if (Math.abs(positionsArray[i3]) > bound) velocities[i].x *= -1;
        if (Math.abs(positionsArray[i3 + 1]) > bound) velocities[i].y *= -1;
        if (Math.abs(positionsArray[i3 + 2]) > bound) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Draw Network Lines between close nodes dynamically
      let lineIndex = 0;
      const linePositionsArray = lineGeometry.getAttribute("position").array as Float32Array;
      const lineColorsArray = lineGeometry.getAttribute("color").array as Float32Array;

      // Extract current rotated coordinates of nodes to calculate precise distance
      const tempPositions: { x: number; y: number; z: number }[] = [];
      const rotY = particleSystem.rotation.y;
      const rotX = particleSystem.rotation.x;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < particleCount; i++) {
        const xVal = positionsArray[i * 3];
        const yVal = positionsArray[i * 3 + 1];
        const zVal = positionsArray[i * 3 + 2];

        // 3D rotation matrix calculation to get absolute positions in world space
        // Rotate Y
        const xRotY = xVal * cosY - zVal * sinY;
        const zRotY = xVal * sinY + zVal * cosY;
        // Rotate X
        const yRotX = yVal * cosX - zRotY * sinX;
        const zRotX = yVal * sinX + zRotY * cosX;

        tempPositions.push({ x: xRotY, y: yRotX, z: zRotX });
      }

      for (let i = 0; i < particleCount; i++) {
        const p1 = tempPositions[i];

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = tempPositions[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const distance = Math.sqrt(distSq);
            // Stronger opacity for closer nodes
            const alpha = 1.0 - distance / maxDistance;

            // Start Point
            linePositionsArray[lineIndex] = positionsArray[i * 3];
            linePositionsArray[lineIndex + 1] = positionsArray[i * 3 + 1];
            linePositionsArray[lineIndex + 2] = positionsArray[i * 3 + 2];

            // End Point
            linePositionsArray[lineIndex + 3] = positionsArray[j * 3];
            linePositionsArray[lineIndex + 4] = positionsArray[j * 3 + 1];
            linePositionsArray[lineIndex + 5] = positionsArray[j * 3 + 2];

            // Color gradient (lerp from brand red to soft slate depending on position)
            const colorBlend = new THREE.Color().copy(colorSlate).lerp(colorRed, alpha * 0.75);
            
            lineColorsArray[lineIndex] = colorBlend.r;
            lineColorsArray[lineIndex + 1] = colorBlend.g;
            lineColorsArray[lineIndex + 2] = colorBlend.b;

            lineColorsArray[lineIndex + 3] = colorBlend.r;
            lineColorsArray[lineIndex + 4] = colorBlend.g;
            lineColorsArray[lineIndex + 5] = colorBlend.b;

            lineIndex += 6;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("color").needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resizes
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // 7. Cleanup everything on unmount to prevent leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      id="threejs-canvas-background"
      style={{ mixBlendMode: "multiply", opacity: 0.85 }}
    />
  );
}
