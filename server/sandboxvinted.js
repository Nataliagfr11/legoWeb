const fs = require('fs');
const vinted = require('./websites/vinted');

/**
 * Scrape data from Vinted and filter only LEGO items.
 * @param {String} website - Vinted API URL
 */
async function sandbox(website) {
  try {
    console.log(`Browsing ${website} website...`);

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';
    const cookie = "v_udt=SFI0NW9ZNWNmajFkMVY1UlZIWlFZcXZXVTJDTC0tUXUvSGJPVXFmMjdXQXhKTC0tbU5JNllGSU0rU05ITXJsUFdTSGRXdz09; __cf_bm=wfLd15iJjsUJkAm3fRFhW8tFMXOKP2Oy3Cf8tOoTVsQ-1744018937-1.0.1.1-79riY7O3KUyEsVXEnn7P1TxNBLQoZdqyz9el7GvvEHiiIOJejxgRNrLglivMAciwWAo0_zoYox58FpvwM65oYQX__tz064x1d1A0Nymb9C1A8VIYwlLVJNcqabEQOHa.; cf_clearance=sEJgZOR564s2YTbBUC1vvKkQtWA2eSRKhDFuEvm4oHw-1744018938-1.2.1.1-bXAa9jqGJMNuT7No0dWFIQPLvdr0j0RCW_ICxM6jdXbI2K5Th1Ld9O_7VvK1ALHnk5ERZtDn1bC6K0SR2sGiImkRJZzY5BrMchlNcmnmYLD3ZIi6oV0LLD76kA66jXAXr0RSVCzCQs_uUL5H7my0hDI9NzC0IwQhzeSSgBLrb2bcGS9r_ARR6nER9vEjtFfytBbWA1afoEMtiH_9BW9XgAAXDKG2eKkk9Lk_Ppih7t_kSuYRbPe4FfLlOB.uDfmWeEKQ9YNY7jeaGebyLfzdFzjt6AzpLGQuee9qtu_hoQ11JXk8D8oJ23zsx2gg1l7ZyKw09Ypm9bEquHQFgFLur_ud2.ivOHaIkF3Rloqks5w; OptanonAlertBoxClosed=2025-04-07T09:42:21.809Z; eupubconsent-v2=CQPfb3AQPfb3AAcABBENBkFsAP_gAAAAAChQJwtX_G__bXlj8T71aftkeY1f99h7rsQxBgbJk-4FyLvW_JwX32E7NAz6pqYKmRIAu3TBIQNlHIDURUCgaogVrSDMaEyUoTNKJ6BkiFMRY2cYCFxvm4lDeQCY5vr991c52R-t7dr83dzyy4hHv3a5_2S1WJCdAYctDfv8bROb-9IOd_x8v4v4_FgAAAAAABAAAAAAAAAAAAAAAAAAABYAAACwkEAABAAC4AKAAqABwADwAIIAZABqADwAJgAVQA3gB6AD8AISAQwBEgCOAEsAJoAVoAw4BlAGWANkAd8A9gD4gH2AfoBAACKQEXARiAjQCOAFBAKgAVcAuYBigDRAG0ANwAcQBDoCRAE7AKHAUeApEBTYC2AFyALvAXmAw0BkgDJwGXAM5gawBrIDYwG3gN1AcmA5cB44D2gIQgQvCAHAAHAAkAHOAQcAn4CPQEigJWATaAp8BYQC8gGIAMWgZCBkYDRgGpgNoAbcA3QB8gD9wICAQMggiCCYEGAIVgQuHALgAEQAOAA8AC4AJAAfgBoAHOAO4AgEBBwEIAJ-AVAAvQB0gEIAI9ASKAlYBMQCZQE2gKQAUmArsBagDEAGLAMhAZMA0YBpoDUwGvANoAbYA24Bx8DnQOfAfEA-2B-wH7gQPAgiBBgCDYEKx0EsABcAFAAVAA4ACAAF0AMgA1AB4AEwAKsAXABdADEAG8APQAfoBDAESAI4ASwAmgBRgCtAGGAMoAaIA2QB3gD2gH2AfsBFAEYAI4AUEAq4BYgC5gF5AMUAbQA3ABxADqAIdAReAkQBMgCdgFDgKPgU0BTYCrAFigLYAXAAuQBdoC7wF5gL6AYaAx4BkgDJwGVQMsAy4BnIDVQGsANvAbqA4sByYDlwHjgPaAfWBAECFpAAkAAgANAA5wCxAI9ATaApMBeQDUwG2ANuAc-A-IB-wEDwIMAQbAhWQgOAALAAoAC4AKoAXAAxABvAD0AO8AigBHACUgFBAKuAXMAxQBtADqQKaApsBYoC0QFwALkAZOAzkBqoDxwIWkoEYACAAFgAUAA4ADwAJgAVQAuABigEMARIAjgBRgCtAGyAO8AfgBHACrgGKAOoAh0BF4CRAFHgKbAWKAtgBeYDJwGWAM5AawA28B7QEDyQA4AC4A7gCAAFQAR6AkUBKwCbQFJgMWAbkA_cCCIEGCkDYABcAFAAVAA4ACCAGQAaAA8ACYAFUAMQAfoBDAESAKMAVoAygBogDZAHfAPsA_QCLAEYAI4AUEAq4BcwC8gGKANoAbgBDoCLwEiAJ2AUOApsBYoC2AFwALkAXaAvMBfQDDQGSAMngZYBlwDOYGsAayA28BuoDkwHjgPaAhCBC0oAfAAuACQARwA5wB3AEAAJEAWIA14B2wD_gI9ASKAmIBNoCkAFPgK7AXkAxYBkwDUwGvAPigfsB-4EDAIHgQTAgwBBsCFZaACApsAA.f_wAAAAAAAAA; OTAdditionalConsentString=1~43.46.55.61.70.83.89.93.108.117.122.124.135.143.144.147.149.159.192.196.211.228.230.239.259.266.286.291.311.318.320.322.323.327.367.371.385.394.407.415.424.430.436.445.486.491.494.495.522.523.540.550.559.560.568.574.576.584.587.591.737.802.803.820.821.839.864.899.904.922.931.938.979.981.985.1003.1027.1031.1040.1046.1051.1053.1067.1092.1095.1097.1099.1107.1135.1143.1149.1152.1162.1166.1186.1188.1205.1215.1226.1227.1230.1252.1268.1270.1276.1284.1290.1301.1307.1312.1345.1356.1375.1403.1415.1416.1421.1423.1440.1449.1455.1495.1512.1516.1525.1540.1548.1555.1558.1570.1577.1579.1583.1584.1591.1603.1616.1638.1651.1653.1659.1667.1677.1678.1682.1697.1699.1703.1712.1716.1721.1725.1732.1745.1750.1765.1782.1786.1800.1810.1825.1827.1832.1838.1840.1842.1843.1845.1859.1866.1870.1878.1880.1889.1899.1917.1929.1942.1944.1962.1963.1964.1967.1968.1969.1978.1985.1987.2003.2008.2027.2035.2039.2047.2052.2056.2064.2068.2072.2074.2088.2090.2103.2107.2109.2115.2124.2130.2133.2135.2137.2140.2147.2156.2166.2177.2186.2205.2213.2216.2219.2220.2222.2225.2234.2253.2279.2282.2292.2309.2312.2316.2322.2325.2328.2331.2335.2336.2343.2354.2358.2359.2370.2376.2377.2387.2400.2403.2405.2407.2411.2414.2416.2418.2425.2440.2447.2461.2465.2468.2472.2477.2481.2484.2486.2488.2493.2498.2501.2510.2517.2526.2527.2532.2535.2542.2552.2563.2564.2567.2568.2569.2571.2572.2575.2577.2583.2584.2596.2604.2605.2608.2609.2610.2612.2614.2621.2628.2629.2633.2636.2642.2643.2645.2646.2650.2651.2652.2656.2657.2658.2660.2661.2669.2670.2677.2681.2684.2687.2690.2695.2698.2713.2714.2729.2739.2767.2768.2770.2772.2784.2787.2791.2792.2798.2801.2805.2812.2813.2816.2817.2821.2822.2827.2830.2831.2834.2838.2839.2844.2846.2849.2850.2852.2854.2860.2862.2863.2865.2867.2869.2873.2874.2875.2876.2878.2880.2881.2882.2883.2884.2886.2887.2888.2889.2891.2893.2894.2895.2897.2898.2900.2901.2908.2909.2916.2917.2918.2919.2920.2922.2923.2927.2929.2930.2931.2940.2941.2947.2949.2950.2956.2958.2961.2963.2964.2965.2966.2968.2973.2975.2979.2980.2981.2983.2985.2986.2987.2994.2995.2997.2999.3000.3002.3003.3005.3008.3009.3010.3012.3016.3017.3018.3019.3028.3034.3038.3043.3052.3053.3055.3058.3059.3063.3066.3068.3070.3073.3074.3075.3076.3077.3089.3090.3093.3094.3095.3097.3099.3100.3106.3109.3112.3117.3119.3126.3127.3128.3130.3135.3136.3145.3150.3151.3154.3155.3163.3167.3172.3173.3182.3183.3184.3185.3187.3188.3189.3190.3194.3196.3209.3210.3211.3214.3215.3217.3219.3222.3223.3225.3226.3227.3228.3230.3231.3234.3235.3236.3237.3238.3240.3244.3245.3250.3251.3253.3257.3260.3270.3272.3281.3288.3290.3292.3293.3296.3299.3300.3306.3307.3309.3314.3315.3316.3318.3324.3328.3330.3331.3531.3731.3831.4131.4531.4631.4731.4831.5231.6931.7235.7831.7931.8931.9731.10231.10631.10831.11031.11531.12831.13632.13731.14034.14237.14332.15731.16831.16931.21233.23031.25131.25731.25931.26031.26831.27731.27831.28031.28731.28831.29631.32531.33631.34231.34631.36831.39131.39531.40632.41531.43631.43731; _gcl_au=1.1.41698671.1744018942; _lm_id=H47Y8SD6E116DZ7V; _ga=GA1.1.219901072.1744018943; __podscribe_vinted_referrer=https://chatgpt.com/; __podscribe_vinted_landing_url=https://www.vinted.fr/; __podscribe_did=pscrb_25a4815c-f807-4b0f-b2cd-03a5bf7df46a; _fbp=fb.1.1744018943627.86992292164609285; _cc_id=bcc04ebaabe17699151c96021978d3b7; panoramaId_expiry=1744623803857; panoramaId=45cdd3ca72220285ca1e3af0c8a0185ca02c4e7ac9d261053396dfea3ca276c2; panoramaIdType=panoDevice; cto_bundle=PDZP-l9KQiUyQldMN1NudldzU2tRUDNyZnE4SDdEMSUyRlIwelFQMHF5ekpMM3lSN0VsdkN0RlB6ZnRHOXhORk55JTJGS2x1Mk5vdSUyRlNsU3FORkZpNkk3T002cUh3clFYeTJBSlZUd3JVcjVhdVh6MDlKR2QwQ2VaRG1lMnBGV1QwRWgxMklNSklmSFdEMHRHRlJZVzlOcFIlMkJEOEZzYiUyQnclM0QlM0Q; anonymous-locale=fr; access_token_web=eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhcHBfaWQiOjQsImNsaWVudF9pZCI6IndlYiIsImF1ZCI6ImZyLmNvcmUuYXBpIiwiaXNzIjoidmludGVkLWlhbS1zZXJ2aWNlIiwic3ViIjoiMjgyNDUxMjMiLCJpYXQiOjE3NDQwMTkwNDEsInNpZCI6IjBmYTM5ZWNjLTE3NDQwMTkwNDEiLCJzY29wZSI6InVzZXIiLCJleHAiOjE3NDQwMjYyNDEsInB1cnBvc2UiOiJhY2Nlc3MiLCJsb2dpbl90eXBlIjozLCJhY3QiOnsic3ViIjoiMjgyNDUxMjMifSwiYWNjb3VudF9pZCI6MTM3MTY0Mjh9.jDQjMRN8My2TjyVRFiAoqZXggxvhDu9hMgyJ3BlXhklg5C2Kbp2o99doraqh5vDswlLdCQagx0sXMZ68ShB8fuNCH5O1vwdlPJQZP7XgPyXnqCJZpp1bUjdxbtzdAw86pwwJO6ay1Uiq527Mnxf1PMuIhHmZjkKCBoaBt1P57Pq3gLm4_A1ow3NHP2DfHxWqZLuU5pbQUs0bPNgwq7eHQSoregSu33XiF9upqdqG1UDzLPsd2vd8HuNIZzJjZF3O5HAgXL2YDFYKksRn-R_73RCaayqzyxqTmXljnMczwojS8eSJq4bY2k3jeL4yxbKtKFR_JAqM9mKd_GpQH65vFQ; refresh_token_web=eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhcHBfaWQiOjQsImNsaWVudF9pZCI6IndlYiIsImF1ZCI6ImZyLmNvcmUuYXBpIiwiaXNzIjoidmludGVkLWlhbS1zZXJ2aWNlIiwic3ViIjoiMjgyNDUxMjMiLCJpYXQiOjE3NDQwMTkwNDEsInNpZCI6IjBmYTM5ZWNjLTE3NDQwMTkwNDEiLCJzY29wZSI6InVzZXIiLCJleHAiOjE3NDQ2MjM4NDEsInB1cnBvc2UiOiJyZWZyZXNoIiwibG9naW5fdHlwZSI6MywiYWN0Ijp7InN1YiI6IjI4MjQ1MTIzIn0sImFjY291bnRfaWQiOjEzNzE2NDI4fQ.ijZTLr1WoHoQM-jo8KdQRNvl-pWbowVsEbIu8QYix-QZdo5HyK-VO_FnoAP0ThuuPUCQZHkxYAhxfRN6mwchLf-C3LXOvEvOkj5I6XjGdT8vjgxgJPozMRNCWzU5EP5dyjJayzApOjq4QL6KKr0O5CuPlhn0Na03qTAqcMhVpkzC7ooTWdbgTCspnSWg34rJIfIcIWjAPLa_-SrXViSiIaZLGxbKT9ivIaek9mibwozwkQwoX-43G2C1CJn18XOFRk8OsqBoIBHLkff_P-mV2MpB7KAHzEPXpRb3jCeoZIEOHcTf56Dh4YpLDNPqs9sK0GqYYZQ3wUjxNLoOXvvx6Q; anon_id=cdd2ec2b-05ad-4e31-9f41-3f643a8b0c15; v_uid=28245123; v_sid=0fa39ecc-1744019041; anon_id=cdd2ec2b-05ad-4e31-9f41-3f643a8b0c15; domain_selected=true; _ga_8H12QY46R8=GS1.1.1744018942.1.1.1744019043.0.0.0; _ga_ZJHK1N3D75=GS1.1.1744018942.1.1.1744019043.0.0.0; banners_ui_state=SUCCESS; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Apr+07+2025+11%3A44%3A03+GMT%2B0200+(heure+d%E2%80%99%C3%A9t%C3%A9+d%E2%80%99Europe+centrale)&version=202312.1.0&browserGpcFlag=0&isIABGlobal=false&consentId=28245123&interactionCount=5&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1%2CV2STACK42%3A1%2CC0015%3A1%2CC0035%3A1&genVendors=V2%3A1%2CV1%3A1%2C&geolocation=FR%3BIDF&AwaitingReconsent=false; _vinted_fr_session=MS9KN2xQNHAzVnVFdTdIYllaZ1ZGWTB1d25sL2paS1dBVXVVUlVBcnlJK0JCWXJZZW5zeHVsMms2Uno4T1EvUW05cWxnRk56d2tyRmM1WWY3bzRrZVlkKzdid09lSFlyODFDa0Z1MGh3MXlLYzdkWDBhdFdPWUg0djBpUVE2Wjc0ais4VUpnWHBjZEM5Zmk4V0M2RnNheUxLN1NvY2ZmeVlHa2pSd1M3MzRkMVRiWUZnSS9IcE94Q1pDczFlYm8rYVc1cFFQbGI0ejF6RVBCeW5SRE54WUJ3d0Frck1ScmVXaXJIS1I4QmxnUFNFYW9MNmJOeEFwMldhWFVLTVYzYVBleFcycitQL0NteVJacHdtaGp5OWVUQWN0b1NUT2FPOHZzZ3VDTy9UWEFrNXFQeW5yVDRLMTE3TzhQVkluOGtWNk9RaVFzb1hLOTU1ZzV6UUxxVzByZW5zRklPcWxzR3pMSDhjQlA2QmtEWTIxY3k3TTExcXdZNmc4NmN4OGUyV1pNV01iOWRyM1N3Q3Z4dXp6ZjVzV25xQXlQYzFjL09ZRTc0RnBQcE1xeFlidUFVaVNCMTN1TTg0WTcvNVpVMmcyZVJIbDVnL0xMeW94TzUyUW5UQXdTMzN4T2ZkbXhWL0FoeCtnZjQ5QVdWMUs2ejN6ZllXTlFHTDBJMTFXZzNPM1ArckNlYytEclQxczhBZkhvTWwrb0pmUndtMEpBd1Qvd3VMTHlhS2VyVjhVKzhMditsU0UxcXQ2RDdIdkZhWitUT0NhSUd5UWV0VFBSRHY5R2JnUTlwZGl4Ym1QczlUYU5XUFFGa3YwdmhtTWV4N1BTSVhaT0J6ZGhuRkhiTmhsdFNxZE94eGlxbkwraWVlWThLcGlubERic2RLelNJL0diNEY0blRkMlg1Z1NMcmJXUGtLNExML1E5aGt4eGlCdjRaalRUcFBjL2Z0UU1PVUxPSkh2Rkt5NExrRTg3YVBsVUY0VWZWQTI4Y1NVR2s0aUJ3ZWVaTGdJek5Vc2FDRkJTV0xOS1JBRm9ic1RFSml0cUtudzVKSGxwZWlXU25peFA1bzV2eUtkdnVtTWYzN2lnSWVCMGMrSm1VcGtsQ1B0VUhPZWorUTBJVXNETmJ5ck5FTHVPaWlYTExlN2x0b3Z6L0owdW9DOWdoUStRbm1TTC96WFBQNC95eTV1NjRoTjdqdE90VlVrNDY1N3EwSC9ZNEMxOWROSnB4V2R6MzRmNHllU1Urc3hJVVdBeEtjL01kM01JdGlsSGt5Wm9PNVJpeXdwRndzbEl0WjBiV1pRUlNpR3BqMWJBK2dSMkxTRWw2RDdUNmYvRzV4QzhTaUozTzdjd29EcG1IOG1NZ0x2OHI3SWtZT3Z4clRpeHYyMzFTaVNSZ3hhbTR0cWtNNVpLNXlSeFJ5bFlINzlSVXhLRGlmNldpNE9sQTNLYkFnazJnWVBjQzZTcFQ0MnlJNGJlNWxwV1owMDF5VkN5Wis2ejRWTUpzSjJHZEpDekR0K3JlUExnQTUxZUxlNFRnVHJWMkk1ZVB5YUlWOXpMOXcwaDV4T3BKUXBjMVk0UklhRFMwT2JwMXVNMWVEN2xtZ3ZkREZvMStIZkhZd3VOeVRUdHlZeUx5QjdEeDlEMHhvOXdRQSt2cFRHOS9hQ1pzYkd0ZUcrMGlRbVpabC9PaEdsOTBwT2FPSkdRaXl1enAydTAzQ3V5VXB3NldKNmNqS3I0SUwrbHpnUGRuQXdGZVNWNTN6L0lrQVB5cjNVUVh6cUkybVdQN1crSkkrQTZ3Y0JKU1ZtdXU1NHJ5akpiS2ovU2ZveTJ3NDJkcDFuTXRiVTc2cWtYWmJOcHcydDJta2svYSt0VkhLZkRLTzlHM2ZuTGp4ei9uRnBHYlFwTmx0MEpHVUZNQmVwWHNCUGRqOHluaFpyamFFd2FQeTlEVnd1aCs2U1llTnRTT3I2SFlWclRNanhlUm9zeWgyaWlwa0lTbGJ2Y3E1ZzlzQjNEWmNhWXNYRHlJNDE2c3JxQjdZWTJhYytJSVZmSU5wcm9sbW8wdmhaQTc5RGM0TGdINENJbTlReXc4N1BqSlQ3eDZ1NlJUdGU4ZDlKUWFQMjRQQmVpTkN1bUg1RDR1WitwcWUvRVZIM0pZYmdoMlFIRmhGVFd5bDJvR01CMTN4eWhxcHE4T1Y5YW1rSnJTbXpIbHh6M01GRWFRckJyZUY4NGNhWHg1WFJ3QnBhZGRXaXVKbTVXRWZ2Y2w4RVJlUDhGckpObnpKbUhmUkEwYS9aVFVVODVWTEVTZHc0RWtjVVFVS29uS2h0Vkl3YnhwdXhxOXYvVTNxd3pidkFRcHpJdFJqcHBUV01GdWY0djlwb3RTRjBhVGJKMWVPc21JRTRHVWIzSXErZzUxZmkxY2hRQUF2R2ZtQWRsMVY4VmNISzZCRVZab2k5Z2pEcS9pZDNvdG5IajlQNnBHa1N1VzhUaVVCWjhrc1VIZUtlazMzYUZTK2Y3Zm9mdmZyb2oxUmluYXNFRURFcWxKeDNlajMyaVl5ZGZIazlQTWFCdS9uZEJaMS93Z3o0NHlSTjRrMGNFS3ppN1ZEclVKaTNBczlrVnFFK3p0WW9PQnJjV1ZMcU1qQUNMaFhoOHlCYlJNZDU5cGczNkVDREJmbkJXck4vUWFmLzhJMzhiUml2Nzg3aTEzZmZNd3NvTCtaNEYxWHRPb0NhRWhjK0FNTGs4cTlGNmUtLUJnUGtzdWxUaXlqK2JJY2YxRHpVdnc9PQ%3D%3D--804e8b3d3e54885885df145b728dce286abbecd8; viewport_size=967; datadome=k0pLbRACCCRimM62Dpb30EpvBlNL2xWkj8VA8DWd7Qr2v7bHg4UacbNjlw1zGfwUWgBI0L9h8dC35v~6T3r_zyF~BfDLwFrU5Th5lo8PAf2pAy5voM2iaQKfLpkjEHhq; _dd_s=rum=0&expire=1744020505825"; 

    const sales = await vinted.scrape(website, userAgent, cookie);

    if (!sales || sales.length === 0) {
      console.log('No sales found.');
      process.exit(0);
    }

    // Filtrer uniquement les articles LEGO
    const legoSales = sales.filter(item => item.brand_title && item.brand_title.toLowerCase() === 'lego');

    if (legoSales.length === 0) {
      console.log('No LEGO items found.');
      process.exit(0);
    }

    console.log(legoSales);

    // Sauvegarde des articles LEGO uniquement
    fs.writeFileSync('vinted.json', JSON.stringify(legoSales, null, 2), 'utf-8');
    console.log('LEGO sales saved to vinted.json');

    console.log('Done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

// Récupération de l'ID LEGO depuis les arguments du script
const [, , id] = process.argv;
const websiteUrl = `https://www.vinted.fr/api/v2/catalog/items?page=1&per_page=96&search_text=${id}`;

sandbox(websiteUrl);