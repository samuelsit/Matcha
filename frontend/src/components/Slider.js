import React, { Component, Fragment } from 'react'
import '../css/Slider.css'

class Slider extends Component {

    componentDidMount() {
        const carouselSlide = document.querySelector('.carousel-slide')
        const carouselImages = document.querySelectorAll('.carousel-slide img')
        const nextBtn = document.querySelector('#prevBtn')
        const prevBtn = document.querySelector('#nextBtn')

        let counter = 0
        const size = carouselImages[0].clientWidth
        
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1)
                return;
            carouselSlide.style.transition = "transform 0.4s ease-in-out"
            counter++
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
        })
        prevBtn.addEventListener('click', () => {
            if (counter <= 0)
                return;
            carouselSlide.style.transition = "transform 0.4s ease-in-out"
            counter--
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
        })
    }

    render() {
        return (
            <Fragment>
                <div className="carousel-container">
                    <i className="fas fa-arrow-left" id="nextBtn"></i>
                    <i className="fas fa-arrow-right" id="prevBtn"></i>
                    <div className="carousel-slide">
                        <img className="card-img-top" src={this.props.img1} alt="_1"/>
                        <img className="card-img-top" src={this.props.img2} alt="_2"/>
                        <img className="card-img-top" src={this.props.img3} alt="_3"/>
                        <img className="card-img-top" src={this.props.img4} alt="_4"/>
                        <img className="card-img-top" src={this.props.img5} alt="_5"/>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Slider