'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface GenerativeCanvasThemeProps {
  intensity: 'static' | 'subtle' | 'full'
  isActive: boolean
}

export function GenerativeCanvasTheme({ intensity, isActive }: GenerativeCanvasThemeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    material: THREE.ShaderMaterial
    animationId: number | null
  } | null>(null)

  // Vertex shader - simple pass-through
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Fragment shader - Perlin noise flow field
  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    
    varying vec2 vUv;
    
    // Perlin noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    // Flow field function
    vec2 flowField(vec2 pos, float time) {
      float noise1 = snoise(vec3(pos * 0.01, time * 0.1));
      float noise2 = snoise(vec3(pos * 0.02, time * 0.15));
      
      float angle = noise1 * 6.28318 + noise2 * 3.14159;
      return vec2(cos(angle), sin(angle));
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 pos = uv * u_resolution;
      
      // Mouse interaction
      vec2 mouseInfluence = u_mouse / u_resolution;
      float mouseDist = distance(uv, mouseInfluence);
      float mouseEffect = 1.0 - smoothstep(0.0, 0.3, mouseDist);
      
      // Flow field calculation
      vec2 flow = flowField(pos, u_time);
      
      // Create multiple layers of noise
      float noise1 = snoise(vec3(uv * 8.0, u_time * 0.5));
      float noise2 = snoise(vec3(uv * 16.0, u_time * 0.3));
      float noise3 = snoise(vec3(uv * 32.0, u_time * 0.7));
      
      // Combine noise layers
      float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Apply flow field distortion
      vec2 distortedUV = uv + flow * 0.1 * u_intensity;
      float flowNoise = snoise(vec3(distortedUV * 12.0, u_time * 0.4));
      
      // Color palette based on noise
      vec3 color1 = vec3(0.2, 0.1, 0.8); // Deep blue
      vec3 color2 = vec3(0.8, 0.2, 0.8); // Magenta
      vec3 color3 = vec3(0.1, 0.8, 0.9); // Cyan
      vec3 color4 = vec3(0.9, 0.1, 0.4); // Pink
      
      // Interpolate colors based on noise
      vec3 color = mix(color1, color2, smoothstep(-0.5, 0.5, combinedNoise));
      color = mix(color, color3, smoothstep(-0.3, 0.7, flowNoise));
      color = mix(color, color4, smoothstep(0.2, 0.8, noise2));
      
      // Add mouse interaction glow
      color += mouseEffect * vec3(1.0, 0.8, 0.2) * 0.5;
      
      // Intensity scaling
      color *= u_intensity;
      
      // Add subtle vignette
      float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.8;
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_mouse: { value: new THREE.Vector2(width / 2, height / 2) },
        u_intensity: { value: intensity === 'full' ? 1.0 : intensity === 'subtle' ? 0.5 : 0.2 }
      }
    })

    // Create geometry and mesh
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Mouse tracking
    let mouseX = width / 2
    let mouseY = height / 2

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = height - event.clientY // Flip Y coordinate
      material.uniforms.u_mouse.value.set(mouseX, mouseY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let startTime = Date.now()
    let animationId: number

    const animate = () => {
      const currentTime = (Date.now() - startTime) * 0.001
      material.uniforms.u_time.value = currentTime
      
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Store references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      animationId: 0
    }

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      
      renderer.setSize(newWidth, newHeight)
      material.uniforms.u_resolution.value.set(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      
      // Cleanup Three.js resources
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isActive, intensity])

  // Update intensity when it changes
  useEffect(() => {
    if (sceneRef.current?.material) {
      const intensityValue = intensity === 'full' ? 1.0 : intensity === 'subtle' ? 0.5 : 0.2
      sceneRef.current.material.uniforms.u_intensity.value = intensityValue
    }
  }, [intensity])

  if (!isActive) return null

  return (
    <motion.div
      className="fixed inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'black' }}
      />
      
      {/* Overlay instructions */}
      <motion.div
        className="fixed top-8 left-8 bg-black/80 border border-purple-500/30 rounded-lg p-4 backdrop-blur-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-purple-400 font-mono text-sm">
          <div className="font-bold mb-2">Generative Canvas</div>
          <div className="text-purple-300 space-y-1">
            <div>• Move cursor to paint with light</div>
            <div>• Real-time GPU-generated art</div>
            <div>• Perlin noise flow fields</div>
            <div>• Interactive particle systems</div>
          </div>
        </div>
      </motion.div>

      {/* Performance indicator */}
      <motion.div
        className="fixed bottom-8 right-8 bg-black/80 border border-purple-500/30 rounded-lg p-3 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-purple-400 font-mono text-xs">
          <div>GPU Accelerated</div>
          <div className="text-purple-300">WebGL + GLSL Shaders</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
