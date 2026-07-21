const openOldDonationBtn =
document.getElementById(
    "openOldDonationBtn"
);

const oldDonationSheet =
document.getElementById(
    "oldDonationSheet"
);

const oldDonationBackdrop =
document.getElementById(
    "oldDonationBackdrop"
);

const closeOldDonationSheet =
document.getElementById(
    "closeOldDonationSheet"
);

function openOldDonationPopup(){

    hideServiceSheetsForApproval();

    oldDonationBackdrop.classList.add("show");
    oldDonationSheet.classList.add("show");
oldDonationSheet.setAttribute(
    "aria-hidden",
    "false"
);
    document.body.style.overflow="hidden";
}
function closeOldDonationPopup(){

    oldDonationBackdrop.classList.remove(
        "show"
    );

    oldDonationSheet.classList.remove(
        "show"
    );

    oldDonationSheet.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    setTimeout(function(){
        openMenuSheet();
    }, 150);
}

openOldDonationBtn?.addEventListener(
    "click",
    openOldDonationPopup
);

closeOldDonationSheet?.addEventListener(
    "click",
    closeOldDonationPopup
);
/* =========================================================
   OLD DONATION SHEET — EDGE SWIPE TO SERVICE MENU
========================================================= */

let oldDonationSwipeStartX = 0;
let oldDonationSwipeStartY = 0;
let oldDonationSwipeEndX = 0;
let oldDonationSwipeEndY = 0;

const oldDonationSwipeEdgeSize = 35;
const oldDonationSwipeMinimumDistance = 80;


