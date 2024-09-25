//  Imgae scroller

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    MaxIndex: 538
};

let imageLoaded = 0;
const images = [];

function preloadeImages() {
    for (i = 1; i <= frames.MaxIndex; i++) {
        const imageUrl = `./compressed/frame_${i.toString().padStart(4, "0")}.jpeg`
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imageLoaded++;
            if (imageLoaded === frames.MaxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index) {
    if (index >=0 && index <= frames.MaxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
 
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high"
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start:"top top",
            scrub: 2, 
            // markers: true,
        }
    })
 
    function updateFrame(index) {
        return {
            currentIndex: index,
            ease: "linear",
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex))
            }
        }
    }

    tl
    .to(frames, updateFrame(50), "first")
    .to(".animate1", {opacity: 0, ease: "linear"}, "first")
 
    .to(frames, updateFrame(80), "second")
    .to(".animate2", {opacity: 1, ease: "linear"}, "second")
 
    .to(frames, updateFrame(110), "third")
    .to(".animate2", {opacity: 0, ease:"linear"}, "third")

    .to(frames, updateFrame(140), "fourth")
    .to(".animate3", {opacity: 1, ease: "linear"}, "fourth")
 
    .to(frames, updateFrame(170), "fifth")
    .to(".animate3", {opacity: 0, ease: "linear"}, "fifth")

    .to(frames, updateFrame(200), "sixth")
    .to(".panel", {x: "0%", ease: "expo"}, "sixth")

    .to(frames, updateFrame(230), "seventh")
    .to(".panel", {x: "0%", ease: "expo"}, "seventh")
 
    .to(frames, updateFrame(260), "seventh_1")
    .to(".panel", {opacity: 0, ease: "linear"}, "seventh_1")
 
    .to(frames, updateFrame(290), "eight")
    .to("canvas", {scale: .5, ease: "linear"}, "eight")
 
    .to(frames, updateFrame(320), "ninth")
    .to(".panelism", {opacity: 1, ease: "linear"}, "ninth")
    .to(".panelism span", {width: 200, ease: "expo"}, "ninth")
 
    .to(frames, updateFrame(350), "tenth")
    .to("canvas", {scale: 1, ease: "linear"}, "tenth")
 
    .to(frames, updateFrame(438), "eleventh")
    .to(".panelism", {scale: 2, ease: "circ"}, "eleventh")
    .to(".navbar", {opacity: 0, ease: "linear"}, "eleventh")
 
    .to(frames, updateFrame(450), "twelth")
    .to(".panelism", {scale: 2, ease: "circ"}, "twelth")
 
    .to(frames, updateFrame(538));
}
preloadeImages();
 
window.addEventListener("resize", function () {
    loadImage(Math.floor(frames.currentIndex))
})
document.querySelectorAll(".headings h1").forEach(function (elem) {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 100%",
            end: "bottom 50%",
            scrub: 2
        },
        opacity: .01
    })
})


// lenis scroll
const lenis = new Lenis()
lenis.on('scroll', (e) => {
  console.log(e)
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


//  middle texts + video code =>
const elements = Array.from({ length: 14 }, (_, i) => document.getElementById(`v_${i + 1}`));
const headers = Array.from({ length: 14 }, (_, i) => document.getElementById(`h_${i + 1}`));


headers.forEach((header, index) => {
    header.addEventListener("mouseover", () => {
        elements[index].style.display = "block";
    });
    header.addEventListener("mouseout", () => {
        elements[index].style.display = "none";
    });
});
