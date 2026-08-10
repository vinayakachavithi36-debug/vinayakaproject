/* =========================================================
   DOWNLOAD PDF DETAILS SHEET
========================================================= */

const downloadPdfSheet =
    document.getElementById("downloadPdfSheet");

const openDownloadPdfButton =
    document.getElementById("openDownloadPdfBtn");

const closeDownloadPdfButton =
    document.getElementById("closeDownloadPdfSheet");

const downloadPdfType =
    document.getElementById("downloadPdfType");

const downloadPdfYear =
    document.getElementById("downloadPdfYear");

const downloadSelectedPdfButton =
    document.getElementById("downloadSelectedPdfBtn");

const downloadPdfMessage =
    document.getElementById("downloadPdfMessage");


let downloadProgressTimer = null;
let downloadPdfMessageTimer = null;
let currentDownloadProgress = 0;


/* =========================================================
   PDF TYPES — SAME SEPARATE CATEGORIES AS ADMIN
========================================================= */
function setupSeparatedPdfTypes(){

    if(!downloadPdfType){
        return;
    }

    const currentValue =
        downloadPdfType.value || "";

    downloadPdfType.innerHTML = `
        <option value="">Select PDF</option>

        <option value="chavithi_donations">
            Chavithi Donations
        </option>

        <option value="santharpana_donations">
            Santharpana Donations
        </option>

        <option value="chavithi_expenses">
            Chavithi Expenses
        </option>

        <option value="santharpana_expenses">
            Santharpana Expenses
        </option>

        <option value="old_chavithi_donations">
            Old Chavithi Donations
        </option>

        <option value="old_santharpana_donations">
            Old Santharpana Donations
        </option>

        <option value="old_chavithi_expenses">
            Old Chavithi Expenses
        </option>

        <option value="old_santharpana_expenses">
            Old Santharpana Expenses
        </option>
    `;

    if(
        Array.from(downloadPdfType.options)
            .some(option => option.value === currentValue)
    ){
        downloadPdfType.value =
            currentValue;
    }
}


setupSeparatedPdfTypes();


function showDownloadPdfMessage(
    message,
    color = "#475569",
    autoHide = false
){
    if(!downloadPdfMessage){
        return;
    }

    if(downloadPdfMessageTimer){
        clearTimeout(downloadPdfMessageTimer);
        downloadPdfMessageTimer = null;
    }

    downloadPdfMessage.textContent =
        message || "";

    downloadPdfMessage.style.color =
        color;

    if(autoHide && message){
        downloadPdfMessageTimer =
            window.setTimeout(function(){
                downloadPdfMessage.textContent = "";
                downloadPdfMessageTimer = null;
            }, 5000);
    }
}


function updateDownloadPdfButtonState(){
    if(!downloadSelectedPdfButton){
        return;
    }

    const selectedType =
        downloadPdfType?.value || "";

    const selectedYear =
        Number(downloadPdfYear?.value || 0);

    const validYear =
        Number.isInteger(selectedYear) &&
        selectedYear >= 2000 &&
        selectedYear <= 2100;

    downloadSelectedPdfButton.disabled =
        !selectedType ||
        !validYear;
}


/* =========================================================
   OPEN DOWNLOAD PDF SHEET
========================================================= */

openDownloadPdfButton?.addEventListener("click", function(){

    menuSheet?.classList.remove("show");
    menuSheet?.setAttribute("aria-hidden", "true");

    resetDownloadPdfSheet();

    downloadPdfSheet.classList.add("show");
    downloadPdfSheet.setAttribute("aria-hidden", "false");

    sheetBackdrop?.classList.add("show");
});


/* =========================================================
   CLOSE DOWNLOAD PDF SHEET
========================================================= */
function closeDownloadPdfSheet(){

    stopDownloadProgress();

    if(document.activeElement instanceof HTMLElement){
        document.activeElement.blur();
    }

    downloadPdfSheet.classList.remove("show");

    downloadPdfSheet.setAttribute(
        "aria-hidden",
        "true"
    );

    resetDownloadPdfSheet();

    setTimeout(function(){

        /* Ensure download sheet is fully closed */
        downloadPdfSheet.classList.remove("show");

        openMenuSheet();

    }, 150);
}
closeDownloadPdfButton?.addEventListener(
    "click",
    closeDownloadPdfSheet
);

