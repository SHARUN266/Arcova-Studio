"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  // Track mouse for subtle tilt
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Slow rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    
    // Subtle mouse-reactive tilt
    const targetX = mousePos.current.y * 0.3
    const targetY = mousePos.current.x * 0.3
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02
  })

  // Create a slightly deformed sphere geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 64)
    const posAttribute = geo.attributes.position
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i)
      const y = posAttribute.getY(i)
      const z = posAttribute.getZ(i)
      
      const noise = Math.sin(x * 2) * Math.cos(y * 2) * Math.sin(z * 2) * 0.1
      posAttribute.setXYZ(i, x + noise, y + noise, z + noise)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh 
        ref={meshRef} 
        geometry={geometry}
        onPointerMove={(e) => {
          mousePos.current = { x: e.point.x * 0.1, y: e.point.y * 0.1 }
        }}
      >
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          chromaticAberration={1}
          anisotropy={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          color="#8B5CF6"
          resolution={1024}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  return (
    <Sparkles 
      count={120} 
      scale={12} 
      size={1} 
      speed={0.3} 
      opacity={0.25} 
      color="#F59E0B" 
    />
  )
}

// Mouse tracking for the entire canvas
function MouseTracker() {
  const { viewport } = useThree()
  
  useFrame((state) => {
    // Gentle camera sway based on mouse
    const x = state.pointer.x * 0.3
    const y = state.pointer.y * 0.3
    state.camera.position.x += (x - state.camera.position.x) * 0.02
    state.camera.position.y += (y - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })
  
  return null
}

export function ThreeOrb() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#F59E0B" />
        
        <Orb />
        <Particles />
        <MouseTracker />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
