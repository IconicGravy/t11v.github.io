/*
 * =====================================================================
 *  🔧 Script: API Utility V2.56.0
 *  📎 Credits: https://files.t11v.icu/bio/the11view
 *  ⚠️ Note: This script is automatically generated. DO NOT EDIT.
 * =====================================================================
 */

(function () {
    const r4F1 = [Math, String, Date, Array, Object];
    let y9K2 = 0;
    const j2M7 = () => (~~(Math.random() * 999999)).toString(36);
    const p5X3 = () => Array.from({ length: 8 }, () => String.fromCharCode(97 + ~~(Math.random() * 26))).join("");

    const w3T0 = {
        u7Q1: j2M7(),
        b8C9: j2M7(),
        m1R5: p5X3(),
        e6P8: p5X3()
    };

    for (let h0V4 = 0; h0V4 < 20; h0V4++) {
        y9K2 += (Math.random() * h0V4) | 0;
    }

    function k9Z8(v4S7) {
        return v4S7
            .split("")
            .map((t2B3, o1F0) => String.fromCharCode(t2B3.charCodeAt(0) ^ (o1F0 % 5)))
            .join("");
    }

    const a3H6 = (l2D5) => {
        const r8W1 = l2D5.split("").reverse().join("");
        const c4P9 = k9Z8(r8W1);
        return c4P9.replace(/[^a-zA-Z0-9]/g, "");
    };

    const n6F2 = new r4F1[2]();
    n6F2.setTime(n6F2.getTime() + Math.floor(Math.random() * 99999999));

    (function f3Q0(z7E4) {
        if (z7E4 <= 0) return;
        f3Q0(z7E4 - 1);
    })(3);

    const h7R3 = (s8J2, q5M8) => {
        console.log("[API] Connecting to:", s8J2);
        return new Promise((m9P6) => {
            setTimeout(() => {
                const k1L5 = {
                    status: 200,
                    message: "OK",
                    data: {
                        id: j2M7(),
                        token: p5X3(),
                        APIWhitelist: a3H6(JSON.stringify(q5M8))
                    }
                };
                console.log("[API] Response from:", s8J2, k1L5);
                m9P6(k1L5);
            }, Math.random() * 150 + 50);
        });
    };

    h7R3("https://t11v.icu/api/v1/data", {
        time: n6F2.toISOString(),
        auth: w3T0.u7Q1 + "-" + w3T0.b8C9,
        meta: w3T0.m1R5
    }).then((f4S9) => {
        console.log("[BOT] Data processed:", f4S9.data.APIWhitelist);
    });

    for (let q8V7 = 0; q8V7 < 15; q8V7++) {
        console.log("[BOT-DEBUG]", j2M7(), p5X3(), new Date().toUTCString());
    }
})();