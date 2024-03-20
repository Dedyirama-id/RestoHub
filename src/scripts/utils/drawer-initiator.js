const DrawerInitiator = {
  init({ button, drawer, content }) {
    const buttonIcon = button.querySelector('img');
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
      buttonIcon.src = (drawer.classList.contains('open')) ? './svg/xmark.svg' : './svg/menu.svg';
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
      buttonIcon.src = (drawer.classList.contains('open')) ? './svg/xmark.svg' : './svg/menu.svg';
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
