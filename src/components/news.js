import React, { Component } from 'react'
import Newsitem from './newsitem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";  

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 4,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        // console.log("hello i am a constructor from news component.");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults : 0,
            setProgress : 0

        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    //for first capital letter.

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06699b8b424e4e9f80d18064fce52f26&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json()
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({ 
            articles: parseData.articles,
            totalArticles: parseData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }
    //run after render method

    async componentDidMount() {
        this.updateNews();
    }

    //prev btn click
    // handlePrevClick = async () => {
    //     console.log("Previous");
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // //next click btn
    // handleNextClick = async () => {
    //     console.log("Next");
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({page : this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06699b8b424e4e9f80d18064fce52f26&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalArticles: parseData.totalResults})

    }

    render() {
        // API Key : ${this.apiKey}
        //default url if image in not shown : https://www.livemint.com/lm-img/img/this.props.pageSize23/07/30/600x338/09e0689a-8d89-11eb-afe3-8cef4ccbbd72_1622419217618_1690712713699.jpg
        return (
            <div className='container my-3'>
                <h4 className='text-center fw-semibold py-3' style={{"marginTop" : "100px"}}>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)} category</h4>
                {this.state.loading && <Spinner/>}
                {/* //using infinite scroll */}

                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>
                    <div className='container'>
                        <div className='row'>
                            {/* //with loader.. */}

                            {/* {!this.state.loading && this.state.articles.map((element) => {
                            return (
                                <div className='col-md-3' key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 100) : ""} 
                                    imgurl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>
                            )
                        })} */}

                            {this.state.articles.map((element) => {
                                return (
                                    <div className='col-md-3' key={element.url}>
                                        <Newsitem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 100) : ""}
                                            imgurl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                )
                            })}

                            {/* {this.state.articles.map((value)=>{console.log(value)})} */}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container py-3 d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News;
