import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  Stack,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/core';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useCreateDeathwishMutation } from '../types/graphql';
import { DeathwishTemplate } from './DeathwishApp';
import { illustrations, templates } from './DeathwishCard';

function validate(fields: {
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
    errors.title = "Don't forget to tell us the name of the deathwish";
  }

  if (!fields.description) {
    errors.description = "We need you to describe what you'd like to happen";
  }

  if (!fields.recipients) {
    errors.recipients = 'We need to know who benefits from your deathwish';
  }

  return errors;
}

export const CreateDeathwishForm: React.FC = () => {
  const history = ReactRouter.useHistory();
  const {
    state: { type }
  } = ReactRouter.useLocation<{ type: DeathwishTemplate['type'] }>();
  const template = templates[type];
  const [title, setTitle] = React.useState(template.title);
  const [description, setDescription] = React.useState(template.description);
  const [cost, setCost] = React.useState(0);
  const [recipients, setRecipients] = React.useState('');
  const [createDeathWish] = useCreateDeathwishMutation({
    variables: {
      input: {
        deathwish: {
          type: template.type,
          title,
          description,
          cost,
          recipients
        }
      }
    }
  });
  const [formErrors, setFormErrors] = React.useState<{
    title?: string;
    description?: string;
    recipients?: string;
  }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formErrors = validate({
      title,
      description,
      recipients
    });

    if (Object.keys(formErrors).length) {
      return setFormErrors(formErrors);
    }

    await createDeathWish();

    history.push('/deathwishes', {
      newDeathwishWasAdded: true
    });
  }

  return (
    <>
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Create your deathwish!
      </Heading>
      <Stack
        data-testid="create-deathwish-form"
        as="form"
        onSubmit={handleSubmit}
        backgroundColor="white"
        padding={4}
        marginTop={4}
        spacing={4}
      >
        <Stack isInline={true} justify="center" align="center">
          <Box as={illustrations[template.type]} size={300} padding={4} />
        </Stack>
        <FormControl isInvalid={!!formErrors.title}>
          <FormLabel htmlFor="title">Name your deathwish</FormLabel>
          <Input
            data-testid="title-input"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            type="text"
            id="name"
          />
          <FormErrorMessage>{formErrors.title}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formErrors.description}>
          <FormLabel htmlFor="description">Tell us your request</FormLabel>
          <Input
            data-testid="description-input"
            as={Textarea}
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            id="description"
          />
          <FormErrorMessage>{formErrors.description}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="cost">How much will it cost?</FormLabel>
          <InputGroup>
            <InputLeftAddon children="£" />
            <NumberInput
              data-testid="cost-input"
              value={cost}
              onChange={(value: any) => setCost(value)}
              min={0}
              step={1000}
              id="cost"
              aria-labelledby="cost"
              aria-describedby="cost-helper-text"
            />
          </InputGroup>
          <FormHelperText id="cost-helper-text">
            This is only a rough estimate
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={!!formErrors.recipients}>
          <FormLabel htmlFor="recipients">Who are the recipients?</FormLabel>
          <Input
            data-testid="recipients-input"
            value={recipients}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRecipients(event.target.value)
            }
            type="text"
            id="recipients"
            aria-describedby="recipients-helper-text"
          />
          <FormErrorMessage>{formErrors.recipients}</FormErrorMessage>
          <FormHelperText id="recipients-helper-text">
            This can be a comma separated list of email addresses
          </FormHelperText>
        </FormControl>
        <Button type="submit" variantColor="pink">
          Create wish
        </Button>
      </Stack>
    </>
  );
};
