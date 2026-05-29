"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 62_000;
const SHAPE_COUNT = 3;
const MORPH_DURATION = 2.2;
const IDLE_DURATION = 5.5;

export function SiteBackground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);

		function updateCamera() {
			const aspect = window.innerWidth / window.innerHeight;
			const fovRad = (camera.fov * Math.PI) / 180;
			let z = 28.0 / Math.tan(fovRad / 2);
			if (aspect < 1.0) z /= aspect;
			camera.position.z = z;
		}
		updateCamera();

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.35;
		container.appendChild(renderer.domElement);

		const geo = new THREE.BufferGeometry();
		const positions = new Float32Array(PARTICLE_COUNT * 3);
		const ids = new Float32Array(PARTICLE_COUNT);
		const randoms = new Float32Array(PARTICLE_COUNT * 3);

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			ids[i] = i / PARTICLE_COUNT;
			randoms[i * 3] = Math.random();
			randoms[i * 3 + 1] = Math.random();
			randoms[i * 3 + 2] = Math.random();
		}

		geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		geo.setAttribute("aId", new THREE.BufferAttribute(ids, 1));
		geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 3));

		const uniforms = {
			uTime: { value: 0 },
			uMorphProgress: { value: 0 },
			uCurrentShape: { value: 0 },
			uTargetShape: { value: 0 },
			uMouse: { value: new THREE.Vector2(0, 0) },
			uIntensity: { value: 1 },
		};

		const mat = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uMorphProgress;
        uniform int uCurrentShape;
        uniform int uTargetShape;
        uniform vec2 uMouse;
        uniform float uIntensity;

        attribute float aId;
        attribute vec3 aRandom;

        varying vec3 vColor;
        varying float vAlpha;

        #define PI 3.14159265359

        vec3 getSphere(float id, vec3 rnd) {
          float phi   = acos(1.0 - 2.0 * rnd.y);
          float theta = rnd.x * PI * 2.0;
          float r     = 20.0 + (rnd.z - 0.5) * 6.0;
          return vec3(
            r * sin(phi) * cos(theta),
            r * cos(phi) * 0.65,
            r * sin(phi) * sin(theta)
          );
        }

        vec3 octaVertex(float idx) {
          float r = 17.0;
          if (idx < 0.5) return vec3(0.0,  r, 0.0);
          if (idx < 1.5) return vec3(0.0, -r, 0.0);
          if (idx < 2.5) return vec3( r, 0.0, 0.0);
          if (idx < 3.5) return vec3(-r, 0.0, 0.0);
          if (idx < 4.5) return vec3(0.0, 0.0,  r);
          return vec3(0.0, 0.0, -r);
        }

        vec3 alongEdge3(vec3 a, vec3 b, float t, vec3 rnd) {
          vec3 pos = mix(a, b, t);
          vec3 jitter = vec3(
            (rnd.y - 0.5) * 0.5,
            (fract(rnd.y * 7.3) - 0.5) * 0.5,
            (rnd.z - 0.5) * 0.5
          );
          return pos + jitter;
        }

        // Shape 1: wireframe octahedron (diamond)
        vec3 getOctahedron(float id, vec3 rnd) {
          float edge = min(floor(rnd.z * 12.0), 11.0);
          float t = rnd.x;

          if (edge < 0.5) return alongEdge3(octaVertex(0.0), octaVertex(2.0), t, rnd);
          if (edge < 1.5) return alongEdge3(octaVertex(0.0), octaVertex(3.0), t, rnd);
          if (edge < 2.5) return alongEdge3(octaVertex(0.0), octaVertex(4.0), t, rnd);
          if (edge < 3.5) return alongEdge3(octaVertex(0.0), octaVertex(5.0), t, rnd);
          if (edge < 4.5) return alongEdge3(octaVertex(1.0), octaVertex(2.0), t, rnd);
          if (edge < 5.5) return alongEdge3(octaVertex(1.0), octaVertex(3.0), t, rnd);
          if (edge < 6.5) return alongEdge3(octaVertex(1.0), octaVertex(4.0), t, rnd);
          if (edge < 7.5) return alongEdge3(octaVertex(1.0), octaVertex(5.0), t, rnd);
          if (edge < 8.5) return alongEdge3(octaVertex(2.0), octaVertex(4.0), t, rnd);
          if (edge < 9.5) return alongEdge3(octaVertex(2.0), octaVertex(5.0), t, rnd);
          if (edge < 10.5) return alongEdge3(octaVertex(3.0), octaVertex(4.0), t, rnd);
          return alongEdge3(octaVertex(3.0), octaVertex(5.0), t, rnd);
        }

        vec3 getWaveform(float id, vec3 rnd) {
          float numBars = 22.0;
          float barIdx  = floor(rnd.x * numBars);
          float t       = barIdx / (numBars - 1.0);
          float h = 4.0
            + 11.0 * abs(sin(barIdx * 0.85 + 0.4))
            + 3.5  * abs(sin(barIdx * 0.4  + 1.2));
          float x = (t - 0.5) * 40.0;
          float y = (rnd.y * 2.0 - 1.0) * h;
          float z = (rnd.z - 0.5) * 1.5;
          return vec3(x, y, z);
        }

        vec3 getPosition(int shape, float id, vec3 rnd) {
          if (shape == 0) return getSphere(id, rnd);
          if (shape == 1) return getOctahedron(id, rnd);
          if (shape == 2) return getWaveform(id, rnd);
          return vec3(0.0);
        }

        vec3 huePalette(float t) {
          float hue = fract(t + uTime * 0.04);
          vec3 k = vec3(0.0, 0.666, 0.333);
          vec3 p = abs(fract(vec3(hue) + k.xyz) * 6.0 - 3.0);
          return clamp(p - 1.0, 0.0, 1.0);
        }

        vec3 GREEN  = vec3(0.12, 1.0,  0.38);
        vec3 BLUE   = vec3(0.22, 0.42, 1.0);
        vec3 CYAN   = vec3(0.15, 0.95, 1.0);

        vec3 getColor(int shape, float id, vec3 rnd) {
          if (shape == 0) {
            float t = id + rnd.x * 0.35;
            vec3 rgb = huePalette(t);
            float spark = step(0.965, rnd.z);
            return mix(rgb * (0.55 + 0.45 * rnd.y), vec3(1.0), spark);
          }
          if (shape == 1) {
            float t = rnd.x + rnd.y * 0.25 + floor(rnd.z * 12.0) * 0.04;
            vec3 rgb = huePalette(t);
            float spark = step(0.975, fract(rnd.x * 13.1 + rnd.y * 9.7));
            return mix(rgb * (0.65 + 0.35 * rnd.y), vec3(1.0), spark);
          }
          if (shape == 2) {
            float t = floor(rnd.x * 22.0) / 21.0;
            float amp = abs(rnd.y * 2.0 - 1.0);
            vec3 bar = mix(GREEN, mix(CYAN, BLUE, t), t);
            return bar * (0.5 + 0.5 * amp);
          }
          return vec3(1.0);
        }

        float cubicInOut(float t) {
          return t < 0.5
            ? 4.0 * t * t * t
            : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
        }

        void main() {
          vec3 p1 = getPosition(uCurrentShape, aId, aRandom);
          vec3 p2 = getPosition(uTargetShape,  aId, aRandom);
          vec3 c1 = getColor(uCurrentShape, aId, aRandom);
          vec3 c2 = getColor(uTargetShape,  aId, aRandom);

          float eased   = cubicInOut(uMorphProgress);
          vec3 finalPos = mix(p1, p2, eased);

          float sphereWeight = 0.0;
          if (uCurrentShape == 0) sphereWeight += 1.0 - eased;
          if (uTargetShape  == 0) sphereWeight += eased;
          float autoRot = uTime * 0.05 * sphereWeight;

          float rotY = uMouse.x * 0.38 + autoRot;
          float rotX = uMouse.y * 0.28;

          mat3 RY = mat3(
             cos(rotY), 0.0, sin(rotY),
             0.0,       1.0, 0.0,
            -sin(rotY), 0.0, cos(rotY)
          );
          mat3 RX = mat3(
            1.0, 0.0,       0.0,
            0.0, cos(rotX), -sin(rotX),
            0.0, sin(rotX),  cos(rotX)
          );

          finalPos = RY * RX * finalPos;
          vColor   = mix(c1, c2, eased) * uIntensity;

          float shimmer = 0.6 + 0.4 * sin(uTime * 1.1 + aId * PI * 12.0);
          vAlpha = 0.72 + 0.28 * shimmer;

          vec4 mvPos = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = (1.5 + aRandom.x * 3.2) * (46.0 / -mvPos.z);
        }
      `,
			fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2  uv   = gl_PointCoord.xy - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.05, dist);
          gl_FragColor = vec4(vColor, alpha * vAlpha * 0.95);
        }
      `,
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		});

		const points = new THREE.Points(geo, mat);
		scene.add(points);

		let currentShape = 0;
		let targetShape = 0;
		let morphProgress = 0;
		let isTransitioning = false;
		let idleTimer = 0;

		const mouse = new THREE.Vector2(0, 0);
		const targetMouse = new THREE.Vector2(0, 0);

		function readIntensity() {
			const theme = document.documentElement.getAttribute("data-troisi-theme");
			if (theme === "light") return 0.75;
			if (theme === "dark") return 1.25;
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? 1.25
				: 0.75;
		}

		function onMouseMove(e: MouseEvent) {
			targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		}

		function onResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			updateCamera();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function onScroll() {
			if (!container) return;
			const offset = window.scrollY * 0.12;
			container.style.transform = `translate3d(0, ${offset}px, 0)`;
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onScroll, { passive: true });

		const timer = new THREE.Timer();
		timer.connect(document);
		let rafId: number;

		function tick(timestamp: number) {
			rafId = requestAnimationFrame(tick);
			timer.update(timestamp);
			const delta = timer.getDelta();
			const elapsed = timer.getElapsed();

			mouse.x += (targetMouse.x - mouse.x) * delta * 2.0;
			mouse.y += (targetMouse.y - mouse.y) * delta * 2.0;

			if (isTransitioning) {
				morphProgress += delta / MORPH_DURATION;
				if (morphProgress >= 1) {
					morphProgress = 0;
					currentShape = targetShape;
					isTransitioning = false;
					idleTimer = 0;
				}
			} else {
				idleTimer += delta;
				if (idleTimer >= IDLE_DURATION) {
					targetShape = (targetShape + 1) % SHAPE_COUNT;
					isTransitioning = true;
					morphProgress = 0;
				}
			}

			uniforms.uTime.value = elapsed;
			uniforms.uMorphProgress.value = morphProgress;
			uniforms.uCurrentShape.value = currentShape;
			uniforms.uTargetShape.value = targetShape;
			uniforms.uMouse.value.copy(mouse);
			uniforms.uIntensity.value = readIntensity();

			renderer.render(scene, camera);
		}

		rafId = requestAnimationFrame(tick);
		onScroll();

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("scroll", onScroll);
			geo.dispose();
			mat.dispose();
			renderer.dispose();
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	}, []);

	return <div ref={containerRef} className="site-background" aria-hidden />;
}
