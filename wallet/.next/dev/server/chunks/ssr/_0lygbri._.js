module.exports = [
"[project]/app/(emmanuel)/wallet/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletFundingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const transactions = [
    {
        id: 1,
        type: "funding",
        name: "Wallet Funding",
        date: "May 11, 2026 · 10:13 AM",
        amount: 20000
    },
    {
        id: 2,
        type: "payment",
        name: "Store Payment",
        date: "May 9, 2026 · 7:18 PM",
        amount: -65000
    },
    {
        id: 3,
        type: "funding",
        name: "Wallet Funding",
        date: "May 2, 2026 · 5:42 PM",
        amount: 5000
    },
    {
        id: 4,
        type: "payment",
        name: "Store Payment",
        date: "April 21, 2026 · 10:42 PM",
        amount: -160000
    },
    {
        id: 5,
        type: "funding",
        name: "Wallet Funding",
        date: "April 9, 2026 · 8:11 AM",
        amount: 450000
    }
];
const paymentMethods = [
    {
        id: "bank",
        name: "Bank Transfer",
        desc: "Transfer from your bank account to fund wallet",
        time: "1–5 mins",
        icon: "🏦"
    },
    {
        id: "card",
        name: "Debit Card",
        desc: "Fund your wallet instantly using your debit card",
        time: "5–10 mins",
        icon: "💳"
    },
    {
        id: "usdt",
        name: "USDT",
        desc: "Fund your wallet using crypto",
        time: "1–5 mins",
        icon: "₿"
    }
];
const quickAmounts = [
    5000,
    10000,
    15000,
    20000,
    50000
];
function WalletFundingPage() {
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedMethod, setSelectedMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("bank");
    const [balanceVisible, setBalanceVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleQuickAmount = (val)=>{
        setAmount(val.toString());
    };
    const formatAmount = (val)=>{
        return Math.abs(val).toLocaleString();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.greeting,
                children: "Welcome back!"
            }, void 0, false, {
                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.layout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.leftPanel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: styles.pageTitle,
                                children: "Fund Wallet"
                            }, void 0, false, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: styles.pageSub,
                                children: "Seamless funding. Limitless shopping."
                            }, void 0, false, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.balanceCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.balanceCardOverlay1
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.balanceCardOverlay2
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: styles.balanceLabel,
                                        children: "Available Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.balanceRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: styles.balanceAmount,
                                                children: balanceVisible ? "NGN 250,000.00" : "NGN ••••••••"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: styles.eyeBtn,
                                                onClick: ()=>setBalanceVisible(!balanceVisible),
                                                "aria-label": "Toggle balance visibility",
                                                children: balanceVisible ? "👁" : "🙈"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.walletDeco,
                                        children: "💼"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.stepTitle,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: styles.stepBadge,
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this),
                                            "Enter Amount"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.amountInputWrap,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: styles.currencyPrefix,
                                                children: "₦"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                placeholder: "Enter your funding amount..",
                                                value: amount,
                                                onChange: (e)=>setAmount(e.target.value),
                                                style: styles.amountInput
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.quickAmounts,
                                        children: quickAmounts.map((val)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleQuickAmount(val),
                                                style: {
                                                    ...styles.quickBtn,
                                                    ...amount === val.toString() ? styles.quickBtnActive : {}
                                                },
                                                children: val.toLocaleString()
                                            }, val, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.stepTitle,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: styles.stepBadge,
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this),
                                            "Select Payment Method"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.paymentGrid,
                                        children: paymentMethods.map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setSelectedMethod(method.id),
                                                style: {
                                                    ...styles.paymentCard,
                                                    ...selectedMethod === method.id ? styles.paymentCardSelected : {}
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.paymentIcon,
                                                        children: method.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.paymentName,
                                                        children: method.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.paymentDesc,
                                                        children: method.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: styles.paymentTime,
                                                        children: method.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, method.id, true, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.ctaBtn,
                                children: "Continue to Payment →"
                            }, void 0, false, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.rightPanel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.panelCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.panelTitle,
                                        children: "Recent Transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    transactions.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.txItem,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.txIcon,
                                                        ...tx.type === "funding" ? styles.txIconFunding : styles.txIconPayment
                                                    },
                                                    children: tx.type === "funding" ? "↙" : "🛍"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.txMeta,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: styles.txName,
                                                            children: tx.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: styles.txDate,
                                                            children: tx.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.txAmount,
                                                        ...tx.amount > 0 ? styles.txCredit : styles.txDebit
                                                    },
                                                    children: [
                                                        tx.amount > 0 ? "+" : "-",
                                                        " ",
                                                        formatAmount(tx.amount)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, tx.id, true, {
                                            fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.tipsCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.tipsTitle,
                                        children: "💡 Funding Tips"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.tipItem,
                                        children: "↗ Use debit card for instant funding"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.tipItem,
                                        children: "↗ Bank transfers may take 1–5 mins to reflect"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.tipItem,
                                        children: "↗ Ensure you use an account in your name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.securityCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.securityIcon,
                                        children: "🛡"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.securityTitle,
                                                children: "Your Security is Our Top Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.securityDesc,
                                                children: "All transactions are secure and encrypted with 256-bit SSL."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(emmanuel)/wallet/page.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
const styles = {
    page: {
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh"
    },
    greeting: {
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "8px",
        fontWeight: 500
    },
    layout: {
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "24px",
        alignItems: "start"
    },
    leftPanel: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "28px",
        border: "0.5px solid #e5e7eb"
    },
    pageTitle: {
        fontSize: "28px",
        fontWeight: 700,
        color: "#111827",
        marginBottom: "4px"
    },
    pageSub: {
        fontSize: "13px",
        color: "#9ca3af",
        marginBottom: "20px"
    },
    balanceCard: {
        background: "#1a3a2a",
        borderRadius: "14px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
        minHeight: "110px"
    },
    balanceCardOverlay1: {
        position: "absolute",
        right: "-20px",
        top: "-20px",
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)"
    },
    balanceCardOverlay2: {
        position: "absolute",
        right: "40px",
        bottom: "-30px",
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.03)"
    },
    balanceLabel: {
        fontSize: "12px",
        color: "rgba(255,255,255,0.6)",
        marginBottom: "8px",
        letterSpacing: "0.5px"
    },
    balanceRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },
    balanceAmount: {
        fontSize: "26px",
        fontWeight: 700,
        color: "#fff"
    },
    eyeBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        padding: "2px",
        opacity: 0.7
    },
    walletDeco: {
        position: "absolute",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "72px",
        opacity: 0.12,
        pointerEvents: "none"
    },
    section: {
        marginBottom: "24px"
    },
    stepTitle: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    stepBadge: {
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        border: "1.5px solid #111827",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: 600,
        flexShrink: 0
    },
    amountInputWrap: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "12px",
        backgroundColor: "#fff"
    },
    currencyPrefix: {
        padding: "0 14px",
        fontSize: "18px",
        fontWeight: 600,
        color: "#6b7280",
        borderRight: "1px solid #e5e7eb",
        height: "48px",
        display: "flex",
        alignItems: "center"
    },
    amountInput: {
        flex: 1,
        border: "none",
        outline: "none",
        padding: "0 14px",
        fontSize: "15px",
        height: "48px",
        color: "#111827",
        backgroundColor: "transparent"
    },
    quickAmounts: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
    },
    quickBtn: {
        padding: "7px 14px",
        border: "1px solid #d1d5db",
        borderRadius: "20px",
        background: "#fff",
        fontSize: "13px",
        cursor: "pointer",
        color: "#374151",
        fontWeight: 500,
        transition: "all 0.15s"
    },
    quickBtnActive: {
        background: "#1a3a2a",
        color: "#fff",
        borderColor: "#1a3a2a"
    },
    paymentGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px"
    },
    paymentCard: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "14px",
        cursor: "pointer",
        backgroundColor: "#fff",
        transition: "all 0.15s"
    },
    paymentCardSelected: {
        border: "1.5px solid #2d6a4f",
        backgroundColor: "#f0faf4"
    },
    paymentIcon: {
        fontSize: "22px",
        marginBottom: "10px"
    },
    paymentName: {
        fontSize: "13px",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "4px"
    },
    paymentDesc: {
        fontSize: "11px",
        color: "#6b7280",
        lineHeight: 1.4,
        marginBottom: "8px"
    },
    paymentTime: {
        display: "inline-block",
        fontSize: "10px",
        background: "#f3f4f6",
        borderRadius: "10px",
        padding: "2px 8px",
        color: "#6b7280"
    },
    ctaBtn: {
        width: "100%",
        padding: "16px",
        background: "#1a3a2a",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.3px"
    },
    rightPanel: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    panelCard: {
        background: "#fff",
        border: "0.5px solid #e5e7eb",
        borderRadius: "16px",
        padding: "16px 18px"
    },
    panelTitle: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "14px"
    },
    txItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 0",
        borderBottom: "0.5px solid #f3f4f6"
    },
    txIcon: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        flexShrink: 0
    },
    txIconFunding: {
        background: "#e8f5ee",
        color: "#2d6a4f"
    },
    txIconPayment: {
        background: "#f0edfb",
        color: "#6b54c7"
    },
    txMeta: {
        flex: 1
    },
    txName: {
        fontSize: "13px",
        fontWeight: 500,
        color: "#111827"
    },
    txDate: {
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "2px"
    },
    txAmount: {
        fontSize: "14px",
        fontWeight: 700
    },
    txCredit: {
        color: "#2d6a4f"
    },
    txDebit: {
        color: "#c94040"
    },
    tipsCard: {
        background: "#f7f9fb",
        border: "0.5px solid #e5e7eb",
        borderRadius: "16px",
        padding: "16px 18px"
    },
    tipsTitle: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "10px"
    },
    tipItem: {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "7px",
        lineHeight: 1.4
    },
    securityCard: {
        background: "#fff",
        border: "0.5px solid #e5e7eb",
        borderRadius: "16px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    securityIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#e8f1fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        flexShrink: 0
    },
    securityTitle: {
        fontSize: "13px",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "3px"
    },
    securityDesc: {
        fontSize: "11px",
        color: "#6b7280",
        lineHeight: 1.4
    }
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0lygbri._.js.map