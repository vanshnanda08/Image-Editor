let filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },

    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    HueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    GrayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
};
const filtersContainer = document.querySelector(".filters");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");

const presetIcons = {
    Vintage: "📸",
    BnW: "⚫",
    Vivid: "🎨",
    Cool: "❄️",
};
const presets = {
    Vintage: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 80,
        Sepia: 40,
    },
    BnW: {
        GrayScale: 100,
    },
    Vivid: {
        Brightness: 105,
        Contrast: 120,
        Saturation: 180,
    },
    Cool: {
        HueRotation: 180,
        Saturation: 120,
    },
};
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const canvas = document.querySelector("canvas");
let image = null;

function createFilters(name, unit = "%", value, min, max) {
    const filter = document.createElement("div");
    filter.classList.add("filter");

    filter.innerHTML = `
        <p>${name}</p>
        <input
            type="range"
            name="${name}"
            value="${value}"
            min="${min}"
            max="${max}" 
            id="${name}"
        >
    `;

    const input = filter.querySelector("input");

    input.addEventListener("input", (event) => {
        filters[name].value = event.target.value;
        applyFilter();
    });
    filtersContainer.appendChild(filter);
}
function createFilterSlider() {
    filtersContainer.innerHTML = "";
    Object.entries(filters).forEach(([name, filter]) => {
        createFilters(name, filter.unit, filter.value, filter.min, filter.max);
    });
}
createFilterSlider();

function createPresetButtons() {
    let presetsContainer = document.querySelector(".presets");

    presetsContainer.innerHTML = "";

    Object.entries(presets).forEach(([presetName, values]) => {
        const button = document.createElement("button");
        button.classList.add("preset-btn");
        button.innerHTML = `
            <span class="preset-icon">${presetIcons[presetName] || "✨"}</span>
            <span class="preset-name">${presetName}</span>
        `;

        button.addEventListener("click", () => {
            Object.entries(values).forEach(([filterName, value]) => {
                filters[filterName].value = value;
            });

            createFilterSlider();
            applyFilter();
        });
        presetsContainer.appendChild(button);
    });
}

createPresetButtons();

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    const placeHolder = document.querySelector(".placeholder");
    canvas.style.display = "block";
    placeHolder.style.display = "none";
    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        applyFilter();
    };
});

function applyFilter() {
    if (!image) return;
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
`;
    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
    filters = {
        Brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        Contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },

        Saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        HueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg",
        },
        Blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px",
        },
        GrayScale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        Sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        Opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%",
        },
        Invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
    };

    createFilterSlider();
    applyFilter();
});

downloadBtn.addEventListener("click", () => {
    if (!image) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL("image/png");
    link.click();
});
