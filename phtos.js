/* =========================================================
   PHOTO ALBUM FROM EXISTING USTAVPICS TABLE
========================================================= */

const photoAlbumContainer =
    document.getElementById('photoAlbumContainer');

const photoViewer =
    document.getElementById('photoViewer');

const photoViewerImage =
    document.getElementById('photoViewerImage');

const photoViewerClose =
    document.getElementById('photoViewerClose');


let photoAlbumAutoScrollTimers = [];


/* =========================================================
   LOAD PHOTOS
========================================================= */

async function loadPhotoAlbum(){

    if(!photoAlbumContainer){
        return;
    }

    photoAlbumContainer.innerHTML = `
    <div class="photo-album-loading">
        <div class="iphone-spinner" aria-label="Loading photos">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
`;

    try{

        if(!window.supabaseClient){

            throw new Error(
                'Supabase client is not available'
            );
        }

        const { data, error } =
            await window.supabaseClient
                .from('ustavpics')
                .select(
                    'id, image_url, image_path, created_at'
                )
                .order('created_at',{
                    ascending:false
                });

        if(error){
            throw error;
        }

        renderPhotoAlbum(data || []);

    }
    catch(error){

        console.error(
            'Photo album loading failed:',
            error
        );

        photoAlbumContainer.innerHTML = `
            <div class="photo-album-empty">
                Unable to load photos
            </div>
        `;
    }
}


/* =========================================================
   PREPARE ROW GROUPS
========================================================= */

function createBalancedPhotoRows(images){

    const rows = [];

    /*
       First create normal groups containing
       a maximum of three images.
    */

    for(
        let index = 0;
        index < images.length;
        index += 3
    ){
        rows.push(
            images.slice(index,index + 3)
        );
    }

    /*
       If the final row contains only one image,
       move the final image from the previous row.

       Examples:

       4 images:
       3 + 1 becomes 2 + 2

       7 images:
       3 + 3 + 1 becomes 3 + 2 + 2

       10 images:
       3 + 3 + 3 + 1 becomes 3 + 3 + 2 + 2
    */

    if(
        rows.length > 1 &&
        rows[rows.length - 1].length === 1
    ){

        const previousRow =
            rows[rows.length - 2];

        const lastRow =
            rows[rows.length - 1];

        const movedImage =
            previousRow.pop();

        if(movedImage){
            lastRow.unshift(movedImage);
        }
    }

    return rows;
}


/* =========================================================
   RENDER COMPLETE ALBUM
========================================================= */

function renderPhotoAlbum(records){

    clearPhotoAlbumTimers();

    photoAlbumContainer.innerHTML = '';

    const validImages =
        records.filter(function(record){

            return Boolean(
                record &&
                record.image_url
            );
        });

    if(validImages.length === 0){

        photoAlbumContainer.innerHTML = `
            <div class="photo-album-empty">
                No photos available
            </div>
        `;

        return;
    }

    const imageRows =
        createBalancedPhotoRows(validImages);

    imageRows.forEach(function(rowImages){

        createPhotoAlbumRow(rowImages);
    });
}


/* =========================================================
   CREATE EACH ROW
========================================================= */

function createPhotoAlbumRow(rowImages){

    const row =
        document.createElement('div');

    row.className = 'photo-album-row';


    const track =
        document.createElement('div');

    track.className = 'photo-album-track';

    track.classList.add(
        `photo-count-${rowImages.length}`
    );


    rowImages.forEach(function(record){

        const card =
            document.createElement('button');

        card.type = 'button';
        card.className = 'photo-album-card';

        card.setAttribute(
            'aria-label',
            'Open album photo'
        );


        const image =
            document.createElement('img');

        image.src = record.image_url;
        image.alt = 'Committee photo';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.draggable = false;


        image.addEventListener(
            'error',
            function(){

                card.remove();

                updatePhotoRowAfterError(
                    row,
                    track
                );
            }
        );


        card.addEventListener(
            'click',
            function(){

                openPhotoViewer(
                    record.image_url
                );
            }
        );


        card.appendChild(image);
        track.appendChild(card);
    });


    row.appendChild(track);

    photoAlbumContainer.appendChild(row);


    /*
       Enable auto-scroll when the row is wider
       than its visible container.
    */

    requestAnimationFrame(function(){

        if(
            row.scrollWidth >
            row.clientWidth + 2
        ){
            startPhotoAlbumAutoScroll(
                row,
                track
            );
        }
    });
}


