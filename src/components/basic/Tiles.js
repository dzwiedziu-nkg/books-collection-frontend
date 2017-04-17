import React from 'react';
import PropTypes from 'prop-types';

export default class Tiles extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    cols: PropTypes.number,
    edit: PropTypes.bool,
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  render() {
    const { items, cols, renderer, edit } = this.props;

    let e = [];
    let row = -1;
    let pos = 0;
    let colUsed = cols;
    let tiles = items.slice();

    if (edit) {
      tiles[tiles.length] = { colspan: 1, name: '{add}'}
    }

    for (let i = 0; i < tiles.length; i++) {
      let item = tiles[i];
      let t = React.createElement(renderer, {data: item, width: 12/cols*item.colspan, edit});
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
