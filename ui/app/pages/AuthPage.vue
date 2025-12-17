<!--
 * File: ui/app/pages/AuthPage.vue
 * Description: VNC-based authentication page for adding new Google AI Studio accounts
 *
 * Maintainers: iBenzene, bbbugg
 * Original Author: Ellinav
-->

<template>
    <div v-cloak class="vnc-app">
        <div id="vnc-container">
            <div id="vnc-surface" />
            <div v-if="statusTitle" class="vnc-status" :class="`is-${statusTone}`">
                <div class="vnc-status-card">
                    <div class="vnc-status-title">
                        {{ statusTitle }}
                    </div>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-if="statusDetail" class="vnc-status-detail" v-html="statusDetail" />
                    <button
                        v-if="showReload"
                        class="vnc-status-reload"
                        type="button"
                        @click="reloadPage"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        </div>

        <el-affix
            :offset="20"
            position="top"
            class="vnc-affix vnc-affix-back"
            style="position: fixed; left: 20px; top: 20px; z-index: 999;"
        >
            <button
                class="vnc-icon-button"
                type="button"
                aria-label="Back"
                title="Back"
                @click="goBack"
            >
                <svg
                    t="1765981746589"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <path
                        d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.053961-18.416442-49.910737-18.416442-68.964698 0L291.75176 480.290811c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.633237 345.688183c9.525957 9.207709 22.01234 13.796214 34.497699 13.796214 12.485359 0 24.971741-4.588505 34.466999-13.82896 19.052938-18.416442 19.052938-48.242747 0-66.660212L395.21518 513.604544z"
                        fill="#272636"
                    />
                </svg>
            </button>
        </el-affix>

        <el-affix
            :offset="20"
            position="bottom"
            class="vnc-affix vnc-affix-bar"
            style="position: fixed; left: 50%; bottom: 20px; transform: translateX(-50%); z-index: 999;"
        >
            <div class="vnc-action-bar">
                <button
                    class="vnc-bar-button"
                    type="button"
                    :disabled="!isConnected"
                    aria-label="Input text"
                    title="Input text"
                    @click="openTextDialog"
                >
                    <svg
                        t="1765981976088"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            d="M0 288v464c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V288c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m952 464H72c-4.4 0-8-3.6-8-8V296c0-4.4 3.6-8 8-8h880c4.4 0 8 3.6 8 8v448c0 4.4-3.6 8-8 8z"
                        />
                        <path
                            d="M632 672H264c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM184 544h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM184 672h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM888 672h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM760 672h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM312 544h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM440 544h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM568 544h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM696 544h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM216 432h-80c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM360 432h-80c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM504 432h-80c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM792 432h-80c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM648 432h-80c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8z"
                        />
                        <path
                            d="M896 376v136c0 17.7-14.3 32-32 32H760c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h64c4.4 0 8-3.6 8-8v-96c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8z"
                        />
                    </svg>
                </button>
                <button
                    class="vnc-bar-button"
                    type="button"
                    :disabled="!isConnected"
                    aria-label="Backspace"
                    title="Backspace"
                    @click="sendBackspace"
                >
                    <svg
                        t="1765982025284"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            d="M494.48 673.68l113.136-113.152 113.152 113.136 56.56-56.56-113.136-113.12 113.136-113.152-56.56-56.56-113.152 113.136-113.136-113.136-56.56 56.56 113.136 113.136-113.136 113.136 56.56 56.56zM324.912 160L22.576 508.64 325.264 848H1008V160H324.912zM928 768H361.2L128.928 507.904 361.536 240H928v528z"
                            fill="#565D64"
                        />
                    </svg>
                </button>
                <button
                    class="vnc-bar-button is-save"
                    type="button"
                    :disabled="!isConnected || isSaving"
                    aria-label="Save session"
                    title="Save session"
                    @click="saveAuth"
                >
                    <svg
                        t="1765982053330"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            d="M860.2 41H163.8C96.1 41 41 96.1 41 163.8v696.3C41 927.9 96.1 983 163.8 983h696.3c67.8 0 122.9-55.1 122.9-122.9V163.8C983 96.1 927.9 41 860.2 41z m-532.5 81.9h368.6v163.8c0 22.6-18.4 41-41 41H368.6c-22.6 0-41-18.4-41-41V122.9z m573.4 737.3c0 22.6-18.4 41-41 41H163.8c-22.6 0-41-18.4-41-41V163.8c0-22.6 18.4-41 41-41h81.9v163.8c0 67.8 55.1 122.9 122.9 122.9h286.7c67.8 0 122.9-55.1 122.9-122.9V122.9h81.9c22.6 0 41 18.4 41 41v696.3z"
                        />
                        <path
                            d="M593.9 276.5c28.2 0 51.2-23 51.2-51.2s-23-51.2-51.2-51.2c-28.2 0-51.2 23-51.2 51.2s23.1 51.2 51.2 51.2zM737.3 675.8H286.7c-22.5 0-41 18.4-41 41 0 22.5 18.4 41 41 41h450.6c22.5 0 41-18.4 41-41-0.1-22.5-18.5-41-41-41z"
                        />
                    </svg>
                </button>
            </div>
        </el-affix>

        <el-dialog
            v-model="showIntroDialog"
            class="vnc-dialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            align-center
        >
            <template #header>
                <div class="vnc-dialog-title">
                    Session Notice
                </div>
            </template>
            <div class="vnc-dialog-body">
                <p class="vnc-dialog-text">
                    This VNC session is temporary and will automatically close after 10 minutes of inactivity or after saving.
                </p>
                <el-checkbox v-model="skipIntro">
                    Don't show again
                </el-checkbox>
            </div>
            <template #footer>
                <el-button @click="handleIntroCancel">
                    Cancel
                </el-button>
                <el-button type="primary" @click="handleIntroConfirm">
                    I understand
                </el-button>
            </template>
        </el-dialog>

        <el-dialog
            v-model="showTextDialog"
            class="vnc-dialog"
            title="Send Text"
            :close-on-click-modal="false"
            align-center
        >
            <el-input
                ref="textInputRef"
                v-model="textInput"
                type="textarea"
                :rows="4"
                placeholder="Type text to send to the remote session"
                maxlength="2000"
                show-word-limit
            />
            <template #footer>
                <el-button @click="closeTextDialog">
                    Cancel
                </el-button>
                <el-button type="primary" :disabled="!textInput" @click="sendText">
                    Send
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import "../styles/auth.less";

