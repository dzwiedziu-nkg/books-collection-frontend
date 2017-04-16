import React from 'react';
import PropTypes from 'prop-types';

export default class Tiles extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    cols: PropTypes.number,
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  render() {
    const { items, cols, renderer } = this.props;

    let e = [];
    let row = -1;
    let pos = 0;
    let colUsed = cols;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let t = React.createElement(renderer, {data: item, width: 12/cols*item.colspan});
      colUsed += item.colspan;
      if (colUsed > cols) {
        row++;
        e[row] = [];
        colUsed = item.colspan;
        pos = 0;
      }
      e[row][pos] = t;
      pos++;
    }


    //debugger;

    return (
      <div>
        {e.map((item, index) => {
          return (
            <div key={index} className="row">
              {item.map((subitem, subindex) => {
                return (<div key={subindex}>{subitem}</div>);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
