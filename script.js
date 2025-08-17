// Advanced Cyberpunk Three.js Background
let scene, camera, renderer;
let particleSystem, wireframeCubes, neuralNetwork, codeRain;
let mouseX = 0, mouseY = 0;
let time = 0;

// Initialize 3D Scene
function init() {
    // Scene setup with fog for depth
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a23, 0.001);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('matrix-bg'),
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Camera position
    camera.position.z = 50;
    
    // Create cyberpunk elements
    createParticleSystem();
    createWireframeCubes();
    createNeuralNetwork();
    createCodeRain();
    createFloatingCode();
    
    // Add cyberpunk lighting
    createLighting();
    
    // Start animation loop
    animate();
    
    // Initialize matrix background
    initMatrixRain();
}

// Create advanced particle system
function createParticleSystem() {
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;
        
        // Cyberpunk color palette
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // Cyan
        } else if (colorChoice < 0.66) {
            colors[i3] = 0.6; colors[i3 + 1] = 0; colors[i3 + 2] = 1; // Purple
        } else {
            colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 0.25; // Matrix green
        }
        
        sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// Create wireframe cubes with cyberpunk aesthetics
function createWireframeCubes() {
    wireframeCubes = new THREE.Group();
    
    for (let i = 0; i < 20; i++) {
        const size = Math.random() * 10 + 5;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 1, 0.5),
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 150
        );
        
        cube.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatAmplitude: Math.random() * 20 + 10
        };
        
        wireframeCubes.add(cube);
    }
    
    scene.add(wireframeCubes);
}

// Create neural network visualization
function createNeuralNetwork() {
    neuralNetwork = new THREE.Group();
    
    // Create nodes
    const nodeCount = 50;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 1, 0.5),
            transparent: true,
            opacity: 0.8
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        
        nodes.push(node);
        neuralNetwork.add(node);
    }
    
    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
    });
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < 0.1) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[i].position,
                    nodes[j].position
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                neuralNetwork.add(line);
            }
        }
    }
    
    scene.add(neuralNetwork);
}

// Create code rain effect
function createCodeRain() {
    codeRain = new THREE.Group();
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontLoader = new THREE.FontLoader();
    
    for (let i = 0; i < 100; i++) {
        const geometry = new THREE.PlaneGeometry(2, Math.random() * 20 + 10);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff41,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const rain = new THREE.Mesh(geometry, material);
        rain.position.set(
            (Math.random() - 0.5) * 200,
            Math.random() * 100 + 50,
            (Math.random() - 0.5) * 200
        );
        
        rain.userData = {
            speed: Math.random() * 2 + 1,
            resetY: Math.random() * 100 + 100
        };
        
        codeRain.add(rain);
    }
    
    scene.add(codeRain);
}

// Create floating code snippets
function createFloatingCode() {
    const codeGroup = new THREE.Group();
    
    const codeSnippets = [
        'function() { return true; }',
        'const AI = new NeuralNetwork()',
        'if (robot.awake) { act() }',
        'while (true) { learn() }',
        'class CyberSecurity { protect() }',
        'import tensorflow as tf',
        'docker run -p 8080:80',
        'git commit -m "feat: AI upgrade"'
    ];
    
    for (let i = 0; i < 50; i++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = '#00ff41';
        context.font = '12px monospace';
        const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        context.fillText(text, 10, 30);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        sprite.position.set(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200
        );
        
        sprite.scale.set(20, 5, 1);
        
        sprite.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            floatSpeed: Math.random() * 0.01 + 0.005
        };
        
        codeGroup.add(sprite);
    }
    
    scene.add(codeGroup);
}

// Create cyberpunk lighting
function createLighting() {
    // Ambient light with cyberpunk tint
    const ambientLight = new THREE.AmbientLight(0x0a0a23, 0.4);
    scene.add(ambientLight);
    
    // Neon cyan point light
    const cyanLight = new THREE.PointLight(0x00ffff, 2, 200);
    cyanLight.position.set(50, 50, 50);
    scene.add(cyanLight);
    
    // Electric purple point light
    const purpleLight = new THREE.PointLight(0x9d00ff, 2, 200);
    purpleLight.position.set(-50, -50, 50);
    scene.add(purpleLight);
    
    // Matrix green spotlight
    const greenSpotlight = new THREE.SpotLight(0x00ff41, 1, 100, Math.PI / 6, 0.5);
    greenSpotlight.position.set(0, 100, 0);
    greenSpotlight.target.position.set(0, 0, 0);
    scene.add(greenSpotlight);
    scene.add(greenSpotlight.target);
}

// Matrix rain background
function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 35, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Advanced animation loop
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Animate particle system
    if (particleSystem) {
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.1;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animate wireframe cubes
    if (wireframeCubes) {
        wireframeCubes.children.forEach((cube, index) => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
            
            cube.position.y += Math.sin(time * cube.userData.floatSpeed + index) * 0.2;
        });
    }
    
    // Animate neural network
    if (neuralNetwork) {
        neuralNetwork.children.forEach((node, index) => {
            if (node.geometry.type === 'SphereGeometry') {
                node.material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3;
                node.scale.setScalar(1 + Math.sin(time * 3 + index) * 0.2);
            }
        });
    }
    
    // Animate code rain
    if (codeRain) {
        codeRain.children.forEach(rain => {
            rain.position.y -= rain.userData.speed;
            if (rain.position.y < -100) {
                rain.position.y = rain.userData.resetY;
            }
        });
    }
    
    // Mouse interaction with easing
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Event listeners
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Add typing animation
    const typingText = document.querySelector('.typing-text');
    const text = 'AI & ML Engineer';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
});

// Add cyberpunk sound effects
function playCyberSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioContext.currentTime);
    
    switch(type) {
        case 'hover':
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            break;
        case 'click':
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Add hover effects
document.querySelectorAll('a, button, .card, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => playCyberSound('hover'));
    element.addEventListener('click', () => playCyberSound('click'));
});
