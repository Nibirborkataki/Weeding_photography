import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { heroState } from './heroState'
import { prefersReducedMotion } from '../../lib/gsap'

/** Wedding-band cross-section (rounded "comfort fit" profile) spun into a ring. */
function useBandGeometry(radius, width, thickness) {
  return useMemo(() => {
    const points = []
    const steps = 120
    const exp = 0.45 // superellipse exponent: < 1 gives softly squared edges
    for (let i = steps; i >= 0; i--) {
      const t = (i / steps) * Math.PI * 2
      const c = Math.cos(t)
      const s = Math.sin(t)
      points.push(
        new THREE.Vector2(
          radius + (thickness / 2) * Math.sign(c) * Math.abs(c) ** exp,
          (width / 2) * Math.sign(s) * Math.abs(s) ** exp,
        ),
      )
    }
    return new THREE.LatheGeometry(points, 200)
  }, [radius, width, thickness])
}

function Rings() {
  const group = useRef(null)
  const spin = useRef(null)
  const { viewport } = useThree()
  const large = useBandGeometry(1, 0.34, 0.12)
  const small = useBandGeometry(0.84, 0.26, 0.1)

  const scale = Math.min(viewport.width * 0.28, viewport.height * 0.3)

  useFrame((state, delta) => {
    const g = group.current
    const p = heroState.scroll
    const { pointer } = state
    spin.current.rotation.y += delta * 0.22
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.25 + p * 0.9, 3, delta)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, pointer.x * 0.18, 3, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, p * 1.6, 4, delta)
  })

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.08, 0.08]}>
        <group ref={spin} rotation={[0.25, 0, -0.18]}>
          <mesh geometry={large} rotation={[Math.PI / 2 - 0.35, 0.2, 0]} position={[-0.3, 0.12, 0]}>
            <meshPhysicalMaterial
              color="#e9c98f"
              metalness={1}
              roughness={0.16}
              clearcoat={1}
              clearcoatRoughness={0.12}
              envMapIntensity={1.25}
            />
          </mesh>
          <mesh geometry={small} rotation={[0.35, 0.1, Math.PI / 2 - 0.2]} position={[0.34, -0.2, 0]}>
            <meshPhysicalMaterial
              color="#f0d3a8"
              metalness={1}
              roughness={0.12}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1.35}
            />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

function makeDotTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

/** Softly drifting gold dust. */
function Dust({ count }) {
  const ref = useRef(null)
  const { positions, texture } = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return { positions: arr, texture: makeDotTexture() }
  }, [count])

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.025
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15 + heroState.scroll * 0.8
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#b8975a"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroScene({ active = true }) {
  const reduced = prefersReducedMotion()
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      dpr={[1, isSmall ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      eventSource={typeof document !== 'undefined' ? document.getElementById('root') : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#fff6e8" />
      <Rings />
      <Dust count={isSmall ? 45 : 90} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#efe6d9']} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, -6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#fff1dc" position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={4} color="#fff7ea" position={[2, 3, 6]} scale={2} />
        <Lightformer form="rect" intensity={0.9} color="#b39a78" position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[12, 12, 1]} />
      </Environment>
    </Canvas>
  )
}
