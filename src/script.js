import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene 
const scene = new THREE.Scene()

// GUI
const gui = new GUI()
const planets = gui.addFolder('Planets')
const sunFolder = planets.addFolder('Sun')

// Textures

// Planets and sun
const textureLoader = new THREE.TextureLoader()

const sunTexture = textureLoader.load('/textures/sun.jpg')
sunTexture.color = THREE.SRGBColorSpace
sunTexture.magFilter = THREE.NearestFilter
sunTexture.minFilter = THREE.NearestFilter

const mercuryTexture = textureLoader.load('/textures/planets/mercury.jpg')
mercuryTexture.color = THREE.SRGBColorSpace
mercuryTexture.magFilter = THREE.NearestFilter
mercuryTexture.minFilter = THREE.NearestFilter

const venusTexture = textureLoader.load('/textures/planets/venus.jpg')
venusTexture.color = THREE.SRGBColorSpace
venusTexture.magFilter = THREE.NearestFilter
venusTexture.minFilter = THREE.NearestFilter

const earthTexture = textureLoader.load('/textures/planets/earth.jpg')
earthTexture.color = THREE.SRGBColorSpace
earthTexture.magFilter = THREE.NearestFilter
earthTexture.minFilter = THREE.NearestFilter

const marsTexture = textureLoader.load('/textures/planets/mars.jpg')
marsTexture.color = THREE.SRGBColorSpace
marsTexture.magFilter = THREE.NearestFilter
marsTexture.minFilter = THREE.NearestFilter

const jupiterTexture = textureLoader.load('/textures/planets/jupiter.jpg')
jupiterTexture.color = THREE.SRGBColorSpace
jupiterTexture.magFilter = THREE.NearestFilter
jupiterTexture.minFilter = THREE.NearestFilter

const saturnTexture = textureLoader.load('/textures/planets/saturn.jpg')
saturnTexture.color = THREE.SRGBColorSpace
saturnTexture.magFilter = THREE.NearestFilter
saturnTexture.minFilter = THREE.NearestFilter

const saturnRing = textureLoader.load('/textures/planets/saturn_rings.jpg')
saturnRing.color = THREE.SRGBColorSpace
saturnRing.magFilter = THREE.NearestFilter
saturnRing.minFilter = THREE.NearestFilter

const uranusTexture = textureLoader.load('/textures/planets/uranus.jpg')
uranusTexture.color = THREE.SRGBColorSpace
uranusTexture.magFilter = THREE.NearestFilter
uranusTexture.minFilter = THREE.NearestFilter

const neptuneTexture = textureLoader.load('/textures/planets/neptune.jpg')
neptuneTexture.color = THREE.SRGBColorSpace
neptuneTexture.magFilter = THREE.NearestFilter
neptuneTexture.minFilter = THREE.NearestFilter

const particleTexture = textureLoader.load('/textures/particles/8.png')


/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 3000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 30
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.03
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#ff88cc')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.01
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Geometry and Materials
 */

// Sun
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
sunFolder.add(sunMaterial, 'wireframe')

// Mercury 
const mercuryGeometry = new THREE.SphereGeometry(0.1, 32, 32)
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture })

// Venus 
const venusGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture })

// Earth 
const earthGeometry = new THREE.SphereGeometry(0.22, 32, 32)
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture })

// Mars 
const marsGeometry = new THREE.SphereGeometry(0.15, 32, 32)
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture })

// Jupiter
const jupiterGeometry = new THREE.SphereGeometry(0.4, 32, 32)
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture })

// Saturn
const saturnGeometry = new THREE.SphereGeometry(0.35, 32, 32)
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture })
const saturnRingsGeometry = new THREE.TorusGeometry(0.45, 0.05, 2, 50)
const saturnRingsMaterial = new THREE.MeshBasicMaterial({ map: saturnRing })

// Uranus
const uranusGeometry = new THREE.SphereGeometry(0.3, 32, 32)
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture })

// Neptune
const neptuneGeometry = new THREE.SphereGeometry(0.3, 32, 32)
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture })


/**
 * Meshes
 */
// Sun
const sun = new THREE.Mesh(sunGeometry, sunMaterial)

// Mercury
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
mercury.position.x = 1.5

// Venus
const venus = new THREE.Mesh(venusGeometry, venusMaterial)
venus.position.x = 2

// Earth
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
earth.position.x = 3

// Mars 
const mars = new THREE.Mesh(marsGeometry, marsMaterial)
mars.position.x = 4

// Jupiter
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
jupiter.position.x = 5

// Saturn
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
saturn.position.x = 7
const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial)
saturnRings.position.x = 7
saturnRings.rotation.x = Math.PI * 0.7

// Uranus
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial)
uranus.position.x = 8

// Neptune
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial)
neptune.position.x = 9

scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, saturnRings, uranus, neptune)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resizing
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Cameras
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio),)

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Controls update
    controls.update
    const timeline = gsap.timeline();

    timeline.to(sun.rotation, { 
        duration: 1, 
        y: elapsedTime * 0.1
    })

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()