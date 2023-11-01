const fileInput = document.getElementById('fileInput');
const loadImgBtn = document.getElementById('loadImgBtn');
const previewFoto = document.getElementById('previewFoto');
const rotateBtn = document.getElementById('rotateBtn');
const rezultBtn = document.getElementById('rezultBtn');

const WIDTH = 200;
const HEIGHT = 300;

function loadFoto(arg) {
  const read = new FileReader();
  read.readAsDataURL(arg);
  read.onload = function () {
    const t = read.result;
    const img = new Image();
    img.src = t;
    //нужно установить небольшую задержку, т.к. фото не успевает загрузится
    setTimeout(function () {
      const canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.setAttribute('width', WIDTH);
      canvas.setAttribute('height', HEIGHT);
      canvas.setAttribute('style', 'border: 1px solid');
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
      ctx.closePath();
      previewFoto.appendChild(canvas);
    }, 30);
  };
}

loadImgBtn.onclick = function () {
  loadFoto(fileInput.files[0]);
};

let angleNum = 0;

rotateBtn.onclick = function () {
  const canvasImg = canvas.toDataURL('image/jpeg');
  const img1 = new Image();
  img1.src = canvasImg;
  setTimeout(function () {
    angleNum += 90;
    const angle = (angleNum * Math.PI) / 180;
    const canvas = document.getElementById('canvas');
    if ((angleNum / 90) % 2 === 1) {
      canvas.setAttribute('width', HEIGHT);
      canvas.setAttribute('height', WIDTH);
    } else {
      canvas.setAttribute('width', WIDTH);
      canvas.setAttribute('height', HEIGHT);
    }

    console.log('angleNum - ', angleNum);
    console.log('angle - ', angle);

    const context = canvas.getContext('2d');
    // context.save();
    // context.beginPath();
    //устанавливаем точку, вокруг которой будет вертется картинка (центр)
    if ((angleNum / 90) % 2 === 1) {
      // context.translate(HEIGHT / 2, WIDTH / 2);
      context.translate(context.canvas.width / 2, context.canvas.height / 2);
    } else {
      // context.translate(WIDTH / 2, HEIGHT / 2);
      context.translate(context.canvas.width / 2, context.canvas.height / 2);
    }

    //rotate устанавливается в радианах. 1 радиан = 180/Пи
    console.log('Rotate and draw');
    console.log('angle - ', angle);
    console.log('WIDTH - ', WIDTH);
    console.log('HEIGHT - ', HEIGHT);

    context.rotate((90 * Math.PI) / 180);

    context.drawImage(
      img1,
      -img1.width / 2,
      -img1.height / 2,
      img1.width,
      img1.height
    );
    // context.closePath();
    // context.restore();
  }, 30);
};

rezultBtn.onclick = function () {
  const canvas = document.getElementById('canvas');
  const canvasImg = canvas.toDataURL('image/jpeg');
  //здесь можно разместить код отправки изображения на сервер
  const rezultImg = document.getElementById('rezultImg');
  const img = new Image();
  img.src = canvasImg;
  rezultImg.appendChild(img);
};
