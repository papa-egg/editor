import Paint from '../etc/paint';

export default class SchPolygon extends Paint {
  constructor () {
    super();

    this.minLength = 2;
    this.maxLength = Infinity;
    this.shortElem = null;
    this.finalElem = null;
  }

  startPaint (pointArr) {
    let pointStrArr = [];

    for (let pItem of pointArr) {
      pointStrArr.push(pItem.join(' '));
    }

    this.shortElem = this.device.createElem({
      type: 'sch_polygon',
      attrs: {
        points: pointStrArr.join(' '),
      },
      params: {
        position: {
          x: pointArr[0][0],
          y: pointArr[0][1],
        }
      }
    });

    this.finalElem = this.shortElem;
  }
}
