describe('editing deathwishes', () => {
  describe('with invalid data', () => {
    it('shows error messages', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User creates a deathwish
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

      // User clicks the edit button on the deathwish card
      cy.findByTestId('edit-deathwish-button').click();

      // User edits the deathwish with incorrect data
      cy.findByTestId('title-input').clear();
      cy.findByTestId('description-input').clear();
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        });
      cy.findByTestId('recipients-input').clear();
      cy.findByTestId('edit-deathwish-form').submit();

      // User sees error messages
      cy.findByTestId('edit-deathwish-form')
        .should('contain.text', 'Please tell us the name of the deathwish')
        .and('contain.text', "Please describe what you'd like to happen")
        .and(
          'contain.text',
          'Please tell us who will benefit from your deathwish'
        );
    });
  });

  describe('with valid data', () => {
    it('allows users to update their deathwishes', () => {
      // Sign in
      cy.signInAsNewUser();
      cy.visit('/');

      // User creates a deathwish
      cy.findByTestId('choose-deathwish-holiday').click();
      cy.findByTestId('title-input')
        .clear()
        .type('A special holiday');
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

      // User clicks the edit button on the deathwish card
      cy.findByTestId('edit-deathwish-button').click();

      // User edits the deathwish they just created
      cy.findByTestId('title-input')
        .clear()
        .type('A worldwide trip');
      cy.findByTestId('description-input')
        .clear()
        .type('A trip around the world, covering 10 cities.');
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        })
        .type('30000');
      cy.findByTestId('recipients-input')
        .clear()
        .type('edited@example.com,another@example.com');
      cy.findByTestId('edit-deathwish-form').submit();

      // User should see the edited deathwish
      cy.findByTestId('deathwish-list-page').should(
        'contain.text',
        'You successfully updated your deathwish!'
      );
      cy.findByTestId('deathwish-list-page')
        .should('contain.text', 'A worldwide trip')
        .and('contain.text', 'A trip around the world, covering 10 cities.')
        .and('contain.text', '30000')
        .and('contain.text', 'edited@example.com')
        .and('contain.text', 'another@example.com');
    });
  });
});
