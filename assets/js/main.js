/**
* Template Name: FlexStart - v1.11.1
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

/* Boton   */
  
  let leerMas_btn = document.getElementById('leerMas_btn');
  let hideText = document.getElementById('hideText');
  
  leerMas_btn.addEventListener('click', toggleText);
  
  function toggleText() {
    hideText.classList.toggle('showText');
  
    if(hideText.classList.contains('showText')) {
      leerMas_btn.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn.innerHTML = 'Ver Mas'
    }
  }


  let leerMas_btn1 = document.getElementById('leerMas_btn1');
  let hideText1 = document.getElementById('hideText1');
  
  leerMas_btn1.addEventListener('click', toggleText1);
  
  function toggleText1() {
    hideText1.classList.toggle('showText1');
  
    if(hideText1.classList.contains('showText1')) {
      leerMas_btn1.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn1.innerHTML = 'Ver Mas'
    }
  }

  

  let leerMas_btn11 = document.getElementById('leerMas_btn11');
  let hideServ1 = document.getElementById('hideServ1');
  
  leerMas_btn11.addEventListener('click', toggleText11);
  
  function toggleText11() {
    hideServ1.classList.toggle('showText2');
  
    if(hideServ1.classList.contains('showText2')) {
      leerMas_btn11.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn11.innerHTML = 'Ver Mas'
    }
  }

  let leerMas_btn12 = document.getElementById('leerMas_btn12');
  let hideServ2 = document.getElementById('hideServ2');
  
  leerMas_btn12.addEventListener('click', toggleText12);
  
  function toggleText12() {
    hideServ2.classList.toggle('showText2');
  
    if(hideServ2.classList.contains('showText2')) {
      leerMas_btn12.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn12.innerHTML = 'Ver Mas'
    }
  }

  let leerMas_btn13 = document.getElementById('leerMas_btn13');
  let hideServ3 = document.getElementById('hideServ3');
  
  leerMas_btn13.addEventListener('click', toggleText13);
  
  function toggleText13() {
    hideServ3.classList.toggle('showText2');
  
    if(hideServ3.classList.contains('showText2')) {
      leerMas_btn13.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn13.innerHTML = 'Ver Mas'
    }
  }

  let leerMas_btn14 = document.getElementById('leerMas_btn14');
  let hideServ4 = document.getElementById('hideServ4');
  
  leerMas_btn14.addEventListener('click', toggleText14);
  
  function toggleText14() {
    hideServ4.classList.toggle('showText2');
  
    if(hideServ4.classList.contains('showText2')) {
      leerMas_btn14.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn14.innerHTML = 'Ver Mas'
    }
  }

  let leerMas_btn15 = document.getElementById('leerMas_btn15');
  let hideServ5 = document.getElementById('hideServ5');
  
  leerMas_btn15.addEventListener('click', toggleText15);
  
  function toggleText15() {
    hideServ5.classList.toggle('showText2');
  
    if(hideServ5.classList.contains('showText2')) {
      leerMas_btn15.innerHTML = 'Ver Menos'
    }
    else {
      leerMas_btn15.innerHTML = 'Ver Mas'
    }
  }



})();