/* =========================================================
   UPDATE ROW IF AN IMAGE FAILS
========================================================= */

function updatePhotoRowAfterError(
    row,
    track
){

    const remainingCards =
        track.querySelectorAll(
            '.photo-album-card'
        );

    track.classList.remove(
        'photo-count-1',
        'photo-count-2',
        'photo-count-3'
    );

    if(remainingCards.length === 0){

        row.remove();
        return;
    }

    track.classList.add(
        `photo-count-${remainingCards.length}`
    );
}


/* =========================================================
   AUTO-SCROLL
========================================================= */

function startPhotoAlbumAutoScroll(
    row,
    track
){

    let direction = 1;
    let userIsInteracting = false;
    let interactionTimer = null;


    const timer =
        setInterval(function(){

            if(userIsInteracting){
                return;
            }

            const maximumScroll =
                row.scrollWidth -
                row.clientWidth;

            if(maximumScroll <= 0){
                return;
            }


            if(
                direction === 1 &&
                row.scrollLeft >=
                maximumScroll - 2
            ){
                direction = -1;
            }
            else if(
                direction === -1 &&
                row.scrollLeft <= 2
            ){
                direction = 1;
            }


            const firstCard =
                track.querySelector(
                    '.photo-album-card'
                );

            const scrollAmount =
                firstCard
                    ? firstCard.offsetWidth + 8
                    : row.clientWidth * .7;


            row.scrollBy({
                left:
                    direction *
                    scrollAmount,

                behavior:'smooth'
            });

        },3500);


    photoAlbumAutoScrollTimers.push(timer);


    function pauseAutoScroll(){

        userIsInteracting = true;

        clearTimeout(interactionTimer);
    }


    function resumeAutoScroll(){

        clearTimeout(interactionTimer);

        interactionTimer =
            setTimeout(function(){

                userIsInteracting = false;

            },1800);
    }


    row.addEventListener(
        'touchstart',
        pauseAutoScroll,
        {
            passive:true
        }
    );


    row.addEventListener(
        'touchend',
        resumeAutoScroll,
        {
            passive:true
        }
    );


    row.addEventListener(
        'pointerdown',
        pauseAutoScroll
    );


    row.addEventListener(
        'pointerup',
        resumeAutoScroll
    );


    row.addEventListener(
        'pointercancel',
        resumeAutoScroll
    );


    row.addEventListener(
        'mouseenter',
        pauseAutoScroll
    );


    row.addEventListener(
        'mouseleave',
        resumeAutoScroll
    );
}


/* =========================================================
   CLEAR OLD AUTO-SCROLL TIMERS
========================================================= */

function clearPhotoAlbumTimers(){

    photoAlbumAutoScrollTimers.forEach(
        function(timer){

            clearInterval(timer);
        }
    );

    photoAlbumAutoScrollTimers = [];
}


/* =========================================================
   SEPARATE PHOTO VIEWER
========================================================= */

function openPhotoViewer(imageUrl){

    if(
        !photoViewer ||
        !photoViewerImage
    ){
        return;
    }

    photoViewerImage.src = imageUrl;

    photoViewer.classList.add('show');

    photoViewer.setAttribute(
        'aria-hidden',
        'false'
    );

    document.body.style.overflow = 'hidden';
}


function closePhotoViewer(){

    if(
        !photoViewer ||
        !photoViewerImage
    ){
        return;
    }

    photoViewer.classList.remove('show');

    photoViewer.setAttribute(
        'aria-hidden',
        'true'
    );

    photoViewerImage.removeAttribute('src');

    document.body.style.overflow = '';
}


if(photoViewerClose){

    photoViewerClose.addEventListener(
        'click',
        closePhotoViewer
    );
}


if(photoViewer){

    photoViewer.addEventListener(
        'click',
        function(event){

            if(event.target === photoViewer){
                closePhotoViewer();
            }
        }
    );
}


document.addEventListener(
    'keydown',
    function(event){

        if(event.key === 'Escape'){
            closePhotoViewer();
        }
    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

if(document.readyState === 'loading'){

    document.addEventListener(
        'DOMContentLoaded',
        loadPhotoAlbum
    );

}
else{

    loadPhotoAlbum();
}