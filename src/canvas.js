
const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d');

if (context == null) {
  console.error('Your browser is not support canvas!')
  process.exit();
}

export {context, canvas};