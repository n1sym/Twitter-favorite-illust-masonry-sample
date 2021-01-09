import React from "react";

type typeRaneItems = {
  url: string;
  source: string;
};
type typeImageListProps = {
  raneItems: typeRaneItems[][];
};

class ImageList extends React.Component<typeImageListProps> {
  listItems = (itemsArrays: typeRaneItems[][]) => {
    return (
      <div className="flex m-1">
        {itemsArrays.map((items: typeRaneItems[], i: number) => {
          return (
            <div className="flex flex-col" key={i}>
              {items.map((item: typeRaneItems, j: number) => {
                return (
                  <div key={j}>
                    {window.innerWidth >= 500 ? (
                      <div className="max-w-xs m-1">
                        <ListItem url={item.url} source={item.source} />
                      </div>
                    ) : (
                        <div className="m-1">
                          <ListItem url={item.url} source={item.source} />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return <div>{this.listItems(this.props.raneItems)}</div>;
  }
}
export default ImageList;

function ListItem(props: typeRaneItems) {
  return (
    <a href={props.source} target="_blank" rel="noopener noreferrer">
      <img src={props.url} alt="" />
    </a>
  );
}