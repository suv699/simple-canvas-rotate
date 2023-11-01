/* function rotateImg(image: string): string {
  const angleNum = 0;
  return rotate(image, angleNum);
}

function rotate(image: string, angleNum: number): string {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width.id = `rotateImageCanvas`;

  angleNum += 90;
  const angle_rotate = culcAngle(angleNum);

  if ((angleNum / 90) % 2 === 1) {
    ctx.canvas.width = image.height; // width
    ctx.canvas.height = image.width; // height
  } else {
    ctx.canvas.width = image.width; // width
    ctx.canvas.height = image.height; // height
  }

  if ((angleNum / 90) % 2 === 1) {
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  } else {
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  ctx.rotate(angle_rotate);

  ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);

  return canvas.toDataURL('image/jpeg');
}

function culcAngle(angle) {
  return (angle * Math.PI) / 180;
}
 */
