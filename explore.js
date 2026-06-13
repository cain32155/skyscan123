document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('glcanvas');
  
  // 1. Setup Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020205);
  scene.fog = new THREE.FogExp2(0x020205, 0.00002);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
  camera.position.set(0, 50, 400);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 2. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffffee, 2, 5000);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // 3. Stars Background (Particle System)
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.8 });
  const starsVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(10000);
    const y = THREE.MathUtils.randFloatSpread(10000);
    const z = THREE.MathUtils.randFloatSpread(10000);
    starsVertices.push(x, y, z);
  }
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);

  // Distant Galaxies for the Multiverse
  const galaxyColors = [0xffaaaa, 0xaaaaff, 0xaaffaa, 0xffddaa, 0xddaaff];
  for(let g=0; g<20; g++) {
    const galGeo = new THREE.BufferGeometry();
    const galMat = new THREE.PointsMaterial({ color: galaxyColors[g%5], size: 5.0, transparent: true, opacity: 0.9 });
    const galVerts = [];
    const gx = THREE.MathUtils.randFloatSpread(12000) + (Math.random()>0.5?2000:-2000);
    const gy = THREE.MathUtils.randFloatSpread(12000) + (Math.random()>0.5?2000:-2000);
    const gz = THREE.MathUtils.randFloatSpread(12000) + (Math.random()>0.5?2000:-2000);
    
    for(let i=0; i<3000; i++) {
      const radius = Math.random() * 1500;
      const theta = Math.random() * Math.PI * 2;
      galVerts.push(
        gx + Math.cos(theta) * radius,
        gy + (Math.random() - 0.5) * 200, // thin disc
        gz + Math.sin(theta) * radius
      );
    }
    galGeo.setAttribute('position', new THREE.Float32BufferAttribute(galVerts, 3));
    const galaxy = new THREE.Points(galGeo, galMat);
    galaxy.rotation.x = Math.random() * Math.PI;
    galaxy.rotation.y = Math.random() * Math.PI;
    scene.add(galaxy);
  }


  // 4. Planets Data
  const planetData = [
    { name: "Sun", color: 0xffcc00, size: 40, distance: 0, speed: 0, type: "Star", moons: 0, desc: "The star at the center of the Solar System. It is a nearly perfect sphere of hot plasma." },
    { name: "Mercury", color: 0xaaaaaa, size: 3, distance: 70, speed: 0.02, type: "Terrestrial", moons: 0, desc: "The smallest planet in the Solar System and the closest to the Sun." },
    { name: "Venus", color: 0xe3bb76, size: 7, distance: 110, speed: 0.015, type: "Terrestrial", moons: 0, desc: "The second planet from the Sun. It is a terrestrial planet and is sometimes called Earth's sister planet." },
    { name: "Earth", color: 0x2b82c9, size: 7.5, distance: 160, speed: 0.01, type: "Terrestrial", moons: 1, desc: "Our home planet. The third planet from the Sun and the only astronomical object known to harbor life." },
    { name: "Mars", color: 0xc1440e, size: 4, distance: 220, speed: 0.008, type: "Terrestrial", moons: 2, desc: "The fourth planet from the Sun. It is a dusty, cold, desert world with a very thin atmosphere." },
    { name: "Jupiter", color: 0xd39c7e, size: 20, distance: 340, speed: 0.005, type: "Gas Giant", moons: 95, desc: "The largest planet in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined." },
    { name: "Saturn", color: 0xead6b8, size: 17, distance: 480, speed: 0.003, type: "Gas Giant", moons: 146, desc: "The sixth planet from the Sun, known for its extensive ring system." },
    { name: "Uranus", color: 0xd1e7e7, size: 10, distance: 620, speed: 0.002, type: "Ice Giant", moons: 27, desc: "The seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System." },
    { name: "Neptune", color: 0x3f54ba, size: 9.5, distance: 750, speed: 0.001, type: "Ice Giant", moons: 14, desc: "The eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet by diameter." }
  ];

  const planets = [];
  const planetMeshes = [];

  const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

  planetData.forEach((data, index) => {
    let material;
    if (data.name === "Sun") {
      material = new THREE.MeshBasicMaterial({ color: data.color });
    } else {
      material = new THREE.MeshStandardMaterial({ 
        color: data.color,
        roughness: 0.7,
        metalness: 0.1
      });
    }

    const mesh = new THREE.Mesh(sphereGeo, material);
    mesh.scale.setScalar(data.size);
    mesh.userData = data; // Store data for raycasting

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    scene.add(pivot);

    // Initial position
    mesh.position.x = data.distance;

    // Rings for Saturn
    if (data.name === "Saturn") {
      const ringGeo = new THREE.RingGeometry(data.size + 3, data.size + 12, 64);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xead6b8, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 - 0.3;
      mesh.add(ring);
    }

    // Orbit path visual
    if (data.distance > 0) {
      const orbitGeo = new THREE.BufferGeometry();
      const orbitPts = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        orbitPts.push(new THREE.Vector3(Math.cos(theta) * data.distance, 0, Math.sin(theta) * data.distance));
      }
      orbitGeo.setFromPoints(orbitPts);
      const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);
    }

    planets.push({ pivot, mesh, speed: data.speed });
    planetMeshes.push(mesh);
  });

  // 5. Flight Controls (Simple WASD + Mouse look)
  const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetYaw = 0;
  let targetPitch = 0;
  let yaw = 0;
  let pitch = 0;

  document.addEventListener('keydown', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; });
  document.addEventListener('keyup', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = false; });

  // Minecraft style pointer lock
  canvas.addEventListener('click', () => {
    if (document.pointerLockElement !== canvas) {
      canvas.requestPointerLock();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas) {
      targetYaw -= e.movementX * 0.002;
      targetPitch -= e.movementY * 0.002;
      targetPitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, targetPitch));
    }
  });

  function updateCameraMovement() {
    const moveSpeed = 3.0;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    
    const right = new THREE.Vector3();
    right.crossVectors(direction, camera.up).normalize();

    if (keys.w || keys.ArrowUp) camera.position.addScaledVector(direction, moveSpeed);
    if (keys.s || keys.ArrowDown) camera.position.addScaledVector(direction, -moveSpeed);
    if (keys.a || keys.ArrowLeft) camera.position.addScaledVector(right, -moveSpeed);
    if (keys.d || keys.ArrowRight) camera.position.addScaledVector(right, moveSpeed);
  }

  // 6. Raycasting (Clicking Planets)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('planet-info');
  const closeInfoBtn = document.getElementById('close-info');
  
  closeInfoBtn.addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });

  canvas.addEventListener('mousedown', (e) => {
    if (document.pointerLockElement !== canvas) return;
    
    // Raycast from the center crosshair
    mouse.x = 0;
    mouse.y = 0;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
      const pData = intersects[0].object.userData;
      document.getElementById('p-name').innerHTML = `<i class="fa-solid fa-globe"></i> ${pData.name}`;
      document.getElementById('p-desc').textContent = pData.desc;
      document.getElementById('p-type').textContent = pData.type;
      document.getElementById('p-moons').textContent = pData.moons;
      
      infoPanel.style.display = 'block';
      document.exitPointerLock(); // Free the mouse so they can click the close button
    }
  });

  // 7. Multiversal Map Animation
  let isMultiverseMode = false;
  document.getElementById('multiverse-btn').addEventListener('click', () => {
    isMultiverseMode = !isMultiverseMode;
    const btn = document.getElementById('multiverse-btn');
    if(isMultiverseMode) {
      btn.innerHTML = `<i class="fa-solid fa-solar-system"></i> Back to Solar System`;
      // Zoom out way far
      targetCameraZ = 5000;
    } else {
      btn.innerHTML = `<i class="fa-solid fa-infinity"></i> View Multiversal Map`;
      // Zoom back in
      targetCameraZ = 400;
      camera.position.set(0, 50, 400);
      yaw = 0; pitch = 0;
      camera.rotation.set(0,0,0);
    }
  });

  let targetCameraZ = 400;

  // 8. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Orbit planets
    planets.forEach(p => {
      p.pivot.rotation.y += p.speed;
      p.mesh.rotation.y += 0.01; // self rotation
    });

    updateCameraMovement();

    // Smoothly interpolate yaw and pitch to follow mouse
    if(!isMultiverseMode) {
      yaw += (targetYaw - yaw) * 0.05;
      pitch += (targetPitch - pitch) * 0.05;
    }

    // Smooth transition for multiverse mode
    if(isMultiverseMode) {
      camera.position.z += (targetCameraZ - camera.position.z) * 0.02;
      camera.position.y += (2000 - camera.position.y) * 0.02;
      // auto rotate to look down slightly
      pitch += (-Math.PI/8 - pitch) * 0.02;
    }
    
    // Apply camera rotation
    const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);
    camera.quaternion.copy(new THREE.Quaternion().multiplyQuaternions(qx, qy));

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
