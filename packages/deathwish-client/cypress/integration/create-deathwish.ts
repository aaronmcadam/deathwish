import short from 'short-uuid';

describe('create deathwish', () => {
  describe('with invalid data', () => {
    it('shows error messages', () => {
      // Sign in
      cy.visit('/');
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // 1. User chooses a template
      cy.findByTestId('choose-deathwish-video').click();

      // 2. User incorrectly completes the form
      cy.findByTestId('title-input').clear();
      cy.findByTestId('description-input').clear();
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        });
      cy.findByTestId('create-deathwish-form').submit();

      // 3. User sees error messages
      cy.findByTestId('create-deathwish-form')
        .should(
          'contain.text',
          "Don't forget to tell us the name of the deathwish"
        )
        .and(
          'contain.text',
          "We need you to describe what you'd like to happen"
        )
        .and(
          'contain.text',
          'We need to know who benefits from your deathwish'
        );
    });

    it('creates the deathwish when the user fixes the errors', () => {
      // Sign in
      cy.visit('/');
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // User chooses a template
      cy.findByTestId('choose-deathwish-video').click();

      // User incorrectly completes the form
      cy.findByTestId('title-input').clear();
      cy.findByTestId('description-input').clear();
      cy.findByTestId('cost-input')
        .find('input')
        .then(input => {
          input.val('');
        });
      cy.findByTestId('create-deathwish-form').submit();

      // User fixes the error messages
      cy.findByTestId('title-input')
        .clear()
        .type('A video montage');
      cy.findByTestId('description-input')
        .clear()
        .type('A documentary of my life');
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

      // User sees a goal completion message
      cy.findByTestId('deathwishes-pane').should(
        'contain.text',
        'You successfully created a new deathwish!'
      );
    });
  });

  describe('with valid data', () => {
    it('allows users to create deathwishes from a template', () => {
      // Sign in
      cy.visit('/');
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // User chooses a template
      cy.findByTestId('choose-deathwish-money').click();

      // User completes the form
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

      // User sees a goal completion message
      cy.findByTestId('deathwishes-pane').should(
        'contain.text',
        'You successfully created a new deathwish!'
      );
    });

    it('allows users to customise the deathwish details', () => {
      // Sign in
      cy.visit('/');
      cy.findByTestId('email-input').type(
        `tester-${short.generate()}@example.com`
      );
      cy.findByTestId('sign-in-form').submit();

      // User chooses a template
      cy.findByTestId('choose-deathwish-holiday').click();

      // User completes the form
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

      // User sees the customised deathwish
      cy.findByTestId('deathwishes-pane').should(
        'contain.text',
        'A trip across the world to Tokyo'
      );
    });
  });
});
