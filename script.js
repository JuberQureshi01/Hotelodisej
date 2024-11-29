gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




function textsplit(){
    let allh1=document.querySelectorAll("#page2 h1")
    allh1.forEach(function(elem){
       var h1text= elem.innerHTML;
      var splitedtext= h1text.split("");
      let clutter="";
      splitedtext.forEach(function(em){
          clutter = clutter+ `<span>${em}</span>`
      })
      elem.innerHTML= clutter
    })

    let page3h1=document.querySelectorAll("#page3 h1")
    page3h1.forEach(function(elem){
        var h1text= elem.innerHTML;
       var splitedtext= h1text.split("");
       let clutter="";
       splitedtext.forEach(function(em){
           clutter = clutter+ `<span>${em}</span>`
       })
       elem.innerHTML= clutter
     })
}
 
var time=gsap.timeline();

function gsapAnimation(){
    time.to("#page1 img",{
        width:"100%",
       borderRadius:"0",
        height:"100vh",
        position:"absolute",
        top:"0%",
       duration:1.5,
    })
    time.from("#page1 #nav #main-h1",{
        y:-90,
        opacity:0,
       duration:1,
    })
    time.from("#page1 .an",{
        y:-90,
        opacity:0,
       duration:0.7,
       stagger:0.5,
    })
    gsap.to("#page2 h1 span",{
        color:"#E3E3C4",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page2 h1",
            scroller:"#main",
            // markers:true,
            start:"top 50%",
            end:"top 5%",
            scrub:2
        }
    })
    gsap.to("#page3 h1 span",{
        color:"#556043",
        stagger:0.1,
        scrollTrigger:{
            trigger:"#page3 h1",
            scroller:"#main",
            // markers:true,
            start:"top 50%",
            end:"top 0%",
            scrub:2
        }
    })

    time.from("#page3 #page3-part1",{
        y:80,
        opacity:0,
        duration:1,
        stagger:0.5,
        scrollTrigger:{
            trigger:"#page3 ",
            scroller:"#main",
            // markers:true,
            start:"top 10%",
            end:"top 0%",
            scrub:2
        }
    })
    time.from("#page3 #page3-part2",{
        y:80,
        opacity:0,
        duration:1,
        stagger:0.5,
        scrollTrigger:{
            trigger:"#page3 ",
            scroller:"#main",
            // markers:true,
            start:"top 10%",
            end:"top 0%",
            scrub:2
        }
    })
   
  
}

textsplit()
gsapAnimation()