/*(function(){

  if()


  dataLayer.push({
    'Arrow Pressed' : 'Down',
    'Event' : 'Move Character'
  })


})();*/

var canvas = document.getElementsByTagName('canvas')[0];

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };

}


canvas.addEventListener('mousedown', function(event) {
  var mousePos = getMousePos(canvas, event);
  if ((mousePos.x > 310 && mousePos.x < 390) && (mousePos.y > 395 && mousePos.y < 470)) {
    var body = document.querySelector('body');
    body.onkeydown = function(event) {
      var keypressed = event.keyCode;
      if (keypressed === 39) {
        dataLayer.push({
          'Arrow Pressed': 'Right',
          'event': 'Move Character'
        })
      } else if (keypressed === 37) {
        dataLayer.push({
          'Arrow Pressed': 'Left',
          'event': 'Move Character'
        })
      } else if (keypressed === 38) {
        dataLayer.push({
          'Arrow Pressed': 'Up',
          'event': 'Move Character'
        })
      } else if (keypressed === 40) {
        dataLayer.push({
          'Arrow Pressed': 'Down',
          'event': 'Move Character'
        })
      }
    }
  }
}, false)
