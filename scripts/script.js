// needs refactoring

const file_field = document.querySelector("#file_field");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const blur = document.querySelector("#blur");
const brightness = document.querySelector("#brightness");
const sepia = document.querySelector("#sepia");
const saturate = document.querySelector("#saturate");

const img = new Image();
let filter = new Map();

file_field.addEventListener("input", (e) => {
    const image_file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image_file);
    reader.addEventListener("load", (e) => {
        runner(e);
    });
});

function runner(e) {
    img.src = e.target.result;
    img.onload = () => {
        update_canvas();
        update_canvas_image();

        blur.addEventListener("input", (e) => {
            manage_blur(e);
        });
        brightness.addEventListener("input", (e) => {
            manage_brightness(e);
        });
        sepia.addEventListener("input", (e) => {
            manage_sepia(e);
        });
        saturate.addEventListener("input", (e) => {
            manage_saturate(e);
        });
    };
}

function manage_blur(e) {
    const blur_amount = e.target.value;
    filter.set("blur", `blur(${blur_amount}px)`);
    update_canvas_image();
}

function manage_brightness(e) {
    const blur_amount = e.target.value;
    filter.set("brightness", `brightness(${blur_amount}%)`);
    update_canvas_image();
}

function manage_sepia(e) {
    const blur_amount = e.target.value;
    filter.set("sepia", `sepia(${blur_amount}%)`);
    update_canvas_image();
}
function manage_saturate(e) {
    const blur_amount = e.target.value;
    filter.set("saturate", `saturate(${blur_amount}%)`);
    update_canvas_image();
}

function update_canvas() {
    canvas.width = img.width;
    canvas.height = img.height;
    filter.clear();
}

function update_canvas_image() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let filter_string = "";

    filter.forEach((e) => {
        filter_string += e + " ";
    });

    ctx.filter = filter_string;
    ctx.drawImage(img, 0, 0);
}

document.querySelector(".download").onclick = () => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = "opensociety_image_editor" + new Date().toLocaleTimeString();
    a.click();
    a.remove();
};
