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
      { id: 'section-resting', color: 0x6C4DFF, zoom: 1, pos: { x: 4, y: 0, z: 12 }, speed: 0.001 },
      { id: 'section-omnibiz', color: 0x1B2A63, zoom: 2.2, pos: { x: 5, y: 4, z: 6 }, speed: 0.004 },
      { id: 'section-bluelotus', color: 0x2247D6, zoom: 2.5, pos: { x: 6, y: 0, z: 5 }, speed: 0.003 },
      { id: 'section-fundingpips', color: 0x2E8B57, zoom: 2.8, pos: { x: 3, y: -4, z: 4 }, speed: 0.006 },
      { id: 'section-postg8', color: 0x2F2BB0, zoom: 3.5, pos: { x: 6, y: -6, z: 3 }, speed: 0.012 },
      { id: 'section-gigculture', color: 0xA79ED1, zoom: 1.8, pos: { x: 4, y: 0, z: 10 }, speed: 0.002 },
    ];

    function init() {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        
        // Offset logic to prevent overlap with text
        // On desktop, push right. On mobile, push slightly right or stay centered but with vertical offset.
        let offsetX = 0;
        let offsetY = 0;
        
        if (width > 1024) {
          offsetX = width * 0.25;
        } else {
          // On mobile, we push it slightly right or down depending on the layout
          offsetX = width * 0.1;
          offsetY = height * 0.1;
        }
        
        camera.setViewOffset(width, height, -offsetX, -offsetY, width, height);
        camera.position.z = 12;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(width, height),
          1.2, // strength
          0.4, // radius
          0.25  // threshold
        );
        
        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        if (width < 700) bloomPass.enabled = false;

        // Neural Network Generation: Constellation Approach
        const hubCount = 15;
        const nodesPerHub = 40;
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

        for (let h = 0; h < hubCount; h++) {
          // Hub Position
          const hubPos = new THREE.Vector3(
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8
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
          opacity: 0.05,
          blending: THREE.AdditiveBlending
        });
        lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Data Packets Group
        packets = new THREE.Group();
        scene.add(packets);

        const packetGeo = new THREE.SphereGeometry(0.04, 8, 8);
        for(let i=0; i<30; i++) {
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

        sectionConfigs.forEach((config, idx) => {
          ScrollTrigger.create({
            trigger: `#${config.id}`,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(camera.position, { 
                x: config.pos.x, 
                y: config.pos.y, 
                z: config.pos.z, 
                duration: 2.5, 
                ease: "expo.out" 
              });
              currentSpeed = config.speed;
              
              // Intensified Firing burst on enter
              for(let i=0; i<25; i++) {
                gsap.delayedCall(Math.random() * 0.8, () => {
                  const clusterNodes = nodes.filter(n => n.cluster === idx || n.isHub);
                  if (clusterNodes.length > 0) {
                    const node = clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
                    const flashColor = new THREE.Color(0xFFFFFF);
                    
                    // Hubs flash even brighter
                    const intensity = node.isHub ? 4 : 2;
                    nodesMesh.getMatrixAt(node.id, dummy.matrix);
                    dummy.scale.setScalar(node.isHub ? 2.5 : 0.8);
                    nodesMesh.setMatrixAt(node.id, dummy.matrix);

                    flashColor.toArray(nodeColors, node.id * 3);
                    nodesMesh.instanceColor!.needsUpdate = true;
                    nodesMesh.instanceMatrix.needsUpdate = true;
                    
                    gsap.delayedCall(0.1 + Math.random() * 0.2, () => {
                      const base = node.isHub ? new THREE.Color(config.color).multiplyScalar(1.5) : new THREE.Color(config.color);
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
          camera.aspect = w / h;
          
          let offsetX = 0;
          let offsetY = 0;
          if (w > 1024) {
            offsetX = w * 0.25;
          } else {
            offsetX = w * 0.1;
            offsetY = h * 0.1;
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
      <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-b lg:bg-gradient-to-r from-[#F8F7FA] via-[#F8F7FA]/80 to-transparent pointer-events-none" />
    </div>
  );
}
