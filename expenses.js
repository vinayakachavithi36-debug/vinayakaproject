/* =========================================================
   OPEN EXPENSE SHEET
========================================================= */

function openExpenseSheet(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (typeof menuSheet !== "undefined" && menuSheet) {
        menuSheet.classList.remove("show");
        menuSheet.setAttribute("aria-hidden", "true");
    }

    if (typeof window.resetExpenseForm === "function") {
        window.resetExpenseForm();
    }

    if (typeof sheetBackdrop !== "undefined" && sheetBackdrop) {
        sheetBackdrop.classList.add("show");
    }

    if (typeof expenseSheet !== "undefined" && expenseSheet) {
        expenseSheet.classList.add("show");
        expenseSheet.setAttribute("aria-hidden", "false");
        expenseSheet.scrollTop = 0;
    }
}


/* EXPENSE BUTTON */

if (
    typeof openExpenseButton !== "undefined" &&
    openExpenseButton
) {
    openExpenseButton.addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            event.stopPropagation();
            openExpenseSheet(event);
        }
    );
}


/* =========================================================
   EXPENSE FORM
========================================================= */

(() => {
    "use strict";

    const expenseForm =
        document.getElementById("expenseForm");

    const expenseDescription =
        document.getElementById("expenseDescription");

    const vendorName =
        document.getElementById("vendorName");

    const expenseType =
        document.getElementById("expenseType");

    const expenseAmount =
        document.getElementById("expenseAmount");

    const expenseDate =
        document.getElementById("expenseDate");

    const paymentProof =
        document.getElementById("paymentProof");

    const proofPreview =
        document.getElementById("proofPreview");

    const proofPreviewImage =
        document.getElementById("proofPreviewImage");

    const proofFileName =
        document.getElementById("proofFileName");

    const expenseMessage =
        document.getElementById("expenseMessage");

    const expenseBalanceText =
        document.getElementById("expenseBalanceText");

    if (!expenseForm) {
        console.error("Expense form not found.");
        return;
    }

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

    let selectedExpenseFile = null;
    let previewObjectUrl = null;
    let currentAvailableBalance = null;
    let balanceRequestId = 0;

    const BUCKET_NAME = "expenses-proff";
    const TABLE_NAME = "chavithi_expenses";


    function getTodayDate() {
        const now = new Date();

        const year = now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function showExpenseMessage(text, color) {
        if (!expenseMessage) {
            return;
        }

        expenseMessage.style.color = color || "";
        expenseMessage.textContent = text || "";
    }


    function formatExpenseCurrency(amount) {
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(Number(amount) || 0);
    }


    function hideExpenseBalance() {
        currentAvailableBalance = null;

        if (!expenseBalanceText) {
            return;
        }

        expenseBalanceText.hidden = true;
        expenseBalanceText.textContent = "Total balance: ₹0";

        expenseBalanceText.classList.remove(
            "loading",
            "error"
        );
    }


    async function getDonationTotal(tableName) {
        const { data, error } =
            await dbClient
                .from(tableName)
                .select("donation_amount");

        if (error) {
            throw error;
        }

        return (data || []).reduce(
            function (total, row) {
                return total +
                    Number(row.donation_amount || 0);
            },
            0
        );
    }


    async function getExpenseTotal(expenseTypeName) {
        const { data, error } =
            await dbClient
                .from(TABLE_NAME)
                .select("expense_amount")
                .eq(
                    "expense_type",
                    expenseTypeName
                );

        if (error) {
            throw error;
        }

        return (data || []).reduce(
            function (total, row) {
                return total +
                    Number(row.expense_amount || 0);
            },
            0
        );
    }


    async function loadExpenseBalance() {
        if (!expenseType || !expenseBalanceText) {
            return;
        }

        const selectedType =
            expenseType.value;

        if (!selectedType) {
            hideExpenseBalance();
            return;
        }

        let donationTable = "";

        if (
            selectedType ===
            "Chavithi Donations"
        ) {
            donationTable =
                "chavithi_donations";

        } else if (
            selectedType ===
            "Santharpana Donations"
        ) {
            donationTable =
                "santharpana_donations";

        } else {
            hideExpenseBalance();
            return;
        }

        const requestId =
            ++balanceRequestId;

        currentAvailableBalance = null;

        expenseBalanceText.hidden = false;

        expenseBalanceText.classList.remove(
            "error"
        );

        expenseBalanceText.classList.add(
            "loading"
        );

        expenseBalanceText.textContent =
            "Checking total balance...";

        try {
            const [
                donationTotal,
                expenseTotal
            ] =
                await Promise.all([
                    getDonationTotal(
                        donationTable
                    ),
                    getExpenseTotal(
                        selectedType
                    )
                ]);

            if (
                requestId !== balanceRequestId ||
                expenseType.value !== selectedType
            ) {
                return;
            }

            const availableBalance =
                donationTotal - expenseTotal;

            currentAvailableBalance =
                availableBalance;

            expenseBalanceText.classList.remove(
                "loading",
                "error"
            );

            expenseBalanceText.textContent =
                "Total balance: " +
                formatExpenseCurrency(
                    availableBalance
                );

        } catch (error) {
            if (requestId !== balanceRequestId) {
                return;
            }

            console.error(
                "Expense balance error:",
                error
            );

            currentAvailableBalance = null;

            expenseBalanceText.classList.remove(
                "loading"
            );

            expenseBalanceText.classList.add(
                "error"
            );

            expenseBalanceText.textContent =
                "Unable to load balance.";
        }
    }


    function clearExpensePreview(
        clearFileInput = true
    ) {
        selectedExpenseFile = null;

        if (previewObjectUrl) {
            URL.revokeObjectURL(
                previewObjectUrl
            );

            previewObjectUrl = null;
        }

        if (
            clearFileInput &&
            paymentProof
        ) {
            paymentProof.value = "";
        }

        if (proofPreview) {
            proofPreview.classList.remove(
                "show"
            );
        }

        if (proofPreviewImage) {
            proofPreviewImage.hidden = true;
            proofPreviewImage.removeAttribute(
                "src"
            );
        }

        if (proofFileName) {
            proofFileName.textContent = "";
        }
    }


    function resetExpenseForm() {
        expenseForm.reset();

        if (expenseDate) {
            expenseDate.value =
                getTodayDate();
        }

        clearExpensePreview(true);
        hideExpenseBalance();
        showExpenseMessage("", "");
    }


    if (
        expenseDate &&
        !expenseDate.value
    ) {
        expenseDate.value =
            getTodayDate();
    }


    /*
      IMPORTANT:
      Balance loads immediately when admin changes Expense Type.
    */
    if (expenseType) {
        expenseType.addEventListener(
            "change",
            loadExpenseBalance
        );
    }


    if (paymentProof) {
        paymentProof.addEventListener(
            "change",
            function () {
                const file =
                    paymentProof.files &&
                    paymentProof.files[0];

                clearExpensePreview(false);

                if (!file) {
                    return;
                }

                const allowedTypes = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                    "image/heic",
                    "image/heif",
                    "application/pdf"
                ];

                const maximumSize =
                    10 * 1024 * 1024;

                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {
                    paymentProof.value = "";

                    showExpenseMessage(
                        "Please select JPG, PNG, WEBP, HEIC or PDF file.",
                        "#d32f2f"
                    );

                    return;
                }

                if (
                    file.size >
                    maximumSize
                ) {
                    paymentProof.value = "";

                    showExpenseMessage(
                        "Payment proof must be below 10 MB.",
                        "#d32f2f"
                    );

                    return;
                }

                selectedExpenseFile = file;

                if (proofFileName) {
                    proofFileName.textContent =
                        file.name;
                }

                if (proofPreview) {
                    proofPreview.classList.add(
                        "show"
                    );
                }

                if (
                    proofPreviewImage &&
                    file.type.startsWith(
                        "image/"
                    )
                ) {
                    previewObjectUrl =
                        URL.createObjectURL(
                            file
                        );

                    proofPreviewImage.onload =
                        function () {
                            proofPreviewImage.hidden =
                                false;
                        };

                    proofPreviewImage.onerror =
                        function () {
                            proofPreviewImage.hidden =
                                true;

                            showExpenseMessage(
                                "Image selected, but preview is not supported.",
                                "#8a6500"
                            );
                        };

                    proofPreviewImage.src =
                        previewObjectUrl;

                    proofPreviewImage.hidden =
                        false;

                } else if (
                    proofPreviewImage
                ) {
                    proofPreviewImage.hidden =
                        true;

                    proofPreviewImage.removeAttribute(
                        "src"
                    );
                }

                showExpenseMessage("", "");
            }
        );
    }


    function createSafeFileName(fileName) {
        const extension =
            fileName.includes(".")
                ? fileName
                    .split(".")
                    .pop()
                    .toLowerCase()
                : "file";

        const randomPart =
            Math.random()
                .toString(36)
                .substring(2, 10);

        return (
            Date.now() +
            "_" +
            randomPart +
            "." +
            extension
        );
    }


    async function uploadExpenseProof(file) {
        const createdByMobile =
            localStorage.getItem(
                "loggedInUser"
            ) ||
            "unknown-user";

        const safeMobile =
            createdByMobile.replace(
                /[^0-9a-zA-Z_-]/g,
                ""
            );

        const safeFileName =
            createSafeFileName(
                file.name
            );

        const filePath =
            `${safeMobile}/${getTodayDate()}/${safeFileName}`;

        const { error: uploadError } =
            await dbClient.storage
                .from(BUCKET_NAME)
                .upload(
                    filePath,
                    file,
                    {
                        cacheControl:
                            "3600",

                        upsert:
                            false,

                        contentType:
                            file.type ||
                            "application/octet-stream"
                    }
                );

        if (uploadError) {
            throw uploadError;
        }

        const { data: publicUrlData } =
            dbClient.storage
                .from(BUCKET_NAME)
                .getPublicUrl(
                    filePath
                );

        const publicUrl =
            publicUrlData?.publicUrl ||
            null;

        return {
            filePath,
            publicUrl
        };
    }


    async function deleteUploadedProof(
        filePath
    ) {
        if (!filePath) {
            return;
        }

        try {
            await dbClient.storage
                .from(BUCKET_NAME)
                .remove([
                    filePath
                ]);

        } catch (error) {
            console.error(
                "Unable to remove uploaded proof:",
                error
            );
        }
    }


    async function saveExpense(event) {
        event.preventDefault();

        const saveButton =
            expenseForm.querySelector(
                'button[type="submit"]'
            );

        if (!saveButton) {
            console.error(
                "Expense save button not found."
            );

            return;
        }

        const description =
            expenseDescription?.value
                .trim() ||
            "";

        const paidTo =
            vendorName?.value
                .trim() ||
            "";

        const selectedExpenseType =
            expenseType?.value ||
            "";

        const amount =
            Number(
                expenseAmount?.value ||
                0
            );

        const selectedDate =
            expenseDate?.value ||
            "";

        if (!description) {
            showExpenseMessage(
                "Please enter expense description.",
                "#d32f2f"
            );

            expenseDescription?.focus();
            return;
        }

        if (!paidTo) {
            showExpenseMessage(
                "Please enter vendor name.",
                "#d32f2f"
            );

            vendorName?.focus();
            return;
        }

        const allowedExpenseTypes = [
            "Chavithi Donations",
            "Santharpana Donations"
        ];

        if (
            !allowedExpenseTypes.includes(
                selectedExpenseType
            )
        ) {
            showExpenseMessage(
                "Please select expense type.",
                "#d32f2f"
            );

            expenseType?.focus();
            return;
        }

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            showExpenseMessage(
                "Please enter a valid expense amount.",
                "#d32f2f"
            );

            expenseAmount?.focus();
            return;
        }

        if (
            currentAvailableBalance ===
            null
        ) {
            showExpenseMessage(
                "Please wait for the balance to load.",
                "#d32f2f"
            );

            return;
        }

        if (
            amount >
            currentAvailableBalance
        ) {
            showExpenseMessage(
                "Expense amount cannot exceed the available balance.",
                "#d32f2f"
            );

            expenseAmount?.focus();
            return;
        }

        if (!selectedDate) {
            showExpenseMessage(
                "Expense date is required.",
                "#d32f2f"
            );

            return;
        }

        if (!selectedExpenseFile) {
            showExpenseMessage(
                "Please select payment proof.",
                "#d32f2f"
            );

            paymentProof?.focus();
            return;
        }

        saveButton.disabled = true;

        saveButton.innerHTML = `
            <span class="btnSpinner"></span>
        `;

        showExpenseMessage("", "");

        let uploadedFilePath = null;

        try {
            const uploadResult =
                await uploadExpenseProof(
                    selectedExpenseFile
                );

            uploadedFilePath =
                uploadResult.filePath;

            const expenseData = {
                expense_description:
                    description,

                vendor_name:
                    paidTo,

                expense_type:
                    selectedExpenseType,

                expense_amount:
                    amount,

                expense_date:
                    selectedDate,

                proof_file_name:
                    selectedExpenseFile.name,

                proof_file_type:
                    selectedExpenseFile.type ||
                    "application/octet-stream",

                proof_file_path:
                    uploadResult.filePath,

                proof_public_url:
                    uploadResult.publicUrl,

                created_by_mobile:
                    localStorage.getItem(
                        "loggedInUser"
                    ) ||
                    null,

                created_by_name:
                    localStorage.getItem(
                        "loggedInName"
                    ) ||
                    null
            };

            const { error: insertError } =
                await dbClient
                    .from(TABLE_NAME)
                    .insert([
                        expenseData
                    ]);

            if (insertError) {
                await deleteUploadedProof(
                    uploadedFilePath
                );

                throw insertError;
            }

            saveButton.innerHTML = `
                <span class="btnSuccessTick"></span>
            `;

            showExpenseMessage(
                "Expense saved successfully.",
                "#2e7d32"
            );

            const savedExpenseType =
                selectedExpenseType;

            expenseForm.reset();

            if (expenseDate) {
                expenseDate.value =
                    getTodayDate();
            }

            clearExpensePreview(true);

            if (expenseType) {
                expenseType.value =
                    savedExpenseType;
            }

            await loadExpenseBalance();

            setTimeout(
                function () {
                    saveButton.disabled =
                        false;

                    saveButton.innerHTML =
                        "Save Expense";
                },
                1200
            );

        } catch (error) {
            console.error(
                "Expense save error:",
                error
            );

            saveButton.disabled = false;
            saveButton.innerHTML =
                "Save Expense";

            showExpenseMessage(
                error?.message ||
                "Unable to save expense.",
                "#d32f2f"
            );
        }
    }


    if (
        expenseForm.dataset
            .expenseSubmitReady ===
        "true"
    ) {
        return;
    }

    expenseForm.dataset
        .expenseSubmitReady =
        "true";

    expenseForm.addEventListener(
        "submit",
        saveExpense
    );

    window.resetExpenseForm =
        resetExpenseForm;

    window.loadExpenseBalance =
        loadExpenseBalance;

})();
