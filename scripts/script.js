const file_field = document.querySelector("#file_field");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const filter_inputs = document.querySelectorAll("[type='range']");

const image = new Image();
const filter_settings = new Map();

file_field.addEventListener("input", (e) => {
    const image_file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image_file);
    reader.addEventListener("load", (e) => {
        runner(e);
    });
});

function runner(e) {
    image.src = e.target.result;
    image.onload = () => {
        update_canvas();
        update_canvas_image();
        reset_filters();
    };
}

filter_inputs.forEach((e) => {
    e.addEventListener("input", manage_slider_change);
});

function manage_slider_change(e) {
    const filter_name = e.target.name;
    const filter_value = e.target.value;
    const filter_unit = e.target.dataset.unit;

    change_filter_settings(filter_name, filter_value, filter_unit);
    update_canvas_image();
}

function change_filter_settings(filter_name, filter_value, filter_unit) {
    filter_settings.set(
        filter_name,
        `${filter_name}(${filter_value}${filter_unit})`
    );
}

function update_canvas() {
    canvas.width = image.width;
    canvas.height = image.height;
}

function update_canvas_image() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let filter_string = "";

    filter_settings.forEach((e) => {
        filter_string += e + " ";
    });
    console.log(filter_string)

    ctx.filter = filter_string || "none";
    ctx.drawImage(image, 0, 0);
}

function reset_filters() {
    filter_inputs.forEach((e) => {
        e.value = e.dataset.default;
    });
    filter_settings.clear();
}

document.querySelector(".download").onclick = () => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "opensociety_image_editor" + new Date().toLocaleTimeString();
    a.click();
    a.remove();
};

document.querySelector("#reset_filters").onclick = () => {
    reset_filters();
    update_canvas_image();
};
