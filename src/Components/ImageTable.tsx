import React from "react";
import ImageList from "./ImageList";

type typeImageTableProps = {
  images: typeItems;
};

type typeImageTableState = {
  raneNum: number;
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
    this.state = {
      raneNum: window.innerWidth > 600 ? Math.floor(window.innerWidth / 300) : 2
    };
  }

  componentDidMount() {
    let queue: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        const raneNum = window.innerWidth > 600 ? Math.floor(window.innerWidth / 300) : 2;
        this.setState({ raneNum: raneNum });
      }, 500);
    });
  }

  render() {
    return (
      <div className="flex m-1">
        {createRaneItems(this.state.raneNum, this.props.images).map((items: typeRaneItems[], index: number) => {
          return (
            <div key={index}>
              <ImageList raneItems={items} />
            </div>
          );
        })}
      </div>
    );
  }
}
export default ImageTable;

function createRaneItems(rane_num: number, items: typeItems): typeRaneItems[][] {
  const RaneItems: typeRaneItems[][] = Array(rane_num).fill([]).map(_i=>([]))
  const RaneHeights: number[] = Array(rane_num).fill(0);
  items.url.forEach((item: string, index: number) => {
    const minHeightIndex = searchMinHeightIndex(RaneHeights);
    RaneHeights[minHeightIndex] += items.height[index];
    RaneItems[minHeightIndex].push({ url: item, source: items.source[index] });
  });
  return RaneItems;
}

function searchMinHeightIndex(RaneHeights: number[]) {
  let minIndex = 0;
  let minHeight = 100000;
  RaneHeights.forEach((RaneHeight, index) => {
    if (minHeight > RaneHeight) {
      minIndex = index;
      minHeight = RaneHeight;
    }
  });
  return minIndex;
}
