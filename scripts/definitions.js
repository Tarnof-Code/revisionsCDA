async function getNotions() {
    let brutResponse = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1Hc7PM4OhE20N9kdYDjNrgP80XtskSrTsSA39Lw4SoNo/values/Définitions!A1:G500?key=" + API_KEY);
    let response = await brutResponse.json();

    response.values.sort((a, b) => a[0].localeCompare(b[0]));

    let notionsContentHTML = "";
    for (let i = 0; i < response.values.length; i++) {
        document.getElementById("notions").innerHTML += "<option>" + response.values[i][0];

        let rowClass = "row";
        let rowClassNotRow = "";
        if (i % 2 === 0) {
            rowClass += " background-white";
            rowClassNotRow += " background-white";
        }

        notionsContentHTML += '<tr class="' + rowClass + '">';
        notionsContentHTML += '<td class="col-lg-2 col-12 ' + rowClassNotRow + '"><strong>' + response.values[i][0] + '</strong></td>';
        for (let j = 1; j <= response.values[i].length; j++) {
            if (response.values[i][j] !== undefined) {
                notionsContentHTML += '<td class="col-lg-2 col-5">' + response.values[i][j] + "</td>";
            }

        }
        notionsContentHTML += "</tr>";
    }

    document.getElementById("notionsContent").innerHTML = notionsContentHTML;

    const inputElement = document.getElementById("notions-choice");
    inputElement.addEventListener("input", function () {
        const filterValue = inputElement.value.toLowerCase();
        const rows = document.getElementById("notionsContent").getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");
            let isVisible = false;

            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;

                if (cellText.toLowerCase().indexOf(filterValue) > -1) {
                    isVisible = true;
                    break;
                }
            }

            row.style.display = isVisible ? "" : "none";
        }
    });
};

getNotions();

function viderChamps() {
    window.location.reload();
}

