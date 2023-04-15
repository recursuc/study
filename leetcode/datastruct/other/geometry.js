// Here is an example implementation of a point-in-polygon algorithm in JavaScript
// The function takes in a point (x,y) and an array of polygon vertices (each represented as an array [x,y])
function pointInPolygon(x, y, polygon) {
    let inside = false;
    // Loop through each edge of the polygon
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      // Check if the point is on the edge
      if ((yi > y) !== (yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }
  
  // Usage:
  const polygon = [[0,0], [0,1], [1,1], [1,0]];
  console.log(pointInPolygon(0.5, 0.5, polygon)); // true
  console.log(pointInPolygon(1.5, 0.5, polygon)); // false


  // Here is an implementation of the shortest distance between a point and a line segment in JavaScript
// The function takes in a point (x,y) and two endpoints of a line segment (each represented as an array [x,y])
function pointToLineSegmentDistance(x, y, lineStart, lineEnd) {
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

// Usage:
const lineStart = [0, 0];
const lineEnd = [1, 1];
console.log(pointToLineSegmentDistance(0.5, 0.5, lineStart, lineEnd)); // 0
console.log(pointToLineSegmentDistance(1.5, 1.5, lineStart, lineEnd)); // 0.7071067811865476

// The above code calculates the shortest distance between a point and a line segment.