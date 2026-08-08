/* =========================================================
   EVENT FORM — EVENT NAME ONLY
========================================================= */

(() => {
    "use strict";

    const openEventBtn =
        document.getElementById(
            "openEventBtn"
        );

    const eventSheet =
        document.getElementById(
            "eventSheet"
        );

    const closeEventSheetBtn =
        document.getElementById(
            "closeEventSheet"
        );

    const eventForm =
        document.getElementById(
            "eventForm"
        );

    const eventName =
        document.getElementById(
            "eventName"
        );

    const eventMessage =
        document.getElementById(
            "eventMessage"
        );

    const sheetBackdrop =
        document.getElementById(
            "sheetBackdrop"
        );

    const menuSheet =
        document.getElementById(
            "menuSheet"
        );

    const dbClient =
        window.supabaseClient ||
        window.db ||
        window.sb ||
        (
            window.supabase &&
            typeof window.supabase.from ===
                "function"
                ? window.supabase
                : null
        );

    if (!dbClient) {
        console.error(
            "Supabase client not found."
        );

        return;
    }

    const TABLE_NAME =
        "events";


    function showEventMessage(
        message,
        color
    ) {
        if (!eventMessage) {
            return;
        }

        eventMessage.textContent =
            message || "";

        eventMessage.style.color =
            color || "";
    }


    function resetEventForm() {
        if (!eventForm) {
            return;
        }

        eventForm.reset();

        showEventMessage(
            "",
            ""
        );
    }


    function openEventSheet(
        event
    ) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (menuSheet) {
            menuSheet.classList.remove(
                "show"
            );

            menuSheet.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        resetEventForm();

        sheetBackdrop
            ?.classList
            .add(
                "show"
            );

        if (eventSheet) {
            eventSheet.classList.remove(
                "eventBoxOpening"
            );

            void eventSheet.offsetWidth;

            eventSheet.classList.add(
                "show",
                "eventBoxOpening"
            );

            eventSheet.setAttribute(
                "aria-hidden",
                "false"
            );

            eventSheet.scrollTop =
                0;

            setTimeout(
                function () {
                    eventName?.focus();
                },
                260
            );
        }
    }


    function hideEventSheet() {
        if (eventSheet) {
            eventSheet.classList.remove(
                "show",
                "eventBoxOpening"
            );

            eventSheet.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        sheetBackdrop
            ?.classList
            .remove(
                "show"
            );

        showEventMessage(
            "",
            ""
        );
    }


    openEventBtn
        ?.addEventListener(
            "click",
            openEventSheet
        );


    closeEventSheetBtn
        ?.addEventListener(
            "click",
            hideEventSheet
        );


    sheetBackdrop
        ?.addEventListener(
            "click",
            function () {
                if (
                    eventSheet
                        ?.classList
                        .contains(
                            "show"
                        )
                ) {
                    hideEventSheet();
                }
            }
        );


    /* =====================================================
       SWIPE BACK FROM BOTH SIDES
    ===================================================== */

    let eventSwipeStartX = 0;
    let eventSwipeStartY = 0;
    let eventSwipeEndX = 0;
    let eventSwipeEndY = 0;

    const eventSwipeEdgeSize = 35;
    const eventSwipeMinimumDistance = 80;


    eventSheet?.addEventListener(
        "touchstart",
        function (event) {
            if (
                !eventSheet.classList.contains(
                    "show"
                ) ||
                event.touches.length !== 1
            ) {
                return;
            }

            const touch =
                event.touches[0];

            eventSwipeStartX =
                touch.clientX;

            eventSwipeStartY =
                touch.clientY;

            eventSwipeEndX =
                touch.clientX;

            eventSwipeEndY =
                touch.clientY;
        },
        {
            passive: true
        }
    );


    eventSheet?.addEventListener(
        "touchmove",
        function (event) {
            if (
                !eventSheet.classList.contains(
                    "show"
                ) ||
                event.touches.length !== 1
            ) {
                return;
            }

            const touch =
                event.touches[0];

            eventSwipeEndX =
                touch.clientX;

            eventSwipeEndY =
                touch.clientY;
        },
        {
            passive: true
        }
    );


    eventSheet?.addEventListener(
        "touchend",
        function () {
            if (
                !eventSheet.classList.contains(
                    "show"
                )
            ) {
                return;
            }

            const screenWidth =
                window.innerWidth;

            const horizontalDistance =
                eventSwipeEndX -
                eventSwipeStartX;

            const verticalDistance =
                eventSwipeEndY -
                eventSwipeStartY;

            if (
                Math.abs(
                    verticalDistance
                ) >
                Math.abs(
                    horizontalDistance
                )
            ) {
                return;
            }

            const swipedFromLeftEdge =
                eventSwipeStartX <=
                    eventSwipeEdgeSize &&
                horizontalDistance >=
                    eventSwipeMinimumDistance;

            const swipedFromRightEdge =
                eventSwipeStartX >=
                    screenWidth -
                    eventSwipeEdgeSize &&
                horizontalDistance <=
                    -eventSwipeMinimumDistance;

            if (
                swipedFromLeftEdge ||
                swipedFromRightEdge
            ) {
                hideEventSheet();
            }
        },
        {
            passive: true
        }
    );


    function getCurrentDate() {
        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );

        return `${year}-${month}-${day}`;
    }


    function getCurrentTime() {
        const now =
            new Date();

        const hours =
            String(
                now.getHours()
            ).padStart(
                2,
                "0"
            );

        const minutes =
            String(
                now.getMinutes()
            ).padStart(
                2,
                "0"
            );

        const seconds =
            String(
                now.getSeconds()
            ).padStart(
                2,
                "0"
            );

        return `${hours}:${minutes}:${seconds}`;
    }


    async function saveEvent(
        event
    ) {
        event.preventDefault();

        const saveButton =
            eventForm
                ?.querySelector(
                    'button[type="submit"]'
                );

        if (!saveButton) {
            return;
        }

        const name =
            eventName
                ?.value
                .trim() ||
            "";

        if (!name) {
            showEventMessage(
                "Enter event name.",
                "#d32f2f"
            );

            eventName?.focus();
            return;
        }

        saveButton.disabled =
            true;

        saveButton.innerHTML = `
            <span class="btnSpinner"></span>
        `;

        showEventMessage(
            "",
            ""
        );

        try {
            /*
              Only Event Name is entered by admin.

              The remaining values are filled internally
              because older database columns may still be
              configured as NOT NULL.
            */

            const eventData = {
                event_name:
                    name,

                event_date:
                    getCurrentDate(),

                event_time:
                    getCurrentTime(),

                event_place:
                    "",

                event_points:
                    ""
            };

            const {
                data: insertedEvent,
                error: insertError
            } = await dbClient
                .from(
                    TABLE_NAME
                )
                .insert([
                    eventData
                ])
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            /*
              Update this device immediately.
              Supabase realtime updates other devices.
            */

            if (
                typeof window.loadHomeEvents ===
                "function"
            ) {
                window.loadHomeEvents();
            }

            window.dispatchEvent(
                new CustomEvent(
                    "committee:event-added",
                    {
                        detail:
                            insertedEvent ||
                            eventData
                    }
                )
            );

            saveButton.innerHTML = `
                <span class="btnSuccessTick"></span>
            `;

            showEventMessage(
                "Event added successfully.",
                "#2e7d32"
            );

            resetEventForm();

            setTimeout(
                function () {
                    saveButton.disabled =
                        false;

                    saveButton.textContent =
                        "Add Event";
                },
                1200
            );

        } catch (error) {
            console.error(
                "Event save error:",
                error
            );

            saveButton.disabled =
                false;

            saveButton.textContent =
                "Add Event";

            showEventMessage(
                error?.message ||
                "Unable to add event.",
                "#d32f2f"
            );
        }
    }


    eventForm
        ?.addEventListener(
            "submit",
            saveEvent
        );


    window.openEventSheet =
        openEventSheet;

    window.hideEventSheet =
        hideEventSheet;

    window.resetEventForm =
        resetEventForm;

})();
