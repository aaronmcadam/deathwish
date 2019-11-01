/**
 * Returns error messages when any of the given fields are missing.
 */
export function validateDeathwish(fields: {
  title: string;
  description: string;
  recipients: string;
}): {
  title?: string;
  description?: string;
  recipients?: string;
} {
  let errors: {
    title?: string;
    description?: string;
    recipients?: string;
  } = {};

  if (!fields.title) {
    errors.title = 'Please tell us the name of the deathwish';
  }

  if (!fields.description) {
    errors.description = "Please describe what you'd like to happen";
  }

  if (!fields.recipients) {
    errors.recipients = 'Please tell us who will benefit from your deathwish';
  }

  return errors;
}
