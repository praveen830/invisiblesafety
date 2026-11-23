async function testServer() {
  try {
    const res = await fetch('http://localhost:4321/');
    const html = await res.text();
    console.log("Status:", res.status);
    console.log("Length:", html.length);
    console.log("Has SS316:", html.includes("SS316"));
    console.log("Has 400+ kg:", html.includes("400+ kg"));
    console.log("Has 10-year warranty:", html.includes("10-year warranty"));
    console.log("Has hero-invisible-grill-desktop.webp:", html.includes("hero-invisible-grill-desktop.webp"));
    console.log("Has invisible-grills-desktop-hero.webp:", html.includes("invisible-grills-desktop-hero.webp"));
    console.log("Title:", html.match(/<title>([^<]+)<\/title>/)?.[1]);
    
    // Check services
    const services = [
      '/invisible-grills/',
      '/balcony-safety/',
      '/child-safety-nets/',
      '/pigeon-nets/',
      '/sports-nets/',
      '/cloth-drying-hangers/',
      '/bird-spikes/'
    ];
    for (const s of services) {
      const sRes = await fetch('http://localhost:4321' + s);
      const sHtml = await sRes.text();
      const sTitle = sHtml.match(/<title>([^<]+)<\/title>/)?.[1];
      console.log(`Service ${s} -> Status ${sRes.status}, Title: "${sTitle}"`);
    }
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

testServer();
