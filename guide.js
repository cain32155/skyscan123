document.addEventListener('DOMContentLoaded', () => {
  mermaid.initialize({ 
    startOnLoad: false, 
    theme: 'dark',
    themeVariables: {
      primaryColor: '#2b82c9',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#00f0ff',
      lineColor: '#ffffff',
      secondaryColor: '#1a1a2e',
      tertiaryColor: '#020205'
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const entityName = urlParams.get('entity') || 'Earth';

  const guideData = {
    "Earth": {
      type: "Terrestrial Planet",
      bg: "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
      facts: [
        { label: "Radius", value: "6,371 km" },
        { label: "Mass", value: "5.97 × 10^24 kg" },
        { label: "Distance from Sun", value: "149.6M km (1 AU)" },
        { label: "Moons", value: "1 (The Moon)" },
        { label: "Surface Temp", value: "14°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. While large volumes of water can be found throughout the Solar System, only Earth sustains liquid surface water. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers.</p>
        <h2>Atmosphere</h2>
        <p>Earth's atmosphere consists mostly of nitrogen and oxygen. Greenhouse gases in the atmosphere like carbon dioxide trap a part of the energy from the Sun close to the surface.</p>
      `,
      diagram: `
        pie title Earth's Composition
          "Iron" : 32.1
          "Oxygen" : 30.1
          "Silicon" : 15.1
          "Magnesium" : 13.9
          "Other" : 8.8
      `
    },
    "Jupiter": {
      type: "Gas Giant",
      bg: "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
      facts: [
        { label: "Radius", value: "69,911 km" },
        { label: "Mass", value: "1.898 × 10^27 kg" },
        { label: "Distance from Sun", value: "778.5M km (5.2 AU)" },
        { label: "Moons", value: "95 known" },
        { label: "Surface Temp", value: "-110°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.</p>
        <h2>The Great Red Spot</h2>
        <p>Jupiter's most familiar feature is the Great Red Spot, a persistent anticyclonic storm located 22° south of the equator. It is known to have existed since at least 1831, and possibly since 1665.</p>
      `,
      diagram: `
        graph TD
          A[Atmosphere (Hydrogen/Helium)] --> B[Liquid Metallic Hydrogen Mantle]
          B --> C[Dense Core of Rock & Ice]
          style A fill:#d39c7e,stroke:#333
          style B fill:#b37b5e,stroke:#333
          style C fill:#555,stroke:#333
      `
    },
    "Mars": {
      type: "Terrestrial Planet",
      bg: "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
      facts: [
        { label: "Radius", value: "3,389 km" },
        { label: "Mass", value: "6.39 × 10^23 kg" },
        { label: "Distance from Sun", value: "227.9M km (1.5 AU)" },
        { label: "Moons", value: "2 (Phobos, Deimos)" },
        { label: "Surface Temp", value: "-60°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".</p>
        <h2>Surface Features</h2>
        <p>Mars has a thin atmosphere and features surface characteristics reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.</p>
      `,
      diagram: `
        graph TD
          A[Crust (Iron-rich basaltic rock)] --> B[Silicate Mantle]
          B --> C[Core (Iron, Nickel, Sulfur)]
          style A fill:#c1440e,stroke:#333
          style B fill:#9a360b,stroke:#333
          style C fill:#666,stroke:#333
      `
    },
    "Milky Way Galaxy": {
      type: "Barred Spiral Galaxy",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop",
      facts: [
        { label: "Diameter", value: "100,000 light-years" },
        { label: "Stars", value: "100 - 400 Billion" },
        { label: "Age", value: "13.6 Billion Years" },
        { label: "Central Black Hole", value: "Sagittarius A*" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Milky Way is the galaxy that includes our Solar System. The name describes the galaxy's appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye.</p>
        <h2>Structure</h2>
        <p>The Milky Way is a barred spiral galaxy with a visible diameter usually estimated at 100,000 to 200,000 light-years. Recent simulations suggest that a dark matter disk, containing some visible stars, may extend up to a diameter of almost 2 million light-years.</p>
      `,
      diagram: `
        graph LR
          A[Central Bulge & Bar] --> B[Inner Spiral Arms]
          B --> C[Orion Spur (Our Solar System)]
          B --> D[Outer Spiral Arms]
          D --> E[Galactic Halo & Dark Matter]
      `
    }
  };

  // Fallback for unknown entities
  const data = guideData[entityName] || {
    type: "Cosmic Entity",
    bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
    facts: [{ label: "Status", value: "Classified" }],
    article: `<h2>Overview</h2><p>Detailed records for ${entityName} are currently being compiled by SkyScan probes.</p>`,
    diagram: `graph TD; A[Entity] --> B[Unknown]`
  };

  document.getElementById('g-name').textContent = entityName;
  document.getElementById('g-type').textContent = data.type;
  document.getElementById('hero-sec').style.backgroundImage = `url('${data.bg}')`;
  document.getElementById('g-article').innerHTML = data.article;

  const factsHtml = data.facts.map(f => `
    <div class="fact-row">
      <span class="text-muted">${f.label}</span>
      <span style="font-weight: 600; color: var(--text-primary);">${f.value}</span>
    </div>
  `).join('');
  document.getElementById('g-facts').innerHTML = factsHtml;

  const mermaidTarget = document.getElementById('mermaid-target');
  mermaidTarget.textContent = data.diagram;
  
  // Render mermaid
  mermaid.run({
    nodes: [mermaidTarget]
  });
});
