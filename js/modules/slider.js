function slider() {

    // Slider

    /* const prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          currentNum = document.querySelector('#current'),
          totalNum = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide');

    let slideIndex = 1;



    currentNum.textContent = '0' + slideIndex;

    totalNum.textContent = '0' + slides.length;



    function showSlides() {

        if (slideIndex < 10) {
            slideIndex = '0' + slideIndex;
        }

        currentNum.textContent = slideIndex;

        slides.forEach((item, i) => {
            if (i + 1 === +slideIndex) {
                item.classList.add('show', 'fade');
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
                item.classList.remove('show');
            }
        });
    }

    showSlides();

    

    prevBtn.addEventListener('click', () => {

        if (slideIndex <= 1) {
            slideIndex = slides.length;
        } else {
            slideIndex = --slideIndex;
        }  

        showSlides();
    });



    nextBtn.addEventListener('click', () => {

        if (slideIndex >= slides.length) {
            slideIndex = 1;
        } else {
            slideIndex = ++slideIndex;
        }  

        showSlides();
    }); */



    const prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          currentNum = document.querySelector('#current'),
          totalNum = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          width = window.getComputedStyle(slidesWrapper).width;

    const slidesField = document.createElement('div');
    slidesField.classList.add('offer__slider-inner');
    slidesWrapper.append(slidesField);

    slides.forEach((item) => {
        slidesField.append(item);
    });

    let slideIndex = 1;
    let offset = 0;



    if (slides.length < 10) {
        totalNum.textContent = `0${slides.length}`;
        currentNum.textContent = `0${slideIndex}`;
    } else {
        totalNum.textContent = slides.length;
        currentNum.textContent = slideIndex;
    }



    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });



    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }



    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function counterAddZero(length) {
        if (length < 10) {
            currentNum.textContent = `0${slideIndex}`;
        } else {
            currentNum.textContent = slideIndex;
        }
    }

    function dotHighlight(indicators) {
        indicators.forEach(dot => dot.style.opacity = '.5');
        indicators[slideIndex -1].style.opacity = 1;
    }



    nextBtn.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        counterAddZero(slides.length);

        dotHighlight(dots);
    });
    
    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        counterAddZero(slides.length);

        dotHighlight(dots);
    });



    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            counterAddZero(slides.length);

            dotHighlight(dots);
        });
    });
}

module.exports = slider;