const hasInitialized = ref(false);
const isConnected = ref(false);
const isSaving = ref(false);
const rfb = ref(null);
const showIntroDialog = ref(false);
const showReload = ref(false);
const showTextDialog = ref(false);
const skipIntro = ref(false);
const statusDetail = ref("");
const statusTitle = ref("");
const statusTone = ref("info");
const textInput = ref("");
const textInputRef = ref(null);

const cleanupSession = () => {
    if (navigator.sendBeacon) {
        fetch("/api/vnc/sessions", {
            keepalive: true,
            method: "DELETE",
        }).catch(() => {});
    }
};

const clearStatus = () => {
    statusTitle.value = "";
    statusDetail.value = "";
    statusTone.value = "info";
    showReload.value = false;
};

const closeTextDialog = () => {
    showTextDialog.value = false;
};

const ensureConnected = () => {
    if (!rfb.value || !isConnected.value) {
        ElMessage.warning("VNC session is not connected yet.");
        return false;
    }
    return true;
};

const escapeHtml = value =>
    String(value).replace(/[&<>"']/g, char => ({
        "\"": "&quot;",
        "&": "&amp;",
        "'": "&#x27;",
        "<": "&lt;",
        ">": "&gt;",
    }[char]));

const goBack = () => {
    if (window.history.length > 1) {
        window.history.back();
        return;
    }
    window.location.href = "/";
};

const handleIntroCancel = () => {
    showIntroDialog.value = false;
    goBack();
};

const handleIntroConfirm = () => {
    if (skipIntro.value) {
        localStorage.setItem("vncIntroSkip", "1");
    }
    showIntroDialog.value = false;
    startVncIfNeeded();
};

const initializeVnc = () => {
    const vncContainer = document.getElementById("vnc-container");
    const vncSurface = document.getElementById("vnc-surface");

    if (!vncContainer || !vncSurface) {
        setStatus({
            detail: "Please refresh the page and try again.",
            reload: true,
            title: "VNC container is missing.",
            tone: "error",
        });
        return;
    }

    loadVncClient(vncContainer, vncSurface);
};

const isIntroDismissed = () => localStorage.getItem("vncIntroSkip") === "1";

