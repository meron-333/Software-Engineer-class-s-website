function sortStudents(parameter) {
  const table = document.querySelector("table");
  const rows = Array.from(table.querySelectorAll("tr")).slice(1); // Exclude header row
  const headers = ["no", "name", "gender", "role"]; // Define column headers
  const columnIndex = headers.indexOf(parameter.toLowerCase());

  if (columnIndex === -1) {
    console.error("Invalid parameter. Use 'no', 'name', 'gender', or 'role'.");
    return;
  }

  // Sort rows based on the selected column
  const sortedRows = rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    if (parameter.toLowerCase() === "no") {
      // Parse as integers for numeric sorting
      return parseInt(aText) - parseInt(bText);
    }

    // Handle string sorting for other columns
    if (aText.toLowerCase() < bText.toLowerCase()) return -1;
    if (aText.toLowerCase() > bText.toLowerCase()) return 1;
    return 0;
  });

  // Append sorted rows back to the table
  sortedRows.forEach((row) => table.appendChild(row));
}

function searchStudentByName(name) {
  const table = document.querySelector("table");
  const rows = Array.from(table.querySelectorAll("tr")).slice(1); // Exclude header row
  const headerRow = table.querySelector("tr:first-child"); // Keep the header row
  const lowerCaseName = name.trim().toLowerCase(); // Trim and convert to lowercase
  let found = false;

  // Clear the table except for the header row
  table.innerHTML = "";
  table.appendChild(headerRow);

  // Search for the given name
  rows.forEach((row) => {
    const studentName = row.cells[1]?.textContent.trim().toLowerCase(); // Get the name column
    if (studentName === lowerCaseName) {
      table.appendChild(row); // Add the matching row back to the table
      found = true;
    }
  });

  if (!found) {
    const noResultRow = document.createElement("tr");
    const noResultCell = document.createElement("td");
    noResultCell.colSpan = 5; // Span across all columns
    noResultCell.textContent = `No student found with the name "${name}".`;
    noResultCell.style.textAlign = "center";
    noResultRow.appendChild(noResultCell);
    table.appendChild(noResultRow);
  }
}