/* TOUCH START */
oldDonationSheet?.addEventListener(
    "touchstart",
    function(event){

        if(
            !oldDonationSheet.classList.contains("show") ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        oldDonationSwipeStartX =
            touch.clientX;

        oldDonationSwipeStartY =
            touch.clientY;

        oldDonationSwipeEndX =
            touch.clientX;

        oldDonationSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH MOVE */
oldDonationSheet?.addEventListener(
    "touchmove",
    function(event){

        if(
            !oldDonationSheet.classList.contains("show") ||
            event.touches.length !== 1
        ){
            return;
        }

        const touch =
            event.touches[0];

        oldDonationSwipeEndX =
            touch.clientX;

        oldDonationSwipeEndY =
            touch.clientY;
    },
    {
        passive:true
    }
);


/* TOUCH END */
oldDonationSheet?.addEventListener(
    "touchend",
    function(){

        if(
            !oldDonationSheet.classList.contains("show")
        ){
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            oldDonationSwipeEndX -
            oldDonationSwipeStartX;

        const verticalDistance =
            oldDonationSwipeEndY -
            oldDonationSwipeStartY;


        /* IGNORE UP/DOWN FORM SCROLL */
        if(
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ){
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            oldDonationSwipeStartX <=
                oldDonationSwipeEdgeSize &&
            horizontalDistance >=
                oldDonationSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            oldDonationSwipeStartX >=
                screenWidth -
                oldDonationSwipeEdgeSize &&
            horizontalDistance <=
                -oldDonationSwipeMinimumDistance;


        if(
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ){
            closeOldDonationSheet?.click();
        }
    },
    {
        passive:true
    }
);
oldDonationBackdrop?.addEventListener(
    "click",
    closeOldDonationPopup
);
document.addEventListener("DOMContentLoaded", function(){

    const dateInput =
        document.getElementById("oldDonationDate");

    const pickerOverlay =
        document.getElementById("oldDatePickerOverlay");

    const cancelButton =
        document.getElementById("cancelOldDate");

    const doneButton =
        document.getElementById("doneOldDate");

    const daySelect =
        document.getElementById("oldDateDay");

    const monthSelect =
        document.getElementById("oldDateMonth");

    const yearSelect =
        document.getElementById("oldDateYear");


    if(
        !dateInput ||
        !pickerOverlay ||
        !daySelect ||
        !monthSelect ||
        !yearSelect
    ){
        console.error("Old donation date picker elements not found.");
        return;
    }


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    function addOption(select, value, text){

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = text;

        select.appendChild(option);
    }


    function loadMonths(){

        monthSelect.innerHTML = "";

        monthNames.forEach(function(month, index){

            addOption(
                monthSelect,
                index + 1,
                month
            );

        });

    }


    function loadYears(){

        yearSelect.innerHTML = "";

        const currentYear =
            new Date().getFullYear();

        const firstYear =
            currentYear - 100;

        const lastYear =
            currentYear + 10;

        for(
            let year = firstYear;
            year <= lastYear;
            year++
        ){
            addOption(
                yearSelect,
                year,
                year
            );
        }

    }


    function getDaysInMonth(year, month){

        return new Date(
            Number(year),
            Number(month),
            0
        ).getDate();

    }


    function loadDays(keepSelectedDay){

        const selectedYear =
            Number(yearSelect.value);

        const selectedMonth =
            Number(monthSelect.value);

        const maximumDays =
            getDaysInMonth(
                selectedYear,
                selectedMonth
            );

        let requiredDay =
            Number(keepSelectedDay || daySelect.value || 1);

        if(requiredDay > maximumDays){
            requiredDay = maximumDays;
        }

        daySelect.innerHTML = "";

        for(
            let day = 1;
            day <= maximumDays;
            day++
        ){
            addOption(
                daySelect,
                day,
                String(day).padStart(2, "0")
            );
        }

        daySelect.value =
            String(requiredDay);

    }


    function setPickerToToday(){

        const today =
            new Date();

        yearSelect.value =
            String(today.getFullYear());

        monthSelect.value =
            String(today.getMonth() + 1);

        loadDays(today.getDate());

        daySelect.value =
            String(today.getDate());

    }


    function setPickerFromSavedDate(){

        const savedDate =
            dateInput.dataset.value;

        if(!savedDate){
            setPickerToToday();
            return;
        }

        const parts =
            savedDate.split("-");

        if(parts.length !== 3){
            setPickerToToday();
            return;
        }

        const savedYear =
            Number(parts[0]);

        const savedMonth =
            Number(parts[1]);

        const savedDay =
            Number(parts[2]);

        yearSelect.value =
            String(savedYear);

        monthSelect.value =
            String(savedMonth);

        loadDays(savedDay);

        daySelect.value =
            String(savedDay);

    }


    function openDatePicker(){

        setPickerFromSavedDate();

        pickerOverlay.classList.add("show");
        pickerOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeDatePicker(){

        pickerOverlay.classList.remove("show");
        pickerOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    function saveSelectedDate(){

        const selectedDay =
            Number(daySelect.value);

        const selectedMonth =
            Number(monthSelect.value);

        const selectedYear =
            Number(yearSelect.value);

        const databaseDate =
            selectedYear +
            "-" +
            String(selectedMonth).padStart(2, "0") +
            "-" +
            String(selectedDay).padStart(2, "0");

        const displayDate =
            String(selectedDay).padStart(2, "0") +
            " " +
            monthNames[selectedMonth - 1] +
            " " +
            selectedYear;

        /*
         Database value:
         2026-07-18
        */
        dateInput.dataset.value =
            databaseDate;

        /*
         Visible value:
         18 July 2026
        */
        dateInput.value =
            displayDate;

        closeDatePicker();

    }


    loadMonths();
    loadYears();
    setPickerToToday();


    dateInput.addEventListener(
        "click",
        openDatePicker
    );

    dateInput.addEventListener(
        "focus",
        function(){
            dateInput.blur();
            openDatePicker();
        }
    );


    monthSelect.addEventListener(
        "change",
        function(){
            loadDays(daySelect.value);
        }
    );

    yearSelect.addEventListener(
        "change",
        function(){
            loadDays(daySelect.value);
        }
    );


    cancelButton?.addEventListener(
        "click",
        closeDatePicker
    );

    doneButton?.addEventListener(
        "click",
        saveSelectedDate
    );


    pickerOverlay.addEventListener(
        "click",
        function(event){

            if(event.target === pickerOverlay){
                closeDatePicker();
            }

        }
    );

});


document.addEventListener("DOMContentLoaded", function () {

    const saveButton =
        document.getElementById("saveOldDonationBtn");

    const nameInput =
        document.getElementById("oldDonationName");

    const mobileInput =
        document.getElementById("oldDonationMobile");

    const amountInput =
        document.getElementById("oldDonationAmount");

    const dateInput =
        document.getElementById("oldDonationDate");

    const paymentTypeInput =
        document.getElementById("oldDonationPaymentType");

    const informationInput =
        document.getElementById("oldDonationInformation");


    if (!saveButton) {
        console.error("saveOldDonationBtn not found");
        return;
    }


    /*
      IMPORTANT:
      Find the already-created Supabase database client.

      It supports common names:
      supabaseClient
      sb
      window.supabaseClient
    */
    const oldDonationDatabase =
        window.supabaseClient ||
        window.sb ||
        (
            window.supabase &&
            typeof window.supabase.from === "function"
                ? window.supabase
                : null
        );


    if (
        !oldDonationDatabase ||
        typeof oldDonationDatabase.from !== "function"
    ) {
        console.error(
            "Supabase client not found. Use the same client variable used by your other donation save code."
        );

        saveButton.disabled = true;
        saveButton.textContent = "Database Not Connected";

        return;
    }


    if (saveButton.dataset.oldDonationListener === "true") {
        return;
    }

    saveButton.dataset.oldDonationListener = "true";


    const originalButtonHTML =
        saveButton.innerHTML || "Save Donation";


    /*
      JS-only animation styles
    */
    if (!document.getElementById("oldDonationJsStyles")) {

        const style = document.createElement("style");

        style.id = "oldDonationJsStyles";

        style.textContent = `
            @keyframes oldDonationSpinner {
                from {
                    transform:rotate(0deg);
                }

                to {
                    transform:rotate(360deg);
                }
            }

            @keyframes oldDonationShake {
                0%, 100% {
                    transform:translateX(0);
                }

                20% {
                    transform:translateX(-7px);
                }

                40% {
                    transform:translateX(7px);
                }

                60% {
                    transform:translateX(-5px);
                }

                80% {
                    transform:translateX(5px);
                }
            }
        `;

        document.head.appendChild(style);
    }


    function shakeField(element) {

        if (!element) return;

        element.style.borderColor = "#c94b4b";
        element.style.boxShadow =
            "0 0 0 3px rgba(201,75,75,.14)";

        element.style.animation =
            "none";

        void element.offsetWidth;

        element.style.animation =
            "oldDonationShake .38s ease";


        setTimeout(function () {

            element.style.animation = "";
            element.style.borderColor = "";
            element.style.boxShadow = "";

        }, 1100);

    }


    function shakeButton() {

        saveButton.style.animation = "none";

        void saveButton.offsetWidth;

        saveButton.style.animation =
            "oldDonationShake .38s ease";

        setTimeout(function () {
            saveButton.style.animation = "";
        }, 500);

    }


    function showSaving() {

    saveButton.disabled = true;

    saveButton.innerHTML = `
        <span class="oldDonationSavingSpinner">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
        </span>
    `;

}


    function showSuccess() {

    saveButton.disabled = true;

    saveButton.innerHTML = `
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d="M5 12.5L9.5 17L19 7"></path>
        </svg>
    `;

}


   function showFailure() {

    saveButton.disabled = false;
    saveButton.innerHTML = originalButtonHTML;

    shakeButton();

}


    function resetSaveButton() {

        saveButton.disabled = false;
        saveButton.innerHTML = originalButtonHTML;

    }


    function clearOldDonationForm() {

        if (nameInput) {
            nameInput.value = "";
        }

        if (mobileInput) {
            mobileInput.value = "";
        }

        if (amountInput) {
            amountInput.value = "";
        }

        if (dateInput) {
            dateInput.value = "";
            delete dateInput.dataset.value;
        }

        if (paymentTypeInput) {
            paymentTypeInput.value = "";
        }

        if (informationInput) {
            informationInput.value = "";
        }

    }


    saveButton.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();

            if (saveButton.disabled) {
                return;
            }


            const donorName =
                nameInput?.value.trim() || "";

            const mobileNumber =
                mobileInput?.value
                    .replace(/\D/g, "")
                    .trim() || "";

            const amountValue =
                amountInput?.value.trim() || "";

            const amount =
                Number(amountValue);

            const donationDate =
                dateInput?.dataset.value?.trim() || "";

            const paymentType =
                paymentTypeInput?.value.trim() || "";

            const additionalInformation =
                informationInput?.value.trim() || "";


            /*
              Validation with shake only
            */

            if (!donorName) {
                shakeField(nameInput);
                nameInput?.focus();
                return;
            }


            if (!/^\d{10}$/.test(mobileNumber)) {
                shakeField(mobileInput);
                mobileInput?.focus();
                return;
            }


            if (
                !amountValue ||
                !Number.isFinite(amount) ||
                amount <= 0
            ) {
                shakeField(amountInput);
                amountInput?.focus();
                return;
            }


           

            if (!paymentType) {
                shakeField(paymentTypeInput);
                paymentTypeInput?.focus();
                return;
            }


            showSaving();


            try {

                const {
                    data,
                    error
                } = await oldDonationDatabase
                    .from("olddonation")
                    .insert([
                        {
                            name: donorName,
                            mobile_number: mobileNumber,
                            amount: amount,
                           donation_date: donationDate || null,
                            payment_type: paymentType,
                            additional_information:
                                additionalInformation || null
                        }
                    ])
                    .select()
                    .single();


                if (error) {
                    throw error;
                }


                console.log(
                    "Old donation saved:",
                    data
                );


                clearOldDonationForm();
                showSuccess();


                setTimeout(function () {
                    resetSaveButton();
                }, 1800);


            } catch (error) {

                console.error(
                    "Old donation save error:",
                    error
                );

                showFailure();

            }

        }
    );

});