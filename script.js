let employeeSerial = 1; // Start at 1
const departments = ['Office', 'IT', 'Finance Department', 'Production', 'HR'];
const employeeData = {
  'Office': [],
  'IT': [],
  'Finance Department': [],
  'Production': [],
  'HR': []
};

document.addEventListener('DOMContentLoaded', () => {
  const formSection = document.getElementById('formSection');
  const toggleForm = document.getElementById('toggleForm');
  const form = document.getElementById('employeeForm');
  const tablesContainer = document.getElementById('tablesContainer');
  const tabs = document.querySelectorAll('.tab');
  
  // Default render all employees
  renderTable('All Employees');

  // Toggle form visibility
  toggleForm.addEventListener('click', () => {
    formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const department = document.getElementById('department').value;
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const position = document.getElementById('position').value;
    const status = document.getElementById('status').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const hireDate = document.getElementById('hireDate').value;

    // Generate a new serial number (5 digits + 2 letters)
    const serialNumber = `0000${employeeSerial++}XY`; // Example: 00001XY
    
    const employee = {
      serial: serialNumber,
      lastName,
      firstName,
      middleName,
      position,
      status,
      email,
      phone,
      hireDate
    };

    // Add employee to the corresponding department
    employeeData[department].push(employee);
    
    // Render the updated table
    renderTable(department);

    // Reset form fields
    form.reset();
    formSection.style.display = 'none';
  });

  // Tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const department = tab.id.replace('tab', '');
      if (department === 'All') {
        renderTable('All Employees');
      } else {
        renderTable(department);
      }
    });
  });
});

// Function to render the table for a selected department
function renderTable(department) {
  const tablesContainer = document.getElementById('tablesContainer');
  tablesContainer.innerHTML = ''; // Clear existing table

  const departmentData = department === 'All Employees' 
    ? [].concat(...Object.values(employeeData)) // Merge all departments
    : employeeData[department];

  // Create a new table
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Serial Number</th>
    <th>Last Name</th>
    <th>First Name</th>
    <th>Middle Name</th>
    <th>Job Position</th>
    <th>Status</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Hire Date</th>
  `;
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Add rows to the table
  if (departmentData.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="9">No employees available</td>';
    tbody.appendChild(emptyRow);
  } else {
    departmentData.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.serial}</td>
        <td>${employee.lastName}</td>
        <td>${employee.firstName}</td>
        <td>${employee.middleName}</td>
        <td>${employee.position}</td>
        <td>${employee.status}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.hireDate}</td>
      `;
      tbody.appendChild(row);
    });
  }

  table.appendChild(tbody);
  tablesContainer.appendChild(table);
}

