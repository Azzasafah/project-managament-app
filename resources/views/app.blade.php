<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>Muhammad Hafizh Azzasafah (~Safah) — Data Engineer & Backend Portfolio</title>
    
    <!-- Primary SEO Meta Tags -->
    <meta name="description" content="Portfolio resmi Muhammad Hafizh Azzasafah (~Safah) — Data Engineer & Backend Developer, Sarjana Teknik Informatika Cum Laude (GPA 3.90/4.00), 3x Microsoft Azure Certified.">
    <meta name="author" content="Muhammad Hafizh Azzasafah">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="https://azzasafah.my.id/">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://azzasafah.my.id/">
    <meta property="og:title" content="Muhammad Hafizh Azzasafah (~Safah) — Data Engineer Portfolio">
    <meta property="og:description" content="Portfolio Data Engineering, Backend Architecture & Cloud Infrastructure. Sarjana Teknik Informatika Cum Laude.">
    <meta property="og:image" content="https://azzasafah.my.id/chisa.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://azzasafah.my.id/">
    <meta name="twitter:title" content="Muhammad Hafizh Azzasafah (~Safah) — Data Engineer Portfolio">
    <meta name="twitter:description" content="Portfolio Data Engineering, Backend Architecture & Cloud Infrastructure.">
    <meta name="twitter:image" content="https://azzasafah.my.id/chisa.png">

    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="NeMN0HJaXQmCo7mxy8im9jC3B_AZe2uLHST3Yful27I" />

    <!-- PWA & Android Meta Tags -->
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="theme-color" content="#0e0e12">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Safah Workspace">

    <!-- Custom Techwear / Brand Favicon -->
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="alternate icon" href="{{ asset('favicon.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('icon-192.png') }}">

    <!-- Google Fonts: Preconnect & Display Swap -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
    
    <!-- Phosphor Icons: Non-blocking Async Loading -->
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" media="print" onload="this.media='all'" />
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" media="print" onload="this.media='all'" />
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" media="print" onload="this.media='all'" />
    <noscript>
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
    </noscript>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="text-slate-800 antialiased selection:bg-black selection:text-white bg-slate-100 font-sans">
    @inertia

    <!-- PWA Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((reg) => console.log('Safah PWA Service Worker registered:', reg.scope))
                    .catch((err) => console.log('PWA Service Worker registration failed:', err));
            });
        }
    </script>
</body>
</html>
