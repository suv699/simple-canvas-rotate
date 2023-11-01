/* function rotateImage(image: string) {
  const angleNum = 0;
  return rotate(image, angleNum);
}

function rotate(img: string, angleNum: number): string {
  const image = new Image();
  image.src = img;

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('id', 'rotateImageCanvas');

  angleNum += 90;
  const angleRotate = culcAngle(angleNum);

  if ((angleNum / 90) % 2 === 1) {
    canvas.setAttribute('width', `${image.height}`);
    canvas.setAttribute('height', `${image.width}`);
  } else {
    canvas.setAttribute('width', `${image.width}`);
    canvas.setAttribute('height', `${image.height}`);
  }

  if ((angleNum / 90) % 2 === 1) {
    ctx?.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  } else {
    ctx?.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  ctx?.rotate(angleRotate);

  ctx?.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);

  return canvas.toDataURL('image/jpeg');
}

function culcAngle(angle: number): number {
  return (angle * Math.PI) / 180;
}
 */
