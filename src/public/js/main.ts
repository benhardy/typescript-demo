function elementDimensionById(elementId:string, styleProperty:string):number {
    let el = document.getElementById(elementId);
    return elementDimension(el, styleProperty);
}

function elementDimension(element:HTMLElement, styleProperty:string):number {
    let prop = window.getComputedStyle(element).getPropertyValue(styleProperty);
    return Number(prop.replace(/[^0-9.]+/, ''));
}

window.onload = () => {
    let body = document.getElementById("body");
    let headerHeading = document.getElementById("big_heading");
    let headerBox = document.getElementById("headerbar");

    let initHeadingFontSize = elementDimension(headerHeading, "font-size");
    let initHeaderBoxHeight = elementDimension(headerBox, "height");
    let headingToHeaderRatio = initHeadingFontSize / initHeaderBoxHeight;
    let minHeaderHeight = initHeaderBoxHeight / 5;

    body.onscroll = () => {
        let top = body.scrollTop;
        let newHeadHeight = Math.max(initHeaderBoxHeight - top, minHeaderHeight);
        headerBox.style.height = newHeadHeight + 'px';
        headerBox.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)"
        headerHeading.style.fontSize = (newHeadHeight * headingToHeaderRatio) + 'px';
    };
};
