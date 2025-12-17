<template>
    <div class="login-page">
        <form action="/login" method="post" class="login-form">
            <button
                type="button"
                class="lang-switcher"
                :title="t('switchLanguage')"
                @click="toggleLanguage"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                </svg>
            </button>
            <div class="login-content">
                <h2 class="login-title">
                    {{ t('loginHeading') }}
                </h2>
                <div>
                    <input
                        type="password"
                        name="apiKey"
                        :placeholder="t('apiKeyPlaceholder')"
                        required
                        autofocus
                    >
                </div>
                <div>
                    <button type="submit">
                        {{ t('loginBtn') }}
                    </button>
                </div>
            </div>
            <p v-if="errorText" class="error">
                {{ errorText }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import I18n from "../app/utils/i18n";
import "../styles/login.less";

const route = useRoute();
const t = I18n.t;

const errorText = computed(() => {
    const code = String(route.query.error || "");
    if (code === "1") {
        return t("loginErrorInvalidKey");
    }
    if (code === "2") {
        return t("loginErrorRateLimit");
    }
    return "";
});

const toggleLanguage = async () => {
    await I18n.toggleLang();
};

watchEffect(() => {
    document.title = t("loginTitle");
});
</script>
