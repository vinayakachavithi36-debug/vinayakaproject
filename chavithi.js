let selectedDonationTable = "";

function returnFromDonationToMenu(){

    donationSheet.classList.remove("show");
    donationSheet.setAttribute("aria-hidden", "true");

    phonePeScanner.classList.remove("show");
    donationMessage.textContent = "";

    setTimeout(function(){
        openMenuSheet();
    }, 150);
}
/* =========================================================
   DONATION SHEET — LEFT/RIGHT EDGE SWIPE TO SERVICE MENU
========================================================= */

let donationSwipeStartX = 0;
let donationSwipeStartY = 0;
let donationSwipeEndX = 0;
let donationSwipeEndY = 0;

const donationSwipeEdgeSize = 35;
const donationSwipeMinimumDistance = 80;


/* TOUCH START */
donationSheet.addEventListener(
    "touchstart",
    function(event){

        if(
            !donationSheet.classList.contains("show") ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch = event.touches[0];

        donationSwipeStartX = touch.clientX;
        donationSwipeStartY = touch.clientY;

        donationSwipeEndX = touch.clientX;
        donationSwipeEndY = touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
donationSheet.addEventListener(
    "touchmove",
    function(event){

        if(!donationSheet.classList.contains("show")){
            return;
        }

        const touch = event.touches[0];

        donationSwipeEndX = touch.clientX;
        donationSwipeEndY = touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
donationSheet.addEventListener(
    "touchend",
    function(){

        if(!donationSheet.classList.contains("show")){
            return;
        }

        const screenWidth = window.innerWidth;

        const horizontalDistance =
            donationSwipeEndX - donationSwipeStartX;

        const verticalDistance =
            donationSwipeEndY - donationSwipeStartY;


        /* IGNORE UP/DOWN FORM SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            donationSwipeStartX <= donationSwipeEdgeSize &&
            horizontalDistance >= donationSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            donationSwipeStartX >=
                screenWidth - donationSwipeEdgeSize &&
            horizontalDistance <=
                -donationSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            closeDonationSheetButton.click();
        }
    },
    {
        passive:true
    }
);
/* OPEN DONATION SHEET */
function openDonationSheet(categoryName, tableName) {

    // Store selected Supabase table
    selectedDonationTable = tableName;

    // Close only service menu
    menuSheet.classList.remove("show");
    menuSheet.setAttribute("aria-hidden", "true");

    // Reset donation form
    if (donationForm) {
        donationForm.reset();
    }

    donationCategory.value = categoryName;
    donationSheetTitle.textContent = categoryName;
    donationDate.value = getTodayDate();

    phonePeScanner.classList.remove("show");
    scannerImage.hidden = false;
    scannerError.hidden = true;
    donationMessage.textContent = "";

    // Keep backdrop visible
    sheetBackdrop.classList.add("show");

    // Open donation popup
    donationSheet.classList.add("show");
    donationSheet.setAttribute("aria-hidden", "false");
    donationSheet.scrollTop = 0;
}

/* DONATION CATEGORY BUTTONS */
/* DONATION CATEGORY BUTTONS */
donationCategoryButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        openDonationSheet(
            button.dataset.category,
            button.dataset.table
        );
    });

});

(() => {
    "use strict";

    const form = document.getElementById("donationForm");

    if (!form) {
        console.error("Donation form not found.");
        return;
    }

    /*
       Find the actual Supabase client.

       Supported client variable names:
       window.supabaseClient
       window.db
       window.sb

       It also supports window.supabase only when it is already
       an initialized Supabase client.
    */
    const dbClient =
        window.supabaseClient ||
        window.db ||
        window.sb ||
        (
            window.supabase &&
            typeof window.supabase.from === "function"
                ? window.supabase
                : null
        );

    if (!dbClient) {
        console.error(
            "Supabase client not found. Create the client before loading chavithi.js."
        );
    }

    // Prevent adding the submit event more than once
    if (form.dataset.donationSubmitReady === "true") {
        return;
    }

    form.dataset.donationSubmitReady = "true";
    form.addEventListener("submit", saveDonation);

    async function saveDonation(event) {
        event.preventDefault();

        const saveBtn = form.querySelector(".save-btn");
        const message = document.getElementById("donationMessage");

        if (!saveBtn || !message) {
            console.error("Donation button or message element not found.");
            return;
        }

        if (!dbClient) {
            message.style.color = "#d32f2f";
            message.textContent = "Database connection is not available.";
            return;
        }

        saveBtn.disabled = true;
        saveBtn.innerHTML = `
            <span class="btnSpinner"></span>
            
        `;

        message.textContent = "";

        try {
            const donorPhoneInput = document.getElementById("donorPhone");

const donorPhone = donorPhoneInput
    ? donorPhoneInput.value.replace(/\D/g, "")
    : "";

if (donorPhone.length !== 10) {
    saveBtn.disabled = false;
    saveBtn.innerHTML = "Save Donation";

    message.style.color = "#d32f2f";
    message.textContent = "Please enter a valid 10-digit mobile number.";

    donorPhoneInput?.focus();
    return;
}
            const donationData = {
                donor_phone: donorPhone,
                donation_category:
                    document.getElementById("donationCategory")?.value || "",

                donor_name:
                    document.getElementById("donorName")?.value.trim() || "",

               
                donation_amount: Number(
                    document.getElementById("donationAmount")?.value || 0
                ),

                received_by:
                    document.getElementById("receivedBy")?.value.trim() || "",

                donation_date:
                    document.getElementById("donationDate")?.value || "",

                amount_type:
                    document.getElementById("amountType")?.value || "",

                additional_information:
                    document
                        .getElementById("additionalInformation")
                        ?.value.trim() || "",

                created_by_mobile:
                    localStorage.getItem("loggedInUser") || null,

                created_by_name:
                    localStorage.getItem("loggedInName") || null
            };

          const allowedDonationTables = [
    "chavithi_donations",
    "santharpana_donations"
];

if (!selectedDonationTable) {
    throw new Error("Donation type was not selected.");
}

if (!allowedDonationTables.includes(selectedDonationTable)) {
    throw new Error("Invalid donation table selected.");
}
const { data, error } = await window.supabaseClient
    .from(selectedDonationTable)
    .insert([donationData])
    .select()
    .single();

            if (error) {
                throw error;
            }
console.log("Donation saved successfully:", data);
if (
    window.AndroidPrinter &&
    typeof window.AndroidPrinter.printDonationReceipt === "function"
) {
    window.AndroidPrinter.printDonationReceipt(
        JSON.stringify({
            donation_table: selectedDonationTable,
            ...data
        })
    );
}
            saveBtn.innerHTML = `
                <span class="btnSuccessTick"></span>
                
            `;

            message.style.color = "#2e7d32";
            message.textContent = "Donation Saved Successfully";

            form.reset();

            const donationDate =
                document.getElementById("donationDate");

            if (donationDate) {
                donationDate.value =
                    new Date().toISOString().split("T")[0];
            }

            const phonePeScanner =
                document.getElementById("phonePeScanner");

            if (phonePeScanner) {
                phonePeScanner.classList.remove("show");
            }

            setTimeout(() => {
                saveBtn.disabled = false;
                saveBtn.innerHTML = "Save Donation";
                message.textContent = "";

                if (typeof window.closeDonationSheet === "function") {
                    window.closeDonationSheet();
                }
            }, 1500);

        } catch (error) {
            console.error("Donation save error:", error);

            saveBtn.disabled = false;
            saveBtn.innerHTML = "Save Donation";

            message.style.color = "#d32f2f";
            message.textContent =
                error?.message || "Unable to save donation.";
        }
    }
})();
