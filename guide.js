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
    "Sun": {
      type: "G-Type Main-Sequence Star",
      bg: "assets/textures/2k_sun.jpg",
      facts: [
        { label: "Radius", value: "696,340 km" },
        { label: "Mass", value: "1.989 × 10^30 kg" },
        { label: "Age", value: "4.6 Billion Years" },
        { label: "Core Temp", value: "15,000,000 °C" },
        { label: "Surface Temp", value: "5,500 °C" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates this energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth. Its diameter is about 1.39 million kilometers (864,000 miles), or 109 times that of Earth. Its mass is about 330,000 times that of Earth, making up about 99.86% of the total mass of the Solar System.</p>
        <h2>Nuclear Fusion & Core Dynamics</h2>
        <p>At the core of the Sun, gravitational forces create immense pressure and temperatures reaching 15 million degrees Celsius. Here, hydrogen atoms are crushed together to form helium in a process called nuclear fusion. This process releases massive amounts of energy, which slowly works its way outward through the radiative and convective zones before being emitted as sunlight. Every second, the Sun fuses about 600 million tons of hydrogen into helium, converting 4 million tons of matter into pure energy.</p>
        <h2>Solar Activity & Magnetic Fields</h2>
        <p>The Sun is a magnetically active star. It supports a strong, changing magnetic field that varies year-to-year and reverses direction about every eleven years around solar maximum. The Sun's magnetic field leads to many effects that are collectively called solar activity, including sunspots on the surface, solar flares, and variations in the solar wind that carry material through the Solar System.</p>
      `,
      diagram: `
        graph TD
          A["Core (Nuclear Fusion)"] --> B["Radiative Zone"]
          B --> C["Convective Zone"]
          C --> D["Photosphere (Surface)"]
          D --> E["Chromosphere"]
          E --> F["Corona"]
          style A fill:#ffcc00,stroke:#333
          style B fill:#ff9900,stroke:#333
          style C fill:#ff6600,stroke:#333
      `
    },
    "Mercury": {
      type: "Terrestrial Planet",
      bg: "assets/textures/2k_mercury.jpg",
      facts: [
        { label: "Radius", value: "2,439.7 km" },
        { label: "Distance from Sun", value: "57.9M km" },
        { label: "Orbital Period", value: "88 Days" },
        { label: "Surface Temp", value: "-173 to 427 °C" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets. It is named after the Roman deity Mercury, the messenger of the gods. Like Venus, Mercury orbits the Sun within Earth's orbit as an inferior planet, and its apparent distance from the Sun as viewed from Earth never exceeds 28°.</p>
        <h2>Extreme Temperatures</h2>
        <p>Having almost no atmosphere to retain heat, it has surface temperatures that vary diurnally more than on any other planet in the Solar System, ranging from 100 K (−173 °C; −280 °F) at night to 700 K (427 °C; 800 °F) during the day across the equatorial regions. The polar regions are constantly below 180 K (−93 °C; −136 °F). The planet has no known natural satellites.</p>
        <h2>Internal Structure</h2>
        <p>Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. The planet is mostly made of iron and its core takes up a massive 85% of the planet's radius, leaving a surprisingly thin mantle and crust.</p>
      `,
      diagram: `
        graph TD
          A["Silicate Crust (100-300km)"] --> B["Silicate Mantle (600km)"]
          B --> C["Massive Iron Core (1,800km)"]
          style A fill:#aaaaaa,stroke:#333
          style B fill:#888888,stroke:#333
          style C fill:#555555,stroke:#333
      `
    },
    "Venus": {
      type: "Terrestrial Planet",
      bg: "assets/textures/2k_venus_surface.jpg",
      facts: [
        { label: "Radius", value: "6,051.8 km" },
        { label: "Distance from Sun", value: "108.2M km" },
        { label: "Orbital Period", value: "225 Days" },
        { label: "Surface Temp", value: "462 °C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight. Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a bit before dawn.</p>
        <h2>A Runaway Greenhouse</h2>
        <p>Venus is a terrestrial planet and is sometimes called Earth's "sister planet" because of their similar size, mass, proximity to the Sun, and bulk composition. It is radically different from Earth in other respects. It has the densest atmosphere of the four terrestrial planets, consisting of more than 96% carbon dioxide. The atmospheric pressure at the planet's surface is about 92 times the sea level pressure of Earth. Venus is by far the hottest planet in the Solar System, with a mean surface temperature of 735 K (462 °C; 863 °F), even though Mercury is closer to the Sun.</p>
        <h2>Surface and Geology</h2>
        <p>Venus is shrouded by an opaque layer of highly reflective clouds of sulfuric acid, preventing its surface from being seen from space in visible light. Much of the Venusian surface appears to have been shaped by volcanic activity. Venus has several times as many volcanoes as Earth, and it has 167 large volcanoes that are over 100 km (60 mi) across.</p>
      `,
      diagram: `
        graph TD
          A["Dense CO2 Atmosphere"] --> B["Sulfuric Acid Clouds"]
          B --> C["Silicate Crust"]
          C --> D["Rocky Mantle"]
          D --> E["Iron Core"]
          style A fill:#e3bb76,stroke:#333
          style B fill:#d3ab66,stroke:#333
          style C fill:#b38b46,stroke:#333
      `
    },
    "Earth": {
      type: "Terrestrial Planet",
      bg: "assets/textures/2k_earth_daymap.jpg",
      facts: [
        { label: "Radius", value: "6,371 km" },
        { label: "Mass", value: "5.97 × 10^24 kg" },
        { label: "Distance from Sun", value: "149.6M km (1 AU)" },
        { label: "Moons", value: "1 (The Moon)" },
        { label: "Surface Temp", value: "14°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. While large volumes of water can be found throughout the Solar System, only Earth sustains liquid surface water. About 71% of Earth's surface is made up of the ocean, dwarfing Earth's polar ice, lakes, and rivers. The remaining 29% of Earth's surface is land, consisting of continents and islands.</p>
        <h2>Atmosphere</h2>
        <p>Earth's atmosphere consists mostly of nitrogen and oxygen. More solar energy is received by tropical regions than polar regions and is redistributed by atmospheric and ocean circulation. Water vapor is widely present in the atmosphere and forms clouds that cover most of the planet. Greenhouse gases in the atmosphere like carbon dioxide (CO2) trap a part of the energy from the Sun close to the surface.</p>
        <h2>Tectonic Plates and Geology</h2>
        <p>Earth's surface is formed of slowly moving tectonic plates that interact to produce mountain ranges, volcanoes, and earthquakes. Earth's liquid outer core generates the magnetic field that shapes Earth's magnetosphere, deflecting destructive solar winds. Earth is the only known planet to have active plate tectonics, which constantly recycles the crust and regulates the planet's carbon cycle.</p>
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
    "Mars": {
      type: "Terrestrial Planet",
      bg: "assets/textures/2k_mars.jpg",
      facts: [
        { label: "Radius", value: "3,389 km" },
        { label: "Mass", value: "6.39 × 10^23 kg" },
        { label: "Distance from Sun", value: "227.9M km (1.5 AU)" },
        { label: "Moons", value: "2 (Phobos, Deimos)" },
        { label: "Surface Temp", value: "-60°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet". The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.</p>
        <h2>Surface Features and Water</h2>
        <p>Mars has a thin atmosphere and features surface characteristics reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth. The days and seasons are comparable to those of Earth, because the rotational period as well as the tilt of the rotational axis relative to the ecliptic plane are similar. Mars is the site of Olympus Mons, the largest volcano and highest known mountain on any planet in the Solar System, and of Valles Marineris, one of the largest canyons.</p>
        <h2>The Search for Life</h2>
        <p>Liquid water on the surface of Mars cannot exist due to low atmospheric pressure, which is less than 1% of the atmospheric pressure on Earth. However, the two polar ice caps appear to be made largely of water. In November 2016, NASA reported finding a large amount of underground ice in the Utopia Planitia region. The volume of water detected has been estimated to be equivalent to the volume of water in Lake Superior.</p>
      `,
      diagram: `
        graph TD
          A["Dusty Crust (Iron-rich basaltic rock)"] --> B["Silicate Mantle"]
          B --> C["Core (Iron, Nickel, Sulfur)"]
          style A fill:#c1440e,stroke:#333
          style B fill:#9a360b,stroke:#333
          style C fill:#666,stroke:#333
      `
    },
    "Jupiter": {
      type: "Gas Giant",
      bg: "assets/textures/2k_jupiter.jpg",
      facts: [
        { label: "Radius", value: "69,911 km" },
        { label: "Mass", value: "1.898 × 10^27 kg" },
        { label: "Distance from Sun", value: "778.5M km (5.2 AU)" },
        { label: "Moons", value: "95 known" },
        { label: "Surface Temp", value: "-110°C (Avg)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun. Jupiter is the third brightest natural object in the Earth's night sky after the Moon and Venus.</p>
        <h2>Composition and Atmosphere</h2>
        <p>Jupiter is primarily composed of hydrogen, but helium constitutes one-quarter of its mass and one-tenth of its volume. It likely has a rocky core of heavier elements, but like the other giant planets, Jupiter lacks a well-defined solid surface. Because of its rapid rotation, the planet's shape is an oblate spheroid (it has a slight but noticeable bulge around the equator). The outer atmosphere is visibly segregated into several bands at different latitudes, resulting in turbulence and storms along their interacting boundaries.</p>
        <h2>The Great Red Spot</h2>
        <p>A prominent result of this is the Great Red Spot, a giant storm that is known to have existed since at least the 17th century when it was first seen by telescope. Surrounding Jupiter is a faint planetary ring system and a powerful magnetosphere. Jupiter has 95 known moons, including the four large Galilean moons discovered by Galileo Galilei in 1610: Io, Europa, Ganymede, and Callisto. Ganymede, the largest of these, has a diameter greater than that of the planet Mercury.</p>
      `,
      diagram: `
        graph TD
          A["Atmosphere (Hydrogen/Helium)"] --> B["Liquid Hydrogen"]
          B --> C["Liquid Metallic Hydrogen"]
          C --> D["Dense Core of Rock & Ice"]
          style A fill:#d39c7e,stroke:#333
          style B fill:#b37b5e,stroke:#333
          style C fill:#8a5232,stroke:#333
          style D fill:#555,stroke:#333
      `
    },
    "Saturn": {
      type: "Gas Giant",
      bg: "assets/textures/2k_saturn.jpg",
      facts: [
        { label: "Radius", value: "58,232 km" },
        { label: "Distance from Sun", value: "1.4 Billion km" },
        { label: "Moons", value: "146 known" },
        { label: "Ring System", value: "Prominent & Extensive" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive. Saturn is named after the Roman god of wealth and agriculture.</p>
        <h2>The Spectacular Rings</h2>
        <p>The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles, with a smaller amount of rocky debris and dust. The rings extend from 6,630 to 120,700 kilometers (4,120 to 75,000 mi) outward from Saturn's equator and average approximately 20 meters (66 ft) in thickness. While all gas giants have rings, Saturn's are by far the largest and most spectacular.</p>
        <h2>Moons and Magnetosphere</h2>
        <p>At least 146 moons are known to orbit Saturn, of which 63 have formal names. This does not include the hundreds of moonlets in the rings. Titan, Saturn's largest moon, and the second-largest in the Solar System, is larger than the planet Mercury, although less massive, and is the only moon in the Solar System to have a substantial atmosphere.</p>
      `,
      diagram: `
        graph TD
          A["Upper Atmosphere (Ammonia Clouds)"] --> B["Hydrogen/Helium Envelope"]
          B --> C["Liquid Metallic Hydrogen Mantle"]
          C --> D["Rocky/Icy Core"]
          style A fill:#ead6b8,stroke:#333
          style B fill:#caac82,stroke:#333
          style C fill:#a8885b,stroke:#333
          style D fill:#444,stroke:#333
      `
    },
    "Uranus": {
      type: "Ice Giant",
      bg: "assets/textures/2k_uranus.jpg",
      facts: [
        { label: "Radius", value: "25,362 km" },
        { label: "Distance from Sun", value: "2.9 Billion km" },
        { label: "Orbital Period", value: "84 Years" },
        { label: "Axial Tilt", value: "97.77° (Sideways)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.</p>
        <h2>Composition: An Ice Giant</h2>
        <p>Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as "ice giants" to distinguish them from the other giant planets. Uranus's atmosphere is similar to Jupiter's and Saturn's in its primary composition of hydrogen and helium, but it contains more "ices" such as water, ammonia, and methane, along with traces of other hydrocarbons.</p>
        <h2>Tilted on its Side</h2>
        <p>Like the other giant planets, Uranus has a ring system, a magnetosphere, and numerous moons. The Uranian system has a unique configuration because its axis of rotation is tilted sideways, nearly into the plane of its solar orbit. Its north and south poles, therefore, lie where most other planets have their equators. In 1986, images from Voyager 2 showed Uranus as an almost featureless planet in visible light, without the cloud bands or storms associated with the other giant planets.</p>
      `,
      diagram: `
        graph TD
          A["Atmosphere (Hydrogen, Helium, Methane)"] --> B["Icy Mantle (Water, Ammonia, Methane)"]
          B --> C["Rocky Silicate/Iron-Nickel Core"]
          style A fill:#d1e7e7,stroke:#333
          style B fill:#9ecbcb,stroke:#333
          style C fill:#555,stroke:#333
      `
    },
    "Neptune": {
      type: "Ice Giant",
      bg: "assets/textures/2k_neptune.jpg",
      facts: [
        { label: "Radius", value: "24,622 km" },
        { label: "Distance from Sun", value: "4.5 Billion km" },
        { label: "Wind Speeds", value: "Up to 2,100 km/h" },
        { label: "Moons", value: "14 known" }
      ],
      article: `
        <h2>Overview</h2>
        <p>Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere.</p>
        <h2>Supersonic Winds</h2>
        <p>Unlike the relatively featureless atmosphere of Uranus, Neptune's atmosphere has active and visible weather patterns. For example, at the time of the 1989 Voyager 2 flyby, the planet's southern hemisphere had a Great Dark Spot comparable to the Great Red Spot on Jupiter. These weather patterns are driven by the strongest sustained winds of any planet in the Solar System, with recorded wind speeds as high as 2,100 kilometers per hour (1,300 mph).</p>
        <h2>Discovery and Triton</h2>
        <p>Neptune was the first planet located through mathematical calculations rather than through empirical observation. Perturbations in the orbit of Uranus led French astronomer Alexis Bouvard to deduce that its orbit was subject to gravitational perturbation by an unknown planet. Neptune has 14 known moons. The largest, Triton, comprises more than 99.5% of the mass in orbit around Neptune, and is the only large moon in the Solar System with a retrograde orbit.</p>
      `,
      diagram: `
        graph TD
          A["Atmosphere (Hydrogen, Helium, Methane gas)"] --> B["Mantle (Water, Ammonia, Methane ices)"]
          B --> C["Core (Rock and Ice)"]
          style A fill:#3f54ba,stroke:#333
          style B fill:#2b3a8a,stroke:#333
          style C fill:#444,stroke:#333
      `
    },
    "Oort Cloud": {
      type: "Theoretical Cloud of Icy Planetesimals",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Distance from Sun", value: "2,000 to 100,000 AU" },
        { label: "Composition", value: "Water, Ammonia, Methane Ices" },
        { label: "Origin of", value: "Long-period Comets" },
        { label: "Estimated Mass", value: "5 Earth Masses" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Oort cloud, named after the Dutch astronomer Jan Oort, is a theoretical cloud of predominantly icy planetesimals proposed to surround the Sun at distances ranging from 2,000 to 100,000 astronomical units (AU). It is divided into two regions: a disc-shaped inner Oort cloud (or Hills cloud) and a spherical outer Oort cloud. Both regions lie beyond the heliosphere and in interstellar space.</p>
        <h2>The Edge of the Solar System</h2>
        <p>The outer limit of the Oort cloud defines the cosmographical boundary of the Solar System and the extent of the Sun's Hill sphere. The outer Oort cloud is only loosely bound to the Solar System, and thus is easily affected by the gravitational pull both of passing stars and of the Milky Way itself. These forces occasionally dislodge comets from their orbits within the cloud and send them toward the inner Solar System.</p>
        <h2>Origin of Comets</h2>
        <p>Astronomers conjecture that the matter composing the Oort cloud formed closer to the Sun and was scattered far into space by the gravitational effects of the giant planets early in the Solar System's evolution. Based on their orbits, most short-period comets are thought to come from the scattered disc, but some may still have originated from the Oort cloud.</p>
      `,
      diagram: `
        graph LR
          A["Sun"] --> B["Kuiper Belt (30-50 AU)"]
          B --> C["Inner Oort Cloud / Hills Cloud (2,000 - 20,000 AU)"]
          C --> D["Outer Spherical Oort Cloud (20,000 - 100,000 AU)"]
      `
    },
    "Milky Way Galaxy": {
      type: "Barred Spiral Galaxy",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Diameter", value: "100,000 light-years" },
        { label: "Stars", value: "100 - 400 Billion" },
        { label: "Age", value: "13.6 Billion Years" },
        { label: "Central Black Hole", value: "Sagittarius A*" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Milky Way is the galaxy that includes our Solar System. The name describes the galaxy's appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye. The Milky Way appears as a band because its disk-shaped structure is viewed from within.</p>
        <h2>Structure and Black Hole</h2>
        <p>The Milky Way is a barred spiral galaxy with a visible diameter usually estimated at 100,000 to 200,000 light-years. Recent simulations suggest that a dark matter disk, containing some visible stars, may extend up to a diameter of almost 2 million light-years. At its absolute center lies Sagittarius A*, a supermassive black hole with a mass of 4.1 million times that of our Sun.</p>
        <h2>Our Place in the Galaxy</h2>
        <p>The Solar System is located at a radius of about 27,000 light-years from the Galactic Center, on the inner edge of the Orion Arm, one of the spiral-shaped concentrations of gas and dust. The stars in the innermost 10,000 light-years form a bulge and one or more bars that radiate from the bulge. The very center is marked by an intense radio source.</p>
      `,
      diagram: `
        graph LR
          A["Central Bulge & SMBH"] --> B["Inner Spiral Arms"]
          B --> C["Orion Spur (Our Solar System)"]
          B --> D["Outer Spiral Arms"]
          D --> E["Galactic Halo & Dark Matter"]
      `
    },
    "Local Group": {
      type: "Galaxy Group",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Diameter", value: "10 Million light-years" },
        { label: "Mass", value: "2 × 10^12 Solar Masses" },
        { label: "Number of Galaxies", value: "> 80" },
        { label: "Largest Galaxy", value: "Andromeda (M31)" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Local Group is the galaxy group that includes the Milky Way. The Local Group comprises more than 80 galaxies, most of them dwarf galaxies. Its gravitational center is located somewhere between the Milky Way and the Andromeda Galaxy.</p>
        <h2>Major Members</h2>
        <p>The two most massive members of the group are the Milky Way and the Andromeda Galaxy. These two spiral galaxies each have a system of satellite galaxies. The Milky Way's satellite system comprises the Sagittarius Dwarf Galaxy, Large Magellanic Cloud, Small Magellanic Cloud, Canis Major Dwarf, and several others. Andromeda's satellite system comprises M32, M110, NGC 147, and NGC 185, among others. The Triangulum Galaxy (M33) is the third-largest member of the Local Group.</p>
        <h2>Future Collision</h2>
        <p>The Milky Way and Andromeda are moving toward each other at about 110 kilometers per second. In about 4.5 billion years, they are expected to collide and merge, forming a giant elliptical or lenticular galaxy. The fate of the Local Group as a whole is to eventually merge into a single massive super-galaxy.</p>
      `,
      diagram: `
        graph TD
          A["The Local Group"] --> B["Milky Way Subgroup"]
          A --> C["Andromeda Subgroup"]
          A --> D["Triangulum Galaxy"]
          B --> E["Magellanic Clouds & Dwarfs"]
          C --> F["M32, M110 & Dwarfs"]
      `
    },
    "Virgo Supercluster": {
      type: "Galaxy Supercluster",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Diameter", value: "110 Million light-years" },
        { label: "Mass", value: "10^15 Solar Masses" },
        { label: "Number of Groups", value: "At least 100" },
        { label: "Center", value: "Virgo Cluster" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Virgo Supercluster (VSC) or Local Supercluster (LSC) is a mass concentration of galaxies containing the Virgo Cluster and Local Group, which in turn contains the Milky Way and Andromeda galaxies. At least 100 galaxy groups and clusters are located within its diameter of 33 megaparsecs (110 million light-years). The Virgo Supercluster is one of about 10 million superclusters in the observable universe.</p>
        <h2>Structure and Gravity</h2>
        <p>The VSC is an irregular, flattened structure, resembling a cosmic pancake. A significant portion of its mass is concentrated in the Virgo Cluster at its center. The gravitational pull of the Virgo Cluster is so immense that it is slowing down the cosmic expansion of the Local Group, a phenomenon known as the "Virgocentric flow."</p>
        <h2>Redefining Boundaries</h2>
        <p>In 2014, a new study mapped the motions of galaxies across the universe and redefined the boundaries of superclusters based on their gravitational basins. Under this new definition, the Virgo Supercluster is actually just an appendage or lobe of a much larger supercluster called Laniakea.</p>
      `,
      diagram: `
        graph TD
          A["Virgo Supercluster"] --> B["Virgo Cluster (Core)"]
          A --> C["Local Group"]
          A --> D["Fornax Cluster"]
          A --> E["Eridanus Cluster"]
      `
    },
    "Laniakea": {
      type: "Massive Supercluster",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Diameter", value: "520 Million light-years" },
        { label: "Mass", value: "10^17 Solar Masses" },
        { label: "Galaxies", value: "100,000" },
        { label: "Meaning", value: "Immeasurable Heaven" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The Laniakea Supercluster is the galaxy supercluster that is home to the Milky Way and approximately 100,000 other nearby galaxies. It was defined in September 2014, when a group of astronomers including R. Brent Tully of the University of Hawaii published a new way of defining superclusters according to the relative velocities of galaxies.</p>
        <h2>The Great Attractor</h2>
        <p>Laniakea consists of several previously known superclusters, including the Virgo Supercluster, Hydra-Centaurus Supercluster, and Pavo-Indus Supercluster. The most massive part of Laniakea is the Great Attractor, a dense focal point of gravity that pulls all the galaxies in Laniakea toward it. The Milky Way, along with everything in the Local Group, is moving towards the Great Attractor at roughly 600 km/s.</p>
        <h2>Immeasurable Heaven</h2>
        <p>The name Laniakea means "immense heaven" in Hawaiian, from lani, meaning "heaven", and ākea, meaning "spacious, immeasurable". The name was suggested by Nawa'a Napoleon, an associate professor of Hawaiian language at Kapiolani Community College. The mapping of Laniakea represents a profound shift in our understanding of our cosmic address.</p>
      `,
      diagram: `
        graph TD
          A["Laniakea Supercluster"] --> B["Great Attractor"]
          A --> C["Virgo Supercluster"]
          A --> D["Hydra-Centaurus Supercluster"]
          C --> E["Local Group"]
      `
    },
    "Observable Universe": {
      type: "The Totality of Existence",
      bg: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000",
      facts: [
        { label: "Diameter", value: "93 Billion light-years" },
        { label: "Age", value: "13.8 Billion Years" },
        { label: "Galaxies", value: "2 Trillion (Est.)" },
        { label: "Expansion", value: "Accelerating" }
      ],
      article: `
        <h2>Overview</h2>
        <p>The observable universe is a spherical region of the universe comprising all matter that can be observed from Earth or its space-based telescopes and exploratory probes at the present time. The electromagnetic radiation from these objects has had time to reach the Solar System and Earth since the beginning of the cosmological expansion.</p>
        <h2>Size and Expansion</h2>
        <p>Because the universe has been expanding for 13.8 billion years, the edge of the observable universe is not 13.8 billion light-years away, but rather about 46.5 billion light-years away in every direction. This gives the observable universe a diameter of approximately 93 billion light-years. Beyond this horizon, there are parts of the universe whose light has not yet reached us, and due to the accelerating expansion of the universe, light from the most distant regions may never reach us.</p>
        <h2>The Cosmic Web</h2>
        <p>On the largest scales, the universe is organized into a vast cosmic web. Galaxies and dark matter are distributed in enormous filaments and sheets, spanning hundreds of millions of light-years, separated by massive voids. The entire observable universe contains an estimated 2 trillion galaxies, holding unimaginable numbers of stars, planets, and mysteries.</p>
      `,
      diagram: `
        graph TD
          A["Observable Universe"] --> B["Cosmic Web"]
          B --> C["Superclusters (e.g. Laniakea)"]
          C --> D["Galaxy Clusters"]
          D --> E["Galaxies"]
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
    <div class="fact-row" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
      <span style="color: #00f0ff; font-size: 0.85rem;">${f.label}</span>
      <span style="font-weight: 600; color: #ffffff; font-size: 0.9rem;">${f.value}</span>
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
