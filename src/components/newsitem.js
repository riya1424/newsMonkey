import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {

    //if this.props is object then it will return from object as a title and description. 
    let { title, description, imgurl,newsURL , author, date , source} = this.props;

    return (
      <div className='m-3'>
            <div className="card">
              <span className="position-absolute top-0 p-2 translate-middle badge badge-pill bg-success" style={{"left" : "91%","zIndex" : "1"}}>{source}</span>
                <img src={!imgurl?"https://www.livemint.com/lm-img/img/2023/07/30/600x338/09e0689a-8d89-11eb-afe3-8cef4ccbbd72_1622419217618_1690712713699.jpg":imgurl} className="card-img-top" alt="img" />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{title} </h5>
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className='text-muted'>By <b>{!author ? "unknown" : author}</b> on <b>{new Date(date).toGMTString()}</b></small></p>
                    <a href={newsURL} className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>

      </div>
    )
  }
}

export default Newsitem;
