import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SecondBrain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, composer: EffectComposer;
    let nodesMesh: THREE.InstancedMesh, lines: THREE.LineSegments, packets: THREE.Group;
    let animationFrameId: number;

    const sectionConfigs = [
      { id: 'section-resting', color: 0x6C4DFF, pos: { x: 4, y: 0, z: 12 }, mobilePos: { x: 0, y: 0, z: 20 }, speed: 0.001 },
      { id: 'section-omnibiz', color: 0x1B2A63, pos: { x: 5, y: 4, z: 6 }, mobilePos: { x: 2, y: 4, z: 12 }, speed: 0.004 },
      { id: 'section-bluelotus', color: 0x2247D6, pos: { x: 6, y: 0, z: 5 }, mobilePos: { x: 3, y: 0, z: 10 }, speed: 0.003 },
      { id: 'section-fundingpips', color: 0x2E8B57, pos: { x: 3, y: -4, z: 4 }, mobilePos: { x: 1, y: -4, z: 12 }, speed: 0.006 },
      { id: 'section-postg8', color: 0x2F2BB0, pos: { x: 6, y: -6, z: 3 }, mobilePos: { x: 3, y: -6, z: 10 }, speed: 0.012 },
      { id: 'section-gigculture', color: 0xA79ED1, pos: { x: 4, y: 0, z: 10 }, mobilePos: { x: 0, y: 0, z: 18 }, speed: 0.002 },
    ];

    function init() {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width < 768;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        
        // Offset logic to prevent overlap with text
        let offsetX = 0;
        let offsetY = 0;
        
        if (width > 1024) {
          offsetX = width * 0.25;
        } else {
          offsetX = width * 0.05;
          offsetY = isMobile ? height * 0.05 : 0;
        }
        
        camera.setViewOffset(width, height, -offsetX, -offsetY, width, height);
        camera.position.z = isMobile ? 20 : 12;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        renderer.setClearColor(0x000000, 0); // Strict transparency
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(width, height),
          1.2, // strength
          0.4, // radius
          0.25  // threshold
        );
        
        // Ensure transparency is preserved in the effect composer
        const renderTarget = new THREE.WebGLRenderTarget(width, height, {
          format: THREE.RGBAFormat,
          type: THREE.UnsignedByteType
        });
        
        // Force UnrealBloomPass to use a transparent material when copying the scene
        if ((bloomPass as any)._basic) {
          (bloomPass as any)._basic.transparent = true;
        }
        if ((bloomPass as any).basic) {
          (bloomPass as any).basic.transparent = true;
        }

        composer = new EffectComposer(renderer, renderTarget);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        if (isMobile) bloomPass.enabled = false;

        // Neural Network Generation: Constellation Approach
        const hubCount = isMobile ? 10 : 15;
        const nodesPerHub = isMobile ? 25 : 40;
        const totalNodes = hubCount * nodesPerHub;
        const nodes: any[] = [];
        const connections: any[] = [];

        const geometry = new THREE.IcosahedronGeometry(0.1, 0);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0x16151C, 
          emissive: 0x6B6975,
          emissiveIntensity: 0.5 
        });
        nodesMesh = new THREE.InstancedMesh(geometry, material, totalNodes);
        
        const dummy = new THREE.Object3D();
        const nodeColors = new Float32Array(totalNodes * 3);
        const defaultColor = new THREE.Color(0x6B6975);

        const spawnRange = isMobile ? 8 : 12;

        for (let h = 0; h < hubCount; h++) {
          // Hub Position - More compact on mobile
          const hubPos = new THREE.Vector3(
            (Math.random() - 0.5) * spawnRange,
            (Math.random() - 0.5) * spawnRange,
            (Math.random() - 0.5) * (isMobile ? 6 : 8)
          );

          for (let n = 0; n < nodesPerHub; n++) {
            const i = h * nodesPerHub + n;
            const isHub = n === 0;

            // Obsidian logic: leaf nodes stay near their hub
            const dist = isHub ? 0 : Math.pow(Math.random(), 1.5) * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            const pos = new THREE.Vector3(
              hubPos.x + dist * Math.sin(phi) * Math.cos(theta),
              hubPos.y + dist * Math.sin(phi) * Math.sin(theta),
              hubPos.z + dist * Math.cos(phi)
            );

            dummy.position.copy(pos);
            const scale = isHub ? 1.5 : 0.15 + Math.random() * 0.3;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            nodesMesh.setMatrixAt(i, dummy.matrix);

            nodes.push({ pos, id: i, cluster: h % sectionConfigs.length, isHub });
            defaultColor.toArray(nodeColors, i * 3);

            // Connect leaves to hub
            if (!isHub) {
              connections.push(hubPos.clone(), pos.clone());
            }
          }
        }
        nodesMesh.instanceColor = new THREE.InstancedBufferAttribute(nodeColors, 3);
        scene.add(nodesMesh);

        // Lines: Very thin, organic look
        const linePoints: number[] = [];
        connections.forEach(p => {
          linePoints.push(p.x, p.y, p.z);
        });

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x6B6975, 
          transparent: true, 
          opacity: 0.1,
          blending: THREE.AdditiveBlending
        });
        lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Data Packets Group
        packets = new THREE.Group();
        scene.add(packets);

        const packetGeo = new THREE.SphereGeometry(0.04, 8, 8);
        for(let i=0; i < (isMobile ? 15 : 30); i++) {
          const pMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.8 });
          const p = new THREE.Mesh(packetGeo, pMat);
          packets.add(p);
          
          // Randomly assign to a connection
          const connIdx = Math.floor(Math.random() * (connections.length / 2)) * 2;
          const start = connections[connIdx];
          const end = connections[connIdx + 1];
          
          gsap.to(p.position, {
            x: end.x, y: end.y, z: end.z,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5,
            onRepeat: () => {
              p.position.copy(start);
            }
          });
        }

        // Scroll Logic
        let currentSpeed = 0.001;
        const activeColor = new THREE.Color(0x6B6975);

        sectionConfigs.forEach((config, idx) => {
          ScrollTrigger.create({
            trigger: `#${config.id}`,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              const targetPos = isMobile ? config.mobilePos : config.pos;
              gsap.to(camera.position, { 
                x: targetPos.x, 
                y: targetPos.y, 
                z: targetPos.z, 
                duration: 2.5, 
                ease: "expo.out" 
              });
              currentSpeed = config.speed;

              // Animate Global Web Color
              const targetColor = new THREE.Color(config.color);
              gsap.to(activeColor, {
                r: targetColor.r, g: targetColor.g, b: targetColor.b,
                duration: 1.5,
                onUpdate: () => {
                  lineMaterial.color.copy(activeColor);
                  material.emissive.copy(activeColor).multiplyScalar(0.5);
                }
              });
              
              // Intensified Firing burst on enter
              for(let i=0; i < (isMobile ? 10 : 25); i++) {
                gsap.delayedCall(Math.random() * 0.8, () => {
                  const clusterNodes = nodes.filter(n => n.cluster === idx || n.isHub);
                  if (clusterNodes.length > 0) {
                    const node = clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
                    const flashColor = new THREE.Color(0xFFFFFF);
                    
                    nodesMesh.getMatrixAt(node.id, dummy.matrix);
                    dummy.scale.setScalar(node.isHub ? 2.5 : 0.8);
                    nodesMesh.setMatrixAt(node.id, dummy.matrix);

                    flashColor.toArray(nodeColors, node.id * 3);
                    nodesMesh.instanceColor!.needsUpdate = true;
                    nodesMesh.instanceMatrix.needsUpdate = true;
                    
                    gsap.delayedCall(0.1 + Math.random() * 0.2, () => {
                      const base = node.isHub ? targetColor.clone().multiplyScalar(1.5) : targetColor;
                      base.toArray(nodeColors, node.id * 3);
                      
                      nodesMesh.getMatrixAt(node.id, dummy.matrix);
                      dummy.scale.setScalar(node.isHub ? 1.5 : 0.15 + Math.random() * 0.3);
                      nodesMesh.setMatrixAt(node.id, dummy.matrix);
                      
                      nodesMesh.instanceColor!.needsUpdate = true;
                      nodesMesh.instanceMatrix.needsUpdate = true;
                    });
                  }
                });
              }
            }
          });
        });

        // Mouse Parallax
        const mouse = { x: 0, y: 0 };
        window.addEventListener('mousemove', (e) => {
          mouse.x = (e.clientX / window.innerWidth) - 0.5;
          mouse.y = (e.clientY / window.innerHeight) - 0.5;
        });

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          scene.rotation.y += currentSpeed;
          scene.rotation.x += (mouse.y * 0.05 - scene.rotation.x) * 0.02;
          scene.rotation.z += (mouse.x * 0.05 - scene.rotation.z) * 0.02;

          composer.render();
        };
        animate();

        const handleResize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const isMobile = w < 768;
          camera.aspect = w / h;
          
          let offsetX = 0;
          let offsetY = 0;
          if (w > 1024) {
            offsetX = w * 0.25;
          } else {
            offsetX = w * 0.05;
            offsetY = isMobile ? h * 0.05 : 0;
          }
          
          camera.setViewOffset(w, h, -offsetX, -offsetY, w, h);
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          composer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

      } catch (error) {
        console.error('WebGL failed:', error);
        fallbackRef.current!.style.display = 'block';
      }
    }

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div 
        ref={fallbackRef}
        className="hidden absolute top-1/2 right-[20%] -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] bg-accent-signal opacity-20"
      />
      {/* Visual Masking: Prevents harsh edges near text */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-b lg:bg-gradient-to-r from-[#F2F1F7] via-[#F2F1F7]/90 to-[#F2F1F7]/0 pointer-events-none" />
    </div>
  );
}
