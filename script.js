const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
const dropcontainer = document.querySelectorAll('.drop-container')
const reset = document.getElementById('reset-button');
const drops = document.getElementById('drops')
const cont = document.getElementById('cont')
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

dropcontainer.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Drop success!';
        setTimeout(function() {
          var colors = ['#023020', '#191970', '#789D3A', '#9D3A76', '#C1B800', '#9D3A3A']; 
          var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        
          successMessage.style.color = randomColor;
          successMessage.textContent = '';
        }, 500);
        
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

reset.addEventListener('click', function() {
  const contents = drops.getElementsByTagName('div');
  while (contents.length > 0) {
    const content = contents[0];
    cont.appendChild(content);
  }
});