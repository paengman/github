let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;
let isTransitioning = false; // 애니메이션 중인지 확인하는 플래그

function nextSlider() {
    if (isTransitioning) return; // 애니메이션 중이면 함수 종료
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd;
    show();
}

function prevSlider() {
    if (isTransitioning) return; // 애니메이션 중이면 함수 종료
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd;
    show();
}

function show() {
    isTransitioning = true; // 애니메이션 시작
    image.style.setProperty("--rotate", rotate + 'deg');
    contents.forEach((content, key) => {
        content.classList.toggle('active', key === active);
    });
    // 1초 후 애니메이션 종료 플래그 초기화
    setTimeout(() => { isTransitioning = false; }, 1000);
}

next.onclick = nextSlider;
prev.onclick = prevSlider;

window.addEventListener('wheel', (event) => {
    if (isTransitioning) return; // 애니메이션 중이면 함수 종료
    if (event.deltaY > 0) {
        nextSlider(); // 스크롤 내리기
    } else {
        prevSlider(); // 스크롤 올리기
    }
    event.preventDefault(); // 스크롤 기본 동작 방지
}, { passive: false }); // passive 옵션을 false로 설정


document.getElementById("cactus").addEventListener("click", function() {
    const items = document.querySelectorAll(".item");
    const container6 = document.querySelector(".container6");
    const button = document.getElementById("cactus");

    // 모든 .item 요소들을 화면 밖으로 이동
    items.forEach(item => {
        item.style.transform = "translateX(-100vw)";  // 화면 왼쪽으로 이동
    });

    // 버튼과 container를 중앙으로 이동
    container6.style.transform = "translate(-50%, -250%)";
    container6.classList.add("visible");
    button.style.transform = "translate(-50%, -50%)"; // 버튼도 중앙으로 이동

});

document.getElementById("flower").addEventListener("click", function() {
    const items = document.querySelectorAll(".item");
    const container7 = document.querySelector(".container7");
    const button = document.getElementById("flower");

    // 모든 .item 요소들을 화면 밖으로 이동
    items.forEach(item => {
        item.style.transform = "translateX(-100vw)";  // 화면 왼쪽으로 이동
    });

    // 버튼과 container를 중앙으로 이동
    container7.style.transform = "translate(-50%, -250%)";
    container7.classList.add("visible");
    button.style.transform = "translate(-50%, -50%)"; // 버튼도 중앙으로 이동
});

document.getElementById("tree").addEventListener("click", function() {
    const items = document.querySelectorAll(".item");
    const container8 = document.querySelector(".container8");
    const button = document.getElementById("tree");

    // 모든 .item 요소들을 화면 밖으로 이동
    items.forEach(item => {
        item.style.transform = "translateX(-100vw)";  // 화면 왼쪽으로 이동
    });

    // 버튼과 container를 중앙으로 이동
    container8.style.transform = "translate(-50%, -250%)";
    container8.classList.add("visible");
    button.style.transform = "translate(-50%, -50%)"; // 버튼도 중앙으로 이동
});

document.getElementById("yaza").addEventListener("click", function() {
    const items = document.querySelectorAll(".item");
    const container9 = document.querySelector(".container9");
    const button = document.getElementById("yaza");

    // 모든 .item 요소들을 화면 밖으로 이동
    items.forEach(item => {
        item.style.transform = "translateX(-100vw)";  // 화면 왼쪽으로 이동
    });

    // 버튼과 container를 중앙으로 이동
    container9.style.transform = "translate(-50%, -250%)";
    container9.classList.add("visible");
    button.style.transform = "translate(-50%, -50%)"; // 버튼도 중앙으로 이동
});

document.getElementById("seed").addEventListener("click", function() {
    const items = document.querySelectorAll(".item");
    const container10 = document.querySelector(".container10");
    const button = document.getElementById("seed");

    // 모든 .item 요소들을 화면 밖으로 이동
    items.forEach(item => {
        item.style.transform = "translateX(-100vw)";  // 화면 왼쪽으로 이동
    });

    // 버튼과 container를 중앙으로 이동
    container10.style.transform = "translate(-50%, -250%)";
    container10.classList.add("visible");
    button.style.transform = "translate(-50%, -50%)"; // 버튼도 중앙으로 이동
});