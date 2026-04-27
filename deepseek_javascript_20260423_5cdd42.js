navigator.geolocation.getCurrentPosition(
    (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Fill form fields & reverse geocode
    },
    (err) => {
        // Fallback: let user type location manually
    }
);