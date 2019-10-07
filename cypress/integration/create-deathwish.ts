describe('create deathwish', () => {
  it('allows users to create deathwishes from a template', () => {
    cy.visit('/');

    // 1. User chooses a template
    cy.findByTestId('choose-deathwish-money').click();

    // 2. User completes the form
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

    // 3. User sees a goal completion message
    cy.findByTestId('deathwishes-pane').should(
      'contain.text',
      'You successfully created a new deathwish!'
    );
  });

  it('allows users to customise the deathwish details', () => {
    cy.visit('/');

    // 1. User chooses a template
    cy.findByTestId('choose-deathwish-holiday').click();

    // 2. User completes the form
    cy.findByTestId('title-input')
      .clear()
      .type('A special holiday');
    cy.findByTestId('description-input')
      .clear()
      .type('A trip across the world to Tokyo');
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

    // 3. User sees the customised deathwish
    cy.findByTestId('deathwishes-pane').should(
      'contain.text',
      'A trip across the world to Tokyo'
    );
  });
});
