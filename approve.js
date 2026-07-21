
function hideServiceSheetsForApproval() {
    const serviceSheetIds = [
        "menuSheet",
        "donationSheet",
        "expenseSheet",
        "uploadImageSheet",
        "uploadPdfSheet",
        "logoutSheet"
    ];

    serviceSheetIds.forEach(function (id) {
        const sheet =
            document.getElementById(id);

        if (!sheet) {
            return;
        }

        sheet.classList.remove("show");

        sheet.setAttribute(
            "aria-hidden",
            "true"
        );
    });

    const serviceBackdrop =
        document.getElementById(
            "sheetBackdrop"
        );

    serviceBackdrop?.classList.remove(
        "show"
    );
}

(function () {
    "use strict";

    const openApprovalRequests =
        document.getElementById(
            "openApprovalRequests"
        );

    const approvalBackdrop =
        document.getElementById(
            "approvalBackdrop"
        );

    const approvalSheet =
        document.getElementById(
            "approvalSheet"
        );

    const approvalSheetClose =
        document.getElementById(
            "approvalSheetClose"
        );

    const approvalRequestList =
        document.getElementById(
            "approvalRequestList"
        );

    const approvalRequestCount =
        document.getElementById(
            "approvalRequestCount"
        );

    const approvalLoading =
        document.getElementById(
            "approvalLoading"
        );

    const approvalEmpty =
        document.getElementById(
            "approvalEmpty"
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

    let approvalChannel = null;


    function escapeApprovalHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function normalizeApprovalStatus(status) {
        const safeStatus =
            String(status || "pending")
                .trim()
                .toLowerCase();

        const allowedStatuses = [
            "pending",
            "accepted",
            "declined",
            "rejected"
        ];

        return allowedStatuses.includes(
            safeStatus
        )
            ? safeStatus
            : "pending";
    }


    function getApprovalStatusLabel(status) {
        const labels = {
            pending: "Pending",
            accepted: "Accepted",
            declined: "Declined",
            rejected: "Rejected"
        };

        return labels[status] || "Pending";
    }


    function showApprovalLoading(show) {
    if (!approvalLoading) {
        return;
    }

    const isLoading =
        Boolean(show);

    approvalLoading.classList.toggle(
        "show",
        isLoading
    );

    if (approvalRequestList) {
        approvalRequestList.style.display =
            isLoading
                ? "none"
                : "flex";
    }

    if (approvalEmpty) {
        approvalEmpty.style.display =
            "none";
    }
}


    function showApprovalEmpty(show) {
        if (!approvalEmpty) {
            return;
        }

        approvalEmpty.classList.toggle(
            "show",
            Boolean(show)
        );
    }


    function updateApprovalCount(count) {
        if (!approvalRequestCount) {
            return;
        }

        if (count === 1) {
            approvalRequestCount.textContent =
                "1 approval request";

            return;
        }

        approvalRequestCount.textContent =
            count + " approval requests";
    }


    
function openApprovalSheet(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
    }

    if (
        !approvalSheet ||
        !approvalBackdrop
    ) {
        console.error(
            "Approval sheet elements not found."
        );

        return;
    }

    /*
       Close service sheet first
    */
    hideServiceSheetsForApproval();

    /*
       Open approval immediately.
       Do not use requestAnimationFrame.
    */
    approvalBackdrop.classList.add(
        "show"
    );

    approvalSheet.classList.add(
        "show"
    );

    approvalSheet.setAttribute(
        "aria-hidden",
        "false"
    );

    approvalSheet.scrollTop = 0;

    document.body.style.overflow =
        "hidden";

    loadApprovalRequests();
    startApprovalRealtime();
}

   function closeApprovalSheet(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
    }

    approvalBackdrop?.classList.remove(
        "show"
    );

    approvalSheet?.classList.remove(
        "show"
    );

    approvalSheet?.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    stopApprovalRealtime();

    setTimeout(function () {
        openMenuSheet();
    }, 150);
}


    function createApprovalCard(request) {
        const mobileNumber =
            escapeApprovalHtml(
                request.mobile_number
            );

        const status =
            normalizeApprovalStatus(
                request.status
            );

        const statusLabel =
            getApprovalStatusLabel(
                status
            );

        return `
            <article
                class="approval-card"
                data-mobile-number="${mobileNumber}"
                data-current-status="${status}"
            >

                <div class="approval-card-top">

                    <div class="approval-number-wrap">

                        <div class="approval-number-icon">
                            ☎
                        </div>

                        <div class="approval-number-details">

                            <p class="approval-mobile">
                                ${mobileNumber}
                            </p>

                            <p class="approval-request-text">
                                Customer login approval request
                            </p>

                        </div>

                    </div>

                    <span
                        class="
                            approval-status
                            approval-status-${status}
                        "
                    >
                        ${statusLabel}
                    </span>

                </div>

                <div class="approval-actions">

                    <button
                        type="button"
                        class="
                            approval-action-btn
                            approval-accept-btn
                            ${
                                status === "accepted"
                                    ? "approval-selected-accept"
                                    : ""
                            }
                        "
                        data-approval-action="accepted"
                    >
                        ${
                            status === "accepted"
                                ? "✓ Accepted"
                                : "Accept"
                        }
                    </button>

                    <button
                        type="button"
                        class="
                            approval-action-btn
                            approval-decline-btn
                            ${
                                status === "declined"
                                    ? "approval-selected-decline"
                                    : ""
                            }
                        "
                        data-approval-action="declined"
                    >
                        ${
                            status === "declined"
                                ? "✓ Declined"
                                : "Decline"
                        }
                    </button>

                    <button
                        type="button"
                        class="
                            approval-action-btn
                            approval-reject-btn
                            ${
                                status === "rejected"
                                    ? "approval-selected-reject"
                                    : ""
                            }
                        "
                        data-approval-action="rejected"
                    >
                        ${
                            status === "rejected"
                                ? "✓ Rejected"
                                : "Reject"
                        }
                    </button>

                </div>

            </article>
        `;
    }

function renderApprovalRequests(
    requests
) {
    if (!approvalRequestList) {
        return;
    }

    const safeRequests =
        Array.isArray(requests)
            ? requests
            : [];

    approvalRequestList.style.display =
        "flex";

    updateApprovalCount(
        safeRequests.length
    );

    if (safeRequests.length === 0) {
        approvalRequestList.innerHTML =
            "";

        showApprovalEmpty(true);

        return;
    }

    showApprovalEmpty(false);

    approvalRequestList.innerHTML =
        safeRequests
            .map(createApprovalCard)
            .join("");
}

async function loadApprovalRequests() {
    if (!approvalRequestList) {
        return;
    }

    showApprovalEmpty(false);
    showApprovalLoading(true);

    approvalRequestList.innerHTML = "";

    try {
        const {
            data,
            error
        } = await dbClient
            .from(
                "customer_approvals"
            )
            .select(
                "mobile_number, status"
            );

        if (error) {
            throw error;
        }

        showApprovalLoading(false);

        renderApprovalRequests(
            data || []
        );

    } catch (error) {
        console.error(
            "Approval request load error:",
            error
        );

        showApprovalLoading(false);
        showApprovalEmpty(false);

        approvalRequestList.style.display =
            "flex";

        approvalRequestList.innerHTML = `
            <div
                style="
                    width:100%;
                    padding:30px 15px;
                    text-align:center;
                    color:#c43535;
                    font-size:14px;
                    font-weight:700;
                "
            >
                Unable to load approval requests.
            </div>
        `;

        updateApprovalCount(0);
    }
}
         

    function setApprovalCardLoading(
        card,
        actionButton
    ) {
        if (!card) {
            return;
        }

        const buttons =
            card.querySelectorAll(
                ".approval-action-btn"
            );

        buttons.forEach(function (button) {
            button.disabled = true;
            button.style.opacity = ".5";
        });

        if (actionButton) {
            actionButton.style.opacity = "1";
            actionButton.textContent =
                "Updating...";
        }
    }


    function renderCardStatus(
        card,
        selectedStatus
    ) {
        if (!card) {
            return;
        }

        const status =
            normalizeApprovalStatus(
                selectedStatus
            );

        card.dataset.currentStatus =
            status;

        const buttons =
            card.querySelectorAll(
                ".approval-action-btn"
            );

        buttons.forEach(function (button) {
            const action =
                button.dataset.approvalAction;

            button.disabled = false;
            button.style.opacity = "1";

            button.classList.remove(
                "approval-selected-accept",
                "approval-selected-decline",
                "approval-selected-reject"
            );

            if (action === "accepted") {
                button.textContent =
                    status === "accepted"
                        ? "✓ Accepted"
                        : "Accept";

                if (status === "accepted") {
                    button.classList.add(
                        "approval-selected-accept"
                    );
                }
            }

            if (action === "declined") {
                button.textContent =
                    status === "declined"
                        ? "✓ Declined"
                        : "Decline";

                if (status === "declined") {
                    button.classList.add(
                        "approval-selected-decline"
                    );
                }
            }

            if (action === "rejected") {
                button.textContent =
                    status === "rejected"
                        ? "✓ Rejected"
                        : "Reject";

                if (status === "rejected") {
                    button.classList.add(
                        "approval-selected-reject"
                    );
                }
            }
        });

        const statusBadge =
            card.querySelector(
                ".approval-status"
            );

        if (statusBadge) {
            statusBadge.className =
                "approval-status " +
                "approval-status-" +
                status;

            statusBadge.textContent =
                getApprovalStatusLabel(
                    status
                );
        }
    }


async function updateApprovalStatus(
    card,
    newStatus,
    actionButton
) {
    if (
        !card ||
        !newStatus ||
        card.dataset.updating === "true"
    ) {
        return;
    }

    const mobileNumber =
        String(
            card.dataset.mobileNumber || ""
        ).trim();

    const oldStatus =
        normalizeApprovalStatus(
            card.dataset.currentStatus
        );

    const safeNewStatus =
        normalizeApprovalStatus(
            newStatus
        );

    if (!mobileNumber) {
        console.error(
            "Approval mobile number missing."
        );

        return;
    }

    if (safeNewStatus === oldStatus) {
        return;
    }

    card.dataset.updating = "true";

    setApprovalCardLoading(
        card,
        actionButton
    );

    try {
        console.log(
            "Updating approval:",
            mobileNumber,
            safeNewStatus
        );

        const {
            data,
            error
        } = await dbClient
            .from(
                "customer_approvals"
            )
            .update({
                status: safeNewStatus
            })
            .eq(
                "mobile_number",
                mobileNumber
            )
            .select(
                "mobile_number, status"
            );

        if (error) {
            throw error;
        }

        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {
            throw new Error(
                "No database row was updated. Check mobile number and Supabase UPDATE policy."
            );
        }

        const updatedRow =
            data[0];

        console.log(
            "Database updated:",
            updatedRow
        );

        renderCardStatus(
            card,
            updatedRow.status
        );

    } catch (error) {
        console.error(
            "Approval update error:",
            error
        );

        renderCardStatus(
            card,
            oldStatus
        );

        window.alert(
            error?.message ||
            "Unable to update approval status."
        );

    } finally {
        card.dataset.updating =
            "false";
    }
}


    function stopApprovalRealtime() {
        if (!approvalChannel) {
            return;
        }

        dbClient.removeChannel(
            approvalChannel
        );

        approvalChannel = null;
    }


    function startApprovalRealtime() {
        stopApprovalRealtime();

        approvalChannel =
            dbClient
                .channel(
                    "admin-customer-approvals"
                )
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table:
                            "customer_approvals"
                    },
                    function () {
                        if (
                            approvalSheet?.classList
                                .contains("show")
                        ) {
                            loadApprovalRequests();
                        }
                    }
                )
                .subscribe(
                    function (
                        status,
                        error
                    ) {
                        console.log(
                            "Approval realtime:",
                            status
                        );

                        if (error) {
                            console.error(
                                "Approval realtime error:",
                                error
                            );
                        }
                    }
                );
    }


   openApprovalRequests?.addEventListener(
    "click",
    function (event) {
        openApprovalSheet(event);
    }
);


