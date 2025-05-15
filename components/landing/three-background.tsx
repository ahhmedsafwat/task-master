import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Define types for particle props
interface ParticleProps {
  position: [number, number, number]
  speed: number
  direction: {
    x: number
    y: number
  }
}

// Create a floating particle
const Particle = ({ position, direction }: ParticleProps) => {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.x += direction.x
      mesh.current.position.y += direction.y

      // If particle goes out of bounds, reset position
      if (
        Math.abs(mesh.current.position.x) > 20 ||
        Math.abs(mesh.current.position.y) > 20
      ) {
        mesh.current.position.x = (Math.random() - 0.5) * 40
        mesh.current.position.y = (Math.random() - 0.5) * 40
      }
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  )
}

// Create particles group
const Particles = ({ count = 100 }) => {
  const particles = useMemo(() => {
    const temp: ParticleProps[] = []
    for (let i = 0; i < count; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 10,
      ]
      const speed = 0.01 + Math.random() * 0.05
      const direction = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
      }
      temp.push({ position, speed, direction })
    }
    return temp
  }, [count])

  return (
    <group>
      {particles.map((props, i) => (
        <Particle key={i} {...props} />
      ))}
    </group>
  )
}

interface BackgroundPlaneProps {
  primaryColor: string
  secondaryColor: string
}

// Background plane with shader
const BackgroundPlane = ({
  primaryColor,
  secondaryColor,
}: BackgroundPlaneProps) => {
  // Access the THREE.js objects
  const { size } = useThree()

  const planeRef = useRef<THREE.Mesh>(null)

  // Create shader material on mount and update values in useFrame
  React.useEffect(() => {
    if (!planeRef.current) return

    // Create material and apply to mesh
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_color1: { value: new THREE.Color(primaryColor) },
        u_color2: { value: new THREE.Color(secondaryColor) },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        varying vec2 vUv;
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                              -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          
          // First corner
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          
          // Other corners
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          
          // Permutations
          i = mod289(i); // Avoid truncation effects in permutation
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                           + i.x + vec3(0.0, i1.x, 1.0 ));
                           
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          
          // Gradients: 41 points uniformly over a line, mapped onto a diamond.
          // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          
          // Normalise gradients implicitly by scaling m
          // Approximation of: m *= inversesqrt( a0*a0 + h*h );
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          
          // Compute final noise value at P
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          // Normalized coordinates
          vec2 st = vUv;
          
          // Multiple layered noise
          float noise1 = snoise(st * 3.0 + u_time * 0.1) * 0.5 + 0.5;
          float noise2 = snoise(st * 5.0 - u_time * 0.15) * 0.5 + 0.5;
          float noise3 = snoise(st * 8.0 + u_time * 0.05) * 0.5 + 0.5;
          
          // Combined noise
          float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
          
          // Create wave pattern
          float wave = sin(st.x * 10.0 + u_time + finalNoise * 5.0) * 0.5 + 0.5;
          wave *= sin(st.y * 8.0 - u_time * 0.5) * 0.5 + 0.5;
          
          // Edge fade
          float edgeFade = smoothstep(0.0, 0.3, st.x) * smoothstep(1.0, 0.7, st.x);
          edgeFade *= smoothstep(0.0, 0.3, st.y) * smoothstep(1.0, 0.7, st.y);
          
          // Color mix based on noise
          vec3 color = mix(u_color1, u_color2, finalNoise);
          
          // Apply wave and edge fade
          float alpha = wave * edgeFade * 0.7;
          
          // Output
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    })

    planeRef.current.material = material

    return () => {
      // Clean up on unmount
      if (material) {
        material.dispose()
      }
    }
  }, [primaryColor, secondaryColor, size.width, size.height])

  // Update shader uniforms on each frame
  useFrame(({ clock }) => {
    if (
      planeRef.current &&
      planeRef.current.material instanceof THREE.ShaderMaterial
    ) {
      const material = planeRef.current.material
      material.uniforms.u_time.value = clock.getElapsedTime()
      material.uniforms.u_resolution.value = new THREE.Vector2(
        size.width,
        size.height,
      )
      material.uniforms.u_color1.value = new THREE.Color(primaryColor)
      material.uniforms.u_color2.value = new THREE.Color(secondaryColor)
    }
  })

  return (
    <mesh rotation={[0, 0, 0]} ref={planeRef}>
      <planeGeometry args={[40, 40, 32, 32]} />
    </mesh>
  )
}

interface ThreeBackgroundProps {
  primaryColor?: string
  secondaryColor?: string
  particleCount?: number
  className?: string
  transitionCompleted?: boolean
}

// Main component with fade-in
const ThreeBackground = ({
  primaryColor = '#c70036',
  secondaryColor = '#4d0218',
  particleCount = 50, // Reduced from 100
  className = '',
}: ThreeBackgroundProps) => {
  const [opacity, setOpacity] = useState(0)

  // Fade in the background after animations complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 750)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`h-full w-full ${className}`}
      style={{
        opacity,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{
          antialias: false, // Disable antialiasing for performance
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <BackgroundPlane
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <Particles count={particleCount} />
      </Canvas>
    </div>
  )
}

export default ThreeBackground