/* =========================================================
   DOWNLOAD PDF SHEET — EDGE SWIPE TO SERVICE MENU
========================================================= */

let downloadPdfSwipeStartX = 0;
let downloadPdfSwipeStartY = 0;
let downloadPdfSwipeEndX = 0;
let downloadPdfSwipeEndY = 0;

const downloadPdfSwipeEdgeSize = 35;
const downloadPdfSwipeMinimumDistance = 80;


/* TOUCH START */
downloadPdfSheet?.addEventListener(
    "touchstart",
    function(event){

        if(
            !downloadPdfSheet.classList.contains("show") ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        downloadPdfSwipeStartX =
            touch.clientX;

        downloadPdfSwipeStartY =
            touch.clientY;

        downloadPdfSwipeEndX =
            touch.clientX;

        downloadPdfSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
downloadPdfSheet?.addEventListener(
    "touchmove",
    function(event){

        if(
            !downloadPdfSheet.classList.contains("show") ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        downloadPdfSwipeEndX =
            touch.clientX;

        downloadPdfSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
downloadPdfSheet?.addEventListener(
    "touchend",
    function(){

        if(
            !downloadPdfSheet.classList.contains("show")
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            downloadPdfSwipeEndX -
            downloadPdfSwipeStartX;

        const verticalDistance =
            downloadPdfSwipeEndY -
            downloadPdfSwipeStartY;


        /* IGNORE NORMAL UP/DOWN SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            downloadPdfSwipeStartX <=
                downloadPdfSwipeEdgeSize &&
            horizontalDistance >=
                downloadPdfSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            downloadPdfSwipeStartX >=
                screenWidth -
                downloadPdfSwipeEdgeSize &&
            horizontalDistance <=
                -downloadPdfSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            closeDownloadPdfSheet();
        }
    },
    {
        passive:true
    }
);
/* =========================================================
   RESET DOWNLOAD PDF SHEET
========================================================= */

function resetDownloadPdfSheet(){

    if(downloadPdfType){
        downloadPdfType.value = "";
    }

    if(downloadPdfYear){
        downloadPdfYear.value = "";
        downloadPdfYear.disabled = false;
    }

    if(downloadPdfMessageTimer){
        clearTimeout(downloadPdfMessageTimer);
        downloadPdfMessageTimer = null;
    }

    if(downloadSelectedPdfButton){

        downloadSelectedPdfButton.disabled = true;

        downloadSelectedPdfButton.innerHTML = `
            <i class="fa-solid fa-file-arrow-down"></i>
            Download PDF
        `;
    }

    showDownloadPdfMessage(
        "",
        "#475569"
    );

    currentDownloadProgress = 0;
}


/* =========================================================
   ENABLE BUTTON AFTER PDF SELECTION
========================================================= */

downloadPdfType?.addEventListener(
    "change",
    function(){
        showDownloadPdfMessage(
            "",
            "#475569"
        );

        updateDownloadPdfButtonState();
    }
);


downloadPdfYear?.addEventListener(
    "input",
    function(){
        this.value =
            this.value
                .replace(/\D/g, "")
                .slice(0, 4);

        showDownloadPdfMessage(
            "",
            "#475569"
        );

        updateDownloadPdfButtonState();
    }
);


/* =========================================================
   DOWNLOAD PROGRESS
========================================================= */

function updateDownloadProgress(percent){

    currentDownloadProgress = Math.max(
        0,
        Math.min(100, Math.round(percent))
    );

    downloadSelectedPdfButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Preparing PDF ${currentDownloadProgress}%
    `;
}


function startDownloadProgress(){

    stopDownloadProgress();

    currentDownloadProgress = 1;
    updateDownloadProgress(currentDownloadProgress);

    downloadProgressTimer = window.setInterval(function(){

        if(currentDownloadProgress < 35){

            currentDownloadProgress += 3;

        }else if(currentDownloadProgress < 70){

            currentDownloadProgress += 2;

        }else if(currentDownloadProgress < 92){

            currentDownloadProgress += 1;
        }

        if(currentDownloadProgress >= 92){

            currentDownloadProgress = 92;
            stopDownloadProgress();
        }

        updateDownloadProgress(currentDownloadProgress);

    }, 120);
}


function stopDownloadProgress(){

    if(downloadProgressTimer){

        clearInterval(downloadProgressTimer);
        downloadProgressTimer = null;
    }
}


async function completeDownloadProgress(){

    stopDownloadProgress();

    while(currentDownloadProgress < 100){

        currentDownloadProgress += 2;

        if(currentDownloadProgress > 100){
            currentDownloadProgress = 100;
        }

        updateDownloadProgress(currentDownloadProgress);

        await waitForPdfProgress(25);
    }
}


function waitForPdfProgress(milliseconds){

    return new Promise(function(resolve){

        window.setTimeout(resolve, milliseconds);
    });
}


/* =========================================================
   DOWNLOAD SELECTED PDF
========================================================= */

downloadSelectedPdfButton?.addEventListener(
    "click",
    async function(){

        const selectedType =
            downloadPdfType.value;

        const selectedYear =
            Number(
                downloadPdfYear?.value || 0
            );

        if(!selectedType){

            showDownloadPdfMessage(
                "Please select a PDF.",
                "#dc2626",
                true
            );

            return;
        }

        if(
            !Number.isInteger(selectedYear) ||
            selectedYear < 2000 ||
            selectedYear > 2100
        ){

            showDownloadPdfMessage(
                "Please enter a valid year.",
                "#dc2626",
                true
            );

            downloadPdfYear?.focus();
            return;
        }

        downloadSelectedPdfButton.disabled = true;

        downloadPdfType.disabled = true;
        downloadPdfYear.disabled = true;

        showDownloadPdfMessage(
            "",
            "#475569"
        );

        startDownloadProgress();

        try{

            if(selectedType === "chavithi_donations"){

                await downloadTablePdf(
                    "chavithi_donations",
                    "Chavithi Donations Report",
                    `Chavithi donation records for ${selectedYear}`,
                    `chavithi-donations-${selectedYear}.pdf`,
                    selectedYear,
                    "donation_date"
                );

            }else if(
                selectedType === "santharpana_donations"
            ){

                await downloadTablePdf(
                    "santharpana_donations",
                    "Santharpana Donations Report",
                    `Santharpana donation records for ${selectedYear}`,
                    `santharpana-donations-${selectedYear}.pdf`,
                    selectedYear,
                    "donation_date"
                );

            }else if(
                selectedType === "chavithi_expenses"
            ){

                await downloadTablePdf(
                    "chavithi_expenses",
                    "Chavithi Expenses Report",
                    `Chavithi expense records for ${selectedYear}`,
                    `chavithi-expenses-${selectedYear}.pdf`,
                    selectedYear,
                    "expense_date",
                    {
                        fields:[
                            "expense_type"
                        ],
                        type:"chavithi"
                    }
                );

            }else if(
                selectedType === "santharpana_expenses"
            ){

                await downloadTablePdf(
                    "chavithi_expenses",
                    "Santharpana Expenses Report",
                    `Santharpana expense records for ${selectedYear}`,
                    `santharpana-expenses-${selectedYear}.pdf`,
                    selectedYear,
                    "expense_date",
                    {
                        fields:[
                            "expense_type"
                        ],
                        type:"santharpana"
                    }
                );

            }else if(
                selectedType === "old_chavithi_donations"
            ){

                await downloadTablePdf(
                    "olddonation",
                    "Old Chavithi Donations Report",
                    `Old Chavithi donation records for ${selectedYear}`,
                    `old-chavithi-donations-${selectedYear}.pdf`,
                    selectedYear,
                    "donation_date",
                    {
                        fields:[
                            "donation_type",
                            "donation_category",
                            "category",
                            "type"
                        ],
                        type:"chavithi"
                    }
                );

            }else if(
                selectedType === "old_santharpana_donations"
            ){

                await downloadTablePdf(
                    "olddonation",
                    "Old Santharpana Donations Report",
                    `Old Santharpana donation records for ${selectedYear}`,
                    `old-santharpana-donations-${selectedYear}.pdf`,
                    selectedYear,
                    "donation_date",
                    {
                        fields:[
                            "donation_type",
                            "donation_category",
                            "category",
                            "type"
                        ],
                        type:"santharpana"
                    }
                );

            }else if(
                selectedType === "old_chavithi_expenses"
            ){

                await downloadTablePdf(
                    "old_expenses",
                    "Old Chavithi Expenses Report",
                    `Old Chavithi expense records for ${selectedYear}`,
                    `old-chavithi-expenses-${selectedYear}.pdf`,
                    selectedYear,
                    "expense_date",
                    {
                        fields:[
                            "donation_type"
                        ],
                        type:"chavithi"
                    }
                );

            }else if(
                selectedType === "old_santharpana_expenses"
            ){

                await downloadTablePdf(
                    "old_expenses",
                    "Old Santharpana Expenses Report",
                    `Old Santharpana expense records for ${selectedYear}`,
                    `old-santharpana-expenses-${selectedYear}.pdf`,
                    selectedYear,
                    "expense_date",
                    {
                        fields:[
                            "donation_type"
                        ],
                        type:"santharpana"
                    }
                );
            }

            await completeDownloadProgress();

            showDownloadPdfMessage(
                "PDF downloaded successfully.",
                "#15803d",
                true
            );

            await waitForPdfProgress(600);

        }catch(error){

            stopDownloadProgress();

            console.error(
                "PDF download error:",
                error
            );

            const errorMessage =
                error?.code ===
                    "YEAR_DATA_NOT_FOUND"
                    ? "Data not found."
                    : (
                        error.message ||
                        "Unable to download PDF."
                    );

            showDownloadPdfMessage(
                errorMessage,
                "#dc2626",
                true
            );

        }finally{

            stopDownloadProgress();

            downloadPdfType.disabled = false;
            downloadPdfYear.disabled = false;

            updateDownloadPdfButtonState();

            downloadSelectedPdfButton.innerHTML = `
                <i class="fa-solid fa-file-arrow-down"></i>
                Download PDF
            `;

            currentDownloadProgress = 0;
        }
    }
);


/* =========================================================
   FETCH SUPABASE DATA AND CREATE PDF
========================================================= */

async function downloadTablePdf(
    tableName,
    pdfTitle,
    pdfSubHeading,
    fileName,
    selectedYear,
    dateColumn,
    filterConfig = null
){

    if(
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
    ){
        throw new Error(
            "jsPDF library is not loaded."
        );
    }

    const { jsPDF } =
        window.jspdf;

    updateDownloadProgress(
        Math.max(currentDownloadProgress, 12)
    );

    const yearStart =
        `${selectedYear}-01-01`;

    const yearEnd =
        `${selectedYear + 1}-01-01`;

    let { data, error } =
        await supabaseClient
            .from(tableName)
            .select("*")
            .gte(
                dateColumn,
                yearStart
            )
            .lt(
                dateColumn,
                yearEnd
            )
            .order(
                dateColumn,
                {
                    ascending:false
                }
            );

    if(error){
        throw error;
    }

    /*
     * Split shared database tables into the same categories
     * used by admin.js.
     */
    if(
        filterConfig &&
        Array.isArray(data)
    ){

        const filterFields =
            Array.isArray(filterConfig.fields)
                ? filterConfig.fields
                : [];

        const expectedType =
            String(
                filterConfig.type || ""
            )
                .trim()
                .toLowerCase();

        data = data.filter(function(record){

            let rawValue = "";

            for(
                const fieldName of filterFields
            ){

                const possibleValue =
                    record?.[fieldName];

                if(
                    possibleValue !== null &&
                    possibleValue !== undefined &&
                    String(possibleValue).trim()
                ){
                    rawValue =
                        String(possibleValue);

                    break;
                }
            }

            const value =
                rawValue
                    .trim()
                    .toLowerCase();

            if(expectedType === "chavithi"){

                return (
                    value.includes("chavithi") ||
                    value.includes("చవితి")
                );
            }

            if(expectedType === "santharpana"){

                return (
                    value.includes("santharpana") ||
                    value.includes("సంతర్పణ")
                );
            }

            return true;
        });
    }

    if(!data || data.length === 0){

        const noDataError =
            new Error(
                "Data not found."
            );

        noDataError.code =
            "YEAR_DATA_NOT_FOUND";

        throw noDataError;
    }

    updateDownloadProgress(
        Math.max(currentDownloadProgress, 48)
    );

    const pdf = new jsPDF({
        orientation:"landscape",
        unit:"mm",
        format:"a4"
    });

    const pageWidth =
        pdf.internal.pageSize.getWidth();

    const pageHeight =
        pdf.internal.pageSize.getHeight();

/* PAGE AND FINAL TOTALS */

const isExpensePdf =
    tableName === "chavithi_expenses" ||
    tableName === "old_expenses";

const isOldDonationPdf =
    tableName === "olddonation";

const countLabel =
    isExpensePdf
        ? "Entries"
        : "Donors";

const amountLabel =
    isExpensePdf
        ? "Expense Amount"
        : "Donation Amount";

const pageSummary = {};

const finalTotalAmount =
    data.reduce(function(total, item){

        const value =
            isExpensePdf
                ? item.expense_amount
                : (
                    isOldDonationPdf
                        ? item.amount
                        : item.donation_amount
                );

        const parsedValue =
            Number(value || 0);

        return total + (
            Number.isFinite(parsedValue)
                ? parsedValue
                : 0
        );

    }, 0);
    /* =====================================================
       MAIN HEADING
    ===================================================== */

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(18);

    pdf.setTextColor(
        178,
        127,
        0
    );

    pdf.text(
        "Sri Varasidhi Vinayakha Utsava Committee",
        pageWidth / 2,
        13,
        {
            align:"center"
        }
    );


    /* =====================================================
       REPORT NAME
    ===================================================== */

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(14);

    pdf.setTextColor(
        15,
        23,
        42
    );

    pdf.text(
        pdfTitle,
        pageWidth / 2,
        21,
        {
            align:"center"
        }
    );


    /* =====================================================
       SUBHEADING
    ===================================================== */

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
        71,
        85,
        105
    );

    pdf.text(
        pdfSubHeading,
        pageWidth / 2,
        27,
        {
            align:"center"
        }
    );


    /* =====================================================
       REPORT DETAILS
    ===================================================== */

    pdf.setDrawColor(
        211,
        155,
        0
    );

    pdf.setLineWidth(.4);

    pdf.line(
        10,
        31,
        pageWidth - 10,
        31
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
        51,
        65,
        85
    );

    pdf.text(
        `Year: ${selectedYear}  |  Total Records: ${data.length}`,
        10,
        37
    );

    pdf.text(
        `Generated: ${new Date().toLocaleString("en-IN")}`,
        pageWidth - 10,
        37,
        {
            align:"right"
        }
    );


    const tableData =
        createPdfTableData(
            tableName,
            data
        );

    updateDownloadProgress(
        Math.max(currentDownloadProgress, 72)
    );


    /* =====================================================
       TABLE
    ===================================================== */

    pdf.autoTable({

    startY:42,

    head:[
        tableData.headers
    ],

    body:
        tableData.rows,

    theme:"grid",

    styles:{

        font:"helvetica",
        fontSize:7.5,

        textColor:[
            0,
            0,
            0
        ],

        lineColor:[
            190,
            190,
            190
        ],

        lineWidth:.2,

        cellPadding:2.3,

        overflow:"linebreak",

        valign:"middle"
    },


    /* COLOURED TABLE HEADING */

    headStyles:{

        fillColor:[
            211,
            155,
            0
        ],

        textColor:[
            255,
            255,
            255
        ],

        fontStyle:"bold",

        fontSize:8,

        halign:"center",

        valign:"middle",

        lineColor:[
            170,
            120,
            0
        ],

        lineWidth:.25
    },


    /* BLACK TABLE BODY TEXT */

    bodyStyles:{

        fillColor:[
            255,
            255,
            255
        ],

        textColor:[
            0,
            0,
            0
        ],

        fontStyle:"normal"
    },


    alternateRowStyles:{

        fillColor:[
            255,
            252,
            235
        ],

        textColor:[
            0,
            0,
            0
        ]
    },


    columnStyles:{

        0:{
            halign:"center",
            cellWidth:12
        }
    },


   margin:{

    top:15,
    right:10,
    bottom:22,
    left:10
},


    /* COUNT EACH RECORD ON ITS PDF PAGE */

    didDrawCell:function(hookData){

        if(
            hookData.section !== "body" ||
            hookData.column.index !== 0
        ){
            return;
        }

        const currentPage =
            pdf.internal
                .getCurrentPageInfo()
                .pageNumber;

        if(!pageSummary[currentPage]){

            pageSummary[currentPage] = {
                count:0,
                amount:0
            };
        }

        const record =
            data[hookData.row.index];

        if(!record){
            return;
        }

        const amountValue =
            isExpensePdf
                ? record.expense_amount
                : (
                    isOldDonationPdf
                        ? record.amount
                        : record.donation_amount
                );

        const parsedAmount =
            Number(amountValue || 0);

        pageSummary[currentPage].count += 1;

        if(Number.isFinite(parsedAmount)){

            pageSummary[currentPage].amount +=
                parsedAmount;
        }
    },


  didDrawPage:function(hookData){

    const currentPage =
        pdf.internal
            .getCurrentPageInfo()
            .pageNumber;

    const currentSummary =
        pageSummary[currentPage] || {
            count:0,
            amount:0
        };


    /* =====================================================
       PAGE REPORT NAME
    ===================================================== */

    if(currentPage > 1){

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(10);

        pdf.setTextColor(
            15,
            23,
            42
        );

        pdf.text(
            pdfTitle,
            pageWidth / 2,
            9,
            {
                align:"center"
            }
        );
    }


    /* =====================================================
       PAGE TOTAL ROW
    ===================================================== */

    const totalRowY =
        pageHeight - 19;

    const totalRowHeight =
        8;

    pdf.setFillColor(
        255,
        248,
        220
    );

    pdf.setDrawColor(
        170,
        120,
        0
    );

    pdf.setLineWidth(.25);

    pdf.rect(
        10,
        totalRowY,
        pageWidth - 20,
        totalRowHeight,
        "FD"
    );


    /* MIDDLE DIVIDER */

    pdf.line(
        pageWidth / 2,
        totalRowY,
        pageWidth / 2,
        totalRowY + totalRowHeight
    );


    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(8);

    pdf.setTextColor(
        0,
        0,
        0
    );


    /* PAGE DONOR / ENTRY COUNT */

    pdf.text(
        `Page Total ${countLabel}: ${currentSummary.count}`,
        14,
        totalRowY + 5.3
    );


    /* PAGE DONATION / EXPENSE AMOUNT */

    pdf.text(
        `Page Total ${amountLabel}: ${formatPdfAmount(
            currentSummary.amount
        )}`,
        pageWidth - 14,
        totalRowY + 5.3,
        {
            align:"right"
        }
    );


    /* =====================================================
       SIMPLE FOOTER
    ===================================================== */

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(7);

    pdf.setTextColor(
        71,
        85,
        105
    );

    pdf.text(
        "Sri Varasidhi Vinayakha Utsava Committee",
        10,
        pageHeight - 6
    );

    pdf.text(
        `Page ${currentPage}`,
        pageWidth - 10,
        pageHeight - 6,
        {
            align:"right"
        }
    );
}
         

        

});
/* =====================================================
   FINAL ALL-PAGE TOTAL
===================================================== */
/* =====================================================
   FINAL ALL-PAGE TOTAL
===================================================== */

let finalSummaryY =
    pdf.lastAutoTable.finalY + 10;


/* CREATE NEW PAGE ONLY IF REQUIRED */

if(finalSummaryY > pageHeight - 35){

    pdf.addPage();

    finalSummaryY = 25;

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(13);

    pdf.setTextColor(
        15,
        23,
        42
    );

    pdf.text(
        pdfTitle,
        10,
        15
    );
}


/* SMALL SEPARATOR LINE */

pdf.setDrawColor(
    211,
    155,
    0
);

pdf.setLineWidth(.35);

pdf.line(
    10,
    finalSummaryY,
    pageWidth - 10,
    finalSummaryY
);


/* FINAL TOTAL TEXT */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(10);

pdf.setTextColor(
    0,
    0,
    0
);

pdf.text(
    `Total ${countLabel}: ${data.length}`,
    10,
    finalSummaryY + 8
);

pdf.text(
    `Total ${amountLabel}: ${formatPdfAmount(
        finalTotalAmount
    )}`,
    10,
    finalSummaryY + 15
);



    updateDownloadProgress(
        Math.max(currentDownloadProgress, 94)
    );

   if (
    window.AndroidPdfDownloader &&
    typeof window.AndroidPdfDownloader.savePdf === "function"
) {

    const pdfBase64 =
        pdf.output("datauristring");

    window.AndroidPdfDownloader.savePdf(
        pdfBase64,
        fileName
    );

} else {

    pdf.save(fileName);
}
}


/* =========================================================
   PREPARE TABLE COLUMNS
========================================================= */

function createPdfTableData(
    tableName,
    records
){

    /* =====================================================
       CHAVITHI DONATIONS
    ===================================================== */

    if(tableName === "chavithi_donations"){

        return {

            headers:[
                "S.No",
                "Donor Name",
                "Mobile",
                "Category",
                "Amount",
                "Received By",
                "Payment",
                "Donation Date",
                "Additional Information",
                "Created By"
            ],

            rows:records.map(
                function(item, index){

                    return [

                        index + 1,

                        item.donor_name ||
                        "-",

                        item.donor_phone ||
                        "-",

                        item.donation_category ||
                        "-",

                        formatPdfAmount(
                            item.donation_amount
                        ),

                        item.received_by ||
                        "-",

                        item.amount_type ||
                        "-",

                        formatPdfDate(
                            item.donation_date
                        ),

                        item.additional_information ||
                        "-",

                        item.created_by_name ||
                        "-"
                    ];
                }
            )
        };
    }


    /* =====================================================
       SANTHARPANA DONATIONS
    ===================================================== */

    if(tableName === "santharpana_donations"){

        return {

            headers:[
                "S.No",
                "Donor Name",
                "Mobile",
                "Category",
                "Amount",
                "Received By",
                "Payment",
                "Donation Date",
                "Additional Information",
                "Created By"
            ],

            rows:records.map(
                function(item, index){

                    return [

                        index + 1,

                        item.donor_name ||
                        "-",

                        item.donor_phone ||
                        "-",

                        item.donation_category ||
                        "-",

                        formatPdfAmount(
                            item.donation_amount
                        ),

                        item.received_by ||
                        "-",

                        item.amount_type ||
                        "-",

                        formatPdfDate(
                            item.donation_date
                        ),

                        item.additional_information ||
                        "-",

                        item.created_by_name ||
                        "-"
                    ];
                }
            )
        };
    }


    /* =====================================================
       OLD DONATIONS
    ===================================================== */

    if(tableName === "olddonation"){

        return {

            headers:[
                "S.No",
                "Name",
                "Mobile",
                "Amount",
                "Donation Date",
                "Payment",
                "Additional Information"
            ],

            rows:records.map(
                function(item, index){

                    return [

                        index + 1,

                        item.name ||
                        "-",

                        item.mobile_number ||
                        "-",

                        formatPdfAmount(
                            item.amount
                        ),

                        formatPdfDate(
                            item.donation_date
                        ),

                        item.payment_type ||
                        "-",

                        item.additional_information ||
                        "-"
                    ];
                }
            )
        };
    }


    /* =====================================================
       OLD EXPENSES
    ===================================================== */

    if(tableName === "old_expenses"){

        return {

            headers:[
                "S.No",
                "Donation Type",
                "Description",
                "Vendor",
                "Amount",
                "Expense Date",
                "Payment",
                "Additional Information",
                "Created By"
            ],

            rows:records.map(
                function(item, index){

                    return [

                        index + 1,

                        item.donation_type ||
                        "-",

                        item.expense_description ||
                        "-",

                        item.vendor_name ||
                        "-",

                        formatPdfAmount(
                            item.expense_amount
                        ),

                        formatPdfDate(
                            item.expense_date
                        ),

                        item.payment_type ||
                        "-",

                        item.additional_information ||
                        "-",

                        item.created_by_name ||
                        "-"
                    ];
                }
            )
        };
    }


    /* =====================================================
       EXPENSES
    ===================================================== */

    return {

        headers:[
            "S.No",
            "Description",
            "Vendor",
            "Expense Type",
            "Amount",
            "Expense Date",
            "Created By"
        ],

        rows:records.map(
            function(item, index){

                return [

                    index + 1,

                    item.expense_description ||
                    "-",

                    item.vendor_name ||
                    "-",

                    item.expense_type ||
                    "-",

                    formatPdfAmount(
                        item.expense_amount
                    ),

                    formatPdfDate(
                        item.expense_date
                    ),

                    item.created_by_name ||
                    "-"
                ];
            }
        )
    };
}


/* =========================================================
   FORMAT AMOUNT
========================================================= */

function formatPdfAmount(value){

    const amount =
        Number(value || 0);

    return `Rs. ${amount.toLocaleString("en-IN", {

        minimumFractionDigits:2,
        maximumFractionDigits:2

    })}`;
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatPdfDate(value){

    if(!value){
        return "-";
    }

    const date =
        new Date(value);

    if(Number.isNaN(date.getTime())){
        return String(value);
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );
}


/* =========================================================
   CLOSE WHEN BACKDROP IS CLICKED
========================================================= */

sheetBackdrop?.addEventListener("click", function(){

    if(
        downloadPdfSheet
            ?.classList
            .contains("show")
    ){
        closeDownloadPdfSheet();
    }
});
