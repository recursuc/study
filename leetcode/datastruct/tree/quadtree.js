// Here is an implementation of a Quadtree data structure in JavaScript
// A Quadtree is a tree data structure in which each internal node has exactly four children: north-west, north-east, south-west and south-east
// It is often used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions

class Quadtree {
  constructor(boundary, capacity) {
    this.boundary = boundary; // the boundary of the Quadtree
    this.capacity = capacity; // the maximum number of points each node can contain
    this.points = []; // an array of points in the Quadtree
    this.divided = false; // whether the Quadtree has been divided into four sub-quadrants
    this.northWest = null; // the north-west sub-quadrant
    this.northEast = null; // the north-east sub-quadrant
    this.southWest = null; // the south-west sub-quadrant
    this.southEast = null; // the south-east sub-quadrant
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false; // the point is outside the Quadtree boundary
    }

    if (this.points.length < this.capacity) {
      this.points.push(point); // add the point to this node
      return true;
    }

    if (!this.divided) {
      this.subdivide(); // divide this node into four sub-quadrants
    }

    // recursively insert the point into the appropriate sub-quadrant
    if (this.northWest.insert(point)) {
      return true;
    }
    if (this.northEast.insert(point)) {
      return true;
    }
    if (this.southWest.insert(point)) {
      return true;
    }
    if (this.southEast.insert(point)) {
      return true;
    }

    // if the point cannot be inserted into any sub-quadrant, it must be on the boundary
    // add it to this node anyway
    this.points.push(point);
    return true;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;

    let nw = new Rectangle(x - w, y - h, w, h);
    this.northWest = new Quadtree(nw, this.capacity);

    let ne = new Rectangle(x + w, y - h, w, h);
    this.northEast = new Quadtree(ne, this.capacity);

    let sw = new Rectangle(x - w, y + h, w, h);
    this.southWest = new Quadtree(sw, this.capacity);

    let se = new Rectangle(x + w, y + h, w, h);
    this.southEast = new Quadtree(se, this.capacity);

    this.divided = true;
  }

  query(range, found) {
    if (!found) {
      found = []; // create a new array if none is provided
    }

    if (!this.boundary.intersects(range)) {
      return found; // the range does not intersect this Quadtree boundary
    }

    // check each point in this node
    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p); // add the point to the result array
      }
    }

    if (this.divided) {
      // recursively search the sub-quadrants
      this.northWest.query(range, found);
      this.northEast.query(range, found);
      this.southWest.query(range, found);
      this.southEast.query(range, found);
    }

    return found;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // the x-coordinate of the top-left corner
    this.y = y; // the y-coordinate of the top-left corner
    this.w = w; // the width of the rectangle
    this.h = h; // the height of the rectangle
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}