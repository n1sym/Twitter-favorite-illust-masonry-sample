import React from "react";
import ImageList from "./ImageList";

type typeImageTableState = {
  raneNum: number;
};

type typeImageTableProps = {
  images: typeItems;
};

type typeItems = {
  url: string[];
  height: number[];
  source: string[];
  max_id: string;
};

type typeRaneItems = {
  url: string;
  source: string;
};

class ImageTable extends React.Component<typeImageTableProps, typeImageTableState> {
  constructor(props: typeImageTableProps) {
    super(props);
    console.log(props)
    this.state = {
      raneNum: 0
    };
  }

  async componentDidMount() {
    let queue: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        const innerWidth = window.innerWidth;
        const windowWidth = innerWidth > 500 ? Math.floor(innerWidth / 300) : 2;
        if (!!this.props.images) {
          this.setState({ raneNum: (windowWidth) });
        }
      }, 500);
    });
  }

  render() {
    return (
      <div>
        <ImageList raneItems={createRaneItems(this.state.raneNum, this.props.images)} />
      </div>
    );
  }
}
export default ImageTable;

function searchMinHeightIndex(array: number[]) {
  let minIndex = 0;
  let minHeight = 100000;
  array.forEach((item, index) => {
    if (minHeight > item) {
      minIndex = index;
      minHeight = item;
    }
  });
  return minIndex;
}

function createRaneItems(rane_num: number, items: typeItems): typeRaneItems[][] {
  const RaneItems: typeRaneItems[][] = [];
  for (let i = 0; i < rane_num; i++) {
    RaneItems.push([]);
  }
  const RaneHeights = Array(rane_num).fill(0);
  items.url.forEach((item: any, index: number) => {
    const minHeightIndex = searchMinHeightIndex(RaneHeights);
    RaneHeights[minHeightIndex] += items.height[index];
    RaneItems[minHeightIndex].push({ url: item, source: items.source[index] });
  });
  console.log(RaneHeights);
  return RaneItems;
}
