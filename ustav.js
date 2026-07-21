uploadSelectedImageButton.addEventListener(
    'click',
    async function(){

        if(!selectedImageFile){
            return;
        }

        const originalButtonHTML =
            uploadSelectedImageButton.innerHTML;

        uploadSelectedImageButton.disabled = true;

        /* Spinner only inside upload button */
        uploadSelectedImageButton.innerHTML = `
            <span
                class="uploadButtonSpinner"
                aria-hidden="true"
            ></span>
        `;

        /* Do not show the large status panel */
        uploadStatus.classList.remove('show');
        uploadLoader.classList.remove('show');
        uploadSuccess.classList.remove('show');
        uploadStatusText.textContent = '';

        try{

            const fileExtension =
                selectedImageFile.name
                    .split('.')
                    .pop()
                    .toLowerCase();

            const safeExtension =
                fileExtension || 'jpg';

            const storagePath =
                'event-images/' +
                Date.now() +
                '-' +
                Math.random()
                    .toString(36)
                    .slice(2, 10) +
                '.' +
                safeExtension;

            /*
              Upload image to:
              Storage bucket: ustavphotos
            */
            const {
                data:uploadData,
                error:uploadError
            } = await window.supabaseClient
                .storage
                .from('ustavphotos')
                .upload(
                    storagePath,
                    selectedImageFile,
                    {
                        cacheControl:'3600',
                        upsert:false,
                        contentType:
                            selectedImageFile.type ||
                            'image/jpeg'
                    }
                );

            if(uploadError){
                throw uploadError;
            }

            /*
              Get public image URL
            */
            const {
                data:publicUrlData
            } = window.supabaseClient
                .storage
                .from('ustavphotos')
                .getPublicUrl(uploadData.path);

            const imagePublicUrl =
                publicUrlData?.publicUrl || '';

            if(!imagePublicUrl){
                throw new Error(
                    'Unable to generate image URL.'
                );
            }

            /*
              Save image information into:
              Table: ustavpics
            */
            const {
                error:tableError
            } = await window.supabaseClient
                .from('ustavpics')
                .insert([
                    {
                        image_url:imagePublicUrl,
                        image_path:uploadData.path
                    }
                ]);

            if(tableError){

                /*
                  Remove uploaded storage file when
                  table insert fails.
                */
                await window.supabaseClient
                    .storage
                    .from('ustavphotos')
                    .remove([
                        uploadData.path
                    ]);

                throw tableError;
            }

            /* Tick only inside upload button */
            uploadSelectedImageButton.innerHTML = `
                <span
                    class="uploadButtonTick"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M5 12.5L9.5 17L19 7"></path>
                    </svg>
                </span>
            `;

            /*
              Wait briefly so user sees tick.
              Popup remains open.
            */
            window.setTimeout(function(){

                /*
                  Clear selected image only.
                  Do not close popup.
                  Do not open menu.
                */
                imageUploadInput.value = '';

                selectedImageData = '';
                selectedImageName = '';
                selectedImageFile = null;

                uploadPreview.classList.remove('show');
                uploadPreview.style.display = '';

                uploadPreviewImage.removeAttribute('src');
                uploadFileName.textContent = '';

                chooseImageLabel.style.display = '';
                cancelSelectedImageButton.style.display = '';

                uploadSelectedImageButton.innerHTML =
                    originalButtonHTML;

                uploadSelectedImageButton.disabled = true;

            }, 1000);

        }catch(error){

            console.error(
                'Ustav image upload error:',
                error
            );

            uploadSelectedImageButton.innerHTML =
                originalButtonHTML;

            uploadSelectedImageButton.disabled = false;

            /* Small button shake for error */
            uploadSelectedImageButton.style.animation =
                'none';

            void uploadSelectedImageButton.offsetWidth;

            uploadSelectedImageButton.style.animation =
                'oldDonationShake .38s ease';

            setTimeout(function(){
                uploadSelectedImageButton.style.animation = '';
            }, 500);
        }
    }
);