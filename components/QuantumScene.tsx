
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Sphere, Line, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- FLUID SHADER ---
const FluidShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        // Fluid palette for demo header
        uColor1: { value: new THREE.Color("#DEBBB4") }, // warm blush
        uColor2: { value: new THREE.Color("#DED0B4") }, // soft sand
        uColor3: { value: new THREE.Color("#F6EEE7") }, // subtle highlight
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;

        // Simple pseudo-noise function
        float noise(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            // Flow speed
            float t = uTime * 0.35;
            vec2 uv = vUv;
            
            // Gentle drift to keep colors moving
            uv += vec2(sin(t * 0.15), cos(t * 0.12)) * 0.05;
            
            // Organic movement using layered waves
            float wave1 = sin(uv.x * 2.8 + t * 0.9) * cos(uv.y * 2.2 - t * 0.6);
            float wave2 = sin(uv.x * 5.2 - t * 0.7) * cos(uv.y * 4.6 + t * 0.8);
            float wave3 = sin(length(uv - 0.5) * 7.5 - t * 1.1);
            
            // Soft turbulence from noise
            float turb = noise(uv * 3.0 + t * 0.2) * 0.6 + noise(uv * 6.0 - t * 0.15) * 0.4;

            // Mix factors
            float mix1 = smoothstep(-1.0, 1.0, wave1);
            float mix2 = smoothstep(-1.0, 1.0, wave2);
            float mix3 = smoothstep(-1.0, 1.0, wave3);

            // Blending colors
            vec3 base = mix(uColor1, uColor2, clamp(mix1 * 0.7 + turb * 0.3, 0.0, 1.0));
            vec3 color = mix(base, uColor3, mix2 * 0.45 + mix3 * 0.25);
            
            // Add subtle shimmer/light
            color += (mix3 + turb) * 0.04;

            gl_FragColor = vec4(color, 1.0);
        }
    `
};

const FluidPlane = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            {/* Use viewport width/height to fill the canvas completely */}
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                ref={materialRef}
                args={[FluidShaderMaterial]}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export const FluidVideoBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <FluidPlane />
            </Canvas>
        </div>
    );
};

// --- SHAPE GENERATION UTILS ---

const generateShape1 = (count: number) => {
    // SHAPE 1: Number "1" (XY Plane)
    // A clean vertical pillar with a distinct beak (serif) at the top
    const points = [];
    for(let i=0; i<count; i++) {
        const r = Math.random();
        let x = 0, y = 0, z = 0;
        
        if (r < 0.85) {
            // Main Pillar
            y = (Math.random() * 2.2) - 1.1; // -1.1 to 1.1
            x = (Math.random() - 0.5) * 0.35; // Thickness
        } else {
            // Beak / Serif (Top Left)
            // Slope from (0, 0.9) to (-0.35, 0.6)
            const t = Math.random();
            x = THREE.MathUtils.lerp(0, -0.4, t) + (Math.random()-0.5)*0.1;
            y = THREE.MathUtils.lerp(1.0, 0.6, t) + (Math.random()-0.5)*0.1;
        }
        
        // Depth
        z = (Math.random() - 0.5) * 0.3;
        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

const generateShape2 = (count: number) => {
    // SHAPE 2: Number "2" (YZ Plane)
    // Screen X = -Local Z.
    // Screen Right (X>0) -> Local Z < 0
    
    const points = [];
    for(let i=0; i<count; i++) {
        const r = Math.random();
        let screenX = 0, screenY = 0;
        
        if (r < 0.35) {
            // Top Arc: Curves from Left to Right
            // Angle PI (Left) to -0.2 (Right-Down)
            const t = Math.random(); 
            const theta = Math.PI * (1 - t * 1.1); // 180 to -20 deg
            
            const radius = 0.55;
            screenX = radius * Math.cos(theta);
            screenY = 0.5 + radius * Math.sin(theta);
            
        } else if (r < 0.70) {
            // Diagonal: Top-Right to Bottom-Left
            const t = Math.random();
            const startX = 0.55 * Math.cos(-0.1 * Math.PI); 
            const startY = 0.5 + 0.55 * Math.sin(-0.1 * Math.PI);
            
            screenX = THREE.MathUtils.lerp(startX, -0.55, t);
            screenY = THREE.MathUtils.lerp(startY, -1.0, t);
        } else {
            // Base: Left to Right
            const t = Math.random();
            screenX = THREE.MathUtils.lerp(-0.55, 0.6, t);
            screenY = -1.0;
        }

        const z = -screenX; // INVERSE Z for correct orientation after -90 rot
        const y = screenY;
        const x = (Math.random() - 0.5) * 0.2; // Thickness

        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

const generateShape3 = (count: number) => {
    // SHAPE 3: Number "3" (YZ Plane)
    // Constructed from three specific strokes to ensure openness and clarity.
    // 1. Upper Arc (Open Left)
    // 2. Lower Arc (Open Left)
    // 3. Middle Connector (Waist)
    // Screen X = -Local Z.
    
    const points = [];
    for(let i=0; i<count; i++) {
        const r = Math.random();
        let screenX = 0, screenY = 0;
        
        if (r < 0.45) {
            // STROKE A: Upper Arc
            // Center (0, 0.5)
            // Starts Left-Top (150 deg) -> Top -> Right -> Waist (-30 deg)
            const t = Math.random();
            const startAngle = 2.6;  // ~150 deg (Top Left)
            const endAngle = -0.5;   // ~-30 deg (Waist In)
            const theta = startAngle + (endAngle - startAngle) * t;
            
            const radius = 0.5;
            screenX = radius * Math.cos(theta);
            screenY = 0.55 + radius * Math.sin(theta);

        } else if (r < 0.90) {
            // STROKE B: Lower Arc
            // Center (0, -0.5)
            // Starts Waist (30 deg) -> Right -> Bottom -> Left-Bottom (210 deg)
            const t = Math.random();
            const startAngle = 0.5;   // ~30 deg (Waist Out)
            const endAngle = 3.66;    // ~210 deg (Bottom Left)
            const theta = startAngle + (endAngle - startAngle) * t; // Clockwise logic? No, increasing angle is CCW.
            // We want clockwise: 30 -> -150.
            // Let's use negative angles for ease.
            // Start 0.5. End -2.6.
            const sA = 0.5;
            const eA = -2.6;
            const th = sA + (eA - sA) * t;

            const radius = 0.5;
            screenX = radius * Math.cos(th);
            screenY = -0.55 + radius * Math.sin(th);
        } else {
            // STROKE C: Middle Connector / Accent
            // A distinct horizontal-ish stroke at the waist to define the center
            // but ensuring gap.
            // From x=0 to x=-0.2 at y=0.
            const t = Math.random();
            screenX = THREE.MathUtils.lerp(0.1, -0.2, t);
            screenY = (Math.random() - 0.5) * 0.1; // slight thickness
        }

        const z = -screenX; // INVERSE Z
        const y = screenY;
        const x = (Math.random() - 0.5) * 0.15;
        
        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

const generateChaos = (count: number) => {
    const points = [];
    for(let i=0; i<count; i++) {
        // Uniform sphere distribution for explosion
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 3 + Math.random() * 2; 
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

const MorphingParticles = () => {
    const count = 5000;
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Geometry
    const shape1 = useMemo(() => generateShape1(count), []);
    const shape2 = useMemo(() => generateShape2(count), []);
    const shape3 = useMemo(() => generateShape3(count), []);
    const shapeChaos = useMemo(() => generateChaos(count), []);

    // Colors
    const colorBlack = new THREE.Color("#252525");
    const colorBlue = new THREE.Color("#2962FF");

    useFrame(({ clock }) => {
        if (!pointsRef.current || !groupRef.current) return;

        const cycle = 12; 
        const t = clock.elapsedTime % cycle;
        
        const positions = pointsRef.current.geometry.attributes.position;
        const material = pointsRef.current.material as THREE.PointsMaterial;

        // TIMELINE:
        // 0-2:   SWIRL -> 1
        // 2-3:   HOLD 1
        // 3-5:   ROTATE & MORPH -> 2 (Reveal)
        // 5-6:   HOLD 2
        // 6-7:   EXPLODE (Chaos)
        // 7-9:   CONDENSE -> 3 (Blue)
        // 9-11:  HOLD 3
        // 11-12: DISSIPATE

        let rotationY = 0;
        let currentColor = colorBlack.clone();
        let targetSize = 0.035;

        // ANIMATION LOGIC
        if (t < 2) {
            // SWIRL ENTRY
            const p = t / 2;
            const ease = 1 - Math.pow(1 - p, 3); // Cubic Out
            
            for (let i = 0; i < count; i++) {
                const s = shapeChaos[i];
                const e = shape1[i];
                
                // Spiral in
                const angle = (1 - ease) * Math.PI * 4; 
                const radiusMult = (1 - ease) * 3 + 1;
                
                const xBase = THREE.MathUtils.lerp(s.x, e.x, ease);
                const y = THREE.MathUtils.lerp(s.y, e.y, ease);
                const zBase = THREE.MathUtils.lerp(s.z, e.z, ease);
                
                // Rotate around Y
                const x = xBase * Math.cos(angle) - zBase * Math.sin(angle);
                const z = xBase * Math.sin(angle) + zBase * Math.cos(angle);
                
                positions.setXYZ(i, x * radiusMult, y, z * radiusMult);
            }
        } 
        else if (t < 3) {
            // HOLD 1
            for (let i = 0; i < count; i++) {
                const p = shape1[i];
                positions.setXYZ(i, p.x, p.y, p.z);
            }
        }
        else if (t < 5) {
            // ROTATE -> 2
            const p = (t - 3) / 2;
            const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // Ease InOut Quad
            
            // Rotate the entire group -90 degrees
            rotationY = THREE.MathUtils.lerp(0, -Math.PI / 2, ease);

            // Morph points from 1 to 2
            for (let i = 0; i < count; i++) {
                const s = shape1[i];
                const e = shape2[i];
                
                const x = THREE.MathUtils.lerp(s.x, e.x, ease);
                const y = THREE.MathUtils.lerp(s.y, e.y, ease);
                const z = THREE.MathUtils.lerp(s.z, e.z, ease);
                
                positions.setXYZ(i, x, y, z);
            }
        }
        else if (t < 6) {
            // HOLD 2
            rotationY = -Math.PI / 2;
            for (let i = 0; i < count; i++) {
                const p = shape2[i];
                positions.setXYZ(i, p.x, p.y, p.z);
            }
        }
        else if (t < 7) {
            // EXPLODE (2 -> Chaos)
            const p = (t - 6) / 1;
            const ease = 1 - Math.pow(1 - p, 2); // Quad Out
            
            rotationY = -Math.PI / 2;
            
            for (let i = 0; i < count; i++) {
                const s = shape2[i];
                const e = shapeChaos[i];
                
                // Explode outwards
                const x = THREE.MathUtils.lerp(s.x, e.x, ease * 0.9);
                const y = THREE.MathUtils.lerp(s.y, e.y, ease * 0.9);
                const z = THREE.MathUtils.lerp(s.z, e.z, ease * 0.9);
                
                positions.setXYZ(i, x, y, z);
            }
            // Transition color to blue
            if (p > 0.8) currentColor.lerp(colorBlue, (p - 0.8) * 5);
        }
        else if (t < 9) {
            // CONDENSE (Chaos -> 3)
            const p = (t - 7) / 2;
            const ease = 1 - Math.pow(1 - p, 3); // Cubic Out
            
            rotationY = -Math.PI / 2;
            currentColor = colorBlue;
            targetSize = 0.04; 
            
            for (let i = 0; i < count; i++) {
                const s = shapeChaos[i];
                const e = shape3[i];
                
                // Morph
                const x = THREE.MathUtils.lerp(s.x * 0.8, e.x, ease);
                const y = THREE.MathUtils.lerp(s.y * 0.8, e.y, ease);
                const z = THREE.MathUtils.lerp(s.z * 0.8, e.z, ease);
                
                // Add magnetic vibration
                const vib = (1 - ease) * 0.15;
                positions.setXYZ(i, x + (Math.random()-0.5)*vib, y + (Math.random()-0.5)*vib, z + (Math.random()-0.5)*vib);
            }
        }
        else if (t < 11) {
            // HOLD 3
            rotationY = -Math.PI / 2;
            currentColor = colorBlue;
            targetSize = 0.04;
            
            for (let i = 0; i < count; i++) {
                const p = shape3[i];
                positions.setXYZ(i, p.x, p.y, p.z);
            }
        }
        else {
            // DISSIPATE
            const p = (t - 11) / 1;
            rotationY = -Math.PI / 2;
            currentColor.lerp(colorBlack, p);
            
            for (let i = 0; i < count; i++) {
                const s = shape3[i];
                const e = shapeChaos[i];
                
                const x = THREE.MathUtils.lerp(s.x, e.x, p);
                const y = THREE.MathUtils.lerp(s.y, e.y, p);
                const z = THREE.MathUtils.lerp(s.z, e.z, p);
                
                positions.setXYZ(i, x, y, z);
            }
        }

        groupRef.current.rotation.y = rotationY;
        material.color.copy(currentColor);
        material.size = targetSize;
        positions.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={new Float32Array(count * 3)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.035}
                    color="#252525"
                    transparent
                    opacity={0.9}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.NormalBlending}
                />
            </points>
        </group>
    );
};

export const ConvergenceScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#444" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#2962FF" />
        
        <group position={[0, 0, 0]}> 
            <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
                <MorphingParticles />
            </Float>
        </group>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export const AgenticNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
           <group rotation={[0, 0, Math.PI / 4]}>
              <Icosahedron args={[1.2, 0]} position={[0, 0, 0]}>
                 <meshStandardMaterial color="#252525" wireframe />
              </Icosahedron>
              
              {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const radius = 3.5;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                      <group key={i} position={[x, y, 0]}>
                          <Sphere args={[0.15, 16, 16]}>
                              <meshStandardMaterial color="#4285F4" />
                          </Sphere>
                          <Line 
                            points={[[0, 0, 0], [-x, -y, 0]]} 
                            color="#252525" 
                            lineWidth={1} 
                            transparent 
                            opacity={0.2} 
                          />
                           <Sphere args={[0.08, 16, 16]} position={[0.5, 0.5, 0]}>
                              <meshStandardMaterial color="#DB4437" />
                           </Sphere>
                           <Line 
                            points={[[0, 0, 0], [0.5, 0.5, 0]]} 
                            color="#252525" 
                            lineWidth={0.5} 
                            transparent 
                            opacity={0.1} 
                          />
                      </group>
                  )
              })}
           </group>
        </Float>
      </Canvas>
    </div>
  );
}