/* CLOSE BUTTON */
approvalSheetClose?.addEventListener(
    "click",
    function (event) {
        event.preventDefault();
        event.stopPropagation();

        closeApprovalSheet();
    }
);

/* =========================================================
   APPROVAL SHEET — LEFT/RIGHT EDGE SWIPE TO SERVICE MENU
========================================================= */

let approvalSwipeStartX = 0;
let approvalSwipeStartY = 0;
let approvalSwipeEndX = 0;
let approvalSwipeEndY = 0;

const approvalSwipeEdgeSize = 35;
const approvalSwipeMinimumDistance = 80;


/* TOUCH START */
approvalSheet?.addEventListener(
    "touchstart",
    function (event) {

        if (
            !approvalSheet.classList.contains("show") ||
            event.touches.length !== 1
        ) {
            return;
        }

        const touch =
            event.touches[0];

        approvalSwipeStartX =
            touch.clientX;

        approvalSwipeStartY =
            touch.clientY;

        approvalSwipeEndX =
            touch.clientX;

        approvalSwipeEndY =
            touch.clientY;
    },
    {
        passive: true
    }
);


/* TOUCH MOVE */
approvalSheet?.addEventListener(
    "touchmove",
    function (event) {

        if (
            !approvalSheet.classList.contains("show") ||
            event.touches.length !== 1
        ) {
            return;
        }

        const touch =
            event.touches[0];

        approvalSwipeEndX =
            touch.clientX;

        approvalSwipeEndY =
            touch.clientY;
    },
    {
        passive: true
    }
);


