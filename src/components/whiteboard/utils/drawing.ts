import { WhiteboardElement, Shape, TableData, TextData } from '../types';

export const drawElement = (ctx: CanvasRenderingContext2D, element: WhiteboardElement) => {
  switch (element.type) {
    case 'pen':
      drawPath(ctx, element as Shape);
      break;
    case 'rectangle':
      drawRectangle(ctx, element as Shape);
      break;
    case 'circle':
      drawCircle(ctx, element as Shape);
      break;
    case 'line':
      drawLine(ctx, element as Shape);
      break;
    case 'text':
      drawText(ctx, element as TextData);
      break;
    case 'table':
      drawTable(ctx, element as TableData);
      break;
  }
};

const drawPath = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  const { points, color, width } = shape;
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};

const drawRectangle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  const { points, color, width } = shape;
  if (points.length < 2) return;

  const [start, end] = points;
  const w = end.x - start.x;
  const h = end.y - start.y;

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.strokeRect(start.x, start.y, w, h);
};

const drawCircle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  const { points, color, width } = shape;
  if (points.length < 2) return;

  const [start, end] = points;
  const radius = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  ctx.beginPath();
  ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};

const drawLine = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  const { points, color, width } = shape;
  if (points.length < 2) return;

  const [start, end] = points;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};

const drawText = (ctx: CanvasRenderingContext2D, textData: TextData) => {
  const { text, position, fontSize, color } = textData;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = color;
  ctx.fillText(text, position.x, position.y);
};

const drawTable = (ctx: CanvasRenderingContext2D, tableData: TableData) => {
  const { rows, cols, cells, position } = tableData;
  const cellWidth = 100;
  const cellHeight = 40;

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;

  for (let i = 0; i <= rows; i++) {
    ctx.beginPath();
    ctx.moveTo(position.x, position.y + i * cellHeight);
    ctx.lineTo(position.x + cols * cellWidth, position.y + i * cellHeight);
    ctx.stroke();
  }

  for (let j = 0; j <= cols; j++) {
    ctx.beginPath();
    ctx.moveTo(position.x + j * cellWidth, position.y);
    ctx.lineTo(position.x + j * cellWidth, position.y + rows * cellHeight);
    ctx.stroke();
  }

  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#000';
  cells.forEach((row, i) => {
    row.forEach((cell, j) => {
      ctx.fillText(
        cell,
        position.x + j * cellWidth + 5,
        position.y + i * cellHeight + 25
      );
    });
  });
};