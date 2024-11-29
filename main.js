System.import('https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js').then(THREE => {
  System.import('https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/loaders/GLTFLoader.js').then(module => {
    const GLTFLoader = module.GLTFLoader;
    System.import('https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/effects/OutlineEffect.js').then(module => {
      const OutlineEffect = module.OutlineEffect;
      
      // Ваш код
      const container = document.getElementById('container');

      // Создаем сцену, камеру и рендерер
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Белый фон
      renderer.setClearColor(0xffffff);

      // Загрузка модели
      const loader = new GLTFLoader();
      loader.load('./GLB Shigan 4.2.glb', (gltf) => {
        const model = gltf.scene;

        // Применение текстур
        const textures = ['./1.jpg', './2.jpg', './3.jpg', './4.jpg', './5.jpg'];
        let i = 0;
        model.traverse((child) => {
          if (child.isMesh && i < textures.length) {
            const texture = new THREE.TextureLoader().load(textures[i]);
            child.material.map = texture;
            i++;
          }
        });

        scene.add(model);

        // Контур
        const effect = new OutlineEffect(renderer, {
          defaultThickness: 0.01,
          defaultColor: [0, 0, 0],
        });

        // Анимация
        const animate = () => {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01; // Вращение
          effect.render(scene, camera);
        };
        animate();
      });

      // Настройка камеры
      camera.position.set(0, 1, 3);

      // AR-кнопка
      const arButton = document.getElementById('ar-button');
      arButton.addEventListener('click', () => {
        if (navigator.xr) {
          navigator.xr.requestSession('immersive-ar').then((session) => {
            session.updateRenderState({ baseLayer: new XRWebGLLayer(session, renderer.getContext()) });
            session.requestReferenceSpace('local').then((refSpace) => {
              session.requestAnimationFrame((time, frame) => {
                renderer.render(scene, camera);
              });
            });
          });
        } else {
          alert('AR not supported on this device.');
        }
      });
    });
  });
});
