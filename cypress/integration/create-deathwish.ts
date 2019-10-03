describe('create deathwish', () => {
  it('allows users to create deathwishes', () => {
    cy.visit('/');

    cy.findByTestId('app-pane').should('contain.text', 'DeathWishes');

    cy.findByTestId('type-input').then(input => {
      input.val('holiday');
    });
    cy.findByTestId('title-input').type('A special holiday');
    cy.findByTestId('description-input').type(
      'A trip across the world to Tokyo'
    );
    cy.findByTestId('cost-input')
      .find('input')
      .then(input => {
        input.val('');
      })
      .type('10000');
    cy.findByTestId('recipients-input').type(
      'lucky@example.com,another@example.com'
    );

    cy.findByTestId('create-deathwish-form').submit();

    cy.findByTestId('current-deathwish')
      .should('contain.text', 'A special holiday')
      .and('contain.text', 'A trip across the world to Tokyo')
      .and('contain.text', '10000')
      .and('contain.text', 'lucky@example.com,another@example.com');
  });
});
