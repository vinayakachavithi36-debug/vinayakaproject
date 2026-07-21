/* UPLOAD PDF TO SUPABASE */
uploadSelectedPdfButton.addEventListener(
    'click',
    async function(){

        if(!selectedPdfFile){
            return;
        }

        const originalButtonHTML =
            uploadSelectedPdfButton.innerHTML;

        uploadSelectedPdfButton.disabled = true;

        /* Spinner only inside Upload PDF button */
        uploadSelectedPdfButton.innerHTML = `
            <span
                class="uploadButtonSpinner"
                aria-hidden="true"
            ></span>
        `;

        /* Hide old large status panel */
        pdfUploadStatus.classList.remove('show');
        pdfUploadLoader.classList.remove('show');
        pdfUploadSuccess.classList.remove('show');
        pdfUploadStatusText.textContent = '';

        try{

            const randomName =
                Date.now() +
                '-' +
                Math.random()
                    .toString(36)
                    .slice(2, 10) +
                '.pdf';

            const storagePath =
                'event-pdfs/' + randomName;

            /*
             Upload PDF to Supabase Storage
             Bucket: ustavpdfs
            */
            const {
                data:uploadData,
                error:uploadError
            } = await window.supabaseClient
                .storage
                .from('ustavpdfs')
                .upload(
                    storagePath,
                    selectedPdfFile,
                    {
                        cacheControl:'3600',
                        upsert:false,
                        contentType:'application/pdf'
                    }
                );

            if(uploadError){
                throw uploadError;
            }

            /*
             Get public PDF URL
            */
            const {
                data:publicUrlData
            } = window.supabaseClient
                .storage
                .from('ustavpdfs')
                .getPublicUrl(uploadData.path);

            const pdfPublicUrl =
                publicUrlData?.publicUrl || '';

            if(!pdfPublicUrl){
                throw new Error(
                    'Unable to generate PDF URL.'
                );
            }

            /*
             Save URL and path to table
             Table: ustavpdfs
            */
            const {
                error:tableError
            } = await window.supabaseClient
                .from('ustavpdfs')
                .insert([
                    {
                        pdf_url:pdfPublicUrl,
                        pdf_path:uploadData.path
                    }
                ]);

            if(tableError){

                /*
                 Remove file if table insert fails
                */
                await window.supabaseClient
                    .storage
                    .from('ustavpdfs')
                    .remove([
                        uploadData.path
                    ]);

                throw tableError;
            }

            /* Show tick inside Upload PDF button */
            uploadSelectedPdfButton.innerHTML = `
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

            window.setTimeout(function(){

                /*
                 Clear selected PDF only.
                 Popup stays open.
                */
                pdfUploadInput.value = '';

                selectedPdfData = '';
                selectedPdfName = '';
                selectedPdfType = '';
                selectedPdfFile = null;

                pdfPreview.classList.remove('show');
                pdfPreview.style.display = '';

                pdfFileName.textContent = '';

                choosePdfLabel.style.display = '';
                cancelSelectedPdfButton.style.display = '';

                uploadSelectedPdfButton.innerHTML =
                    originalButtonHTML;

                uploadSelectedPdfButton.disabled = true;

            }, 1000);

        }catch(error){

            console.error(
                'Ustav PDF upload error:',
                error
            );

            uploadSelectedPdfButton.innerHTML =
                originalButtonHTML;

            uploadSelectedPdfButton.disabled = false;

            uploadSelectedPdfButton.style.animation =
                'none';

            void uploadSelectedPdfButton.offsetWidth;

            uploadSelectedPdfButton.style.animation =
                'oldDonationShake .38s ease';

            setTimeout(function(){
                uploadSelectedPdfButton.style.animation = '';
            }, 500);
        }
    }
);