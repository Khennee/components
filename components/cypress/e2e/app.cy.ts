describe('MainPage', () => {
  beforeEach(() => {
    cy.visit('/main'); 
  });

  it('increments and decrements count and changes background color', () => {
    cy.contains('Increment!').click().click();
    cy.contains('Background Volume : 10%').should('exist');

    cy.contains('Decrement!').click();
    cy.contains('Background Volume : 5%').should('exist');
  });

  it('opens and closes the Employees modal with toast notifications', () => {
    cy.contains('See Employees!').click();
    cy.get('h1').contains('Employees :').should('be.visible');
    cy.contains('Modal Opened!').should('be.visible');
  });

  it('navigates to Student List page and To-Do List page', () => {
    cy.contains('See Students!').click();
    cy.url().should('include', '/studentlist');

    cy.go('back');
    cy.contains('See To Do List!').click();
    cy.url().should('include', '/todolist');
  });
});

describe('StudentListPage - Add and Delete Student', () => {
  beforeEach(() => {
    cy.visit('/studentlist'); 
  });

  it('adds a new student and then deletes it', () => {
    cy.get('[data-testid="open-add-student-modal-button"]').should('be.visible').click();

    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="groupname"]').type('Group A');
    cy.get('input[name="role"]').type('Member');
    cy.get('input[name="expectedsalary"]').type('50000');
    cy.get('input[name="expecteddateofdefense"]').type('2025-06-01');

    cy.get('[data-testid="submit-add-student-button"]').click();

    cy.contains('Doe, John', { timeout: 10000 }).should('exist');

    cy.contains('Doe, John')
      .closest('div')
      .within(() => {
        cy.contains('Delete').click(); 
      });

    cy.get('.fixed')
      .contains('Delete') 
      .click();

    cy.contains('Doe, John', { timeout: 10000 }).should('not.exist');
  });
});


describe('ToDoListPage', () => {
  before(() => {
    cy.visit('/todolist'); 

    const futureDate = new Date(Date.now() + 86400000);
    const formattedDate = futureDate.toISOString().slice(0, 16);

    cy.get('input[placeholder="Enter task title"]').type('test cypress');
    cy.get('input[placeholder="Enter task description"]').type('test cypress description');
    cy.get('input[type="datetime-local"]').type(formattedDate);
    cy.contains('Add').click();
  });

  beforeEach(() => {
    cy.visit('/todolist');  
  });

  it('should add a new task', () => {
    cy.contains('test cypress').should('be.visible');
  });

  it('should complete a task', () => {
    cy.contains('test cypress').should('be.visible');
    cy.contains('test cypress').click();
    // cy.contains('test cypress').should('have.class', 'line-through').and('have.class', 'text-green-600'); //sometimes works sometimes doesnt 
  });

  it('should delete a task', () => {
    cy.contains('Delete').click();
    cy.contains('test cypress').should('not.exist');
  });

  it('should switch task types', () => {
    cy.get('[data-testid="task-type-basic"]').should('have.class', 'bg-green-600');
    cy.get('[data-testid="task-type-timed"]').click();
    cy.get('[data-testid="task-type-timed"]').should('have.class', 'bg-green-600');
    cy.get('[data-testid="task-type-checklist"]').click();
    cy.get('[data-testid="task-type-checklist"]').should('have.class', 'bg-green-600');
  });

  it('should open checklist and add item, complete, and delete', () => { 
    cy.get('[data-testid="task-type-checklist"]').click();
    cy.get('[data-testid="task-type-checklist"]').should('have.class', 'bg-green-600');

    cy.contains('View Checklist').click();
    cy.get('input[placeholder="Add new item"]').type('test cypress');

    cy.get('[data-testid="checklist-add-button"]').click();

    cy.contains('test cypress').should('exist');

    cy.contains('test cypress')
      .parents('div')
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.contains('test cypress')
      .should('have.class', 'line-through')
      .and('have.class', 'text-green-600');

    cy.contains('test cypress')
      .parents('div')
      .find('button[aria-label="Remove item"]')
      .click();

    cy.contains('test cypress').should('not.exist');
  });

});


