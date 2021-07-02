
// observe changes made to the DOM tree
let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {

        // checks if nodes are added to the list based on changes to DOM
        if (!mutation.addedNodes) {
            // add pop up
            return;
        }

        // iterating through the nodes
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            let currentNode = mutation.addedNodes[i];

            try {
                // checks the control-bar element as a part of the DOM mutation
                if (currentNode.classList.contains("control-bar")) {

                    for (let x = 0; x < currentNode.childNodes.length; x++) {

                        // checks the playback-controls element as a part of the DOM mutation
                        if (currentNode.childNodes[x].classList.contains("playback-controls")) {

                            function updateSpeedLabel(video) {

                                let speedLength = video.playbackRate.toString().length;
                                let speedString = video.playbackRate.toString();
                                document.getElementsByClassName("playback-speed-control")[0].innerText = speedLength === 4 ? speedString + "x" : speedLength === 3 ? speedString + "0x" : speedString + ".00x";
                            }

                            // creating an element to decrease the speed
                            let decrease = document.createElement("button");
                            decrease.innerText = "<<";
                            decrease.style.color = "#fff"
                            decrease.style.backgroundColor = "#000"
                            decrease.style.gridColumnStart = "1";
                            decrease.style.gridColumnEnd = "2";

                            decrease.onclick = function () {

                                // retrieve the video element
                                let video = document.getElementsByTagName("video")[0];
                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate === 0.25) {
                                    return;
                                }
                                video.playbackRate -= .25;
                                updateSpeedLabel(video);
                            }
                            decrease.title = "Reduce Speed by 0.25x";

                            // creating an element to reset the speed
                            let reset = document.createElement("button");
                            reset.innerText = "1.00x"
                            reset.style.color = "#fff"
                            reset.style.backgroundColor = "#000"
                            reset.style.gridColumnStart = "2";
                            reset.style.gridColumnEnd = "3";

                            // ensuring the updateSpeedLabel method uses this class
                            reset.className = "playback-speed-control"

                            reset.onclick = function () {

                                // retrieve the video element
                                let video = document.getElementsByTagName("video")[0];

                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate === 1) {
                                    return;
                                }
                                video.playbackRate = 1;
                                updateSpeedLabel(video);
                            }
                            reset.title = "Reset Speed to 1.00x"

                            // creating an element to increase the speed
                            let increase = document.createElement("button");
                            increase.innerText = ">>"
                            increase.style.color = "#fff"
                            increase.style.backgroundColor = "#000"
                            increase.style.gridColumnStart = "3";
                            increase.style.gridColumnEnd = "4";

                            increase.onclick = function () {

                                // retrieve the video element
                                let video = document.getElementsByTagName("video")[0];
                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate === 2) {
                                    return;
                                }
                                video.playbackRate += .25;
                                updateSpeedLabel(video);
                            }
                            increase.title = "Increase Speed by 0.25x"

                            // creating a div to append to the control-bar
                            let div = document.createElement("div");
                            div.style.display = "grid";
                            div.style.gridGap = "10px";
                            div.style.gridTemplateColumns = "1 1 1";

                            // adding the appropriate child elements to the div
                            div.appendChild(decrease);
                            div.appendChild(reset);
                            div.appendChild(increase);

                            document.getElementsByClassName("playback-controls")[0].appendChild(div);
                        }
                    }
                }
            } catch {
                console.log("Unable to add speed controls to the \"*://*.bbcollab.com/collab/ui/session/playback*\" site. Please create an issue at https://github.com/davidk101/playback-speed-control.")
            }

        }
    });
});

// listen for mutations to a node
observer.observe(document.body, {
    childList: true,
    subtree: true
});
