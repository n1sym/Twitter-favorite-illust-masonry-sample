import React from "react";
import axios from "axios";
import InputForm from "./InputForm";
import ImageTable from './ImageTable'

type typeImageTableState = {
  images: typeImages;
  message: string;
  screen_name: string;
};

type typeImages = {
  url: string[];
  height: number[];
  source: string[];
  max_id: string;
};

class MainTable extends React.Component<{}, typeImageTableState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: {
        url: [],
        height: [],
        source: [],
        max_id: "",
      },
      message: "",
      screen_name: "",
    };
  }

  handleSubmit = (screen_name: string) => {
    twitterAPI(screen_name, this.state.images.max_id)
    .then((res) => {
      this.setIineImages(res);
    })
    .catch(() => {
      this.setState({
        message: "取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。",
      });
    });
  }

  setIineImages = (results: any) => {
    this.setState({images: results, message: "done"})
    console.log(this.state.images)
  };
  
  render() {
    return (
      <div>
        <InputForm onSubmit={(screen_name: string) => this.handleSubmit(screen_name)}/>
        <ImageTable images={this.state.images}/>
        <div className="box h-64 text-center m-5 p-4 ...">
        {this.state.message}
        </div>
      </div>
    );
  }
}
export default MainTable;

function twitterAPI(screen_name: string, max_id: string) {
  let endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/fav?name=${screen_name}&maxid=${max_id}`
  return new Promise((resolve, reject) => {
    axios.get(endpoint)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
