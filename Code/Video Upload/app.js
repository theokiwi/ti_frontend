const input = document.querySelector("#input-file");
input.addEventListener("change", (event) => {
    const input_target = event.target;
    const video = input_target.files[0];
    if(video){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            let div = document.createElement("div");
            div.innerHTML = `
                <video
                    autoplay
                    controls 
                    width="640" 
                    height="480" 
                    src="${reader.result}"
                >
            `;
            document.body.append(div);
        })
        reader.readAsDataURL(video);
    }
});