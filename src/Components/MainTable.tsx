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
    if (screen_name !== this.state.screen_name) {
      this.setState({ images: {url: [], height: [], source: [], max_id: ""}})
    }
    this.setState({screen_name: screen_name, message: "loading..."})
    setTimeout(() => {
      this.getiine(screen_name)
    },500)
  }

  getiine = (screen_name: string) => {
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
    this.setState({
      images: {
        url: this.state.images.url.concat(results.url),
        height: this.state.images.height.concat(results.height),
        source: this.state.images.source.concat(results.source),
        max_id: String(results.max_id)
      }
    })
    if (results.url.length === 0) {
      this.setState({ message: "いいねした画像がありませんでした" });
      return;
    }
    this.setState({
      message: ""
    });
  };

  componentDidMount() {
    let queue: NodeJS.Timeout;
    window.addEventListener("scroll", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight;
        const offsetHeight = document.documentElement.offsetHeight;
        if (
          offsetHeight - scroll_Y <= 1000 &&
          this.state.message !== "loading..." &&
          offsetHeight > 1500
        ) {
          this.setState({ message: "loading..." });
          this.getiine(this.state.screen_name);
        }
      }, 500);
    });
  }
  
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
