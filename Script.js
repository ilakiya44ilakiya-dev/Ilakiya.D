const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const tableBody = document.querySelector("#participantTable tbody");

let participants =
    JSON.parse(localStorage.getItem("participants")) || [];

displayParticipants();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const duplicate = participants.find(
        participant =>
            participant.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
        message.innerHTML =
            "❌ Participant already registered with this email!";
        message.className = "error";
        return;
    }

    const participant = {
        name,
        email,
        phone
    };

    participants.push(participant);

    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );

    message.innerHTML =
        "✅ Registration Successful! Confirmation Sent.";
    message.className = "success";

    displayParticipants();

    form.reset();
});

function displayParticipants() {
    tableBody.innerHTML = "";

    participants.forEach(participant => {
        const row = `
            <tr>
                <td>${participant.name}</td>
                <td>${participant.email}</td>
                <td>${participant.phone}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}
