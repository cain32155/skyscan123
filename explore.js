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
  const texBase = 'assets/textures/';
  const planetData = [
    { name: "Sun", color: 0xffcc00, size: 40, distance: 0, speed: 0, type: "Star", moons: 0, tex: texBase+"2k_sun.jpg", desc: "The star at the center of the Solar System. It is a nearly perfect sphere of hot plasma." },
    { name: "Mercury", color: 0xaaaaaa, size: 3, distance: 70, speed: 0.02, type: "Terrestrial", moons: 0, tex: texBase+"2k_mercury.jpg", desc: "The smallest planet in the Solar System and the closest to the Sun." },
    { name: "Venus", color: 0xe3bb76, size: 7, distance: 110, speed: 0.015, type: "Terrestrial", moons: 0, tex: texBase+"2k_venus_surface.jpg", desc: "The second planet from the Sun. It is a terrestrial planet and is sometimes called Earth's sister planet." },
    { name: "Earth", color: 0x2b82c9, size: 7.5, distance: 160, speed: 0.01, type: "Terrestrial", moons: 1, tex: texBase+"2k_earth_daymap.jpg", desc: "Our home planet. The third planet from the Sun and the only astronomical object known to harbor life." },
    { name: "Mars", color: 0xc1440e, size: 4, distance: 220, speed: 0.008, type: "Terrestrial", moons: 2, tex: texBase+"2k_mars.jpg", desc: "The fourth planet from the Sun. It is a dusty, cold, desert world with a very thin atmosphere." },
    { name: "Jupiter", color: 0xd39c7e, size: 20, distance: 340, speed: 0.005, type: "Gas Giant", moons: 95, tex: texBase+"2k_jupiter.jpg", desc: "The largest planet in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined." },
    { name: "Saturn", color: 0xead6b8, size: 17, distance: 480, speed: 0.003, type: "Gas Giant", moons: 146, tex: texBase+"2k_saturn.jpg", desc: "The sixth planet from the Sun, known for its extensive ring system." },
    { name: "Uranus", color: 0xd1e7e7, size: 10, distance: 620, speed: 0.002, type: "Ice Giant", moons: 27, tex: texBase+"2k_uranus.jpg", desc: "The seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System." },
    { name: "Neptune", color: 0x3f54ba, size: 9.5, distance: 750, speed: 0.001, type: "Ice Giant", moons: 14, tex: texBase+"2k_neptune.jpg", desc: "The eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet by diameter." }
  ];
  const planets = [];
  const planetMeshes = [];

  const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

  const textureLoader = new THREE.TextureLoader();

  planetData.forEach((data, index) => {
    let material;
    const tex = textureLoader.load(data.tex);
    if (data.name === "Sun") {
      material = new THREE.MeshBasicMaterial({ map: tex, color: 0xffffff });
    } else {
      material = new THREE.MeshStandardMaterial({ 
        map: tex,
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

  // 4b. Asteroid Belt (InstancedMesh for performance)
  const astCount = 4000;
  const astGeo = new THREE.IcosahedronGeometry(0.8, 0);
  const astMat = new THREE.MeshStandardMaterial({ color: 0x887766, roughness: 0.9 });
  const astMesh = new THREE.InstancedMesh(astGeo, astMat, astCount);
  const dummy = new THREE.Object3D();
  for(let i=0; i<astCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 250 + Math.random() * 60; // Between Mars and Jupiter
    dummy.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 8, Math.sin(angle) * radius);
    dummy.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    const scale = 0.5 + Math.random() * 1.5;
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    astMesh.setMatrixAt(i, dummy.matrix);
  }
  scene.add(astMesh);

  // 4c. Multiversal Map Concentric Rings removed from 3D view

  // 5. Orbit Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 10000;

  // 6. Raycasting (Clicking Planets)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('planet-info');
  const closeInfoBtn = document.getElementById('close-info');
  
  closeInfoBtn.addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
      const pData = intersects[0].object.userData;
      document.getElementById('p-name').innerHTML = `<i class="fa-solid fa-globe"></i> ${pData.name}`;
      document.getElementById('p-desc').textContent = pData.desc;
      document.getElementById('p-type').textContent = pData.type;
      document.getElementById('p-moons').textContent = pData.moons;
      
      const imgEl = document.getElementById('p-img');
      if (pData.tex) {
        imgEl.src = pData.tex;
        imgEl.style.display = 'block';
      } else {
        imgEl.style.display = 'none';
      }

      const btnEl = document.getElementById('p-guide-btn');
      btnEl.onclick = () => {
        window.location.href = `guide.html?entity=${encodeURIComponent(pData.name)}`;
      };
      
      infoPanel.style.display = 'block';
    }
  });

  // 7. Multiversal Map Redirect
  document.getElementById('multiverse-btn').addEventListener('click', () => {
    window.location.href = 'multiverse.html';
  });

  // 8. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Orbit planets
    planets.forEach(p => {
      p.pivot.rotation.y += p.speed;
      p.mesh.rotation.y += 0.01; // self rotation
    });

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
