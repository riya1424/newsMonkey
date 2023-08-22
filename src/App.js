import './App.css';
import React, { Component } from 'react';
import Navbar from './components/navbar';
import News from './components/news';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
    state = {
      progress : 0
    }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#ffff00'
          progfress={this.state.progress}
          height="1px"
      />
        <Routes>
          <Route path='/' element={<News setProgress={this.setProgress} key="general" pageSize={4} country="in" category="general" />} />
          <Route path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={4} country="in" category="sports" />} />
          <Route path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={4} country="in" category="business" />} />
          <Route path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={4} country="in" category="entertainment" />} />
          <Route path='/general' element={<News setProgress={this.setProgress} key="general" pageSize={4} country="in" category="general" />} />
          <Route path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={4} country="in" category="health" />} />
          <Route path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={4} country="in" category="science" />} />
          <Route path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={4} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    )
  }
}



