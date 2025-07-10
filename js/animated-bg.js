// animated-bg.js
// Minimalist interactive animated background (lines/particles) in black, white, and grey
(function () {
    // Create and style the canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'animated-bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.18'; // Subtle effect
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2 };

    // Responsive resize
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Generate points for lines/particles
    const POINTS = 32;
    let points = [];
    function initPoints() {
        points = [];
        for (let i = 0; i < POINTS; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
            });
        }
    }
    initPoints();
    window.addEventListener('resize', initPoints);

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        // Draw lines between close points
        for (let i = 0; i < points.length; i++) {
            let p1 = points[i];
            // Move points
            p1.x += p1.vx + (mouse.x - p1.x) * 0.0002;
            p1.y += p1.vy + (mouse.y - p1.y) * 0.0002;
            // Bounce off edges
            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;
            // Draw lines to nearby points
            for (let j = i + 1; j < points.length; j++) {
                let p2 = points[j];
                let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 180) {
                    ctx.strokeStyle = `rgba(80,80,80,${0.18 - dist / 1200})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
            // Draw point
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 1.7, 0, 2 * Math.PI);
            ctx.fillStyle = '#222';
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        requestAnimationFrame(animate);
    }
    animate();
})(); 