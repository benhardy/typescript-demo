function actualSize(elementId:string, styleProperty:string):number {
    let el = document.getElementById(elementId);
    let prop = window.getComputedStyle(el).getPropertyValue(styleProperty);
    return Number(prop.replace(/[^0-9.]+/, ''));
}

window.onload = () => {
    let body = document.getElementById("body");
    let heading = document.getElementById("big_heading");
    let header = document.getElementById("headerbar");

    let initFontHeight = actualSize("big_heading", "font-size");
    let initHeadHeight = actualSize("headerbar", "height");
    let ratio = initFontHeight / initHeadHeight;
    let minHeaderHeight = 32;

    body.onscroll = () => {
        let top = body.scrollTop;
        let newHeadHeight = initHeadHeight - top;
        if (newHeadHeight < minHeaderHeight) { newHeadHeight = minHeaderHeight; }

        header.style.height = newHeadHeight + 'px';
        header.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)"
        heading.style.fontSize = (newHeadHeight * ratio) + 'px';
    };
};
