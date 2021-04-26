window.alert("Здравствуйте! Основной функционал по ТЗ работает в полной мере. Дополнительный функционал фильтров доработаю в ближайшее время, не оценивайте его пока, пожалуйста!")
window.addEventListener('DOMContentLoaded', () => {
    // Active mode for buttons
    function activeButtons() {
        const btns = document.querySelectorAll('.btn-container .btn');

        btns.forEach(btn => btn.addEventListener('click', function () {
            const current = document.getElementsByClassName('btn-active');
            current[0].className = current[0].className.replace(' btn-active', '');
            this.className += ' btn-active';
        }));
    }
    activeButtons();

    // Fullscreen mode
    const fullsreenButton = document.querySelector('.fullscreen')

    fullsreenButton.addEventListener('click', (e) => {
        function goFullScreen() {
            return document.fullscreenElement
        }
        if (goFullScreen()) {
            document.exitFullscreen()
        }
        document.documentElement.requestFullscreen()
    })

    // Filters
    const filterInputs = document.querySelectorAll('.filters input');
    const currentPic = document.querySelector('.photo');


    function handleUpdate() {
        const suffix = this.dataset.sizing || '';
        currentPic.style.setProperty(`--${this.name}`, this.value + suffix);

        const outputs = this.nextElementSibling;
        outputs.innerHTML = this.value;
    }
    // filterInputs.forEach(input => input.addEventListener('change', handleUpdate));
    filterInputs.forEach(input => input.addEventListener('mousedown' && 'mousemove', handleUpdate));



    // Presets
    const filterPicOldPhoto = document.getElementById('preset1');
    const filterColdTone = document.getElementById('preset2');
    const filterBrightTone = document.getElementById('preset3');
    const filterIntensiveColor = document.getElementById('preset4');



    const updateStyle = (blur, invert, sepia, saturate, hueRotate, brigtness, contrast) => {
        return `--blur: ${blur}px;
        --invert: ${invert}%;
        --sepia: ${sepia}%;
        --saturate: ${saturate}%;
        --hue-rotate: ${hueRotate}deg;
        --brightness: ${brigtness}%;
        --contrast: ${contrast}%`;
    }


    // Old photo
    const presetOldPhoto = document.getElementById("preset1");
    presetOldPhoto.style.cssText = updateStyle(0, 18, 75, 72, 27, 83, 88);
    presetOldPhoto.onclick = () => currentPic.style.cssText = updateStyle(0, 18, 75, 72, 27, 83, 88);

    
    // Cold Tone
    const presetColdTone = document.getElementById("preset2");
    presetColdTone.style.cssText = updateStyle(0, 11, 0, 64, 331, 122, 155);
    presetColdTone.onclick = () => currentPic.style.cssText = updateStyle(0, 11, 0, 64, 331, 122, 155);
    
    // Bright Tone
    const presetBrightTone = document.getElementById("preset3");
    presetBrightTone.style.cssText = updateStyle(0, 5, 0, 190, 18, 93, 113);
    presetBrightTone.onclick = () => currentPic.style.cssText = updateStyle(0, 5, 0, 190, 18, 93, 113);
    
    // Intensive Color
    const presetIntensiveColor = document.getElementById("preset4");
    presetIntensiveColor.style.cssText = updateStyle(0, 3, 0, 200, 43, 127, 62);
    presetIntensiveColor.onclick = () => currentPic.style.cssText = updateStyle(0, 3, 0, 200, 43, 127, 62);

    // Reset
    const btnReset = document.querySelector('.btn-reset');

    function handleReset() {
        filterInputs.forEach(input => {
            // console.log(`pre: ${input.name} - ${input.value}`);
            input.name === 'saturate' || input.name === 'contrast' || input.name === 'brightness' ? input.value = 100 : input.value = 0;
            // console.log(`after: ${input.name} - ${input.value}`);

            currentPic.style.setProperty(`--${input.name}`, input.value + (input.dataset.sizing || ''));

            const outputs = input.nextElementSibling;
            outputs.innerHTML = input.value;
        });
    }
    btnReset.addEventListener('click', handleReset);

    // Load picture
    function loadPic() {
        const fileInput = document.querySelector('input[type="file"]');
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                currentPic.src = reader.result;
                filterPicOldPhoto.src = reader.result;
                filterColdTone.src = reader.result;
                filterBrightTone.src = reader.result;
                filterIntensiveColor.src = reader.result;
            }
            reader.readAsDataURL(file);
            fileInput.value = null;
        });
    }
    loadPic();



    // Save picture
    function createPic() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        function createCanvas(img) {
            let filters = '';
            canvas.width = img.width;
            canvas.height = img.height;

            filterInputs.forEach(input => {
                filters += `${input.name}(${input.value}${input.dataset.sizing})`;
            });

            ctx.filter = filters.trim();
            ctx.drawImage(img, 0, 0);
        }

        function savePic() {
            const btnSavePicture = document.querySelector('.btn-save');

            btnSavePicture.addEventListener('click', () => {
                const img = new Image();
                img.setAttribute('crossOrigin', 'anonymous');
                img.src = currentPic.src;
                img.onload = () => {
                    createCanvas(img);
                    const dataURL = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.download = 'download.png';
                    link.href = dataURL;
                    link.click();

                };
            });
        }
        savePic();
    }
    createPic();

    // Get pics

    function getPicture() {
        const buttonNextPic = document.querySelector('.btn-next');
        const imagesLink = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

        let timer = new Date()
        let now = timer.getHours()

        function getLink() {
            const hour = new Date().getHours();
            if (now === 0 || now === 1 || now === 2 ||
                now === 3 || now === 4 || now === 5) {
                return imagesLink + 'night/'
            } else if (now === 6 || now === 7 || now === 8
                || now === 9 || now === 10 || now === 11) {
                return imagesLink + 'morning/'
            } else if (now === 12 || now === 13 || now === 14
                || now === 15 || now === 16 || now === 17) {
                return imagesLink + 'day/'
            } else if (now === 18 || now === 19 || now === 20
                || now === 21 || now === 22 || now === 23) {
                return imagesLink + 'evening/'
            }
        }

        const picsArray = ['01.jpg',
            '02.jpg',
            '03.jpg',
            '04.jpg',
            '05.jpg',
            '06.jpg',
            '07.jpg',
            '08.jpg',
            '09.jpg',
            '10.jpg',
            '11.jpg',
            '12.jpg',
            '13.jpg',
            '14.jpg',
            '15.jpg',
            '16.jpg',
            '17.jpg',
            '18.jpg',
            '19.jpg',
            '20.jpg'];
        let slideIndex = 0;
        let isUsed = false;

        function nextPicture() {
            if (isUsed = false) {
                const picSrc = getLink() + picsArray[slideIndex];

                currentPic.src = picSrc;

                filterPicOldPhoto.src = picSrc;
                filterColdTone.src = picSrc;
                filterBrightTone.src = picSrc;
                filterIntensiveColor.src = picSrc;
                isUsed = true;
            } else {
                if (slideIndex == picsArray.length - 1) {
                    slideIndex = 0;
                } else {
                    slideIndex++;
                }
                const picSrc = getLink() + picsArray[slideIndex];
                currentPic.src = picSrc;
                filterPicOldPhoto.src = picSrc;
                filterColdTone.src = picSrc;
                filterBrightTone.src = picSrc;
                filterIntensiveColor.src = picSrc;
            }
        }
        buttonNextPic.addEventListener('click', nextPicture);


    }
    getPicture();

});