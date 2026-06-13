document.addEventListener('DOMContentLoaded', () => {
  const infoPanel = document.getElementById('m-info');
  const closeBtn = document.getElementById('m-close');
  const mName = document.getElementById('m-name');
  const mDesc = document.getElementById('m-desc');
  const mGuideBtn = document.getElementById('m-guide-btn');

  const entityData = {
    "Oort Cloud": "The extended shell of icy objects that exist in the outermost reaches of the solar system.",
    "Milky Way Galaxy": "Our home galaxy, a barred spiral galaxy containing 100-400 billion stars.",
    "Local Group": "The galaxy group that includes the Milky Way, Andromeda, and about 80 smaller galaxies.",
    "Virgo Supercluster": "A massive concentration of galaxies that contains the Local Group.",
    "Laniakea": "The galaxy supercluster that is home to the Milky Way and approximately 100,000 other nearby galaxies."
  };

  document.querySelectorAll('.radar-ring').forEach(ring => {
    ring.addEventListener('click', (e) => {
      // Prevent triggering multiple rings if overlapping
      e.stopPropagation();
      
      const entity = ring.getAttribute('data-entity');
      mName.innerHTML = `<i class="fa-solid fa-infinity"></i> ${entity}`;
      mDesc.textContent = entityData[entity] || "Cosmic structure.";
      
      mGuideBtn.onclick = () => {
        window.location.href = `guide.html?entity=${encodeURIComponent(entity)}`;
      };

      infoPanel.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });

  // Click outside to close
  document.querySelector('.radar-container').addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });
});
