import React from "react";

interface Props {
  value: string,
  onSquareClick: () => void,
}

export default class Square extends React.Component<Props> {
  render() {
    return (
      <button
        className='square'
        onClick={this.props.onSquareClick}
      >
        {this.props.value}
      </button>
    )
  }
}
