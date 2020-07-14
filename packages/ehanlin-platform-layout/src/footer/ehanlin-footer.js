(async () => {
    function ehNoviceBoardInitial() {
        const ehNoviceBoardToggle = document.body.querySelector('#eh-novice-board-toggle');

        ehNoviceBoardToggle.hidden = true;

        customElements.whenDefined('eh-novice-board').then(async () => {
            let ehNoviceBoardEl = document.querySelector('eh-novice-board');

            const ehNoviceBoard = customElements.get('eh-novice-board');

            const { eventNameList: ehNoviceBoardEventNameList } = ehNoviceBoard;

            if(!ehNoviceBoardEl) {
                await new Promise((resolve) => {
                    ehNoviceBoard.on(ehNoviceBoardEventNameList.onDomLoaded, () => {
                        ehNoviceBoardEl = document.querySelector('eh-novice-board');
                        resolve();
                    });
                });
            }

            const ehNoviceBoardExisted = ehNoviceBoardEl != null;

            ehNoviceBoardToggle.hidden = !ehNoviceBoardExisted;

            ehNoviceBoardToggle.querySelector('a').onclick = () => {
                EHNoviceBoard.setNoviceDisplay(true);
                ehNoviceBoardEl.dispatchEvent(new Event('open'));
            }
        });
    }

    ehNoviceBoardInitial();
}) ()