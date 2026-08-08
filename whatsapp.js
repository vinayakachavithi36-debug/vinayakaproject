/* =========================================================
   WHATSAPP DONATION FULL-PAGE POPUP
   HTML + CSS + JAVASCRIPT IN ONE FILE
========================================================= */

(function initializeWhatsAppDonationPage(){

    if(
        document.getElementById(
            'whatsappDonationPopup'
        )
    ){
        return;
    }


    /* =====================================================
       CREATE CSS
    ===================================================== */

    const style =
        document.createElement('style');

    style.textContent = `

        .whatsappDonationPopup{
            position:fixed;
            inset:0;
            z-index:9999999;

            display:none;
            flex-direction:column;

            width:100%;
            height:100vh;
            height:100dvh;

            background:#f5f7f6;
            color:#111111;

            font-family:Arial,sans-serif;
            overflow:hidden;
        }

        .whatsappDonationPopup.show{
            display:flex;
        }

        .whatsappDonationHeader{
            flex-shrink:0;

            display:flex;
            align-items:center;
            gap:12px;

            min-height:calc(
    64px + 30px +
    env(safe-area-inset-top)
);

padding-top:calc(
    30px +
    env(safe-area-inset-top)
);

            padding-right:16px;
            padding-bottom:10px;
            padding-left:16px;

            background:#ffffff;
            border-bottom:1px solid #e7e7e7;
        }

        .whatsappDonationBack{
            flex-shrink:0;

            display:flex;
            align-items:center;
            justify-content:center;

            width:42px;
            height:42px;
            padding:0;

            background:#f2f3f3;
            border:none;
            border-radius:50%;

            color:#111111;
            font-size:25px;
            cursor:pointer;
        }

        .whatsappDonationHeaderText{
            min-width:0;
            flex:1;
        }

        .whatsappDonationTitle{
            margin:0;

            color:#111111;
            font-size:20px;
            font-weight:800;
            line-height:1.2;
        }

        .whatsappDonationSubtitle{
            margin:4px 0 0;

            color:#777777;
            font-size:12px;
            line-height:1.35;
        }

        .whatsappDonationRefresh{
            flex-shrink:0;

            min-height:38px;
            padding:9px 12px;

            background:#ffffff;
            border:1px solid #dedede;
            border-radius:10px;

            color:#333333;
            font-size:13px;
            font-weight:700;
            cursor:pointer;
        }

        .whatsappDonationTabs{
            flex-shrink:0;

            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px;

            padding:12px 14px;

            background:#ffffff;
            border-bottom:1px solid #eaeaea;
        }

        .whatsappDonationTab{
            min-height:44px;
            padding:9px 8px;

            background:#f2f4f3;
            border:1px solid transparent;
            border-radius:11px;

            color:#555555;
            font-size:13px;
            font-weight:800;
            cursor:pointer;
        }

        .whatsappDonationTab.active{
            background:#e5f7ea;
            border-color:#9bd9ab;
            color:#167837;
        }

        .whatsappDonationBody{
            flex:1;
            min-height:0;

            overflow-y:auto;
            padding:14px;
            padding-bottom:calc(
                30px +
                env(safe-area-inset-bottom)
            );

            -webkit-overflow-scrolling:touch;
        }

        .whatsappDonationSection{
            display:none;
        }

        .whatsappDonationSection.active{
            display:block;
        }

        .whatsappSectionHeading{
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;

            margin-bottom:12px;
        }

        .whatsappSectionHeading h3{
            margin:0;

            color:#222222;
            font-size:16px;
            font-weight:800;
        }

        .whatsappDonationCount{
            flex-shrink:0;

            padding:5px 9px;

            background:#ffffff;
            border:1px solid #e3e3e3;
            border-radius:999px;

            color:#666666;
            font-size:11px;
            font-weight:700;
        }

        .whatsappDonationList{
            display:flex;
            flex-direction:column;
            gap:11px;
        }

        .whatsappDonationCard{
            display:grid;
            grid-template-columns:minmax(0,1fr) auto;
            gap:12px;

            width:100%;
            padding:15px;

            background:#ffffff;
            border:1px solid #e5e5e5;
            border-radius:15px;

            box-shadow:0 5px 16px rgba(0,0,0,.04);
        }

        .whatsappDonationMain{
            min-width:0;
        }

        .whatsappDonorName{
            margin:0;

            color:#151515;
            font-size:15px;
            font-weight:800;
            line-height:1.35;
            word-break:break-word;
        }

        .whatsappDonationMobile{
            margin:5px 0 0;

            color:#666666;
            font-size:13px;
            font-weight:600;
        }

        .whatsappDonationDetails{
            display:flex;
            flex-wrap:wrap;
            gap:6px 10px;

            margin-top:9px;
        }

        .whatsappDonationDetail{
            padding:5px 8px;

            background:#f5f5f5;
            border-radius:7px;

            color:#555555;
            font-size:11px;
            font-weight:700;
        }

        .whatsappDonationActions{
            display:flex;
            flex-direction:column;
            align-items:flex-end;
            justify-content:space-between;
            gap:12px;
        }

        .whatsappSendButton{
            display:flex;
            align-items:center;
            justify-content:center;

            width:45px;
            height:45px;
            padding:0;

            background:#25d366;
            border:none;
            border-radius:50%;

            color:#ffffff;
            font-size:23px;
            cursor:pointer;

            box-shadow:
                0 7px 16px rgba(37,211,102,.25);
        }

        .whatsappSendButton:active{
            transform:scale(.93);
        }

        .whatsappSendButton:disabled{
            opacity:.45;
            cursor:not-allowed;
            box-shadow:none;
        }

        .whatsappMessageStatus{
            display:inline-flex;
            align-items:center;
            justify-content:center;

            min-width:70px;
            padding:6px 9px;

            border-radius:999px;

            font-size:10px;
            font-weight:800;
            white-space:nowrap;
        }

        .whatsappMessageStatus.pending{
            background:#fff4cf;
            color:#946c00;
        }

        .whatsappMessageStatus.sent{
            background:#dcf7e5;
            color:#137a35;
        }

        .whatsappMessageStatus.failed{
            background:#ffe4e4;
            color:#c62828;
        }

        .whatsappMessageStatus.not-sent{
            background:#eeeeee;
            color:#666666;
        }

        .whatsappAlbumLoading,
        .whatsappAlbumEmpty,
        .whatsappAlbumError{
            width:100%;
            padding:30px 16px;

            background:#ffffff;
            border:1px solid #e5e5e5;
            border-radius:15px;

            color:#777777;
            font-size:14px;
            line-height:1.6;
            text-align:center;
        }

        .whatsappAlbumError{
            color:#c62828;
        }

        .whatsappRetryButton{
            margin-top:12px;
            padding:10px 16px;

            background:#222222;
            border:none;
            border-radius:9px;

            color:#ffffff;
            font-size:13px;
            font-weight:700;
            cursor:pointer;
        }

        .whatsappMarkSentButton{
            padding:7px 9px;

            background:#ffffff;
            border:1px solid #b9dec4;
            border-radius:8px;

            color:#187a38;
            font-size:10px;
            font-weight:800;
            cursor:pointer;
        }

        @media(max-width:380px){

            .whatsappDonationCard{
                padding:13px;
                gap:8px;
            }

            .whatsappDonationTitle{
                font-size:18px;
            }

            .whatsappDonationTab{
                font-size:12px;
            }
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       CREATE FULL-PAGE POPUP
    ===================================================== */

    const popup =
        document.createElement('section');

    popup.id =
        'whatsappDonationPopup';

    popup.className =
        'whatsappDonationPopup';

    popup.setAttribute(
        'aria-hidden',
        'true'
    );

    popup.innerHTML = `

        <header class="whatsappDonationHeader">

            <button
                type="button"
                class="whatsappDonationBack"
                id="whatsappDonationBack"
                aria-label="Back"
            >
                <
            </button>

            <div class="whatsappDonationHeaderText">

                <h2 class="whatsappDonationTitle">
                    WhatsApp
                </h2>

                <p class="whatsappDonationSubtitle">
                    Send donation confirmations
                </p>

            </div>

            <button
                type="button"
                class="whatsappDonationRefresh"
                id="whatsappDonationRefresh"
            >
                Refresh
            </button>

        </header>


        <div class="whatsappDonationTabs">

            <button
                type="button"
                class="whatsappDonationTab active"
                data-whatsapp-tab="chavithi"
            >
                Chavithi Donations
            </button>

            <button
                type="button"
                class="whatsappDonationTab"
                data-whatsapp-tab="santharpana"
            >
                Santharpana Donations
            </button>

        </div>


        <main class="whatsappDonationBody">

            <section
                class="whatsappDonationSection active"
                id="whatsappChavithiSection"
            >

                <div class="whatsappSectionHeading">

                    <h3>Chavithi Donations</h3>

                    <span
                        class="whatsappDonationCount"
                        id="whatsappChavithiCount"
                    >
                        0
                    </span>

                </div>

                <div
                    class="whatsappDonationList"
                    id="whatsappChavithiList"
                ></div>

            </section>


            <section
                class="whatsappDonationSection"
                id="whatsappSantharpanaSection"
            >

                <div class="whatsappSectionHeading">

                    <h3>Santharpana Donations</h3>

                    <span
                        class="whatsappDonationCount"
                        id="whatsappSantharpanaCount"
                    >
                        0
                    </span>

                </div>

                <div
                    class="whatsappDonationList"
                    id="whatsappSantharpanaList"
                ></div>

            </section>

        </main>
    `;

    document.body.appendChild(popup);

})();


/* =========================================================
   ELEMENTS
========================================================= */

const whatsappDonationPopup =
    document.getElementById(
        'whatsappDonationPopup'
    );

const whatsappDonationBack =
    document.getElementById(
        'whatsappDonationBack'
    );

const whatsappDonationRefresh =
    document.getElementById(
        'whatsappDonationRefresh'
    );

const whatsappChavithiList =
    document.getElementById(
        'whatsappChavithiList'
    );

const whatsappSantharpanaList =
    document.getElementById(
        'whatsappSantharpanaList'
    );

const whatsappChavithiCount =
    document.getElementById(
        'whatsappChavithiCount'
    );

const whatsappSantharpanaCount =
    document.getElementById(
        'whatsappSantharpanaCount'
    );


let whatsappRealtimeChannel = null;
let whatsappRefreshTimer = null;


/* =========================================================
   OPEN AND CLOSE
========================================================= */

function openWhatsAppDonationPopup(){

    whatsappDonationPopup
        .classList.add('show');

    whatsappDonationPopup.setAttribute(
        'aria-hidden',
        'false'
    );

    document.documentElement.style.overflow =
        'hidden';

    document.body.style.overflow =
        'hidden';

    loadWhatsAppDonationPage();

    startWhatsAppDonationRealtime();
}


function closeWhatsAppDonationPopup(){

    whatsappDonationPopup
        .classList.remove('show');

    whatsappDonationPopup.setAttribute(
        'aria-hidden',
        'true'
    );

    document.documentElement.style.overflow =
        '';

    document.body.style.overflow =
        '';
}


/* =========================================================
   GET VALUE USING POSSIBLE COLUMN NAMES
========================================================= */

function getDonationField(
    record,
    possibleNames,
    fallback = ''
){

    for(
        const columnName
        of possibleNames
    ){

        const value =
            record?.[columnName];

        if(
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ''
        ){
            return value;
        }
    }

    return fallback;
}


/* =========================================================
   LOAD DONATIONS AND WHATSAPP STATUS
========================================================= */

async function loadWhatsAppDonationPage(){

    if(!window.supabaseClient){
        return;
    }

    const alreadyLoaded =
        whatsappChavithiList.querySelector(
            '.whatsappDonationCard'
        ) ||
        whatsappSantharpanaList.querySelector(
            '.whatsappDonationCard'
        );

    if(!alreadyLoaded){

        whatsappChavithiList.innerHTML = `
            <div class="whatsappAlbumLoading">
                Loading Chavithi donations...
            </div>
        `;

        whatsappSantharpanaList.innerHTML = `
            <div class="whatsappAlbumLoading">
                Loading Santharpana donations...
            </div>
        `;
    }

    try{

        const [
            chavithiResult,
            santharpanaResult,
            statusResult
        ] = await Promise.all([

            window.supabaseClient
                .from('chavithi_donations')
                .select('*')
                .order('created_at',{
                    ascending:false
                }),

            window.supabaseClient
                .from('santharpana_donations')
                .select('*')
                .order('created_at',{
                    ascending:false
                }),

            window.supabaseClient
                .from('whatsapp_messages')
                .select(
                    'id, donation_table, donation_id, donor_mobile, payment_info, message_status, created_at, sent_at'
                )
                .order('created_at',{
                    ascending:false
                })
        ]);


        if(chavithiResult.error){
            throw chavithiResult.error;
        }

        if(santharpanaResult.error){
            throw santharpanaResult.error;
        }

        if(statusResult.error){
            throw statusResult.error;
        }


        const statusMap =
            createWhatsAppStatusMap(
                statusResult.data || []
            );


        renderWhatsAppDonations(
            chavithiResult.data || [],
            'chavithi_donations',
            whatsappChavithiList,
            whatsappChavithiCount,
            statusMap
        );


        renderWhatsAppDonations(
            santharpanaResult.data || [],
            'santharpana_donations',
            whatsappSantharpanaList,
            whatsappSantharpanaCount,
            statusMap
        );

    }
    catch(error){

        console.error(
            'WhatsApp donation loading failed:',
            error
        );

        const errorHtml = `
            <div class="whatsappAlbumError">

                Unable to load donations.

                <br>

                <button
                    type="button"
                    class="whatsappRetryButton"
                    onclick="loadWhatsAppDonationPage()"
                >
                    Try Again
                </button>

            </div>
        `;

        whatsappChavithiList.innerHTML =
            errorHtml;

        whatsappSantharpanaList.innerHTML =
            errorHtml;
    }
}


/* =========================================================
   CREATE STATUS LOOKUP MAP
========================================================= */

function createWhatsAppStatusMap(records){

    const statusMap =
        new Map();

    records.forEach(function(record){

        const key =
            String(record.donation_table) +
            ':' +
            String(record.donation_id);

        /*
           Records are ordered newest first,
           so keep the newest status only.
        */

        if(!statusMap.has(key)){
            statusMap.set(key,record);
        }
    });

    return statusMap;
}


/* =========================================================
   RENDER DONATIONS
========================================================= */

function renderWhatsAppDonations(
    records,
    donationTable,
    listElement,
    countElement,
    statusMap
){

    listElement.innerHTML = '';

    countElement.textContent =
        String(records.length);

    if(!records.length){

        listElement.innerHTML = `
            <div class="whatsappAlbumEmpty">
                No donations available
            </div>
        `;

        return;
    }


    records.forEach(function(record){

        const donationId =
            getDonationField(
                record,
                ['id'],
                ''
            );

        const donorName =
            getDonationField(
                record,
                [
                    'donor_name',
                    'name',
                    'full_name',
                    'donorName'
                ],
                'Donor'
            );

        const donorMobile =
            String(
                getDonationField(
                    record,
                    [
                        'donor_phone',
                        'phone',
                        'phone_number',
                        'mobile',
                        'mobile_number',
                        'donor_mobile'
                    ],
                    ''
                )
            )
            .replace(/\D/g,'')
            .slice(-10);

        const donationAmount =
            getDonationField(
                record,
                [
                    'donation_amount',
                    'amount'
                ],
                '0'
            );

        const paymentType =
            getDonationField(
                record,
                [
                    'amount_type',
                    'payment_type',
                    'payment_method',
                    'payment_info'
                ],
                'Not specified'
            );

        const donationDate =
            getDonationField(
                record,
                [
                    'donation_date',
                    'date',
                    'created_at'
                ],
                ''
            );

        const statusKey =
            donationTable +
            ':' +
            donationId;

        const whatsappStatus =
            statusMap.get(statusKey);

        const currentStatus =
            whatsappStatus?.message_status ||
            'not-sent';


        const card =
            document.createElement('article');

        card.className =
            'whatsappDonationCard';

        card.innerHTML = `

            <div class="whatsappDonationMain">

                <p class="whatsappDonorName">
                    ${escapeWhatsAppText(donorName)}
                </p>

                <p class="whatsappDonationMobile">
                    ${donorMobile
                        ? '+91 ' + escapeWhatsAppText(donorMobile)
                        : 'Mobile number unavailable'
                    }
                </p>

                <div class="whatsappDonationDetails">

                    <span class="whatsappDonationDetail">
                        ₹${escapeWhatsAppText(donationAmount)}
                    </span>

                    <span class="whatsappDonationDetail">
                        ${escapeWhatsAppText(paymentType)}
                    </span>

                    ${
                        donationDate
                            ? `
                                <span class="whatsappDonationDetail">
                                    ${escapeWhatsAppText(
                                        formatWhatsAppDate(
                                            donationDate
                                        )
                                    )}
                                </span>
                            `
                            : ''
                    }

                </div>

            </div>


            <div class="whatsappDonationActions">

                <button
                    type="button"
                    class="whatsappSendButton"
                    aria-label="Send on WhatsApp"
                    ${donorMobile ? '' : 'disabled'}
                >
                    <i class="fa-brands fa-whatsapp"></i>
                </button>

                <span
                    class="whatsappMessageStatus ${escapeWhatsAppText(currentStatus)}"
                >
                    ${getWhatsAppStatusText(currentStatus)}
                </span>

                ${
                    currentStatus === 'pending'
                        ? `
                            <button
                                type="button"
                                class="whatsappMarkSentButton"
                            >
                                Mark Sent
                            </button>
                        `
                        : ''
                }

            </div>
        `;


        const sendButton =
            card.querySelector(
                '.whatsappSendButton'
            );

        sendButton?.addEventListener(
            'click',
            function(){

                sendDonationToWhatsApp({
                    donationTable,
                    donationId,
                    donorName,
                    donorMobile,
                    donationAmount,
                    paymentType,
                    donationDate
                });
            }
        );


        const markSentButton =
            card.querySelector(
                '.whatsappMarkSentButton'
            );

        markSentButton?.addEventListener(
            'click',
            function(){

                markWhatsAppMessageSent(
                    donationTable,
                    donationId
                );
            }
        );


        listElement.appendChild(card);
    });
}


/* =========================================================
   OPEN WHATSAPP AND CREATE PENDING STATUS
========================================================= */

async function sendDonationToWhatsApp(details){

    if(!details.donorMobile){

        alert(
            'This donation does not contain a mobile number.'
        );

        return;
    }


    try{

        const paymentInfo =
            [
                'Amount: ₹' +
                    details.donationAmount,

                'Payment: ' +
                    details.paymentType
            ].join(' | ');


        /*
           Remove older queue row for this donation.
           This keeps one current status per donation.
        */

        const deleteResult =
            await window.supabaseClient
                .from('whatsapp_messages')
                .delete()
                .eq(
                    'donation_table',
                    details.donationTable
                )
                .eq(
                    'donation_id',
                    details.donationId
                );

        if(deleteResult.error){
            throw deleteResult.error;
        }


        const insertResult =
            await window.supabaseClient
                .from('whatsapp_messages')
                .insert([{
                    donation_table:
                        details.donationTable,

                    donation_id:
                        details.donationId,

                    donor_mobile:
                        details.donorMobile,

                    payment_info:
                        paymentInfo,

                    message_status:
                        'pending'
                }]);

        if(insertResult.error){
            throw insertResult.error;
        }


        const donationType =
            details.donationTable ===
            'chavithi_donations'

                ? 'Chavithi Donation'
                : 'Santharpana Donation';


        const message = [
            `Namaste ${details.donorName},`,
            '',
            `Thank you for your ${donationType}.`,
            '',
            `Amount: ₹${details.donationAmount}`,
            `Payment: ${details.paymentType}`,
            details.donationDate
                ? `Date: ${formatWhatsAppDate(
                    details.donationDate
                )}`
                : '',
            '',
            'Sri Varasidhi Vinayakha Utsava Committee'
        ]
        .filter(function(line){
            return line !== '';
        })
        .join('\n');


        const whatsappUrl =
    'whatsapp://send?phone=91' +
    details.donorMobile +
    '&text=' +
    encodeURIComponent(message);

await loadWhatsAppDonationPage();

window.location.href =
    whatsappUrl;

    }
    catch(error){

        console.error(
            'Unable to prepare WhatsApp message:',
            error
        );

        alert(
            error.message ||
            'Unable to open WhatsApp'
        );
    }
}


/* =========================================================
   MANUALLY MARK AS SENT
========================================================= */

async function markWhatsAppMessageSent(
    donationTable,
    donationId
){

    try{

        const { error } =
            await window.supabaseClient
                .from('whatsapp_messages')
                .update({
                    message_status:'sent',
                    sent_at:
                        new Date().toISOString(),
                    error_message:null
                })
                .eq(
                    'donation_table',
                    donationTable
                )
                .eq(
                    'donation_id',
                    donationId
                );


        if(error){
            throw error;
        }

        loadWhatsAppDonationPage();

    }
    catch(error){

        console.error(
            'Unable to mark message as sent:',
            error
        );

        alert(
            'Unable to update WhatsApp status.'
        );
    }
}


/* =========================================================
   STATUS TEXT
========================================================= */

function getWhatsAppStatusText(status){

    if(status === 'sent'){
        return '✓ Sent';
    }

    if(status === 'pending'){
        return '◷ Pending';
    }

    if(status === 'failed'){
        return '✕ Failed';
    }

    return 'Not sent';
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatWhatsAppDate(value){

    if(!value){
        return '';
    }

    const parsedDate =
        new Date(value);

    if(
        Number.isNaN(
            parsedDate.getTime()
        )
    ){
        return String(value);
    }

    return parsedDate.toLocaleDateString(
        'en-IN',
        {
            day:'2-digit',
            month:'2-digit',
            year:'numeric'
        }
    );
}


/* =========================================================
   ESCAPE TEXT
========================================================= */

function escapeWhatsAppText(value){

    return String(value ?? '')
        .replaceAll('&','&amp;')
        .replaceAll('<','&lt;')
        .replaceAll('>','&gt;')
        .replaceAll('"','&quot;')
        .replaceAll("'",'&#039;');
}


/* =========================================================
   TABS
========================================================= */

document.querySelectorAll(
    '[data-whatsapp-tab]'
)
.forEach(function(tabButton){

    tabButton.addEventListener(
        'click',
        function(){

            const selectedTab =
                tabButton.dataset
                    .whatsappTab;

            document.querySelectorAll(
                '[data-whatsapp-tab]'
            )
            .forEach(function(button){

                button.classList.toggle(
                    'active',
                    button === tabButton
                );
            });


            document
                .getElementById(
                    'whatsappChavithiSection'
                )
                .classList.toggle(
                    'active',
                    selectedTab === 'chavithi'
                );


            document
                .getElementById(
                    'whatsappSantharpanaSection'
                )
                .classList.toggle(
                    'active',
                    selectedTab ===
                        'santharpana'
                );
        }
    );
});


/* =========================================================
   REALTIME
========================================================= */

function refreshWhatsAppDonationPageLive(){

    clearTimeout(
        whatsappRefreshTimer
    );

    whatsappRefreshTimer =
        setTimeout(function(){

            if(
                whatsappDonationPopup
                    .classList
                    .contains('show')
            ){
                loadWhatsAppDonationPage();
            }

        },250);
}


function startWhatsAppDonationRealtime(){

    if(
        !window.supabaseClient ||
        whatsappRealtimeChannel
    ){
        return;
    }


    whatsappRealtimeChannel =
        window.supabaseClient
            .channel(
                'whatsapp-donation-page-live'
            )

            .on(
                'postgres_changes',
                {
                    event:'*',
                    schema:'public',
                    table:'chavithi_donations'
                },
                refreshWhatsAppDonationPageLive
            )

            .on(
                'postgres_changes',
                {
                    event:'*',
                    schema:'public',
                    table:
                        'santharpana_donations'
                },
                refreshWhatsAppDonationPageLive
            )

            .on(
                'postgres_changes',
                {
                    event:'*',
                    schema:'public',
                    table:'whatsapp_messages'
                },
                refreshWhatsAppDonationPageLive
            )

            .subscribe(function(status){

                console.log(
                    'WhatsApp page realtime:',
                    status
                );
            });
}


/* =========================================================
   EVENTS
========================================================= */

document.addEventListener(
    'click',
    function(event){

        const openButton =
            event.target.closest(
                '#openWhatsAppSettingsBtn'
            );

        if(openButton){

            openWhatsAppDonationPopup();

            return;
        }
    }
);


whatsappDonationBack
    ?.addEventListener(
        'click',
        closeWhatsAppDonationPopup
    );


whatsappDonationRefresh
    ?.addEventListener(
        'click',
        loadWhatsAppDonationPage
    );


    /* =========================================================
   WHATSAPP POPUP EDGE SWIPE BACK
   LEFT EDGE → SWIPE RIGHT
   RIGHT EDGE → SWIPE LEFT
========================================================= */

let whatsappSwipeStartX = 0;
let whatsappSwipeStartY = 0;
let whatsappSwipeEndX = 0;
let whatsappSwipeEndY = 0;

const whatsappSwipeEdgeSize = 35;
const whatsappSwipeMinimumDistance = 80;


whatsappDonationPopup?.addEventListener(
    'touchstart',
    function(event){

        if(
            !whatsappDonationPopup
                .classList
                .contains('show')
        ){
            return;
        }

        const touch =
            event.touches[0];

        whatsappSwipeStartX =
            touch.clientX;

        whatsappSwipeStartY =
            touch.clientY;

        whatsappSwipeEndX =
            touch.clientX;

        whatsappSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


whatsappDonationPopup?.addEventListener(
    'touchmove',
    function(event){

        if(
            !whatsappDonationPopup
                .classList
                .contains('show')
        ){
            return;
        }

        const touch =
            event.touches[0];

        whatsappSwipeEndX =
            touch.clientX;

        whatsappSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


whatsappDonationPopup?.addEventListener(
    'touchend',
    function(){

        if(
            !whatsappDonationPopup
                .classList
                .contains('show')
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            whatsappSwipeEndX -
            whatsappSwipeStartX;

        const verticalDistance =
            whatsappSwipeEndY -
            whatsappSwipeStartY;


        /*
           Ignore normal up/down scrolling.
        */

        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /*
           Left edge → swipe right.
        */

        const swipedFromLeftEdge =
            whatsappSwipeStartX <=
                whatsappSwipeEdgeSize &&
            horizontalDistance >=
                whatsappSwipeMinimumDistance;


        /*
           Right edge → swipe left.
        */

        const swipedFromRightEdge =
            whatsappSwipeStartX >=
                screenWidth -
                whatsappSwipeEdgeSize &&
            horizontalDistance <=
                -whatsappSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            closeWhatsAppDonationPopup();
        }
    },
    {
        passive:true
    }
);