/* TOUCH END */
approvalSheet?.addEventListener(
    "touchend",
    function () {

        if (
            !approvalSheet.classList.contains("show")
        ) {
            return;
        }

        const screenWidth =
            window.innerWidth;

        const horizontalDistance =
            approvalSwipeEndX -
            approvalSwipeStartX;

        const verticalDistance =
            approvalSwipeEndY -
            approvalSwipeStartY;


        /* IGNORE NORMAL UP/DOWN LIST SCROLL */
        if (
            Math.abs(verticalDistance) >
            Math.abs(horizontalDistance)
        ) {
            return;
        }


        /* LEFT EDGE → SWIPE RIGHT */
        const swipedFromLeftEdge =
            approvalSwipeStartX <=
                approvalSwipeEdgeSize &&
            horizontalDistance >=
                approvalSwipeMinimumDistance;


        /* RIGHT EDGE → SWIPE LEFT */
        const swipedFromRightEdge =
            approvalSwipeStartX >=
                screenWidth -
                approvalSwipeEdgeSize &&
            horizontalDistance <=
                -approvalSwipeMinimumDistance;


        if (
            swipedFromLeftEdge ||
            swipedFromRightEdge
        ) {
            approvalSheetClose?.click();
        }
    },
    {
        passive: true
    }
);

/* CLOSE WHEN BACKDROP CLICKED */
approvalBackdrop?.addEventListener(
    "click",
    function (event) {
        event.preventDefault();
        event.stopPropagation();

        closeApprovalSheet();
    }
);


/* PREVENT SHEET INSIDE CLICK FROM CLOSING */
approvalSheet?.addEventListener(
    "click",
    function (event) {
        event.stopPropagation();
    }
);

    approvalRequestList?.addEventListener(
        "click",
        function (event) {
            const actionButton =
                event.target.closest(
                    "[data-approval-action]"
                );

            if (
                !actionButton ||
                actionButton.disabled
            ) {
                return;
            }

            const card =
                actionButton.closest(
                    ".approval-card"
                );

            const newStatus =
                actionButton.dataset
                    .approvalAction;

            updateApprovalStatus(
                card,
                newStatus,
                actionButton
            );
        }
    );


    document.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key === "Escape" &&
                approvalSheet?.classList
                    .contains("show")
            ) {
                closeApprovalSheet();
            }
        }
    );


    window.openApprovalSheet =
        openApprovalSheet;

    window.closeApprovalSheet =
        closeApprovalSheet;

    window.loadApprovalRequests =
        loadApprovalRequests;

})();