const loadVncClient = async (vncContainer, vncSurface) => {
    setStatus({ title: "Loading VNC client library..." });

    let RFB;
    try {
        const module = await import("https://esm.sh/@novnc/novnc@1.4.0/lib/rfb.js");
        RFB = module.default;
    } catch (error) {
        console.error("Failed to load noVNC library:", error);
        const safeMessage = escapeHtml(error.message || error);
        setStatus({
            detail: `${safeMessage}<div class="vnc-status-note">Please check your internet connection.</div>`,
            reload: true,
            title: "Failed to load VNC client library.",
            tone: "error",
        });
        return;
    }

    setStatus({ title: "Requesting VNC session..." });

    try {
        const initialWidth = vncContainer.clientWidth;
        const initialHeight = vncContainer.clientHeight;

        const response = await fetch("/api/vnc/sessions", {
            body: JSON.stringify({ height: initialHeight, width: initialWidth }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        });

        let data = {};
        try {
            data = await response.json();
        } catch (err) {
            data = {};
        }

        if (!response.ok) {
            throw new Error(data.error || `Server responded with ${response.status}`);
        }
        if (data.error) {
            throw new Error(data.error);
        }

        vncSurface.innerHTML = "";

        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const wsUrl = `${protocol}://${window.location.host}/vnc`;

        const rfbOptions = { shared: true };
        if (data.password) {
            rfbOptions.credentials = { password: data.password };
        }

        rfb.value = new RFB(vncSurface, wsUrl, rfbOptions);

        rfb.value.addEventListener("connect", () => {
            isConnected.value = true;
            clearStatus();
        });

        rfb.value.addEventListener("disconnect", e => {
            isConnected.value = false;
            const detail = e && e.detail ? e.detail : {};
            const reason = detail.clean
                ? "Session closed normally."
                : (detail.reason || "Connection dropped unexpectedly.");
            setStatus({
                detail: `Reason: ${escapeHtml(reason)}`,
                reload: true,
                title: "VNC session has been closed.",
                tone: "neutral",
            });
        });

        rfb.value.addEventListener("securityfailure", e => {
            console.error("[VNC] Security failure:", e);
            isConnected.value = false;
            setStatus({
                detail: "The password was rejected by the server.",
                reload: true,
                title: "VNC authentication failed.",
                tone: "error",
            });
        });

        rfb.value.scaleViewport = true;
        rfb.value.resizeSession = false;
    } catch (error) {
        console.error("Error starting VNC session:", error);
        const safeMessage = escapeHtml(error.message || error);
        setStatus({
            detail: `${safeMessage}<div class="vnc-status-note">This feature requires Linux with <code>Xvfb</code>, <code>x11vnc</code>, and <code>websockify</code> installed.</div>`,
            reload: true,
            title: "Failed to start VNC session",
            tone: "error",
        });
    }
};

const openTextDialog = () => {
    if (!ensureConnected()) {
        return;
    }
    textInput.value = "";
    showTextDialog.value = true;
    nextTick(() => {
        textInputRef.value?.focus();
    });
};

const reloadPage = () => {
    window.location.reload();
};

const saveAuth = async (accountName = null) => {
    if (isSaving.value) {
        return;
    }
    if (!ensureConnected()) {
        return;
    }

    isSaving.value = true;

    try {
        const body = accountName ? JSON.stringify({ accountName }) : null;
        const headers = accountName ? { "Content-Type": "application/json" } : {};

        const response = await fetch("/api/vnc/auth", {
            body,
            headers,
            method: "POST",
        });

        const data = await response.json();

        if (data.message === "vncAuthSaveSuccess") {
            ElMessage.success(`Account "${data.accountName}" saved successfully!`);
            sessionStorage.setItem("newAuthInfo", JSON.stringify(data));
            window.location.href = "/";
            return;
        }

        if (data.message === "errorVncEmailFetchFailed") {
            isSaving.value = false;
            try {
                const result = await ElMessageBox.prompt(
                    "Could not automatically detect email. Please enter a name for this account:",
                    "Account Name",
                    {
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Save",
                        inputValue: "",
                    }
                );
                if (result && result.value) {
                    await saveAuth(result.value);
                } else {
                    ElMessage.info("Save cancelled.");
                }
            } catch (err) {
                if (err !== "cancel" && err !== "close") {
                    console.error(err);
                }
            }
            return;
        }

        ElMessage.error(`Failed to save authentication: ${data.error || "Unknown error."}`);
    } catch (error) {
        console.error("Error saving auth file:", error);
        ElMessage.error(
            `An error occurred while saving the auth file: ${error.message || error}.`
        );
    } finally {
        isSaving.value = false;
    }
};

const sendBackspace = () => {
    if (!ensureConnected()) {
        return;
    }
    rfb.value.sendKey(0xFF08, "Backspace", true);
    rfb.value.sendKey(0xFF08, "Backspace", false);
};

const sendText = () => {
    if (!ensureConnected()) {
        return;
    }
    const text = textInput.value;
    if (!text) {
        return;
    }
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        rfb.value.sendKey(code, char, true);
        rfb.value.sendKey(code, char, false);
    }
    textInput.value = "";
    showTextDialog.value = false;
};

const setStatus = ({ title, detail = "", tone = "info", reload = false }) => {
    statusTitle.value = title;
    statusDetail.value = detail;
    statusTone.value = tone;
    showReload.value = reload;
};

const startVncIfNeeded = () => {
    if (hasInitialized.value) {
        return;
    }
    hasInitialized.value = true;
    initializeVnc();
};

onMounted(() => {
    document.title = "Google AI Studio Proxy - Add Account";
    if (isIntroDismissed()) {
        startVncIfNeeded();
    } else {
        showIntroDialog.value = true;
    }
    window.addEventListener("unload", cleanupSession);
});

onBeforeUnmount(() => {
    window.removeEventListener("unload", cleanupSession);
});
</script>
