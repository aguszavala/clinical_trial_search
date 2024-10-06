const closeButton = $(".close")

$(".modal-overlay").hide();
$("#dialog").hide();

$(".trial").on("click", async function () {
    const summary = $(this).data('summary')
    const response = await fetch('/api/getChatCompletion', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: summary })
    })
    const answer = await response.json()
    const title = $(this).data('title')
    const contactInfo = $(this).data('contact')

    const contacts = typeof contactInfo === 'string' ? JSON.parse(contactInfo) : contactInfo

    $(".contact-buttons").empty()
    if (!contacts || contacts.length === 0) {
        $(".contact-buttons").text("No contact available").css("background-color", "grey").addClass('btn btn-secondary')
    } else {
        contacts.forEach(contact => {
            const contactButtonTwo = $('<button>').text(contact.name).addClass('btn btn-success').attr('onclick', `window.location.href='mailto:${contact.email}'`)
            $(".contact-buttons").append(contactButtonTwo).removeClass('btn btn-secondary')
        });
    }
    $("#dialogTitle").text(title)
    $("#dialogText").text(answer)

    $(".modal-overlay").fadeIn()
    $("#dialog").fadeIn()

    $("body").addClass("modal-active")
})

closeButton.on("click", () => {
    $(".modal-overlay").fadeOut()
    $("#dialog").fadeOut()
    $("body").removeClass("modal-active")
})

$(".modal-overlay").on("click", () => {
    $(".modal-overlay").fadeOut()
    $("#dialog").fadeOut()
    $("body").removeClass("modal-active")
})
