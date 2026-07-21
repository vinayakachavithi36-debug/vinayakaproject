/* =========================================================
   ADMIN ACCESS FULL-PAGE POPUP
   Everything is created using JavaScript only.
========================================================= */

(function setupAdminAccessPage(){

    const openAdminAccessBtn =
        document.getElementById('openAdminAccessBtn');

    if(!openAdminAccessBtn){
        console.warn('openAdminAccessBtn not found');
        return;
    }

    /* Prevent duplicate popup creation */
    let adminAccessPage =
        document.getElementById('adminAccessFullPage');

    if(!adminAccessPage){

        adminAccessPage = document.createElement('div');
        adminAccessPage.id = 'adminAccessFullPage';

        Object.assign(adminAccessPage.style, {
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '9999999',

            display: 'none',
            flexDirection: 'column',

            width: '100%',
            height: '100vh',
            minHeight: '100svh',

            paddingTop:
                'max(20px, calc(env(safe-area-inset-top) + 20px))',

            paddingRight:
                'max(18px, calc(env(safe-area-inset-right) + 18px))',

            paddingBottom:
                'calc(24px + env(safe-area-inset-bottom))',

            paddingLeft:
                'max(18px, calc(env(safe-area-inset-left) + 18px))',

            background: '#ffffff',
            overflowX: 'hidden',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxSizing: 'border-box'
        });


        /* CLOSE BUTTON */

        /* BACK BUTTON */

const adminCloseBtn = document.createElement('button');

adminCloseBtn.type = 'button';
adminCloseBtn.id = 'closeAdminAccessPage';
adminCloseBtn.setAttribute('aria-label','Back');

adminCloseBtn.innerHTML =
    '<i class="fas fa-chevron-left"></i>';

Object.assign(adminCloseBtn.style,{
    position:'fixed',

top:'max(80px, calc(env(safe-area-inset-top) + 20px))',
left:'max(18px, calc(env(safe-area-inset-left) + 18px))',

    zIndex:'10',

    width:'42px',
    height:'42px',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    background:'transparent',
    border:'none',
    outline:'none',

    color:'#222',
    fontSize:'22px',
    cursor:'pointer',
    WebkitTapHighlightColor:'transparent'
});

        /* CENTER HEADING */

        const adminHeading = document.createElement('h1');

        adminHeading.innerHTML = `
            <span style="display:block;">
                శ్రీ వరసిద్ధి వినాయక
            </span>

            <span style="
                display:block;
                margin-top:4px;
            ">
                ఉత్సవ కమిటీ Details
            </span>
        `;

        Object.assign(adminHeading.style, {
            position: 'relative',
            zIndex: '1',

            width: 'calc(100% - 80px)',
            maxWidth: '760px',

            margin: '58px auto 28px',
            padding: '0',

            color: '#d39b00',

            fontFamily:
                "'Noto Sans Telugu', Arial, sans-serif",

            fontSize: 'clamp(25px, 6vw, 42px)',
            fontWeight: '900',
            lineHeight: '1.4',
            textAlign: 'center',

            textShadow:
                '0 2px 5px rgba(0,0,0,.15)',

            boxSizing: 'border-box'
        });


        /* CONTENT AREA — ADD ADMIN DETAILS HERE LATER */

        const adminContent = document.createElement('div');
        adminContent.id = 'adminAccessContent';

        Object.assign(adminContent.style, {
            width: '100%',
            maxWidth: '1180px',
            margin: '0 auto',
            paddingBottom: '30px',
            boxSizing: 'border-box'
        });


        adminAccessPage.appendChild(adminCloseBtn);
       adminAccessPage.appendChild(adminHeading);

/* LINE BELOW HEADING */
const adminHeadingLine = document.createElement('div');

Object.assign(adminHeadingLine.style, {
    width: 'calc(100% - 36px)',   // 18px gap on both sides
    maxWidth: '900px',
    height: '1px',
    margin: '0 auto 8px',
    background: '#d8d8d8',
    borderRadius: '999px'
});

adminAccessPage.appendChild(adminHeadingLine);

/* SECTION TITLE */

/* =========================================================
   ADMIN HORIZONTAL CATEGORIES
========================================================= */

const adminCategories = [
    {
        id:'chavithi',
        title:'Chavithi Donations'
    },
    {
        id:'santharpana',
        title:'Santharpana Donations'
    },
    {
        id:'expenses',
        title:'Expenses'
    },
    {
        id:'oldDonations',
        title:'Old Donations'
    },
    {
        id:'images',
        title:'Images'
    },
    {
        id:'pdf',
        title:'PDF'
    },
    {
        id:'admins',
        title:'Add Admin'
    }
];


/* CATEGORY SCROLL WRAPPER */

const adminCategoryScroll = document.createElement('div');

Object.assign(adminCategoryScroll.style,{
    position:'relative',
    zIndex:'3',
    order:'1',
    flex:'0 0 auto',
    flexShrink:'0',
    width:'100%',
    maxWidth:'1180px',
    minHeight:'52px',
    overflowX:'auto',
    overflowY:'hidden',
    WebkitOverflowScrolling:'touch',
    scrollbarWidth:'none',
    margin:'0 auto 12px',
    padding:'4px 0 8px',
    background:'#ffffff',
    boxSizing:'border-box',
    scrollBehavior:'smooth'
});

adminCategoryScroll.style.msOverflowStyle = 'none';


/* CATEGORY INNER ROW */

const adminCategoryRow = document.createElement('div');

Object.assign(adminCategoryRow.style,{
    display:'flex',
    alignItems:'center',
    gap:'10px',
    width:'max-content',
    minWidth:'100%',
    padding:'0 2px',
    boxSizing:'border-box',
    position:'relative'
});

adminCategoryScroll.appendChild(adminCategoryRow);

/* =========================================================
   ADMIN SUMMARY CARDS
========================================================= */

const adminSummaryWrap = document.createElement('div');
adminSummaryWrap.id = 'adminSummaryWrap';

Object.assign(adminSummaryWrap.style,{
    position:'relative',
    zIndex:'2',
    order:'2',
    flex:'0 0 auto',
    width:'100%',
    maxWidth:'1180px',
    margin:'-2px auto 12px',
    overflowX:'auto',
    overflowY:'hidden',
    WebkitOverflowScrolling:'touch',
    scrollbarWidth:'none',
    boxSizing:'border-box'
});

adminSummaryWrap.style.msOverflowStyle = 'none';

const adminSummaryRow = document.createElement('div');

Object.assign(adminSummaryRow.style,{
    display:'flex',
    alignItems:'flex-start',
    gap:'22px',
    width:'max-content',
    minWidth:'100%',
    padding:'0 2px 4px',
    boxSizing:'border-box'
});

adminSummaryWrap.appendChild(adminSummaryRow);

const adminSummaryValues = {};

function getAdminSummaryShortTitle(categoryId){

    if(categoryId === 'chavithi'){
        return 'Chavithi';
    }

    if(categoryId === 'santharpana'){
        return 'Santharpana';
    }

    if(categoryId === 'oldDonations'){
        return 'Old';
    }

    if(categoryId === 'expenses'){
        return 'Expenses';
    }

    if(categoryId === 'images'){
        return 'Images';
    }

    if(categoryId === 'pdf'){
        return 'PDF';
    }

    if(categoryId === 'admins'){
        return 'Admins';
    }

    return '';
}

function createAdminSummaryItem(category){

    const item = document.createElement('div');
    item.dataset.summaryCategory = category.id;

    Object.assign(item.style,{
        flex:'0 0 auto',
        minWidth:'105px',
        padding:'0',
        border:'none',
        borderRadius:'0',
        background:'transparent',
        fontFamily:'Poppins, sans-serif',
        boxSizing:'border-box'
    });

    const title = document.createElement('div');
    title.textContent = getAdminSummaryShortTitle(category.id);

    Object.assign(title.style,{
        marginBottom:'2px',
        color:'#333',
        fontSize:'11px',
        fontWeight:'700',
        lineHeight:'1.35',
        whiteSpace:'nowrap'
    });

    const lines = document.createElement('div');
    lines.dataset.summaryLines = category.id;
    lines.innerHTML = '<span style="color:#999;">Loading...</span>';

    Object.assign(lines.style,{
        color:'#666',
        fontSize:'10px',
        fontWeight:'500',
        lineHeight:'1.45',
        whiteSpace:'nowrap'
    });

    item.appendChild(title);
    item.appendChild(lines);

    return item;
}

adminCategories.forEach(function(category){
    adminSummaryRow.appendChild(
        createAdminSummaryItem(category)
    );
});

function formatAdminCount(value){

    return new Intl.NumberFormat('en-IN').format(
        Number(value || 0)
    );
}

function calculateAdminSummary(records,categoryId){

    const safeRecords =
        Array.isArray(records) ? records : [];

    let amount = 0;

    safeRecords.forEach(function(record){

        let amountValue = 0;

        if(categoryId === 'expenses'){
            amountValue = record.expense_amount;
        }
        else if(categoryId === 'oldDonations'){
            amountValue = record.amount;
        }
        else{
            amountValue = record.donation_amount;
        }

        const parsedAmount = Number(amountValue);

        if(Number.isFinite(parsedAmount)){
            amount += parsedAmount;
        }
    });

    return {
        count:safeRecords.length,
        donors:safeRecords.length,
        amount:amount
    };
}

function renderPermanentAdminSummary(categoryId,summary){

    adminSummaryValues[categoryId] = summary;

    const lines =
        adminSummaryWrap.querySelector(
            `[data-summary-lines="${categoryId}"]`
        );

    if(!lines){
        return;
    }

    if(
        categoryId === 'chavithi' ||
        categoryId === 'santharpana' ||
        categoryId === 'oldDonations'
    ){
        lines.innerHTML =
            `Donors : ${formatAdminCount(summary.donors)}<br>` +
            `Amount : ${formatAdminMoney(summary.amount)}`;
    }
    else if(categoryId === 'expenses'){
        lines.innerHTML =
            `Entries : ${formatAdminCount(summary.count)}<br>` +
            `Amount : ${formatAdminMoney(summary.amount)}`;
    }
    else if(categoryId === 'images'){
        lines.textContent =
            `Images : ${formatAdminCount(summary.count)}`;
    }
    else if(categoryId === 'pdf'){
        lines.textContent =
            `PDFs : ${formatAdminCount(summary.count)}`;
    }
    else if(categoryId === 'admins'){
        lines.textContent =
            `Admins : ${formatAdminCount(summary.count)}`;
    }
}

function showAdminSummaryError(categoryId){

    const lines =
        adminSummaryWrap.querySelector(
            `[data-summary-lines="${categoryId}"]`
        );

    if(lines){
        lines.innerHTML =
            '<span style="color:#999;">Unable to load</span>';
    }
}

async function loadAllAdminSummaries(){

    if(!adminSupabase){
        adminCategories.forEach(function(category){
            showAdminSummaryError(category.id);
        });
        return;
    }

    await Promise.all(
        adminCategories.map(async function(category){

            const config =
                adminTableConfig[category.id];

            if(!config){
                showAdminSummaryError(category.id);
                return;
            }

            try{

                const { data, error } =
                    await adminSupabase
                        .from(config.table)
                        .select('*');

                if(error){
                    throw error;
                }

                renderPermanentAdminSummary(
                    category.id,
                    calculateAdminSummary(
                        data || [],
                        category.id
                    )
                );
            }
            catch(error){

                console.error(
                    `Admin summary loading failed for ${category.id}:`,
                    error
                );

                showAdminSummaryError(category.id);
            }
        })
    );
}

window.loadAllAdminSummaries = loadAllAdminSummaries;


/* =========================================================
   FIXED SEARCH BAR
========================================================= */

const adminSearchWrap = document.createElement('div');
adminSearchWrap.id = 'adminSearchWrap';

Object.assign(adminSearchWrap.style,{
    position:'relative',
    zIndex:'2',
    order:'3',
    flex:'0 0 auto',
    flexShrink:'0',
    width:'100%',
    maxWidth:'1180px',
    margin:'4px auto 16px',
    background:'#ffffff',
    boxSizing:'border-box'
});


const adminSearchIcon = document.createElement('i');

adminSearchIcon.className = 'fa-solid fa-magnifying-glass';

Object.assign(adminSearchIcon.style,{
    position:'absolute',
    top:'50%',
    left:'16px',
    transform:'translateY(-50%)',
    color:'#888',
    fontSize:'16px',
    pointerEvents:'none'
});


const adminSearchInput = document.createElement('input');

adminSearchInput.type = 'search';
adminSearchInput.id = 'adminAccessSearch';
adminSearchInput.placeholder = 'Search Chavithi Donations';

Object.assign(adminSearchInput.style,{
    width:'100%',
    height:'48px',

    padding:'0 44px 0 20px',
    border:'1px solid #dddddd',
    borderRadius:'14px',
    outline:'none',

    background:'#f7f7f7',
    color:'#222',

    fontFamily:'Poppins, sans-serif',
    fontSize:'15px',
    fontWeight:'500',

    boxSizing:'border-box',
    WebkitAppearance:'none'
});


const adminSearchClear = document.createElement('button');

adminSearchClear.type = 'button';
adminSearchClear.setAttribute('aria-label','Clear search');
adminSearchClear.innerHTML =
    '<i class="fa-solid fa-xmark"></i>';

Object.assign(adminSearchClear.style,{
    position:'absolute',
    top:'50%',
    right:'8px',
    transform:'translateY(-50%)',

    width:'34px',
    height:'34px',

    display:'none',
    alignItems:'center',
    justifyContent:'center',

    border:'none',
    borderRadius:'50%',
    background:'transparent',

    color:'#777',
    fontSize:'16px',
    cursor:'pointer',

    WebkitTapHighlightColor:'transparent'
});


adminSearchWrap.appendChild(adminSearchIcon);
adminSearchWrap.appendChild(adminSearchInput);
adminSearchWrap.appendChild(adminSearchClear);

/* CATEGORY TITLE REMOVED — SEARCH GOES DIRECTLY TO CONTENT */

/* CONTENT CONTAINER */

Object.assign(adminContent.style,{
    position:'relative',
    zIndex:'1',
    order:'4',
    flex:'0 0 auto',
    width:'100%',
    maxWidth:'1180px',
    margin:'0 auto',
    padding:'0 0 30px',
    boxSizing:'border-box'
});

/* SEARCH CURRENT CATEGORY CONTENT */

function filterCurrentAdminContent(){

    const searchValue =
        adminSearchInput.value.trim().toLowerCase();

    adminSearchClear.style.display =
        searchValue ? 'flex' : 'none';

    const searchableItems =
        adminContent.querySelectorAll('[data-admin-search]');

    let visibleCount = 0;

    searchableItems.forEach(function(item){

        const itemText =
            item.dataset.adminSearch.toLowerCase();

        const shouldShow =
            !searchValue || itemText.includes(searchValue);

        item.style.display =
            shouldShow ? '' : 'none';

        if(shouldShow){
            visibleCount++;
        }
    });


    let noSearchResult =
        adminContent.querySelector('#adminNoSearchResult');

    if(searchValue && searchableItems.length && visibleCount === 0){

        if(!noSearchResult){

            noSearchResult = document.createElement('div');
            noSearchResult.id = 'adminNoSearchResult';

            Object.assign(noSearchResult.style,{
                width:'100%',
                padding:'40px 20px',
                textAlign:'center',
                color:'#888',
                fontFamily:'Poppins, sans-serif',
                fontSize:'15px',
                boxSizing:'border-box'
            });

            adminContent.appendChild(noSearchResult);
        }

        noSearchResult.textContent =
            `No results found for "${adminSearchInput.value.trim()}"`;
    }
    else if(noSearchResult){
        noSearchResult.remove();
    }
}


adminSearchInput.addEventListener(
    'input',
    filterCurrentAdminContent
);


adminSearchClear.addEventListener('click',function(){

    adminSearchInput.value = '';
    adminSearchClear.style.display = 'none';

    filterCurrentAdminContent();
    adminSearchInput.focus();

});

/* =========================================================
   SUPABASE ADMIN CATEGORY DATA
========================================================= */

const adminSupabase = window.supabaseClient;
adminSupabase
.channel("admin-live-updates")

.on(
  "postgres_changes",
  {
    event: "*",
    schema: "public",
    table: "chavithi_donations"
  },
  () => {
    loadAllAdminSummaries();
    if(currentAdminCategory === "chavithi"){
      loadAdminCategoryData("chavithi");
    }
  }
)

.on(
  "postgres_changes",
  {
    event: "*",
    schema: "public",
    table: "santharpana_donations"
  },
  () => {
    loadAllAdminSummaries();
    if(currentAdminCategory === "santharpana"){
      loadAdminCategoryData("santharpana");
    }
  }
)

.on(
  "postgres_changes",
  {
    event: "*",
    schema: "public",
    table: "chavithi_expenses"
  },
  () => {
    loadAllAdminSummaries();
    if(currentAdminCategory === "expenses"){
      loadAdminCategoryData("expenses");
    }
  }
)

.on(
  "postgres_changes",
  {
    event: "*",
    schema: "public",
    table: "olddonation"
  },
  () => {
    loadAllAdminSummaries();
    if(currentAdminCategory === "oldDonations"){
      loadAdminCategoryData("oldDonations");
    }
  }
)

.subscribe();
let currentAdminCategory = 'chavithi';


/*
IMPORTANT:

Change only the table names or column names below if your
Supabase names are different.
*/

const adminTableConfig = {

    chavithi:{
        table:'chavithi_donations',
        columns:[
            { key:'id', label:'ID' },
            { key:'donation_category', label:'Category' },
            { key:'donor_name', label:'Donor Name' },
            { key:'donor_phone', label:'Mobile' },
            { key:'donation_amount', label:'Amount', money:true },
            { key:'received_by', label:'Received By' },
            { key:'donation_date', label:'Donation Date', date:true },
            { key:'amount_type', label:'Payment' },
            { key:'additional_information', label:'Additional Info' },
            { key:'created_by_name', label:'Created By' },
            { key:'created_at', label:'Created At', dateTime:true }
        ]
    },

    santharpana:{
        table:'santharpana_donations',
        columns:[
            { key:'id', label:'ID' },
            { key:'donation_category', label:'Category' },
            { key:'donor_name', label:'Donor Name' },
            { key:'donor_phone', label:'Mobile' },
            { key:'donation_amount', label:'Amount', money:true },
            { key:'received_by', label:'Received By' },
            { key:'donation_date', label:'Donation Date', date:true },
            { key:'amount_type', label:'Payment' },
            { key:'additional_information', label:'Additional Info' },
            { key:'created_by_name', label:'Created By' },
            { key:'created_at', label:'Created At', dateTime:true }
        ]
    },

    expenses:{
        table:'chavithi_expenses',
        bucket:'expenses-proff--up',
        pathColumn:'proof_file_path',
        columns:[
            { key:'id', label:'ID' },
            { key:'expense_description', label:'Description' },
            { key:'vendor_name', label:'Vendor' },
            { key:'expense_type', label:'Expense Type' },
            { key:'expense_amount', label:'Amount', money:true },
            { key:'expense_date', label:'Expense Date', date:true },
            { key:'proof_public_url', label:'Proof', link:true },
            { key:'created_by_name', label:'Created By' },
            { key:'created_at', label:'Created At', dateTime:true }
        ]
    },

    oldDonations:{
        table:'olddonation',
        columns:[
            { key:'id', label:'ID' },
            { key:'name', label:'Name' },
            { key:'mobile_number', label:'Mobile' },
            { key:'amount', label:'Amount', money:true },
            { key:'donation_date', label:'Donation Date', date:true },
            { key:'payment_type', label:'Payment' },
            { key:'additional_information', label:'Additional Info' },
            { key:'created_at', label:'Created At', dateTime:true }
        ]
    },

    images:{
        table:'ustavpics',
        bucket:'ustavphotos',
        urlColumn:'image_url',
        pathColumn:'image_path'
    },

    pdf:{
        table:'ustavpdfs',
        bucket:'ustavpdfs',
        urlColumn:'pdf_url',
        pathColumn:'pdf_path'
    },

    admins:{
        table:'admin_login'
    }
};


/* =========================================================
   PINK SHIMMER STYLE
========================================================= */

if(!document.getElementById('adminPinkShimmerStyle')){

    const shimmerStyle = document.createElement('style');

    shimmerStyle.id = 'adminPinkShimmerStyle';

    shimmerStyle.textContent = `

        @keyframes adminPinkShimmerMove {

            0% {
                transform:translateX(-100%);
            }

            100% {
                transform:translateX(100%);
            }
        }

        .adminPinkShimmer {

            position:relative;
            overflow:hidden;

            background:#ffe5ef;
        }

        .adminPinkShimmer::after {

            content:"";

            position:absolute;
            inset:0;

            transform:translateX(-100%);

            background:linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.8),
                transparent
            );

            animation:
                adminPinkShimmerMove 1.2s infinite;
        }

        #adminCategoryScroll::-webkit-scrollbar,
        #adminSummaryWrap::-webkit-scrollbar {
            display:none;
        }

        #adminTableScroll::-webkit-scrollbar {
            height:5px;
        }

        #adminTableScroll::-webkit-scrollbar-thumb {
            background:#d7d7d7;
            border-radius:999px;
        }

        #adminTableScroll::-webkit-scrollbar-track {
            background:transparent;
        }

        #adminTableScroll table tbody tr {
            transition:background .18s ease;
        }

        #adminTableScroll table tbody tr:hover {
            background:#fffafd;
        }

        #adminTableScroll table thead th {
            position:sticky;
            top:0;
            z-index:2;
        }

        .adminTableShimmerCell {
            position:relative;
            overflow:hidden;
            height:14px;
            border-radius:7px;
            background:#f7cfdd;
        }

        .adminTableShimmerCell::after {
            content:"";
            position:absolute;
            inset:0;
            transform:translateX(-100%);
            background:linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.9),
                transparent
            );
            animation:adminPinkShimmerMove 1.15s infinite;
        }

        #adminAccessFullPage {
            overscroll-behavior:contain;
        }

        #adminCategoryScroll {
            position:relative !important;
            z-index:3 !important;
            order:1 !important;
            flex-shrink:0 !important;
            min-height:52px !important;
            background:#ffffff !important;
        }

        #adminSummaryWrap {
            position:relative !important;
            z-index:2 !important;
            order:2 !important;
            flex-shrink:0 !important;
        }

        #adminSearchWrap {
            position:relative !important;
            z-index:2 !important;
            order:3 !important;
            flex-shrink:0 !important;
            background:#ffffff !important;
        }

        #adminAccessSearch {
            position:relative !important;
            z-index:1 !important;
        }

        #adminAccessContent {
            position:relative !important;
            z-index:1 !important;
            order:4 !important;
            clear:both;
        }

        #adminAccessContent,
        #adminTableScroll,
        #adminAccessSearch {
            min-width:0;
        }

        @media (max-width: 767px) {

            #adminAccessFullPage {
                padding-left:12px !important;
                padding-right:12px !important;
            }

            #adminCategoryScroll {
                margin-bottom:10px !important;
            }

            #adminSummaryWrap {
                margin-top:-2px !important;
                margin-bottom:10px !important;
            }

            #adminSummaryWrap > div {
                gap:18px !important;
            }

            #adminAccessSearch {
                height:46px !important;
                font-size:14px !important;
            }

            #adminTableScroll {
                border-radius:14px !important;
            }
        }

        @media (min-width: 768px) and (max-width: 1199px) {

            #adminAccessFullPage {
                padding-left:24px !important;
                padding-right:24px !important;
            }
        }

        @media (min-width: 1200px) {

            #adminAccessFullPage {
                padding-left:36px !important;
                padding-right:36px !important;
            }

            #adminAccessContent,
            #adminCategoryScroll,
            #adminSummaryWrap,
            #adminAccessSearch {
                max-width:1180px !important;
            }
        }
    `;

    document.head.appendChild(shimmerStyle);
}


/* =========================================================
   IMAGE VIEW BOTTOM SHEET
========================================================= */

const adminImageBackdrop = document.createElement('div');

Object.assign(adminImageBackdrop.style,{

    position:'fixed',
    inset:'0',

    zIndex:'10000050',

    display:'none',
    alignItems:'flex-end',
    justifyContent:'center',

    background:'rgba(0,0,0,.55)'
});


const adminImageSheet = document.createElement('div');

Object.assign(adminImageSheet.style,{

    position:'relative',

    width:'100%',
    maxWidth:'760px',

    maxHeight:'88vh',

    padding:
        '52px 16px calc(20px + env(safe-area-inset-bottom))',

    background:'#ffffff',

    borderRadius:'24px 24px 0 0',

    overflowY:'auto',

    boxSizing:'border-box'
});


const adminImageSheetClose = document.createElement('button');

adminImageSheetClose.type = 'button';

adminImageSheetClose.innerHTML =
    '<i class="fa-solid fa-xmark"></i>';

Object.assign(adminImageSheetClose.style,{

    position:'absolute',

    top:'10px',
    right:'12px',

    width:'38px',
    height:'38px',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    border:'none',
    borderRadius:'50%',

    background:'#f2f2f2',
    color:'#222',

    fontSize:'19px',
    cursor:'pointer'
});


const adminImageSheetPhoto =
    document.createElement('img');

Object.assign(adminImageSheetPhoto.style,{

    display:'block',

    width:'100%',
    maxHeight:'72vh',

    margin:'0 auto',

    objectFit:'contain',

    borderRadius:'16px',

    background:'#f5f5f5'
});


adminImageSheet.appendChild(adminImageSheetClose);
adminImageSheet.appendChild(adminImageSheetPhoto);

adminImageBackdrop.appendChild(adminImageSheet);

document.body.appendChild(adminImageBackdrop);


function openAdminImageSheet(imageUrl){

    adminImageSheetPhoto.src = imageUrl;

    adminImageBackdrop.style.display = 'flex';
}


function closeAdminImageSheet(){

    adminImageBackdrop.style.display = 'none';

    adminImageSheetPhoto.removeAttribute('src');
}


adminImageSheetClose.addEventListener(
    'click',
    closeAdminImageSheet
);
/* =========================================================
   ADMIN IMAGE SHEET — EDGE SWIPE BACK TO ADMIN PAGE
========================================================= */

let adminImageSwipeStartX = 0;
let adminImageSwipeStartY = 0;
let adminImageSwipeEndX = 0;
let adminImageSwipeEndY = 0;

const adminImageSwipeEdgeSize = 35;
const adminImageSwipeMinimumDistance = 80;


/* TOUCH START */
adminImageSheet.addEventListener(
    'touchstart',
    function(event){

        if(
            adminImageBackdrop.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminImageSwipeStartX =
            touch.clientX;

        adminImageSwipeStartY =
            touch.clientY;

        adminImageSwipeEndX =
            touch.clientX;

        adminImageSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
adminImageSheet.addEventListener(
    'touchmove',
    function(event){

        if(
            adminImageBackdrop.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminImageSwipeEndX =
            touch.clientX;

        adminImageSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
adminImageSheet.addEventListener(
    'touchend',
    function(){

        if(
            adminImageBackdrop.style.display !==
                'flex'
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            adminImageSwipeEndX -
            adminImageSwipeStartX;

        const verticalDistance =
            adminImageSwipeEndY -
            adminImageSwipeStartY;


        /* IGNORE VERTICAL IMAGE-SHEET SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            adminImageSwipeStartX <=
                adminImageSwipeEdgeSize &&
            horizontalDistance >=
                adminImageSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            adminImageSwipeStartX >=
                screenWidth -
                adminImageSwipeEdgeSize &&
            horizontalDistance <=
                -adminImageSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            adminImageSheetClose.click();
        }
    },
    {
        passive:true
    }
);

adminImageBackdrop.addEventListener('click',function(event){

    if(event.target === adminImageBackdrop){

        closeAdminImageSheet();
    }
});


/* =========================================================
   FORMAT VALUES
========================================================= */

function formatAdminMoney(value){

    const numberValue = Number(value || 0);

    return new Intl.NumberFormat('en-IN',{

        style:'currency',
        currency:'INR',
        maximumFractionDigits:2

    }).format(numberValue);
}


function formatAdminDate(value){

    if(!value){
        return '—';
    }

    const parsedDate = new Date(value);

    if(Number.isNaN(parsedDate.getTime())){
        return value;
    }

    return parsedDate.toLocaleDateString('en-IN',{

        day:'2-digit',
        month:'short',
        year:'numeric'
    });
}


function formatAdminDateTime(value){

    if(!value){
        return '—';
    }

    const parsedDate = new Date(value);

    if(Number.isNaN(parsedDate.getTime())){
        return value;
    }

    return parsedDate.toLocaleString('en-IN',{
        day:'2-digit',
        month:'short',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    });
}


/* =========================================================
   LOADING SHIMMER
========================================================= */

function showAdminLoadingShimmer(categoryId){

    adminContent.innerHTML = '';

    const shimmerType =
        categoryId === 'images'
            ? 'images'
            : categoryId === 'pdf'
                ? 'pdf'
                : 'table';


    /* IMAGE GRID SHIMMER */

    if(shimmerType === 'images'){

        const grid = document.createElement('div');

        Object.assign(grid.style,{
            display:'grid',
            gridTemplateColumns:
                'repeat(auto-fill, minmax(145px, 1fr))',
            gap:'12px',
            width:'100%'
        });

        for(let index = 0; index < 6; index++){

            const card = document.createElement('div');

            Object.assign(card.style,{
                padding:'8px',
                border:'1px solid #eeeeee',
                borderRadius:'16px',
                background:'#ffffff',
                boxSizing:'border-box'
            });

            const photo = document.createElement('div');
            photo.className = 'adminPinkShimmer';

            Object.assign(photo.style,{
                width:'100%',
                aspectRatio:'1 / 1',
                borderRadius:'12px'
            });

            const footer = document.createElement('div');

            Object.assign(footer.style,{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                gap:'10px',
                marginTop:'10px'
            });

            const dateLine = document.createElement('div');
            dateLine.className = 'adminPinkShimmer';

            Object.assign(dateLine.style,{
                width:'58%',
                height:'13px',
                borderRadius:'7px'
            });

            const deleteBox = document.createElement('div');
            deleteBox.className = 'adminPinkShimmer';

            Object.assign(deleteBox.style,{
                width:'38px',
                height:'38px',
                flex:'0 0 auto',
                borderRadius:'10px'
            });

            footer.appendChild(dateLine);
            footer.appendChild(deleteBox);

            card.appendChild(photo);
            card.appendChild(footer);
            grid.appendChild(card);
        }

        adminContent.appendChild(grid);
        return;
    }


    /* PDF LIST SHIMMER */

    if(shimmerType === 'pdf'){

        for(let index = 0; index < 6; index++){

            const row = document.createElement('div');

            Object.assign(row.style,{
                display:'flex',
                alignItems:'center',
                gap:'10px',
                width:'100%',
                marginBottom:'10px',
                padding:'12px',
                border:'1px solid #eeeeee',
                borderRadius:'14px',
                background:'#ffffff',
                boxSizing:'border-box'
            });

            const icon = document.createElement('div');
            icon.className = 'adminPinkShimmer';

            Object.assign(icon.style,{
                width:'44px',
                height:'44px',
                flex:'0 0 auto',
                borderRadius:'12px'
            });

            const lines = document.createElement('div');

            Object.assign(lines.style,{
                flex:'1',
                minWidth:'0'
            });

            const lineOne = document.createElement('div');
            lineOne.className = 'adminPinkShimmer';

            Object.assign(lineOne.style,{
                width:'72%',
                height:'15px',
                borderRadius:'7px'
            });

            const lineTwo = document.createElement('div');
            lineTwo.className = 'adminPinkShimmer';

            Object.assign(lineTwo.style,{
                width:'40%',
                height:'11px',
                marginTop:'8px',
                borderRadius:'6px'
            });

            const viewBox = document.createElement('div');
            viewBox.className = 'adminPinkShimmer';

            Object.assign(viewBox.style,{
                width:'38px',
                height:'38px',
                flex:'0 0 auto',
                borderRadius:'10px'
            });

            const deleteBox = document.createElement('div');
            deleteBox.className = 'adminPinkShimmer';

            Object.assign(deleteBox.style,{
                width:'38px',
                height:'38px',
                flex:'0 0 auto',
                borderRadius:'10px'
            });

            lines.appendChild(lineOne);
            lines.appendChild(lineTwo);

            row.appendChild(icon);
            row.appendChild(lines);
            row.appendChild(viewBox);
            row.appendChild(deleteBox);

            adminContent.appendChild(row);
        }

        return;
    }


    /* TABLE SHIMMER — ONLY INSIDE THE TABLE AREA */

    const config = adminTableConfig[categoryId];
    const columns =
        config && Array.isArray(config.columns)
            ? config.columns
            : [];

    const columnCount = Math.max(columns.length, 1);
    const totalCells = columnCount + 1;

    const shimmerScroll = document.createElement('div');
    shimmerScroll.id = 'adminTableScroll';

    Object.assign(shimmerScroll.style,{
        width:'100%',
        overflowX:'auto',
        overflowY:'hidden',
        WebkitOverflowScrolling:'touch',
        border:'1px solid #eeeeee',
        borderRadius:'16px',
        background:'#ffffff',
        boxSizing:'border-box'
    });

    const shimmerTable = document.createElement('div');

    const minimumWidth =
        Math.max(720, (columnCount * 135) + 76);

    Object.assign(shimmerTable.style,{
        width:'100%',
        minWidth:minimumWidth + 'px',
        background:'#ffffff'
    });

    const gridColumns = [
        ...columns.map(function(column,index){

            if(column.money){
                return '120px';
            }

            if(column.date || column.dateTime){
                return '155px';
            }

            if(column.link){
                return '110px';
            }

            if(index === 0){
                return 'minmax(145px, 1.25fr)';
            }

            return 'minmax(125px, 1fr)';
        }),
        '64px'
    ].join(' ');


    const headerRow = document.createElement('div');

    Object.assign(headerRow.style,{
        display:'grid',
        gridTemplateColumns:gridColumns,
        alignItems:'center',
        gap:'12px',
        padding:'14px 12px',
        background:'#fff0f5',
        borderBottom:'1px solid #eeeeee',
        boxSizing:'border-box'
    });

    for(let index = 0; index < totalCells; index++){

        const headerCell = document.createElement('div');
        headerCell.className = 'adminTableShimmerCell';

        Object.assign(headerCell.style,{
            width:index === totalCells - 1 ? '38px' : '72%',
            height:'14px',
            justifySelf:index === totalCells - 1 ? 'center' : 'start'
        });

        headerRow.appendChild(headerCell);
    }

    shimmerTable.appendChild(headerRow);


    for(let rowIndex = 0; rowIndex < 6; rowIndex++){

        const bodyRow = document.createElement('div');

        Object.assign(bodyRow.style,{
            display:'grid',
            gridTemplateColumns:gridColumns,
            alignItems:'center',
            gap:'12px',
            minHeight:'62px',
            padding:'11px 12px',
            borderBottom:
                rowIndex === 5
                    ? 'none'
                    : '1px solid #f0f0f0',
            boxSizing:'border-box'
        });

        for(let cellIndex = 0; cellIndex < totalCells; cellIndex++){

            const cell = document.createElement('div');
            cell.className = 'adminTableShimmerCell';

            const isDeleteCell =
                cellIndex === totalCells - 1;

            Object.assign(cell.style,{
                width:isDeleteCell
                    ? '38px'
                    : (
                        cellIndex % 3 === 0
                            ? '82%'
                            : cellIndex % 3 === 1
                                ? '68%'
                                : '76%'
                    ),
                height:isDeleteCell ? '38px' : '14px',
                borderRadius:isDeleteCell ? '10px' : '7px',
                justifySelf:isDeleteCell ? 'center' : 'start'
            });

            bodyRow.appendChild(cell);
        }

        shimmerTable.appendChild(bodyRow);
    }

    shimmerScroll.appendChild(shimmerTable);
    adminContent.appendChild(shimmerScroll);
    window.showAdminLoadingShimmer = showAdminLoadingShimmer;
}


/* =========================================================
   EMPTY / ERROR MESSAGE
========================================================= */

function showAdminMessage(message){

    adminContent.innerHTML = '';

    const messageBox = document.createElement('div');

    messageBox.textContent = message;

    Object.assign(messageBox.style,{

        width:'100%',
        minHeight:'180px',

        display:'flex',
        alignItems:'center',
        justifyContent:'center',

        padding:'24px',

        border:'1px solid #eeeeee',
        borderRadius:'16px',

        background:'#fafafa',
        color:'#777',

        fontFamily:'Poppins, sans-serif',
        fontSize:'15px',
        textAlign:'center',

        boxSizing:'border-box'
    });

    adminContent.appendChild(messageBox);
}


/* =========================================================
   DELETE DATABASE ROW
========================================================= */

async function deleteAdminRecord(
    categoryId,
    record,
    deleteButton
){

    const config =
        adminTableConfig[categoryId];

    if(!config || !record || !record.id){
        return;
    }

    deleteButton.disabled = true;

    deleteButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';


    try{

        /*
         Delete file from Storage first for images and PDFs.
        */

        if(
            config.bucket &&
            config.pathColumn &&
            record[config.pathColumn]
        ){

            const storageDeleteResult =
                await adminSupabase
                    .storage
                    .from(config.bucket)
                    .remove([
                        record[config.pathColumn]
                    ]);

            if(storageDeleteResult.error){

                console.warn(
                    'Storage delete error:',
                    storageDeleteResult.error
                );
            }
        }


        /*
         Delete database row.
        */

        const { error } =
            await adminSupabase
                .from(config.table)
                .delete()
                .eq('id',record.id);

        if(error){
            throw error;
        }


        /*
         Reload selected category.
        */

        await loadAdminCategoryData(categoryId);
        await loadAllAdminSummaries();

    }
    catch(error){

        console.error(
            'Admin delete failed:',
            error
        );

        alert(
            error.message ||
            'Unable to delete this item'
        );

        deleteButton.disabled = false;

        deleteButton.innerHTML =
            '<i class="fa-solid fa-trash"></i>';
    }
}


/* =========================================================
   CREATE DELETE BUTTON
========================================================= */

function createAdminDeleteButton(
    categoryId,
    record
){

    const deleteButton =
        document.createElement('button');

    deleteButton.type = 'button';

    deleteButton.setAttribute(
        'aria-label',
        'Delete'
    );

    deleteButton.innerHTML =
        '<i class="fa-solid fa-trash"></i>';

    Object.assign(deleteButton.style,{

        width:'38px',
        height:'38px',

        display:'flex',
        alignItems:'center',
        justifyContent:'center',

        border:'none',
        borderRadius:'10px',

        background:'#fff0f2',
        color:'#e53935',

        fontSize:'16px',

        cursor:'pointer',
        flex:'0 0 auto',

        WebkitTapHighlightColor:'transparent'
    });

    deleteButton.addEventListener('click',function(event){

        event.stopPropagation();

        deleteAdminRecord(
            categoryId,
            record,
            deleteButton
        );
    });

    return deleteButton;
}


/* =========================================================
   RENDER DONATION / EXPENSE TABLE
========================================================= */

function renderAdminDataTable(
    categoryId,
    records,
    config
){

    adminContent.innerHTML = '';

    const tableScroll =
        document.createElement('div');

    tableScroll.id = 'adminTableScroll';

    Object.assign(tableScroll.style,{

        width:'100%',

        overflowX:'auto',
        overflowY:'hidden',

        WebkitOverflowScrolling:'touch',

        border:'1px solid #eeeeee',
        borderRadius:'16px',

        background:'#ffffff',
        boxSizing:'border-box'
    });


    const table =
        document.createElement('table');

    Object.assign(table.style,{

        width:'100%',
        minWidth:Math.max(
            720,
            (config.columns.length * 135) + 76
        ) + 'px',

        borderCollapse:'separate',
        borderSpacing:'0',

        fontFamily:'Poppins, sans-serif',
        fontSize:'14px'
    });


    const tableHead =
        document.createElement('thead');

    const headerRow =
        document.createElement('tr');


    config.columns.forEach(function(column){

        const heading =
            document.createElement('th');

        heading.textContent =
            column.label;

        Object.assign(heading.style,{

            padding:'14px 12px',

            background:'#fff0f5',
            color:'#333',

            borderBottom:
                '1px solid #eeeeee',

            textAlign:'left',
            whiteSpace:'nowrap',

            fontSize:'13px',
            fontWeight:'700'
        });

        headerRow.appendChild(heading);
    });


    const actionHeading =
        document.createElement('th');

    actionHeading.textContent = 'Delete';

    Object.assign(actionHeading.style,{

        width:'64px',

        padding:'14px 12px',

        background:'#fff0f5',
        color:'#333',

        borderBottom:
            '1px solid #eeeeee',

        textAlign:'center',

        fontSize:'13px',
        fontWeight:'700'
    });

    headerRow.appendChild(actionHeading);

    tableHead.appendChild(headerRow);

    table.appendChild(tableHead);


    const tableBody =
        document.createElement('tbody');


    records.forEach(function(record){

        const row =
            document.createElement('tr');

        row.dataset.adminSearch =
            Object.values(record)
                .filter(value => value != null)
                .join(' ')
                .toLowerCase();


        config.columns.forEach(function(column){

            const cell =
                document.createElement('td');

            let displayValue =
                record[column.key];

            if(column.money){

                displayValue =
                    formatAdminMoney(displayValue);
            }

            else if(column.dateTime){

                displayValue =
                    formatAdminDateTime(displayValue);
            }

            else if(column.date){

                displayValue =
                    formatAdminDate(displayValue);
            }

            else if(
                displayValue === null ||
                displayValue === undefined ||
                displayValue === ''
            ){

                displayValue = '—';
            }


            if(column.link && displayValue !== '—'){

                const proofLink =
                    document.createElement('a');

                proofLink.href='javascript:void(0)';
                proofLink.textContent='View Proof';
                proofLink.addEventListener('click',function(e){
                    e.preventDefault();
                    openAdminImageSheet(displayValue);
                });

                Object.assign(proofLink.style,{
                    color:'#d39b00',
                    fontWeight:'700',
                    textDecoration:'none'
                });

                cell.appendChild(proofLink);
            }
            else{

                cell.textContent = displayValue;
            }

            Object.assign(cell.style,{

                padding:'13px 12px',

                color:'#333',

                borderBottom:
                    '1px solid #f0f0f0',

                whiteSpace:'nowrap',
                verticalAlign:'middle'
            });

            row.appendChild(cell);
        });


        const deleteCell =
            document.createElement('td');

        Object.assign(deleteCell.style,{

            padding:'10px 12px',

            borderBottom:
                '1px solid #f0f0f0',

            textAlign:'center'
        });

        deleteCell.appendChild(
            createAdminDeleteButton(
                categoryId,
                record
            )
        );

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });


    table.appendChild(tableBody);

    tableScroll.appendChild(table);

    adminContent.appendChild(tableScroll);
}


/* =========================================================
   RENDER IMAGES
========================================================= */

function renderAdminImages(records){

    adminContent.innerHTML = '';

    const imageGrid =
        document.createElement('div');

    Object.assign(imageGrid.style,{

        display:'grid',

        gridTemplateColumns:
            'repeat(auto-fill, minmax(145px, 1fr))',

        gap:'12px',

        width:'100%'
    });


    records.forEach(function(record){

        const imageUrl =
            record.image_url;

        const imageCard =
            document.createElement('div');

        imageCard.dataset.adminSearch =
            [
                record.id,
                record.image_path,
                record.created_at
            ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        Object.assign(imageCard.style,{

            position:'relative',

            width:'100%',

            padding:'8px',

            border:'1px solid #eeeeee',
            borderRadius:'16px',

            background:'#ffffff',

            boxSizing:'border-box'
        });


        const image =
            document.createElement('img');

        image.src = imageUrl;
        image.alt = 'Uploaded image';

        Object.assign(image.style,{

            display:'block',

            width:'100%',
            aspectRatio:'1 / 1',

            objectFit:'cover',

            borderRadius:'12px',

            background:'#ffe5ef',

            cursor:'pointer'
        });


        image.addEventListener('click',function(){

            openAdminImageSheet(imageUrl);
        });


        const imageBottom =
            document.createElement('div');

        Object.assign(imageBottom.style,{

            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',

            gap:'8px',

            padding:'8px 2px 0'
        });


        const imageDate =
            document.createElement('span');

        imageDate.textContent =
            `ID: ${record.id ?? '—'} • ${formatAdminDate(record.created_at)}`;

        Object.assign(imageDate.style,{

            color:'#777',

            fontFamily:'Poppins, sans-serif',
            fontSize:'11px',

            overflow:'hidden',
            whiteSpace:'nowrap',
            textOverflow:'ellipsis'
        });


        imageBottom.appendChild(imageDate);

        imageBottom.appendChild(
            createAdminDeleteButton(
                'images',
                record
            )
        );


        imageCard.appendChild(image);
        imageCard.appendChild(imageBottom);

        imageGrid.appendChild(imageCard);
    });


    adminContent.appendChild(imageGrid);
}
/* =========================================================
   PDF VIEW BOTTOM SHEET
========================================================= */

const adminPdfBackdrop =
    document.createElement('div');

Object.assign(adminPdfBackdrop.style,{

    position:'fixed',
    inset:'0',

    zIndex:'10000060',

    display:'none',
    alignItems:'flex-end',
    justifyContent:'center',

    background:'rgba(0,0,0,.55)'
});


const adminPdfSheet =
    document.createElement('div');

Object.assign(adminPdfSheet.style,{

    position:'relative',

    width:'100%',
    maxWidth:'900px',

    height:'88vh',
    maxHeight:'88vh',

    padding:
        '54px 12px calc(12px + env(safe-area-inset-bottom))',

    background:'#ffffff',

    borderRadius:'24px 24px 0 0',

    overflow:'hidden',

    boxSizing:'border-box'
});


/* TOP DRAG LINE */

const adminPdfDragLine =
    document.createElement('div');

Object.assign(adminPdfDragLine.style,{

    position:'absolute',

    top:'10px',
    left:'50%',

    width:'44px',
    height:'5px',

    transform:'translateX(-50%)',

    borderRadius:'999px',

    background:'#d2d2d2'
});


/* CLOSE BUTTON */

const adminPdfSheetClose =
    document.createElement('button');

adminPdfSheetClose.type = 'button';


adminPdfSheetClose.innerHTML =
    '<i class="fa-solid fa-xmark"></i>';

Object.assign(adminPdfSheetClose.style,{

    position:'absolute',

    top:'9px',
    right:'12px',

    width:'38px',
    height:'38px',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    border:'none',
    borderRadius:'50%',

    background:'#f2f2f2',
    color:'#222222',

    fontSize:'19px',

    cursor:'pointer',

    WebkitTapHighlightColor:'transparent'
});


/* PDF FRAME */

const adminPdfFrame =
    document.createElement('iframe');

adminPdfFrame.title = 'PDF viewer';

Object.assign(adminPdfFrame.style,{

    display:'block',

    width:'100%',
    height:'100%',

    border:'none',
    borderRadius:'14px',

    background:'#f5f5f5'
});


/* OPEN PDF IN NEW TAB BUTTON */



let currentAdminPdfUrl = '';


adminPdfSheet.appendChild(adminPdfDragLine);
adminPdfSheet.appendChild(adminPdfSheetClose);
adminPdfSheet.appendChild(adminPdfFrame);

adminPdfBackdrop.appendChild(adminPdfSheet);

document.body.appendChild(adminPdfBackdrop);


/* =========================================================
   OPEN PDF SHEET
========================================================= */

function openAdminPdfSheet(pdfUrl){

    if(!pdfUrl){
        console.warn('PDF URL is missing');
        return;
    }

    currentAdminPdfUrl = pdfUrl;

    adminPdfFrame.src = pdfUrl;

    adminPdfBackdrop.style.display = 'flex';

    document.body.style.overflow = 'hidden';
}


/* =========================================================
   CLOSE PDF SHEET
========================================================= */

function closeAdminPdfSheet(){

    adminPdfBackdrop.style.display = 'none';

    adminPdfFrame.removeAttribute('src');

    currentAdminPdfUrl = '';

    document.body.style.overflow = '';
}


/* CLOSE BUTTON */

adminPdfSheetClose.addEventListener(
    'click',
    closeAdminPdfSheet
);


/* =========================================================
   ADMIN PDF SHEET — EDGE SWIPE BACK TO ADMIN PAGE
========================================================= */

let adminPdfSwipeStartX = 0;
let adminPdfSwipeStartY = 0;
let adminPdfSwipeEndX = 0;
let adminPdfSwipeEndY = 0;

const adminPdfSwipeEdgeSize = 35;
const adminPdfSwipeMinimumDistance = 80;


/* TOUCH START */
adminPdfSheet.addEventListener(
    'touchstart',
    function(event){

        if(
            adminPdfBackdrop.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminPdfSwipeStartX =
            touch.clientX;

        adminPdfSwipeStartY =
            touch.clientY;

        adminPdfSwipeEndX =
            touch.clientX;

        adminPdfSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
adminPdfSheet.addEventListener(
    'touchmove',
    function(event){

        if(
            adminPdfBackdrop.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminPdfSwipeEndX =
            touch.clientX;

        adminPdfSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
adminPdfSheet.addEventListener(
    'touchend',
    function(){

        if(
            adminPdfBackdrop.style.display !==
                'flex'
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            adminPdfSwipeEndX -
            adminPdfSwipeStartX;

        const verticalDistance =
            adminPdfSwipeEndY -
            adminPdfSwipeStartY;


        /* IGNORE PDF UP/DOWN SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            adminPdfSwipeStartX <=
                adminPdfSwipeEdgeSize &&
            horizontalDistance >=
                adminPdfSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            adminPdfSwipeStartX >=
                screenWidth -
                adminPdfSwipeEdgeSize &&
            horizontalDistance <=
                -adminPdfSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            adminPdfSheetClose.click();
        }
    },
    {
        passive:true
    }
);

/* CLOSE WHEN BACKDROP IS CLICKED */

adminPdfBackdrop.addEventListener(
    'click',
    function(event){

        if(event.target === adminPdfBackdrop){
            closeAdminPdfSheet();
        }
    }
);


/* PREVENT SHEET CLICK FROM CLOSING */

adminPdfSheet.addEventListener(
    'click',
    function(event){
        event.stopPropagation();
    }
);


/* ESCAPE KEY CLOSE */

document.addEventListener(
    'keydown',
    function(event){

        if(
            event.key === 'Escape' &&
            adminPdfBackdrop.style.display === 'flex'
        ){
            closeAdminPdfSheet();
        }
    }
);
function renderAdminPdfs(records){

    adminContent.innerHTML = '';

    records.forEach(function(record,index){

        const pdfRow =
            document.createElement('div');

        pdfRow.dataset.adminSearch =
            [
                record.id,
                record.pdf_path,
                record.created_at,
                `PDF ${index + 1}`
            ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        Object.assign(pdfRow.style,{

            display:'flex',
            alignItems:'center',
            gap:'10px',

            width:'100%',
            marginBottom:'10px',
            padding:'12px',

            border:'1px solid #eeeeee',
            borderRadius:'14px',

            background:'#ffffff',
            boxSizing:'border-box'
        });


        const pdfIcon =
            document.createElement('div');

        pdfIcon.innerHTML =
            '<i class="fa-solid fa-file-pdf"></i>';

        Object.assign(pdfIcon.style,{

            width:'44px',
            height:'44px',

            display:'flex',
            alignItems:'center',
            justifyContent:'center',

            flex:'0 0 auto',

            borderRadius:'12px',

            background:'#fff0f2',
            color:'#e53935',

            fontSize:'22px'
        });


        const pdfInfo =
            document.createElement('div');

        Object.assign(pdfInfo.style,{

            minWidth:'0',
            flex:'1'
        });


        const pdfName =
            document.createElement('div');

        pdfName.textContent =
            record.pdf_path
                ? record.pdf_path.split('/').pop()
                : `PDF ${index + 1}`;

        Object.assign(pdfName.style,{

            color:'#222',

            fontFamily:'Poppins, sans-serif',
            fontSize:'14px',
            fontWeight:'600',

            overflow:'hidden',
            whiteSpace:'nowrap',
            textOverflow:'ellipsis'
        });


        const pdfDate =
            document.createElement('div');

        pdfDate.textContent =
            `ID: ${record.id ?? '—'} • ${formatAdminDate(record.created_at)}`;

        Object.assign(pdfDate.style,{

            marginTop:'3px',

            color:'#888',

            fontFamily:'Poppins, sans-serif',
            fontSize:'11px'
        });


        pdfInfo.appendChild(pdfName);
        pdfInfo.appendChild(pdfDate);


        const viewPdfButton =
            document.createElement('button');

        viewPdfButton.type = 'button';

        viewPdfButton.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

        Object.assign(viewPdfButton.style,{

            width:'38px',
            height:'38px',

            display:'flex',
            alignItems:'center',
            justifyContent:'center',

            flex:'0 0 auto',

            border:'none',
            borderRadius:'10px',

            background:'#f2f2f2',
            color:'#333',

            fontSize:'16px',
            cursor:'pointer'
        });


        viewPdfButton.addEventListener('click',function(){

            openAdminPdfSheet(record.pdf_url);
        });


        pdfRow.appendChild(pdfIcon);
        pdfRow.appendChild(pdfInfo);
        pdfRow.appendChild(viewPdfButton);

        pdfRow.appendChild(
            createAdminDeleteButton(
                'pdf',
                record
            )
        );

        adminContent.appendChild(pdfRow);
    });
}



/* =========================================================
   ADMIN MANAGEMENT
========================================================= */

async function deleteManagedAdmin(record,deleteButton){

    const { count, error:countError } =
        await adminSupabase
            .from('admin_login')
            .select('*',{ count:'exact', head:true });

    if(countError){
        console.error('Admin count failed:',countError);
        return;
    }

    if(Number(count || 0) <= 1){
        return;
    }

    deleteButton.disabled = true;
    deleteButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';

    let query =
        adminSupabase
            .from('admin_login')
            .delete();

    if(record.id !== undefined && record.id !== null){
        query = query.eq('id',record.id);
    }
    else{
        query = query.eq('mobile_number',record.mobile_number);
    }

    const { error } = await query;

    if(error){
        console.error('Admin delete failed:',error);
        deleteButton.disabled = false;
        deleteButton.innerHTML =
            '<i class="fa-solid fa-trash"></i>';
        return;
    }

    await loadAdminCategoryData('admins');
    await loadAllAdminSummaries();
}

function renderAdminManagement(records){

    adminContent.innerHTML = '';

    const form = document.createElement('form');

    Object.assign(form.style,{
        width:'100%',
        maxWidth:'520px',
        margin:'0 0 18px',
        padding:'16px',
        border:'1px solid #eeeeee',
        borderRadius:'16px',
        background:'#ffffff',
        boxSizing:'border-box'
    });

    const title = document.createElement('div');
    title.textContent = 'Add Admin';

    Object.assign(title.style,{
        marginBottom:'14px',
        color:'#222',
        fontFamily:'Poppins, sans-serif',
        fontSize:'16px',
        fontWeight:'700'
    });

    const mobileInput = document.createElement('input');
    mobileInput.type = 'tel';
    mobileInput.inputMode = 'numeric';
    mobileInput.maxLength = 10;
    mobileInput.placeholder = '10-digit mobile number';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';

    [mobileInput,passwordInput].forEach(function(input){
        Object.assign(input.style,{
            width:'100%',
            height:'46px',
            marginBottom:'10px',
            padding:'0 14px',
            border:'1px solid #dddddd',
            borderRadius:'12px',
            outline:'none',
            background:'#f8f8f8',
            color:'#222',
            fontFamily:'Poppins, sans-serif',
            fontSize:'14px',
            boxSizing:'border-box'
        });
    });

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save Admin';

    Object.assign(saveButton.style,{
        width:'100%',
        height:'46px',
        border:'none',
        borderRadius:'12px',
        background:'#d39b00',
        color:'#ffffff',
        fontFamily:'Poppins, sans-serif',
        fontSize:'14px',
        fontWeight:'700',
        cursor:'pointer'
    });

    const status = document.createElement('div');

    Object.assign(status.style,{
        minHeight:'18px',
        marginTop:'9px',
        color:'#777',
        fontFamily:'Poppins, sans-serif',
        fontSize:'12px'
    });

    mobileInput.addEventListener('input',function(){
        mobileInput.value =
            mobileInput.value.replace(/\D/g,'').slice(0,10);
    });

    form.addEventListener('submit',async function(event){

        event.preventDefault();

        const mobile = mobileInput.value.trim();
        const password = passwordInput.value;

        status.textContent = '';

        if(!/^[0-9]{10}$/.test(mobile)){
            status.textContent =
                'Enter a valid 10-digit mobile number';
            return;
        }

        if(password.trim().length < 4){
            status.textContent =
                'Password must contain at least 4 characters';
            return;
        }

        saveButton.disabled = true;
        saveButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i>';

        const { data:existing, error:checkError } =
            await adminSupabase
                .from('admin_login')
                .select('mobile_number')
                .eq('mobile_number',mobile)
                .maybeSingle();

        if(checkError){
            console.error('Admin check failed:',checkError);
            status.textContent = 'Unable to save admin';
            saveButton.disabled = false;
            saveButton.textContent = 'Save Admin';
            return;
        }

        if(existing){
            status.textContent =
                'This mobile number is already an admin';
            saveButton.disabled = false;
            saveButton.textContent = 'Save Admin';
            return;
        }

        const { error:insertError } =
            await adminSupabase
                .from('admin_login')
                .insert({
                    mobile_number:mobile,
                    password:password,
                    role:'admin',
                    name:'Administrator'
                });

        if(insertError){
            console.error('Admin insert failed:',insertError);
            status.textContent = 'Unable to save admin';
            saveButton.disabled = false;
            saveButton.textContent = 'Save Admin';
            return;
        }

        mobileInput.value = '';
        passwordInput.value = '';
        status.textContent = 'Admin saved';
        saveButton.disabled = false;
        saveButton.textContent = 'Save Admin';

        await loadAdminCategoryData('admins');
        await loadAllAdminSummaries();
    });

    form.appendChild(title);
    form.appendChild(mobileInput);
    form.appendChild(passwordInput);
    form.appendChild(saveButton);
    form.appendChild(status);

    adminContent.appendChild(form);

    const listTitle = document.createElement('div');
    listTitle.textContent = 'Current Admins';

    Object.assign(listTitle.style,{
        margin:'4px 0 10px',
        color:'#222',
        fontFamily:'Poppins, sans-serif',
        fontSize:'15px',
        fontWeight:'700'
    });

    adminContent.appendChild(listTitle);

    records.forEach(function(record,index){

        const row = document.createElement('div');
        row.dataset.adminSearch =
            String(record.mobile_number || '').toLowerCase();

        Object.assign(row.style,{
            display:'flex',
            alignItems:'center',
            gap:'12px',
            width:'100%',
            maxWidth:'520px',
            marginBottom:'9px',
            padding:'12px',
            border:'1px solid #eeeeee',
            borderRadius:'14px',
            background:'#ffffff',
            boxSizing:'border-box'
        });

        const icon = document.createElement('div');
        icon.innerHTML =
            '<i class="fa-solid fa-user-shield"></i>';

        Object.assign(icon.style,{
            width:'42px',
            height:'42px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flex:'0 0 auto',
            borderRadius:'12px',
            background:'#fff6d8',
            color:'#d39b00',
            fontSize:'18px'
        });

        const info = document.createElement('div');
        info.style.flex = '1';
        info.style.minWidth = '0';

        const mobile = document.createElement('div');
        mobile.textContent = record.mobile_number || '—';

        Object.assign(mobile.style,{
            color:'#222',
            fontFamily:'Poppins, sans-serif',
            fontSize:'14px',
            fontWeight:'700'
        });

        const role = document.createElement('div');
        role.textContent = index === 0 ? 'Primary admin' : 'Admin';

        Object.assign(role.style,{
            marginTop:'2px',
            color:'#888',
            fontFamily:'Poppins, sans-serif',
            fontSize:'11px'
        });

        info.appendChild(mobile);
        info.appendChild(role);

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        Object.assign(deleteButton.style,{
            width:'38px',
            height:'38px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flex:'0 0 auto',
            border:'none',
            borderRadius:'10px',
            background:'#fff0f2',
            color:'#e53935',
            fontSize:'16px',
            cursor:'pointer'
        });

        deleteButton.addEventListener('click',function(){
            deleteManagedAdmin(record,deleteButton);
        });

        row.appendChild(icon);
        row.appendChild(info);
        row.appendChild(deleteButton);

        adminContent.appendChild(row);
    });
}


/* =========================================================
   LOAD DATA FROM SUPABASE
========================================================= */

async function loadAdminCategoryData(categoryId){

    const config =
        adminTableConfig[categoryId];

    if(!config){

        showAdminMessage(
            'Category configuration not found'
        );

        return;
    }


    if(!adminSupabase){

        showAdminMessage(
            'Supabase client not found'
        );

        console.error(
            'window.supabaseClient is not available'
        );

        return;
    }


    showAdminLoadingShimmer(categoryId);


    try{

        const { data, error } =
            await adminSupabase
                .from(config.table)
                .select('*')
                .order(
                    'created_at',
                    { ascending:false }
                );


        if(error){
            throw error;
        }


        const records = data || [];



        if(records.length === 0 && categoryId !== 'admins'){

            const emptyCategory =
                adminCategories.find(function(item){
                    return item.id === categoryId;
                });

            showAdminMessage(
                `No ${
                    emptyCategory
                        ? emptyCategory.title
                        : 'records'
                } found`
            );

            return;
        }


        if(categoryId === 'images'){

            renderAdminImages(records);
        }

        else if(categoryId === 'pdf'){

            renderAdminPdfs(records);
        }

        else if(categoryId === 'admins'){

            renderAdminManagement(records);
        }

        else{

            renderAdminDataTable(
                categoryId,
                records,
                config
            );
        }

    }
    catch(error){

        console.error(
            'Admin data loading failed:',
            error
        );

        showAdminMessage(
            error.message ||
            'Unable to load data'
        );
    }
}


/* =========================================================
   CHANGE CATEGORY
========================================================= */

async function showAdminCategory(categoryId){

    currentAdminCategory = categoryId;


    const selectedCategory =
        adminCategories.find(function(item){

            return item.id === categoryId;
        });


    adminSearchInput.value = '';

    adminSearchClear.style.display = 'none';


    adminSearchInput.placeholder =
        selectedCategory
            ? `Search ${selectedCategory.title}`
            : 'Search';


    adminCategoryRow
        .querySelectorAll('button')
        .forEach(function(button){

            const isActive =
                button.dataset.category === categoryId;

            button.style.background =
                isActive
                    ? '#d39b00'
                    : '#f3f3f3';

            button.style.color =
                isActive
                    ? '#ffffff'
                    : '#333333';

            button.style.borderColor =
                isActive
                    ? '#d39b00'
                    : '#e4e4e4';
        });


    await loadAdminCategoryData(categoryId);
}


/* CREATE CATEGORY BUTTONS */

       

adminCategories.forEach(function(category){

    const categoryBtn = document.createElement('button');

    categoryBtn.type = 'button';
    categoryBtn.dataset.category = category.id;
    categoryBtn.textContent = category.title;

    Object.assign(categoryBtn.style,{
        flex:'0 0 auto',
        minHeight:'40px',
        padding:'8px 16px',
        border:'1px solid #e4e4e4',
        borderRadius:'999px',
        background:'#f3f3f3',
        color:'#333',
        fontFamily:'Poppins, sans-serif',
        fontSize:'14px',
        fontWeight:'600',
        whiteSpace:'nowrap',
        cursor:'pointer',
        transition:'all .2s ease',
        WebkitTapHighlightColor:'transparent'
    });

    categoryBtn.addEventListener('click',function(){

        showAdminCategory(category.id);

        const targetLeft =
            categoryBtn.offsetLeft -
            (
                adminCategoryScroll.clientWidth -
                categoryBtn.offsetWidth
            ) / 2;

        adminCategoryScroll.scrollTo({
            left:Math.max(0,targetLeft),
            behavior:'smooth'
        });

    });

    adminCategoryRow.appendChild(categoryBtn);
});


/* ADD EVERYTHING TO PAGE */

adminAccessPage.appendChild(adminCategoryScroll);
adminAccessPage.appendChild(adminSummaryWrap);
adminAccessPage.appendChild(adminSearchWrap);
adminAccessPage.appendChild(adminContent);

/* DEFAULT OPEN CATEGORY */

document.body.appendChild(adminAccessPage);
loadAllAdminSummaries();
showAdminCategory('chavithi');

        /* CLOSE ADMIN PAGE */

        adminCloseBtn.addEventListener(
    'click',
    function(){

        adminAccessPage.style.display =
            'none';

        document.body.style.overflow =
            '';

        setTimeout(function(){

            if(
                typeof openMenuSheet ===
                'function'
            ){
                openMenuSheet();
            }

        }, 150);
    }
);
/* =========================================================
   ADMIN ACCESS PAGE — EDGE SWIPE TO SERVICE MENU
========================================================= */

let adminPageSwipeStartX = 0;
let adminPageSwipeStartY = 0;
let adminPageSwipeEndX = 0;
let adminPageSwipeEndY = 0;

const adminPageSwipeEdgeSize = 35;
const adminPageSwipeMinimumDistance = 80;


/* TOUCH START */
adminAccessPage.addEventListener(
    'touchstart',
    function(event){

        /*
         Do not close the main page while its
         image or PDF bottom sheet is open.
        */
        if(
            adminImageBackdrop.style.display ===
                'flex' ||
            adminPdfBackdrop.style.display ===
                'flex' ||
            adminAccessPage.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminPageSwipeStartX =
            touch.clientX;

        adminPageSwipeStartY =
            touch.clientY;

        adminPageSwipeEndX =
            touch.clientX;

        adminPageSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
adminAccessPage.addEventListener(
    'touchmove',
    function(event){

        if(
            adminImageBackdrop.style.display ===
                'flex' ||
            adminPdfBackdrop.style.display ===
                'flex' ||
            adminAccessPage.style.display !==
                'flex' ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        adminPageSwipeEndX =
            touch.clientX;

        adminPageSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
adminAccessPage.addEventListener(
    'touchend',
    function(){

        if(
            adminImageBackdrop.style.display ===
                'flex' ||
            adminPdfBackdrop.style.display ===
                'flex' ||
            adminAccessPage.style.display !==
                'flex'
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            adminPageSwipeEndX -
            adminPageSwipeStartX;

        const verticalDistance =
            adminPageSwipeEndY -
            adminPageSwipeStartY;


        /* IGNORE NORMAL UP/DOWN SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            adminPageSwipeStartX <=
                adminPageSwipeEdgeSize &&
            horizontalDistance >=
                adminPageSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            adminPageSwipeStartX >=
                screenWidth -
                adminPageSwipeEdgeSize &&
            horizontalDistance <=
                -adminPageSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            adminCloseBtn.click();
        }
    },
    {
        passive:true
    }
);
    }


    /* OPEN ADMIN PAGE */

    openAdminAccessBtn.addEventListener('click', function(){

        if(typeof window.loadAllAdminSummaries === 'function'){
            window.loadAllAdminSummaries();
        }

        /*
         Close existing service menu bottom sheet.
        */
        const menuSheet =
            document.getElementById('menuSheet');

        const sheetBackdrop =
            document.querySelector('.sheet-backdrop');

        if(menuSheet){
            menuSheet.classList.remove('show');
        }

        if(sheetBackdrop){
            sheetBackdrop.classList.remove('show');
        }

        adminAccessPage.style.display = 'flex';
        adminAccessPage.scrollTop = 0;

        document.body.style.overflow = 'hidden';

    });

})();