(function () {
    function ehNoviceBoardInitial() {
        const ehNoviceBoardToggle = document.body.querySelector('#eh-novice-board-toggle');

        ehNoviceBoardToggle.hidden = true;

        customElements.whenDefined('eh-novice-board').then(async () => {
            let ehNoviceBoardEl = document.querySelector('eh-novice-board');

            const ehNoviceBoard = customElements.get('eh-novice-board');

            const { eventNameList: ehNoviceBoardEventNameList } = ehNoviceBoard;

            if (!ehNoviceBoardEl) {
                new Promise(function (resolve) {
                    ehNoviceBoard.on(ehNoviceBoardEventNameList.onDomLoaded, () => {
                        ehNoviceBoardEl = document.querySelector('eh-novice-board');
                        resolve();
                    });
                }).then(function () {
                    const ehNoviceBoardExisted = ehNoviceBoardEl != null;
                    
                    toggleHidden(!ehNoviceBoardExisted);
                    
                    bindToggleEvent();
                });
            } else {
                const ehNoviceBoardExisted = ehNoviceBoardEl != null;

                toggleHidden(!ehNoviceBoardExisted);

                bindToggleEvent();
            }     
        });

        function toggleHidden(hidden) {
            ehNoviceBoardToggle.hidden = hidden;
        }

        function bindToggleEvent () {
            ehNoviceBoardToggle.querySelector('a').onclick = () => {
                EHNoviceBoard.setNoviceDisplay(true);
                ehNoviceBoardEl.dispatchEvent(new Event('open'));
            }
        }
    }

    ehNoviceBoardInitial();
})()