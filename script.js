document.addEventListener('DOMContentLoaded', () => {
  const showSectionBtn = document.getElementById('showSectionBtn');
  if (showSectionBtn) {
    showSectionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const mainSection = document.getElementById('mainSection');
      const extraSection = document.getElementById('extraSection');
      const logoSmall = document.getElementById('logoSmall');
      
      if (mainSection) mainSection.style.display = 'none';
      if (extraSection) extraSection.style.display = 'block';
      if (logoSmall) logoSmall.style.display = 'block';
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
