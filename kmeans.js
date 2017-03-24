class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "X : " + this.x + " Y : " + this.y;
  }

  euclideanDistance(other) {
    return Math.round(Math.sqrt(Math.pow((other.x - this.x), 2) + Math.pow((other.y - this.y), 2)));
  }
}

class KMeans {

  generateSets(points, means) {
    return points.map(point => [means.reduce(
        (acc, m) => {
          var distance = m.euclideanDistance(point);
          return distance < acc.distance ? { distance: distance, mean: m } : acc 
        }, 
        { mean: Infinity, distance: Infinity }
      ).mean, point]
    );
  }

  mapPoints(points, means) {
    return this.generateSets(points, means)
      .reduce(
        function (prev, curr) {
          let value = prev[curr[0]];

          if (value === undefined)
            value = [curr[1]];
          else
            value.push(curr[1]);

          prev[curr[0]] = value;
          return prev;
        }
        , {});
  }

  getCentroids(obj) {
    var array = [];
    for (let key in obj) {
      let element = obj[key];

      let count = element.length;
      let sumX = 0;
      let sumY = 0;

      element.forEach(function(p) {
        sumX += p.x;
        sumY += p.y;
      });

      array.push(new Point(Math.round(sumX/count), Math.round(sumY/count)));
    }

    return array;
  }

  validateCondition(means, points) {
    let conditionSatisfied = false;
    points.forEach(function(p) {
      conditionSatisfied = false;
      means.forEach(function(m) {
        if (m.euclideanDistance(p) < 10) {
          conditionSatisfied = true;
        }
      });

      if (!conditionSatisfied)
        return;
    });

    return conditionSatisfied;

  }

}

var generatePoints = function(nb) {
  var a = [];

  for (i = 0; i < nb; i++) {
    a.push(new Point(Math.round(Math.random() * 500), Math.round(Math.random() * 500)));
  }

  return a;
}

var arr = generatePoints(200);
var means = generatePoints(3);

var kMeans = new KMeans();

var pointObj = kMeans.mapPoints(arr, means);
let newMeans = kMeans.getCentroids(pointObj);
