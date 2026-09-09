"use strict";

window.LifelineFirebase = (() => {
    let initialized = false;
    let confirmationResult = null;
    let recaptchaVerifier = null;

    function init() {
        if (initialized) return true;

        const config = window.LifelineConfig?.FIREBASE;

        if (!config) {
            console.error("[LIFELINE] Firebase config is missing.");
            return false;
        }

        if (!config.apiKey || config.apiKey.startsWith("YOUR_")) {
            console.error("[LIFELINE] Firebase API key is missing.");
            return false;
        }

        if (!window.firebase) {
            console.error("[LIFELINE] Firebase SDK is not loaded.");
            return false;
        }

        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }

            firebase.auth().setPersistence(
                firebase.auth.Auth.Persistence.LOCAL
            ).catch(error => {
                console.error("[LIFELINE] Auth persistence error:", error);
            });

            initialized = true;
            console.log("[LIFELINE] Firebase initialized successfully.");
            return true;
        } catch (error) {
            console.error("[LIFELINE] Firebase initialization failed:", error);
            return false;
        }
    }

    function auth() {
        if (!init()) {
            throw new Error("Firebase is not configured. Check js/config.js.");
        }
        return firebase.auth();
    }

    async function signup(email, password) {
        const firebaseAuth = auth();
        email = String(email || "").trim();
        password = String(password || "");

        if (!email) throw new Error("Enter your email address.");
        if (!password) throw new Error("Enter your password.");
        if (password.length < 6) throw new Error("Password must contain at least 6 characters.");

        const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        console.log("[LIFELINE] Account created:", result.user.email);
        return result.user;
    }

    async function login(email, password) {
        const firebaseAuth = auth();
        email = String(email || "").trim();
        password = String(password || "");

        if (!email) throw new Error("Enter your email address.");
        if (!password) throw new Error("Enter your password.");

        const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
        console.log("[LIFELINE] Email login successful:", result.user.email);
        return result.user;
    }

    async function googleLogin() {
        const firebaseAuth = auth();
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const result = await firebaseAuth.signInWithPopup(provider);
            console.log("[LIFELINE] Google login successful:", result.user.email);
            return result.user;
        } catch (error) {
            console.error("[LIFELINE] Google login failed:", error);
            throw error;
        }
    }

    async function resetPassword(email) {
        const firebaseAuth = auth();
        email = String(email || "").trim();
        if (!email) throw new Error("Enter your email address.");

        try {
            await firebaseAuth.sendPasswordResetEmail(email);
            console.log("[LIFELINE] Password reset email sent.");
            return true;
        } catch (error) {
            console.error("[LIFELINE] Password reset failed:", error);
            throw error;
        }
    }

    function clearRecaptcha() {
        if (recaptchaVerifier) {
            try {
                recaptchaVerifier.clear();
            } catch (_) {}
        }
        recaptchaVerifier = null;
        const container = document.getElementById("recaptcha-container");
        if (container) container.innerHTML = "";
    }

    function createRecaptcha() {
        auth();
        if (recaptchaVerifier) return recaptchaVerifier;

        const container = document.getElementById("recaptcha-container");
        if (!container) throw new Error("reCAPTCHA container is missing.");

        recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
            size: "invisible",
            callback: () => console.log("[LIFELINE] reCAPTCHA verified."),
            "expired-callback": () => {
                console.warn("[LIFELINE] reCAPTCHA expired.");
                clearRecaptcha();
            },
            "error-callback": () => {
                console.warn("[LIFELINE] reCAPTCHA error.");
                clearRecaptcha();
            }
        });

        return recaptchaVerifier;
    }

    async function sendOtp(phoneNumber) {
        const firebaseAuth = auth();
        const phone = String(phoneNumber || "").trim();

        if (!phone) throw new Error("Enter your phone number.");
        if (!/^\+\d{8,15}$/.test(phone)) {
            throw new Error("Use international format, e.g. +919876543210.");
        }

        if (recaptchaVerifier) {
            try { await recaptchaVerifier.render(); } catch (_) { clearRecaptcha(); }
        }

        const verifier = createRecaptcha();

        try {
            console.log("[LIFELINE] Sending OTP to:", phone);
            confirmationResult = await firebaseAuth.signInWithPhoneNumber(phone, verifier);
            console.log("[LIFELINE] OTP sent successfully.");
            return true;
        } catch (error) {
            console.error("[LIFELINE] OTP sending failed:", error);
            confirmationResult = null;
            clearRecaptcha();
            throw error;
        }
    }

    async function verifyOtp(code) {
        if (!confirmationResult) throw new Error("Request an OTP first.");

        code = String(code || "").trim();
        if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit OTP.");

        try {
            console.log("[LIFELINE] Verifying OTP...");
            const result = await confirmationResult.confirm(code);
            confirmationResult = null;
            clearRecaptcha();
            console.log("[LIFELINE] Phone authentication successful:", result.user.phoneNumber);
            return result.user;
        } catch (error) {
            console.error("[LIFELINE] OTP verification failed:", error);
            throw error;
        }
    }

    function observe(callback) {
        if (!init()) {
            callback(null);
            return () => {};
        }

        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("[LIFELINE] Signed in:", user.email || user.phoneNumber || user.uid);
            } else {
                console.log("[LIFELINE] Signed out.");
            }
            callback(user);
        });
    }

    async function logout() {
        const firebaseAuth = auth();
        await firebaseAuth.signOut();
        confirmationResult = null;
        clearRecaptcha();
        console.log("[LIFELINE] User signed out.");
    }

    return {
        init,
        signup,
        login,
        googleLogin,
        resetPassword,
        sendOtp,
        verifyOtp,
        observe,
        logout
    };
})();