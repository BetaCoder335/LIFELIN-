(() => {
    "use strict";

    const $ = id => document.getElementById(id);

    const state = {
        user: null,
        mode: "online",
        currentView: "overview",
        profile: {
            name: "",
            age: "",
            blood: "",
            contactName: "",
            contactPhone: "",
            conditions: "",
            records: []
        },
        confirmation: null,
        session: null,
        history: [],
        lastGps: null,
        isRecording: false,
        recognition: null,
        speechSynthesis: window.speechSynthesis,
        isSpeaking: false
    };

    const apiBase = window.LifelineConfig?.API_BASE || "";

    // =========================================================
    // TOAST
    // =========================================================
    function toast(message) {
        const root = $("toast-root");
        if (!root) return;
        const el = document.createElement("div");
        el.className = "toast";
        el.textContent = message;
        root.appendChild(el);
        setTimeout(() => el.remove(), 3200);
    }

    // =========================================================
    // LOADING / AUTH / APP
    // =========================================================
    function hideLoading() {
        $("app-loading")?.classList.add("hide");
        setTimeout(() => $("app-loading")?.classList.add("hidden"), 320);
    }

    function showAuthScreen() {
        $("auth-screen")?.classList.remove("hidden");
        $("app")?.classList.add("hidden");
    }

    function showApp() {
        $("auth-screen")?.classList.add("hidden");
        $("app")?.classList.remove("hidden");
        renderOverview();
        populateProfileForm();
        renderRecords();
        renderEmergencyCard();
    }

    function profileName() {
        return state.profile.name || state.user?.displayName || state.user?.email?.split("@")[0] || "there";
    }

    function initials(name) {
        return (name || "U").trim().split(/\s+/).map(x => x[0]).join("").slice(0, 2).toUpperCase();
    }

    function updateIdentity() {
        const name = profileName();
        if ($("side-user-name")) $("side-user-name").textContent = name;
        if ($("side-user-meta")) $("side-user-meta").textContent = state.user?.email || state.user?.phoneNumber || "Signed in";
        const initialsText = initials(name);
        if ($("user-avatar")) $("user-avatar").textContent = initialsText;
        if ($("top-avatar")) $("top-avatar").textContent = initialsText;
        if ($("welcome-heading")) $("welcome-heading").textContent = `Welcome back, ${name}.`;
    }

    // =========================================================
    // AUTH
    // =========================================================
    function setAuthStatus(text, error = false) {
        const el = $("auth-status");
        if (!el) return;
        el.textContent = text || "";
        el.classList.toggle("error", error);
    }

    function friendlyAuthError(error) {
        const code = error?.code || "";
        const map = {
            "auth/invalid-email": "Enter a valid email address.",
            "auth/user-not-found": "No account exists with this email.",
            "auth/wrong-password": "Incorrect email or password.",
            "auth/invalid-credential": "Incorrect email or password.",
            "auth/email-already-in-use": "An account already exists with this email.",
            "auth/weak-password": "Use a stronger password (6+ characters).",
            "auth/popup-closed-by-user": "Google sign-in was cancelled.",
            "auth/popup-blocked": "Allow popups for this site and try again.",
            "auth/too-many-requests": "Too many attempts. Please wait a moment.",
            "auth/invalid-phone-number": "Enter a valid international phone number.",
            "auth/invalid-verification-code": "The OTP is incorrect.",
            "auth/code-expired": "The OTP expired. Send a new one.",
            "auth/captcha-check-failed": "reCAPTCHA failed. Try again."
        };
        return map[code] || error?.message || "Something went wrong. Please try again.";
    }

    // =========================================================
    // LOGOUT FUNCTION
    // =========================================================
    async function handleLogout() {
        const confirmLogout = confirm("Are you sure you want to sign out?");
        if (!confirmLogout) return;

        try {
            toast("👋 Signing out...");
            await window.LifelineFirebase.logout();
        } catch (error) {
            console.error("[LIFELINE] Logout error:", error);
            toast("❌ Could not sign out. Please try again.");
        }
    }

    function setupAuth() {
        const tabs = document.querySelectorAll("[data-auth-mode]");
        tabs.forEach(button => {
            button.addEventListener("click", () => {
                tabs.forEach(item => item.classList.remove("active"));
                button.classList.add("active");
                const signup = button.dataset.authMode === "signup";
                $("auth-name-wrap")?.classList.toggle("hidden", !signup);
                if ($("auth-title")) $("auth-title").textContent = signup ? "Create your LIFELINE account" : "Welcome back";
                if ($("auth-subtitle")) $("auth-subtitle").textContent = signup ? "Set up your health profile in a minute." : "Sign in to access your health dashboard.";
                if ($("auth-submit")) $("auth-submit").innerHTML = signup ? "Create account <span>\u2192</span>" : "Sign in <span>\u2192</span>";
                setAuthStatus("");
            });
        });

        $("form-auth")?.addEventListener("submit", async event => {
            event.preventDefault();
            const email = $("auth-email").value.trim();
            const password = $("auth-password").value;
            const name = $("auth-name")?.value.trim();
            const signup = document.querySelector("[data-auth-mode].active")?.dataset.authMode === "signup";

            try {
                setAuthStatus(signup ? "Creating account…" : "Signing in…");
                if (signup) {
                    const user = await window.LifelineFirebase.signup(email, password);
                    if (name && user) await user.updateProfile({ displayName: name });
                } else {
                    await window.LifelineFirebase.login(email, password);
                }
                setAuthStatus("Success.");
            } catch (error) {
                setAuthStatus(friendlyAuthError(error), true);
            }
        });

        $("google-login")?.addEventListener("click", async () => {
            try {
                await window.LifelineFirebase.googleLogin();
            } catch (error) {
                setAuthStatus(friendlyAuthError(error), true);
            }
        });

        $("forgot-password")?.addEventListener("click", async () => {
            const email = $("auth-email")?.value.trim();
            if (!email) {
                setAuthStatus("Enter your email first.", true);
                $("auth-email")?.focus();
                return;
            }
            try {
                setAuthStatus("Sending password reset email…");
                await window.LifelineFirebase.resetPassword(email);
                setAuthStatus("Password reset email sent. Check your inbox and spam folder.");
            } catch (error) {
                console.error("[LIFELINE] Forgot password error:", error);
                setAuthStatus(friendlyAuthError(error), true);
            }
        });

        $("phone-toggle")?.addEventListener("click", () => {
            const section = $("phone-auth");
            if (!section) return;
            section.classList.toggle("hidden");
            if (!section.classList.contains("hidden")) $("auth-phone")?.focus();
        });

        $("send-otp")?.addEventListener("click", async () => {
            const phone = $("auth-phone")?.value.trim();
            if (!phone) {
                setAuthStatus("Enter your phone number.", true);
                $("auth-phone")?.focus();
                return;
            }
            try {
                setAuthStatus("Sending OTP…");
                await window.LifelineFirebase.sendOtp(phone);
                $("otp-section")?.classList.remove("hidden");
                setAuthStatus("OTP sent. Check your phone.");
                $("auth-otp")?.focus();
            } catch (error) {
                console.error("[LIFELINE] Send OTP error:", error);
                setAuthStatus(friendlyAuthError(error), true);
            }
        });

        $("verify-otp")?.addEventListener("click", async () => {
            const code = $("auth-otp").value.trim();
            try {
                setAuthStatus("Verifying…");
                await window.LifelineFirebase.verifyOtp(code);
                setAuthStatus("Phone verified.");
            } catch (error) {
                setAuthStatus(friendlyAuthError(error), true);
            }
        });

        $("auth-otp")?.addEventListener("input", event => {
            event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
        });

        $("change-phone")?.addEventListener("click", () => {
            $("otp-section")?.classList.add("hidden");
            if ($("auth-otp")) $("auth-otp").value = "";
            setAuthStatus("");
        });

        // Logout buttons
        $("btn-logout")?.addEventListener("click", handleLogout);
        $("btn-logout-mobile")?.addEventListener("click", handleLogout);
    }

    // =========================================================
    // BACKEND FETCH
    // =========================================================
    async function token() {
        if (!state.user) throw new Error("Please sign in first.");
        if (typeof state.user.getIdToken !== "function") throw new Error("Your Firebase session is unavailable.");
        return state.user.getIdToken(true);
    }

    async function backendFetch(path, options = {}) {
        const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
        if (state.user && typeof state.user.getIdToken === "function") {
            try { headers.Authorization = `Bearer ${await token()}`; } catch (error) { console.warn("[LIFELINE] token fetch failed:", error); }
        }
        const response = await fetch(`${apiBase}/api${path}`, { ...options, headers });
        const text = await response.text();
        let data = {};
        try { data = text ? JSON.parse(text) : {}; } catch { data = { detail: text }; }
        if (!response.ok) throw new Error(data.detail || data.message || `Request failed (${response.status})`);
        return data;
    }

    // =========================================================
    // NAVIGATION
    // =========================================================
    const viewTitles = {
        overview: ["Overview", "Good to see you."],
        health: ["My Health", "Your health details"],
        records: ["Medical Records", "Your medical records"],
        emergency: ["Emergency Card", "Critical information"],
        triage: ["Emergency Triage", "Let's assess this."],
        assistant: ["AI Assistant", "Ask LIFELINE"],
        firstaid: ["First Aid", "Quick first aid guidance"]
    };

    function switchView(view) {
        if (!viewTitles[view]) return;
        state.currentView = view;
        document.querySelectorAll(".view").forEach(el => el.classList.toggle("hidden", el.id !== `view-${view}`));
        document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(button => {
            button.classList.toggle("active", button.dataset.view === view);
        });
        const [title, heading] = viewTitles[view];
        if ($("page-title")) $("page-title").textContent = title;
        if ($("page-heading")) $("page-heading").textContent = heading;
        if (view === "records") renderRecords();
        if (view === "health") populateProfileForm();
        if (view === "emergency") renderEmergencyCard();
        if (view === "overview") renderOverview();
        if (view === "assistant") {
            setTimeout(() => $("input-chat")?.focus(), 300);
        }
        if (view === "firstaid") {
            setTimeout(() => renderFirstAid(), 100);
        }
    }

    // =========================================================
    // PROFILE
    // =========================================================
    function renderOverview() {
        const p = state.profile;
        const fields = [p.name, p.age, p.blood, p.contactName, p.contactPhone, p.conditions];
        const filled = fields.filter(v => String(v || "").trim()).length;
        const percent = Math.round((filled / fields.length) * 100);
        if ($("profile-percent")) $("profile-percent").textContent = `${percent}%`;
        if ($("stat-blood")) $("stat-blood").textContent = p.blood || "Not added";
        if ($("stat-records")) $("stat-records").textContent = `${(p.records || []).length} records`;
        if ($("stat-contact")) $("stat-contact").textContent = p.contactName || "Not added";
        updateIdentity();
    }

    function populateProfileForm() {
        const mapping = {
            name: "prof-name",
            age: "prof-age",
            blood: "prof-blood",
            contactName: "prof-contact-name",
            contactPhone: "prof-contact-phone",
            conditions: "prof-conditions"
        };
        Object.entries(mapping).forEach(([key, id]) => {
            if ($(id)) $(id).value = state.profile[key] || "";
        });
    }

    function setProfileStatus(text, error = false) {
        const el = $("profile-status");
        if (!el) return;
        el.textContent = text;
        el.style.color = error ? "#d92d3d" : "#0a8f55";
    }

    async function saveProfile(silent = false) {
        state.profile = {
            ...state.profile,
            name: $("prof-name")?.value.trim() || "",
            age: $("prof-age")?.value.trim() || "",
            blood: $("prof-blood")?.value || "",
            contactName: $("prof-contact-name")?.value.trim() || "",
            contactPhone: $("prof-contact-phone")?.value.trim() || "",
            conditions: $("prof-conditions")?.value.trim() || ""
        };

        localStorage.setItem("lifeline_profile", JSON.stringify(state.profile));
        renderOverview();
        renderEmergencyCard();

        if (!state.user) {
            if (!silent) setProfileStatus("Saved locally. Sign in to sync to the cloud.");
            return;
        }

        try {
            await backendFetch("/profile", { method: "PUT", body: JSON.stringify(state.profile) });
            if (!silent) { setProfileStatus("Saved securely."); toast("Profile saved securely."); }
        } catch (error) {
            if (!silent) setProfileStatus(error.message, true);
        }
    }

    async function loadProfile() {
        const cached = localStorage.getItem("lifeline_profile");
        if (cached) {
            try { state.profile = { ...state.profile, ...JSON.parse(cached) }; } catch {}
        }
        if (!state.user) return;
        try {
            const data = await backendFetch("/profile");
            if (data.profile && typeof data.profile === "object") {
                state.profile = {
                    ...state.profile,
                    ...data.profile,
                    records: Array.isArray(data.profile.records) ? data.profile.records : state.profile.records
                };
            }
        } catch (error) {
            console.warn("[LIFELINE] profile load:", error.message);
        }
    }

    // =========================================================
    // EMERGENCY CARD
    // =========================================================
    function renderEmergencyCard() {
        const p = state.profile;
        if ($("em-name")) $("em-name").textContent = p.name || profileName();
        if ($("em-age")) $("em-age").textContent = p.age || "\u2014";
        if ($("em-blood")) $("em-blood").textContent = p.blood || "\u2014";
        if ($("em-conditions")) $("em-conditions").textContent = p.conditions || "Not added";
        if ($("em-contact")) $("em-contact").textContent = p.contactName || "Not added";
        if ($("em-phone")) $("em-phone").textContent = p.contactPhone || "\u2014";
        if ($("em-records")) $("em-records").textContent = `${(p.records || []).length} records`;
        if ($("call-contact")) $("call-contact").href = p.contactPhone ? `tel:${p.contactPhone}` : "#";
    }

    // =========================================================
    // RECORDS
    // =========================================================
    function renderRecords() {
        const records = Array.isArray(state.profile.records) ? state.profile.records : [];

        console.log("[LIFELINE] Rendering records:", records.length);

        if ($("records-total")) $("records-total").textContent = records.length;
        if ($("records-number")) $("records-number").textContent = records.length;

        const list = $("records-list");
        const empty = $("records-empty");

        if (!list) return;
        list.innerHTML = "";

        if (empty) {
            empty.classList.toggle("hidden", records.length > 0);
        }

        records.forEach((record, index) => {
            const card = document.createElement("article");
            card.className = "record-card";
            card.innerHTML = `
                <div class="record-file-icon">\u25A3</div>
                <div>
                    <h3>${escapeHtml(record.title || "Untitled record")}</h3>
                    <div class="record-meta">
                        ${escapeHtml(record.type || "Record")}
                        ${record.date ? ` \u2022 ${escapeHtml(record.date)}` : ""}
                        ${record.provider ? ` \u2022 ${escapeHtml(record.provider)}` : ""}
                        ${record.facility ? ` \u2022 ${escapeHtml(record.facility)}` : ""}
                        ${record.fileName ? ` \u2022 📎 ${escapeHtml(record.fileName)}` : ""}
                    </div>
                    ${record.notes ? `<p class="record-notes">${escapeHtml(record.notes)}</p>` : ""}
                    ${record.aiAnalysis ? `<p class="record-notes" style="color:#0a8f55;">🤖 AI: ${escapeHtml(record.aiAnalysis)}</p>` : ""}
                </div>
                <button class="record-delete" data-index="${index}">Delete</button>
            `;
            list.appendChild(card);
        });

        list.querySelectorAll(".record-delete").forEach(button => {
            button.addEventListener("click", () => deleteRecord(Number(button.dataset.index)));
        });
    }

    async function addRecord(event) {
        event.preventDefault();

        const title = $("record-title")?.value?.trim() || "";
        if (!title) {
            toast("Please add a record title.");
            return;
        }

        const fileInput = $("record-file");
        let fileData = null;
        let fileName = null;

        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileName = file.name;
            try {
                fileData = await readFileAsBase64(file);
                console.log("[LIFELINE] File loaded:", fileName, "Size:", file.size);
            } catch (e) {
                console.error("[LIFELINE] File read error:", e);
            }
        }

        const record = {
            id: crypto.randomUUID?.() || String(Date.now()),
            title: title,
            type: $("record-type")?.value || "Other",
            date: $("record-date")?.value || new Date().toISOString().slice(0, 10),
            provider: $("record-provider")?.value?.trim() || "",
            facility: $("record-facility")?.value?.trim() || "",
            notes: $("record-notes")?.value?.trim() || "",
            fileName: fileName,
            fileData: fileData,
            aiAnalysis: null
        };

        console.log("[LIFELINE] Saving record:", record.title);

        if (fileData && fileName) {
            toast("Analyzing medical document with AI...");
            try {
                const analysis = await analyzeMedicalDocument(fileName, fileData);
                record.aiAnalysis = analysis;
                toast("✅ Document analyzed!");
            } catch (error) {
                console.error("[LIFELINE] AI analysis failed:", error);
                toast("⚠️ Could not analyze document");
            }
        }

        state.profile.records = [record, ...(state.profile.records || [])];
        await saveProfile(true);
        renderRecords();
        showModal("record-modal", false);
        event.target.reset();
        toast("Medical record saved.");
    }

    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1] || reader.result;
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function analyzeMedicalDocument(fileName, fileData) {
        try {
            const response = await backendFetch("/analyze-document", {
                method: "POST",
                body: JSON.stringify({
                    fileName: fileName,
                    fileData: fileData
                })
            });
            return response.analysis || "📄 Document analyzed successfully.";
        } catch (error) {
            console.error("[LIFELINE] AI analysis error:", error);
            return "⚠️ AI analysis temporarily unavailable. Please consult your doctor.";
        }
    }

    async function deleteRecord(index) {
        if (!confirm("Delete this medical record?")) return;
        state.profile.records = state.profile.records.filter((_, i) => i !== index);
        await saveProfile(true);
        renderRecords();
        toast("Record deleted.");
    }

    function showModal(id, show = true) {
        $(id)?.classList.toggle("hidden", !show);
    }

    function setupRecordModal() {
        const open = () => {
            if ($("record-date") && !$("record-date").value) $("record-date").value = new Date().toISOString().slice(0, 10);
            showModal("record-modal", true);
        };
        $("btn-add-record")?.addEventListener("click", open);
        $("btn-empty-add-record")?.addEventListener("click", open);
        $("close-record-modal")?.addEventListener("click", () => showModal("record-modal", false));
        $("cancel-record")?.addEventListener("click", () => { $("record-form")?.reset(); showModal("record-modal", false); });
        $("record-form")?.addEventListener("submit", addRecord);
    }

    // =========================================================
    // TRIAGE ENGINE INTERFACE (Delegated to LifelineTriage)
    // =========================================================
    function startTriage(complaint = "", protocol = null) {
        if (window.LifelineTriage?.start) {
            window.LifelineTriage.start(complaint, protocol);
        }
    }

    function submitAnswer() {
        if (window.LifelineTriage?.submit) {
            window.LifelineTriage.submit();
        }
    }

    function handleQuestionBack() {
        if (window.LifelineTriage?.back) {
            window.LifelineTriage.back();
        }
    }

    function resetTriage() {
        if (window.LifelineTriage?.reset) {
            window.LifelineTriage.reset();
        }
    }

    // =========================================================
    // AI CHAT
    // =========================================================
    function cleanAIResponse(raw) {
        if (!raw) return "";
        let text = String(raw);
        // Strip completed <think>...</think> tags
        text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
        // Strip unclosed <think>... tags (if truncated)
        text = text.replace(/<think>[\s\S]*/gi, "");
        // Strip any "Thinking Process:" or "Thought Process:" headers/blocks
        text = text.replace(/^(?:Thinking|Thought)\s*Process:[\s\S]*?(?=\n\n|\n[*-•]|\n\d+\.)/gim, "");
        // Strip any leading numbered reasoning sections like "1. Analyze the Request: ..."
        text = text.replace(/^(?:\d+\.\s*(?:Analyze|Persona|Constraints|Draft|Determine)[\s\S]*?)+/gim, "");
        return text.trim();
    }

    function formatChatMessage(text) {
        if (!text) return "";
        let clean = cleanAIResponse(text);
        clean = escapeHtml(clean);
        clean = clean.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        clean = clean.replace(/###+\s*(.*?)(?:\n|$)/g, "<strong>$1</strong><br>");
        clean = clean.replace(/(?:^|\n)[•*-]\s*/g, "<br>• ");
        clean = clean.replace(/(?:^|\n)(\d+)\.\s*/g, "<br><strong>$1.</strong> ");
        clean = clean.replace(/\n/g, "<br>");
        clean = clean.replace(/(<br>\s*){3,}/g, "<br><br>");
        return clean.replace(/^<br>/, "").trim();
    }

    function appendChat(text, role) {
        const wrap = $("chat-messages-container");
        if (!wrap) return;
        const formatted = formatChatMessage(text);
        if (!formatted && role === "assistant") return;

        const el = document.createElement("div");
        el.className = `chat-message ${role}`;
        el.innerHTML = `<div class="chat-avatar">${role === "user" ? "U" : "+"}</div><div class="chat-content"><strong>${role === "user" ? "You" : "LIFELINE"}</strong><p></p></div>`;
        el.querySelector("p").innerHTML = formatted;
        wrap.appendChild(el);
        wrap.scrollTop = wrap.scrollHeight;

        if (role === "assistant" && text && !text.includes("I could not generate")) {
            const isEmergency = text.toLowerCase().includes("call 112") ||
                text.toLowerCase().includes("emergency") ||
                text.toLowerCase().includes("red") ||
                text.toLowerCase().includes("immediate");

            if (isEmergency) {
                const sosDiv = document.createElement("div");
                sosDiv.className = "chat-sos-actions";
                sosDiv.innerHTML = `
                    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                        <button onclick="if(window.LifelineTriggerSOS) { window.LifelineTriggerSOS(); } else { window.dispatchEvent(new CustomEvent('trigger-sos')); }" class="btn btn-danger" style="font-size:12px;padding:8px 16px;border:none;border-radius:8px;background:linear-gradient(135deg,#d92d3d,#b71c1c);color:white;cursor:pointer;">🚨 SOS Emergency</button>
                        <a href="tel:112" class="btn btn-danger" style="font-size:12px;padding:8px 16px;text-decoration:none;border:none;border-radius:8px;background:linear-gradient(135deg,#d92d3d,#b71c1c);color:white;display:inline-flex;align-items:center;gap:4px;">📞 Call 112</a>
                        <a href="tel:108" class="btn btn-danger" style="font-size:12px;padding:8px 16px;text-decoration:none;border:none;border-radius:8px;background:linear-gradient(135deg,#d92d3d,#b71c1c);color:white;display:inline-flex;align-items:center;gap:4px;">📞 Call 108</a>
                    </div>
                `;
                el.appendChild(sosDiv);
            }

            speakText(cleanAIResponse(text));
        }
    }

    async function callGroqDirect(userMessage, history = []) {
        const groqKey = window.LifelineConfig?.GROQ_API_KEY || (window.LifelineConfig?.GROQ_KEY_ENC ? atob(window.LifelineConfig.GROQ_KEY_ENC) : "");
        if (!groqKey) throw new Error("No Groq API key configured.");

        const systemPrompt = `You are LIFELINE AI, a rapid emergency health companion for India.

CRITICAL RULES:
- Output ONLY 3 to 4 short, single-sentence bullet points.
- Maximum 40 words total.
- No greetings, no intros, no section headers, no closing text.
- Do NOT output internal thoughts, reasoning steps, or <think> tags.
- If emergency, first bullet MUST be: "🚨 Call 112 or 108 immediately."
- Use plain bullet symbol: •`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...(history || []).slice(-4).map(h => ({ role: h.role, content: h.content })),
            { role: "user", content: userMessage }
        ];

        const models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b", "qwen/qwen3.8-27b"];
        for (const model of models) {
            try {
                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${groqKey}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        temperature: 0.1,
                        max_tokens: 350
                    })
                });
                if (res.ok) {
                    const json = await res.json();
                    let content = json.choices?.[0]?.message?.content;
                    if (content) {
                        content = cleanAIResponse(content);
                        try {
                            const parsed = JSON.parse(content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, ""));
                            content = parsed.reply || parsed.answer || parsed.response || content;
                            content = cleanAIResponse(content);
                        } catch {}
                        if (content) return content.trim();
                    }
                }
            } catch (err) {
                console.warn(`[LIFELINE] Groq ${model} error:`, err);
            }
        }
        throw new Error("Unable to reach Groq AI.");
    }

    async function sendChat(message) {
        message = (message || "").trim();
        if (!message) return;
        appendChat(message, "user");
        if ($("input-chat")) $("input-chat").value = "";

        try {
            let answer = "";
            try {
                const data = await backendFetch("/chat", {
                    method: "POST",
                    body: JSON.stringify({
                        message: message,
                        history: state.history
                    })
                });
                const raw = data.answer || data.reply || data.response || data.message;
                if (raw && raw !== "I could not generate a response." && !data.detail) {
                    answer = raw;
                }
            } catch (backendErr) {
                console.warn("[LIFELINE] Backend chat unavailable, trying direct Groq...", backendErr);
            }

            if (!answer) {
                answer = await callGroqDirect(message, state.history);
            }

            appendChat(answer, "assistant");
            state.history.push(
                { role: "user", content: message },
                { role: "assistant", content: answer }
            );
        } catch (error) {
            appendChat(`I'm unable to reach the assistant right now. ${error.message}`, "assistant");
        }
    }

    // =========================================================
    // TEXT TO SPEECH
    // =========================================================
    function speakText(text) {
        if (!state.speechSynthesis) return;

        if (state.isSpeaking) {
            state.speechSynthesis.cancel();
        }

        const cleanText = text.replace(/[^\w\s.,!?]/g, '').trim();
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = 'en-US';

        const voices = state.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
            voices.find(v => v.lang === 'en-US') ||
            voices[0];
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => { state.isSpeaking = true; };
        utterance.onend = () => { state.isSpeaking = false; };
        utterance.onerror = () => { state.isSpeaking = false; };

        state.speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
        if (state.speechSynthesis) {
            state.speechSynthesis.cancel();
            state.isSpeaking = false;
            toast("🔇 Stopped speaking");
        }
    }

    // =========================================================
    // SPEECH TO TEXT
    // =========================================================
    function setupSpeechToText() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("[LIFELINE] Speech recognition not supported");
            if ($("btn-voice-input")) {
                $("btn-voice-input").style.opacity = "0.5";
                $("btn-voice-input").title = "Speech recognition not supported in this browser";
            }
            return;
        }

        state.recognition = new SpeechRecognition();
        state.recognition.lang = 'en-US';
        state.recognition.continuous = false;
        state.recognition.interimResults = true;

        state.recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    const input = $("input-chat");
                    if (input) {
                        input.value = transcript;
                        setTimeout(() => {
                            if (input.value.trim()) {
                                sendChat(input.value);
                            }
                        }, 500);
                    }
                    state.isRecording = false;
                    if ($("btn-voice-input")) {
                        $("btn-voice-input").textContent = "🎤";
                        $("btn-voice-input").classList.remove("recording");
                    }
                    toast("✅ Voice input received");
                }
            }
        };

        state.recognition.onerror = (event) => {
            console.error("[LIFELINE] Speech recognition error:", event.error);
            state.isRecording = false;
            if ($("btn-voice-input")) {
                $("btn-voice-input").textContent = "🎤";
                $("btn-voice-input").classList.remove("recording");
            }
            if (event.error === 'not-allowed') {
                toast("⚠️ Please allow microphone access");
            } else if (event.error === 'no-speech') {
                toast("🎤 No speech detected, try again");
            } else {
                toast(`🎤 Error: ${event.error}`);
            }
        };

        state.recognition.onend = () => {
            state.isRecording = false;
            if ($("btn-voice-input")) {
                $("btn-voice-input").textContent = "🎤";
                $("btn-voice-input").classList.remove("recording");
            }
        };
    }

    function toggleVoiceInput() {
        if (!state.recognition) {
            toast("🎤 Speech recognition not supported");
            return;
        }

        if (state.isRecording) {
            state.recognition.stop();
            state.isRecording = false;
            if ($("btn-voice-input")) {
                $("btn-voice-input").textContent = "🎤";
                $("btn-voice-input").classList.remove("recording");
            }
            return;
        }

        try {
            state.recognition.start();
            state.isRecording = true;
            if ($("btn-voice-input")) {
                $("btn-voice-input").textContent = "🔴";
                $("btn-voice-input").classList.add("recording");
            }
            toast("🎤 Listening... Speak now");
        } catch (error) {
            console.error("[LIFELINE] Failed to start speech recognition:", error);
            toast("⚠️ Could not start voice input");
        }
    }

    // =========================================================
    // CAMERA INPUT
    // =========================================================
    function setupCameraInput() {
        if ($("btn-camera-input")) {
            $("btn-camera-input").addEventListener("click", async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'environment' }
                    });

                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.setAttribute('playsinline', '');
                    await video.play();

                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth || 640;
                    canvas.height = video.videoHeight || 480;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    stream.getTracks().forEach(track => track.stop());

                    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                    const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });

                    toast("📸 Photo captured! Analyzing...");
                    await processImageFile(file);

                } catch (error) {
                    console.error("[LIFELINE] Camera error:", error);
                    toast("📷 Using file picker instead");
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.capture = 'environment';
                    input.onchange = async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        await processImageFile(file);
                    };
                    input.click();
                }
            });
        }
    }

    async function processImageFile(file) {
        try {
            const base64 = await readFileAsBase64(file);
            appendChat(`📸 [Photo: ${file.name}]`, "user");

            const data = await backendFetch("/chat", {
                method: "POST",
                body: JSON.stringify({
                    message: `Please analyze this medical image. The filename is ${file.name}. Describe what you see and any potential medical concerns in 4-5 lines. If you see any emergency signs, mention that the user should call 112 or 108 immediately.`,
                    history: state.history
                })
            });

            const answer = data.answer || data.reply || data.response || data.message || "Could not analyze the image.";
            appendChat(answer, "assistant");
            state.history.push(
                { role: "user", content: `[Photo: ${file.name}]` },
                { role: "assistant", content: answer }
            );
            toast("✅ Image analyzed");
        } catch (error) {
            console.error("[LIFELINE] Image processing error:", error);
            toast("⚠️ Could not process image");
        }
    }

    // =========================================================
    // GPS & SOS
    // =========================================================
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation not supported"));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    }

    function triggerSOS() {
        const contactName = state.profile?.contactName || "Emergency Contact";
        const contactPhone = state.profile?.contactPhone || "112";
        const name = profileName();
        let location = state.lastGps || "Detecting GPS location...";

        toast("🚨 Opening Emergency SOS Dispatch...");

        // 1. Instantly display modal with preliminary info so user has immediate 1-tap call access
        const initialMsg = `🚨 EMERGENCY SOS - LIFELINE 🚨\nName: ${name}\nEmergency: Immediate Medical Assistance Needed\nTime: ${new Date().toLocaleTimeString()}\nCall 112 / 108 immediately.`;
        showSOSModal(contactName, contactPhone, location, initialMsg, null);

        // 2. Fetch high-precision GPS in background
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lng = position.coords.longitude.toFixed(6);
                    const loc = `${lat}, ${lng}`;
                    state.lastGps = loc;
                    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

                    const fullMessage = `🚨 EMERGENCY SOS - LIFELINE 🚨\n\nPatient: ${name}\nContact: ${contactPhone}\nGPS Coordinates: ${loc}\nGoogle Maps: ${mapsLink}\nTime: ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}\n\nI need immediate medical assistance. Please send an ambulance or emergency help (112 / 108).`;

                    showSOSModal(contactName, contactPhone, loc, fullMessage, mapsLink);
                    toast("📍 GPS Location acquired and attached to SOS!");
                },
                (error) => {
                    console.warn("[LIFELINE] GPS error:", error);
                    const fallbackLoc = state.lastGps || "GPS unavailable / permission needed";
                    const fallbackMsg = `🚨 EMERGENCY SOS - LIFELINE 🚨\n\nPatient: ${name}\nContact: ${contactPhone}\nLocation: ${fallbackLoc}\nTime: ${new Date().toLocaleTimeString()}\n\nI need immediate medical assistance. Please call 112 / 108.`;
                    showSOSModal(contactName, contactPhone, fallbackLoc, fallbackMsg, null);
                },
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
            );
        }
    }

    function showSOSModal(contactName, contactPhone, location, message, mapsLink) {
        let modal = document.getElementById("sos-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "sos-modal";
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-card" style="border: 3px solid #d92d3d; max-width: 520px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(217,45,61,0.25);">
                    <div class="modal-header" style="background: #fff5f5; border-bottom: 2px solid #f8d7da; padding: 16px 20px;">
                        <div>
                            <span class="eyebrow" style="color: #d92d3d; font-weight: 700; font-size: 11px;">🚨 EMERGENCY SOS DISPATCH</span>
                            <h2 style="color: #d92d3d; margin: 2px 0 0 0; font-size: 20px;">Immediate Help Needed</h2>
                        </div>
                        <button id="close-sos-modal" class="modal-close" type="button" style="font-size: 24px; cursor: pointer;">×</button>
                    </div>
                    <div style="padding: 16px 20px;">
                        <p style="font-weight: 600; color: #d92d3d; margin-top: 0;">⚠️ Live GPS Location is accessible for emergency dispatch</p>
                        <p style="font-size: 13px; color: #444; margin: 4px 0;"><strong>Emergency Contact:</strong> <span id="sos-contact-name"></span> (<span id="sos-contact-phone"></span>)</p>
                        <p style="font-size: 13px; color: #444; margin: 4px 0;"><strong>Coordinates:</strong> <span id="sos-location" style="font-family: monospace; font-weight: bold; color: #0a8f55;"></span></p>
                        
                        <div style="margin-top: 10px; padding: 12px; background: #e8f8ef; border: 1px solid #c3e6cb; border-radius: 8px;">
                            <a id="sos-location-link" href="#" target="_blank" style="color: #0a8f55; font-weight: 700; text-decoration: underline; display: flex; align-items: center; gap: 8px;">
                                📍 Open Location in Google Maps
                            </a>
                        </div>
                        
                        <div style="margin-top: 10px;">
                            <small style="font-weight: 600; color: #666;">SOS MESSAGE (Pre-filled with GPS coordinates):</small>
                            <p style="font-size: 11px; color: #333; background: #f8f9fa; border: 1px solid #e9ecef; padding: 10px; border-radius: 6px; word-wrap: break-word; max-height: 90px; overflow-y: auto; margin: 4px 0 0 0; white-space: pre-line;" id="sos-message"></p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 20px; background: #fff5f5; border-top: 1px solid #f8d7da;">
                        <a href="tel:112" class="btn btn-danger" style="flex: 1; min-width: 100px; font-size: 13px; font-weight: 700; padding: 10px 12px; border:none; border-radius:10px; background:linear-gradient(135deg,#d92d3d,#b71c1c); color:white; text-align:center; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:4px;">📞 Call 112</a>
                        <a href="tel:108" class="btn btn-danger" style="flex: 1; min-width: 100px; font-size: 13px; font-weight: 700; padding: 10px 12px; border:none; border-radius:10px; background:linear-gradient(135deg,#d92d3d,#b71c1c); color:white; text-align:center; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:4px;">📞 Call 108</a>
                        <a id="sos-sms-112-link" href="#" class="btn" style="flex: 1; min-width: 90px; font-size: 12px; font-weight: 600; padding: 10px 10px; text-align:center; text-decoration:none; border:1px solid #b8daff; border-radius:10px; background:#e7f1ff; color:#004085; display:inline-flex; align-items:center; justify-content:center; gap:4px;">📱 SMS 112</a>
                        <a id="sos-whatsapp-link" href="#" target="_blank" class="btn" style="flex: 1; min-width: 100px; font-size: 12px; font-weight: 600; padding: 10px 10px; background: #25D366; color: white; border: none; border-radius: 10px; text-align: center; text-decoration: none; display:inline-flex; align-items:center; justify-content:center; gap:4px;">💬 WhatsApp</a>
                    </div>
                    <div style="display: flex; gap: 10px; padding: 12px 20px; background: #fafafa; border-top: 1px solid #eee;">
                        <button id="sos-copy-btn" class="btn btn-light" type="button" style="flex: 1; border: 1px solid #ccc; border-radius:10px; padding:8px 12px; font-size: 12px; cursor:pointer;">📋 Copy GPS Details</button>
                        <button id="sos-get-location" class="btn btn-light" type="button" style="flex: 1; border: 1px solid #ccc; border-radius:10px; padding:8px 12px; font-size: 12px; cursor:pointer;">📍 Refresh GPS</button>
                        <button id="close-sos-modal-btn" class="btn btn-light" type="button" style="border: 1px solid #ccc; border-radius:10px; padding:8px 16px; font-size: 12px; cursor:pointer;">Close</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById("close-sos-modal")?.addEventListener("click", () => modal.classList.add("hidden"));
            document.getElementById("close-sos-modal-btn")?.addEventListener("click", () => modal.classList.add("hidden"));
            modal.querySelector(".modal-backdrop")?.addEventListener("click", () => modal.classList.add("hidden"));
        }

        const cleanPhone = (contactPhone || "").replace(/[^0-9]/g, '');

        const contactNameEl = document.getElementById("sos-contact-name");
        const contactPhoneEl = document.getElementById("sos-contact-phone");
        const locationEl = document.getElementById("sos-location");
        const messageEl = document.getElementById("sos-message");
        const sms112Link = document.getElementById("sos-sms-112-link");
        const whatsappLink = document.getElementById("sos-whatsapp-link");
        const locationLink = document.getElementById("sos-location-link");
        const copyBtn = document.getElementById("sos-copy-btn");

        if (contactNameEl) contactNameEl.textContent = contactName || "Emergency Contact";
        if (contactPhoneEl) contactPhoneEl.textContent = contactPhone || "112";
        if (locationEl) locationEl.textContent = location || "Acquiring GPS...";
        if (messageEl) messageEl.textContent = message || "LIFELINE Emergency SOS";

        if (locationLink) {
            if (mapsLink) {
                locationLink.href = mapsLink;
                locationLink.innerHTML = `📍 Open Live Location in Google Maps<br><small style="font-weight:normal;font-size:11px;color:#0a8f55;">${location}</small>`;
                locationLink.style.cursor = 'pointer';
            } else {
                locationLink.href = '#';
                locationLink.innerHTML = `📍 Location: ${location}`;
            }
        }

        if (sms112Link) {
            sms112Link.href = `sms:112?body=${encodeURIComponent(message)}`;
        }

        if (whatsappLink) {
            const waNumber = cleanPhone && cleanPhone.length > 5 ? cleanPhone : '';
            whatsappLink.href = waNumber ?
                `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` :
                `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        }

        if (copyBtn) {
            copyBtn.onclick = () => {
                const textToCopy = `${message}\nGPS: ${location}\nMaps: ${mapsLink || location}`;
                navigator.clipboard?.writeText(textToCopy).then(() => {
                    toast("📋 Emergency details copied to clipboard!");
                }).catch(() => {
                    toast("📍 Coordinates: " + location);
                });
            };
        }

        modal.classList.remove("hidden");

        const refreshBtn = document.getElementById("sos-get-location");
        if (refreshBtn) {
            refreshBtn.onclick = () => {
                toast("📍 Refreshing GPS location...");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        pos => {
                            const lat = pos.coords.latitude.toFixed(6);
                            const lng = pos.coords.longitude.toFixed(6);
                            const newLoc = `${lat}, ${lng}`;
                            const newMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                            state.lastGps = newLoc;
                            const newMsg = `🚨 EMERGENCY SOS - LIFELINE 🚨\n\nPatient: ${profileName()}\nContact: ${contactPhone}\nGPS Coordinates: ${newLoc}\nGoogle Maps: ${newMapsLink}\nTime: ${new Date().toLocaleTimeString()}\n\nI need immediate medical assistance. Please send an ambulance (112/108).`;
                            showSOSModal(contactName, contactPhone, newLoc, newMsg, newMapsLink);
                            toast("✅ Fresh GPS location acquired!");
                        },
                        err => {
                            toast("⚠️ GPS access unavailable");
                        },
                        { enableHighAccuracy: true, timeout: 6000 }
                    );
                }
            };
        }
    }

    // Expose globally for inline buttons
    window.LifelineTriggerSOS = triggerSOS;

    function acquireGPS() {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            position => {
                state.lastGps = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
            },
            () => {},
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
                console.log("[LIFELINE] GPS acquired:", state.lastGps);
            },
            () => {},
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
        );
    }

    // =========================================================
    // MODE TOGGLE
    // =========================================================
    function setupModeToggle() {
        $("btn-mode-toggle")?.addEventListener("click", () => {
            state.mode = state.mode === "online" ? "offline" : "online";
            const online = state.mode === "online";
            if ($("mode-label")) $("mode-label").textContent = online ? "Online" : "Offline";
            if ($("connection-label")) $("connection-label").textContent = online ? "Online" : "Offline";
            if ($("connection-sub")) $("connection-sub").textContent = online ? "Secure cloud" : "Working offline";
            toast(online ? "Online mode enabled." : "Offline mode enabled. Some features may be limited.");
        });
    }

    // =========================================================
    // ESCAPE HELPERS
    // =========================================================
    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>'"]/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
        })[character]);
    }

    function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, "&#96;");
    }

    // =========================================================
    // BIND EVENTS
    // =========================================================
    function bindGeneralEvents() {
        document.querySelectorAll("[data-view]").forEach(button => {
            button.addEventListener("click", () => switchView(button.dataset.view));
        });

        document.querySelectorAll(".protocol").forEach(button => {
            button.addEventListener("click", () => startTriage("", button.dataset.proto));
        });

        $("btn-start-triage")?.addEventListener("click", () => startTriage($("input-complaint")?.value.trim() || "General unwell"));

        $("btn-next-question")?.addEventListener("click", submitAnswer);
        $("btn-back-question")?.addEventListener("click", handleQuestionBack);
        $("btn-reset-triage")?.addEventListener("click", resetTriage);

        $("form-chat")?.addEventListener("submit", event => {
            event.preventDefault();
            sendChat($("input-chat")?.value);
        });

        document.querySelectorAll(".chat-chip").forEach(button => {
            button.addEventListener("click", () => sendChat(button.dataset.msg));
        });

        $("btn-clear-chat")?.addEventListener("click", clearChat);
        $("btn-stop-speaking")?.addEventListener("click", stopSpeaking);
        $("btn-voice-input")?.addEventListener("click", toggleVoiceInput);

        $("form-profile")?.addEventListener("submit", event => {
            event.preventDefault();
            saveProfile();
        });

        $("top-avatar")?.addEventListener("click", () => switchView("health"));

        // SOS buttons
        document.querySelectorAll("#btn-sos-emergency, #btn-sos-mobile").forEach(btn => {
            if (btn) btn.addEventListener("click", triggerSOS);
        });

        document.addEventListener("trigger-sos", triggerSOS);
    }

    function clearChat() {
        const wrap = $("chat-messages-container");
        if (wrap) {
            wrap.innerHTML = `<div class="chat-message assistant"><div class="chat-avatar">+</div><div class="chat-content"><strong>LIFELINE</strong><p>Fresh conversation. Ask me about first aid, symptoms, or what to do while help is on the way.</p></div></div>`;
        }
        state.history = [];
        stopSpeaking();
        toast("🧹 Chat cleared");
    }

    // =========================================================
    // FIRST AID GUIDE
    // =========================================================
    const firstAidCategories = [
        ['bleeding', '🩸', { English: 'BLEEDING', 'हिंदी': 'रक्तस्राव', 'मराठी': 'रक्तस्त्राव' }, 'images/bleeding.png'],
        ['burns', '🔥', { English: 'BURNS', 'हिंदी': 'जलना', 'मराठी': 'भाजणे' }, 'images/burn.png'],
        ['fracture', '🦴', { English: 'FRACTURE', 'हिंदी': 'फ्रैक्चर', 'मराठी': 'फ्रॅक्चर' }, 'images/fracture.png'],
        ['head', '🧠', { English: 'HEAD INJURY', 'हिंदी': 'सिर की चोट', 'मराठी': 'डोक्याला दुखापत' }, 'images/concussion.png'],
        ['poison', '🐍', { English: 'POISON / BITES', 'हिंदी': 'ज़हर / काटना', 'मराठी': 'विष / चावा' }, 'images/poison.png'],
        ['cpr', '❤️', { English: 'CPR', 'हिंदी': 'सीपीआर', 'मराठी': 'सीपीआर' }, 'images/cpr.png'],
        ['wound', '🩹', { English: 'BASIC WOUND CARE', 'हिंदी': 'घाव की देखभाल', 'मराठी': 'जखमेची काळजी' }, 'images/wound.png'],
        ['allergic', '🤧', { English: 'ALLERGIC REACTION', 'हिंदी': 'एलर्जी प्रतिक्रिया', 'मराठी': 'ॲलर्जीची प्रतिक्रिया' }, 'images/allergic_reaction.png']
    ];

    const firstAidContent = {
        bleeding: {
            English: `1. Stay calm and check the person's condition.\n\n2. Apply firm pressure to the wound using a clean cloth or dressing.\n\n3. Keep continuous pressure on the wound.\n\n4. If blood soaks through the dressing, add another dressing on top.\n\n5. Get medical help if the bleeding is severe or does not stop.`,
            'हिंदी': `1. शांत रहें और व्यक्ति की स्थिति जाँचें।\n\n2. साफ कपड़े या पट्टी से घाव पर सीधा दबाव डालें।\n\n3. घाव पर लगातार दबाव बनाए रखें।\n\n4. अगर पट्टी से खून निकलने लगे, तो उसके ऊपर दूसरी पट्टी रखें।\n\n5. अगर रक्तस्राव बहुत ज्यादा है या रुक नहीं रहा है, तो तुरंत चिकित्सा सहायता लें।`,
            'मराठी': `1. शांत रहा आणि व्यक्तीची स्थिती तपासा.\n\n2. स्वच्छ कापड किंवा पट्टीने जखमेवर थेट दाब द्या.\n\n3. जखमेवर सतत दाब ठेवा.\n\n4. पट्टीतून रक्त येत असल्यास त्यावर दुसरी पट्टी ठेवा.\n\n5. रक्तस्त्राव जास्त असेल किंवा थांबत नसेल तर तात्काळ वैद्यकीय मदत घ्या.`
        },
        burns: {
            English: `1. Move away from the source of the burn.\n\n2. Cool the burn under cool running water.\n\n3. Remove clothing if it is not stuck to the skin.\n\n4. Do not use ice, butter or toothpaste.\n\n5. Get medical help for serious burns.`,
            'हिंदी': `1. जलने के स्रोत से दूर जाएँ।\n\n2. जले हुए स्थान को ठंडे बहते पानी के नीचे रखें।\n\n3. अगर कपड़े त्वचा से चिपके नहीं हैं तो उन्हें हटा दें।\n\n4. बर्फ, मक्खन या टूथपेस्ट न लगाएँ।\n\n5. गंभीर जलने पर चिकित्सा सहायता लें।`,
            'मराठी': `1. भाजलेल्या ठिकाणापासून दूर जा.\n\n2. भाजलेली जागा थंड वाहत्या पाण्याखाली ठेवा.\n\n3. कपडे त्वचेला चिकटलेले नसतील तर ते काढा.\n\n4. बर्फ, लोणी किंवा टूथपेस्ट लावू नका.\n\n5. गंभीर भाजल्यास वैद्यकीय मदत घ्या.`
        },
        fracture: {
            English: `1. Keep the injured area still.\n\n2. Do not try to straighten the bone.\n\n3. Support the injured area in its current position.\n\n4. A cold pack wrapped in cloth may help with swelling.\n\n5. Get medical help.`,
            'हिंदी': `1. घायल हिस्से को स्थिर रखें।\n\n2. हड्डी को सीधा करने की कोशिश न करें।\n\n3. घायल हिस्से को उसी स्थिति में सहारा दें।\n\n4. सूजन के लिए कपड़े में लपेटा हुआ ठंडा पैक लगा सकते हैं।\n\n5. चिकित्सा सहायता लें।`,
            'मराठी': `1. दुखापत झालेला भाग स्थिर ठेवा.\n\n2. हाड सरळ करण्याचा प्रयत्न करू नका.\n\n3. दुखापत झालेल्या भागाला त्याच स्थितीत आधार द्या.\n\n4. सूज कमी करण्यासाठी कापडात गुंडाळलेला थंड पॅक वापरू शकता.\n\n5. वैद्यकीय मदत घ्या.`
        },
        head: {
            English: `1. Keep the person calm and still.\n\n2. Avoid unnecessary movement of the head and neck.\n\n3. Watch for severe headache, repeated vomiting, confusion or loss of consciousness.\n\n4. Get medical help for serious symptoms.`,
            'हिंदी': `1. व्यक्ति को शांत और स्थिर रखें।\n\n2. सिर और गर्दन को अनावश्यक रूप से न हिलाएँ।\n\n3. तेज सिरदर्द, बार-बार उल्टी, भ्रम या बेहोशी पर ध्यान दें।\n\n4. गंभीर लक्षण होने पर तुरंत चिकित्सा सहायता लें।`,
            'मराठी': `1. व्यक्तीला शांत आणि स्थिर ठेवा.\n\n2. डोके आणि मान अनावश्यकपणे हलवू नका.\n\n3. तीव्र डोकेदुखी, वारंवार उलटी, गोंधळ किंवा बेशुद्ध होण्याकडे लक्ष द्या.\n\n4. गंभीर लक्षणे दिसल्यास तात्काळ वैद्यकीय मदत घ्या.`
        },
        poison: {
            English: `1. Move away from the dangerous substance or animal.\n\n2. Do not make the person vomit unless instructed by a doctor.\n\n3. For a suspected snake bite, keep the person calm and still.\n\n4. Do not cut or suck the bitten area.\n\n5. Get urgent medical help.`,
            'हिंदी': `1. खतरनाक पदार्थ या जानवर से सुरक्षित दूरी बनाएँ।\n\n2. डॉक्टर की सलाह के बिना व्यक्ति को उल्टी न करवाएँ।\n\n3. साँप के काटने पर व्यक्ति को शांत और स्थिर रखें।\n\n4. काटे हुए स्थान को न काटें और न चूसें।\n\n5. तुरंत चिकित्सा सहायता लें।`,
            'मराठी': `1. धोकादायक पदार्थ किंवा प्राण्यापासून सुरक्षित अंतर ठेवा.\n\n2. डॉक्टरांच्या सल्ल्याशिवाय उलटी करवू नका.\n\n3. साप चावल्यास व्यक्तीला शांत आणि स्थिर ठेवा.\n\n4. चावलेली जागा कापू नका किंवा चोखू नका.\n\n5. तात्काळ वैद्यकीय मदत घ्या.`
        },
        cpr: {
            English: `1. Check if the person responds and is breathing normally.\n\n2. Get emergency medical help.\n\n3. If they are not breathing normally, start CPR if trained.\n\n4. Give about 100–120 chest compressions per minute.\n\n5. Continue until trained help arrives.`,
            'हिंदी': `1. जाँचें कि व्यक्ति प्रतिक्रिया दे रहा है और सामान्य रूप से सांस ले रहा है।\n\n2. आपातकालीन चिकित्सा सहायता लें।\n\n3. सामान्य सांस न लेने पर प्रशिक्षित होने पर सीपीआर शुरू करें।\n\n4. छाती पर लगभग 100–120 बार प्रति मिनट दबाव दें।\n\n5. प्रशिक्षित सहायता आने तक जारी रखें।`,
            'मराठी': `1. व्यक्ती प्रतिसाद देत आहे आणि सामान्यपणे श्वास घेत आहे का ते तपासा.\n\n2. आपत्कालीन वैद्यकीय मदत घ्या.\n\n3. सामान्य श्वास नसल्यास प्रशिक्षण असल्यास सीपीआर सुरू करा.\n\n4. छातीवर दर मिनिटाला सुमारे 100–120 वेळा दाब द्या.\n\n5. प्रशिक्षित मदत येईपर्यंत सुरू ठेवा.`
        },
        wound: {
            English: `1. Wash your hands before touching the wound.\n\n2. Apply pressure if the wound is bleeding.\n\n3. Rinse a minor wound with clean running water.\n\n4. Cover it with a clean dressing.\n\n5. Get medical help for deep wounds or bleeding that does not stop.`,
            'हिंदी': `1. घाव को छूने से पहले हाथ धोएँ।\n\n2. खून निकल रहा हो तो दबाव डालें।\n\n3. छोटे घाव को साफ बहते पानी से धोएँ।\n\n4. साफ पट्टी से ढकें।\n\n5. गहरे घाव या न रुकने वाले रक्तस्राव के लिए चिकित्सा सहायता लें।`,
            'मराठी': `1. जखमेला स्पर्श करण्यापूर्वी हात धुवा.\n\n2. रक्त येत असल्यास दाब द्या.\n\n3. किरकोळ जखम स्वच्छ वाहत्या पाण्याने धुवा.\n\n4. स्वच्छ पट्टीने झाका.\n\n5. खोल जखम किंवा न थांबणाऱ्या रक्तस्त्रावासाठी वैद्यकीय मदत घ्या.`
        },
        allergic: {
            English: `1. Move away from the suspected trigger if safe.\n\n2. For mild itching or rash, follow the person's prescribed allergy plan.\n\n3. Watch for difficulty breathing or swelling of the throat and tongue.\n\n4. Get emergency medical help for severe symptoms.`,
            'हिंदी': `1. सुरक्षित हो तो एलर्जी पैदा करने वाली चीज़ से दूर जाएँ।\n\n2. खुजली या चकत्ते जैसे हल्के लक्षणों पर निर्धारित एलर्जी योजना का पालन करें।\n\n3. सांस लेने में कठिनाई या गले और जीभ में सूजन पर ध्यान दें।\n\n4. गंभीर लक्षण होने पर तुरंत आपातकालीन चिकित्सा सहायता लें।`,
            'मराठी': `1. सुरक्षित असल्यास अॅलर्जी निर्माण करणाऱ्या गोष्टीपासून दूर जा.\n\n2. खाज किंवा पुरळ असल्यास डॉक्टरांनी दिलेल्या अॅलर्जी योजनेचे पालन करा.\n\n3. श्वास घेण्यास त्रास किंवा घसा आणि जीभ सुजण्याकडे लक्ष द्या.\n\n4. गंभीर लक्षणे दिसल्यास तात्काळ वैद्यकीय मदत घ्या.`
        }
    };

    const langCode = { English: 'en', 'हिंदी': 'hi', 'मराठी': 'mr' };
    let firstAidLanguage = localStorage.getItem('firstAidLanguage') || 'English';
    let firstAidSelected = null;
    let firstAidSpeaking = false;
    let firstAidAudio = new Audio();

    function renderFirstAid() {
        const grid = document.getElementById('firstaid-grid');
        if (!grid) return;
        grid.innerHTML = '';
        firstAidCategories.forEach(([id, icon, names]) => {
            const card = document.createElement('div');
            card.className = 'firstaid-card';
            card.innerHTML = `
                <span class="icon">${icon}</span>
                <span class="name">${names[firstAidLanguage]}</span>
            `;
            card.onclick = () => openFirstAidDetail(id);
            grid.appendChild(card);
        });
    }

    function openFirstAidDetail(id) {
        firstAidSelected = firstAidCategories.find(c => c[0] === id);
        const [, , names, img] = firstAidSelected;
        document.getElementById('firstaid-detail-title').textContent = firstAidSelected[1] + ' ' + names[firstAidLanguage];
        document.getElementById('firstaid-detail-image').src = img;
        document.getElementById('firstaid-detail-instructions').textContent = firstAidContent[id][firstAidLanguage];
        document.getElementById('firstaid-detail').classList.remove('hidden');
        stopFirstAidAudio();
    }

    function stopFirstAidAudio() {
        firstAidAudio.pause();
        firstAidAudio.currentTime = 0;
        firstAidSpeaking = false;
        document.getElementById('firstaid-listen').textContent = '🔊 Listen';
    }

    function toggleFirstAidAudio() {
        if (!firstAidSelected) return;

        if (firstAidSpeaking) {
            stopFirstAidAudio();
            return;
        }

        const audioPath = `audio/${firstAidSelected[0]}_${langCode[firstAidLanguage]}.mp3`;
        firstAidAudio.src = audioPath;
        firstAidAudio.play();
        firstAidSpeaking = true;
        document.getElementById('firstaid-listen').textContent = '⏹ Stop';
    }

    function setupFirstAid() {
        const langSelect = document.getElementById('firstaid-language');
        if (langSelect) {
            langSelect.value = firstAidLanguage;
            langSelect.onchange = (e) => {
                firstAidLanguage = e.target.value;
                localStorage.setItem('firstAidLanguage', firstAidLanguage);
                renderFirstAid();
                if (firstAidSelected) {
                    const [, , names] = firstAidSelected;
                    document.getElementById('firstaid-detail-title').textContent = firstAidSelected[1] + ' ' + names[firstAidLanguage];
                    document.getElementById('firstaid-detail-instructions').textContent = firstAidContent[firstAidSelected[0]][firstAidLanguage];
                    stopFirstAidAudio();
                }
            };
        }

        document.getElementById('firstaid-close')?.addEventListener('click', () => {
            document.getElementById('firstaid-detail').classList.add('hidden');
            stopFirstAidAudio();
        });

        document.getElementById('firstaid-back')?.addEventListener('click', () => {
            document.getElementById('firstaid-detail').classList.add('hidden');
            stopFirstAidAudio();
        });

        document.getElementById('firstaid-listen')?.addEventListener('click', toggleFirstAidAudio);

        firstAidAudio.addEventListener('ended', () => {
            firstAidSpeaking = false;
            document.getElementById('firstaid-listen').textContent = '🔊 Listen';
        });

        document.getElementById('firstaid-detail')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                document.getElementById('firstaid-detail').classList.add('hidden');
                stopFirstAidAudio();
            }
        });

        renderFirstAid();
    }

    // =========================================================
    // SETUP
    // =========================================================
    async function setup() {
        setupAuth();
        setupRecordModal();
        setupModeToggle();
        setupSpeechToText();
        setupCameraInput();
        setupFirstAid();
        bindGeneralEvents();

        await loadProfile();
        renderOverview();
        populateProfileForm();
        renderRecords();
        renderEmergencyCard();
        switchView("overview");

        if (state.speechSynthesis) {
            state.speechSynthesis.getVoices();
            state.speechSynthesis.onvoiceschanged = () => {
                state.speechSynthesis.getVoices();
            };
        }

        let resolved = false;
        window.LifelineFirebase.observe(async user => {
            state.user = user;
            console.log("[LIFELINE] auth state:", user ? "signed in" : "signed out");

            if (user) {
                await loadProfile();
                renderOverview();
                populateProfileForm();
                renderRecords();
                renderEmergencyCard();
                showApp();
            } else {
                showAuthScreen();
            }
            updateIdentity();

            if (!resolved) {
                resolved = true;
                hideLoading();
            }
        });

        setTimeout(() => {
            if (!resolved) {
                resolved = true;
                hideLoading();
                showAuthScreen();
            }
        }, 4000);
    }

    document.addEventListener("DOMContentLoaded", setup);
})();