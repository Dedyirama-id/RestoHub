function scrollToElement(targetElement, offsetElement, offset = 0) {
  const elementPosition = targetElement.offsetTop - (offsetElement.offsetHeight + offset);

  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth',
  });
}

export default scrollToElement;
