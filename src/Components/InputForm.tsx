import React from "react";

type typeInputFormState = {
  screen_name: string;
};

type typeInputFornProps = {
  onSubmit: any
}

class InputForm extends React.Component<typeInputFornProps, typeInputFormState> {
  constructor(props: typeInputFornProps) {
    super(props);
    this.state = {
      screen_name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    this.setState({ screen_name: event.target.value });
  }

  handleSubmit(event: any) {
    this.props.onSubmit(this.state.screen_name)
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="flex justify-center mb-5 mx-5">
            <p className="md-5">
              twitterのスクリーンネームを入力してください（例：@hukurouo）
              <br />
              <br />
              その人がいいねした画像が良い感じに表示されます。
            </p>
          </div>
          <div className="flex mb-5 mx-auto max-w-xs">
            <div className="mt-1 relative rounded-md shadow-sm mx-5 w-11/12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">@</span>
              </div>
              <input
                type="text"
                autoCapitalize="off"
                name="screen_name"
                value={this.state.screen_name}
                onChange={this.handleChange}
                className="bg-white focus:outline-none focus:shadow-outline py-2 px-8 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mb-5 mx-5">
            <input
              type="submit"
              value="取得"
              disabled={this.state.screen_name === ""}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 rounded w-20 mb-10"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default InputForm;