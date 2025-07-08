$(document).ready(function(){
      // Al cargar la página, ocultamos las cortinas
      $('.left-curtain').css('width', '0%');
      $('.right-curtain').css('width', '0%');
    
      $('.valentines-day').click(function(){
        // Animación de desvanecimiento de los elementos del sobre
        $('.envelope').css({'animation':'fall 3s linear 1', '-webkit-animation':'fall 3s linear 1'});
        $('.envelope').fadeOut(800, function() {
          // Ocultar elementos dentro de .valentines-day
          $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();
          // Mostrar la portada de la carta cerrada
          $('.valentines-day').hide();
          $('#closed-card').fadeIn(600);
        });
      });
          
      // Al hacer clic en 'Siguiente' en la portada
      $(document).on('click', '#open-letter-btn', function() {
        $('#closed-card').fadeOut(400, function() {
          // Hacer visible la carta con una animación ondulante
          $('#card').css({'visibility':'visible', 'opacity': 0, 'transform': 'scale(0.1)'});
          $('#card').animate({'opacity': 1}, {duration: 1000, step: function(now, fx) {
            var scale = 1 + Math.sin(now * Math.PI) * 0.1;
            $(this).css('transform', 'scale(' + scale + ')');
          }});
        });
      });

      // Lógica para pasar página (flip)
      $(document).on('click', '#next-page', function() {
        $('#card').addClass('flipped');
      });
      $(document).on('click', '#prev-page', function() {
        $('#card').removeClass('flipped');
      });

      // Animación de cierre y apertura de la página derecha
      $(document).on('click', '#close-page', function() {
        $('#card').addClass('closed');
      });
      $(document).on('click', '#open-page', function() {
        $('#card').removeClass('closed');
      });

      // Lógica para volver a la portada desde la carta abierta
      $(document).on('click', '#back-to-cover', function() {
        $('#card').css({'visibility':'hidden'});
        $('#closed-card').fadeIn(400);
      });
    });

// Animación de corazones flotando y confeti de corazones en canvas con efecto neón y explosiones de brillo
(function() {
  const canvas = document.getElementById('bg-anim');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  function randomColor() {
    const colors = [
      '#ff00cc', // fucsia neón
      '#00fff7', // azul neón
      '#39ff14', // verde lima neón
      '#fff700', // amarillo neón
      '#ff4b7d', '#ffb347', '#ffec61', '#a259ff', '#ff6ee7', '#ff6161', '#fff', '#ffb6c1'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Corazones flotando (de abajo hacia arriba)
  function Heart() {
    this.x = Math.random() * W;
    this.y = H + 20 + Math.random() * 100;
    this.size = 18 + Math.random() * 22;
    this.speed = 0.5 + Math.random() * 1.2;
    this.color = randomColor();
    this.alpha = 0.7 + Math.random() * 0.3;
    this.tilt = Math.random() * Math.PI * 2;
    this.glow = true;
  }
  Heart.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.tilt);
    if (this.glow) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 32;
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  Heart.prototype.update = function() {
    this.y -= this.speed;
    this.tilt += 0.01;
    if (this.y < -40) {
      this.x = Math.random() * W;
      this.y = H + 20 + Math.random() * 100;
      this.size = 18 + Math.random() * 22;
      this.speed = 0.5 + Math.random() * 1.2;
      this.color = randomColor();
      this.alpha = 0.7 + Math.random() * 0.3;
      this.tilt = Math.random() * Math.PI * 2;
    }
  };

  // Confeti de corazones (de arriba hacia abajo)
  function ConfettiHeart() {
    this.x = Math.random() * W;
    this.y = -40 - Math.random() * 100;
    this.size = 12 + Math.random() * 16;
    this.speed = 1.2 + Math.random() * 2.2;
    this.color = randomColor();
    this.alpha = 0.6 + Math.random() * 0.4;
    this.tilt = Math.random() * Math.PI * 2;
    this.glow = true;
  }
  ConfettiHeart.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.tilt);
    if (this.glow) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 24;
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  ConfettiHeart.prototype.update = function() {
    this.y += this.speed;
    this.tilt += 0.01;
    if (this.y > H + 40) {
      this.x = Math.random() * W;
      this.y = -40 - Math.random() * 100;
      this.size = 12 + Math.random() * 16;
      this.speed = 1.2 + Math.random() * 2.2;
      this.color = randomColor();
      this.alpha = 0.6 + Math.random() * 0.4;
      this.tilt = Math.random() * Math.PI * 2;
    }
  };

  // Explosión de brillo (partículas)
  function Sparkle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2 + Math.random() * 3;
    this.color = randomColor();
    this.alpha = 1;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 2 + Math.random() * 3;
    this.life = 30 + Math.random() * 20;
    this.glow = true;
  }
  Sparkle.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    if (this.glow) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 16;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  Sparkle.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.025;
    this.life--;
  };

  let hearts = [];
  let confetti = [];
  let sparkles = [];
  for (let i = 0; i < 18; i++) hearts.push(new Heart());
  for (let i = 0; i < 22; i++) confetti.push(new ConfettiHeart());

  function createExplosion(x, y) {
    for (let i = 0; i < 32; i++) {
      sparkles.push(new Sparkle(x, y));
    }
  }

  // Explosiones automáticas cada cierto tiempo
  setInterval(function() {
    const x = 100 + Math.random() * (W - 200);
    const y = 100 + Math.random() * (H - 200);
    createExplosion(x, y);
  }, 2200);

  // Explosión al hacer clic
  canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createExplosion(x, y);
  });

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let h of hearts) {
      h.update();
      h.draw(ctx);
    }
    for (let c of confetti) {
      c.update();
      c.draw(ctx);
    }
    // Dibuja y actualiza las partículas de brillo
    for (let i = sparkles.length - 1; i >= 0; i--) {
      let s = sparkles[i];
      s.update();
      s.draw(ctx);
      if (s.alpha <= 0 || s.life <= 0) {
        sparkles.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
})();
