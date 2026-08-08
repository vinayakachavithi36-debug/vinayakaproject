/* =========================================================
   OLD EXPENSES
========================================================= */

(() => {
    "use strict";

    const openOldExpenseBtn = document.getElementById("openOldExpenseBtn");
    const oldExpenseSheet = document.getElementById("oldExpenseSheet");
    const closeOldExpenseSheetBtn = document.getElementById("closeOldExpenseSheet");
    const oldExpenseForm = document.getElementById("oldExpenseForm");
    const oldExpenseAdmin = document.getElementById("oldExpenseAdmin");
    const oldExpenseDonationType = document.getElementById("oldExpenseDonationType");
    const oldExpenseDescription = document.getElementById("oldExpenseDescription");
    const oldExpenseVendor = document.getElementById("oldExpenseVendor");
    const oldExpenseAmount = document.getElementById("oldExpenseAmount");
    const oldExpenseDate = document.getElementById("oldExpenseDate");
    const oldExpensePaymentType = document.getElementById("oldExpensePaymentType");
    const oldExpenseProof = document.getElementById("oldExpenseProof");
    const oldExpenseProofPreview = document.getElementById("oldExpenseProofPreview");
    const oldExpenseProofPreviewImage = document.getElementById("oldExpenseProofPreviewImage");
    const oldExpenseProofFileName = document.getElementById("oldExpenseProofFileName");
    const oldExpenseInformation = document.getElementById("oldExpenseInformation");
    const oldExpenseMessage = document.getElementById("oldExpenseMessage");
    const sheetBackdrop = document.getElementById("sheetBackdrop");
    const menuSheet = document.getElementById("menuSheet");

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
        console.error("Supabase client not found.");
        return;
    }

    const TABLE_NAME = "old_expenses";
    const BUCKET_NAME = "expenses-proff";

    let selectedOldExpenseFile = null;
    let oldExpensePreviewUrl = null;

    function showOldExpenseMessage(message, color) {
        if (!oldExpenseMessage) return;
        oldExpenseMessage.textContent = message || "";
        oldExpenseMessage.style.color = color || "";
    }

    function getTodayDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function clearOldExpensePreview(clearFileInput = true) {
        selectedOldExpenseFile = null;

        if (oldExpensePreviewUrl) {
            URL.revokeObjectURL(oldExpensePreviewUrl);
            oldExpensePreviewUrl = null;
        }

        if (clearFileInput && oldExpenseProof) {
            oldExpenseProof.value = "";
        }

        oldExpenseProofPreview?.classList.remove("show");

        if (oldExpenseProofPreviewImage) {
            oldExpenseProofPreviewImage.hidden = true;
            oldExpenseProofPreviewImage.removeAttribute("src");
        }

        if (oldExpenseProofFileName) {
            oldExpenseProofFileName.textContent = "";
        }
    }

    function resetOldExpenseForm() {
        if (!oldExpenseForm) return;
        oldExpenseForm.reset();

        if (oldExpenseDate) {
            oldExpenseDate.value = getTodayDate();
        }

        clearOldExpensePreview(true);
        showOldExpenseMessage("", "");
    }

    function makeSafeFileName(fileName) {
        const parts = String(fileName || "").split(".");
        const extension = parts.length > 1 ? parts.pop().toLowerCase() : "file";
        const randomPart = Math.random().toString(36).slice(2, 10);
        return `${Date.now()}_${randomPart}.${extension}`;
    }

    async function loadOldExpenseAdmins() {
        if (!oldExpenseAdmin) return;

        oldExpenseAdmin.disabled = true;
        oldExpenseAdmin.innerHTML = '<option value="">Loading</option>';

        try {
            const { data, error } = await dbClient
                .from("admin_login")
                .select("name, mobile_number")
                .order("name", { ascending: true });

            if (error) throw error;

            oldExpenseAdmin.innerHTML = '<option value="">Select Admin</option>';

            (data || []).forEach(function (admin) {
                const adminName = String(admin.name || "").trim();
                const adminMobile = String(admin.mobile_number || "").trim();

                if (!adminName || !adminMobile) return;

                const option = document.createElement("option");
                option.value = adminMobile;
                option.textContent = adminName;
                option.dataset.adminName = adminName;
                oldExpenseAdmin.appendChild(option);
            });

            oldExpenseAdmin.disabled = false;

            const loggedInMobile = localStorage.getItem("loggedInUser");
            if (loggedInMobile) {
                oldExpenseAdmin.value = loggedInMobile;
            }

        } catch (error) {
            console.error("Unable to load admins:", error);
            oldExpenseAdmin.innerHTML = '<option value="">Unable to load admins</option>';
            oldExpenseAdmin.disabled = false;
            showOldExpenseMessage("Unable to load admin names.", "#d32f2f");
        }
    }

    function openOldExpenseSheet(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (menuSheet) {
            menuSheet.classList.remove("show");
            menuSheet.setAttribute("aria-hidden", "true");
        }

        resetOldExpenseForm();
        loadOldExpenseAdmins();

        sheetBackdrop?.classList.add("show");

        if (oldExpenseSheet) {
            oldExpenseSheet.classList.add("show");
            oldExpenseSheet.setAttribute("aria-hidden", "false");
            oldExpenseSheet.scrollTop = 0;
        }
    }

    function hideOldExpenseSheet() {
        if (oldExpenseSheet) {
            oldExpenseSheet.classList.remove("show");
            oldExpenseSheet.setAttribute("aria-hidden", "true");
        }

        sheetBackdrop?.classList.remove("show");
        clearOldExpensePreview(true);
        showOldExpenseMessage("", "");
    }

    openOldExpenseBtn?.addEventListener("click", openOldExpenseSheet);
    closeOldExpenseSheetBtn?.addEventListener("click", hideOldExpenseSheet);

    sheetBackdrop?.addEventListener("click", function () {
        if (oldExpenseSheet?.classList.contains("show")) {
            hideOldExpenseSheet();
        }
    });

    /* =========================================================
       OLD EXPENSE SHEET — SWIPE BACK FROM BOTH SIDES
    ========================================================= */

    let oldExpenseSwipeStartX = 0;
    let oldExpenseSwipeStartY = 0;
    let oldExpenseSwipeEndX = 0;
    let oldExpenseSwipeEndY = 0;

    const oldExpenseSwipeEdgeSize = 35;
    const oldExpenseSwipeMinimumDistance = 80;

    oldExpenseSheet?.addEventListener(
        "touchstart",
        function (event) {
            if (
                !oldExpenseSheet.classList.contains("show") ||
                event.touches.length !== 1
            ) {
                return;
            }

            const touch = event.touches[0];

            oldExpenseSwipeStartX = touch.clientX;
            oldExpenseSwipeStartY = touch.clientY;
            oldExpenseSwipeEndX = touch.clientX;
            oldExpenseSwipeEndY = touch.clientY;
        },
        {
            passive: true
        }
    );

    oldExpenseSheet?.addEventListener(
        "touchmove",
        function (event) {
            if (
                !oldExpenseSheet.classList.contains("show") ||
                event.touches.length !== 1
            ) {
                return;
            }

            const touch = event.touches[0];

            oldExpenseSwipeEndX = touch.clientX;
            oldExpenseSwipeEndY = touch.clientY;
        },
        {
            passive: true
        }
    );

    oldExpenseSheet?.addEventListener(
        "touchend",
        function () {
            if (
                !oldExpenseSheet.classList.contains("show")
            ) {
                return;
            }

            const screenWidth = window.innerWidth;

            const horizontalDistance =
                oldExpenseSwipeEndX -
                oldExpenseSwipeStartX;

            const verticalDistance =
                oldExpenseSwipeEndY -
                oldExpenseSwipeStartY;

            /* Keep normal vertical form scrolling */
            if (
                Math.abs(verticalDistance) >
                Math.abs(horizontalDistance)
            ) {
                return;
            }

            /* Left edge → swipe right */
            const swipedFromLeftEdge =
                oldExpenseSwipeStartX <=
                    oldExpenseSwipeEdgeSize &&
                horizontalDistance >=
                    oldExpenseSwipeMinimumDistance;

            /* Right edge → swipe left */
            const swipedFromRightEdge =
                oldExpenseSwipeStartX >=
                    screenWidth -
                    oldExpenseSwipeEdgeSize &&
                horizontalDistance <=
                    -oldExpenseSwipeMinimumDistance;

            if (
                swipedFromLeftEdge ||
                swipedFromRightEdge
            ) {
                hideOldExpenseSheet();
            }
        },
        {
            passive: true
        }
    );

    oldExpenseProof?.addEventListener("change", function () {
        const file = oldExpenseProof.files && oldExpenseProof.files[0];
        clearOldExpensePreview(false);

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
            "application/pdf"
        ];

        const maxSize = 10 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            oldExpenseProof.value = "";
            showOldExpenseMessage("Select JPG, PNG, WEBP, HEIC or PDF.", "#d32f2f");
            return;
        }

        if (file.size > maxSize) {
            oldExpenseProof.value = "";
            showOldExpenseMessage("Payment proof must be below 10 MB.", "#d32f2f");
            return;
        }

        selectedOldExpenseFile = file;

        if (oldExpenseProofFileName) {
            oldExpenseProofFileName.textContent = file.name;
        }

        oldExpenseProofPreview?.classList.add("show");

        if (oldExpenseProofPreviewImage && file.type.startsWith("image/")) {
            oldExpensePreviewUrl = URL.createObjectURL(file);
            oldExpenseProofPreviewImage.src = oldExpensePreviewUrl;
            oldExpenseProofPreviewImage.hidden = false;
        } else if (oldExpenseProofPreviewImage) {
            oldExpenseProofPreviewImage.hidden = true;
            oldExpenseProofPreviewImage.removeAttribute("src");
        }

        showOldExpenseMessage("", "");
    });

    async function uploadOldExpenseProof(file, adminMobile) {
        const safeMobile = String(adminMobile || "unknown-admin")
            .replace(/[^0-9a-zA-Z_-]/g, "");

        const safeFileName = makeSafeFileName(file.name);
        const filePath = `old-expenses/${safeMobile}/${getTodayDate()}/${safeFileName}`;

        const { error: uploadError } = await dbClient.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type || "application/octet-stream"
            });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = dbClient.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return {
            filePath,
            publicUrl: publicUrlData?.publicUrl || null
        };
    }

    async function deleteUploadedOldExpenseProof(filePath) {
        if (!filePath) return;

        try {
            await dbClient.storage
                .from(BUCKET_NAME)
                .remove([filePath]);
        } catch (error) {
            console.error("Unable to remove old expense proof:", error);
        }
    }

    async function saveOldExpense(event) {
        event.preventDefault();

        const saveButton = oldExpenseForm?.querySelector('button[type="submit"]');
        if (!saveButton) return;

        const donationType = oldExpenseDonationType?.value || "";
        const description = oldExpenseDescription?.value.trim() || "";
        const vendorName = oldExpenseVendor?.value.trim() || "";
        const amount = Number(oldExpenseAmount?.value || 0);
        const expenseDate = oldExpenseDate?.value || "";
        const paymentType = oldExpensePaymentType?.value || "";
        const additionalInformation = oldExpenseInformation?.value.trim() || "";
        const selectedAdminMobile = oldExpenseAdmin?.value || "";
        const selectedAdminOption = oldExpenseAdmin?.options[oldExpenseAdmin.selectedIndex];
        const selectedAdminName =
            selectedAdminOption?.dataset.adminName ||
            selectedAdminOption?.textContent.trim() ||
            "";

        if (!selectedAdminMobile) {
            showOldExpenseMessage("Please select an admin.", "#d32f2f");
            oldExpenseAdmin?.focus();
            return;
        }

        const allowedDonationTypes = [
            "Chavithi Donation",
            "Santharpana Donation"
        ];

        if (!allowedDonationTypes.includes(donationType)) {
            showOldExpenseMessage("Please select donation type.", "#d32f2f");
            oldExpenseDonationType?.focus();
            return;
        }

        if (!description) {
            showOldExpenseMessage("Enter expense description.", "#d32f2f");
            oldExpenseDescription?.focus();
            return;
        }

        if (!vendorName) {
            showOldExpenseMessage("Enter vendor name.", "#d32f2f");
            oldExpenseVendor?.focus();
            return;
        }

        

        if (!Number.isFinite(amount) || amount <= 0) {
            showOldExpenseMessage("Enter a valid expense amount.", "#d32f2f");
            oldExpenseAmount?.focus();
            return;
        }

        if (!expenseDate) {
            showOldExpenseMessage("Select expense date.", "#d32f2f");
            oldExpenseDate?.focus();
            return;
        }

        if (!paymentType) {
            showOldExpenseMessage("Select payment type.", "#d32f2f");
            oldExpensePaymentType?.focus();
            return;
        }

     

        saveButton.disabled = true;
        saveButton.innerHTML = '<span class="btnSpinner"></span>';
        showOldExpenseMessage("", "");

        let uploadedFilePath = null;

        try {
            let uploadResult = {
                filePath: null,
                publicUrl: null
            };

            if (selectedOldExpenseFile) {
                uploadResult =
                    await uploadOldExpenseProof(
                        selectedOldExpenseFile,
                        selectedAdminMobile
                    );

                uploadedFilePath =
                    uploadResult.filePath;
            }

            const oldExpenseData = {
                donation_type: donationType,
                expense_description: description,
                vendor_name: vendorName,
               
                expense_amount: amount,
                expense_date: expenseDate,
                payment_type: paymentType,
                proof_file_name:
                    selectedOldExpenseFile
                        ? selectedOldExpenseFile.name
                        : null,

                proof_file_type:
                    selectedOldExpenseFile
                        ? (
                            selectedOldExpenseFile.type ||
                            "application/octet-stream"
                        )
                        : null,

                proof_file_path:
                    uploadResult.filePath,

                proof_public_url:
                    uploadResult.publicUrl,
                additional_information: additionalInformation || null,
                created_by_mobile: selectedAdminMobile,
                created_by_name: selectedAdminName || null
            };

            const { error: insertError } = await dbClient
                .from(TABLE_NAME)
                .insert([oldExpenseData]);

            if (insertError) {
                await deleteUploadedOldExpenseProof(uploadedFilePath);
                throw insertError;
            }

            saveButton.innerHTML = '<span class="btnSuccessTick"></span>';
            showOldExpenseMessage("Old expense saved successfully.", "#2e7d32");

            resetOldExpenseForm();
            await loadOldExpenseAdmins();

            setTimeout(function () {
                saveButton.disabled = false;
                saveButton.textContent = "Save Old Expense";
            }, 1200);

        } catch (error) {
            console.error("Old expense save error:", error);
            saveButton.disabled = false;
            saveButton.textContent = "Save Old Expense";
            showOldExpenseMessage(
                error?.message || "Unable to save old expense.",
                "#d32f2f"
            );
        }
    }

    oldExpenseForm?.addEventListener("submit", saveOldExpense);

    window.openOldExpenseSheet = openOldExpenseSheet;
    window.hideOldExpenseSheet = hideOldExpenseSheet;
    window.loadOldExpenseAdmins = loadOldExpenseAdmins;
    window.resetOldExpenseForm = resetOldExpenseForm;
})();
