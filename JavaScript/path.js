/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
  const svg = d3.select("svg");
  const width = svg.attr("width");
  const height = svg.attr("height");

  let data = [];
  const padding = 100;
  //начальное положение рисунка
  let posX = padding;
  let posY = height - padding;
  const h = 5;
  // координаты y - уменьшаются, x - постоянны
  while (posY > padding) {
    data.push({ x: posX, y: posY });
    posY -= h;
  }
  // координаты y - постоянны, x - увеличиваются
  while (posX < width - padding) {
    data.push({ x: posX, y: posY });
    posX += h;
  }
  return data;
}

// создаем массив точек, расположенных по кругу
function createPathCircle() {
  const svg = d3.select("svg");
  const width = svg.attr("width");
  const height = svg.attr("height");
  let data = [];
  // используем параметрическую форму описания круга
  // центр расположен в центре svg-элемента, а радиус равен трети высоты/ширины
  for (let t = 0; t <= Math.PI * 2; t += 0.1) {
    data.push({
      x: width / 2 + (width / 3) * Math.sin(t),
      y: height / 2 + (height / 3) * Math.cos(t),
    });
  }
  return data;
}

function createPathW() {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");
    const padding = 100;
    const h = 5;
    let data = [];

    let x = padding;
    let y = padding;

    while (y < height - padding) {
        data.push({x, y});
        y += h;
    }

    while (x < width / 2) {
        x += h;
        y -= h;
        data.push({x, y});
    }

    while (x < width - padding) {
        x += h;
        y += h;
        data.push({x, y});
    }

    while (y > padding) {
        data.push({x, y});
        y -= h;
    }

    return data;
}

let drawPath = (typePath) => {
  // создаем массив точек
  let dataPoints;
  if (typePath == 0) {
    dataPoints = createPathG();
  } else if (typePath == 1) {
    dataPoints = createPathCircle();
  } else if (typePath == 2) {
    dataPoints = createPathW();
  }

  const line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);
  const svg = d3.select("svg");
  // создаем путь на основе массива точек
  const path = svg
    .append("path")
    .attr("d", line(dataPoints))
    .attr("none", "black")
    .attr("fill", "none");

  return path;
};

function translateAlong(path) {
  const length = path.getTotalLength();
  return function () {
    return function (t) {
      const { x, y } = path.getPointAtLength(t * length);
      return `translate(${x},${y})`;
    };
  };
}

function createTransformTween(pathNode, dataForm) {
  const length = pathNode.getTotalLength();

  const startRotate = dataForm.rotate.value;
  const endRotate = dataForm.rotate_1.value;
  const startScaleX = dataForm.scaleX.value;
  const endScaleX = dataForm.scaleX_1.value;
  const startScaleY = dataForm.scaleY.value;
  const endScaleY = dataForm.scaleY_1.value;


  return function () {
    return function (t) {
      const {x, y}  = pathNode.getPointAtLength(t * length)
      const rotate = d3.interpolateNumber(startRotate, endRotate)(t)
      const scaleX = d3.interpolateNumber(startScaleX, endScaleX)(t)
      const scaleY = d3.interpolateNumber(startScaleY, endScaleY)(t)
      return `translate(${x},${y}) rotate(${rotate}) scale(${scaleX},${scaleY})`
    };
  };
}
