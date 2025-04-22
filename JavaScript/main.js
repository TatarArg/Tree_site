document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height)
    

})

document.addEventListener("DOMContentLoaded", function() {
    const animateCheckbox = document.getElementById("animateCheckbox")
    const animationControls = document.getElementById("animationControls")
    const animateButton = document.querySelector("input[value='Анимировать']")

    const rangeFields = [
        document.getElementById("cx_1"),
        document.getElementById("cy_1"),
        document.getElementById("scaleX_1"),
        document.getElementById("scaleY_1"),
        document.getElementById("rotate_1")
    ];

    const rangeLabels = [
        document.querySelector("label[for='cx_1']"),
        document.querySelector("label[for='cy_1']"),
        document.querySelector("label[for='scaleX_1']"),
        document.querySelector("label[for='scaleY_1']"),
        document.querySelector("label[for='rotate_1']")
    ]
    
    function toggleAnimationControls() {
        const isChecked = animateCheckbox.checked;
        
        if (isChecked) {
            animateButton.style.display = "inline"; 
            animationControls.style.display = "block" 

            rangeFields.forEach((field, index) => {
                field.style.display = "inline"; 
                rangeLabels[index].style.display = "inline"
            });
        } else {
            animateButton.style.display = "none";
            animationControls.style.display = "none"

            rangeFields.forEach((field, index) => {
                field.style.display = "none"
                rangeLabels[index].style.display = "none"
            });
        }
    }

    animateCheckbox.addEventListener("change", toggleAnimationControls)

    toggleAnimationControls()
})

document.addEventListener("DOMContentLoaded", function() {
    const pathMovementCheckbox = document.getElementById("pathMovement"); 
    const coordinatesBlock = document.getElementById("coordinatesBlock"); 
    const pathOptions = document.getElementById("pathOptions"); 
    const rotateBlock = document.getElementById("rotateBlock");
    const scaleBlock = document.getElementById("scaleBlock");
    const buttonDraw = document.getElementById("drawB");
    const animationControls = document.getElementById("animationControls") 

    function togglePathMovement() {
        if (pathMovementCheckbox.checked) {
            coordinatesBlock.style.display = "none";
            rotateBlock.style.display = "none";
            scaleBlock.style.display = "none";
            animationControls.style.display = "none";
            buttonDraw.style.display = "none";
            pathOptions.style.display = "block";
        } else {
            coordinatesBlock.style.display = "block";
            rotateBlock.style.display = "block";
            scaleBlock.style.display = "block";
            animationControls.style.display = "block";
            buttonDraw.style.display = "inline";
            pathOptions.style.display = "none";
        }
    }

    pathMovementCheckbox.addEventListener("change", togglePathMovement);

    togglePathMovement();
});

let draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg)

    const cx = dataForm.cx.value
    const cy = dataForm.cy.value
    const scaleX = dataForm.scaleX.value
    const scaleY = dataForm.scaleY.value
    const rotate = dataForm.rotate.value

    const transform = `translate(${cx}, ${cy}) 
                       rotate(${rotate}) 
                       scale(${scaleX}, ${scaleY})`

    pict.attr("transform", transform);
}

function clearDraw() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();
}

let runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg);
    
    const animateType = dataForm.animationType.value;
    
    const pathMovementCheckbox = dataForm.pathMovement.checked;

    let animation;
    
    if (!pathMovementCheckbox){
        if (animateType === "linear") {
            animation = d3.easeLinear;
        } else if (animateType === "elastic") {
            animation = d3.easeElastic;
        } else if (animateType === "bounce") {
            animation = d3.easeBounce;
        }
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) rotate(${dataForm.rotate.value}) scale(${dataForm.scaleX.value}, ${dataForm.scaleY.value})`)
        .transition()
        .duration(6000)
        .ease(animation)
        .attr("transform", `translate(${dataForm.cx_1.value}, ${dataForm.cy_1.value}) rotate(${dataForm.rotate_1.value}) scale(${dataForm.scaleX_1.value}, ${dataForm.scaleY_1.value})`);
    } else{
        let path = drawPath(dataForm.pathType.value);	
		pict.transition()
        .ease(d3.easeLinear) // установить в зависимости от настроек формы
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
    }

}

