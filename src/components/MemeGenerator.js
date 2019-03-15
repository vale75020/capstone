import React, { Component } from "react";

export default class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
    //  console.log(memes[0]);
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange = event => {
    // console.log('it works!')
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault()
    //  get a random number int (index in array)
    const randNum = Math.floor(Math.random()*this.state.allMemeImgs.length)
    //  get the meme from that index
    const randMemeImg = this.state.allMemeImgs[randNum].url
    //  set "rendomImg to the 'url" of the random item
    this.setState({ randomImg: randMemeImg })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Top Text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>GEN</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="new meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
