'use client'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'

type PortalFieldProps = {
  intensity?: number
  className?: string
}

const GOLD_TONES = ['#FFE07A', '#FFB02E', '#FFD700']

function createParticleGeometry(count: number) {
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const radius = 6 + Math.random() * 6
    const angle = Math.random() * Math.PI * 2
    const height = (Math.random() - 0.5) * 6

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius

    speeds[i] = 0.15 + Math.random() * 0.45
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))

  return geometry
}

function createRing(radius: number, color: THREE.ColorRepresentation, opacity = 0.3) {
  const points: THREE.Vector3[] = []
  const segments = 180

  for (let i = 0; i <= segments; i += 1) {
    const theta = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    linewidth: 1,
  })

  return new THREE.LineLoop(geometry, material)
}

export function PortalField({ intensity = 1, className }: PortalFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let renderer: THREE.WebGLRenderer | null = null

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (error) {
      console.warn('[PortalField] WebGL renderer unavailable, skipping effect.', error)
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor('#050507', 0.72)
    ;(renderer as THREE.WebGLRenderer).outputColorSpace = THREE.SRGBColorSpace
    ;(renderer as THREE.WebGLRenderer).toneMapping = THREE.ACESFilmicToneMapping
    ;(renderer as THREE.WebGLRenderer).toneMappingExposure = 0.9
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'none'

    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2('#050505', 0.035)

    const aspect = container.clientHeight === 0 ? 1 : container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(
      48,
      aspect,
      0.1,
      120,
    )
    camera.position.set(0, 4, 28)

    const group = new THREE.Group()
    scene.add(group)

    const particleCount = Math.max(600, Math.floor(1400 * intensity))
    const particleGeometry = createParticleGeometry(particleCount)
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#FFD700') },
        uColorB: { value: new THREE.Color('#FF9D2E') },
      },
      vertexShader: `
        uniform float uTime;
        attribute float speed;
        void main() {
          vec3 transformed = position;
          float theta = uTime * speed * 0.2;
          float radius = length(position.xz);
          float angle = atan(position.z, position.x) + theta;
          transformed.x = cos(angle) * radius;
          transformed.z = sin(angle) * radius;
          transformed.y += sin(uTime * 0.5 + radius * 0.25) * 0.25;
          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_PointSize = clamp(140.0 / -mvPosition.z, 2.0, 6.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        void main() {
          float d = length(gl_PointCoord.xy - vec2(0.5));
          if (d > 0.5) discard;
          float falloff = smoothstep(0.5, 0.0, d);
          vec3 base = mix(uColorA, uColorB, gl_FragCoord.y / 900.0);
          gl_FragColor = vec4(base, falloff * 0.85);
        }
      `,
    })

    const particleCloud = new THREE.Points(particleGeometry, particleMaterial)
    particleCloud.rotation.x = THREE.MathUtils.degToRad(12)
    group.add(particleCloud)

    const haloGroup = new THREE.Group()
    haloGroup.rotation.x = THREE.MathUtils.degToRad(78)

    const haloRadii = [8, 10.5, 13]
    ;haloRadii.forEach((radius, index) => {
      const ring = createRing(radius, GOLD_TONES[index % GOLD_TONES.length], 0.16 + index * 0.08)
      haloGroup.add(ring)
    })

    group.add(haloGroup)

    const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFECAA'),
      transparent: true,
      opacity: 0.12,
    })
    const coreGlow = new THREE.Mesh(glowGeometry, glowMaterial)
    group.add(coreGlow)

    const ambient = new THREE.AmbientLight('#FFE07A', 1)
    scene.add(ambient)

    const directional = new THREE.DirectionalLight('#FFB347', 0.9)
    directional.position.set(4, 9, 10)
    scene.add(directional)

    let animationFrame = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      group.rotation.y += 0.0016
      haloGroup.rotation.z += 0.0009
      coreGlow.material.opacity = 0.1 + Math.sin(elapsed * 0.7) * 0.05

      particleMaterial.uniforms.uTime.value = elapsed

      renderer.render(scene, camera)
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)

      particleGeometry.dispose()
      particleMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()

      group.clear()
      scene.clear()

      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [intensity])

  return <div ref={containerRef} className={['pointer-events-none absolute inset-0', className].filter(Boolean).join(' ')} />
}

export default PortalField
