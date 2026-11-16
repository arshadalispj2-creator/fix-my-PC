
// Mobile Navigation
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Set minimum booking date to today
document.getElementById("date").min =
    new Date().toISOString().split("T")[0];

// Generate booking ID
function generateBookingID() {
    return "FMP" + Date.now().toString().slice(-8);
}

// Save Booking
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const booking = {
        id: generateBookingID(),
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        device: document.getElementById("device").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        problem: document.getElementById("problem").value.trim(),
        status: "Booking Received"
    };

    if (!booking.name || !booking.phone || !booking.problem) {
        alert("Please complete all required fields.");
        return;
    }

    // Get existing bookings
    let bookings = JSON.parse(localStorage.getItem("fixmypcBookings")) || [];

    // Save new booking
    bookings.push(booking);

    localStorage.setItem("fixmypcBookings", JSON.stringify(bookings));

    // Show confirmation
    document.getElementById("bookingMessage").innerHTML = `
        <div class="success">
            <h3>✓ Booking Successful!</h3>
            <p>Your Booking ID is:</p>
            <h2>${booking.id}</h2>
            <p>Please save this ID to track your repair.</p>
        </div>
    `;

    document.getElementById("bookingForm").reset();
    document.getElementById("date").min =
        new Date().toISOString().split("T")[0];
});

// Track Repair
function trackRepair() {
    const id = document.getElementById("trackingID").value.trim();

    const bookings = JSON.parse(localStorage.getItem("fixmypcBookings")) || [];

    const result = document.getElementById("trackingResult");

    const booking = bookings.find(item => item.id.toLowerCase() === id.toLowerCase());

    if (booking) {
        result.innerHTML = `
            <div class="success">
                <h3>✓ Booking Found!</h3>
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p><strong>Customer:</strong> ${escapeHTML(booking.name)}</p>
                <p><strong>Device:</strong> ${escapeHTML(booking.device)}</p>
                <p><strong>Service:</strong> ${escapeHTML(booking.service)}</p>
                <p><strong>Status:</strong> ${escapeHTML(booking.status)}</p>
            </div>
        `;
    } else {
        result.innerHTML = `
            <p style="color:red;">
                Booking not found! Please check your Booking ID.
            </p>
        `;
    }
}

// Safely display customer-provided text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}
