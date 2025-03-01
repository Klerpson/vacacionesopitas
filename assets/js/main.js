document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const body = document.body;
  const content = document.querySelector('.content');
  const overlay = document.getElementById('overlay');
  const hasSubmenuItems = document.querySelectorAll('.has-submenu');
  
  // Función para alternar el menú
  function toggleMenu() {
      body.classList.toggle('menu-active');
      // Eliminada la línea que afectaba al contenido
  }
  
  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  
  // Manejar submenús
  hasSubmenuItems.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', function(e) {
          e.preventDefault();
          item.classList.toggle('active');
      });
  });
});