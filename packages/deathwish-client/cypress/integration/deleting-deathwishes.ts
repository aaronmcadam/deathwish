describe('deleting deathwishes', () => {
  it.only('deletes a deathwish', () => {
    // 1. User creates a deathwish
    cy.visit('/');
    cy.findByTestId('choose-deathwish-holiday').click();
    cy.findByTestId('title-input')
      .clear()
      .type('A special holiday');
    cy.findByTestId('cost-input')
      .find('input')
      .then(input => {
        input.val('');
      });
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );
    cy.findByTestId('create-deathwish-form').submit();

    // 2. User clicks the delete button on the deathwish card
    cy.findByTestId('delete-deathwish-button').click();

    // 3. User confirms they want to delete the deathwish
    cy.findByTestId('confirm-delete-button').click();

    // 4. User sees that the deathwish is deleted
    cy.findByTestId('deathwishes-pane').should(
      'not.contain.text',
      'A special holiday'
    );
  });

  it('allows the user to change their mind', () => {
    // 1. User creates a deathwish
    cy.visit('/');
    cy.findByTestId('choose-deathwish-holiday').click();
    cy.findByTestId('title-input')
      .clear()
      .type('A special holiday');
    cy.findByTestId('cost-input')
      .find('input')
      .then(input => {
        input.val('');
      });
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );
    cy.findByTestId('create-deathwish-form').submit();

    // 2. User clicks the delete button on the deathwish card
    cy.findByTestId('delete-deathwish-button').click();

    // 3. User decides they don't want to delete the deathwish
    cy.findByTestId('cancel-delete-button').click();

    // 4. User sees that the deathwish is not deleted
    cy.findByTestId('deathwishes-pane').should(
      'contain.text',
      'A special holiday'
    );
  });
});
