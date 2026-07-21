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

const downloadSelectedPdfButton =
    document.getElementById("downloadSelectedPdfBtn");

const downloadPdfMessage =
    document.getElementById("downloadPdfMessage");


let downloadProgressTimer = null;
let currentDownloadProgress = 0;


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

    if(downloadSelectedPdfButton){

        downloadSelectedPdfButton.disabled = true;

        downloadSelectedPdfButton.innerHTML = `
            <i class="fa-solid fa-file-arrow-down"></i>
            Download PDF
        `;
    }

    if(downloadPdfMessage){

        downloadPdfMessage.textContent = "";
        downloadPdfMessage.style.color = "#475569";
    }

    currentDownloadProgress = 0;
}


/* =========================================================
   ENABLE BUTTON AFTER PDF SELECTION
========================================================= */

downloadPdfType?.addEventListener("change", function(){

    const selectedType = this.value;

    downloadSelectedPdfButton.disabled = !selectedType;

    downloadPdfMessage.textContent = "";
    downloadPdfMessage.style.color = "#475569";
});


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

        if(!selectedType){

            downloadPdfMessage.style.color = "#dc2626";

            downloadPdfMessage.textContent =
                "Please select a PDF.";

            return;
        }

        downloadSelectedPdfButton.disabled = true;

        downloadPdfType.disabled = true;

        downloadPdfMessage.textContent = "";

        startDownloadProgress();

        try{

            if(selectedType === "chavithi_donations"){

                await downloadTablePdf(
                    "chavithi_donations",
                    "Chavithi Donations Report",
                    "Complete list of Chavithi donation records",
                    "chavithi-donations.pdf"
                );

            }else if(
                selectedType === "santharpana_donations"
            ){

                await downloadTablePdf(
                    "santharpana_donations",
                    "Santharpana Donations Report",
                    "Complete list of Santharpana donation records",
                    "santharpana-donations.pdf"
                );

            }else if(selectedType === "expenses"){

                await downloadTablePdf(
                    "chavithi_expenses",
                    "Chavithi Expenses Report",
                    "Complete list of Chavithi expense records",
                    "chavithi-expenses.pdf"
                );
            }

            await completeDownloadProgress();

            downloadPdfMessage.style.color = "#15803d";

            downloadPdfMessage.textContent =
                "PDF downloaded successfully.";

            await waitForPdfProgress(600);

        }catch(error){

            stopDownloadProgress();

            console.error(
                "PDF download error:",
                error
            );

            downloadPdfMessage.style.color = "#dc2626";

            downloadPdfMessage.textContent =
                error.message ||
                "Unable to download PDF.";

        }finally{

            stopDownloadProgress();

            downloadPdfType.disabled = false;

            downloadSelectedPdfButton.disabled =
                !downloadPdfType.value;

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
    fileName
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

    const { data, error } =
        await supabaseClient
            .from(tableName)
            .select("*")
            .order("created_at", {
                ascending:false
            });

    if(error){
        throw error;
    }

    if(!data || data.length === 0){

        throw new Error(
            "No records found."
        );
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
    tableName === "chavithi_expenses";

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
                : item.donation_amount;

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
        `Total Records: ${data.length}`,
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
                : record.donation_amount;

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

    pdf.save(fileName);
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
