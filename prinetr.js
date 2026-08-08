/* =========================================================
   BLUETOOTH PRINTER SETTINGS POPUP
========================================================= */

(function createPrinterSettingsPopup() {

  if (document.getElementById("printerSettingsPopup")) {
    return;
  }

  /* =========================
     CREATE CSS
  ========================= */

  const printerStyle = document.createElement("style");

  printerStyle.textContent = `
    .printerSettingsPopup{
      position:fixed;
      inset:0;
      z-index:9999999;
      background:#ffffff;
      display:none;
      flex-direction:column;
      font-family:Arial,sans-serif;
      overflow:hidden;
    }

    .printerSettingsPopup.show{
      display:flex;
    }

    .printerSettingsHeader{
      width:100%;
      min-height:calc(64px + 25px);
      padding-top:25px;
      padding-left:14px;
      padding-right:14px;
      display:flex;
      align-items:center;
      gap:12px;
      background:#ffffff;
      border-bottom:1px solid #eeeeee;
      flex-shrink:0;
    }

    .printerSettingsBack{
      width:42px;
      height:42px;
      border:none;
      border-radius:50%;
      background:#f3f4f6;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      padding:0;
      flex-shrink:0;
    }

    .printerSettingsBack svg{
      width:23px;
      height:23px;
      fill:none;
      stroke:#111111;
      stroke-width:2.2;
      stroke-linecap:round;
      stroke-linejoin:round;
    }

    .printerSettingsTitle{
      margin:0;
      font-size:20px;
      line-height:1.2;
      font-weight:700;
      color:#111111;
    }

    .printerSettingsBody{
      flex:1;
      overflow-y:auto;
      padding:20px 16px 35px;
      background:#f7f7f8;
      -webkit-overflow-scrolling:touch;
    }

    .savedPrinterBox{
      width:100%;
      padding:16px;
      margin-bottom:18px;
      border-radius:14px;
      background:#ffffff;
      border:1px solid #e8e8e8;
    }

    .savedPrinterLabel{
      margin:0 0 7px;
      font-size:12px;
      font-weight:700;
      color:#777777;
      text-transform:uppercase;
      letter-spacing:.4px;
    }

    .savedPrinterName{
      margin:0;
      font-size:16px;
      font-weight:700;
      color:#111111;
      word-break:break-word;
    }

    .savedPrinterAddress{
      margin:5px 0 0;
      font-size:13px;
      color:#777777;
      word-break:break-word;
    }

    .printerSectionTitle{
      margin:0 0 12px;
      font-size:15px;
      font-weight:700;
      color:#222222;
    }

    .printerDevicesList{
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    .printerDeviceCard{
      width:100%;
      border:1px solid #e7e7e7;
      background:#ffffff;
      border-radius:14px;
      padding:15px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      text-align:left;
      cursor:pointer;
    }

    .printerDeviceCard:active{
      transform:scale(.985);
    }

    .printerDeviceInfo{
      min-width:0;
      flex:1;
    }

    .printerDeviceName{
      margin:0;
      font-size:15px;
      font-weight:700;
      color:#111111;
      word-break:break-word;
    }

    .printerDeviceAddress{
      margin:5px 0 0;
      font-size:12px;
      color:#777777;
      word-break:break-word;
    }

    .printerSelectText{
      flex-shrink:0;
      padding:8px 12px;
      border-radius:9px;
      background:#111111;
      color:#ffffff;
      font-size:12px;
      font-weight:700;
    }

    .printerDeviceCard.selected{
      border:2px solid #111111;
    }

    .printerDeviceCard.selected .printerSelectText{
      background:#e9e9e9;
      color:#111111;
    }

    .printerLoading,
    .printerEmpty,
    .printerError{
      width:100%;
      padding:24px 16px;
      border-radius:14px;
      background:#ffffff;
      border:1px solid #e8e8e8;
      text-align:center;
      font-size:14px;
      line-height:1.6;
      color:#666666;
    }

    .printerError{
      color:#d32f2f;
    }

    .printerRetryButton{
      margin-top:14px;
      padding:10px 18px;
      border:none;
      border-radius:10px;
      background:#111111;
      color:#ffffff;
      font-size:13px;
      font-weight:700;
      cursor:pointer;
    }
  `;

  document.head.appendChild(printerStyle);

  /* =========================
     CREATE POPUP HTML
  ========================= */

  const printerPopup = document.createElement("div");

  printerPopup.id = "printerSettingsPopup";
  printerPopup.className = "printerSettingsPopup";
  printerPopup.setAttribute("aria-hidden", "true");

  printerPopup.innerHTML = `
    <div class="printerSettingsHeader">

      <button
        type="button"
        class="printerSettingsBack"
        id="printerSettingsBackBtn"
        aria-label="Back"
      >
        <svg viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>

      <h2 class="printerSettingsTitle">
        Printer Settings
      </h2>

    </div>

    <div class="printerSettingsBody">

      <div class="savedPrinterBox">
        <p class="savedPrinterLabel">
          Selected printer
        </p>

        <p
          class="savedPrinterName"
          id="savedPrinterName"
        >
          No printer selected
        </p>

        <p
          class="savedPrinterAddress"
          id="savedPrinterAddress"
        ></p>
      </div>

      <p class="printerSectionTitle">
        Paired Bluetooth devices
      </p>

      <div
        class="printerDevicesList"
        id="printerDevicesList"
      >
        <div class="printerLoading">
          Loading paired devices...
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(printerPopup);

})();


/* =========================================================
   PRINTER POPUP ELEMENTS
========================================================= */

const printerSettingsPopup =
  document.getElementById("printerSettingsPopup");

const printerSettingsBackBtn =
  document.getElementById("printerSettingsBackBtn");

const printerDevicesList =
  document.getElementById("printerDevicesList");

const savedPrinterName =
  document.getElementById("savedPrinterName");

const savedPrinterAddress =
  document.getElementById("savedPrinterAddress");


/* =========================================================
   OPEN PRINTER SETTINGS
========================================================= */

function openPrinterSettingsPopup() {

  printerSettingsPopup.classList.add("show");

  printerSettingsPopup.setAttribute(
    "aria-hidden",
    "false"
  );

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  loadSavedPrinter();
  loadPairedPrinters();
}


/* =========================================================
   CLOSE PRINTER SETTINGS
========================================================= */

function closePrinterSettingsPopup() {

  printerSettingsPopup.classList.remove("show");

  printerSettingsPopup.setAttribute(
    "aria-hidden",
    "true"
  );

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}


/* =========================================================
   SAVED PRINTER
========================================================= */

function getSavedPrinterData() {

  try {

    if (
      !window.AndroidPrinter ||
      typeof window.AndroidPrinter.getSavedPrinter !== "function"
    ) {
      return {
        saved: false,
        name: "",
        address: ""
      };
    }

    const result =
      window.AndroidPrinter.getSavedPrinter();

    return JSON.parse(result);

  } catch (error) {

    console.error(
      "Unable to read saved printer:",
      error
    );

    return {
      saved: false,
      name: "",
      address: ""
    };
  }
}


function loadSavedPrinter() {

  const printer =
    getSavedPrinterData();

  if (
    printer.saved &&
    printer.address
  ) {

    savedPrinterName.textContent =
      printer.name || "Bluetooth printer";

    savedPrinterAddress.textContent =
      printer.address;

  } else {

    savedPrinterName.textContent =
      "No printer selected";

    savedPrinterAddress.textContent =
      "";
  }
}


/* =========================================================
   LOAD PAIRED PRINTERS
========================================================= */

function loadPairedPrinters() {

  printerDevicesList.innerHTML = `
    <div class="printerLoading">
      Loading paired devices...
    </div>
  `;

  try {

    if (
      !window.AndroidPrinter ||
      typeof window.AndroidPrinter.getPairedPrinters !== "function"
    ) {

      printerDevicesList.innerHTML = `
        <div class="printerError">
          Printer settings are available only inside the Android app.
        </div>
      `;

      return;
    }

    const resultText =
      window.AndroidPrinter.getPairedPrinters();

    const result =
      JSON.parse(resultText);

    if (!result.success) {

      printerDevicesList.innerHTML = `
        <div class="printerError">
          ${escapePrinterText(
            result.message ||
            "Unable to load paired devices"
          )}

          <br>

          <button
            type="button"
            class="printerRetryButton"
            id="printerRetryButton"
          >
            Try Again
          </button>
        </div>
      `;

      document
        .getElementById("printerRetryButton")
        ?.addEventListener(
          "click",
          loadPairedPrinters
        );

      return;
    }

    const printers =
      Array.isArray(result.printers)
        ? result.printers
        : [];

    if (!printers.length) {

      printerDevicesList.innerHTML = `
        <div class="printerEmpty">
          No paired Bluetooth devices found.
          <br>
          Pair your printer from Android Bluetooth settings first.
        </div>
      `;

      return;
    }

    renderPairedPrinters(printers);

  } catch (error) {

    console.error(
      "Unable to load paired printers:",
      error
    );

    printerDevicesList.innerHTML = `
      <div class="printerError">
        Unable to load paired Bluetooth devices.

        <br>

        <button
          type="button"
          class="printerRetryButton"
          id="printerRetryButton"
        >
          Try Again
        </button>
      </div>
    `;

    document
      .getElementById("printerRetryButton")
      ?.addEventListener(
        "click",
        loadPairedPrinters
      );
  }
}


/* =========================================================
   RENDER PAIRED PRINTERS
========================================================= */

function renderPairedPrinters(printers) {

  const savedPrinter =
    getSavedPrinterData();

  printerDevicesList.innerHTML = "";

  printers.forEach(function(printer) {

    const isSelected =
      savedPrinter.address &&
      savedPrinter.address === printer.address;

    const printerButton =
      document.createElement("button");

    printerButton.type = "button";

    printerButton.className =
      "printerDeviceCard" +
      (isSelected ? " selected" : "");

    printerButton.innerHTML = `
      <div class="printerDeviceInfo">

        <p class="printerDeviceName">
          ${escapePrinterText(
            printer.name ||
            "Unknown Bluetooth device"
          )}
        </p>

        <p class="printerDeviceAddress">
          ${escapePrinterText(
            printer.address || ""
          )}
        </p>

      </div>

      <span class="printerSelectText">
        ${isSelected ? "Selected" : "Select"}
      </span>
    `;

    printerButton.addEventListener(
      "click",
      function() {

        saveSelectedPrinter(
          printer.name ||
          "Bluetooth printer",
          printer.address || ""
        );
      }
    );

    printerDevicesList.appendChild(
      printerButton
    );
  });
}


/* =========================================================
   SAVE SELECTED PRINTER
========================================================= */

function saveSelectedPrinter(
  printerName,
  printerAddress
) {

  if (!printerAddress) {
    return;
  }

  try {

    if (
      !window.AndroidPrinter ||
      typeof window.AndroidPrinter.savePrinter !== "function"
    ) {

      alert(
        "Printer selection is available only inside the Android app."
      );

      return;
    }

    const saved =
      window.AndroidPrinter.savePrinter(
        printerName,
        printerAddress
      );

    if (!saved) {

      alert("Unable to save printer.");

      return;
    }

    loadSavedPrinter();
    loadPairedPrinters();

  } catch (error) {

    console.error(
      "Unable to save printer:",
      error
    );

    alert("Unable to save printer.");
  }
}


/* =========================================================
   SAFE TEXT
========================================================= */

function escapePrinterText(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

document.addEventListener(
  "click",
  function(event) {

    const openButton =
      event.target.closest(
        "#openPrinterSettingsBtn"
      );

    if (openButton) {

      openPrinterSettingsPopup();

      return;
    }
  }
);


printerSettingsBackBtn.addEventListener(
  "click",
  closePrinterSettingsPopup
);
