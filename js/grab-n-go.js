window.onload = () => {
  const chefsChoice = document.querySelector('aside input');
  const fieldsets = document.querySelectorAll('fieldset');
  const checkboxes = document.querySelectorAll('fieldset input');
  const order = document.querySelector('button');

  chefsChoice.addEventListener('change', e => {
    if (chefsChoice.checked) {
      fieldsets.forEach(fieldset => fieldset.style.opacity = '0.5');
      checkboxes.forEach(checkbox => checkbox.disabled = true);
    } else {
      fieldsets.forEach(fieldset => fieldset.style.opacity = '1');
      checkboxes.forEach(checkbox => checkbox.disabled = false);
    }
  });

  order.addEventListener('onclick', e => {
    window.location.href('../html/confirmation.html');
  });
}