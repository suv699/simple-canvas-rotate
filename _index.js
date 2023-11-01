/*
orig_size = {
width:  ширина_исходного_изображения,
height: высота_исходного_изображения
};
angle - угол поворота по часовой стрелке в радианах.
 */

function get_small_image_size(orig_size, angle) {
  function det4(v1, v2, v3, v4) {
    return v1 * v4 - v2 * v3;
  }
  function get_intersection_point(line1, line2) {
    let { x1, y1, x2, y2 } = line1;
    let { x1: x3, y1: y3, x2: x4, y2: y4 } = line2;

    let x12 = x1 - x2;
    let x34 = x3 - x4;
    let y12 = y1 - y2;
    let y34 = y3 - y4;

    let xy12 = det4(x1, y1, x2, y2);
    let xy34 = det4(x3, y3, x4, y4);

    let denom = det4(x12, y12, x34, y34);

    let x = det4(xy12, x12, xy34, x34) / denom;
    let y = det4(xy12, y12, xy34, y34) / denom;

    x = isNaN(x) ? Infinity : x;
    y = isNaN(y) ? Infinity : y;
    return {
      x,
      y,
    };
  }
  function rot(point, angle) {
    let sin_theta = Math.sin(angle);
    let cos_theta = Math.cos(angle);

    let x = cos_theta * point.x + sin_theta * point.y;
    let y = -sin_theta * point.x + cos_theta * point.y;
    return {
      x,
      y,
    };
  }
  function points_to_line(p1, p2) {
    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
    };
  }
  function dist2(p1, p2) {
    let x = p1.x - p2.x;
    let y = p1.y - p2.y;
    return x * x + y * y;
  }

  let { width, height } = orig_size;

  let O = {
    x: 0,
    y: 0,
  };
  let A = {
    x: -0.5 * width,
    y: 0.5 * height,
  };
  let B = {
    x: 0.5 * width,
    y: 0.5 * height,
  };
  let D = {
    x: -0.5 * width,
    y: -0.5 * height,
  };

  let As = rot(A, angle);
  let Bs = rot(B, angle);
  let Ds = rot(D, angle);

  let AO = points_to_line(A, O);
  let BO = points_to_line(B, O);
  let AsBs = points_to_line(As, Bs);
  let AsDs = points_to_line(As, Ds);

  let AO_AsBs = get_intersection_point(AO, AsBs);
  let AO_AsDs = get_intersection_point(AO, AsDs);
  let BO_AsBs = get_intersection_point(BO, AsBs);
  let BO_AsDs = get_intersection_point(BO, AsDs);

  let len_diag1 = Math.min(dist2(AO_AsBs, O), dist2(AO_AsDs, O));
  let len_diag2 = Math.min(dist2(BO_AsBs, O), dist2(BO_AsDs, O));
  let len_diag = 2 * Math.sqrt(Math.min(len_diag1, len_diag2));

  let ratio = height / width;

  let res = {};
  res.width = len_diag / Math.sqrt(ratio * ratio + 1);
  res.height = ratio * res.width;
  return res;
}

async function rotate(addr) {
  let img = new Image();
  img.setAttribute('src', addr);
  await (() => {
    return new Promise((resolve, reject) => {
      img.onload = function () {
        resolve();
      };
    });
  })();

  let ctx = document.getElementById('canvas_id').getContext('2d');
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;

  let input = document.getElementById('input_id');
  let label = document.getElementById('label_id');
  let btn = document.getElementById('btn');
  console.log('btn - ', btn);
  let small_ctx = document.createElement('canvas').getContext('2d');

  function handler() {
    let angle_rad = (input.value * Math.PI) / 180;
    label.textContent = input.value;

    ctx.save();
    {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.rotate(angle_rad);
      ctx.drawImage(img, -ctx.canvas.width / 2, -ctx.canvas.height / 2);
    }
    ctx.restore();

    ctx.save();
    {
      let orig_size = {
        width: img.width,
        height: img.height,
      };
      let { width: small_width, height: small_height } = get_small_image_size(
        orig_size,
        angle_rad
      );

      let small_x = Math.round(ctx.canvas.width / 2 - small_width / 2);
      let small_y = Math.round(ctx.canvas.height / 2 - small_height / 2);

      small_width = Math.round(small_width);
      small_height = Math.round(small_height);

      small_ctx.canvas.width = small_width;
      small_ctx.canvas.height = small_height;
      small_ctx.drawImage(
        ctx.canvas,
        small_x,
        small_y,
        small_width,
        small_height,
        0,
        0,
        small_width,
        small_height
      );

      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(small_ctx.canvas, small_x, small_y);
    }
    ctx.restore();
  }

  function culcAngle(angle) {
    return (angle * Math.PI) / 180;
  }
  let angleNum = 0;
  function rotateClick() {
    angleNum += 90;
    const angle_rotate = culcAngle(angleNum);
    console.log('img.height - ', img.height);
    console.log('img.width - ', img.width);
    console.log('rotateClick - ', angle_rotate);
    console.log('angleNum - ', angleNum);
    console.log('div - ', angleNum / 90);

    if ((angleNum / 90) % 2 === 1) {
      ctx.canvas.width = img.height; // width
      ctx.canvas.height = img.width; // height
    } else {
      ctx.canvas.width = img.width; // width
      ctx.canvas.height = img.height; // height
    }

    console.log('ctx.canvas.width - ', ctx.canvas.width);
    console.log('ctx.canvas.height - ', ctx.canvas.height);

    // ctx.save();
    {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      if ((angleNum / 90) % 2 === 1) {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      } else {
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      }

      ctx.rotate(angle_rotate);
      ctx.drawImage(
        img,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );
    }
    // ctx.restore();
  }

  handler();
  input.addEventListener('input', () => (label.textContent = input.value));
  input.addEventListener('change', handler);

  btn.addEventListener('click', rotateClick);
}

rotate('https://i.stack.imgur.com/ezAfF.jpg');
