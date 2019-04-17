import React, { Component } from 'react';
import './App.css';
import DisplayQuote from './DisplayQuote';
import ToDoList from './ToDoList';
import DisplayWeather from './DisplayWeather';
import DisplayTimeGreetings from './DisplayTimeGreetings';
import { connect } from 'react-redux';
import { fetchImage } from './redux/actions';
import axios from 'axios'

//rationale for choosing to set state locally in react than using redux:
// 1) it's faster
// 2) mapping through the data from redux store is a problem because the fetch would return it's result slower than
// the action of rendering the image data for the background.

class App extends Component {
  state = {
    image_data: [],
    photographer: "",
    image_url: "",
    innerHeight: ""
  }

  // componentWillMount() {
  //   this.props.fetchImage()
  //   // if I didnt do setTimeout it will immediately call displayBG, 
  //   // which will throw an error becos img_data is not ready yet
  //   setTimeout(this.displayBG, 7000)
  // }

  // using componentwillmount because it takes quite a while for the fetch to return result, so I want to make 
  // a call before rendering & reduce the waiting time for the background image to load
  componentWillMount() {
    this.fetchImage()
  }

  // componentDidMount() {
  //   const innerHeight = window.innerHeight
  //   this.setState({ innerHeight })
  // }

  // componentDidUpdate() {
  //   const newInnerHeight = window.innerHeight
  //   if (newInnerHeight !== this.state.innerHeight) {
  //     this.setState({ innerHeight: newInnerHeight })
  //   }
  // }

  fetchImage = () => {
    //using axios becos somehow usual fetch doesn't work
    const n = Math.floor(Math.random() * 1000)
    const url = 'https://api.pexels.com/v1/curated?per_page=1&page=' + n
    axios({
      method: 'GET',
      url: url,
      headers: {
        "Authorization": '563492ad6f91700001000001266dc01858bb499985e410b7a3e3bae5',
        "Content-Type": 'application/json'
      }
    })
      .then(response => JSON.parse(response.request.response))
      .then(data => this.setState({
        photographer: data.photos[0].photographer,
        // image_url: data.photos[0].src.large2x
        image_url: data.photos[0].src.landscape
      }))
      .catch(error => {
        console.log("ERROR:", error)
      })
  }

  // this was for rendering of background image using redux
  // displayBG = () => {
  //   const bgImg = this.props.bgImage[0].img_data
  //   bgImg.map((img, index) => {
  //     const photographer = img.photographer
  //     const image_url = img.src.landscape
  //     console.log(photographer)
  //     console.log(image_url)
  //     return (image_url)
  //   })
  // }
  // resizeBackground = () => {
  //   var innerHeight = window.innerHeight;
  //   window.setInterval(function () {
  //     var newInnerHeight = window.innerHeight;
  //     if (newInnerHeight !== innerHeight) {
  //       // var newScrollY = window.scrollY + newInnerHeight - innerHeight;
  //       // // ... do whatever you want with this new scrollY
  //       // innerHeight = newInnerHeight;
  //       return
  //     }
  //   }), 1000 / 60
  // };


  render() {
    // console.log(this.state.photographer)
    // console.log(this.state.image_url)
    // console.log(this.state.innerHeight)
    return (
      <div className="App" style={{ backgroundImage: `url(${this.state.image_url})`, backgroundSize: 'cover' }}>
        <DisplayWeather />
        <DisplayTimeGreetings />
        <ToDoList />
        <DisplayQuote />
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bgImage: state.bgImage,
  } // state.bgImage becos in reducers.js i defined bgImage = fetchImageReducer
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImage: () => { dispatch(fetchImage()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
